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
│   ├── listicles/           # Listicle articles ("Top 10" lists)
│   ├── tools/               # ROI calculator, software finder
│   ├── categories/          # Category hub pages
│   └── api/                 # Newsletter, contact, webhooks
├── components/
├── lib/
├── sanity/
└── public/
```

## Core Features

### 1. Homepage
- Hero with "Find the Perfect Automation Software" headline
- Trust indicators (300+ Software, 10K+ Members)
- Featured software reviews with scores
- Latest blog posts and listicles
- Newsletter signup with lead magnet
- Customer testimonials

### 2. Software Reviews
- Overall score (1-10) with visual scoring system
- 15-step review framework (ease of use, features, pricing, etc.)
- Pricing tables with affiliate links
- Pros/cons lists and screenshots
- Comparison pages for multiple tools
- Integration capabilities
- Use case scenarios

### 3. Listicle Articles
- Ranked lists (Top 10/25/50 format)
- Can reference existing reviews or standalone items
- Rich introduction, methodology, conclusion sections
- FAQ sections per listicle
- Affiliate link integration throughout
- Related content suggestions

### 4. Interactive Tools
- **Software Finder Quiz**: Multi-step questionnaire with personalized recommendations
- **ROI Calculator**: Calculate automation savings with visual charts
- **Workflow Builder**: Simple drag-and-drop workflow creator

### 5. Monetization
- **Primary**: Affiliate links in reviews and comparisons
- **Secondary**: Premium guides, newsletter sponsorships
- Deal pages with exclusive discounts
- Email sequences promoting top tools

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

## Current Focus Areas
1. Implementing core review pages with scoring system
2. Building listicle article templates
3. Creating interactive tools (ROI calculator, software finder)
4. Setting up affiliate link tracking
5. Optimizing for SEO and performance

## Important Guidelines
- Maintain existing URL structure for SEO
- All reviews must include affiliate disclosure
- Prioritize mobile experience
- Follow established component patterns
- Test Core Web Vitals regularly