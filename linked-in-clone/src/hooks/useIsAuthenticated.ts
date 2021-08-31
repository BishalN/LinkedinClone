import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import firebase from '../utils/initFirebase';

export const useIsAuth = () => {
  const history = useHistory();
  const userId = firebase.auth().currentUser?.uid;
  useEffect(() => {
    if (!userId) {
      history.replace('/login');
    }
  }, [userId, history]);
};
