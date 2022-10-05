import {initializeApp} from "firebase/app"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyATqpbObMr2Nja79UeVJcO_YxOuqBR64R0",
    authDomain: "imagatest.firebaseapp.com",
    projectId: "imagatest",
    storageBucket: "imagatest.appspot.com",
    messagingSenderId: "644094869769",
    appId: "1:644094869769:web:15314e526780e9310993d8"
  };

  const app = initializeApp(firebaseConfig)
  export const storage = getStorage(app);
  export const db = getFirestore(app);