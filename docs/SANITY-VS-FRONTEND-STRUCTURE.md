# Sanity Data Structure vs Frontend Display

## Understanding the Data Flow

The review page shows content from **THREE different sources**:

### 1. 🗄️ **Data from Sanity (Dynamic)**
This is what you see in Sanity Studio and comes from the database:

```javascript
// From Sanity Software Schema
{
  name: "ClickUp",                    // ✅ Shows in header
  logo: {...},                         // ✅ Shows in header
  tagline: "One app to replace...",   // ✅ Shows under title
  overallScore: 9.2,                  // ✅ Shows as main score
  
  // Structured sections in Sanity
  overview: {
    introduction: [...],              // ✅ Shows in Overview section
    keyFeatures: [...],              // ✅ Shows as feature list
    targetAudience: [...]            // ✅ Shows as "Who Is It For?"
  },
  
  scores: {                          // ✅ Shows in Detailed Scoring
    easeOfUse: 8.5,
    features: 9.5,
    // ... etc
  },
  
  pricing: [...],                    // ✅ Shows in Pricing Plans
  screenshots: [...],                // ✅ Shows in Screenshot Gallery
  pros: [...],                       // ✅ Shows in Pros/Cons
  cons: [...],                       // ✅ Shows in Pros/Cons
  
  // These exist in Sanity:
  competitorAnalysis: {...},         // ✅ If populated
  finalVerdict: {...},               // ✅ If populated
  useCasesSection: {...},            // ✅ If populated
}
```

### 2. 🎨 **Hardcoded UI Elements (Static)**
These are built into the React component and DON'T come from Sanity:

```javascript
// In page.tsx - These are NOT in Sanity:

// Section Headers
"What We'll Cover"                    // ❌ Hardcoded
"Platform Overview"                   // ❌ Hardcoded
"Detailed Scoring"                    // ❌ Hardcoded
"Key Features"                        // ❌ Hardcoded
"Screenshots"                         // ❌ Hardcoded

// Navigation Links
"→ Performance Scores"                // ❌ Hardcoded
"→ Feature Analysis"                  // ❌ Hardcoded
"→ Pricing & Plans"                  // ❌ Hardcoded

// Descriptive Text
"Discover the powerful capabilities..." // ❌ Hardcoded
"Explore {name}'s interface..."        // ❌ Hardcoded (template)
"Connect {name} with X tools..."       // ❌ Hardcoded (template)

// Stats/Badges (if not from Sanity)
"300+ Integrations"                   // ❌ Hardcoded or calculated
"Free Forever Plan"                   // ❌ Derived from pricing data
"24/7 Support"                        // ❌ Hardcoded
```

### 3. 🔧 **Computed/Derived Data (Generated)**
This data is calculated or transformed from Sanity data:

```javascript
// These are generated from Sanity data:

// Reading Time
readingTime: calculateFromContent()   // 🔄 Calculated

// Integration Count Display
`${integrations.count}+ integrations` // 🔄 Formatted from data

// Price Display
`Starting at $${pricing[0].price}/mo` // 🔄 Formatted from pricing

// Feature Count
`${keyFeatures.length} Key Features`  // 🔄 Counted from array

// Best For (if not explicitly set)
bestFor: software.verdict ||          // 🔄 Fallback logic
         "Teams looking for..."
```

## Where Each Section Comes From

| Section | Content Source | Location |
|---------|---------------|----------|
| **Hero/Header** | | |
| - Software Name | ✅ Sanity: `software.name` | Header |
| - Logo | ✅ Sanity: `software.logo` | Header |
| - Overall Score | ✅ Sanity: `software.overallScore` | Header |
| - Tagline | ✅ Sanity: `software.tagline` | Header |
| - "Get Started" button | ❌ Hardcoded UI | Header |
| | | |
| **Overview Section** | | |
| - Section Title | ❌ Hardcoded: "Platform Overview" | page.tsx:391 |
| - Introduction Text | ✅ Sanity: `software.overview.introduction` | Content |
| - Key Features | ✅ Sanity: `software.overview.keyFeatures` | Content |
| - Target Audience | ✅ Sanity: `software.overview.targetAudience` | Content |
| - Dashboard Screenshot | ✅ Sanity: `software.screenshots[4]` | Content |
| | | |
| **Scoring Section** | | |
| - Section Title | ❌ Hardcoded: "Detailed Scoring" | page.tsx:445 |
| - Score Bars | ✅ Sanity: `software.scores.*` | Content |
| - Score Labels | ❌ Hardcoded in component | ScoreBar component |
| | | |
| **Features Section** | | |
| - Section Title | ❌ Hardcoded: "Key Features" | page.tsx:470 |
| - Subtitle | ❌ Hardcoded template | page.tsx:471 |
| - Feature Cards | ✅ Sanity: `software.keyFeatures` (if exists) | Content |
| - Feature Screenshots | ✅ Sanity: `software.screenshots` | Content |
| | | |
| **Screenshots Gallery** | | |
| - Section Title | ❌ Hardcoded: "Screenshots" | page.tsx:528 |
| - Images | ✅ Sanity: `software.screenshots` | Content |
| - Captions | ✅ Sanity: `screenshot.caption` | Content |
| | | |
| **Pricing Section** | | |
| - Section Title | ❌ Hardcoded: "Pricing & Plans" | page.tsx:563 |
| - Plan Cards | ✅ Sanity: `software.pricing` | Content |
| - Pricing Analysis | ✅ Sanity: `software.pricingSection` (if exists) | Content |
| | | |
| **Integrations** | | |
| - Section Title | ❌ Hardcoded: "Integrations" | page.tsx:842 |
| - Integration Count | 🔄 Computed from `software.integrations` | page.tsx:844 |
| - Logo Grid | 🔄 Local files + component logic | IntegrationLogos |
| - Popular Integrations | ✅ Sanity: `software.popularIntegrations` | Content |

## Why You Don't See Everything in Sanity

### 1. **Optional Fields**
Many fields in the Sanity schema are optional. If they're not filled:
- The section won't show on the frontend
- OR a fallback/default will be used

### 2. **UI Framework**
The page structure, section titles, navigation, and descriptions are part of the React component, not Sanity data.

### 3. **Conditional Rendering**
The frontend checks if data exists before showing sections:
```javascript
{software.overview && (
  <section>...</section>  // Only shows if overview exists
)}
```

### 4. **Default/Fallback Content**
Some content has fallbacks:
```javascript
software.tagline || 'Powerful automation software'  // Uses default if not set
```

## How to Add/Edit Content

### To Change Content You See:
1. **If it's data** (scores, descriptions, features) → Edit in Sanity Studio
2. **If it's a section title or UI text** → Edit in the page.tsx file
3. **If it's computed** (like "500+ integrations") → Check both Sanity data and the display logic

### To Add New Content:
1. **Add field to Sanity schema** (if needed)
2. **Populate the field in Sanity Studio**
3. **Update the page.tsx to display it**

### Common Locations:
- **Sanity Schemas**: `/sanity/schemas/`
- **Review Page**: `/app/reviews/[slug]/page.tsx`
- **Components**: `/components/review/`
- **Sanity Queries**: `/lib/sanity-queries.ts`

## Example: What You See vs What's Stored

**You See on Page:**
> "Detailed Scoring - See how ClickUp performs across 15 key criteria"

**What's in Sanity:**
> Just the scores: `{easeOfUse: 8.5, features: 9.5, ...}`

**Where the text comes from:**
> Hardcoded in page.tsx line 445-446

This separation allows:
- ✅ Consistent UI across all reviews
- ✅ Only store changing data in CMS
- ✅ Easier to maintain and update design
- ✅ Fallbacks for missing data