import firebase from '../utils/initFirebase';
import { useQuery } from 'react-query';

export const useGetMyConnections = () => {
  const loggedInUserId = firebase.auth().currentUser?.uid;
  return useQuery('users', async () => {
    let users: Array<firebase.firestore.DocumentData> = [];
    const userSnapshots = await firebase
      .firestore()
      .collection('users')
      .where('connections', 'array-contains', loggedInUserId)
      .get();
    userSnapshots.forEach((doc) => users.push(doc.data()));
    console.log(users);
    return users;
  });
};
