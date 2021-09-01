import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import firebase from '../utils/initFirebase';

export const useIsAuth = () => {
  const history = useHistory();
  let userId: string | undefined = firebase.auth().currentUser?.uid;
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      // eslint-disable-next-line
      userId = user?.uid;
    });
    if (userId!) {
      // we must be logged in previously
      console.log(`Logged in user ${userId}`);
      history.push(`/`);
    } else {
      // we must not be logged in
      console.log('Sorry you are not logged in');
      history.push(`/login`);
    }
  }, [userId]);
};
