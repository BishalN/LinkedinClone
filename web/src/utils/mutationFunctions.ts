import firebase from "./initFirebase";

export const setUserAbout = async (about: string) => {
  const uid = firebase.auth().currentUser?.uid;
  return firebase
    .firestore()
    .collection("users")
    .doc(uid)
    .set({ about }, { merge: true });
};
