
import type { Metadata } from 'next'

import { RelatedPosts } from '@/blocks/RelatedPosts/Component'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'

import type { Ad, Post } from '@/payload-types'

import { PostHero } from '@/heros/PostHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { TableOfContents } from '@/components/TableOfContents'
import { Media } from '@/components/Media'
import Link from 'next/link'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = posts.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Post({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const url = '/posts/' + slug
  const post = await queryPostBySlug({ slug })
  const ads = post.ads ?? []

  if (!post) return <PayloadRedirects url={url} />

  return (
    <article className="">
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <div className="relative flex px-10 gap-10">
        {/* Left Panel */}
        <div className="hidden lg:block w-1/6 h-screen py-8 sticky top-0  overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 gap-10">
          <Link href={`/articles--guides`} passHref
            className="text-purple-500 hover:text-purple-700 font-bold py-2 rounded mb-10"
          >
            ← &nbsp;  view all
          </Link>
          <TableOfContents post={post} classname='mt-10' />
        </div>

        {/* Right Content Area */}
        <div className="w-full flex flex-col gap-4 pt-8 flex-grow overflow-y-auto">
          <PostHero post={post} />
          <div className="">
            <div className='my-5'>
              <div className="uppercase text-sm">
                {post.categories?.map((category, index) => {
                  if (typeof category === 'object' && category !== null) {
                    const { title: categoryTitle } = category

                    const titleToUse = categoryTitle || 'Untitled category'

                    // const isLast = index === categories.length - 1

                    return (
                      <span key={index} className="text-muted-foreground uppercase text-md bg-purple-300 text-purple-700 font-semibold px-2 mr-2 my-auto py-1 rounded-xl">
                        {titleToUse}
                        {/* {!isLast && <React.Fragment>, &nbsp;</React.Fragment>} */}
                      </span>
                    )
                  }
                  return null
                })}
              </div>
            </div>

            <div className='flex gap-10'>
              <div className="">
                <h1 className="mb-6 text-3xl md:text-4xl lg:text-5xl line-clamp-2">{post.title}</h1>
                <RichText
                  className="max-w-[80rem]"
                  data={post.content}
                  enableGutter={false}
                />
              </div>
              <div className="hidden lg:block w-1/4 overflow-hidden">
                {
                  ads.map((ad: Ad, index) => {
                    return <div className='lg:h[10rem] lg:w-[10rem]  rounded-2xl overflow-hidden my-10 cursor-pointer'>
                      <Link href={ad.adUrl}>
                        <Media imgClassName="object-contain" resource={ad.adImage} />
                      </Link>
                    </div>
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      {post.relatedPosts && post.relatedPosts?.length > 0 && (
        <RelatedPosts
          className="mt-12 max-w-[52rem] lg:grid lg:grid-cols-subgrid col-start-1 col-span-3 grid-rows-[2fr] p-4 mx-auto"
          docs={post.relatedPosts.filter((post) => typeof post === 'object')}
        />
      )}
    </article >
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const post = await queryPostBySlug({ slug })

  return generateMeta({ doc: post })
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
