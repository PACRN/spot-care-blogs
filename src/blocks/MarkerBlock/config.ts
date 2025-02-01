import type { Block } from 'payload'

export const MarkerBlock: Block = {
  slug: 'marker',
  interfaceName: 'MarkerBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
  ],
}
