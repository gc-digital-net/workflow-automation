import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {codeInput} from '@sanity/code-input'
import {schemaTypes} from './sanity/schemaTypes'
import {sanityConfig} from './sanity/config'

const projectId = sanityConfig.projectId
const dataset = sanityConfig.dataset

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