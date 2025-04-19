import { FC } from "react";
import ButtonClose from "@/shared/ButtonClose/ButtonClose";

interface ErrorMessageInterface {
  errorMessage?: string;
  className?: string;
  setIsMessageClose: (state: boolean) => void;
}

const ErrorMessage: FC<ErrorMessageInterface> = ({
  errorMessage = "",
  className = "",
  setIsMessageClose
}) => {
  return (
    <div
      className={`bg-red-300 text-red-700 pl-2 pr-0 w-full flex items-center justify-between rounded-md ${className}`}
    >
      <p>{errorMessage}</p>
      <ButtonClose
        className="text-red-700"
        isHover={false}
        onClick={() => {
          setIsMessageClose(false);
        }}
      />
    </div>
  );
};

export default ErrorMessage;
