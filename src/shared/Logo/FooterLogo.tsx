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

const FooterLogo: React.FC<LogoProps> = ({
  img = logoImg,
  imgLight = logoLightImg,
  className = "w-24",
}) => {

  const { tenantConfig } = appStore();
  const { isDarkUi } = uiUseStore();

  return (
    <Link
      to="/"
      className={`ttnc-footer-logo w-full inline-block text-primary-6000 focus:outline-none focus:ring-0 ${className}`}
    >
      <img
          onClick={() => window.scrollTo({
            top: 0,
            behavior: "smooth"
          })}
          className={`block h-16`}
          src={isDarkUi ? tenantConfig.logo.dark : tenantConfig.logo.full}
          alt="Logo"
        />
    </Link>
  );
};

export default FooterLogo;
