# Workflow Automation Website - Development Guide

## Project Overview
Build a comprehensive workflow automation website using Next.js 15, replacing the existing WordPress site at workflowautomation.net. The site focuses on software reviews, automation guides, and monetization through affiliate marketing.

## Tech Stack
- **Frontend**: Next.js 15 with App Router and TypeScript
- **CMS**: Sanity Studio with structured content management
- **Styling**: Tailwind CSS with custom design system
- **Deployment**: Vercel with edge functions
- **Analytics**: Vercel Analytics + Google Analytics 4
- **Theme**: Light/Dark mode with system preference detection

## Site Architecture
```
/
├── app/
│   ├── (marketing)/         # Homepage, about, contact
│   ├── blog/                # Blog posts and categories
│   ├── reviews/             # Software reviews and comparisons
│   ├── guides/              # Top Software guides (replaces listicles)
│   ├── tools/               # ROI calculator, software finder
│   ├── categories/          # Category hub pages
│   └── api/                 # Newsletter, contact, webhooks, affiliate tracking
├── components/
├── lib/
└── public/
```

## Core Features

### 1. Homepage ✅
- Hero with "Find Your Perfect Workflow Software" headline
- Trust indicators (150+ Software, 10K+ Users)
- Featured software carousel with scores
- Latest blog posts and software guides
- Newsletter signup CTA
- Categories grid with icons
- Benefits section

### 2. Software Reviews ✅
- Overall score (1-10) with visual scoring system
- 15-step review framework (ease of use, features, pricing, etc.)
- Pricing tables with affiliate links
- Pros/cons lists with gradient styling
- Comparison pages for multiple tools
- Integration capabilities display
- Platform information
- Related software suggestions

### 3. Software Guides (Top Software Lists) ✅
- Comprehensive ranked lists (Top 10/25/50 format)
- In-depth 500+ word reviews per tool
- Buyer's guide section
- Comparison tables
- FAQ sections
- Table of contents with smooth scrolling
- Affiliate link tracking integration
- Related guides suggestions
- Newsletter CTA integration

### 4. Interactive Tools ✅
- **Software Finder Quiz**: Multi-step questionnaire with personalized recommendations
- **ROI Calculator**: Calculate automation savings with visual charts and PDF reports
- Both tools include email capture and results summaries

### 5. Monetization ✅
- **Primary**: Affiliate links in reviews and guides
- **API Tracking**: `/api/track/affiliate` endpoint for click tracking
- Deal pages potential
- Newsletter sponsorship ready

## Key Implementation Notes

### SEO Requirements
- Dynamic meta tags and Open Graph
- Structured data for reviews
- XML sitemaps
- Core Web Vitals optimization
- Mobile-first responsive design
- Schema markup for ratings

### Performance Goals
- Page speed under 3 seconds
- Optimized images with lazy loading
- Code splitting by route
- ISR for content updates

### Content Management
- Sanity CMS for all content types
- Rich text with Portable Text
- Image galleries and video support
- Author profiles and categories
- Related content suggestions

## Development Commands
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint
npm run typecheck    # Run TypeScript checks
```

## Environment Variables
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_SITE_URL=https://workflowautomation.net
```

## Current Phase 1 Priorities

### Immediate Tasks (This Week)
1. **Content Population**
   - Add more software reviews to Sanity CMS
   - Create 3-5 comprehensive Software Guides
   - Write initial blog posts for SEO

2. **SEO & Discovery**
   - Implement structured data for reviews
   - Add XML sitemap generation
   - Set up meta tags for all pages
   - Create category hub pages

3. **Monetization Enhancement**
   - Test affiliate link tracking thoroughly
   - Add conversion tracking
   - Implement deal/discount badges
   - Create email capture lead magnets

4. **Performance & Polish**
   - Optimize Core Web Vitals
   - Add proper error handling
   - Implement search functionality
   - Fix mobile responsiveness issues

## Important Guidelines
- Maintain existing URL structure for SEO
- All reviews must include affiliate disclosure
- Prioritize mobile experience
- Follow established component patterns
- Test Core Web Vitals regularly
- Software Guides are the primary "listicle" format (not separate listicles)