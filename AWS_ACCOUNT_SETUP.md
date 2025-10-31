# AWS Account Setup Guide

Complete guide to create a new AWS account and configure it for the Collaborative Document Management System.

## 📋 Prerequisites

- Email address (for account creation)
- Credit card or debit card (AWS Free Tier - charges only after free tier expires)
- Phone number (for verification)

---

## 🚀 Step 1: Create AWS Account

### 1.1 Go to AWS Sign-Up Page

Visit: **https://aws.amazon.com/**

1. Click **"Create an AWS Account"** button (top right)
2. Or go directly to: **https://portal.aws.amazon.com/billing/signup**

### 1.2 Enter Account Information

**Email Address:**
- Enter a valid email address
- This will be your AWS account email and username
- Use a real email you have access to

**AWS Account Name:**
- Choose a name for your account (e.g., "My Document Management System")
- This is just for identification

**Password:**
- Create a strong password
- Must be 8+ characters with uppercase, lowercase, number, and special character

### 1.3 Verify Email Address

1. Check your email inbox
2. Click the verification link
3. Return to AWS sign-up page

### 1.4 Enter Contact Information

Fill in:
- **Country/Region:** Your country
- **Full Name:** Your name
- **Company Name:** Optional (leave blank if personal)
- **Phone Number:** Verified via call or SMS
- **Address:** Your physical address

### 1.5 Payment Information

**IMPORTANT:** AWS Free Tier includes:
- ✅ 750 hours of EC2 t2.micro instances per month (12 months)
- ✅ 5 GB of S3 storage (12 months)
- ✅ 25 GB of DynamoDB storage (12 months)
- ✅ 2.5M DynamoDB read/write requests (12 months)
- ✅ 50,000 Cognito MAUs (permanent)
- ✅ 250,000 AppSync queries per month (permanent)
- ✅ 1M Lambda requests per month (permanent)

**You WILL be charged:**
- ❌ If you exceed free tier limits
- ❌ Data transfer out of AWS (after 1 GB free/month)
- ❌ Services not in free tier

**What AWS asks for:**
- Credit card or debit card number
- Billing address
- Cardholder name

**Safety Tips:**
- ✅ AWS won't charge unless you exceed free tier
- ✅ You can set billing alerts to get notified of charges
- ✅ You can close the account anytime
- ⚠️ Always monitor your usage in AWS Billing Dashboard

### 1.6 Phone Verification

1. Enter your phone number
2. Choose **Call** or **SMS**
3. Enter the verification code you receive
4. Click **Continue**

### 1.7 Choose Support Plan

Select **Basic Plan** (Free) - this is sufficient for development.

- Basic Plan: Free
- Developer Plan: $29/month (more support)
- Business Plan: $100/month (advanced support)

Click **Complete sign up**

---

## 🔐 Step 2: Sign In to AWS Console

### 2.1 Initial Sign In

1. Go to: **https://console.aws.amazon.com/**
2. Sign in with your email and password
3. You may be asked to change your password (first-time login)

### 2.2 Select Region

Choose a region:
- **Recommended:** `us-east-1` (N. Virginia) - Best for new accounts, lowest latency
- **Alternative:** `us-west-2` (Oregon), `eu-west-1` (Ireland)

**Note:** You can change regions later, but some services are region-specific.

---

## 🛡️ Step 3: Secure Your Account (IMPORTANT!)

### 3.1 Enable Multi-Factor Authentication (MFA)

**For Root Account (Highest Priority):**

1. Click your account name (top right) → **My Security Credentials**
2. Click **Multi-factor authentication (MFA)**
3. Click **Assign MFA device**
4. Choose **Authenticator app** (recommended) or **Hardware device**
5. Download an authenticator app (Google Authenticator, Authy, Microsoft Authenticator)
6. Scan QR code or enter secret key
7. Enter two consecutive codes to verify

**Why MFA?** Prevents unauthorized access even if password is compromised.

### 3.2 Create IAM User (Recommended)

**⚠️ Never use root account for daily operations!**

1. Search for **IAM** in AWS Console
2. Click **Users** → **Create user**
3. Username: `amplify-admin` (or your choice)
4. Select: **Provide user access to the AWS Management Console**
5. Click **Next**

**Set permissions:**
- Choose **Attach policies directly**
- Search and select:
  - `AdministratorAccess-Amplify` (for Amplify)
  - OR `PowerUserAccess` (less privileges, safer)

**Review and create:**
- Click **Create user**
- **IMPORTANT:** Save the login URL and password shown
- Download or copy the password - you won't see it again!

**Sign out and sign in with the new IAM user:**
- Use the special sign-in URL provided (looks like: `https://123456789.signin.aws.amazon.com/console`)

---

## 💳 Step 4: Set Up Billing Alerts

**Protect yourself from unexpected charges:**

1. Search for **Billing** in AWS Console
2. Click **Billing** → **Preferences**
3. Enable **Receive Billing Alerts**
4. Click **Billing Preferences** → **Manage billing alerts**
5. Click **Create alarm**
6. Set:
   - Alarm name: `Free Tier Alert`
   - Threshold: `$5.00` (or your comfort level)
   - Email: Your email address

**Create multiple alerts:**
- `$1` - Early warning
- `$5` - Moderate usage
- `$10` - High usage

---

## ⚙️ Step 5: Install AWS CLI

### 5.1 Download AWS CLI

**Windows:**
1. Download: **https://awscli.amazonaws.com/AWSCLIV2.msi**
2. Run installer
3. Follow installation wizard
4. Verify: Open PowerShell and run `aws --version`

**Mac:**
```bash
curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"
sudo installer -pkg AWSCLIV2.pkg -target /
aws --version
```

**Linux:**
```bash
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
aws --version
```

### 5.2 Configure AWS CLI

```bash
aws configure
```

**Enter the following:**

1. **AWS Access Key ID:**
   - Go to AWS Console → **IAM** → **Users** → Your user
   - Click **Security credentials** tab
   - Click **Create access key**
   - Choose **Command Line Interface (CLI)**
   - Click **Next** → **Create access key**
   - **IMPORTANT:** Copy both Access Key ID and Secret Access Key
   - Store Secret Access Key securely (you won't see it again!)

2. **AWS Secret Access Key:**
   - Paste the Secret Access Key you copied

3. **Default region name:**
   - Enter: `us-east-1` (or your chosen region)

4. **Default output format:**
   - Enter: `json`

**Verify configuration:**
```bash
aws sts get-caller-identity
```
You should see your account details.

---

## 🔧 Step 6: Install and Configure Amplify CLI

### 6.1 Install Amplify CLI

```bash
npm install -g @aws-amplify/cli
```

### 6.2 Configure Amplify CLI

```bash
amplify configure
```

**Follow the prompts:**

1. **Specify the AWS Region:**
   - Enter: `us-east-1` (or your region)
   - Press Enter

2. **Specify the username of the new IAM user:**
   - Enter: `amplify-admin` (or your IAM username)
   - Press Enter

3. **Complete the user creation in the AWS Console:**
   - A browser window will open (or follow the URL shown)
   - If user exists, skip to step 4
   - If creating new user:
     - Click **Next: Permissions**
     - Search and select: `AdministratorAccess-Amplify`
     - Click **Next: Tags** → **Next: Review** → **Create user**

4. **Create access key:**
   - Go to **IAM** → **Users** → Your user → **Security credentials**
   - Click **Create access key**
   - Choose **Command Line Interface (CLI)**
   - Click **Next** → **Create access key**
   - Copy the Access Key ID and Secret Access Key

5. **Enter the access key of the newly created user:**
   - Paste Access Key ID
   - Paste Secret Access Key

6. **Profile Name:**
   - Enter: `default` (or press Enter for default)

**Verify:**
```bash
amplify configure list
```

You should see your profile configured.

---

## ✅ Step 7: Verify Everything Works

### 7.1 Test AWS CLI

```bash
aws sts get-caller-identity
```

Should return your account/user info.

### 7.2 Test Amplify CLI

```bash
amplify --version
```

Should show version number.

### 7.3 Test AWS Console Access

1. Go to: **https://console.aws.amazon.com/**
2. Sign in with your IAM user
3. Navigate to services like **IAM**, **S3**, **Cognito**

---

## 📊 Step 8: Enable Required Services

Some services need to be enabled in the console:

1. **Cognito:**
   - Search for **Cognito** → Click **User pools** → Create pool (we'll do this via Amplify)

2. **AppSync:**
   - Search for **AppSync** → Will be created by Amplify

3. **DynamoDB:**
   - Search for **DynamoDB** → Click **Tables** → Will be created by Amplify

4. **S3:**
   - Search for **S3** → Click **Buckets** → Will be created by Amplify

5. **Lambda:**
   - Search for **Lambda** → Click **Functions** → Will be created by Amplify

**Note:** We'll create these via Amplify CLI, not manually.

---

## 💰 Step 9: Monitor Costs (Important!)

### 9.1 Set Up Budget Alert

1. Go to **AWS Cost Management** → **Budgets**
2. Click **Create budget**
3. Choose **Cost budget**
4. Set:
   - Budget name: `Monthly Free Tier Budget`
   - Period: **Monthly**
   - Budget amount: `$5.00`
   - Alert threshold: `80%` (alert at $4)
   - Email: Your email

### 9.2 Check Current Usage

1. Go to **AWS Cost Management** → **Cost Explorer**
2. View estimated costs (may take 24 hours to show data)

### 9.3 Check Free Tier Usage

1. Go to **AWS Free Tier** page
2. Monitor usage of:
   - EC2
   - S3
   - DynamoDB
   - Cognito
   - AppSync
   - Lambda

---

## 🎯 Step 10: You're Ready!

Now you can proceed with Amplify setup:

1. ✅ AWS Account created
2. ✅ IAM user created
3. ✅ AWS CLI configured
4. ✅ Amplify CLI configured
5. ✅ Billing alerts set up

**Next Steps:**
- Go back to `QUICK_AMPLIFY_SETUP.md` or `AWS_SETUP.md`
- Start with: `amplify init`

---

## 🔒 Security Best Practices Checklist

- ✅ Root account has MFA enabled
- ✅ IAM user created (not using root)
- ✅ IAM user has MFA enabled
- ✅ Access keys stored securely (not in git!)
- ✅ Billing alerts configured
- ✅ Budget alerts set up
- ✅ Region selected and consistent

---

## 🐛 Troubleshooting

**"Access Denied" errors:**
- Check IAM user permissions
- Ensure correct access keys are configured
- Verify region is correct

**"No credentials found":**
- Run `aws configure` again
- Run `amplify configure` again
- Check `~/.aws/credentials` file (Windows: `C:\Users\YourName\.aws\credentials`)

**"Free tier exhausted":**
- Check AWS Free Tier page
- Review Cost Explorer
- Consider using a different AWS account for development

**"Card charged unexpectedly":**
- Check billing dashboard
- Review Cost Explorer
- Check if any services exceeded free tier

---

## 📚 Resources

- **AWS Free Tier:** https://aws.amazon.com/free/
- **AWS Cost Calculator:** https://calculator.aws/
- **AWS Billing Dashboard:** https://console.aws.amazon.com/billing/
- **IAM Documentation:** https://docs.aws.amazon.com/IAM/
- **Amplify CLI Docs:** https://docs.amplify.aws/cli/

---

**🎉 Congratulations!** Your AWS account is set up and ready for the project!

