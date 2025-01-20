'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { FormEvent, FormEventHandler, MouseEvent, MouseEventHandler, useEffect, useState } from 'react'
import type { Page } from '@/payload-types'
import { useRouter } from 'next/navigation'
import RichText from '@/components/RichText'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'

export const CustomImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()
  const [searchValue, setSearchValue] = useState("")
  const router = useRouter()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Searching for:", searchValue)
    // Here you can implement the actual search functionality
    // For example, you might want to navigate to a search results page:
    router.push(`/search?q=${encodeURIComponent(searchValue)}`)
  }

  return (
    <div className="bg-[#FDF8FF] px-4 py-8 md:py-16">
      <div className="container mx-auto max-w-7xl">
        <div className="grid gap-8 md:gap-16 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              {richText && (
                <div className="flex flex-col gap-1">
                  {richText && <RichText className="mb-6" data={richText} enableGutter={false} />}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center justify-end">
            <form onSubmit={handleSearch} className="relative w-full max-w-md">
              <Input
                className="h-12 pr-12"
                placeholder="Enter keyword to search"
                type="search"
                value={searchValue}
                onChange={handleSearchChange}
              />
              <Button
                className="absolute right-0 top-0 h-12 w-12 rounded-l-none bg-purple-600 hover:bg-purple-700"
                size="icon"
                type="submit"
              >
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
