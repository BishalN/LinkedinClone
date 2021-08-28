import firebase from "../utils/initFirebase";
import { useMutation, QueryCache } from "react-query";
import { UserEduBack } from "../components/Modals/handleUserEducationValidation";

export const useSetEducation = () => {
  return useMutation(
    (edu: UserEduBack) => {
      const uid = firebase.auth().currentUser?.uid;
      return firebase
        .firestore()
        .collection("users")
        .doc(uid)
        .update({
          educations: firebase.firestore.FieldValue.arrayUnion(edu),
        });
    },
    {
      onSuccess: (data, variables) => {
        console.log(data);
      },
    }
  );
};
