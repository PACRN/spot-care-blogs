'use client'
import React from 'react'

type Props = {
  title: string
}

export const Marker: React.FC<Props> = ({ title }) => {
  if (!title) return null

  return (
    <div className="my-4">
      <h2 id={title.replaceAll(" ", "-")}>{title}</h2>
    </div>
  )
}
