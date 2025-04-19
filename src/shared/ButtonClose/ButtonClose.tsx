import React from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import twFocusClass from "utils/twFocusClass";

export interface ButtonCloseProps {
  className?: string;
  onClick?: () => void;
  sizes?: string;
  isHover?: boolean;
}

const ButtonClose: React.FC<ButtonCloseProps> = ({
  className = "",
  onClick = () => {},
  sizes = "w-5 h-5",
  isHover = true
}) => {
  return (
    <button
      className={
        `w-8 h-8 flex items-center justify-center rounded-full text-neutral-700 dark:text-neutral-300 ${
          isHover ? "hover:bg-neutral-100 dark:hover:bg-neutral-700" : ""
        } ${className} ` + twFocusClass()
      }
      onClick={onClick}
    >
      <span className="sr-only">Close</span>
      <XMarkIcon className={`${sizes}`} />
    </button>
  );
};

export default ButtonClose;
