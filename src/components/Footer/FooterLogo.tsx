import React from "react";
import logoImg from "images/logo.png";
import logoLightImg from "images/logo-light.png";
import Link from "next/link";

export interface LogoProps {
    img?: string;
    imgLight?: string;
    className?: string;
}

const FooterLogo: React.FC<LogoProps> = ({
    className = "w-24",
}) => {


    return (
        <Link
            href="/"
            className={`ttnc-footer-logo w-full inline-block text-primary-6000 focus:outline-none focus:ring-0 ${className}`}
        >
            <img
                onClick={() => window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                })}
                className={`block h-16`}
                src="https://spot.care/static/media/full.43b96d0f5e7320fec90a.png"
                alt="Logo"
            />
        </Link>
    );
};

export default FooterLogo;
