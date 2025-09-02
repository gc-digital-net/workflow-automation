# Get Your Sanity Write Token

## Quick Steps to Get the Token from Vercel:

1. **Go to Vercel Dashboard**:
   https://vercel.com/noelceta/workflow-automation/settings/environment-variables

2. **Find SANITY_API_TOKEN**:
   - Look for the environment variable named `SANITY_API_TOKEN`
   - Click on it to reveal the value
   - Copy the token (it should start with `sk`)

3. **Add to .env.local**:
   ```bash
   echo "SANITY_API_TOKEN=your_token_here" >> .env.local
   ```

4. **Run the Upload Script**:
   ```bash
   npx tsx scripts/create-monday-review.ts
   ```

## Alternative: Get Token from Sanity

If the token isn't in Vercel:

1. **Go to Sanity Management**:
   https://www.sanity.io/manage/personal/project/x1zu4x72/api#tokens

2. **Create or View Token**:
   - If you see existing tokens, use one with "Editor" permissions
   - Or create a new token with "Editor" permissions
   - Copy the token immediately

3. **Add to .env.local and Run**:
   Same as steps 3-4 above

## What the Script Will Do:
- Upload the complete Monday.com review
- Set all scores, pricing, features
- Create the review document in Sanity
- Make it available at `/reviews/monday-com`

The script is ready and waiting for the token!