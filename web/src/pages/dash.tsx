import { useRouter } from "next/dist/client/router";
import React from "react";
import { Layout } from "../components/Layout";
import { useIsAuth } from "../hooks/useIsAuthenticated";
import firebase from "../utils/initFirebase";

const dash = () => {
  useIsAuth();
  const router = useRouter();
  const query = router.query;

  return (
    <Layout>
      You must be looged in as {firebase.auth().currentUser?.email}
    </Layout>
  );
};

export default dash;
