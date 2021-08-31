import firebase from "../utils/initFirebase";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useGetAllComments = (postId: string) => {
  //first get the reference for the comment that we want to get for and then other things
  return useQuery(["comments", postId], async () => {
    let comments: Array<firebase.firestore.DocumentData> = [];
    const commentsSnapshot = await firebase
      .firestore()
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .get();
    commentsSnapshot.forEach((doc) => comments.push(doc.data()));
    return comments;
  });
};
