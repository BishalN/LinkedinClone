import firebase from '../utils/initFirebase';
import { useMutation, useQueryClient } from 'react-query';

export const useEditUsername = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ username, userId }: { username: string; userId: string }) => {
      const userAlreadyExists = await firebase
        .firestore()
        .collection('users')
        .where('username', '==', username)
        .get();

      if (userAlreadyExists.size > 0)
        throw new Error('username already in use');

      return firebase
        .firestore()
        .collection('users')
        .doc(userId)
        .set({ username }, { merge: true });
    },
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries('user');
      },
    }
  );
};
