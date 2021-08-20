import React, {
  ReactHTMLElement,
  InputHTMLAttributes,
  DetailedHTMLProps,
} from "react";

export type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const Input: React.FC<InputProps> = ({ className, ...props }) => {
  const inputClass = `border-2 p-3 border-gray-500 border-transparent focus:border-transparent
focus:outline-none focus:ring-2 focus:ring-blue-500  rounded-sm ${className} `;
  return <input className={inputClass} {...props} />;
};
