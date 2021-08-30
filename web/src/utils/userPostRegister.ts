import firebase from "./initFirebase";

export const userPostRegisterActions = async (
  value: firebase.auth.UserCredential
) => {
  //creating the doc for the user in firestore
  await firebase.firestore().collection("users").doc(value.user?.uid).set({
    email: value.user?.email,
    profilePictureUrl: value.user?.photoURL,
    uuid: value.user?.uid,
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
    // will be an array of object containg the userId,headline,profileUrl and message
    connectionRequestsRecieved: [],
    // will be an array of object containing the userId,headline and profileUrl
    connections: [],
    //will be an array of strings that contain the userId/uuid
    connectionRequestsSent: [],
  });
};
