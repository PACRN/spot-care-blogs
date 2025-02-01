import { Config } from 'payload'
import {
  BoldFeature,
  ItalicFeature,
  LinkFeature,
  ParagraphFeature,
  lexicalEditor,
  UnderlineFeature,
  AlignFeature,
  ChecklistFeature,
  RelationshipFeature,
  BlockquoteFeature,
  UploadFeature,
  EXPERIMENTAL_TableFeature,
  OrderedListFeature,
  UnorderedListFeature,
  HeadingFeature,
} from '@payloadcms/richtext-lexical'

export const defaultLexical: Config['editor'] = lexicalEditor({
  features: () => {
    return [
      ParagraphFeature(),
      UnderlineFeature(),
      BoldFeature(),
      ItalicFeature(),
      LinkFeature({
        enabledCollections: ['pages', 'posts'],
        fields: ({ defaultFields }) => {
          const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
            if ('name' in field && field.name === 'url') return false
            return true
          })

          return [
            ...defaultFieldsWithoutUrl,
            {
              name: 'url',
              type: 'text',
              admin: {
                condition: ({ linkType }) => linkType !== 'internal',
              },
              label: ({ t }) => t('fields:enterURL'),
              required: true,
            },
          ]
        },
      }),
      AlignFeature(),
      ChecklistFeature(),
      RelationshipFeature(),
      BlockquoteFeature(),
      EXPERIMENTAL_TableFeature(),
      OrderedListFeature(),
      UnorderedListFeature(),
      UploadFeature(),
    ]
  },
})
