import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";

type UserInputWithLabelProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & { label: string; id: string; error?: string };

export const UserInputWithLabel: React.FC<UserInputWithLabelProps> = ({
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
      <input
        type="text"
        id={id}
        placeholder={placeholder}
        className={`${className} w-96 rounded-sm`}
        {...props}
      />
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};
