import React, { FC } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";

export interface SuccessDialogProps {
  img?: string;
  content?: string;
  contentToBold?: string;
  onClick: () => void;
  btnString?: string;
  dialogWidth?: string;
}

const SuccessDialog: FC<SuccessDialogProps> = ({
  img = "",
  content = "",
  contentToBold = "",
  onClick = () => { },
  btnString = "",
  dialogWidth = ""
}) => {
  return (
    <>
      <div
        className={`${dialogWidth} flex flex-col text-neutral-700 dark:text-neutral-300 justify-center items-center gap-y-6 px-6 py-6`}
      >
        <img height={100} width={100} src={img} alt="" />
        <p className="text-base font-normal text-center max-w-sm break-words">
          {content}
          <span className="font-semibold">{contentToBold}</span>
        </p>
        <div className="w-full flex flex-row justify-center items-center">
          <ButtonPrimary className="rounded p-1" onClick={onClick}>
            {btnString}
          </ButtonPrimary>
        </div>
      </div>
    </>
  );
};

export default SuccessDialog;
