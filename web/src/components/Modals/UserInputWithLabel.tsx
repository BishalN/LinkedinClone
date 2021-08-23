import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";

type UserInputWithLabelProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & { label: string; id: string };

export const UserInputWithLabel: React.FC<UserInputWithLabelProps> = ({
  label,
  placeholder,
  id,
  className,
  ...props
}) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="text-gray-500">
        {label}
      </label>
      <input
        type="text"
        id={id}
        placeholder={placeholder}
        className={`${className} border-2 p-1 w-96 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-sm`}
        {...props}
      />
    </div>
  );
};
