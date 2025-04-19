import { FC, ReactNode } from "react";
import toast, { Toast } from "react-hot-toast";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface heroSearchCustomToastInterface {
  icon: ReactNode;
  description1: string;
  description2: string;
  toasttype: Toast;
}

const HeroSearchCustomToast: FC<heroSearchCustomToastInterface> = ({
  icon,
  description1 = "",
  description2 = "",
  toasttype
}) => {
  return (
    <div
      className={`${
        toasttype.visible ? "animate-enter" : "animate-leave"
      } max-w-md w-full z-50 rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 shadow-xl bg-white dark:bg-neutral-800 relative`}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
            {icon}
            {/* <ExclamationTriangleIcon
              className="h-10 w-10 rounded-full text-yellow-400"
              aria-hidden="true"
            /> */}
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-200">
              {description1}
            </p>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {description2}
            </p>
          </div>
        </div>
      </div>
      <XMarkIcon
        className="absolute top-2 right-2 w-4 cursor-pointer"
        onClick={() => toast.remove(toasttype.id)}
      />
    </div>
  );
};

export default HeroSearchCustomToast;
