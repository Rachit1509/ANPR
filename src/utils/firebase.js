// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, query, getDocs,onSnapshot,doc, setDoc,getDoc,getFirestore,serverTimestamp,deleteDoc,where} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0dTE4dowTGw3Qt78t1jjOc3m4_ec60dU",
  authDomain: "anpr-3d57f.firebaseapp.com",
  projectId: "anpr-3d57f",
  storageBucket: "anpr-3d57f.appspot.com",
  messagingSenderId: "727319600874",
  appId: "1:727319600874:web:63d5d1240465126c100193"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const event = "car_data";

const current_car_data = query(collection(db, "car_data"));
const currentCarData = async () => {
  const unsubscribe = onSnapshot(current_car_data, (querySnapshot) => {
    const cities = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  });
};

const car_data = query(collection(db, "past_car_data"));
const pastCarData = async () => {
  const unsubscribe = onSnapshot(car_data, (querySnapshot) => {
    const cities = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  });
};

const handleMoveData = async (documentId) => {
  console.log(documentId);
  const sourceCollectionRef = collection(db, 'car_data');

  const q = query(sourceCollectionRef, where('id', '==', documentId));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
      const docu = querySnapshot.docs[0];
      await setDoc(doc(db, 'past_car_data',docu.id), docu.data());
      await deleteDoc(doc(db, 'car_data', docu.id));
  }
};

const deleteCompletedData = async (documentId) => {
  console.log(documentId);
  const sourceCollectionRef = collection(db, 'past_car_data');

  const q = query(sourceCollectionRef, where('id', '==', documentId));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
      const docu = querySnapshot.docs[0];
      await deleteDoc(doc(db, 'past_car_data', docu.id));
  }
};



export {deleteCompletedData,handleMoveData,currentCarData,pastCarData,collection,query,getDocs,onSnapshot,doc,setDoc,getDoc,getFirestore,serverTimestamp,db,event,deleteDoc,where}