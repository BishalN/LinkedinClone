import firebase from "../utils/initFirebase";
import { useMutation, useQueryClient } from "react-query";

type TypeCreatPost = {
  uuid: string;
  post: string;
  creatorId: string;
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ creatorId, post, uuid }: TypeCreatPost) => {
      const uid = firebase.auth().currentUser?.uid;
      return firebase
        .firestore()
        .collection("posts")
        .doc(uuid)
        .set({ creatorId, post, uuid, likes: [] }, { merge: true });
    },
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries("posts");
      },
    }
  );
};

//the posts are going to be on the root level of the firestore database we are going to have
// userId
// text or the body of the posts which can have images rich text datastructure
// the likes as an array of maps
// the comments will be subcollection inside the posts
// the comment text and thats it and the ability to edit and remove the comment no reply stuff
