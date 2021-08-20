import React, { useEffect } from "react";
import firebase from "../utils/initFirebase";
import { useRouter } from "next/dist/client/router";

export const useIsAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const user = firebase.auth().currentUser;
    console.log(user);
    if (user) {
      router.replace(`/dash/?email=${user.email}`);
    } else {
      router.replace("/login");
    }
  }, []);
};
