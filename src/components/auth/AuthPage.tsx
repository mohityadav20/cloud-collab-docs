import React from 'react';
import { Authenticator, Theme, ThemeProvider } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

/**
 * Authentication page using Amplify UI with modern gradient design
 * Handles sign up, sign in, and password reset
 */

// Custom theme matching the modern gradient design system
const authTheme: Theme = {
  name: 'modern-gradient-theme',
  tokens: {
    colors: {
      brand: {
        primary: {
          10: '#f3f4f6',
          20: '#e5e7eb',
          40: '#9ca3af',
          60: '#6366f1',
          80: '#4f46e5',
          90: '#4338ca',
          100: '#3730a3',
        },
      },
      background: {
        primary: 'rgba(255, 255, 255, 0.95)',
        secondary: 'rgba(249, 250, 251, 0.9)',
      },
    },
    components: {
      authenticator: {
        router: {
          borderWidth: '0',
          backgroundColor: 'transparent',
        },
      },
      button: {
        primary: {
          backgroundColor: '{colors.brand.primary.80}',
          _hover: {
            backgroundColor: '{colors.brand.primary.90}',
          },
          _focus: {
            backgroundColor: '{colors.brand.primary.90}',
          },
          _active: {
            backgroundColor: '{colors.brand.primary.100}',
          },
        },
      },
      fieldcontrol: {
        _focus: {
          borderColor: '{colors.brand.primary.80}',
          boxShadow: '0 0 0 2px rgba(99, 102, 241, 0.2)',
        },
      },
      tabs: {
        item: {
          _active: {
            borderColor: '{colors.brand.primary.80}',
            color: '{colors.brand.primary.80}',
          },
          _hover: {
            color: '{colors.brand.primary.60}',
          },
        },
      },
    },
    radii: {
      small: '0.5rem',
      medium: '0.75rem',
      large: '1rem',
    },
  },
};

const AuthPage: React.FC = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center gradient-bg relative overflow-hidden py-12">
      {/* Animated Background Shapes */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
      <div className="absolute top-40 right-20 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-40 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>

      {/* Auth Container - Perfectly Centered */}
      <div className="relative w-full flex items-center justify-center px-4">
        <div className="w-full max-w-md flex flex-col items-center animate-fadeIn">
          {/* Glass Card */}
          <div className="w-full glass-card rounded-2xl shadow-glow overflow-hidden">
            {/* Header */}
            <div className="text-center mb-4 px-8 pt-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-primary mb-3 animate-pulseGlow">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gradient mb-2 tracking-tight">
                Cloud Collaborative Docs
              </h1>
              <p className="text-gray-600 text-base">
                ✨ Sign in to start collaborating
              </p>
            </div>

            {/* Authenticator with Custom Theme - Properly Constrained */}
            <div className="px-8 pb-8">
              <ThemeProvider theme={authTheme}>
                <Authenticator
                  loginMechanisms={['email']}
                  signUpAttributes={['email']}
                  components={{
                    Header() {
                      return null;
                    },
                  }}
                />
              </ThemeProvider>
            </div>
          </div>

          {/* Footer - High Contrast Badges */}
          <div className="mt-6 w-full flex justify-center">
            <div className="inline-flex items-center gap-3 text-sm px-6 py-3 rounded-full shadow-xl gradient-primary">
              <span className="flex items-center gap-1.5 text-white font-semibold">
                <span>🔒</span>
                <span>Secure</span>
              </span>
              <span className="text-white/80">•</span>
              <span className="flex items-center gap-1.5 text-white font-semibold">
                <span>☁️</span>
                <span>Cloud-Based</span>
              </span>
              <span className="text-white/80">•</span>
              <span className="flex items-center gap-1.5 text-white font-semibold">
                <span>🚀</span>
                <span>Real-Time</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;

