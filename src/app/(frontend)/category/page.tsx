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
import { TopNavbar } from '@/components/NavBar'
import { SidebarProps } from '@/components/NavBar/SidebarProps'
import Link from 'next/link'
import { ParentTheme } from '@/components/ParentTheme'

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
    <div className="min-h-screen">
      <PageClient />
      <div className="sticky top-0 z-10">
        <TopNavbar categoryDetails={categoryDetails} classname='' selected={query} />
      </div>
      {/* <ParentTheme pageType='page' /> */}
      {/* Sidebar */}
      {/* <div className="hidden lg:block w-64 border-r bg-background"> */}
      {/* <div className="h-full py-6">
          <TopNavbar categoryDetails={categoryDetails} classname='' selected={query} />
        </div> */}
      {/* </div> */}
      {/* Main Content */}

      <div className="flex-1  mx-auto">
        <Link href={`/`} passHref
          className="text-purple-500 hover:text-purple-700 font-normal py-2 rounded mb-10 w-full"
        >
          ← &nbsp;  Back
        </Link>
      </div>

      <div className="flex-1 p-8">

        <div className=" mx-auto">
          {posts.totalDocs > 0 ? (
            <CategoryResult posts={posts.docs as CardPostData[]} />
          ) : (
            <div className="container w-full text-center">No results found.</div>
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
