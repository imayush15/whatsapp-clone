// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from 'firebase';


const firebaseConfig = {
  apiKey: "AIzaSyBOxLlQ68xJuaiqvCXxkkTud_3KFlf21B4",
  authDomain: "whatsapp-clone-89ba6.firebaseapp.com",
  databaseURL: "https://whatsapp-clone-89ba6.firebaseio.com",
  projectId: "whatsapp-clone-89ba6",
  storageBucket: "whatsapp-clone-89ba6.appspot.com",
  messagingSenderId: "903232440489",
  appId: "1:903232440489:web:51d854ba2855ae793041b8",
  measurementId: "G-KRFGQT01BE"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider};
export default db;