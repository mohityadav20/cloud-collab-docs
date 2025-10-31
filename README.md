# Cloud Collaborative Document Management System

A production-ready React application implementing a cloud-based collaborative document editor with real-time editing, document sharing with granular permissions, user authentication, image upload/resizing, and import/export capabilities.

## 🚀 Features

- **Real-time Collaboration**: Live document editing with GraphQL subscriptions via AWS AppSync
- **Document Sharing**: Granular permissions (READ/WRITE) for document sharing
- **User Authentication**: AWS Cognito integration with hosted UI
- **Image Upload & Resizing**: S3 uploads with Lambda-powered automatic thumbnail generation
- **Import/Export**: Support for PDF, Markdown, and Word formats
- **Real-time Notifications**: In-app notifications for document updates
- **Serverless Backend**: AWS Amplify, AppSync, Cognito, DynamoDB, S3, and Lambda

## 📋 Prerequisites

- **Node.js** 18+ and npm
- **AWS Account** with appropriate permissions
- **AWS Amplify CLI** installed globally: `npm install -g @aws-amplify/cli`
- **AWS CLI** configured with credentials (optional, for advanced operations)

## 🛠️ Setup Instructions

### 1. Clone and Install

```bash
git clone <repository-url>
cd cloud-collab-docs
npm install
```

### 2. Initialize AWS Amplify

The project uses AWS Amplify for backend infrastructure. You need to initialize and configure Amplify resources.

#### Option A: Interactive Setup (Recommended for First Time)

```bash
# Initialize Amplify project
amplify init

# Follow the prompts:
# - Enter a name for your environment: dev (or production)
# - Choose your default editor: Visual Studio Code (or your preference)
# - Choose the type of app: javascript
# - Framework: react
# - Source directory: src
# - Distribution directory: dist
# - Build command: npm run build
# - Start command: npm run dev
# - Use AWS profile: Yes (or configure a new profile)
```

#### Option B: Using Setup Script

```bash
# On Linux/Mac
chmod +x setup.sh
./setup.sh

# On Windows (PowerShell)
node scripts/setup.js
```

### 3. Add Backend Resources

#### Add Authentication (Cognito)

```bash
amplify add auth

# Select: Default configuration with Social Provider (Federation)
# Or: Manual configuration
# - Username attributes: Email
# - Sign in options: Email
# - Multi-factor auth: No MFA (for development)
```

#### Add GraphQL API (AppSync)

```bash
amplify add api

# Select: GraphQL
# API name: collabdocs
# Authorization type: Amazon Cognito User Pool
# Use a schema template: No
# Annotate schema: No
# Edit schema now: No (we'll use the provided schema)
```

Copy the GraphQL schema from `amplify/backend/api/collabdocs/schema.graphql` to your Amplify project's API schema file (typically located at `amplify/backend/api/<api-name>/schema.graphql`).

#### Add Storage (S3)

```bash
amplify add storage

# Select: Content (Images, audio, video, etc.)
# Bucket name: collab-docs-assets (or your preferred name)
# Who should have access: Auth users only
# Restrict access by: Auth/Guest users
# Select permissions: create/update, read, delete
```

#### Add Function (Lambda for Image Resizing)

```bash
amplify add function

# Function name: imageResize
# Runtime: Node.js
# Function template: Hello World
```

Replace the function code with the code from `amplify/backend/function/imageResize/src/index.js` and update `package.json` to include `sharp` dependency.

**Important**: Sharp requires native dependencies. For Lambda, you'll need to build the function with a Lambda-compatible environment or use a Lambda Layer.

#### Configure S3 Trigger for Lambda

After creating the function, you need to configure S3 to trigger Lambda on image uploads. This is typically done through the Amplify CLI or AWS Console.

### 4. Push Resources to AWS

```bash
amplify push

# Review the changes
# Confirm deployment (Y)
# This will create all AWS resources (Cognito, AppSync, DynamoDB, S3, Lambda)
```

**Note**: This process may take 10-15 minutes. Make sure you have sufficient AWS permissions.

### 5. Configure Environment Variables

After `amplify push`, Amplify generates an `amplify_outputs.json` file. Copy the relevant values to a `.env` file:

```bash
# Create .env file
cp .env.example .env

# Update .env with values from amplify_outputs.json
```

Example `.env`:

```env
VITE_APP_API_ENDPOINT=https://xxxxx.appsync-api.us-east-1.amazonaws.com/graphql
VITE_APP_REGION=us-east-1
VITE_APP_USER_POOL_ID=us-east-1_xxxxx
VITE_APP_USER_POOL_CLIENT_ID=xxxxx
VITE_APP_STORAGE_BUCKET=collab-docs-assets-dev-xxxxx
```

### 6. Start Development Server

```bash
npm start
# OR
npm run dev
```

Visit `http://localhost:5173` (or the port shown in the terminal).

## 🏃 Quick Local Development Guide

For detailed local development instructions, see **[LOCAL_DEVELOPMENT.md](./LOCAL_DEVELOPMENT.md)**.

### Quick Commands:

```bash
# Install dependencies
npm install

# Start dev server
npm start
# OR
npm run dev

# Run tests
npm run test

# Build for production
npm run build
```

**Note**: You need to set up AWS Amplify resources first (see Setup Instructions above).

## 📁 Project Structure

```
cloud-collab-docs/
├── amplify/                 # AWS Amplify configuration
│   ├── backend/
│   │   ├── api/             # GraphQL API schema
│   │   ├── function/        # Lambda functions
│   │   ├── storage/         # S3 configuration
│   │   └── auth/            # Cognito configuration
│   └── cli.json             # Amplify CLI config
├── src/
│   ├── components/          # React components
│   │   ├── auth/            # Authentication components
│   │   ├── documents/       # Document editor components
│   │   ├── notifications/   # Notification components
│   │   └── common/          # Shared components
│   ├── graphql/             # GraphQL queries, mutations, subscriptions
│   ├── hooks/               # Custom React hooks
│   ├── utils/               # Utility functions
│   ├── types/               # TypeScript type definitions
│   └── amplify/             # Amplify configuration
├── scripts/                  # Setup and utility scripts
├── tests/                    # Test files
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

## 🧪 Testing

```bash
# Run tests
npm run test

# Run tests with coverage
npm run test:coverage
```

## 🚢 Deployment

### AWS Amplify Console (CI/CD from GitHub)

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Amplify Console**:
   - Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify)
   - Click "New app" → "Host web app"
   - Select "GitHub" and authorize
   - Select your repository and branch

3. **Configure Build Settings**:
   Amplify Console should auto-detect the build settings. If not, use:
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm install
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

4. **Configure Environment Variables**:
   Add the same environment variables from `.env` in the Amplify Console under "Environment variables".

5. **Deploy**:
   Click "Save and deploy". Amplify will build and deploy your app.

### Manual Deployment

```bash
# Build for production
npm run build

# Deploy to S3/CloudFront (example)
aws s3 sync dist/ s3://your-bucket-name --delete
```

## 🔐 Security & IAM Best Practices

The project follows AWS best practices for security:

- **Least Privilege**: IAM roles are configured with minimal required permissions
- **Cognito User Pools**: User authentication handled by AWS Cognito
- **AppSync Authorization**: GraphQL API uses Cognito User Pool authorization
- **S3 Presigned URLs**: Image uploads use presigned URLs for secure uploads
- **Environment Variables**: No secrets hardcoded; all configurable via environment variables

### IAM Roles Created

- **AppSync Service Role**: For accessing DynamoDB tables
- **Lambda Execution Role**: For S3 access (read uploaded images, write thumbnails)
- **Amplify Hosting Role**: For deploying to S3/CloudFront

## 💰 Cost Considerations

This project is designed to use AWS Free Tier services where possible:

- **Cognito**: 50,000 MAUs free
- **AppSync**: 250,000 queries/month free
- **DynamoDB**: 25 GB storage + 2.5M read/write units free (12 months)
- **S3**: 5 GB storage + 20,000 GET requests free (12 months)
- **Lambda**: 1M requests + 400,000 GB-seconds free

**Potential Costs** (outside Free Tier):
- Data transfer out of AWS
- Additional DynamoDB read/write capacity
- Additional S3 storage beyond 5 GB
- Lambda execution time beyond free tier

**Cost Optimization Tips**:
- Use DynamoDB On-Demand mode for development
- Enable S3 lifecycle policies for old files
- Monitor CloudWatch metrics for usage

## 📝 GraphQL Schema

The GraphQL schema defines the following types:

- **Document**: Main document entity with title, content, owner
- **Share**: Document sharing with READ/WRITE permissions
- **UserProfile**: User profile information
- **DocumentPresence**: Real-time presence tracking

### Sample Queries

```graphql
# Get a document
query GetDocument($id: ID!) {
  getDocument(id: $id) {
    id
    title
    content
    owner
  }
}

# List all documents
query ListDocuments {
  listDocuments {
    items {
      id
      title
      updatedAt
    }
  }
}
```

### Sample Mutations

```graphql
# Create a document
mutation CreateDocument($input: CreateDocumentInput!) {
  createDocument(input: $input) {
    id
    title
  }
}

# Share a document
mutation CreateShare($input: CreateShareInput!) {
  createShare(input: $input) {
    id
    permission
  }
}
```

### Sample Subscriptions

```graphql
# Subscribe to document updates
subscription OnUpdateDocument($documentId: ID!) {
  onUpdateDocument(documentId: $documentId) {
    id
    title
    content
    updatedAt
  }
}
```

## 🔧 Troubleshooting

### Common Issues

1. **"Amplify CLI not found"**:
   ```bash
   npm install -g @aws-amplify/cli
   ```

2. **"Authentication error"**:
   - Check that `.env` variables are correctly set
   - Verify Cognito User Pool exists in AWS Console

3. **"GraphQL errors"**:
   - Ensure AppSync API is deployed: `amplify push`
   - Check schema syntax in `amplify/backend/api/*/schema.graphql`

4. **"S3 upload fails"**:
   - Verify S3 bucket exists and IAM permissions are correct
   - Check CORS configuration on S3 bucket

5. **"Lambda function errors"**:
   - Ensure Sharp dependency is installed correctly
   - Check Lambda execution role has S3 permissions

### Checking Amplify Status

```bash
amplify status
```

### Viewing Logs

```bash
# AppSync logs
amplify console api

# Lambda logs
amplify function console imageResize

# Cognito users
amplify console auth
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Submit a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🔗 Useful Links

- [AWS Amplify Documentation](https://docs.amplify.aws/)
- [AWS AppSync Documentation](https://docs.aws.amazon.com/appsync/)
- [React Quill Documentation](https://github.com/zenoamaro/react-quill)
- [AWS Free Tier](https://aws.amazon.com/free/)

## ⚠️ Important Notes

- **Production Readiness**: This is a scaffold/skeleton. For production, consider:
  - Operational Transforms (OT) or Conflict-free Replicated Data Types (CRDTs) for true real-time collaboration
  - Rate limiting and abuse prevention
  - Comprehensive error handling and logging
  - Monitoring and alerting (CloudWatch)
  - Backup and disaster recovery strategies

- **Image Resizing**: The Lambda function uses Sharp, which requires native dependencies. Consider using a Lambda Layer or building in a Lambda-compatible environment.

- **Real-time Collaboration**: Current implementation uses simple last-write-wins. For production, implement proper conflict resolution (OT/CRDT).

## 🐛 Known Issues / Assumptions

1. **Operational Transforms**: Real-time collaboration uses simple subscription updates. For production, implement OT or CRDT for conflict resolution.

2. **Image Upload Trigger**: S3 → Lambda trigger needs to be configured manually after `amplify push` or through the CloudFormation template.

3. **Sharp Native Dependencies**: Lambda function requires Sharp to be built in a Lambda-compatible environment (Amazon Linux 2).

4. **Export Functions**: PDF export uses browser print functionality. For server-side export, implement a Lambda function or use a service like Puppeteer.

5. **User Profile**: User profiles are created manually. Consider auto-creating on first sign-in.

## 📧 Support

For issues and questions:
- Open an issue on GitHub
- Check AWS Amplify documentation
- Review AWS service-specific documentation

---

**Happy Collaborating! 🎉**

