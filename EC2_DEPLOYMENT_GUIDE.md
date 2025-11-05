# 🚀 EC2 Deployment Guide for Cloud Collab App

## 📋 Prerequisites
- AWS Account with free tier
- AWS CLI configured locally
- Your Amplify backend already deployed (`amplify push` completed)

---

## Part 1: AWS Console Setup

### Step 1: Create EC2 Instance

1. **Go to AWS Console** → EC2 Dashboard
   - Region: Choose your preferred region (e.g., `us-east-1`)

2. **Click "Launch Instance"**

3. **Configure Instance:**
   - **Name**: `cloud-collab-app`
   - **AMI**: Ubuntu Server 22.04 LTS (Free tier eligible)
   - **Instance Type**: `t2.micro` (Free tier eligible)
   - **Key Pair**: 
     - Click "Create new key pair"
     - Name: `cloud-collab-key`
     - Type: RSA
     - Format: `.pem` (for Linux/Mac) or `.ppk` (for Windows/PuTTY)
     - **DOWNLOAD AND SAVE** this file securely!

4. **Network Settings:**
   - Click "Edit"
   - **Allow HTTP** from Internet (0.0.0.0/0)
   - **Allow HTTPS** from Internet (0.0.0.0/0)
   - **Allow SSH** from My IP (your current IP)

5. **Storage**: 8 GB gp3 (default is fine)

6. **Click "Launch Instance"**

7. **Note down the Public IP address** once instance is running

---

### Step 2: Security Group Configuration (if not done above)

1. Go to **EC2 Dashboard** → **Security Groups**
2. Select your instance's security group
3. **Edit Inbound Rules** → Add:
   - **HTTP**: Port 80, Source: 0.0.0.0/0
   - **HTTPS**: Port 443, Source: 0.0.0.0/0
   - **SSH**: Port 22, Source: My IP
   - **Custom TCP**: Port 3000, Source: 0.0.0.0/0 (for testing)

---

### Step 3: Elastic IP (Optional but Recommended)

1. Go to **EC2 Dashboard** → **Elastic IPs**
2. Click **"Allocate Elastic IP address"**
3. Click **"Allocate"**
4. Select the IP → **Actions** → **"Associate Elastic IP address"**
5. Choose your EC2 instance
6. This gives you a **permanent IP** that won't change on reboot

---

## Part 2: Connect to EC2 Instance

### For Windows (Using PowerShell):

```powershell
# Navigate to where you saved the .pem file
cd Downloads

# Set permissions (if needed)
icacls cloud-collab-key.pem /inheritance:r
icacls cloud-collab-key.pem /grant:r "%username%:R"

# Connect via SSH
ssh -i cloud-collab-key.pem ubuntu@YOUR_EC2_PUBLIC_IP
```

### For Linux/Mac:

```bash
# Set correct permissions
chmod 400 cloud-collab-key.pem

# Connect
ssh -i cloud-collab-key.pem ubuntu@YOUR_EC2_PUBLIC_IP
```

---

## Part 3: EC2 Instance Setup (Run on EC2)

Once connected to your EC2 instance, run these commands:

### 1. Update System
```bash
sudo apt update && sudo apt upgrade -y
```

### 2. Install Node.js & npm
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
node --version  # Should show v18.x.x
npm --version
```

### 3. Install Nginx (Web Server)
```bash
sudo apt install -y nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

### 4. Install PM2 (Process Manager)
```bash
sudo npm install -g pm2
```

### 5. Install Git
```bash
sudo apt install -y git
```

---

## Part 4: Deploy Your Application

### 1. Clone Your Repository
```bash
cd /home/ubuntu
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Amplify
```bash
# Install Amplify CLI
sudo npm install -g @aws-amplify/cli

# Pull your existing Amplify environment
amplify pull
```

**You'll be prompted:**
- Choose your authentication method: AWS Profile or Access Keys
- Select your Amplify app
- Choose your environment (e.g., dev, prod)

### 4. Build the Production App
```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

---

## Part 5: Configure Nginx

### 1. Create Nginx Configuration
```bash
sudo nano /etc/nginx/sites-available/cloud-collab
```

**Paste this configuration:**
```nginx
server {
    listen 80;
    server_name YOUR_EC2_PUBLIC_IP;

    root /home/ubuntu/YOUR_REPO_NAME/build;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /static/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

### 2. Enable the Site
```bash
sudo ln -s /etc/nginx/sites-available/cloud-collab /etc/nginx/sites-enabled/
sudo nginx -t  # Test configuration
sudo systemctl restart nginx
```

---

## Part 6: Set Up Auto-Deploy Script

### 1. Create Deploy Script on EC2
```bash
nano ~/deploy.sh
```

**Paste this:**
```bash
#!/bin/bash
cd /home/ubuntu/YOUR_REPO_NAME
git pull origin main
npm install
npm run build
sudo systemctl restart nginx
echo "Deployment complete!"
```

### 2. Make it Executable
```bash
chmod +x ~/deploy.sh
```

### 3. Deploy Updates
```bash
~/deploy.sh
```

---

## Part 7: Access Your Application

Open your browser and go to:
```
http://YOUR_EC2_PUBLIC_IP
```

You should see your Cloud Collab App! 🎉

---

## 🔒 Optional: Set Up HTTPS with SSL Certificate

### 1. Get a Domain Name
- Use Route 53, Namecheap, GoDaddy, etc.
- Point your domain's A record to your EC2 Elastic IP

### 2. Install Certbot
```bash
sudo apt install -y certbot python3-certbot-nginx
```

### 3. Get SSL Certificate
```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

### 4. Auto-Renewal
```bash
sudo certbot renew --dry-run
```

---

## 📊 Monitoring & Maintenance

### Check Nginx Status
```bash
sudo systemctl status nginx
```

### View Nginx Logs
```bash
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### Restart Services
```bash
sudo systemctl restart nginx
```

---

## 💰 Cost Estimation

### Free Tier Limits:
- **EC2 t2.micro**: 750 hours/month (free for 12 months)
- **EBS Storage**: 30 GB (free for 12 months)
- **Data Transfer**: 15 GB out (free for 12 months)

### After Free Tier:
- **EC2 t2.micro**: ~$8-10/month
- **Elastic IP**: Free when attached, $0.005/hour when not
- **Data Transfer**: $0.09/GB after 15 GB

**Your Amplify backend services remain on their own free tiers!**

---

## 🛠️ Troubleshooting

### Can't Connect to EC2:
- Check security group has SSH (port 22) open to your IP
- Verify you're using correct .pem file
- Ensure instance is running

### App Not Loading:
- Check nginx: `sudo systemctl status nginx`
- Check build folder exists: `ls -la /home/ubuntu/YOUR_REPO_NAME/build`
- Check nginx config: `sudo nginx -t`

### Amplify Connection Issues:
- Verify Amplify is configured: `cat src/aws-exports.js`
- Check AWS credentials: `amplify status`
- Ensure CORS is enabled in AppSync

---

## 📝 Quick Reference Commands

```bash
# Connect to EC2
ssh -i cloud-collab-key.pem ubuntu@YOUR_IP

# Deploy updates
cd /home/ubuntu/YOUR_REPO_NAME
git pull
npm run build
sudo systemctl restart nginx

# Check logs
sudo tail -f /var/log/nginx/access.log

# Restart nginx
sudo systemctl restart nginx
```

---

## ✅ Checklist

- [ ] EC2 instance created and running
- [ ] Security groups configured (ports 80, 443, 22, 3000)
- [ ] Elastic IP allocated and associated
- [ ] Connected to EC2 via SSH
- [ ] Node.js, Nginx, Git installed
- [ ] Repository cloned
- [ ] Amplify pulled and configured
- [ ] App built (`npm run build`)
- [ ] Nginx configured and running
- [ ] App accessible at http://YOUR_IP
- [ ] Deploy script created

---

**You're ready to go! 🚀**

