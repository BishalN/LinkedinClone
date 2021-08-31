import { useEffect } from "react";
import firebase from "../utils/initFirebase";
import { useRouter } from "next/dist/client/router";

export const useIsAuth = () => {
  const router = useRouter();
  const userId = firebase.auth().currentUser?.uid;
  useEffect(() => {
    if (!userId) {
      router.replace("/login?next=" + router.pathname);
    }
  }, [userId]);
};
