import React from "react";

export interface IconButtonProps {
  Icon: React.ForwardRefExoticComponent<
    React.SVGProps<SVGSVGElement> & React.RefAttributes<SVGSVGElement>
  >;
  className?: string;
  onClick: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({
  Icon,
  className = "",
  onClick
}) => {
  return (
    <button
      className={`text-2xl md:text-3xl w-12 h-12 rounded-full text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none flex items-center justify-center ${className}`}
      onClick={onClick}
    >
      <Icon className="w-5 h-5 cursor-pointer" aria-hidden="true" />
    </button>
  );
};

export default IconButton;
