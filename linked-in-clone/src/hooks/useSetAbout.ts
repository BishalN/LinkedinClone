import firebase from "../utils/initFirebase";
import { useMutation, useQueryClient } from "react-query";

export const useSetAbout = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (about: string) => {
      const uid = firebase.auth().currentUser?.uid;
      return firebase
        .firestore()
        .collection("users")
        .doc(uid)
        .set({ about }, { merge: true });
    },
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries("userInfo");
      },
    }
  );
};
