import { title } from "process";
import React, { ReactNode } from "react";

export type IconWithTextProps = {
  text: string;
  Icon: ReactNode;
};

export const IconWithText: React.FC<IconWithTextProps> = ({ Icon, text }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <span>{Icon}</span>
      <span className="text-xs text-center">{title}</span>
    </div>
  );
};
