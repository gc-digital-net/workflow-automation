# Workflow Automation Website - Complete Development Specification

## Project Overview

Build a comprehensive workflow automation website using Next.js 15, replacing the existing WordPress site at workflowautomation.net. The site focuses on software reviews, automation guides, and monetization through affiliate marketing and lead generation.

## Tech Stack

- **Frontend**: Next.js 15 with App Router and TypeScript
- **CMS**: Sanity Studio with structured content management
- **Styling**: Tailwind CSS with custom design system
- **Deployment**: Vercel with edge functions
- **Database**: Sanity as headless CMS
- **Analytics**: Vercel Analytics + Google Analytics 4
- **Email**: ConvertKit or Mailchimp integration
- **Theme**: Light/Dark mode with system preference detection

## Core Requirements

### Site Architecture

```
/
├── app/
│   ├── (marketing)/
│   │   ├── page.tsx                 # Homepage
│   │   ├── about/page.tsx          # About page
│   │   ├── contact/page.tsx        # Contact form
│   │   └── layout.tsx              # Marketing layout
│   ├── blog/
│   │   ├── page.tsx                # Blog listing
│   │   ├── [slug]/page.tsx         # Individual blog posts
│   │   └── category/[slug]/page.tsx # Category pages
│   ├── reviews/
│   │   ├── page.tsx                # Software reviews listing
│   │   ├── [slug]/page.tsx         # Individual software review
│   │   └── compare/[...slugs]/page.tsx # Comparison pages
│   ├── listicles/
│   │   ├── page.tsx                # Listicle articles listing
│   │   ├── [slug]/page.tsx         # Individual listicle articles
│   │   └── category/[slug]/page.tsx # Listicle category pages
│   ├── learn/
│   │   ├── page.tsx                # Learning hub
│   │   ├── certification/page.tsx  # Main certification course
│   │   ├── mini-courses/
│   │   │   ├── page.tsx           # Mini-courses listing
│   │   │   └── [slug]/page.tsx    # Individual mini-course
│   │   ├── templates/page.tsx      # Template library
│   │   └── resources/page.tsx      # Free resources
│   ├── community/
│   │   ├── page.tsx                # Community overview
│   │   ├── membership/page.tsx     # Membership signup
│   │   ├── events/page.tsx         # Live events listing
│   │   └── podcast/
│   │       ├── page.tsx           # Podcast homepage
│   │       └── [slug]/page.tsx    # Individual episodes
│   ├── services/
│   │   ├── page.tsx                # Services overview
│   │   ├── consultation/page.tsx   # Software consultation
│   │   ├── audit/page.tsx          # Workflow audit service
│   │   └── training/page.tsx       # Team training
│   ├── tools/
│   │   ├── page.tsx                # Tools listing
│   │   ├── roi-calculator/page.tsx # ROI calculator
│   │   └── software-finder/page.tsx # Software recommendation quiz
│   ├── categories/
│   │   └── [slug]/page.tsx         # Category hub pages
│   ├── api/
│   │   ├── newsletter/route.ts     # Newsletter signup
│   │   ├── contact/route.ts        # Contact form handler
│   │   ├── analytics/route.ts      # Custom analytics
│   │   ├── payment/route.ts        # Stripe integration
│   │   ├── membership/route.ts     # Community access
│   │   └── webhook/route.ts        # Sanity webhook
│   ├── globals.css
│   ├── layout.tsx
│   └── loading.tsx
├── components/
├── lib/
├── sanity/
└── public/
```

### 2. Homepage Design & Features

**Hero Section:**
- Compelling headline: "Find the Perfect Automation Software for Your Business"
- Subheadline emphasizing time savings and efficiency
- Primary CTA: "Find Your Software" (leads to software finder tool)
- Secondary CTA: "Read Reviews"
- Hero image/animation showing workflow automation concepts

**Trust Indicators:**
- "300+ Software Analyzed" 
- "10K+ Active Members"
- Company logos (ClickUp, Zapier, Asana, Monday.com, etc.)
- Star ratings and testimonial snippets

**Featured Sections:**
- Top 6 automation tools with scores and quick comparisons
- Latest blog posts and listicle articles (3-4 featured pieces)
- Popular categories (Workflow Automation, BPM, Project Management)
- Featured listicles ("Top 10 Project Management Tools", "Best CRM Software")
- Interactive ROI calculator preview
- Newsletter signup with lead magnet

**Social Proof:**
- Customer testimonials with photos and company names
- Recent reviews and ratings
- "As featured in" section (if applicable)

### 3. Software Reviews System

**Review Page Structure:**
- Software name, logo, and tagline
- Overall score (out of 10) with visual scoring system
- Key metrics: Integrations count, Free tier rating, Time Saving score, Ease of use
- Pricing table with affiliate links
- Detailed feature breakdown using the 15-step framework
- Pros and cons lists
- Screenshots gallery
- Integration capabilities
- Use case scenarios
- Alternatives section
- User reviews and ratings
- FAQ section
- Affiliate disclosure

**15-Step Review Framework:**
1. Ease of Use
2. Feature Set
3. Integration Capabilities
4. Pricing Value
5. Customer Support
6. Security & Compliance
7. Scalability
8. Performance
9. Mobile Access
10. Documentation
11. Learning Curve
12. Customization
13. Reporting & Analytics
14. Free Tier/Trial
15. Overall Value

**Comparison Features:**
- Side-by-side comparison tables
- Feature matrix with checkmarks/ratings
- Pricing comparison
- Use case recommendations
- "Winner" badges for different categories

### 4. Blog System & Listicle Articles

**Content Categories:**
- Workflow Automation
- Business Process Management
- Project Management
- HR Automation
- Sales Automation
- Marketing Automation
- Software Reviews
- Case Studies
- Guides & Tutorials

**Blog Post Features:**
- Rich text editing with Sanity Portable Text
- Code blocks with syntax highlighting
- Image galleries and screenshots
- Related posts suggestions
- Social sharing buttons
- Reading time estimation
- Author bio and social links
- Comments system (optional)
- Newsletter signup CTAs throughout content

**Listicle Article Features:**
- Structured ranking system (1-50 items)
- Each item can reference existing software reviews OR be standalone
- Rich content sections: introduction, methodology, conclusion
- FAQ sections for each listicle
- Related listicles suggestions
- Advanced SEO optimization for "best of" keywords
- Affiliate link integration throughout rankings
- Social sharing optimized for list format

**Listicle Templates:**
- "Top 10 [Category] Software for [Year]"
- "Best [Type] Tools for [Industry]"
- "[Number] Essential [Category] Solutions"
- "Ultimate Guide: [Number] [Category] Platforms Compared"

**Listicle Page Structure:**
1. **Introduction** - Problem statement and selection criteria
2. **Methodology** - How tools were selected and ranked
3. **Ranked List** - Detailed breakdown of each tool
4. **Comparison Summary** - Quick comparison table
5. **FAQ Section** - Common questions about the category
6. **Conclusion** - Final recommendations and next steps
7. **Related Content** - Links to other relevant listicles and reviews

### 5. Interactive Tools & Educational Content

**Software Finder Quiz:**
- Multi-step questionnaire about business needs
- Questions about: company size, industry, budget, specific features
- Personalized recommendations based on answers
- Email capture for detailed report
- Integration with email marketing

**ROI Calculator:**
- Input fields: current manual hours, hourly rate, team size
- Automation potential slider
- Software cost inputs
- Visual ROI calculations and charts
- PDF report generation
- Email capture for extended analysis

**Workflow Builder:**
- Drag-and-drop interface for creating simple workflows
- Pre-built templates for common processes
- Export options (PDF, image)
- Software recommendations based on workflow complexity

**Educational Content Hub:**

#### **Certification Course: "Master Workflow Automation"**
- **7-module comprehensive course** covering:
  1. Workflow Automation Fundamentals
  2. Process Analysis and Optimization
  3. Software Selection and Implementation
  4. Integration Strategies
  5. ROI Measurement and KPIs
  6. Change Management
  7. Advanced Automation Techniques
- **Hands-on assignments** with real scenarios
- **Certificate upon completion** (LinkedIn credential)
- **Community access** included
- **Live monthly Q&A** sessions

#### **Mini-Course Library**
- **"Automation ROI Mastery"** (60 minutes, $67)
- **"Software Selection Framework"** (45 minutes, $47)
- **"Change Management for Automation"** (90 minutes, $97)
- **"Integration Best Practices"** (60 minutes, $67)
- **"AI-Powered Workflow Design"** (75 minutes, $87)

#### **Template & Resource Library**
- **Workflow audit checklists**
- **Software evaluation scorecards**
- **ROI calculation spreadsheets**
- **Implementation project plans**
- **Change management communications**
- **Training materials and guides**

**Podcast: "The Workflow Automation Show"**
- **Bi-weekly episodes** (30-45 minutes)
- **Expert interviews** with automation leaders
- **Software deep-dives** and reviews
- **Member spotlights** and success stories
- **Industry trends** and news analysis
- **Q&A episodes** from community questions

### 6. Monetization Features

**Primary Revenue Streams:**

#### **1. Affiliate Marketing (Primary)**
- **Software reviews** with affiliate links
- **Comparison pages** driving to top tools
- **Deal pages** with exclusive discounts
- **Email sequences** promoting top tools

#### **2. Educational Products (High-Value)**
- **Workflow Automation Certification Course** ($497-$797)
- **Mini-courses** on specific topics (45-60 minutes, $49-$97 each)
- **"Master AI for Workflow Automation"** course
- **Team training packages** with custom pricing
- **Templates and toolkit libraries**

#### **3. Community Membership (Recurring)**
- **Premium membership** ($15-$25/month) including:
  - Exclusive Slack community access
  - 100+ workflow templates and examples
  - Monthly live Q&A sessions
  - Early access to reviews and content
  - Member-only webinars and workshops
  - Career guidance and networking

#### **4. Service-Based Revenue (High-Value)**
- **Software selection consultation** ($200-$500/session)
- **Workflow audit and optimization** services
- **Team training and workshops**
- **Custom automation strategy** consulting

#### **5. Content Partnerships (Secondary)**
- **Sponsored reviews** and case studies
- **Webinar partnerships** with software vendors
- **Newsletter sponsorships**
- **Speaking engagements** and events

#### **6. Advanced Content Products**
- **Annual workflow automation report** ($97-$197)
- **Industry-specific automation guides** ($47-$97)
- **Executive briefings** on automation trends
- **White-label training** for agencies

### 7. SEO & Performance

**SEO Requirements:**
- Dynamic meta tags and Open Graph
- Structured data for reviews and articles
- XML sitemaps
- Robot.txt optimization
- Core Web Vitals optimization
- Page speed under 3 seconds
- Mobile-first responsive design

**Content SEO:**
- Keyword optimization for automation terms
- Internal linking strategy
- Breadcrumb navigation
- Schema markup for reviews and ratings

## Sanity CMS Schema

### Content Types:

```typescript
// Blog Post Schema
{
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required().max(60)
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' }
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      validation: Rule => Rule.max(160)
    },
    {
      name: 'content',
      title: 'Content',
      type: 'blockContent'
    },
    {
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }]
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }]
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime'
    },
    {
      name: 'updatedAt',
      title: 'Updated Date',
      type: 'datetime'
    },
    {
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo'
    },
    {
      name: 'readingTime',
      title: 'Reading Time (minutes)',
      type: 'number'
    }
  ]
}

// Listicle Article Schema
{
  name: 'listicle',
  title: 'Listicle Article',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required().max(60)
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' }
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      validation: Rule => Rule.max(160)
    },
    {
      name: 'introduction',
      title: 'Introduction',
      type: 'blockContent',
      description: 'Opening content before the list items'
    },
    {
      name: 'listItems',
      title: 'List Items',
      type: 'array',
      of: [{
        type: 'object',
        name: 'listItem',
        title: 'List Item',
        fields: [
          {
            name: 'rank',
            title: 'Rank',
            type: 'number',
            validation: Rule => Rule.required().min(1)
          },
          {
            name: 'software',
            title: 'Software Reference',
            type: 'reference',
            to: [{ type: 'software' }]
          },
          {
            name: 'customTitle',
            title: 'Custom Title (if not using software reference)',
            type: 'string',
            description: 'Use this if the item is not in your software database'
          },
          {
            name: 'customLogo',
            title: 'Custom Logo',
            type: 'image',
            description: 'Use if not referencing existing software'
          },
          {
            name: 'description',
            title: 'Description',
            type: 'blockContent',
            validation: Rule => Rule.required()
          },
          {
            name: 'keyFeatures',
            title: 'Key Features',
            type: 'array',
            of: [{ type: 'string' }]
          },
          {
            name: 'pricing',
            title: 'Pricing Summary',
            type: 'string'
          },
          {
            name: 'pros',
            title: 'Pros',
            type: 'array',
            of: [{ type: 'string' }]
          },
          {
            name: 'cons',
            title: 'Cons',
            type: 'array',
            of: [{ type: 'string' }]
          },
          {
            name: 'bestFor',
            title: 'Best For',
            type: 'string',
            description: 'Who this software is best suited for'
          },
          {
            name: 'affiliateLink',
            title: 'Affiliate Link',
            type: 'url'
          },
          {
            name: 'dealInfo',
            title: 'Special Deal Info',
            type: 'string',
            description: 'Any special offers or discounts'
          }
        ],
        preview: {
          select: {
            rank: 'rank',
            title: 'software.name',
            customTitle: 'customTitle',
            media: 'software.logo'
          },
          prepare(selection) {
            const { rank, title, customTitle, media } = selection;
            return {
              title: `${rank}. ${title || customTitle}`,
              media
            };
          }
        }
      }],
      validation: Rule => Rule.required().min(1)
    },
    {
      name: 'conclusion',
      title: 'Conclusion',
      type: 'blockContent',
      description: 'Closing content after the list'
    },
    {
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }]
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }]
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime'
    },
    {
      name: 'updatedAt',
      title: 'Updated Date',
      type: 'datetime'
    },
    {
      name: 'methodology',
      title: 'Selection Methodology',
      type: 'blockContent',
      description: 'Explain how you selected and ranked these tools'
    },
    {
      name: 'faq',
      title: 'FAQ Section',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'question', title: 'Question', type: 'string' },
          { name: 'answer', title: 'Answer', type: 'blockContent' }
        ]
      }]
    },
    {
      name: 'relatedListicles',
      title: 'Related Listicles',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'listicle' }] }]
    },
    {
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo'
    },
    {
      name: 'readingTime',
      title: 'Reading Time (minutes)',
      type: 'number'
    }
  ],
  orderings: [
    {
      title: 'Published Date, New',
      name: 'publishedDateDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }]
    }
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'featuredImage'
    },
    prepare(selection) {
      const { author } = selection;
      return Object.assign({}, selection, {
        subtitle: author && `by ${author}`
      });
    }
  }
}

// Software Review Schema (with predefined page structure)
{
  name: 'software',
  title: 'Software Review',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Software Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' }
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      validation: Rule => Rule.max(100)
    },
    {
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      validation: Rule => Rule.max(200),
      description: 'Brief description for cards and previews'
    },
    
    // Review Page Structure Sections
    {
      name: 'overview',
      title: 'Overview Section',
      type: 'object',
      fields: [
        {
          name: 'introduction',
          title: 'Introduction',
          type: 'blockContent',
          description: 'Opening overview of the software'
        },
        {
          name: 'keyFeatures',
          title: 'Key Features',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              { name: 'feature', title: 'Feature', type: 'string' },
              { name: 'description', title: 'Description', type: 'text' }
            ]
          }]
        },
        {
          name: 'targetAudience',
          title: 'Target Audience',
          type: 'blockContent'
        }
      ]
    },
    
    {
      name: 'detailedReview',
      title: 'Detailed Review Section',
      type: 'object',
      fields: [
        {
          name: 'userInterface',
          title: 'User Interface & Experience',
          type: 'blockContent'
        },
        {
          name: 'featuresAnalysis',
          title: 'Features Analysis',
          type: 'blockContent'
        },
        {
          name: 'integrationCapabilities',
          title: 'Integration Capabilities',
          type: 'blockContent'
        },
        {
          name: 'performanceReliability',
          title: 'Performance & Reliability',
          type: 'blockContent'
        },
        {
          name: 'securityCompliance',
          title: 'Security & Compliance',
          type: 'blockContent'
        },
        {
          name: 'customerSupport',
          title: 'Customer Support',
          type: 'blockContent'
        }
      ]
    },
    
    {
      name: 'pricingSection',
      title: 'Pricing Analysis',
      type: 'object',
      fields: [
        {
          name: 'pricingOverview',
          title: 'Pricing Overview',
          type: 'blockContent'
        },
        {
          name: 'valueForMoney',
          title: 'Value for Money Analysis',
          type: 'blockContent'
        },
        {
          name: 'competitiveComparison',
          title: 'Competitive Pricing Comparison',
          type: 'blockContent'
        }
      ]
    },
    
    {
      name: 'useCasesSection',
      title: 'Use Cases & Implementation',
      type: 'object',
      fields: [
        {
          name: 'idealUseCases',
          title: 'Ideal Use Cases',
          type: 'blockContent'
        },
        {
          name: 'implementationGuide',
          title: 'Implementation Guide',
          type: 'blockContent'
        },
        {
          name: 'realWorldExamples',
          title: 'Real-world Examples',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              { name: 'company', title: 'Company/Scenario', type: 'string' },
              { name: 'challenge', title: 'Challenge', type: 'text' },
              { name: 'solution', title: 'Solution', type: 'text' },
              { name: 'results', title: 'Results', type: 'text' }
            ]
          }]
        }
      ]
    },
    
    {
      name: 'competitorAnalysis',
      title: 'Competitor Analysis',
      type: 'object',
      fields: [
        {
          name: 'mainCompetitors',
          title: 'Main Competitors',
          type: 'array',
          of: [{ type: 'reference', to: [{ type: 'software' }] }]
        },
        {
          name: 'competitiveAdvantages',
          title: 'Competitive Advantages',
          type: 'blockContent'
        },
        {
          name: 'competitiveDisadvantages',
          title: 'Areas for Improvement',
          type: 'blockContent'
        }
      ]
    },
    
    {
      name: 'finalVerdict',
      title: 'Final Verdict Section',
      type: 'object',
      fields: [
        {
          name: 'summary',
          title: 'Summary',
          type: 'blockContent'
        },
        {
          name: 'recommendation',
          title: 'Recommendation',
          type: 'blockContent'
        },
        {
          name: 'whoShouldUse',
          title: 'Who Should Use This Software',
          type: 'blockContent'
        },
        {
          name: 'whoShouldAvoid',
          title: 'Who Should Consider Alternatives',
          type: 'blockContent'
        }
      ]
    },
    
    // Scoring and Rating System
    {
      name: 'overallScore',
      title: 'Overall Score (1-10)',
      type: 'number',
      validation: Rule => Rule.min(1).max(10)
    },
    {
      name: 'scores',
      title: '15-Step Framework Scores',
      type: 'object',
      fields: [
        { name: 'easeOfUse', title: 'Ease of Use', type: 'number', validation: Rule => Rule.min(1).max(10) },
        { name: 'features', title: 'Feature Set', type: 'number', validation: Rule => Rule.min(1).max(10) },
        { name: 'integrations', title: 'Integration Capabilities', type: 'number', validation: Rule => Rule.min(1).max(10) },
        { name: 'pricing', title: 'Pricing Value', type: 'number', validation: Rule => Rule.min(1).max(10) },
        { name: 'support', title: 'Customer Support', type: 'number', validation: Rule => Rule.min(1).max(10) },
        { name: 'security', title: 'Security & Compliance', type: 'number', validation: Rule => Rule.min(1).max(10) },
        { name: 'scalability', title: 'Scalability', type: 'number', validation: Rule => Rule.min(1).max(10) },
        { name: 'performance', title: 'Performance', type: 'number', validation: Rule => Rule.min(1).max(10) },
        { name: 'mobile', title: 'Mobile Access', type: 'number', validation: Rule => Rule.min(1).max(10) },
        { name: 'documentation', title: 'Documentation', type: 'number', validation: Rule => Rule.min(1).max(10) },
        { name: 'learningCurve', title: 'Learning Curve', type: 'number', validation: Rule => Rule.min(1).max(10) },
        { name: 'customization', title: 'Customization', type: 'number', validation: Rule => Rule.min(1).max(10) },
        { name: 'reporting', title: 'Reporting & Analytics', type: 'number', validation: Rule => Rule.min(1).max(10) },
        { name: 'freeTier', title: 'Free Tier/Trial', type: 'number', validation: Rule => Rule.min(1).max(10) },
        { name: 'overallValue', title: 'Overall Value', type: 'number', validation: Rule => Rule.min(1).max(10) }
      ]
    },
    
    // Structured Data
    {
      name: 'pricing',
      title: 'Pricing Plans',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'name', title: 'Plan Name', type: 'string' },
          { name: 'price', title: 'Monthly Price', type: 'number' },
          { name: 'yearlyPrice', title: 'Yearly Price', type: 'number' },
          { name: 'features', title: 'Features', type: 'array', of: [{ type: 'string' }] },
          { name: 'userLimit', title: 'User Limit', type: 'string' },
          { name: 'storageLimit', title: 'Storage Limit', type: 'string' },
          { name: 'recommended', title: 'Recommended', type: 'boolean' },
          { name: 'mostPopular', title: 'Most Popular', type: 'boolean' }
        ]
      }]
    },
    {
      name: 'pros',
      title: 'Pros',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'cons',
      title: 'Cons',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'screenshots',
      title: 'Screenshots',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
          { name: 'caption', title: 'Caption', type: 'string' },
          { name: 'altText', title: 'Alt Text', type: 'string' }
        ]
      }]
    },
    {
      name: 'videoReview',
      title: 'Video Review',
      type: 'object',
      fields: [
        { name: 'youtubeUrl', title: 'YouTube URL', type: 'url' },
        { name: 'thumbnail', title: 'Custom Thumbnail', type: 'image' },
        { name: 'duration', title: 'Duration', type: 'string' }
      ]
    },
    
    // Technical Details
    {
      name: 'integrations',
      title: 'Integration Count',
      type: 'number'
    },
    {
      name: 'popularIntegrations',
      title: 'Popular Integrations',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'supportedPlatforms',
      title: 'Supported Platforms',
      type: 'array',
      of: [{
        type: 'string',
        options: {
          list: [
            { title: 'Web Browser', value: 'web' },
            { title: 'Windows', value: 'windows' },
            { title: 'macOS', value: 'macos' },
            { title: 'Linux', value: 'linux' },
            { title: 'iOS', value: 'ios' },
            { title: 'Android', value: 'android' },
            { title: 'API', value: 'api' }
          ]
        }
      }]
    },
    {
      name: 'deploymentOptions',
      title: 'Deployment Options',
      type: 'array',
      of: [{
        type: 'string',
        options: {
          list: [
            { title: 'Cloud (SaaS)', value: 'cloud' },
            { title: 'On-Premise', value: 'onpremise' },
            { title: 'Hybrid', value: 'hybrid' }
          ]
        }
      }]
    },
    
    // Business Information
    {
      name: 'companyInfo',
      title: 'Company Information',
      type: 'object',
      fields: [
        { name: 'foundedYear', title: 'Founded Year', type: 'number' },
        { name: 'headquarters', title: 'Headquarters', type: 'string' },
        { name: 'employeeCount', title: 'Employee Count Range', type: 'string' },
        { name: 'funding', title: 'Funding Information', type: 'string' }
      ]
    },
    
    // SEO and Marketing
    {
      name: 'affiliateLink',
      title: 'Affiliate Link',
      type: 'url'
    },
    {
      name: 'dealInformation',
      title: 'Special Deals/Discounts',
      type: 'object',
      fields: [
        { name: 'hasActiveDeal', title: 'Has Active Deal', type: 'boolean' },
        { name: 'dealDescription', title: 'Deal Description', type: 'string' },
        { name: 'dealCode', title: 'Discount Code', type: 'string' },
        { name: 'dealExpiry', title: 'Deal Expiry', type: 'datetime' }
      ]
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }]
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'reviewStatus',
      title: 'Review Status',
      type: 'string',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'In Review', value: 'review' },
          { title: 'Published', value: 'published' },
          { title: 'Needs Update', value: 'update' }
        ]
      }
    },
    {
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'datetime'
    },
    {
      name: 'nextReviewDate',
      title: 'Next Review Date',
      type: 'date',
      description: 'When this review should be updated next'
    },
    {
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo'
    }
  ],
  orderings: [
    {
      title: 'Overall Score, High',
      name: 'scoreDesc',
      by: [{ field: 'overallScore', direction: 'desc' }]
    },
    {
      title: 'Last Updated, New',
      name: 'updatedDesc',
      by: [{ field: 'lastUpdated', direction: 'desc' }]
    },
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }]
    }
  ],
  preview: {
    select: {
      title: 'name',
      score: 'overallScore',
      media: 'logo',
      status: 'reviewStatus'
    },
    prepare(selection) {
      const { title, score, status } = selection;
      return Object.assign({}, selection, {
        subtitle: `Score: ${score}/10 • Status: ${status}`
      });
    }
  }
}

// Category Schema
{
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Category Name',
      type: 'string'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' }
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    },
    {
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image'
    },
    {
      name: 'parent',
      title: 'Parent Category',
      type: 'reference',
      to: [{ type: 'category' }]
    },
    {
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo'
    }
  ]
}

// Author Schema
{
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' }
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'text'
    },
    {
      name: 'avatar',
      title: 'Avatar',
      type: 'image'
    },
    {
      name: 'social',
      title: 'Social Links',
      type: 'object',
      fields: [
        { name: 'twitter', title: 'Twitter', type: 'url' },
        { name: 'linkedin', title: 'LinkedIn', type: 'url' },
        { name: 'website', title: 'Website', type: 'url' }
      ]
    }
  ]
}

// SEO Schema (reusable)
{
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    {
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      validation: Rule => Rule.max(60)
    },
    {
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      validation: Rule => Rule.max(160)
    },
    {
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url'
    },
    {
      name: 'noIndex',
      title: 'No Index',
      type: 'boolean'
    }
  ]
}
```

## Design System & Components

### Theme Configuration:
```css
/* Tailwind config theme extension */
colors: {
  primary: {
    50: '#eff6ff',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    900: '#1e3a8a',
  },
  secondary: {
    50: '#f8fafc',
    500: '#64748b',
    600: '#475569',
    900: '#0f172a',
  }
}
```

### Core Components:

1. **Layout Components:**
   - Header with navigation and theme toggle
   - Footer with links and newsletter signup
   - Sidebar for blog/category navigation
   - Breadcrumb navigation

2. **Content Components:**
   - BlogCard for post previews
   - SoftwareCard for review previews
   - ListicleCard for listicle article previews
   - ScoreDisplay for software ratings
   - RankingItem for listicle entries
   - ComparisonTable for feature comparisons
   - PricingTable for software pricing
   - TestimonialCard for social proof
   - MethodologyBox for listicle selection criteria

3. **Interactive Components:**
   - SearchBar with autocomplete
   - FilterButtons for categories
   - NewsletterSignup with validation
   - ContactForm with submission handling
   - SoftwareFinderQuiz with multi-step flow
   - ROICalculator with dynamic calculations

4. **UI Components:**
   - Button variants (primary, secondary, ghost)
   - Modal/Dialog for interactions
   - Tabs for organized content
   - Accordion for FAQs
   - Badge for categories and tags
   - Progress indicators for scores

### Responsive Design:
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly interface elements
- Optimized images and lazy loading

## Content Migration Strategy

### WordPress Data Export:
1. Export all blog posts with metadata
2. Extract software review data from custom fields
3. Preserve URL structure for SEO
4. Export media files and optimize for web
5. Map WordPress categories to new taxonomy

### Sanity Data Import:
1. Create import scripts for bulk content transfer
2. Transform WordPress content to Portable Text
3. Set up proper image asset management
4. Implement content validation rules
5. Create redirect mapping for changed URLs

### SEO Preservation:
1. Maintain exact URL structure where possible
2. Implement 301 redirects for changed URLs
3. Preserve meta tags and descriptions
4. Transfer internal linking structure
5. Maintain XML sitemap accuracy

## Development Implementation

### Required Package Dependencies:

```json
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "@sanity/client": "^6.0.0",
    "@sanity/vision": "^3.0.0",
    "sanity": "^3.0.0",
    "@portabletext/react": "^3.0.0",
    "next-sanity": "^8.0.0",
    "@next/third-parties": "^15.0.0",
    "tailwindcss": "^3.4.0",
    "next-themes": "^0.2.1",
    "@headlessui/react": "^1.7.0",
    "@heroicons/react": "^2.0.0",
    "framer-motion": "^10.0.0",
    "react-hook-form": "^7.48.0",
    "@hookform/resolvers": "^3.3.0",
    "zod": "^3.22.0",
    "date-fns": "^2.30.0",
    "reading-time": "^1.5.0",
    "sharp": "^0.33.0",
    "lucide-react": "^0.263.0",
    "react-intersection-observer": "^9.5.0",
    "recharts": "^2.8.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "typescript": "^5.0.0",
    "eslint": "^8.0.0",
    "eslint-config-next": "^15.0.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0"
  }
}
```

### Environment Variables:
```env
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=

# Analytics
NEXT_PUBLIC_GA_ID=
VERCEL_ANALYTICS_ID=

# Email Marketing
CONVERTKIT_API_KEY=
CONVERTKIT_FORM_ID=

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://workflowautomation.net
NEXT_PUBLIC_SITE_NAME="Workflow Automation"
```

### Key Features Implementation:

1. **Dynamic Routing:**
   - Blog posts: `/blog/[slug]`
   - Software reviews: `/reviews/[slug]` 
   - Listicle articles: `/listicles/[slug]`
   - Categories: `/categories/[slug]`
   - Comparisons: `/reviews/compare/[...slugs]`
   - Listicle categories: `/listicles/category/[slug]`

2. **Static Generation:**
   - Pre-generate all blog posts and reviews
   - Implement ISR for content updates
   - Generate sitemaps automatically
   - Optimize images with next/image

3. **Search Functionality:**
   - Client-side search with Fuse.js
   - Search across posts, reviews, and software
   - Autocomplete suggestions
   - Search analytics tracking

4. **Performance Optimization:**
   - Code splitting by route
   - Lazy loading for non-critical components
   - Image optimization and WebP support
   - Font optimization with next/font

5. **Analytics Integration:**
   - Google Analytics 4 setup
   - Custom event tracking for affiliate clicks
   - Conversion tracking for newsletter signups
   - Performance monitoring with Vercel Analytics

## Testing & Quality Assurance

### Testing Requirements:
1. **Unit Tests:** Component functionality and utilities
2. **Integration Tests:** API routes and data fetching
3. **E2E Tests:** Critical user journeys and conversion funnels
4. **Performance Tests:** Core Web Vitals and load times
5. **Accessibility Tests:** WCAG compliance and screen reader support

### Deployment Checklist:
1. Domain configuration and SSL setup
2. Environment variables configuration
3. Sanity Studio deployment
4. Analytics and tracking setup
5. XML sitemap and robots.txt
6. Social media meta tags
7. Error monitoring setup
8. Performance monitoring
9. Email marketing integration
10. Affiliate link tracking

## Success Metrics & KPIs

### Traffic Metrics:
- Organic search traffic growth
- Page views and session duration
- Bounce rate reduction
- Mobile traffic optimization

### Conversion Metrics:
- Newsletter signup rate
- Affiliate link click-through rate
- Software review engagement
- Tool usage and completion rates

### Content Metrics:
- Blog post engagement and shares
- Search ranking improvements
- Internal link click rates
- Content consumption patterns

### Technical Metrics:
- Core Web Vitals scores
- Page load times
- Error rates and uptime
- Mobile performance scores

## Future Enhancements

### Phase 2 Features:
- User accounts and saved comparisons
- Advanced filtering and search
- Community features and user reviews
- API for third-party integrations

### Phase 3 Features:
- AI-powered software recommendations
- Advanced analytics dashboard
- White-label solutions for partners
- Mobile app development

This comprehensive specification provides Claude Code with all necessary details to build a complete, professional workflow automation website that maintains SEO rankings while significantly improving user experience and monetization potential.