'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  return (

    <div className="relative h-1/6 flex items-end overflow-hidden w-full">
      <div className="z-10 relative lg:grid lg:grid-cols-[1fr_48rem_1fr] text-white pb-8">
        <div className="col-start-1 col-span-1 md:col-start-1 md:col-span-2 mx-20">
          <div className="flex flex-col md:flex-row gap-4 md:gap-16">
            {richText && (
              <div className="flex flex-col gap-1">
                {richText && <RichText className="mb-6" data={richText} enableGutter={false} />}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="h-[50vh] select-none w-full">
        {media && typeof media !== 'string' && (
          <Media fill priority imgClassName="-z-10 object-cover " resource={media} />
        )}
        <div className="absolute pointer-events-none left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent" />
      </div>
    </div>
  )
}
