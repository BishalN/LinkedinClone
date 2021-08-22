import { title } from "process";
import React, { ReactNode } from "react";

export type IconWithTextProps = {
  text: string;
  Icon: ReactNode;
  className?: string;
};

export const IconWithText: React.FC<IconWithTextProps> = ({
  Icon,
  text,
  className,
}) => {
  return (
    <div className={`${className} flex flex-col justify-center items-center`}>
      <span>{Icon}</span>
      <span className="hidden md:inline-block text-xs text-center">{text}</span>
    </div>
  );
};
