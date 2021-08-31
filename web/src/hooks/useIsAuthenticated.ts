import { useEffect } from "react";
import firebase from "../utils/initFirebase";
import { useRouter } from "next/dist/client/router";

export const useIsAuth = () => {
  const router = useRouter();
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        router.replace("/login?next=" + router.pathname);
      }
    });
  }, []);
};
