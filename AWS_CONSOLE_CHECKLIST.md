# ✅ AWS Console Setup Checklist

## 🎯 What You Need to Do on AWS Console

### 1. EC2 Instance Creation
**Location:** AWS Console → EC2 → Instances → Launch Instance

| Setting | Value |
|---------|-------|
| **Name** | cloud-collab-app |
| **AMI** | Ubuntu Server 22.04 LTS |
| **Instance Type** | t2.micro (free tier) |
| **Key Pair** | Create new → cloud-collab-key.pem |
| **Storage** | 8 GB gp3 (default) |

**⚠️ IMPORTANT:** Download and save the `.pem` key file - you cannot download it again!

---

### 2. Security Group Configuration
**Location:** EC2 → Security Groups → Select your instance's SG → Edit Inbound Rules

Add these rules:

| Type | Port | Source | Description |
|------|------|--------|-------------|
| SSH | 22 | My IP | SSH access from your computer |
| HTTP | 80 | 0.0.0.0/0 | Web traffic |
| HTTPS | 443 | 0.0.0.0/0 | Secure web traffic |
| Custom TCP | 3000 | 0.0.0.0/0 | Dev server (optional) |

---

### 3. Elastic IP (Recommended)
**Location:** EC2 → Elastic IPs

1. **Allocate Elastic IP address** → Allocate
2. **Actions** → **Associate Elastic IP address**
3. Select your EC2 instance
4. Click **Associate**

**Why?** Your IP won't change when you stop/start the instance.

---

### 4. IAM User for Amplify (if needed)
**Location:** IAM → Users → Add User

1. **Username:** amplify-deploy
2. **Access type:** Programmatic access
3. **Permissions:** AdministratorAccess-Amplify (or custom policy)
4. **Save the Access Key ID and Secret Access Key**

You'll use these when running `amplify pull` on EC2.

---

## 📊 Your EC2 Instance Details

After setup, note down:

```
EC2 Public IP: ________________
Elastic IP (if allocated): ________________
Key Pair Name: cloud-collab-key.pem
Key Pair Location: ________________
Security Group ID: ________________
Instance ID: ________________
Region: ________________
```

---

## 🔐 Security Best Practices

### ✅ Do This:
- ✅ Use Elastic IP to avoid IP changes
- ✅ Restrict SSH to your IP only (not 0.0.0.0/0)
- ✅ Keep your .pem key file safe and private
- ✅ Set correct permissions: `chmod 400 cloud-collab-key.pem`
- ✅ Regularly update your EC2 instance: `sudo apt update && sudo apt upgrade`

### ❌ Don't Do This:
- ❌ Share your .pem key file
- ❌ Allow SSH from 0.0.0.0/0 (except for testing)
- ❌ Commit .pem files to git
- ❌ Use default passwords
- ❌ Ignore security group warnings

---

## 💰 Cost Monitor

### Free Tier Includes:
- ✅ 750 hours/month of t2.micro (covers 24/7 for 1 instance)
- ✅ 30 GB of EBS storage
- ✅ 15 GB data transfer out
- ✅ 1 Elastic IP (when associated with running instance)

### ⚠️ Costs After Free Tier:
- EC2 t2.micro: ~$8-10/month
- Elastic IP (not associated): $3.60/month
- Data transfer >15GB: $0.09/GB
- EBS storage >30GB: $0.10/GB/month

**Tip:** Stop (don't terminate) your instance when not in use to save hours!

---

## 🎯 Quick Actions

### Connect to Your Instance:
```powershell
ssh -i cloud-collab-key.pem ubuntu@YOUR_EC2_IP
```

### Check Instance Status:
AWS Console → EC2 → Instances → Select your instance

### Stop Instance (to save free tier hours):
Select instance → Instance State → Stop

### Start Instance:
Select instance → Instance State → Start

**Note:** If using Elastic IP, the IP stays the same. Otherwise, you'll get a new public IP!

---

## 🔧 Troubleshooting

### Can't SSH to Instance:
1. Check instance state is "running"
2. Verify security group has port 22 open to your IP
3. Confirm you're using the correct .pem file
4. Check your current IP: https://whatismyip.com
5. Update security group if your IP changed

### App Not Accessible on Port 80:
1. Check security group has port 80 open to 0.0.0.0/0
2. Verify nginx is running: `sudo systemctl status nginx`
3. Check if port is listening: `sudo netstat -tlnp | grep :80`

### Elastic IP Costs:
- Free when associated with a running instance
- Costs $3.60/month if not associated or instance is stopped
- Solution: Release Elastic IP before stopping instance (not recommended for production)

---

## 📞 Support Resources

- **AWS Free Tier Usage:** AWS Console → Billing Dashboard → Free Tier
- **EC2 Documentation:** https://docs.aws.amazon.com/ec2/
- **AWS Support:** AWS Console → Support Center
- **Cost Explorer:** AWS Console → Cost Management → Cost Explorer

---

## ✅ Final Checklist

Before deploying your app:

- [ ] EC2 instance created and running
- [ ] Security groups configured (SSH, HTTP, HTTPS)
- [ ] Elastic IP allocated and associated
- [ ] Key pair downloaded and saved securely
- [ ] Can connect via SSH
- [ ] Instance details recorded (IP, region, instance ID)
- [ ] IAM user created for Amplify (if needed)
- [ ] Free tier usage monitored

---

**You're ready to deploy! 🚀**

Next step: Follow `EC2_DEPLOYMENT_GUIDE.md` to set up your instance and deploy the app.

