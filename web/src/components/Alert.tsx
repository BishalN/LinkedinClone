import React from "react";
import { MdErrorOutline } from "react-icons/md";
import { AiFillCaretRight } from "react-icons/ai";

// Our alert will look simple will accept a variant
// success failure

export type AlertProps = {
  variant?: "sucess" | "failure";
  message: string;
  className?: string;
};

export const Alert: React.FC<AlertProps> = ({
  variant,
  message,
  className,
}) => {
  if (variant === "sucess") {
    return (
      <div
        className={`bg-green-500 max-w-md flex space-x-3
          items-center rounded-lg px-3 py-3 text-white ${className}`}
      >
        <AiFillCaretRight size={30} /> <span>{message}</span>
        {message}
      </div>
    );
  }
  return (
    <div
      className={`bg-red-500 max-w-md rounded-lg px-3 py-3
       text-white flex space-x-3 items-center ${className}`}
    >
      <MdErrorOutline size={30} /> <span>{message}</span>
    </div>
  );
};
