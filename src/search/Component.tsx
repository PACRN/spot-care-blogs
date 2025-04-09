'use client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useState, useEffect } from 'react'
import { useDebounce } from '@/utilities/useDebounce'
import { useRouter } from 'next/navigation'

interface SearchProps {
  selected?: string
}

export const Search: React.FC<SearchProps> = ({ selected = "" }) => {
  const [value, setValue] = useState(selected)
  const router = useRouter()

  const debouncedValue = useDebounce(value)

  useEffect(() => {
    if (debouncedValue !== selected) router.push(`/search${debouncedValue ? `?q=${debouncedValue}` : ''}`)
  }, [debouncedValue])

  return (
    <div>
      <form
      // onSubmit={(e) => {
      //   e.preventDefault()
      // }}
      >
        <Label htmlFor="search" className="sr-only">
          Search
        </Label>
        <Input
          id="search"
          onChange={(event) => {
            setValue(event.target.value)
          }}
          value={value}
          placeholder="Search"
        />
        <button type="submit" className="sr-only">
          submit
        </button>
      </form>
    </div>
  )
}
