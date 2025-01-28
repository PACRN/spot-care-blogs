import type { Metadata } from 'next'
import rightImg from "../../../images/about-hero-right.png"
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
import { SidebarProps } from '@/components/NavBar/SidebarProps'
import { TopNavbar } from '@/components/NavBar'
import Link from 'next/link'
import { Media as CompMedia } from '@/components/Media'
import SectionHero from '@/components/PageHero'

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

      <div className="sticky top-0 z-10">
        <TopNavbar categoryDetails={categories} classname='' />
      </div>

      <div className='nc-page-article'>

        {/* <RenderHero {...hero} /> */}
        <div className="container py-16 lg:py-16 space-y-16 lg:space-y-16">
          <SectionHero
            rightImg={rightImg.src}
            heading="Spot Care Blogs 👋"
            btnText=""
            subHeading="We’re impartial and independent, and every day we create distinctive, world-class programmes and content which inform, educate and entertain millions of people in the around the world."
          />
        </div>

        {/* Blog Content */}
        <div className="flex h-screen">

          {/* Left Content */}

          {/* Main Content */}
          <div className="flex-1 flex flex-col w-full">

            <div className="w-full">
              <RenderBlocks blocks={layout} />
            </div>
          </div>
          {/* Right Content */}

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
