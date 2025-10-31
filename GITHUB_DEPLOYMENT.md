# GitHub Deployment Guide

Complete guide to deploy your app to GitHub and connect it to AWS Amplify Console.

## 📋 Prerequisites

- ✅ AWS account created
- ✅ AWS Amplify Console open
- ✅ GitHub account (create at https://github.com if needed)
- ✅ Git installed (usually comes with development tools)

---

## 🚀 Step 1: Initialize Git Repository

### 1.1 Check Git Installation

```bash
git --version
```

If not installed, download from: https://git-scm.com/downloads

### 1.2 Initialize Git Repository

```bash
# In your project directory (D:\cc 2)
git init
```

### 1.3 Configure Git (First Time Only)

```bash
# Set your name (replace with your name)
git config --global user.name "Your Name"

# Set your email (replace with your GitHub email)
git config --global user.email "your.email@example.com"

# Verify
git config --list
```

---

## 📝 Step 2: Prepare Files for Git

### 2.1 Verify .gitignore is Proper

Make sure `.gitignore` includes these (already set):
- ✅ `node_modules/`
- ✅ `.env` (important - don't commit secrets!)
- ✅ `amplify/.config/`
- ✅ `dist/`

### 2.2 Stage All Files

```bash
git add .
```

### 2.3 Create First Commit

```bash
git commit -m "Initial commit: Cloud Collaborative Document Management System"
```

---

## 🌐 Step 3: Create GitHub Repository

### 3.1 Go to GitHub

1. Go to: **https://github.com**
2. Sign in to your account
3. Click the **+** icon (top right) → **New repository**

### 3.2 Repository Settings

**Repository name:** `cloud-collab-docs` (or your choice)

**Description (optional):**
```
Cloud Collaborative Document Management System - React + AWS Amplify
```

**Visibility:**
- **Public** - Anyone can see (free)
- **Private** - Only you (recommended if code is sensitive)

**DO NOT:**
- ❌ Initialize with README
- ❌ Add .gitignore
- ❌ Add license

**Click "Create repository"**

### 3.3 Copy Repository URL

After creating, GitHub will show you the repository URL. It looks like:
```
https://github.com/yourusername/cloud-collab-docs.git
```

**Copy this URL** - you'll need it in the next step.

---

## 📤 Step 4: Push to GitHub

### 4.1 Add Remote Repository

```bash
# Replace with your actual GitHub repository URL
git remote add origin https://github.com/yourusername/cloud-collab-docs.git

# Verify
git remote -v
```

### 4.2 Push to GitHub

```bash
# Push to main branch
git branch -M main
git push -u origin main
```

**You'll be asked to authenticate:**
- GitHub will ask for username and password
- **Password:** Use a Personal Access Token (not your GitHub password)

**If you need to create a token:**
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token (classic)
3. Name: `Git CLI Access`
4. Select scopes: `repo` (full control of private repositories)
5. Generate token
6. **Copy the token immediately** (you won't see it again!)
7. Use this token as your password when pushing

### 4.3 Verify Push

1. Go to your GitHub repository page
2. You should see all your files
3. Check that `.env` is NOT visible (it should be ignored)

---

## 🔗 Step 5: Connect to AWS Amplify Console

### 5.1 Go to AWS Amplify Console

1. Go to: **https://console.aws.amazon.com/amplify**
2. Click **"New app"** → **"Host web app"**

### 5.2 Connect Repository

**Source:**
- Select **GitHub**
- Click **Connect to GitHub** (first time may require authorization)
- Authorize AWS Amplify to access your GitHub account
- Select your repository: `cloud-collab-docs` (or your repo name)

### 5.3 Configure Build Settings

**Branch:**
- Select **main** (or master if that's your default branch)

**App name:**
- Enter: `cloud-collab-docs` (or your choice)

**Environment variables:**
Click **"Add environment variable"** and add:

```
VITE_APP_USER_POOL_ID=<your-cognito-user-pool-id>
VITE_APP_USER_POOL_CLIENT_ID=<your-cognito-client-id>
VITE_APP_REGION=us-east-1
VITE_APP_API_ENDPOINT=<your-appsync-endpoint>
VITE_APP_STORAGE_BUCKET=<your-s3-bucket-name>
```

**Where to get these values:**
- After running `amplify push`, check `amplify_outputs.json`
- Or check in AWS Console for each service

**Build settings:**
Amplify should auto-detect. If not, use:

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
  cache:
    paths:
      - node_modules/**/*
```

### 5.4 Review and Deploy

1. Click **"Save and deploy"**
2. Amplify will:
   - Clone your repository
   - Install dependencies (`npm ci`)
   - Build your app (`npm run build`)
   - Deploy to CDN

**This takes 5-10 minutes ⏰**

---

## ✅ Step 6: Get Deployment URL

After deployment completes:

1. You'll see a URL like: `https://main.xxxxx.amplifyapp.com`
2. Click **"App URL"** to view your deployed app
3. Share this URL with others!

---

## 🔄 Step 7: Set Up Continuous Deployment

### 7.1 Automatic Deployments

✅ **Already set up!** 

Every time you push to GitHub:
```bash
git add .
git commit -m "Your changes"
git push
```

Amplify automatically:
- Detects the push
- Builds the app
- Deploys to production

### 7.2 View Deployments

In Amplify Console:
- Go to **App settings** → **Build settings**
- See all deployments under **Deployments** tab

---

## 🐛 Troubleshooting

### "Repository not found"

**Solution:**
- Check repository URL is correct
- Verify you have access to the repository
- Make sure repository exists on GitHub

### "Permission denied"

**Solution:**
- Use Personal Access Token instead of password
- Check token has `repo` scope
- Re-authenticate: `git remote set-url origin https://token@github.com/user/repo.git`

### "Build failed"

**Solution:**
- Check build logs in Amplify Console
- Verify environment variables are set
- Ensure `package.json` has correct build scripts
- Check that all dependencies are in `package.json`

### "Environment variables missing"

**Solution:**
1. Go to Amplify Console → App settings → Environment variables
2. Add missing variables
3. Click "Redeploy this version" or push a new commit

### "App not loading"

**Solution:**
- Check browser console for errors
- Verify Amplify configuration in code
- Ensure Cognito User Pool exists
- Check AppSync endpoint is correct

---

## 📚 Next Steps

### After Deployment:

1. **Test your app:**
   - Sign up for a new account
   - Create a document
   - Test sharing functionality

2. **Set up custom domain** (optional):
   - Amplify Console → App settings → Domain management
   - Add your custom domain

3. **Set up branch previews** (optional):
   - Connect pull request branches
   - Get preview URLs for each PR

---

## 🔒 Security Checklist

Before deploying, ensure:
- ✅ `.env` is in `.gitignore`
- ✅ No secrets in code
- ✅ Environment variables set in Amplify Console
- ✅ IAM permissions are minimal (least privilege)
- ✅ HTTPS is enabled (automatic with Amplify)

---

## 📊 Monitoring

### View Logs:
- Amplify Console → Monitoring → Logs
- View build logs and runtime logs

### View Metrics:
- Amplify Console → Monitoring → Metrics
- Monitor requests, errors, and performance

---

**🎉 Congratulations! Your app is now live on AWS Amplify!**

