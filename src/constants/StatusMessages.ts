export const StatusMessages = {
    //Success Messages
    SuccessMessages: {
        ProfileUpdate: "Profile updated successfully",
        EmailVerification: "Verification link has been sent to your email address",
        OtpVerification: "Verification code has been sent to your email address",
        PasswordReset: "Password reset successfully",
        EmailCodeVerification: "Verification code has been sent to your email address",
        Verification: "Verification successful",
        ProfilePictureUpdate: "Profile picture removed successfully",
        MessageSent: "Thank you! We'll get back to you soon",
        EmailSuccessToastMessage: "Email sent successfully",
        WishlistPDFToastMessage: "Wishlist PDF downloaded successfully!"
    },
    //Error Messages
    ErrorMessage: {
        ProfileUpdate: "Failed to update profile",
        OtpVerification: "Verification failed",
        PasswordReset: "Invalid link. Please retry verification",
        OTPError: "Unexpected error occurred",
        InvalidSearchField: "Please enter the required search criteria",
        LoginError: "Invalid username or password",
        WentWrongError: "Something went wrong, please try again",
        ProfilePictureUpdate: "Failed to remove profile picture",
        VerificationCode: "Invalid verfication code",
        VerificationCodeMissing: "Verification code is missing",
        LoadingDocument: "Error loading document",
        NoProvidersSelected: "Please select providers to send",
        PasswordResetFailed: "Invalid or expired link, please retry later",
        CaptchaVerification: "Please verify you are human",
        RadiusInputValidationDescription1: "Enter search criteria",
        RadiusInputValidationDescription2: "Please select the care type, radius and location",
        LocationInputValidationDescription1: "Invalid address",
        LocationInputValidationDescription2: "Make sure you have entered a valid State or City",
        InvalidImageType: "Invalid image type selected. Only JPG, JPEG, and PNG formats are allowed",
        ImageSize: "Image size exceeds the limit. Please upload an image less than 2MB",
        NoImage: "Choose a Valid Image",
        ReportIssueNoCategory: "Please select a category",
        ReportIssueAdditionalInformation: "Please provide additional information"
    },
    //Schema Messages
    SchemaMessage: {
        EmailAddressValidation: "Invalid email address",
        EmailRequired: "Email is required",
        FirstNameRequired: "First name is required",
        FirstNameCondition: {
            minimumValidation: "Firstname should be atleast 3 characters",
            maximumValidation: "First name should be less than 25 characters"
        },
        LastNameRequired: "Last name is required",
        LastNameCondition: {
            maximumValidation: "Last name should be less than 25 characters"
        },
        PhoneNumberValid: "Invalid phone number",
        PhoneNumberRequired: "Phone is required",
        PasswordValidation: "Password must be at least 8 characters long",
        PasswordRequired: "Password is required",
        FullNameRequired: "Name is required",
        MessageRequired: "Message is required"
    }
}