'use client'
import React, { FC, ReactNode, useEffect, useState } from "react";
import { set } from "react-hook-form";
import { ParentTheme } from "../ParentTheme";

export interface SectionHeroProps {
    className?: string;
    rightImg: string;
    heading: ReactNode;
    subHeading: string;
    btnText: string;
}

const SectionHero: FC<SectionHeroProps> = ({
    className = "",
    rightImg,
    heading,
    subHeading
}) => {

    return (
        <div
            className={`nc-SectionHero relative ${className}`}
            data-nc-id="SectionHero"
        >

            <div className="flex flex-col lg:flex-row space-y-14 lg:space-y-0 lg:space-x-10 items-center  relative text-start md:text-center lg:text-left">
                <div className="w-screen max-w-full xl:max-w-lg space-y-5 lg:space-y-7">
                    <h2 className="text-3xl !leading-tight font-semibold text-black md:text-4xl xl:text-5xl dark:text-neutral-100">
                        {heading}
                    </h2>
                    <span className="block text-base xl:text-lg text-muted-foreground">
                        {subHeading}
                    </span>
                </div>
                <div className="flex-grow">
                    <img className="w-full" src={rightImg} alt="" />
                </div>
            </div>
        </div>
    );
};

export default SectionHero;
