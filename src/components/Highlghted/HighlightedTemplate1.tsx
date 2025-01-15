'use client'
import React, { use, useEffect, useState } from 'react'

import { CardPostData } from '@/components/Card'
import Link from 'next/link'
import Image from 'next/image'
import { Media } from '../Media'
import { Category } from '@/payload-types'

export type Props = {
    posts: CardPostData[]
}

export const Highlightedtemplate1: React.FC<Props> = (props) => {
    const { posts } = props
    const [firstPost, setFirstPost] = useState<CardPostData>()
    const [firstFourPost, setFirstFourPost] = useState<CardPostData[]>()



    useEffect(() => {
        if (posts.length > 0) setFirstPost(posts[0])
        setFirstPost(posts[0])
        setFirstFourPost(posts.slice(1, 5))
    }, [posts])

    return (
        <div className="container mx-auto rounded-3x">
            <div className="grid lg:grid-cols-5 gap-6">
                {/* Featured Article */}
                <div className="lg:col-span-3">
                    {
                        firstPost?.meta?.image &&
                        <Link href={`/posts/${firstPost?.slug}`} className="group">
                            <div className="rounded-lg overflow-hidden">
                                <div className="relative h-[80%] w-full rounded-3xl overflow-hidden">
                                    <Media resource={firstPost?.meta?.image ?? '/images/placeholder.jpg'} imgClassName='h-full object-cover' />
                                </div>
                                <div className="mt-8 space-y-2">
                                    <div className='flex'>
                                        {
                                            firstPost?.categories?.map((category: Category, index) => {
                                                return <span key={index} className="text-muted-foreground uppercase bg-purple-300 text-purple-700 font-semibold px-2 mr-2 my-auto py-1 rounded-xl">{category.title}</span>
                                            })
                                        }
                                    </div>
                                    <p className="text-muted-foreground"></p>
                                    <h2 className="text-2xl font-bold tracking-tight">{firstPost?.title}</h2>
                                    <p className="text-muted-foreground">{firstPost?.meta?.description}</p>
                                </div>
                            </div>
                        </Link>
                    }
                </div>

                {/* Article List */}
                <div className="lg:col-span-2 flex flex-col gap-6 lg:px-8 lg:py-4" key={"right"}>
                    {firstFourPost?.map((article, index) => (
                        <>
                            <hr />
                            <Link key={index} href={`/posts/${article.slug}`} className="group">
                                <div className="flex gap-8">
                                    <div className="space-y-2">
                                        <div className='flex'>
                                            {
                                                firstPost?.categories?.map((category: Category, index) => {
                                                    return <span key={index} className="text-muted-foreground uppercase text-sm bg-purple-300 text-purple-700 font-semibold px-2 mr-2 my-auto py-1 rounded-xl">{category.title}</span>
                                                })
                                            }
                                        </div>
                                        <h3 className="font-semibold line-clamp-2">{article.title}</h3>
                                        <p className="text-sm text-muted-foreground line-clamp-4">{article.meta?.description}</p>
                                    </div>
                                    <div className="relative h-28 w-40 flex-shrink-0 rounded-3xl overflow-hidden">
                                        <Media resource={article.meta?.image ?? '/images/placeholder.jpg'} imgClassName='h-[20vh] object-cover' />
                                    </div>
                                </div>
                            </Link>

                        </>
                    ))}
                </div>
            </div>
        </div>
    )
}
