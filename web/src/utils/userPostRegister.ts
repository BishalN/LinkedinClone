import firebase from "./initFirebase";

export const userPostRegisterActions = async (
  value: firebase.auth.UserCredential
) => {
  //creating the doc for the user in firestore
  const userExperiences = firebase
    .firestore()
    .collection("users")
    .doc(value.user?.uid)
    .collection("userExperiences")
    .doc(value.user?.uid);

  const userInfo = firebase
    .firestore()
    .collection("users")
    .doc(value.user?.uid)
    .collection("userInfo")
    .doc(value.user?.uid);

  const userEducations = firebase
    .firestore()
    .collection("users")
    .doc(value.user?.uid)
    .collection("userEducations")
    .doc(value.user?.uid);

  await firebase.firestore().collection("users").doc(value.user?.uid).set({
    email: value.user?.email,
    profilePictureUrl: value.user?.photoURL,
    userExperiences,
    about: "",
    username: value.user?.uid,
    userInfo,
    userEducations,
  });
};
