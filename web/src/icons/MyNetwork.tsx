import React from "react";

type MyNetworkProps = {
  className?: string;
  height?: number;
  width?: number;
  color?: string;
};

export const MyNetwork: React.FC<MyNetworkProps> = ({
  className,
  width = 24,
  height = 24,
  color,
}) => {
  return (
    <svg height={height} width={width} className={className} color={color}>
      <path d="m16.5 11c-2.485 0-4.5-2.015-4.5-4.5s2.015-4.5 4.5-4.5 4.5 2.015 4.5 4.5-2.015 4.5-4.5 4.5z"></path>
      <path d="m21 16c0-1.657-1.343-3-3-3h-3c-1.657 0-3 1.343-3 3v6h9z"></path>
      <path d="m3 9.5c0 1.933 1.566 3.5 3.5 3.5s3.5-1.567 3.5-3.5-1.566-3.5-3.5-3.5-3.5 1.567-3.5 3.5z"></path>
      <path d="m10 17.5c0-1.381-1.119-2.5-2.5-2.5h-2c-1.381 0-2.5 1.119-2.5 2.5v4.5h7z"></path>
    </svg>
  );
};
