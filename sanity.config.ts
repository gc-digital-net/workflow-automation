import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {codeInput} from '@sanity/code-input'
import {schemaTypes} from './sanity/schemaTypes'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'x1zu4x72'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export default defineConfig({
  name: 'default',
  title: 'Workflow Automation',
  
  projectId,
  dataset,
  
  plugins: [structureTool(), visionTool(), codeInput()],
  
  schema: {
    types: schemaTypes,
  },
  
  basePath: '/studio',
})