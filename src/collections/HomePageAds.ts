import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { slugField } from '@/fields/slug'

export const HomePageAds: CollectionConfig = {
    slug: 'home_ads',
    access: {
        create: authenticated,
        delete: authenticated,
        read: anyone,
        update: authenticated,
    },
    admin: {
        useAsTitle: 'title',
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'adImage',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
        {
            name: 'adUrl',
            type: 'text',
            required: true,
        },
        {
            name: 'isActive',
            type: 'checkbox',
            required: true,
        },
        ...slugField(),
    ],
}
