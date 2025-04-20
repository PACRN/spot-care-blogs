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
    collection: 'posts',
    depth: 1,
    limit: 12,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
      heroImage: true,
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
    <div className="mx-0 md:mx-10 py-4">
      <PageClient />
      {/* <ParentTheme pageType='page' /> */}
      <div className="w-full flex flex-col sm:flex-row justify-between">
        <Link
          href={`/home`}
          className="text-purple-600 hover:text-purple-800 text-sm font-medium transition-colors"
        >
          ← Back to Home
        </Link>
        <div className="flex items-center justify-center sm:justify-end mt-4 sm:mt-0">
          <span className="text-2xl font-bold">Search Results</span>
        </div>
        <div className="w-full sm:w-auto flex-grow sm:flex-grow-0">
          <Search selected={query} />
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
