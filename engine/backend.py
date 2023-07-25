import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore


#Use a service account.
cred = credentials.Certificate("SeviceAccount.json")
app = firebase_admin.initialize_app(cred)
db = firestore.client()

x='DL10CE4581'

car_data = ['MH20EE7598','MH20EJ0365','MH14DT8831','MH02FE8819','TN87A3980','GJ05JA1143','KL26H5009',
       'TN21AQ1114','TS07FX3534','PY01BB5956','DL10CE4581','MH01AV8866','MH20BQ20','DL8CX4850']

obj1 = {
    'id' : 'MH20EE7598',
    'created_date' : '',
    'puc_validity' :'28-DEC-2023',
    'tax_validity' :'LTT',
    'insurance_validity' :'28-DEC-2023',
    'validity' : True
}
obj2 = {
    'id' : 'MH20EJ0365',
    'created_date' :'', 
    'puc_validity' :'20-JAN-2024',
    'tax_validity' :'LTT',
    'insurance_validity' :'09-AUG-2023',
    
}
obj3 = {
    'id' : 'MH14DT8831',
    'created_date' :'', 
    'puc_validity' :'18-AUG-2022',
    'tax_validity' :'04-APR-2028',
    'insurance_validity' :'03-APR-2023',
    
}
obj4 = {
    'id' : 'MH02FE8819',
    'created_date' :'', 
    'puc_validity' :'',
    'tax_validity' :'LTT',
    'insurance_validity' :'14-NOV-2022',
    
}
obj5 = {
    'id' : 'TN87A3980',
    'created_date' :'', 
    'puc_validity' :'25-SEP-2021',
    'tax_validity' :'LTT',
    'insurance_validity' :'11-OCT-2023',
    
}
obj6 = {
    'id' : 'GJ05JA1143',
    'created_date' : '',
    'puc_validity' : '27-AUG-2022',
    'tax_validity' : '',
    'insurance_validity' : '30-APR-2023',

}
obj7 = {
    'id' : 'KL26H5009',
    'created_date' : '',
    'puc_validity' :'14-OCT-2023',
    'tax_validity' :'31-MAR-2032',
    'insurance_validity' :'29-APR-2023',
    
}
obj8 = {
    'id' : 'TN21AQ1114',
    'created_date' : '',
    'puc_validity' :'24-NOV-2022',
    'tax_validity' :'08-APR-2028',
    'insurance_validity' :'19-MAR-2024',
    
}
obj9 = {
    'id' : 'TS07FX3534',
    'created_date' : '',
    'puc_validity' :'',
    'tax_validity' :'20-DEC-2029',
    'insurance_validity' :'20-DEC-2023',
    
}
obj10 = {
    'id' : 'PY01BB5956',
    'created_date' : '',
    'puc_validity' :'',
    'tax_validity' :'05-MAY-2025',
    'insurance_validity' :'06-JAN-2024',
    
}
obj11 = {
    'id' : 'DL10CE4581',
    'created_date' : '',
    'puc_validity' :'',
    'tax_validity' :'',
    'insurance_validity' :'',
    'completed' :'',
}
obj12 = {
    'id' : 'MH01AV8866',
    'created_date' : '',
    'puc_validity' :'31-AUG-2023',
    'tax_validity' :'',
    'insurance_validity' :'13-FEB-2024',
    
}
obj13 = {
    'id' : 'MH20BQ20',
    'created_date' : '',
    'puc_validity' : '',
    'tax_validity' : '',
    'insurance_validity' : '',
    
}
obj14 = {
    'id' : 'DL8CX4850',
    'created_date' : '',
    'puc_validity' :'',
    'tax_validity' :'',
    'insurance_validity' :'',
    'completed' :'',
}


data = [obj1, obj2, obj3, obj4, obj5, obj6, obj7, obj8, obj9, obj10, obj11, obj12, obj13, obj14]
# print(data)
for record in data:
    doc_ref = db.collection(u'parivahan_car_data').document(record['id'])
    doc_ref.set(record)
# search car no on parivahan database
parivahan_car = db.collection(u'parivahan_car_data').document(x)
# get car data from parivahan database
current_car_data = db.collection(u'current_car_data').document(x)
# set car data to current_car_data
current_car_data_ref = db.collection(u'current_car_data').document(x)
current_car_data_ref.set(parivahan_car.get().to_dict())


print(parivahan_car.get().to_dict())

