import Button, { ButtonProps } from "@/shared/Button/Button";
import React from "react";

export interface ButtonOutlinedProps extends ButtonProps {
  className?: string;
  loading?: boolean;
  buttonWdith?: string;
}

const ButtonOutlined: React.FC<ButtonOutlinedProps> = ({
  className = "",
  loading = false,
  children,
  buttonWdith = "",
  ...args
}) => {
  return (
    <Button
      className={`ttnc-ButtonOutlined xs:border-0 border border-primary-600 text-primary-6000 hover:bg-primary-50 disabled:bg-opacity-50 ${className} ${loading ? "cursor-not-allowed" : ""
        }`}
      disabled={loading}
      buttonWdith={buttonWdith}
      {...args}
    >
      {loading ? (
        <svg
          className="animate-spin h-6 w-6 text-primary-6000"
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

export default ButtonOutlined;
