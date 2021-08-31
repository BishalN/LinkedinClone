import React from "react";
import { MdErrorOutline } from "react-icons/md";
import { AiFillCaretRight, AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import { IconWithHover } from "./Modals/IconWithHover";

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
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`${
        isOpen ? "block" : "hidden"
      } flex justify-between ${className} ${
        variant === "sucess" ? "bg-green-500" : "bg-red-500"
      } max-w-md rounded-lg px-3 py-3
       text-white flex space-x-3 items-center`}
    >
      {variant === "sucess" ? (
        <div className="flex items-center">
          <AiFillCaretRight size={30} /> <span>{message}</span>
        </div>
      ) : (
        <div className="flex items-center">
          <MdErrorOutline size={30} /> <span>{message}</span>
        </div>
      )}

      <IconWithHover
        Icon={
          <AiOutlineClose
            size={25}
            color="#4B5563"
            onClick={() => setIsOpen(false)}
          />
        }
      />
    </div>
  );
};
