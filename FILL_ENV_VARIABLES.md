# How to Fill Environment Variables in AWS Amplify Console

Based on the interface you're seeing, here's exactly what to enter:

## 📝 Fill Each Variable One by One

### Variable 1: User Pool ID

**In the form:**
- **Variable:** `VITE_APP_USER_POOL_ID`
- **Value:** `us-east-1_nMZqB7a9R`
- **Branch:** `All branches` (or select specific branch if you want)

Click **"Add new"** to add the next variable.

---

### Variable 2: User Pool Client ID

**In the form:**
- **Variable:** `VITE_APP_USER_POOL_CLIENT_ID`
- **Value:** `1oss26dldah6mrv474icludkso`
- **Branch:** `All branches`

Click **"Add new"** again.

---

### Variable 3: Region

**In the form:**
- **Variable:** `VITE_APP_REGION`
- **Value:** `us-east-1`
- **Branch:** `All branches`

Click **"Add new"** again.

---

### Variable 4: API Endpoint

**In the form:**
- **Variable:** `VITE_APP_API_ENDPOINT`
- **Value:** `https://hu6eh3g5yfcy7i4ze3q2qi4taq.appsync-api.us-east-1.amazonaws.com/graphql`
- **Branch:** `All branches`

Click **"Add new"** again.

---

### Variable 5: Storage Bucket

**In the form:**
- **Variable:** `VITE_APP_STORAGE_BUCKET`
- **Value:** `cc2e961fe50d6f14ba88166872a77153278fc90c-dev`
- **Branch:** `All branches`

---

## ✅ After Adding All Variables

1. Click **"Save"** button (bottom right, purple button)
2. Amplify will automatically redeploy your app
3. Wait for deployment to complete
4. Your app will now work with AWS services!

---

## 📋 Complete List (For Copy-Paste)

| Variable | Value |
|----------|-------|
| `VITE_APP_USER_POOL_ID` | `us-east-1_nMZqB7a9R` |
| `VITE_APP_USER_POOL_CLIENT_ID` | `1oss26dldah6mrv474icludkso` |
| `VITE_APP_REGION` | `us-east-1` |
| `VITE_APP_API_ENDPOINT` | `https://hu6eh3g5yfcy7i4ze3q2qi4taq.appsync-api.us-east-1.amazonaws.com/graphql` |
| `VITE_APP_STORAGE_BUCKET` | `cc2e961fe50d6f14ba88166872a77153278fc90c-dev` |

---

**Important Notes:**
- Variable names are **case-sensitive** - make sure they match exactly
- Values must be copied exactly as shown (no extra spaces)
- Branch can be "All branches" or your specific branch (e.g., "main")
- Click "Save" after adding all variables

