import firebase from "firebase";
import { useEffect } from "react";
import "../styles/global.css";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    firebase.initializeApp({
      apiKey: "AIzaSyA2bPljM4ShbumjDvktysVOJDFiLjKE_7U",
      authDomain: "linkedin-8024f.firebaseapp.com",
      projectId: "linkedin-8024f",
      storageBucket: "linkedin-8024f.appspot.com",
      messagingSenderId: "293020003179",
      appId: "1:293020003179:web:253cc35b70869161b37a2e",
      measurementId: "G-8V3G4Z18MC",
    });
  }, []);
  return <Component {...pageProps} />;
}
