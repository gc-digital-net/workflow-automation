import blockContent from './blockContent'
import author from './author'
import category from './category'
import blogPost from './blogPost'
import software from './software'
import bestOfGuide from './bestOfGuide'
import comparison from './comparison'
import faq from './faq'
import testimonial from './testimonial'
import siteSettings from './siteSettings'
import navigation from './navigation'

export const schemaTypes = [
  // Core content types
  blockContent,
  author,
  category,
  blogPost,
  software,
  bestOfGuide,
  
  // Supporting content
  comparison,
  faq,
  testimonial,
  
  // Site configuration
  siteSettings,
  navigation
]
