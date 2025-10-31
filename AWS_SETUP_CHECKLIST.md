# AWS Account Setup Checklist

Use this checklist to track your AWS account setup progress.

## Account Creation
- [ ] Created AWS account at aws.amazon.com
- [ ] Verified email address
- [ ] Completed phone verification
- [ ] Added payment method (credit/debit card)
- [ ] Signed in to AWS Console

## Security Setup
- [ ] Enabled MFA on root account
- [ ] Created IAM user (not using root account)
- [ ] Enabled MFA on IAM user
- [ ] Saved IAM user login URL and password securely
- [ ] Signed in with IAM user (not root)

## Billing & Alerts
- [ ] Enabled billing alerts
- [ ] Created billing alarm at $5 threshold
- [ ] Created budget alert
- [ ] Reviewed AWS Free Tier limits

## Tool Installation
- [ ] Installed AWS CLI
- [ ] Verified: `aws --version` works
- [ ] Installed Amplify CLI
- [ ] Verified: `amplify --version` works

## Credentials Configuration
- [ ] Created IAM access keys for AWS CLI
- [ ] Ran `aws configure` successfully
- [ ] Verified: `aws sts get-caller-identity` works
- [ ] Ran `amplify configure` successfully
- [ ] Verified: `amplify configure list` shows profile

## Verification
- [ ] Can access AWS Console with IAM user
- [ ] Can run AWS CLI commands
- [ ] Can run Amplify CLI commands
- [ ] All credentials stored securely (not in git)

## Next Steps
- [ ] Read QUICK_AMPLIFY_SETUP.md
- [ ] Run `amplify init`
- [ ] Follow project setup steps

---

**Status:** ___ / 24 completed

**Notes:**
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________

