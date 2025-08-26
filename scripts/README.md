# Utility Scripts

Essential scripts for managing content in Sanity CMS.

## Author Management
- `add-review-authors.ts` - Adds predefined review authors to Sanity
- `list-available-authors.ts` - Lists all available authors in Sanity
- `set-clickup-author.ts` - Sets the author for ClickUp review

## Content Management
- `create-software-review.ts` - Creates a new software review in Sanity
- `approve-review.ts` - Approves a software review for publication
- `count-posts.ts` - Counts blog posts in Sanity

## Utilities
- `check-integrations-structure.ts` - Validates integration data structure
- `check-software-duplicates.ts` - Checks for duplicate software entries
- `generate-favicons.ts` - Generates favicon files from logo
- `revalidate.js` - Triggers Next.js revalidation for specific paths

## Usage

All TypeScript scripts can be run with:
```bash
npx tsx scripts/[script-name].ts
```

JavaScript scripts can be run with:
```bash
node scripts/[script-name].js
```