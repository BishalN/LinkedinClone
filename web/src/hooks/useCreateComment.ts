import firebase from "../utils/initFirebase";
import { useMutation, useQueryClient } from "react-query";

type TypeCreateComment = {
  uuid: string;
  comment: string;
  commenterId: string;
  commenterProfile: string;
  postId: string;
};

export const useCreateComment = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({
      commenterId,
      comment,
      uuid,
      postId,
      commenterProfile,
    }: TypeCreateComment) => {
      //we need to create the subcollection of the comments inside the posts document
      return firebase
        .firestore()
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .doc(uuid)
        .set({ commenterId, comment, commenterProfile, uuid }, { merge: true });
    },
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries("posts");
        queryClient.invalidateQueries(["comments"]);
      },
    }
  );
};
