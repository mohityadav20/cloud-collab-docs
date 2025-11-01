# Local Development Setup

## Quick Setup

1. **Copy the example environment file:**
   ```bash
   cp .env.example .env.local
   ```

   Or manually create `.env.local` with these values:

   ```env
   VITE_APP_REGION=us-east-1
   VITE_APP_USER_POOL_ID=us-east-1_nMZqB7a9R
   VITE_APP_USER_POOL_CLIENT_ID=1oss26dldah6mrv474icludkso
   VITE_APP_API_ENDPOINT=https://hu6eh3g5yfcy7i4ze3q2qi4taq.appsync-api.us-east-1.amazonaws.com/graphql
   VITE_APP_STORAGE_BUCKET=cc2e961fe50d6f14ba88166872a77153278fc90c-dev
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   # or
   npm run dev
   ```

4. **Open your browser:**
   - Navigate to `http://localhost:5173` (or the port shown in terminal)

## Testing Locally

### Step 1: Sign Up / Sign In
1. Click "Sign up" or "Sign in"
2. Use your email to create an account
3. Verify your email (check inbox)
4. Sign in with your credentials

### Step 2: Test Document Creation
1. After signing in, you should see the document list
2. Click **"+ New Document"**
3. Verify the document is created without errors
4. Check browser console (F12) for any errors

### Step 3: Test Document Editing
1. Click on a document to open it
2. Type in the editor
3. Changes should auto-save after 1 second
4. Verify no console errors

### Step 4: Verify Real-time Updates
1. Open the app in two browser tabs
2. Edit a document in one tab
3. Changes should appear in the other tab (subscriptions)

## Troubleshooting

### "Auth UserPool not configured"
- Check that `.env.local` exists and has all required variables
- Restart the dev server after creating `.env.local`
- Verify values match what's in `amplify/backend/amplify-meta.json`

### "Failed to create document"
- Check browser console (F12) for GraphQL errors
- Verify you're signed in (check Network tab for auth headers)
- Ensure backend is deployed (`amplify status`)

### Environment variables not loading
- Make sure file is named exactly `.env.local` (not `.env` or `.env.development`)
- Restart the dev server after creating/modifying `.env.local`
- Vite only loads `.env.local` files in development

### API Endpoint Issues
- Verify `VITE_APP_API_ENDPOINT` matches your AppSync endpoint
- Check from `amplify status` command output
- Ensure backend is deployed

## Updating Environment Variables

If you redeploy the backend and values change:

1. **Get updated values:**
   ```bash
   amplify status
   ```
   
   Or check `amplify/backend/amplify-meta.json`:
   - `auth.cc2e4cbecce.output.UserPoolId` → `VITE_APP_USER_POOL_ID`
   - `auth.cc2e4cbecce.output.AppClientIDWeb` → `VITE_APP_USER_POOL_CLIENT_ID`
   - `api.cc2.output.GraphQLAPIEndpointOutput` → `VITE_APP_API_ENDPOINT`
   - `storage.s30b306bf5.output.BucketName` → `VITE_APP_STORAGE_BUCKET`

2. **Update `.env.local`** with new values

3. **Restart dev server**

## Next Steps After Local Testing

Once everything works locally:

1. ✅ Commit your code changes
2. ✅ Push to GitHub
3. ✅ Amplify Console will auto-deploy
4. ✅ Update environment variables in Amplify Console if needed
5. ✅ Test production deployment

## Notes

- `.env.local` is gitignored - your secrets won't be committed
- `.env.example` shows the structure but has real values for this project
- Environment variables must start with `VITE_APP_` for Vite to expose them
- Always restart the dev server after changing environment variables

