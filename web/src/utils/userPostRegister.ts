import firebase from "./initFirebase";

export const userPostRegisterActions = async (
  value: firebase.auth.UserCredential
) => {
  //creating the doc for the user in firestore
  await firebase.firestore().collection("users").doc(value.user?.uid).set({
    email: value.user?.email,
    profilePictureUrl: value.user?.photoURL,
    about: "",
    username: value.user?.uid,
    firstName: "",
    lastName: "",
    headLine: "",
    currentPosition: "",
    countryRegion: "",
    location: "",
    industry: "",
    educations: [],
    experiences: [],
  });
};
