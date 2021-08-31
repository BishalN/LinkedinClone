import firebase from "../utils/initFirebase";
import { useMutation, useQueryClient } from "react-query";

type TypeEditComment = {
  commentId: string;
  comment: string;
  postId: string;
};

export const useEditComment = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ comment, commentId, postId }: TypeEditComment) => {
      //we need to create the subcollection of the comments inside the posts document
      return firebase
        .firestore()
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .doc(commentId)
        .set({ comment, commentId }, { merge: true });
    },
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries(["comments"]);
      },
    }
  );
};
