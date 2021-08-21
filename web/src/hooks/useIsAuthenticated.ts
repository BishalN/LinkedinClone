import React, { useEffect } from "react";
import firebase from "../utils/initFirebase";
import { useRouter } from "next/dist/client/router";

export const useIsAuth = () => {
  const router = useRouter();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        router.replace(`/dash/?email=${user.email}`);
      } else {
        router.replace("/login");
      }
    });
  }, []);
};
