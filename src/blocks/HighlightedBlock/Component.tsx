import type { Post, HighlightedBlock as HighlightedBlockProps } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { Highlightedtemplate1 } from '@/components/Highlghted/HighlightedTemplate1'
import RichText from '@/components/RichText'

export const HighlightedBlock: React.FC<
  HighlightedBlockProps & {
    id?: string
  }
> = async (props) => {
  const { id, categories, introContent, limit: limitFromProps, populateBy, selectedDocs } = props

  const limit = limitFromProps || 3

  let posts: Post[] = []

  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })

    const flattenedCategories = categories?.map((category) => {
      if (typeof category === 'object') return category.id
      else return category
    })

    const fetchedPosts = await payload.find({
      collection: 'posts',
      depth: 1,
      limit,
      ...(flattenedCategories && flattenedCategories.length > 0
        ? {
          where: {
            categories: {
              in: flattenedCategories,
            },
          },
        }
        : {}),
    })

    posts = fetchedPosts.docs
  } else {
    if (selectedDocs?.length) {
      const filteredSelectedPosts = selectedDocs.map((post) => {
        if (typeof post.value === 'object') return post.value
      }) as Post[]

      posts = filteredSelectedPosts
    }
  }


  return (
    <div className="border-t" id={`block-${id}`}>
      {introContent && (
        <div className="mt-8 relative inline-flex items-center">
          <div className="absolute left-0 w-10 h-10 bg-purple-300 dark:bg-purple-500 rounded-full" aria-hidden="true" />
          <h2 className="relative z-10 pl-4"><RichText className="ml-0 max-w-[48rem]" data={introContent} enableGutter={false} /></h2>
        </div>
      )}
      <Highlightedtemplate1 posts={posts} />
    </div>
  )
}
