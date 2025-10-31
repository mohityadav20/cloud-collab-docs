# Storage Options Guide

When you run `amplify add storage`, you'll see these options. Here's what to choose:

## 📋 Step-by-Step Choices

### Question 1: Type of Storage
**Select:** `Content (Images, audio, video, etc.)`

**Why:** We need S3 bucket for:
- Image uploads
- Document assets
- Thumbnails (from Lambda resize function)

**NOT:** `NoSQL Database (DynamoDB)` - That's already created by the API

---

### Question 2: Friendly Name
**Enter:** `assets` (or just press Enter for default)

**Why:** This is just a label in your project

---

### Question 3: Bucket Name
**Enter:** `collab-docs-assets` (or your choice)

**Example:** `collab-docs-assets-dev` or `my-doc-assets`

**Why:** This becomes your S3 bucket name

---

### Question 4: Who Should Have Access?
**Select:** `Auth users only`

**Why:** Only authenticated users should upload files

**NOT:** `Auth and guest users` (we don't need guest access)

---

### Question 5: Authenticated User Permissions
**Select:** `create/update, read, delete`

**Why:** Users need to:
- Upload images (create)
- View images (read)
- Replace/delete images (update/delete)

---

### Question 6: Lambda Trigger
**Select:** `No` (or skip if not asked)

**Why:** We already have a Lambda function created separately
(We can connect it later if needed)

---

## ✅ Quick Summary

```
1. Type: Content (Images, audio, video, etc.)
2. Name: assets (default)
3. Bucket: collab-docs-assets
4. Access: Auth users only
5. Permissions: create/update, read, delete
6. Lambda: No
```

---

**Ready? Run:**
```bash
amplify add storage
```

Then follow the choices above!

