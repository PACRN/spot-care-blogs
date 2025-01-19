import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { Category, Post } from '@/payload-types'
import { Search } from '@/search/Component'
import PageClient from './page.client'
import { CardPostData } from '@/components/Card'
import { Highlightedtemplate1 } from '@/components/Highlghted/HighlightedTemplate1'
import { CategoryResult } from '@/components/CategoryResult'
import { Sidebar } from '@/components/SideBar'
import { SidebarProps } from '@/components/SideBar/SidebarProps'

type Args = {
  searchParams: Promise<{
    q: string
  }>
}
export default async function Page({ searchParams: searchParamsPromise }: Args) {
  const { q: query } = await searchParamsPromise
  const payload = await getPayload({ config: configPromise })
  let categoryDetails: SidebarProps[] = [];

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 100,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
      heroImage: true
    },
    pagination: false,
    where: {
      'categories.title': {
        like: query
      }
    },
  })

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


  return (
    <div className="flex min-h-screen">
      <PageClient />
      {/* Sidebar */}
      <div className="hidden lg:block w-64 border-r bg-background">
        <div className="h-full py-6">
          <Sidebar categoryDetails={categoryDetails} classname='' selected={query} />
        </div>
      </div>
      {/* Main Content */}
      <div className="flex-1 p-8">

        <div className="max-w-4xl mx-auto">
          {posts.totalDocs > 0 ? (
            <CategoryResult posts={posts.docs as CardPostData[]} />
          ) : (
            <div className="container">No results found.</div>
          )}
        </div>
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Spot Care posts`,
  }
}
