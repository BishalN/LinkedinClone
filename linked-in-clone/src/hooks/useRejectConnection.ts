import firebase from '../utils/initFirebase';
import { useMutation, useQueryClient } from 'react-query';

type TypeRejectConnection = {
  userId: string;
  profileUrl: string;
  headline: string;
  fullName: string;
  message: string;
  username: string;
};

//just remove the data from the connection Received array
export const useRejectConnection = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({
      userId,
      profileUrl,
      headline,
      fullName,
      message,
      username,
    }: TypeRejectConnection) => {
      console.log('here we are rejecting');
      //removing the data from the connections requests array
      const loggedInUserId = firebase.auth().currentUser?.uid;
      return firebase
        .firestore()
        .collection('users')
        .doc(loggedInUserId)
        .update({
          connectionRequestsReceived: firebase.firestore.FieldValue.arrayRemove(
            { userId, profileUrl, headline, fullName, message, username }
          ),
        });
    },
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries('userInfo');
      },
    }
  );
};
