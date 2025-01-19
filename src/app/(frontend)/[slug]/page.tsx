import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { homeStatic } from '@/endpoints/seed/home-static'

import type { Category, HomeAd, Media, Page as PageType } from '@/payload-types'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { SidebarProps } from '@/components/SideBar/SidebarProps'
import { Sidebar } from '@/components/SideBar'
import Link from 'next/link'
import { Media as CompMedia } from '@/components/Media'

type adsHolder = {
  adImage: Media | number;
  adUrl: string;
}

export async function generateStaticParams() {

  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })



  const params = pages.docs
    ?.filter((doc) => {
      return doc.slug !== 'home'
    })
    .map(({ slug }) => {
      return { slug }
    })

  return params
}

async function getCategories() {
  let categoryDetails: SidebarProps[] = [];
  const payload = await getPayload({ config: configPromise })

  const categories = await payload.find({
    collection: 'categories',
    depth: 1,
    limit: 15,
    select: {
      title: true,
      icon: true
    },
    pagination: false
  })

  categories.docs.map((category: Category) => {
    categoryDetails.push({
      icon: category.icon ?? "",
      title: category.title
    })
  })

  return categoryDetails;
}

async function getAds() {
  const payload = await getPayload({ config: configPromise })
  let ads: adsHolder[] = [];

  const homeAds = await payload.find({
    collection: "home_ads",
    depth: 1,
    limit: 10,
    select: {
      adImage: true,
      adUrl: true
    },
    where: {
      isActive: {
        equals: true
      }
    }
  })

  homeAds.docs.map((homeAd: HomeAd) => {
    ads.push({
      adImage: homeAd.adImage,
      adUrl: homeAd.adUrl
    })
  })

  return ads;

}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = 'home' } = await paramsPromise
  const url = '/' + slug

  let page: PageType | null

  let categories = await getCategories()
  let ads = await getAds();

  page = await queryPageBySlug({
    slug,
  })

  // Remove this code once your website is seeded
  if (!page && slug === 'home') {
    page = homeStatic
  }

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  const { hero, layout } = page

  return (
    <article className="">
      <PageClient />
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <RenderHero {...hero} />
      {/* Blog Content */}
      <div className="flex h-screen">

        {/* Left Content */}
        <div className="hidden lg:block h-full w-52 bg-background sticky top-0  overflow-hidden">
          <div className="h-full py-6">
            <Sidebar categoryDetails={categories} classname='' />
          </div>
        </div>
        {/* Main Content */}
        <div className="flex-1 flex flex-col w-full">
          <div className="w-full">
            <RenderBlocks blocks={layout} />
          </div>
        </div>
        {/* Right Content */}
        <div className="hidden lg:block w-64 bg-background">
          <div className="h-full py-6">
            {
              ads.map((ad: adsHolder, index) => {
                return <div className='lg:h[10rem] lg:w-[14rem]  rounded-2xl overflow-hidden my-10 cursor-pointer'>
                  <Link href={ad.adUrl}>
                    <CompMedia imgClassName="object-contain" resource={ad.adImage} />
                  </Link>
                </div>
              })
            }
          </div>
        </div>
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }): Promise<Metadata> {
  const { slug = 'home' } = await paramsPromise
  const page = await queryPageBySlug({
    slug,
  })

  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
