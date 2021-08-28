import firebase from "../utils/initFirebase";
import { useMutation, QueryCache } from "react-query";
import { UserInfoValues } from "../components/Modals/handleUserInfoValidation";

export const useSetInfo = () => {
  return useMutation(
    (info: UserInfoValues) => {
      const uid = firebase.auth().currentUser?.uid;
      return firebase
        .firestore()
        .collection("users")
        .doc(uid)
        .set({ info }, { merge: true });
    },
    {
      onSuccess: (data, variables) => {
        console.log(data);
      },
    }
  );
};
