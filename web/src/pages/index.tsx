import React from "react";
import { Layout } from "../components/Layout";
import { useIsAuth } from "../hooks/useIsAuthenticated";

const Index = () => {
  useIsAuth();
  return (
    <>
      <div className="bg-gray-200 flex">
        <div className="" id="SearchBox"></div>
      </div>
      <Layout>This is amazing</Layout>
    </>
  );
};

export default Index;
