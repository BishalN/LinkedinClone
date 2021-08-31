import firebase from "./initFirebase";

export const getUserInfo = async () => {
  const uid = firebase.auth().currentUser?.uid;
  return firebase
    .firestore()
    .collection("users")
    .doc(uid)
    .get()
    .then((res) => res.data());
};
