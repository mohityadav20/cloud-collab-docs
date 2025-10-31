import { Amplify } from 'aws-amplify';

/**
 * Configure AWS Amplify
 * Uses environment variables or auto-discovery
 */
export const configure = () => {
  const userPoolId = import.meta.env.VITE_APP_USER_POOL_ID || '';
  const userPoolClientId = import.meta.env.VITE_APP_USER_POOL_CLIENT_ID || '';
  const apiEndpoint = import.meta.env.VITE_APP_API_ENDPOINT || '';
  const region = import.meta.env.VITE_APP_REGION || 'us-east-1';
  const storageBucket = import.meta.env.VITE_APP_STORAGE_BUCKET || '';

  // Check if required environment variables are set
  if (!userPoolId || !userPoolClientId) {
    console.error('❌ AWS Amplify Auth not configured!');
    console.error('Missing environment variables:');
    if (!userPoolId) console.error('  - VITE_APP_USER_POOL_ID');
    if (!userPoolClientId) console.error('  - VITE_APP_USER_POOL_CLIENT_ID');
    console.error('\n📚 To fix this:');
    console.error('  1. Run: amplify init');
    console.error('  2. Run: amplify add auth');
    console.error('  3. Run: amplify push');
    console.error('  4. Create .env file with values from amplify_outputs.json');
    console.error('\nSee AWS_SETUP.md for detailed instructions.');
  }

  const config = {
    Auth: {
      Cognito: {
        userPoolId,
        userPoolClientId,
        region,
        loginWith: {
          email: true,
        },
      },
    },
    API: {
      GraphQL: {
        endpoint: apiEndpoint,
        region,
        defaultAuthMode: 'userPool' as const,
      },
    },
    Storage: {
      S3: {
        bucket: storageBucket,
        region,
      },
    },
  };

  Amplify.configure(config);
};

export default configure;

