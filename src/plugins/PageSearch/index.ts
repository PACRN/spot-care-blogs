import type { CollectionConfig, Config } from 'payload'
import { BeforeSync } from '@payloadcms/plugin-search/types'
import deepMerge from '@/utilities/deepMerge'
import deleteFromSearch from './hooks/deleteFromSearch'
import { beforeSyncWithSearch } from '@/search/beforeSync'

export interface SearchConfig {
  searchOverrides?: Partial<CollectionConfig>
  collections?: string[]
  defaultPriorities?: {
    [collection: string]: number | ((doc: any) => number | Promise<number>)
  }
  beforeSync?: BeforeSync
  syncDrafts?: boolean
  deleteDrafts?: boolean
}

// all settings can be overridden by the config
const generateSearchCollection = (searchConfig: SearchConfig): CollectionConfig =>
  deepMerge(
    {
      slug: 'pagesearch',
      labels: {
        singular: 'Search Page',
        plural: 'Search Pages',
      },
      admin: {
        useAsTitle: 'title',
        defaultColumns: ['title'],
        description:
          'This is a collection of automatically created search results. These results are used by the global site search and will be updated automatically as documents in the CMS are created or updated.',
        enableRichTextRelationship: false,
      },
      access: {
        read: (): boolean => true,
        create: (): boolean => false,
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          admin: {
            readOnly: true,
          },
        },
        {
          name: 'priority',
          type: 'number',
          admin: {
            position: 'sidebar',
          },
        },
        {
          name: 'doc',
          type: 'relationship',
          relationTo: 'posts',
          required: true,
          index: true,
          maxDepth: 0,
          admin: {
            readOnly: true,
            position: 'sidebar',
          },
        }
      ],
    },
    searchConfig?.searchOverrides || {},
  )

const PageSearch =
  (incomingSearchConfig: SearchConfig) =>
    (config: Config): Config => {
      const { collections } = config

      if (collections) {
        const searchConfig: SearchConfig = {
          ...incomingSearchConfig,
          syncDrafts: false,
          deleteDrafts: true,
          // write any config defaults here
        }

        // add a beforeChange hook to every search-enabled collection
        const collectionsWithSearchHooks = config?.collections
          ?.map(collection => {
            const { hooks: existingHooks } = collection

            const enabledCollections = searchConfig.collections || []
            const isEnabled = enabledCollections.indexOf(collection.slug) > -1
            if (isEnabled) {
              return {
                ...collection,
                hooks: {
                  ...collection.hooks,
                  afterChange: [
                    ...(existingHooks?.afterChange || []),
                    async (args: any) => {
                      if (collection.slug) {
                        beforeSyncWithSearch({
                          ...args,
                          collection: collection.slug,
                          searchConfig,
                        })
                      }

                    },
                  ],
                  afterDelete: [...(existingHooks?.afterDelete || []), deleteFromSearch],
                },
              }
            }

            return collection
          })
          .filter(Boolean)

        return {
          ...config,
          collections: [
            ...(collectionsWithSearchHooks || []),
            generateSearchCollection(searchConfig),
          ],
        }
      }

      return config
    }

export default PageSearch
