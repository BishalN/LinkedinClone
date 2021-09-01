import firebase from '../utils/initFirebase';
import { useQuery } from 'react-query';

export const useGetMyPosts = () => {
  const LoggedInUserId = firebase.auth().currentUser?.uid;
  return useQuery('myposts', async () => {
    let posts: Array<firebase.firestore.DocumentData> = [];
    const postSnapshots = await firebase
      .firestore()
      .collection('posts')
      .where('creatorId', '==', LoggedInUserId)
      .get();
    postSnapshots.forEach((doc) => posts.push(doc.data()));
    return posts;
  });
};
