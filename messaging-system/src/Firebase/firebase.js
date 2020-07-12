import * as firebase from 'firebase'


var firebaseConfig = {
    apiKey: "AIzaSyBjVqYZiTV5n6UQ2GxuQqQgnXJ5LPyYmGo",
    authDomain: "messaging-system-8edcf.firebaseapp.com",
    databaseURL: "https://messaging-system-8edcf.firebaseio.com",
    projectId: "messaging-system-8edcf",
    storageBucket: "messaging-system-8edcf.appspot.com",
    messagingSenderId: "865281644766",
    appId: "1:865281644766:web:ae830d07598f0d49e0ca4f",
    measurementId: "G-G0GLFMY8TV"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();



export {db, auth}