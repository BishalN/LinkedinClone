import firebase from "../utils/initFirebase";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useGetAllPosts = () => {
  return useQuery("posts", async () => {
    let posts: Array<firebase.firestore.DocumentData> = [];
    const postSnapshots = await firebase.firestore().collection("posts").get();
    postSnapshots.forEach((doc) => posts.push(doc.data()));
    return posts;
  });
};
