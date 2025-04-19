import Button, { ButtonProps } from "@/shared/Button/Button";
import React from "react";

export interface ButtonPrimaryProps extends ButtonProps {
  className?: string;
  loading?: boolean;
}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
  className = "",
  loading = false,
  children,
  ...args
}) => {
  return (
    <Button
      className={`ttnc-ButtonPrimary font-semibold disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50 ${className} ${loading ? "cursor-not-allowed" : ""
        }`}
      disabled={loading}
      {...args}
    >
      {loading ? (
        <svg
          className="animate-spin h-6 w-6 text-neutral-50"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
          ></path>
        </svg>
      ) : (
        children
      )}
    </Button>
  );
};

export default ButtonPrimary;
