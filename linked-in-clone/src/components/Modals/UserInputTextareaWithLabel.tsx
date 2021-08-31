import React, { DetailedHTMLProps, TextareaHTMLAttributes } from "react";

type UserInputTextareaWithLabelProps = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> & { label: string; id: string; error?: string };

export const UserInputTextareaWithLabel: React.FC<UserInputTextareaWithLabelProps> = ({
  label,
  placeholder,
  id,
  className,
  error,
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
        className={`${className} w-96  rounded-sm`}
        {...props}
      />
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};
