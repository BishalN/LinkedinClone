import React from "react";
import { NavBar } from "../components/NavBar";

export const LoggedInLayout: React.FC = ({ children }) => {
  return (
    <>
      <NavBar />
      <main className="bg-gray-50 h-screen">{children}</main>
    </>
  );
};
