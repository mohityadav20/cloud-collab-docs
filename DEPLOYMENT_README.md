# 🚀 Deployment Files Overview

This directory contains all the files you need to deploy your Cloud Collab App to AWS EC2.

---

## 📁 Files Included

### 📘 Documentation
1. **`EC2_DEPLOYMENT_GUIDE.md`** - Complete step-by-step guide for EC2 setup and deployment
2. **`AWS_CONSOLE_CHECKLIST.md`** - Checklist for AWS Console configuration
3. **`DEPLOYMENT_README.md`** - This file

### 🔧 Configuration Files
4. **`nginx-config-template.conf`** - Nginx web server configuration template

### 🤖 Deployment Scripts
5. **`ec2-deploy.sh`** - Deployment script to run ON your EC2 instance
6. **`local-deploy-to-ec2.sh`** - Deployment script to run FROM your local Linux/Mac machine
7. **`local-deploy-to-ec2.ps1`** - Deployment script to run FROM your local Windows machine

---

## 🎯 Quick Start Guide

### Step 1: AWS Console Setup (10-15 minutes)
Follow `AWS_CONSOLE_CHECKLIST.md`:
- [ ] Create EC2 instance (t2.micro)
- [ ] Configure security groups (ports 22, 80, 443)
- [ ] Allocate Elastic IP
- [ ] Download `.pem` key file

### Step 2: Connect to EC2
```powershell
# Windows PowerShell
ssh -i cloud-collab-key.pem ubuntu@YOUR_EC2_IP
```

### Step 3: Initial EC2 Setup (20-30 minutes)
Follow `EC2_DEPLOYMENT_GUIDE.md` Part 3 & 4:
- [ ] Update system
- [ ] Install Node.js, Nginx, Git
- [ ] Clone your repository
- [ ] Configure Amplify (`amplify pull`)
- [ ] Build your app (`npm run build`)
- [ ] Configure Nginx

### Step 4: Future Deployments (2-3 minutes)
Use the deployment scripts!

**Option A: Deploy from your local machine (recommended)**
```powershell
# Edit local-deploy-to-ec2.ps1 first (set EC2_IP and KEY_FILE)
.\local-deploy-to-ec2.ps1
```

**Option B: Deploy from EC2**
```bash
# On EC2 instance
~/deploy.sh
```

---

## 📋 Pre-Deployment Checklist

### Before Starting:
- [ ] AWS account created
- [ ] Credit card added to AWS (for verification, won't be charged in free tier)
- [ ] Repository pushed to GitHub
- [ ] Amplify backend deployed (`amplify push` completed)
- [ ] `aws-exports.js` generated and in your repo

### During AWS Console Setup:
- [ ] EC2 instance type: t2.micro (free tier)
- [ ] AMI: Ubuntu Server 22.04 LTS
- [ ] Security groups configured correctly
- [ ] Key pair downloaded and saved
- [ ] Elastic IP noted down

### After EC2 Setup:
- [ ] Can SSH to instance
- [ ] Node.js installed (v18+)
- [ ] Nginx running
- [ ] App built successfully
- [ ] App accessible at http://YOUR_EC2_IP

---

## 🔄 Deployment Workflow

### Initial Deployment (one-time):
```
AWS Console Setup → SSH to EC2 → Install Software → Clone Repo 
→ Configure Amplify → Build App → Configure Nginx → ✅ Live!
```

### Update Deployment (ongoing):
```
Local: Make Changes → Commit → Push to GitHub
EC2: Run deploy script → Pull Changes → Build → Restart Nginx → ✅ Updated!
```

---

## 📝 File Usage Guide

### 1. `EC2_DEPLOYMENT_GUIDE.md`
**When to use:** First-time EC2 setup
**Read time:** 30 minutes
**Follow time:** 1-2 hours

Contains:
- AWS Console instructions
- EC2 instance configuration
- Software installation commands
- Nginx setup
- SSL/HTTPS setup (optional)
- Troubleshooting guide

---

### 2. `AWS_CONSOLE_CHECKLIST.md`
**When to use:** During AWS Console configuration
**Read time:** 10 minutes

Contains:
- EC2 instance settings
- Security group rules
- Elastic IP setup
- Cost monitoring
- Security best practices

---

### 3. `nginx-config-template.conf`
**When to use:** During Nginx configuration on EC2
**How to use:**
1. Edit the file:
   - Replace `YOUR_EC2_PUBLIC_IP` with your IP
   - Replace `YOUR_REPO_NAME` with `cc-2`
2. Copy to EC2:
   ```bash
   sudo nano /etc/nginx/sites-available/cloud-collab
   # Paste the edited content
   ```
3. Enable and test:
   ```bash
   sudo ln -s /etc/nginx/sites-available/cloud-collab /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

---

### 4. `ec2-deploy.sh` (On EC2)
**When to use:** For deployments from within EC2
**Setup (one-time):**
```bash
# On your EC2 instance
nano ~/deploy.sh
# Paste the content from ec2-deploy.sh
# Update REPO_URL with your GitHub repo
chmod +x ~/deploy.sh
```

**Usage:**
```bash
~/deploy.sh
```

**What it does:**
1. Pulls latest code from GitHub
2. Installs dependencies
3. Builds production app
4. Restarts Nginx

---

### 5. `local-deploy-to-ec2.ps1` (Windows) ⭐ Recommended
**When to use:** Deploy from your Windows PC
**Setup (one-time):**
1. Edit the file:
   ```powershell
   notepad local-deploy-to-ec2.ps1
   ```
2. Update these variables:
   ```powershell
   $EC2_IP = "54.123.45.67"  # Your EC2 IP
   $KEY_FILE = "cloud-collab-key.pem"  # Path to your .pem file
   ```

**Usage:**
```powershell
.\local-deploy-to-ec2.ps1
```

**What it does:**
1. Tests connection to EC2
2. SSHs to EC2
3. Pulls latest code
4. Builds and deploys
5. Shows success message with URL

---

### 6. `local-deploy-to-ec2.sh` (Linux/Mac)
**When to use:** Deploy from Linux or Mac
**Setup:** Same as Windows version but edit the bash script
**Usage:**
```bash
chmod +x local-deploy-to-ec2.sh
./local-deploy-to-ec2.sh
```

---

## 🎯 Common Scenarios

### Scenario 1: First Time Deploying
1. Read `AWS_CONSOLE_CHECKLIST.md`
2. Follow `EC2_DEPLOYMENT_GUIDE.md` completely
3. Test your app at `http://YOUR_EC2_IP`

### Scenario 2: Updating Your App
1. Make changes locally
2. Commit and push to GitHub
3. Run `.\local-deploy-to-ec2.ps1` from Windows
4. App updates in 2-3 minutes

### Scenario 3: Nginx Configuration Issues
1. Check `nginx-config-template.conf`
2. Verify file paths match your setup
3. Test config: `sudo nginx -t`
4. Check logs: `sudo tail -f /var/log/nginx/error.log`

### Scenario 4: Build Fails on EC2
1. SSH to EC2
2. Check Node version: `node --version` (should be 18+)
3. Manually build: `cd /home/ubuntu/cc-2 && npm run build`
4. Check for errors in output

---

## 💰 Cost Breakdown

### Free Tier (12 months):
- **EC2 t2.micro:** 750 hours/month (covers 24/7)
- **EBS Storage:** 30 GB
- **Data Transfer:** 15 GB/month
- **Elastic IP:** Free when attached

**Total: $0/month** ✅

### After Free Tier:
- **EC2 t2.micro:** ~$8-10/month
- **Elastic IP (unattached):** $3.60/month
- **Data Transfer:** $0.09/GB after 15GB

**Estimated Total: ~$10-15/month**

### Your Amplify Backend (Always Free Tier):
- **AppSync:** 250k requests/month free
- **Cognito:** 50k users/month free
- **DynamoDB:** 25 GB storage free
- **Lambda:** 1M requests/month free

---

## 🔒 Security Checklist

- [ ] SSH only allowed from your IP (not 0.0.0.0/0)
- [ ] `.pem` key file has 400 permissions
- [ ] `.pem` key file NOT in git repository
- [ ] Regular system updates: `sudo apt update && sudo apt upgrade`
- [ ] Nginx configured with security headers
- [ ] AWS credentials not hardcoded in app
- [ ] Environment variables used for secrets
- [ ] HTTPS/SSL configured (if using domain)

---

## 🆘 Troubleshooting

### Can't Connect to EC2
**Problem:** `Connection refused` or `Connection timeout`
**Solution:**
1. Check instance is running in AWS Console
2. Verify security group allows SSH (port 22) from your IP
3. Confirm you're using correct IP address
4. Check your IP hasn't changed: https://whatismyip.com

### App Not Loading
**Problem:** Can't access `http://YOUR_EC2_IP`
**Solution:**
1. Check security group allows HTTP (port 80) from 0.0.0.0/0
2. Verify Nginx is running: `sudo systemctl status nginx`
3. Check build folder exists: `ls -la /home/ubuntu/cc-2/build`
4. View Nginx logs: `sudo tail -f /var/log/nginx/error.log`

### Build Fails
**Problem:** `npm run build` errors
**Solution:**
1. Check Node version: `node --version` (need 18+)
2. Clear cache: `npm cache clean --force`
3. Delete node_modules: `rm -rf node_modules && npm install`
4. Check for TypeScript errors: `npm run build` and read output

### Amplify Not Working
**Problem:** API calls failing, auth not working
**Solution:**
1. Verify Amplify configured: `amplify status`
2. Check `aws-exports.js` exists in `src/`
3. Re-pull Amplify: `amplify pull`
4. Verify AWS credentials configured

---

## 📞 Support Resources

- **AWS Documentation:** https://docs.aws.amazon.com/ec2/
- **Nginx Documentation:** https://nginx.org/en/docs/
- **Amplify Documentation:** https://docs.amplify.aws/
- **React Deployment:** https://create-react-app.dev/docs/deployment/

---

## ✅ Success Criteria

You've successfully deployed when:
- [ ] Can access app at `http://YOUR_EC2_IP`
- [ ] Login/signup works
- [ ] Can create and edit documents
- [ ] Documents persist after refresh
- [ ] Sharing works between users
- [ ] All features from local development work
- [ ] No console errors in browser

---

## 🎉 You're Ready!

**Start with:** `AWS_CONSOLE_CHECKLIST.md` if you haven't created your EC2 instance yet.

**Already have EC2?** Jump to `EC2_DEPLOYMENT_GUIDE.md` Part 3.

**Need to deploy updates?** Use `local-deploy-to-ec2.ps1` from your Windows PC.

---

**Good luck with your deployment! 🚀**

