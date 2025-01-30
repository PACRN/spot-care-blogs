'use client'
import React, { use, useEffect, useState } from 'react'

import { CardPostData } from '@/components/Card'
import Link from 'next/link'
import Image from 'next/image'
import { Media } from '../Media'
import { Category } from '@/payload-types'
import Badge from '@/components/ui/badge'

export type Props = {
    posts: CardPostData[]
}

export const Highlightedtemplate1: React.FC<Props> = (props) => {
    const { posts } = props
    const [firstPost, setFirstPost] = useState<CardPostData>()
    const [firstFourPosts, setFirstFourPosts] = useState<CardPostData[]>([])



    useEffect(() => {
        if (posts.length > 0) setFirstPost(posts[0])
        setFirstPost(posts[0])
        setFirstFourPosts(posts.slice(1, 4))
    }, [posts])

    return (
        <div className="mx-auto py-8">
            <div className="grid lg:grid-cols-12 gap-8">
                {/* Featured Article */}
                <div className="lg:col-span-6 space-y-6">
                    {firstPost?.meta?.image && (
                        <Link href={`/posts/${firstPost?.slug}`} className="group block">
                            <div className="rounded-lg overflow-hidden">
                                <div className="relative aspect-video w-full rounded-lg overflow-hidden">
                                    <Media
                                        resource={firstPost?.meta?.image ?? "/images/placeholder.jpg"}
                                        imgClassName="object-cover"
                                        fill
                                    />
                                </div>
                                <div className="mt-4 space-y-2">
                                    <div className="flex flex-wrap gap-2">
                                        {firstPost?.categories?.map((category: Category) => (
                                            <Badge key={category.id} name={category.title} color="green" />
                                        ))}
                                    </div>
                                    <h2 className="text-lg sm:text-xl font-semibold tracking-tight line-clamp-2">{firstPost?.title}</h2>
                                    <p className="text-muted-foreground line-clamp-2">{firstPost?.meta?.description}</p>
                                </div>
                            </div>
                        </Link>
                    )}
                </div>

                {/* Article List */}
                <div className="lg:col-span-6 space-y-6">
                    {firstFourPosts.map((article, index) => (
                        <div key={article.title}>
                            <Link href={`/posts/${article.slug}`} className="group block">
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <div className="sm:flex-1 space-y-2">
                                        <div className="flex flex-wrap gap-2">
                                            {article.categories?.map((category: Category) => (

                                                <Badge key={category.id} name={category.title} color="green" />

                                            ))}
                                        </div>
                                        <h3 className="font-semibold line-clamp-2">{article.title}</h3>
                                        <p className="text-sm text-muted-foreground line-clamp-2 sm:line-clamp-3">
                                            {article.meta?.description}
                                        </p>
                                    </div>
                                    <div className="relative aspect-video sm:aspect-video w-full sm:w-1/3 rounded-lg overflow-hidden">
                                        <Media
                                            resource={article.meta?.image ?? "/images/placeholder.jpg"}
                                            imgClassName="object-cover"
                                            fill
                                        />
                                    </div>
                                </div>
                            </Link>
                            {index < firstFourPosts.length - 1 && <hr className="my-6" />}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
