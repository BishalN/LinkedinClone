import firebase from '../utils/initFirebase';
import { useQuery } from 'react-query';

export const useGetUserByUsername = (username: string) => {
  return useQuery(['user', username], async () => {
    const users: any = [];
    const userSnapshots = await firebase
      .firestore()
      .collection('users')
      .where('username', '==', username)
      .get();
    userSnapshots.forEach((doc) => users.push(doc.data()));
    console.log(users);
    return users[0];
  });
};
