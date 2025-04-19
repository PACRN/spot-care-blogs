import React, { useState } from "react";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import Input from "@/shared/Input/Input";
import uiUseStore from "store/UIStore";
import { BlobProvider } from "@react-pdf/renderer";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ReportTemplate from "@/shared/PDFTemplate/ReportTemplate";
import { currentDateTimeVal } from "utils/dateTime";
import appStore from "store/AppStore";
import { Services } from "services/service";
import { StatusMessages } from "constants/StatusMessages";
import toast from "react-hot-toast";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "components/FormError/FormError";

interface EmailProviderFormData {
  firstName: string;
  lastName?: string;
  email: string;
}

const schema = yup.object().shape({
  firstName: yup
    .string()
    .required(StatusMessages.SchemaMessage.FirstNameRequired),
  lastName: yup.string(),
  email: yup
    .string()
    .required(StatusMessages.SchemaMessage.EmailRequired)
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      StatusMessages.SchemaMessage.EmailAddressValidation
    )
});

const EmailProviders = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<EmailProviderFormData>({ resolver: yupResolver(schema) });

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const {
    setEmailDialogOpen,
    isEmailSendClicked,
    CareType,
    setIsEmailSendClicked,
    setIsEmailSuccessDialogOpen
  } = uiUseStore();
  const { savedProviderList, tenantConfig, setLoader } = appStore();

  const handleClose = () => {
    setEmailDialogOpen(false);
  };

  const sendEmail = async (blob: Blob) => {
    await Services.SendEmail(blob, email, firstName, lastName);
    setLoader(false);
    setIsEmailSendClicked(false);
    setEmailDialogOpen(false);
    setIsEmailSuccessDialogOpen(true);
  };

  const onEmailSubmit: SubmitHandler<EmailProviderFormData> = (data) => {
    if (savedProviderList && savedProviderList.length > 0) {
      if (data.firstName && data.email) {
        setIsEmailSendClicked(true);
        setEmail(data.email);
        setFirstName(data.firstName);
        setLastName(data.lastName ?? "");
      }
    } else {
      toast.error(StatusMessages.ErrorMessage.NoProvidersSelected);
    }
  };

  return (
    <div className="flex flex-col text-neutral-700 dark:text-neutral-300 justify-center items-start gap-y-6 px-6 pt-6 pb-5">
      <p className="text-base font-normal text-left">
        You can send the saved providers to recipients. Please enter your name
        and the email address
      </p>
      <form
        className="w-full flex flex-col justify-center items-center gap-y-6"
        onSubmit={handleSubmit(onEmailSubmit)}
      >
        <div className="w-full flex items-center justify-between gap-5">
          <div className="flex-1">
            <span className="font-semibold text-neutral-800 dark:text-neutral-200">
              First Name
            </span>
            <Input
              {...register("firstName")}
              type="text"
              placeholder="First Name"
              className={`mt-2 ${errors.firstName ? "border-red-500" : "border-gray-300"
                }`}
              rounded="rounded-lg"
            />
            <FormError message={errors.firstName?.message} />
          </div>
          <div className="flex-1">
            <span className="font-semibold text-neutral-800 dark:text-neutral-200">
              Last Name
            </span>
            <Input
              {...register("lastName")}
              type="text"
              placeholder="Last Name"
              className={`mt-2`}
              rounded="rounded-lg"
            />
            <FormError message={""} />
          </div>
        </div>
        <div className="w-full">
          <span className="font-semibold text-neutral-800 dark:text-neutral-200">
            Email address
          </span>
          <Input
            {...register("email")}
            type="text"
            placeholder="example@gmail.com"
            className={`mt-2 ${errors.email ? "border-red-500" : "border-gray-300"
              }`}
            rounded="rounded-lg"
          />
          <FormError message={errors.email?.message} />
        </div>
        <div className="w-full flex flex-row justify-between items-center">
          <ButtonSecondary onClick={handleClose}>Cancel</ButtonSecondary>
          {isEmailSendClicked ? (
            <BlobProvider
              document={
                <ReportTemplate
                  currentDateTime={currentDateTimeVal()}
                  savedProviderDetails={savedProviderList || []}
                  logo={tenantConfig.logo.full}
                  caretype={CareType ?? "Skilled Nursing"}
                />
              }
            >
              {({ blob, url, loading, error }) => {
                if (loading) return "sending...";
                if (error) return StatusMessages.ErrorMessage.LoadingDocument;
                if (blob) {
                  if (isEmailSendClicked) {
                    sendEmail(blob);
                  }
                }
              }}
            </BlobProvider>
          ) : (
            <ButtonPrimary type="submit" className="rounded p-1">
              Send
            </ButtonPrimary>
          )}
        </div>
      </form>
    </div>
  );
};

export default EmailProviders;
