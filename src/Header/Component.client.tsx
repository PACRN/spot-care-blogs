'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { Services } from '@/services/service'
import appStore from '@/store/AppStore'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const { setCareTypes } = appStore();
  const pathname = usePathname()

  useEffect(() => {
    LoadCares();
  }, [])

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  const LoadCares = async () => {
    const cares = await Services.LoadCareTypes();
    setCareTypes(cares);
  }

  return (
    <header className="px-8 relative z-20   " {...(theme ? { 'data-theme': theme } : {})}>
      <div className="py-4 flex justify-between">
        <Link href="https://spot.care">
          <Logo loading="eager" priority="high" className="invert dark:invert-0" />
        </Link>
        {/* <HeaderNav data={data} /> */}
      </div>
    </header>
  )
}
