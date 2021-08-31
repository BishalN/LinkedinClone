import firebase from "../utils/initFirebase";
import { useMutation, useQueryClient } from "react-query";

export const useToggleLikePost = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (postId: string) => {
      const uid = firebase.auth().currentUser?.uid;

      const post = await firebase
        .firestore()
        .collection("posts")
        .doc(postId)
        .get();

      console.log(post.data());

      const index = post.data()!.likes.indexOf(uid);

      console.log(index);

      if (index >= 0) {
        //the user has liked we need to unlike the post here
        console.log("Unlike request made");
        return firebase
          .firestore()
          .collection("posts")
          .doc(postId)
          .update({ likes: firebase.firestore.FieldValue.arrayRemove(uid) });
      } else {
        // the user has not yet liked the post we need to like the post here
        console.log("Like request made");
        return firebase
          .firestore()
          .collection("posts")
          .doc(postId)
          .update({ likes: firebase.firestore.FieldValue.arrayUnion(uid) });
      }
    },
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries("posts");
      },
    }
  );
};
