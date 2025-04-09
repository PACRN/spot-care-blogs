
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
import { formatAuthors } from '@/utilities/formatAuthors'
import { formatDateTime } from '@/utilities/formatDateTime'
import '@fortawesome/fontawesome-free/css/all.min.css';
import Badge from '@/components/ui/badge'

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
  const { populatedAuthors, publishedAt } = post
  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== ''

  if (!post) return <PayloadRedirects url={url} />

  return (
    <article className="">
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <div className="nc-post-article relative flex px-10 gap-10">

        <div className="hidden lg:block w-1/4 h-screen py-10 sticky top-0  overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 gap-10">
          <Link href={`/home`} passHref
            className="text-purple-500 hover:text-purple-700 font-normal py-4 rounded mb-10"
          >
            ← &nbsp;  Back
          </Link>
          <TableOfContents post={post} classname='mt-14' />
        </div>

        <div className="w-full flex flex-col gap-4 pt-8 flex-grow overflow-y-auto">
          <div className="">
            <div className='flex gap-10'>
              <div className="scrollbar-hide">
                <div className="flex-1 mb-2 visible lg:hidden">
                  <Link href={`/`} passHref
                    className="text-purple-500 hover:text-purple-700 font-normal py-2 rounded mb-10 w-full"
                  >
                    ← &nbsp;  Back
                  </Link>
                </div>
                <h1 className="mb-6 text-xl md:text-4xl lg:text-4xl font-semibold">{post.title}</h1>

                <div className="my-5 flex flex-col sm:flex-row sm:justify-between">
                  <div className="uppercase text-sm mb-3 sm:mb-0">
                    {post.categories?.map((category, index) => {
                      if (typeof category === 'object' && category !== null) {
                        const { title: categoryTitle } = category;

                        const titleToUse = categoryTitle || 'Untitled category';

                        return (
                          <Badge key={titleToUse} name={titleToUse} color="green" />
                        );
                      }
                      return null;
                    })}
                  </div>
                  <div className="flex flex-wrap items-center justify-start sm:justify-end gap-4 text-sm text-gray-600">
                    {publishedAt && (
                      <time dateTime={publishedAt} className="flex items-center gap-1">
                        <span className="font-normal dark:text-white">{formatDateTime(publishedAt)}</span>
                      </time>
                    )}
                    |
                    {hasAuthors && (
                      <div className="flex items-center gap-1">
                        <span className="font-normal dark:text-white">{formatAuthors(populatedAuthors)}</span>
                      </div>
                    )}

                  </div>
                </div>


                <PostHero post={post} />
                <RichText
                  className="max-w-[80rem] pb-8 pt-4"
                  data={post.content}
                  enableGutter={false}
                />

              </div>


            </div>
          </div>
        </div>

        <div className="hidden lg:block w-1/4 h-screen py-8 sticky top-0  overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 gap-10">
          {
            ads.map((ad: Ad, index) => {
              return <div className='lg:h[10rem] lg:w-[10rem]  rounded-2xl overflow-hidden my-10 cursor-pointer' key={ad.id}>
                <Link href={ad.adUrl}>
                  <Media imgClassName="object-contain" resource={ad.adImage} />
                </Link>
              </div>
            })
          }
        </div>
      </div>
      {post.relatedPosts && post.relatedPosts?.length > 0 && (
        <div>
          <div className='container my-4'>
            <hr />
          </div>
          <div className='container my-8'>
            <div className="relative inline-flex items-center">
              <div className="absolute left-0 w-10 h-10 bg-purple-300 dark:bg-purple-500 rounded-full" aria-hidden="true" />
              <h2 className="relative  text-xl z-10 pl-4">Related Articles</h2>
            </div>

            <RelatedPosts
              className="mx-auto mb-8 mt-8 max-w-full "
              docs={post.relatedPosts.filter((post) => typeof post === 'object')}
            />
          </div>
        </div>


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
