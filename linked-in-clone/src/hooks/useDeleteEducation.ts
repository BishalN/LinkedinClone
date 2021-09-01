import firebase from '../utils/initFirebase';
import { useMutation, useQueryClient } from 'react-query';
import { UserEduBack } from '../components/Modals/handleUserEducationValidation';

export const useDelteEducation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (edu: UserEduBack) => {
      const uid = firebase.auth().currentUser?.uid;
      return firebase
        .firestore()
        .collection('users')
        .doc(uid)
        .update({
          educations: firebase.firestore.FieldValue.arrayRemove(edu),
        });
    },
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries('user');
      },
    }
  );
};
