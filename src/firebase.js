import firebase from 'firebase';
import 'firebase/auth'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBDF1fTfziccCszYWrtV2t8PVloHacREjM",
    authDomain: "messenger-9c0ee.firebaseapp.com",
    projectId: "messenger-9c0ee",
    storageBucket: "messenger-9c0ee.appspot.com",
    messagingSenderId: "134689209238",
    appId: "1:134689209238:web:c83ed44edd4258cb2e7bb7",
    measurementId: "G-9PWE01VN4N"
  })


  const auth = firebaseApp.auth()

  const db = firebaseApp.firestore();

  export {auth,db}; 