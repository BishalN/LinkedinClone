import React, { HTMLAttributes } from "react";

export const Layout: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
}) => {
  return (
    <div className={`container mx-auto md:px-24 overflow-hidden ${className}`}>
      {children}
    </div>
  );
};
