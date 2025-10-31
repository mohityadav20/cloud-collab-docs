# How to Add Environment Variables in AWS Amplify Console

## 🎯 Quick Steps

### Step 1: Open Your Amplify App

1. Go to **AWS Amplify Console**: https://console.aws.amazon.com/amplify/
2. Click on your app name: **cloud-collab-docs** (or whatever you named it)

### Step 2: Navigate to Environment Variables

1. In the left sidebar, click **"App settings"**
2. Scroll down and click **"Environment variables"** section
3. You'll see a table/list of environment variables (may be empty if you haven't added any)

### Step 3: Add Each Environment Variable

Click **"Manage variables"** or **"Add environment variable"** button.

**Add these variables one by one:**

#### Variable 1: User Pool ID
- **Key:** `VITE_APP_USER_POOL_ID`
- **Value:** `us-east-1_xxxxxxxxx` (your Cognito User Pool ID)
- Click **"Add"** or **"Save"**

#### Variable 2: User Pool Client ID
- **Key:** `VITE_APP_USER_POOL_CLIENT_ID`
- **Value:** `xxxxxxxxxxxxxxxxxxxxxxxxxx` (your Cognito Client ID)
- Click **"Add"**

#### Variable 3: Region
- **Key:** `VITE_APP_REGION`
- **Value:** `us-east-1` (or your AWS region)
- Click **"Add"**

#### Variable 4: API Endpoint
- **Key:** `VITE_APP_API_ENDPOINT`
- **Value:** `https://xxxxxxxxxxxx.appsync-api.us-east-1.amazonaws.com/graphql`
- Click **"Add"**

#### Variable 5: Storage Bucket
- **Key:** `VITE_APP_STORAGE_BUCKET`
- **Value:** `collab-docs-assets-dev-xxxxxxxxxx` (your S3 bucket name)
- Click **"Add"**

### Step 4: Save Changes

After adding all variables:
- Click **"Save"** or **"Save changes"**
- Amplify will show a notification that changes are saved

### Step 5: Redeploy (Automatic or Manual)

**Option A: Automatic (Recommended)**
- After saving, Amplify may ask: **"Redeploy this version?"**
- Click **"Yes, redeploy"** to rebuild with new variables

**Option B: Manual**
- Go to your app's main page
- Find the latest deployment/build
- Click the **three dots** (⋮) menu
- Select **"Redeploy this version"**

---

## 📍 Where to Find These Values

### If You've Run `amplify push` Locally:

Check your `amplify_outputs.json` file (in project root):

```json
{
  "auth": {
    "userPoolId": "us-east-1_ABC123XYZ",        ← VITE_APP_USER_POOL_ID
    "userPoolClientId": "abc123def456..."       ← VITE_APP_USER_POOL_CLIENT_ID
  },
  "data": {
    "aws_appsync_graphqlEndpoint": "https://..." ← VITE_APP_API_ENDPOINT
  },
  "storage": {
    "aws_user_files_s3_bucket": "bucket-name..."  ← VITE_APP_STORAGE_BUCKET
  }
}
```

### If You Haven't Set Up Backend Yet:

You'll need to set up the AWS Amplify backend first:

1. Run: `amplify init`
2. Run: `amplify add auth`
3. Run: `amplify add api`
4. Run: `amplify add storage`
5. Run: `amplify push`
6. Get values from `amplify_outputs.json`

### Find Values in AWS Console:

**Cognito User Pool ID:**
1. Go to: AWS Console → Cognito → User pools
2. Click your user pool
3. Copy the **Pool Id** (looks like: `us-east-1_ABC123`)

**Cognito Client ID:**
1. Same User Pool page
2. Go to **"App integration"** tab
3. Scroll to **"App client list"**
4. Click your app client
5. Copy the **Client ID**

**AppSync Endpoint:**
1. Go to: AWS Console → AppSync
2. Click your API
3. Go to **"Settings"** tab
4. Copy the **GraphQL endpoint** URL

**S3 Bucket Name:**
1. Go to: AWS Console → S3
2. Find your bucket (usually starts with `collab-docs-assets-`)
3. Copy the bucket name

---

## 🔍 Visual Guide

**In Amplify Console:**

```
App settings
├── General
├── Build settings
├── Environment variables  ← Click here!
│   ├── Add environment variable button
│   ├── Key: VITE_APP_USER_POOL_ID
│   │   Value: us-east-1_xxxxx
│   ├── Key: VITE_APP_USER_POOL_CLIENT_ID
│   │   Value: xxxxx
│   └── ... (add more)
├── Custom domains
└── Access control
```

---

## ⚠️ Important Notes

1. **Variable Names Must Start with `VITE_`**
   - ✅ Correct: `VITE_APP_USER_POOL_ID`
   - ❌ Wrong: `APP_USER_POOL_ID`

2. **No Spaces in Keys**
   - ✅ Correct: `VITE_APP_REGION`
   - ❌ Wrong: `VITE_APP REGION`

3. **Values Are Case-Sensitive**
   - Make sure to copy exact values from `amplify_outputs.json`

4. **Changes Require Redeploy**
   - After adding variables, you must redeploy for them to take effect

5. **Secure Values**
   - These are visible in build logs but not exposed to end users in the deployed app
   - Never commit `.env` files to git

---

## ✅ Verify Variables Are Set

After redeploy:

1. Go to **Deployments** tab
2. Click on the latest deployment
3. View **Build logs**
4. Search for your variable names (they won't show values, but should be referenced)
5. Or check if the app works - if auth works, variables are correct!

---

## 🐛 Troubleshooting

**"Variables not found in build"**
- Make sure variable names start with `VITE_`
- Make sure you saved and redeployed

**"App still shows Auth error"**
- Double-check values are correct (no typos)
- Make sure you redeployed after adding variables
- Check browser console for specific errors

**"Can't find values"**
- Run `amplify status` to see backend resources
- Or run `amplify push` to create resources
- Check AWS Console for each service

---

## 📝 Quick Checklist

- [ ] Opened AWS Amplify Console
- [ ] Went to App settings → Environment variables
- [ ] Added `VITE_APP_USER_POOL_ID`
- [ ] Added `VITE_APP_USER_POOL_CLIENT_ID`
- [ ] Added `VITE_APP_REGION`
- [ ] Added `VITE_APP_API_ENDPOINT`
- [ ] Added `VITE_APP_STORAGE_BUCKET`
- [ ] Saved changes
- [ ] Redeployed app
- [ ] Verified deployment succeeded

---

**Need help finding values?** Run `amplify status` or check `amplify_outputs.json` after `amplify push`!

