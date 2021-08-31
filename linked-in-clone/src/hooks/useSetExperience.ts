import firebase from "../utils/initFirebase";
import { useMutation, QueryCache, useQueryClient } from "react-query";
import { UserExpBack } from "../components/Modals/handleUserExperienceValidation";
import { v4 as uuid } from "uuid";

export const useSetExperience = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (exp: UserExpBack) => {
      const uid = firebase.auth().currentUser?.uid;
      return firebase
        .firestore()
        .collection("users")
        .doc(uid)
        .update({
          experiences: firebase.firestore.FieldValue.arrayUnion(exp),
        });
    },
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries("userInfo");
      },
    }
  );
};
