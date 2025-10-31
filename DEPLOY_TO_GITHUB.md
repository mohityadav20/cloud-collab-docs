# Quick Guide: Deploy to GitHub & AWS Amplify

## 🚀 Quick Steps

### Step 1: Stage and Commit Files

```bash
# Stage all files
git add .

# Commit
git commit -m "Initial commit: Cloud Collaborative Document Management System"
```

### Step 2: Create GitHub Repository

1. Go to: **https://github.com/new**
2. Repository name: `cloud-collab-docs`
3. Description: `Cloud Collaborative Document Management System`
4. Choose: **Public** or **Private**
5. **DO NOT** check:
   - ❌ Initialize with README
   - ❌ Add .gitignore
   - ❌ Add license
6. Click **"Create repository"**

### Step 3: Push to GitHub

After creating the repo, GitHub will show commands. Use these:

```bash
# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/cloud-collab-docs.git

# Rename branch to main (if not already)
git branch -M main

# Push to GitHub
git push -u origin main
```

**Note:** When asked for password, use a **Personal Access Token** (not your GitHub password).

**To create a token:**
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token
3. Name: `Git CLI`
4. Select: `repo` scope
5. Generate and copy token
6. Use token as password when pushing

### Step 4: Connect to AWS Amplify

1. In AWS Amplify Console, click **"New app"** → **"Host web app"**
2. Select **GitHub**
3. Click **"Connect to GitHub"** (authorize if first time)
4. Select your repository: `cloud-collab-docs`
5. Select branch: `main`
6. Click **"Next"**

### Step 5: Configure Build Settings

**Build settings** (should auto-detect):
```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: dist
    files:
      - '**/*'
```

### Step 6: Add Environment Variables

Click **"Add environment variable"** and add:

```
VITE_APP_USER_POOL_ID=<get-from-amplify-outputs.json>
VITE_APP_USER_POOL_CLIENT_ID=<get-from-amplify-outputs.json>
VITE_APP_REGION=us-east-1
VITE_APP_API_ENDPOINT=<get-from-amplify-outputs.json>
VITE_APP_STORAGE_BUCKET=<get-from-amplify-outputs.json>
```

**⚠️ Important:** You need to set up AWS Amplify backend first (`amplify init`, `amplify push`) to get these values!

**If you haven't set up backend yet:**
1. Complete backend setup first (see `QUICK_AMPLIFY_SETUP.md`)
2. Then add environment variables in Amplify Console
3. Or deploy frontend now, add variables later and redeploy

### Step 7: Deploy!

1. Click **"Save and deploy"**
2. Wait 5-10 minutes
3. Your app will be live at: `https://main.xxxxx.amplifyapp.com`

---

## 🔄 After Deployment

### To Update Your App:

```bash
# Make changes
# Then:
git add .
git commit -m "Your changes"
git push
```

Amplify automatically builds and deploys! ✨

---

## 📚 Full Guide

See **GITHUB_DEPLOYMENT.md** for detailed instructions.

