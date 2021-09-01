import { useHistory } from 'react-router-dom';
import firebase from '../utils/initFirebase';

export const useRedirectIfNotLoggedIn = () => {
  const userId = firebase.auth().currentUser?.uid;
  const history = useHistory();

  if (!userId) {
    //not logged in
    history.push('/login');
  }
};
