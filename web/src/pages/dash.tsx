import { useRouter } from "next/dist/client/router";
import React from "react";
import { Layout } from "../components/Layout";
import { LoggedInLayout } from "../components/LoggedInLayout";
import { NavBar } from "../components/NavBar";
import { useIsAuth } from "../hooks/useIsAuthenticated";
import firebase from "../utils/initFirebase";

const dash = () => {
  useIsAuth();
  const router = useRouter();
  const query = router.query;

  return (
    <LoggedInLayout>
      <h1>Hey there</h1>
    </LoggedInLayout>
  );
};

export default dash;
