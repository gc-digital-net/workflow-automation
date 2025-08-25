import blockContent from './blockContent'
import author from './author'
import category from './category'
import blogPost from './blogPost'
import software from './software'
import topSoftware from './topSoftware'
import comparison from './comparison'
import faq from './faq'
import testimonial from './testimonial'
import siteSettings from './siteSettings'
import navigation from './navigation'
import userReview from './userReview'

export const schemaTypes = [
  // Core content types
  blockContent,
  author,
  category,
  blogPost,
  software,
  topSoftware,
  
  // Supporting content
  comparison,
  faq,
  testimonial,
  userReview,
  
  // Site configuration
  siteSettings,
  navigation
]
