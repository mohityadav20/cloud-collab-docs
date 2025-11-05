# Local deployment helper script for Windows PowerShell
# Run this on your LOCAL Windows machine to deploy to EC2

# Configuration - UPDATE THESE VALUES
$EC2_IP = "YOUR_EC2_PUBLIC_IP"           # e.g., 54.123.45.67
$KEY_FILE = "cloud-collab-key.pem"        # Path to your .pem file
$EC2_USER = "ubuntu"

Write-Host "🚀 Deploying to EC2..." -ForegroundColor Yellow
Write-Host ""

# Check if key file exists
if (-not (Test-Path $KEY_FILE)) {
    Write-Host "❌ Key file not found: $KEY_FILE" -ForegroundColor Red
    Write-Host "Please update KEY_FILE in this script"
    exit 1
}

# Check if EC2_IP is set
if ($EC2_IP -eq "YOUR_EC2_PUBLIC_IP") {
    Write-Host "❌ Please update EC2_IP in this script" -ForegroundColor Red
    exit 1
}

# Set correct permissions for key file
icacls $KEY_FILE /inheritance:r | Out-Null
icacls $KEY_FILE /grant:r "$env:USERNAME`:R" | Out-Null

# Test connection
Write-Host "Testing connection to EC2..." -ForegroundColor Yellow
$testConnection = ssh -i $KEY_FILE -o ConnectTimeout=5 -o StrictHostKeyChecking=no "$EC2_USER@$EC2_IP" "echo 'Connection successful'" 2>&1

if ($testConnection -notlike "*Connection successful*") {
    Write-Host "❌ Cannot connect to EC2 instance" -ForegroundColor Red
    Write-Host "Please check:"
    Write-Host "  1. EC2 instance is running"
    Write-Host "  2. Security group allows SSH from your IP"
    Write-Host "  3. EC2_IP is correct"
    exit 1
}

Write-Host "✅ Connected to EC2" -ForegroundColor Green

# Deploy
Write-Host "Deploying application..." -ForegroundColor Yellow

$deployScript = @'
cd /home/ubuntu/cc-2
echo "📥 Pulling latest changes..."
git pull origin main
echo "📦 Installing dependencies..."
npm install
echo "🔨 Building app..."
npm run build
echo "🔄 Restarting Nginx..."
sudo systemctl restart nginx
echo "✅ Deployment complete!"
'@

ssh -i $KEY_FILE "$EC2_USER@$EC2_IP" $deployScript

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "🎉 Successfully deployed to EC2!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Access your app at: http://$EC2_IP"
} else {
    Write-Host "❌ Deployment failed" -ForegroundColor Red
    exit 1
}

