import React from "react";
import { Link } from "react-router-dom";
import logoImg from "images/logo.png";
import logoLightImg from "images/logo-light.png";
import LogoSvgLight from "./LogoSvgLight";
import LogoSvg from "./LogoSvg";
import appStore from "store/AppStore";
import uiUseStore from "store/UIStore";

export interface LogoProps {
  img?: string;
  imgLight?: string;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({
  img = logoImg,
  imgLight = logoLightImg,
  className = "w-24",
}) => {

  const { tenantConfig } = appStore();
  const { isDarkUi } = uiUseStore();

  return (
    <Link
      to="/"
      className={`ttnc-logo inline-block text-primary-6000 focus:outline-none focus:ring-0 ${className}`}
    >
      <img
        className={`block  xs:h-[2rem] md:h-[3.6rem] lg:h-[3.6rem]`}
        src={isDarkUi ? tenantConfig.logo.dark : tenantConfig.logo.full}
        alt="Logo"
      />
    </Link>
  );
};

export default Logo;
