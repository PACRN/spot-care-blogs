import ButtonClose from "@/shared/ButtonClose/ButtonClose";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";

interface SuccessDialogProps {
  message: string;
  setIsSuccessDialogOpen: (state: boolean) => void;
}

const SuccessDialog: React.FC<SuccessDialogProps> = ({
  message = "",
  setIsSuccessDialogOpen
}) => {
  return (
    <div className="text-neutral-700 dark:text-neutral-300 w-full flex justify-between px-5 p-1 align-middle relative bg-green-100 rounded-md">
      <p className="text-base font-normal text-center text-green-800 p-2 flex">
        <CheckBadgeIcon className="h-6 w-6 mr-2" /> {message}
      </p>
      <ButtonClose
        className="text-gray-300 dark:text-gray-600 mt-1"
        onClick={() => setIsSuccessDialogOpen(false)}
      />
    </div>
  );
};

export default SuccessDialog;
