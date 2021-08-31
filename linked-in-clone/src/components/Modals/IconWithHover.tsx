import React, { ReactNode } from "react";

type IconWithHoverProps = {
  Icon: ReactNode;
};

export const IconWithHover: React.FC<IconWithHoverProps> = ({ Icon }) => {
  return (
    <div className="rounded-full h-10 w-10 flex items-center justify-center hover:bg-gray-200">
      <span>{Icon}</span>
    </div>
  );
};
