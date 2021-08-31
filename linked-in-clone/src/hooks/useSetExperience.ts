import firebase from '../utils/initFirebase';
import { useMutation, useQueryClient } from 'react-query';
import { UserExpBack } from '../components/Modals/handleUserExperienceValidation';

export const useSetExperience = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (exp: UserExpBack) => {
      const uid = firebase.auth().currentUser?.uid;
      return firebase
        .firestore()
        .collection('users')
        .doc(uid)
        .update({
          experiences: firebase.firestore.FieldValue.arrayUnion(exp),
        });
    },
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries('userInfo');
      },
    }
  );
};
