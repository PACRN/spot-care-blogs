import { create } from "zustand";

type State = {
    isHomePage?: boolean;
    CareType?: string;
    HeaderLocation?: string;
    HeaderRadius?: string;
    EmailDialogOpen?: boolean;
    isDrawerClose?: boolean;
    isPreffered: boolean;
    isReportDialogOpen?: boolean;
    isMoreInfoDialogOpen?: boolean;
    dialogProviderName?: string;
    dialogProviderCode?: string;
    isDarkUi?: boolean;
    isHeaderBorderVisible?: boolean;
    currentPage: number;
    showHeroMobileSearch?: boolean;
    caretypeMobile?: boolean;
    locationtypeMobile?: boolean;
    radiusTypeMobile?: boolean;
    locationvalue?: string;
    careTypevalue?: string;
    radiusTypeValue?: string;
    isList?: boolean;
    storeLatitude?: number;
    storeLongitute?: number;
    storePostalCode?: string;
    isShowCareVerticalLine?: boolean;
    storeCurrentHoverId?: string | number;
    isEmailSendClicked: boolean;
    servicesTag?: string;
    isTabFiltersOpen: boolean;
    isForceLogin: boolean;
    isLoginPage: boolean;
    isLoggedIn: boolean;
    showLogin: boolean;
    showSignup: boolean;
    isReportSuccessDialogOpen: boolean;
    showConfirmationPopup: boolean;
    homePageListingProviderName?: string;
    activeSubsectionId?: number;
    isReviewSelected: boolean;
    activeSection: number;
    isEmailSuccessDialogOpen: boolean;
    isResetPassword: boolean;
    isVerificationPending: boolean;
    isTokenRecieved: boolean;
    isForgotPassword: boolean;
}

type Action = {
    setIsHomePage: (isHomePage: State["isHomePage"]) => void;
    setCareType: (CareType: State["CareType"]) => void;
    setHeaderLocation: (HeaderLocation: State["HeaderLocation"]) => void;
    setHeaderRadius: (HeaderRadius: State["HeaderRadius"]) => void;
    setEmailDialogOpen: (EmailDialogOpen: State["EmailDialogOpen"]) => void;
    setIsDrawerClose: (isDrawerClose: State["isDrawerClose"]) => void
    setIsPreffered: (isPreffered: State["isPreffered"]) => void;
    setIsReportDialogOpen: (isReportDialogOpen: State["isReportDialogOpen"]) => void;
    setIsMoreInfoDialogOpen: (isDialogOpen: State["isMoreInfoDialogOpen"]) => void;
    setDialogProviderName: (provideName: State["dialogProviderName"]) => void;
    setDialogProviderCode: (provideName: State["dialogProviderCode"]) => void;
    setIsDarkUi: (isDark: State["isDarkUi"]) => void;
    setIsHeaderBorderVisible: (isVisible: State["isHeaderBorderVisible"]) => void;
    setCurrentPage: (page: State["currentPage"]) => void;
    setShowHeroMobileSearch: (isShow: State["showHeroMobileSearch"]) => void;
    setCareTypeMobile: (isCareTypeMobile: State["caretypeMobile"]) => void;
    setLocationTypeMobile: (islocationTypeMobile: State["locationtypeMobile"]) => void;
    setLocationValue: (isValue: State["locationvalue"]) => void;
    setRadiusTypeMobile: (isMobile: State["radiusTypeMobile"]) => void;
    setCareTypeValue: (caretype: State["careTypevalue"]) => void;
    setRadiusTypeValue: (radiustype: State["radiusTypeValue"]) => void;
    setIsList: (isList: State["isList"]) => void;
    setLatitude: (lat: State["storeLatitude"]) => void;
    setLongitude: (lon: State["storeLongitute"]) => void;
    setStorePostalCode: (postalCode: State["storePostalCode"]) => void;
    setIsShowCareVeticalLine: (isShow: State["isShowCareVerticalLine"]) => void;
    setStoreCurrentHoverId: (curentHoverId: State["storeCurrentHoverId"]) => void;
    setIsEmailSendClicked: (isEmailSendClicked: State["isEmailSendClicked"]) => void;
    setServicesTag: (serviceTag: State["servicesTag"]) => void;
    setIsTabFiltersOpen: (tabfiltersOpen: boolean) => void;
    setIsForceLogin: (forceLogin: boolean) => void;
    setIsLoginPage: (forceLogin: boolean) => void;
    setIsLoggedIn: (loggedIn: boolean) => void;
    setShowLogin: (showLogin: boolean) => void;
    setShowSignup: (showSignup: boolean) => void;
    setIsReportSuccessDialogOpen: (isOpen: boolean) => void;
    setShowConfirmationPopup: (isOpen: boolean) => void;
    setHomePageListingProviderName: (providerName: string) => void;
    setActiveSubsectionId: (id: number) => void;
    setIsReviewSelected: (isSelected: boolean) => void;
    setActiveSection: (activenumber: number) => void;
    setIsEmailSuccessDialogOpen: (isDialog: State["isEmailSuccessDialogOpen"]) => void;
    setIsResetPassword: (isResetPassword: boolean) => void;
    setIsVerificationPending: (isVerificationPending: boolean) => void;
    setIsTokenRecieved: (isTokenRecieved: boolean) => void;
    setIsForgotPassword: (isForgotPassword: boolean) => void;
}

const uiUseStore = create<State & Action>((set) => ({
    isPreffered: false,
    isHomePage: false,
    CareType: "",
    HeaderLocation: "",
    HeaderRadius: "",
    EmailDialogOpen: false,
    isDrawerClose: true,
    isReportDialogOpen: false,
    isMoreInfoDialogOpen: false,
    dialogProviderName: "",
    dialogProviderCode: "",
    isDarkUi: false,
    isHeaderBorderVisible: true,
    currentPage: 1,
    showHeroMobileSearch: false,
    caretypeMobile: false,
    locationtypeMobile: false,
    locationvalue: '',
    radiusTypeMobile: false,
    careTypevalue: '',
    radiusTypeValue: '',
    isList: false,
    storeLatitude: 0,
    storeLongitute: 0,
    storePostalCode: '',
    isShowCareVerticalLine: true,
    storeCurrentHoverId: -1,
    isEmailSendClicked: false,
    servicesTag: "",
    isTabFiltersOpen: true,
    isForceLogin: false,
    isLoginPage: false,
    isLoggedIn: false,
    showLogin: false,
    showSignup: false,
    isReportSuccessDialogOpen: false,
    showConfirmationPopup: false,
    homePageListingProviderName: '',
    activeSubsectionId: 0,
    isReviewSelected: false,
    activeSection: 0,
    isEmailSuccessDialogOpen: false,
    isResetPassword: false,
    isVerificationPending: false,
    isTokenRecieved: false,
    isForgotPassword: false,
    setIsTokenRecieved: (isTokenRecieved) => set({ isTokenRecieved: isTokenRecieved }),
    setIsResetPassword: (isResetPassword) => set({ isResetPassword: isResetPassword }),
    setIsHomePage: (isHomePage) => set({ isHomePage: isHomePage }),
    setCareType: (CareType) => set({ CareType: CareType }),
    setHeaderLocation: (Location) => set({ HeaderLocation: Location }),
    setHeaderRadius: (Radius) => set({ HeaderRadius: Radius }),
    setEmailDialogOpen: (DiaogOpen) => set({ EmailDialogOpen: DiaogOpen }),
    setIsDrawerClose: (isClose) => set({ isDrawerClose: isClose }),
    setIsPreffered: (preffered) => set({ isPreffered: preffered }),
    setIsReportDialogOpen: (isDialogOpen) => set({ isReportDialogOpen: isDialogOpen }),
    setIsMoreInfoDialogOpen: (isDialogOpen) => set({ isMoreInfoDialogOpen: isDialogOpen }),
    setDialogProviderName: (name) => set({ dialogProviderName: name }),
    setIsDarkUi: (isDark) => set({ isDarkUi: isDark }),
    setIsHeaderBorderVisible: (isVisible) => set({ isHeaderBorderVisible: isVisible }),
    setCurrentPage: (page) => set({ currentPage: page }),
    setShowHeroMobileSearch: (isShow) => set({ showHeroMobileSearch: isShow }),
    setCareTypeMobile: (isCareTypeMobile) => set({ caretypeMobile: isCareTypeMobile }),
    setLocationTypeMobile: (isLocationTypeMobile) => set({ locationtypeMobile: isLocationTypeMobile }),
    setLocationValue: (isValue) => set({ locationvalue: isValue }),
    setRadiusTypeMobile: (isMobile) => set({ radiusTypeMobile: isMobile }),
    setCareTypeValue: (caretype) => set({ careTypevalue: caretype }),
    setRadiusTypeValue: (radiustype) => set({ radiusTypeValue: radiustype }),
    setIsList: (isList) => set({ isList: isList }),
    setLatitude: (lat) => set({ storeLatitude: lat }),
    setLongitude: (lon) => set({ storeLongitute: lon }),
    setStorePostalCode: (postalcode) => set({ storePostalCode: postalcode }),
    setIsShowCareVeticalLine: (isShow) => set({ isShowCareVerticalLine: isShow }),
    setStoreCurrentHoverId: (currentHoverId) => set({ storeCurrentHoverId: currentHoverId }),
    setIsEmailSendClicked: (isEmailClick) => set({ isEmailSendClicked: isEmailClick }),
    setDialogProviderCode: (name) => set({ dialogProviderCode: name }),
    setServicesTag: (serviceTag) => set({ servicesTag: serviceTag }),
    setIsTabFiltersOpen: (tabFilters) => set({ isTabFiltersOpen: tabFilters }),
    setIsForceLogin: (forceLogin) => set({ isForceLogin: forceLogin }),
    setIsLoginPage: (isLogin) => set({ isLoginPage: isLogin }),
    setIsLoggedIn: (loggedIn) => set({ isLoggedIn: loggedIn }),
    setShowLogin: (showLogin) => set({ showLogin: showLogin }),
    setShowSignup: (showSignup) => set({ showSignup: showSignup }),
    setIsReportSuccessDialogOpen: (isOpen) => set({ isReportSuccessDialogOpen: isOpen }),
    setShowConfirmationPopup: (isOpen) => set({ showConfirmationPopup: isOpen }),
    setHomePageListingProviderName: (providerName) => set({ homePageListingProviderName: providerName }),
    setActiveSubsectionId: (id) => set({ activeSubsectionId: id }),
    setIsReviewSelected: (isSelected) => set({ isReviewSelected: isSelected }),
    setActiveSection: (activeSectionNumber) => set({ activeSection: activeSectionNumber }),
    setIsEmailSuccessDialogOpen: (isDialogOpen) => set({ isEmailSuccessDialogOpen: isDialogOpen }),
    setIsVerificationPending: (verificationPending) => set({ isVerificationPending: verificationPending }),
    setIsForgotPassword: (isPassword) => set({ isForgotPassword: isPassword })
}))

export default uiUseStore;