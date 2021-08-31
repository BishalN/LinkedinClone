import firebase from "firebase";

let config = {
  apiKey: "AIzaSyA2bPljM4ShbumjDvktysVOJDFiLjKE_7U",
  authDomain: "linkedin-8024f.firebaseapp.com",
  projectId: "linkedin-8024f",
  storageBucket: "linkedin-8024f.appspot.com",
  messagingSenderId: "293020003179",
  appId: "1:293020003179:web:253cc35b70869161b37a2e",
  measurementId: "G-8V3G4Z18MC",
};

try {
  firebase.initializeApp(config);
} catch (error) {
  console.log(error);
}

export default firebase;
