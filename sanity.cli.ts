import {defineCliConfig} from 'sanity/cli'
import {sanityConfig} from './sanity/config'

const projectId = sanityConfig.projectId
const dataset = sanityConfig.dataset

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
})