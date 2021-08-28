//     {
//       onMutate: (values) => {
//         const oldPost = queryCache.getQueryData(['posts', values.id])
//         queryCache.setQueryData(['posts', values.id], values)
//         return () => queryCache.setQueryData(['posts', values.id], oldPost)
//       },
//       onError: (error, values, rollback) => rollback(),
//       onSuccess: (data, variables) => {
//         queryCache.invalidateQueries('posts')
//         queryCache.invalidateQueries(['posts', variables.id])
//       },
//     }
//   )
// }

// we need to handle the optimistic updates and cached stuff
import firebase from "../utils/initFirebase";
import { useMutation, QueryCache, useQueryClient } from "react-query";

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
