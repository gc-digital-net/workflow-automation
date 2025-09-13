# Upload Monday.com Review to Sanity

## Quick Method: Get Token and Run Script

### Step 1: Get Your Sanity Write Token
1. Go to https://www.sanity.io/manage/personal/project/x1zu4x72/api
2. Click on "Tokens" tab
3. Click "Add API Token"
4. Name it: "Content Upload Token"
5. Permissions: Select "Editor" 
6. Click "Save"
7. Copy the token immediately (you won't see it again!)

### Step 2: Create .env.local File
Create a file called `.env.local` in the root directory with:
```
SANITY_API_TOKEN=your_token_here
```

### Step 3: Run the Upload Script
```bash
npx tsx scripts/create-monday-review.ts
```

The script will:
- Create the Monday.com review in Sanity
- Set all scores, pricing, features, etc.
- Display the document ID and URL when complete

## Alternative Method: Manual Upload via Sanity Studio

### Step 1: Access Sanity Studio
Go to: https://workflowautomation.sanity.studio/

### Step 2: Create New Software Review
1. Click on "Software" in the left sidebar
2. Click "Create new"
3. Fill in the fields (see data below)

## Monday.com Review Data

### Basic Info
- **Name**: Monday.com
- **Slug**: monday-com
- **Tagline**: The Visual Work OS That Makes Work Flow
- **Excerpt**: Monday.com is the most visually intuitive project management platform that transforms how teams work together. With colorful boards, powerful automation, and incredible flexibility, it makes project management actually enjoyable.

### Scores
- **Overall Score**: 8.5
- **Ease of Use**: 9.0
- **Features**: 8.5
- **Value**: 7.5
- **Support**: 8.0
- **Integrations**: 9.0
- **Performance**: 8.5
- **Customization**: 9.5
- **Collaboration**: 9.0
- **Automation**: 9.0
- **Reporting**: 7.0
- **Mobile**: 6.5
- **Scalability**: 9.0
- **Security**: 8.5
- **Innovation**: 8.5
- **Documentation**: 8.0

### Quick Info
- **Starting Price**: $9/user/month
- **Free Trial Days**: 14
- **Free Plan Available**: Limited (2 users max)
- **Setup Time**: < 30 minutes
- **Best For Team Size**: 5-500
- **Deployment Options**: Cloud
- **Industries**: Marketing, Operations, Creative, Tech, Remote Teams

### Pricing Plans
1. **Individual** - $0/Forever - Up to 2 users, 3 boards, 200 items max
2. **Basic** - $9/user/month - Unlimited boards/items, 5GB storage, 250 automation actions/month
3. **Standard** - $12/user/month - Timeline & Calendar views, Guest access, 250 integrations (RECOMMENDED)
4. **Pro** - $20/user/month - Time tracking, Formula columns, Private boards, API access
5. **Enterprise** - Custom pricing - Enterprise security, SAML SSO, Dedicated CSM

### Content Sections
Copy the full content from `/Users/noelceta/workflow-automation/monday-com-review.md`

## Screenshots Needed
The following screenshots have been captured and are ready in `/Users/noelceta/workflow-automation/public/tools/monday-com/`:
- monday-dashboard.png
- monday-board-view.png
- monday-timeline.png
- monday-kanban.png
- monday-calendar.png
- monday-workload.png
- monday-automation.png
- monday-forms.png
- monday-integrations.png
- monday-gantt-interface.png
- monday-kanban-interface.png
- monday-automation-interface.png
- monday-dashboard-interface.png

Upload these in the Sanity Studio interface.

## Verification
After upload, check the review at:
- Development: http://localhost:3000/reviews/monday-com
- Production: https://workflowautomation.net/reviews/monday-com