'use client'
import { useTheme } from '@/providers/Theme';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export const ParentTheme = ({ pageType }: { pageType: string }) => {

    const { setTheme } = useTheme()
    const { refresh } = useRouter()

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.data && event.data.type === "PARENT_THEME_MESSAGE") {
                const theme = event.data.data;
                if (theme === "dark" || theme === "light") {
                    setTheme(theme)
                }
            }
        }

        window.addEventListener("message", handleMessage)

        return () => {
            window.removeEventListener("message", handleMessage)
        }
    }, [])

    useEffect(() => {

        if (typeof window !== "undefined") {
            refresh()
            setTimeout(() => {
                window.parent.postMessage(
                    {
                        iframeHeight: document.documentElement.querySelector(`.nc-${pageType}-article`)?.scrollHeight || 0,
                    },
                    "*"
                );
            }, 1000);

        }
    }, [typeof window !== "undefined" && window.location.href]);


    return (
        <></>
    )

};