import React from "react";

interface ButtonProps {
  title: string;
}

export const Button: React.FC<ButtonProps> = ({ title }) => {
  return <button>{title}</button>;
};
