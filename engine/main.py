import os

import cv2
import numpy as np
import matplotlib.pyplot as plt
import easyocr
import util
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from datetime import datetime
from fuzzywuzzy import fuzz


#Use a service account.
cred = credentials.Certificate("engine/SeviceAccount.json")
app = firebase_admin.initialize_app(cred)
db = firestore.client()


# define constants
model_cfg_path = os.path.join('engine/cfg/darknet-yolov3.cfg')
model_weights_path = os.path.join('engine/weights/model.weights')
class_names_path = os.path.join('engine/class.names')

input_dir ='engine/Dataset'
nos=np.ndarray([])
outputs=np.ndarray([])

parivahan_car_nos = np.array([])
parivahan_car = db.collection(u'parivahan_car_data')
for doc in parivahan_car.stream():
    parivahan_car_nos = np.append(parivahan_car_nos, doc.id)
parivahan_car_nos

def checkdate(data,field):
    if data and data[field]:
        date_obj = datetime.strptime(data[field], "%d-%b-%Y")
        current_date_obj = datetime.now()
        if current_date_obj > date_obj:
            # print('Expired '+field)
            return True
        print(date_obj)

def clean_and_upload(no):
    no = no.replace(' ', '')
    no = no.replace('"', '')
    no = no.replace("'", '')
    no = no.replace(']', '')
    no = no.upper()
    
    no_12 = no[0:2]
    no_12 = no_12.replace('(', 'K')
    no_12 = no_12.replace('0', 'O')
    no_12 = no_12.replace('1', 'I')
    no_12 = no_12.replace('5', 'S')
    no_12 = no_12.replace('8', 'B')
    no_12 = no_12.replace('6', 'G')
    
    no_34 = no[2:4]
    no_34 = no_34.replace('I', '1')
    no_34 = no_34.replace('Z', '2')
    no_34 = no_34.replace('O', '0')
    no = no_12 + no_34 + no[4:]
    
    for parivahan_car_no in parivahan_car_nos:
        fuzz_score = fuzz.partial_ratio(no, parivahan_car_no)
        
        if(fuzz_score > 70):
            no = parivahan_car_no
            print(fuzz_score)
            break
    
    # search car no on parivahan database
    parivahan_car = db.collection(u'parivahan_car_data').document(no)
    # get car data from parivahan database
    current_car_data = db.collection(u'current_car_data').document(no)
    # set car data to current_car_data
    data = parivahan_car.get().to_dict()
    
    dt = datetime.now()
    time_str = dt.strftime("%I:%M%p")
    # print(data)
    if data:
        data['created_date'] = time_str
    
    current_car_data.set(data)
    # nos_cleaned = np.append(nos_cleaned, no)
    # checkdate(data,'tax_validity')
    if checkdate(data,'insurance_validity')==True or checkdate(data,'puc_validity')==True:
        print('Expired')
        invalid_car_data = db.collection(u'invalid_car_data').document(no)
        invalid_car_data = invalid_car_data.set(data)
        
    
    
for img_name in os.listdir(input_dir):
    img_path = os.path.join(input_dir, img_name)
    img = cv2.imread(img_path)

# load class names
    with open(class_names_path, 'r') as f:
        class_names = [j[:-1] for j in f.readlines() if len(j) > 2]
        f.close()

    # load model
    net = cv2.dnn.readNetFromDarknet(model_cfg_path, model_weights_path)

    # load image

    #img = cv2.imread(img_path)

    H, W, _ = img.shape

    # convert image
    blob = cv2.dnn.blobFromImage(img, 1 / 255, (416, 416), (0, 0, 0), True)

    # get detections
    net.setInput(blob)

    detections = util.get_outputs(net)

    # bboxes, class_ids, confidences
    bboxes = []
    class_ids = []
    scores = []

    for detection in detections:
        # [x1, x2, x3, x4, x5, x6, ..., x85]
        bbox = detection[:4]

        xc, yc, w, h = bbox
        bbox = [int(xc * W), int(yc * H), int(w * W), int(h * H)]

        bbox_confidence = detection[4]

        class_id = np.argmax(detection[5:])
        score = np.amax(detection[5:])

        bboxes.append(bbox)
        class_ids.append(class_id)
        scores.append(score)

    # apply nms
    bboxes, class_ids, scores = util.NMS(bboxes, class_ids, scores)

    # plot

    reader = easyocr.Reader(['en'])

    for bbox_, bbox in enumerate(bboxes):
        xc, yc, w, h = bbox
        
        img = cv2.rectangle(img,
                            (int(xc - (w / 2)), int(yc - (h / 2))),
                            (int(xc + (w / 2)), int(yc + (h / 2))),
                            (0, 255, 0),
                            10)

        license_plate = img[int(yc - (h / 2)):int(yc + (h / 2)), int(xc - (w / 2)):int(xc + (w / 2)), :].copy()

        license_plate_gray = cv2.cvtColor(license_plate, cv2.COLOR_BGR2GRAY)
    
        _, license_plate_thresh = cv2.threshold(license_plate_gray, 64, 255, cv2.THRESH_BINARY_INV)

        output = reader.readtext(license_plate_gray)
        
        text_no = ""
        for out in output:
            text_bbox, text, text_score = out
            # print(text)
            text_no = text_no + text
        # nos=np.append(nos,text_no)
        clean_and_upload(text_no)
        

        plt.figure()
        plt.imshow(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))

        plt.figure()
        plt.imshow(cv2.cvtColor(license_plate, cv2.COLOR_BGR2RGB))

        plt.figure()
        plt.imshow(cv2.cvtColor(license_plate_gray, cv2.COLOR_BGR2RGB))

        plt.show()
    
print(nos)