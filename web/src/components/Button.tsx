import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  ReactNode,
} from "react";
import { Spinner } from "./Spinner";

const sizeClassNames = {
  big: "py-2 px-4 rounded-lg text-sm",
  small: "px-2 py-1 rounded-sm text-sm",
  tiny: "px-1 text-sm rounded-5",
};

const varaintsClassNames = {
  ghost: "text-gray-500 hover:bg-gray-200  bg-none",
  filled: "bg-blue-500 hover:bg-blue-700 text-white  border-blue-500",
  outlined: "hover:bg-gray-100  border-blue-500 border-2",
};

export type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  size?: keyof typeof sizeClassNames;
  variant?: keyof typeof varaintsClassNames;
  loading?: boolean;
  icon?: ReactNode;
  transition?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  size = "big",
  variant = "ghost",
  loading,
  icon,
  transition,
  disabled,
  className = "",
  ...props
}) => {
  return (
    <button
      disabled={disabled || loading}
      className={`${className} flex justify-center outline-none focus:ring-1 focus:ring-blue-500 
      ${sizeClassNames[size]} ${
        transition ? `transition duration-200 ease-in-out` : ``
      } ${varaintsClassNames[variant]}  `}
      data-testid="button"
      {...props}
    >
      <span className={loading ? "opacity-0" : `flex items-center`}>
        {icon ? <span className={`mr-2 items-center`}>{icon}</span> : null}
        {children}
      </span>
      {loading ? (
        <span className={`absolute`}>
          <Spinner size={size === "small" ? "2" : "4"} />
        </span>
      ) : null}
    </button>
  );
};
