import { HeartIcon } from "@heroicons/react/24/solid";
import React, { FC, Fragment, useRef, useEffect } from "react";
import NavMobile from "@/shared/Navigation/NavMobile";
import { Transition, Dialog } from "@headlessui/react";
import uiUseStore from "store/UIStore";
import appStore from "store/AppStore";

export interface SavedProvidersProps {
  className?: string;
}

const SavedProviders: FC<SavedProvidersProps> = ({ className = "" }) => {
  const emailSendRef = useRef<HTMLFormElement>(null);
  const {
    setEmailDialogOpen,
    setDrawerClose,
    isDrawerClose,
    isEmailSendClicked
  } = uiUseStore((state) => ({
    EmailDialogOpen: state.EmailDialogOpen,
    setEmailDialogOpen: state.setEmailDialogOpen,
    setDrawerClose: state.setIsDrawerClose,
    isDrawerClose: state.isDrawerClose,
    CareType: state.CareType,
    isEmailSendClicked: state.isEmailSendClicked,
    setIsEmailSendClicked: state.setIsEmailSendClicked
  }));
  const { savedProviderList } = appStore();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" && !isEmailSendClicked) {
        event.preventDefault(); // Prevent default form submission
        emailSendRef.current?.requestSubmit(); // Trigger form submission programmatically
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isEmailSendClicked]);

  const handleOpenMenu = () => {
    setDrawerClose(false);
    setEmailDialogOpen(false);
  };
  const handleCloseMenu = () => {
    setEmailDialogOpen(false);
  };

  const renderContent = () => {
    return (
      <Transition appear show={!isDrawerClose} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 overflow-hidden"
          onClose={handleCloseMenu}
        >
          <Transition.Child
            as={Fragment}
            enter=" duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave=" duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-neutral-900 bg-opacity-50" />
          </Transition.Child>
          <div className="fixed inset-0">
            <div className="flex justify-end h-full">
              <Transition.Child
                as={Fragment}
                enter="transition duration-100 transform"
                enterFrom="opacity-0 translate-x-56"
                enterTo="opacity-100 translate-x-0"
                leave="transition duration-150 transform"
                leaveFrom="opacity-100 translate-x-0"
                leaveTo="opacity-0 translate-x-56"
              >
                <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden transition-all ">
                  <NavMobile />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    );
  };
  return (
    <>
      <span
        onClick={handleOpenMenu}
        className={`text-2xl xs:text-3xl relative w-12 h-12 rounded-full text-neutral-700 dark:text-neutral-300  xs:flex items-center justify-center ${className} ${savedProviderList &&
          savedProviderList?.length === 0 &&
          "pointer-events-none"
          }`}
      >
        <HeartIcon
          className={`w-7 h-7  ${savedProviderList && savedProviderList?.length > 0
              ? "text-red-500 cursor-pointer"
              : "text-white dark:text-slate-900"
            }`}
          aria-hidden="true"
        />
        <span
          className={`${savedProviderList && savedProviderList?.length > 0
              ? "absolute bg-red-500 p-1 rounded-full top-2 right-1 xs:top-0 xs:right-0 xs:p-0"
              : ""
            }`}
        ></span>
      </span>
      {renderContent()}
    </>
  );
};

export default SavedProviders;
