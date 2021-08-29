import firebase from "../utils/initFirebase";
import { useMutation, useQueryClient } from "react-query";

type TypeDeleteComment = {
  commentId: string;
  postId: string;
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ commentId, postId }: TypeDeleteComment) => {
      //we need to create the subcollection of the comments inside the posts document
      return firebase
        .firestore()
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .doc(commentId)
        .delete();
    },
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries(["comments"]);
      },
    }
  );
};
