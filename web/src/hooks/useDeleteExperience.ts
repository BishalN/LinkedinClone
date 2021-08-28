import firebase from "../utils/initFirebase";
import { useMutation, useQueryClient } from "react-query";
import { UserExpBack } from "../components/Modals/handleUserExperienceValidation";

export const useDeleteExperience = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (exp: UserExpBack) => {
      const uid = firebase.auth().currentUser?.uid;
      return firebase
        .firestore()
        .collection("users")
        .doc(uid)
        .update({
          experiences: firebase.firestore.FieldValue.arrayRemove(exp),
        });
    },
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries("userInfo");
      },
    }
  );
};
