// Test if groups are working in Sanity
import {defineType} from 'sanity'

const testSchema = defineType({
  name: 'testDoc',
  title: 'Test Document',
  type: 'document',
  groups: [
    {
      name: 'content',
      title: 'Content',
    },
    {
      name: 'settings',
      title: 'Settings',
    },
  ],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
    },
    {
      name: 'body',
      title: 'Body',
      type: 'text',
      group: 'content',
    },
    {
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      group: 'settings',
    },
  ],
})

console.log('Groups should work with this syntax in Sanity v3+')