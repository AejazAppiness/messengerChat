import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/storage';

const firebaseApp = firebase.initializeApp({
  "projectId": "messenger-9c0ee",
  "appId": "1:134689209238:web:097feeace9c539ba2e7bb7",
  "storageBucket": "messenger-9c0ee.appspot.com",
  "locationId": "us-central",
  "apiKey": "AIzaSyBDF1fTfziccCszYWrtV2t8PVloHacREjM",
  "authDomain": "messenger-9c0ee.firebaseapp.com",
  "messagingSenderId": "134689209238",
  "measurementId": "G-PMLQCB0XXH"
  })


  const auth = firebaseApp.auth();
  const db = firebaseApp.firestore();
  const storage = firebaseApp.storage();

  export {auth,db, storage}; 