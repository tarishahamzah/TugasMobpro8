import firebase from 'firebase'

var firebaseConfig = {
  apiKey: "AIzaSyBLpcIPx6Rn584wuzSm6A-_nO6YPmuECic",
  authDomain: "mobprotugas8.firebaseapp.com",
  projectId: "mobprotugas8",
  storageBucket: "mobprotugas8.appspot.com",
  messagingSenderId: "940151396676",
  appId: "1:940151396676:web:eb86e2c55450ad1c569f11"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase