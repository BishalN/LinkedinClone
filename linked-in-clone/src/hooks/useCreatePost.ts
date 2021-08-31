import firebase from '../utils/initFirebase';
import { useMutation, useQueryClient } from 'react-query';

type TypeCreatPost = {
  uuid: string;
  post: string;
  creatorId: string;
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ creatorId, post, uuid }: TypeCreatPost) => {
      return firebase
        .firestore()
        .collection('posts')
        .doc(uuid)
        .set({ creatorId, post, uuid, likes: [] }, { merge: true });
    },
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries('posts');
      },
    }
  );
};
