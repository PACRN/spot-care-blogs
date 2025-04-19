import React, { useState, useEffect, useRef } from "react";
import { NavItemType } from "./NavigationItem";
import { NAVIGATION_DEMO } from "data/navigation";
import { XMarkIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import uiUseStore from "store/UIStore";
import appStore from "store/AppStore";
import { ProviderCard } from "containers/PageList/ProviderCard";
import ReportTemplate from "@/shared/PDFTemplate/ReportTemplate";
import { BlobProvider } from "@react-pdf/renderer";
import { TransformListToCSV, epicCsvBuilder } from "utils/csvConvertor";
import { CSVExport } from "types/CSVExport";
import SuccessDialog from "./SuccessDialog";
import { currentDateTimeVal } from "utils/dateTime";
import EmailProviders from "@/shared/Email/emailProviders";
import ButtonGroup from "@/shared/ButtonGroup/buttonGroup";
import { buttonGroupProps } from "@/shared/ButtonGroup/buttonGroup";
import IconButton from "@/shared/Button/IconButton";
import { StatusMessages } from "constants/StatusMessages";
import toast from "react-hot-toast";
import HeroSearchCustomToast from "components/CustomToast/HeroSearchCustomToast";

export interface NavMobileProps {
  data?: NavItemType[];
  className?: string;
}

const NavMobile: React.FC<NavMobileProps> = ({
  data = NAVIGATION_DEMO,
  className = ""
}) => {
  const {
    setEmailDialogOpen,
    setIsDrawerClose,
    EmailDialogOpen,
    isEmailSuccessDialogOpen,
    setIsEmailSuccessDialogOpen,
    servicesTag
  } = uiUseStore();
  const { savedProviderList, tenantConfig } = appStore();
  const [currentDateTime, setCurrentDateTime] = useState<string>("");
  const [triggerDownload, setTriggerDownload] = useState<boolean>(false);
  const [csvList, setCsvList] = useState<CSVExport[]>([]);
  const drawerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setIsEmailSuccessDialogOpen(false);
  }, []);

  useEffect(() => {
    setCsvList(TransformListToCSV(savedProviderList ?? []));
    setIsEmailSuccessDialogOpen(false);
  }, [savedProviderList]);

  // const handleClick = () => {
  //   epicCsvBuilder(csvList);
  // };
  const openEmailDialog = () => {
    if (drawerRef.current) {
      drawerRef?.current?.scrollTo(0, 0);
    }
    setEmailDialogOpen(true);
    setIsEmailSuccessDialogOpen(false);
  };

  const handleDrawerClose = () => {
    setIsDrawerClose(true);
    setIsEmailSuccessDialogOpen(false);
  };

  const handleDownloadClick = () => {
    const now = currentDateTimeVal;
    setCurrentDateTime(now);
    setTriggerDownload(true);
  };

  const buttonGroupVal: buttonGroupProps[] = [
    {
      fieldName: "Email Providers",
      className:
        "flex-1 py-3 text-center bg-white dark:bg-neutral-900 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800 cursor-pointer",
      onClick: openEmailDialog,
      isDisabled: false
    },
    {
      fieldName: "Download",
      className:
        "flex-1 py-3 text-center bg-primary-6000 hover:bg-primary-700 text-neutral-50 cursor-pointer",
      onClick: handleDownloadClick,
      isDisabled: savedProviderList?.length === 0
    }
  ];

  return (
    <div
      className="w-full h-full flex flex-col transition transform shadow-lg ring-1 
    dark:ring-neutral-700 bg-white dark:bg-neutral-800 
    divide-y-2 divide-neutral-100 dark:divide-neutral-800 
    drawer-container"
    >
      {/* Drawer Header Section */}
      <div
        className="flex flex-col border-b 
      dark:border-neutral-700 text-neutral-700 
      dark:text-neutral-300 text-sm px-3"
      >
        <div className="flex justify-between items-center py-1 px-4">
          <p className="w-fit text-xl font-medium">
            Wishlist{" "}
            <span className="light:text-primary-500 dark:text-white-500">
              ({savedProviderList?.length})
            </span>
          </p>
          <div className="flex justify-end items-center">
            {/* <IconButton Icon={DocumentTextIcon} onClick={handleClick} /> */}
            {triggerDownload && (
              <BlobProvider
                document={
                  <ReportTemplate
                    currentDateTime={currentDateTime}
                    savedProviderDetails={savedProviderList || []}
                    logo={tenantConfig.logo.full}
                    caretype={servicesTag ?? ""}
                  />
                }
              >
                {({ blob, url, loading, error }) => {
                  if (loading) return "Loading...";
                  if (error) return "Error loading document";
                  if (blob) {
                    const link = document.createElement("a");
                    link.href = URL.createObjectURL(blob);
                    link.download = "care_providers.pdf";
                    link.click();
                    setTriggerDownload(false);
                    toast.custom((t) => (
                      <HeroSearchCustomToast
                        icon={
                          <CheckCircleIcon
                            className="h-10 w-10 rounded-full text-green-500"
                            aria-hidden="true"
                          />
                        }
                        description1={"Wishlist Provider List"}
                        description2="Downloaded Successfully"
                        toasttype={t}
                      />
                    ));
                  }
                  return null;
                }}
              </BlobProvider>
            )}
            {/* <IconButton Icon={TrashIcon} onClick={clearAllSavedProviderList} /> */}
            <IconButton Icon={XMarkIcon} onClick={handleDrawerClose} />
          </div>
        </div>
      </div>
      {/* Main Content Section */}
      <div ref={drawerRef} className="flex-grow overflow-y-auto scrollbar-hide">
        <div className="flex flex-col h-full gap-y-2 px-4 pt-4">
          {EmailDialogOpen && <EmailProviders />}

          {isEmailSuccessDialogOpen && (
            <SuccessDialog
              message={StatusMessages.SuccessMessages.EmailSuccessToastMessage}
              setIsSuccessDialogOpen={setIsEmailSuccessDialogOpen}
            />
          )}
          {savedProviderList?.map((item) => (
            <div key={item.code}>
              <ProviderCard data={item} fromDrawer={true} />
            </div>
          ))}
          <div className="py-5"></div>
        </div>
      </div>
      <ButtonGroup props={buttonGroupVal} />
    </div>
  );
};

export default NavMobile;
