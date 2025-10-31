# Your Environment Variable Values

Copy these values and add them to **AWS Amplify Console** → **App settings** → **Environment variables**

## 📋 Required Environment Variables

### 1. User Pool ID
```
VITE_APP_USER_POOL_ID=us-east-1_nMZqB7a9R
```

### 2. User Pool Client ID  
```
VITE_APP_USER_POOL_CLIENT_ID=1oss26dldah6mrv474icludkso
```
**Note:** Use `AppClientIDWeb` (the web client) for React apps.

### 3. Region
```
VITE_APP_REGION=us-east-1
```

### 4. API Endpoint
```
VITE_APP_API_ENDPOINT=https://hu6eh3g5yfcy7i4ze3q2qi4taq.appsync-api.us-east-1.amazonaws.com/graphql
```

### 5. Storage Bucket
```
VITE_APP_STORAGE_BUCKET=cc2e961fe50d6f14ba88166872a77153278fc90c-dev
```

---

## ✅ Quick Copy-Paste for Amplify Console

Go to: **AWS Amplify Console** → Your app → **App settings** → **Environment variables**

Add these one by one:

```
Key: VITE_APP_USER_POOL_ID
Value: us-east-1_nMZqB7a9R
```

```
Key: VITE_APP_USER_POOL_CLIENT_ID
Value: 1oss26dldah6mrv474icludkso
```

```
Key: VITE_APP_REGION
Value: us-east-1
```

```
Key: VITE_APP_API_ENDPOINT
Value: https://hu6eh3g5yfcy7i4ze3q2qi4taq.appsync-api.us-east-1.amazonaws.com/graphql
```

```
Key: VITE_APP_STORAGE_BUCKET
Value: cc2e961fe50d6f14ba88166872a77153278fc90c-dev
```

---

## 📍 Where These Values Come From

- **UserPoolId:** From `amplify/backend/amplify-meta.json` → `auth.cc2e4cbecce.output.UserPoolId`
- **AppClientIDWeb:** From `amplify/backend/amplify-meta.json` → `auth.cc2e4cbecce.output.AppClientIDWeb`
- **GraphQL Endpoint:** From `amplify/backend/amplify-meta.json` → `api.cc2.output.GraphQLAPIEndpointOutput`
- **Region:** us-east-1 (as configured)
- **S3 Bucket:** From `amplify/backend/amplify-meta.json` → `storage.s30b306bf5.output.BucketName`

---

## ⚠️ Important

After adding all variables in Amplify Console:
1. Click **"Save"**
2. **Redeploy** your app (or it will auto-redeploy)
3. Wait for deployment to complete
4. Test your app!

