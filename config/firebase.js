import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDdKPlIwvpWat17YXrP9Q3E7l4TJMf98-o",
    authDomain: "inje-custom-project.firebaseapp.com",
    projectId: "inje-custom-project",
    storageBucket: "inje-custom-project.appspot.com",
    messagingSenderId: "68866624798",
    appId: "1:68866624798:web:96ebb6c868295ed0090d0f"
  };

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const firestore = getFirestore();
export { firestore };