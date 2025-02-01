import React from 'react'
import { Marker } from './Component.client'


export type MarkerBlockProps = {
  title: string
  blockType: 'marker'
}

export const MarkerBlock: React.FC<MarkerBlockProps> = ({ title }) => {
  return (
    <Marker title={title} />
  )
}
