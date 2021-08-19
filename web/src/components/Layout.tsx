import React from "react";

export const Layout: React.FC = ({ children }) => {
  return <div className="container mx-auto md:px-24">{children}</div>;
};
