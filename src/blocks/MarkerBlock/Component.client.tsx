'use client'
import React from 'react'

type Props = {
  title: string
}

export const Marker: React.FC<Props> = ({ title }) => {
  if (!title) return null

  return (
    <span className='text-2xl font-extrabold' id={title.replaceAll(" ", "-")}>{title}</span>
  )
}
