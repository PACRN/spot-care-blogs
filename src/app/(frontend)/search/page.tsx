import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { Post } from '@/payload-types'
import { Search } from '@/search/Component'
import PageClient from './page.client'
import { CardPostData } from '@/components/Card'
import { ParentTheme } from '@/components/ParentTheme'
import Link from 'next/link'

type Args = {
  searchParams: Promise<{
    q: string
  }>
}
export default async function Page({ searchParams: searchParamsPromise }: Args) {
  const { q: query } = await searchParamsPromise
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'search',
    depth: 1,
    limit: 12,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
    // pagination: false reduces overhead if you don't need totalDocs
    pagination: false,
    ...(query
      ? {
        where: {
          or: [
            {
              title: {
                like: query,
              },
            },
            {
              'meta.description': {
                like: query,
              },
            },
            {
              'meta.title': {
                like: query,
              },
            },
            {
              slug: {
                like: query,
              },
            },
          ],
        },
      }
      : {}),
  })

  return (
    <div className="mx-10 py-12 w-full">
      <PageClient />
      {/* <ParentTheme pageType='page' /> */}
      <div className="mb-16">
        <div className="flex-1 mx-auto">
          <Link href={`/home`}
            className="text-purple-500 hover:text-purple-700 font-normal py-2 rounded mb-10 w-full"
          >
            ← &nbsp;  Back
          </Link>
        </div>
        <div className="prose dark:prose-invert max-w-none text-center">

          <h1 className="mb-8">Search</h1>

          <div className="max-w-[50rem] mx-auto">
            <Search selected={query} />
          </div>
        </div>
      </div>

      {posts.totalDocs > 0 ? (
        <div className='my-4'>
          <CollectionArchive posts={posts.docs as CardPostData[]} />
        </div>

      ) : (
        <div className="container w-full text-center">No results found.</div>
      )}
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Spot Care posts Search`,
  }
}
