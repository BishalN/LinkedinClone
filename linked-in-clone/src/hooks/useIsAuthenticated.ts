import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import firebase from '../utils/initFirebase';

export const useIsAuth = () => {
  const history = useHistory();
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) history.replace('/login');
    });
  }, [history]);
};
