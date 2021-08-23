import React, { DetailedHTMLProps, TextareaHTMLAttributes } from "react";

type UserInputTextareaWithLabelProps = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> & { label: string; id: string };

export const UserInputTextareaWithLabel: React.FC<UserInputTextareaWithLabelProps> = ({
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
      <textarea
        id={id}
        placeholder={placeholder}
        className={`${className} border-2 p-1 w-96 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-sm`}
        {...props}
      />
    </div>
  );
};
