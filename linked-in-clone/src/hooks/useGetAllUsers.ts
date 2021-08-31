import firebase from '../utils/initFirebase';
import { useQuery } from 'react-query';

export const useGetAllUsers = () => {
  return useQuery('users', async () => {
    const userId = firebase.auth().currentUser?.uid;
    const alreadyConnectedUsers: Array<string> = [];
    const userDoc = await firebase
      .firestore()
      .collection('users')
      .doc(userId)
      .get();

    userDoc
      .data()!
      .connections.map((connection: string) =>
        alreadyConnectedUsers.push(connection)
      );

    const LoggedInUserId = firebase.auth().currentUser?.uid;
    let users: Array<firebase.firestore.DocumentData> = [];
    let userQuery = firebase.firestore().collection('users');

    const userSnapshots = await userQuery
      .where('uuid', '!=', LoggedInUserId)
      .get();

    userSnapshots.forEach((doc) => {
      //filter the users that are pushed to users
      if (!alreadyConnectedUsers.includes(doc.data().uuid))
        users.push(doc.data());
    });

    return users;
  });
};
