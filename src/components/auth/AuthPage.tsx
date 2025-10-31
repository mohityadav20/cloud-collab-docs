import React from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

/**
 * Authentication page using Amplify UI
 * Handles sign up, sign in, and password reset
 */
const AuthPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Cloud Collaborative Docs
          </h1>
          <p className="mt-2 text-gray-600">
            Sign in to start collaborating
          </p>
        </div>
        <Authenticator
          loginMechanisms={['email']}
          signUpAttributes={['email']}
          components={{
            Header() {
              return null;
            },
          }}
        />
      </div>
    </div>
  );
};

export default AuthPage;

