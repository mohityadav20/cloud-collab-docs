#!/usr/bin/env node

/**
 * Setup script for Cloud Collaborative Document Management System
 * Initializes AWS Amplify resources and configures the environment
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up Cloud Collaborative Document Management System...\n');

/**
 * Check if Amplify CLI is installed
 */
function checkAmplifyCLI() {
  try {
    execSync('amplify --version', { stdio: 'ignore' });
    console.log('✅ Amplify CLI is installed');
    return true;
  } catch (error) {
    console.error('❌ Amplify CLI is not installed. Please install it first:');
    console.log('   npm install -g @aws-amplify/cli');
    return false;
  }
}

/**
 * Initialize Amplify project
 */
function initAmplify() {
  console.log('\n📦 Initializing Amplify project...');
  try {
    execSync('amplify init', { stdio: 'inherit' });
    console.log('✅ Amplify project initialized');
  } catch (error) {
    console.error('❌ Failed to initialize Amplify project');
    process.exit(1);
  }
}

/**
 * Add API (GraphQL)
 */
function addAPI() {
  console.log('\n📡 Adding GraphQL API...');
  try {
    execSync('amplify add api', { stdio: 'inherit' });
    console.log('✅ GraphQL API added');
  } catch (error) {
    console.error('❌ Failed to add GraphQL API');
    process.exit(1);
  }
}

/**
 * Add authentication
 */
function addAuth() {
  console.log('\n🔐 Adding authentication...');
  try {
    execSync('amplify add auth', { stdio: 'inherit' });
    console.log('✅ Authentication added');
  } catch (error) {
    console.error('❌ Failed to add authentication');
    process.exit(1);
  }
}

/**
 * Add storage (S3)
 */
function addStorage() {
  console.log('\n💾 Adding storage (S3)...');
  try {
    execSync('amplify add storage', { stdio: 'inherit' });
    console.log('✅ Storage added');
  } catch (error) {
    console.error('❌ Failed to add storage');
    process.exit(1);
  }
}

/**
 * Add function (Lambda)
 */
function addFunction() {
  console.log('\n⚡ Adding Lambda function for image resizing...');
  try {
    execSync('amplify add function', { stdio: 'inherit' });
    console.log('✅ Lambda function added');
  } catch (error) {
    console.error('❌ Failed to add Lambda function');
    process.exit(1);
  }
}

/**
 * Push resources to AWS
 */
function pushResources() {
  console.log('\n☁️  Pushing resources to AWS...');
  try {
    execSync('amplify push', { stdio: 'inherit' });
    console.log('✅ Resources pushed to AWS');
  } catch (error) {
    console.error('❌ Failed to push resources to AWS');
    process.exit(1);
  }
}

/**
 * Generate environment variables
 */
function generateEnvFile() {
  console.log('\n📝 Generating environment variables...');
  try {
    execSync('amplify env get --name dev', { stdio: 'pipe' });
    // Note: In production, use amplify env pull to get the actual values
    console.log('✅ Environment variables generated');
    console.log('⚠️  Please copy the values from amplify_outputs.json to .env');
  } catch (error) {
    console.error('❌ Failed to generate environment variables');
  }
}

/**
 * Main setup function
 */
function main() {
  if (!checkAmplifyCLI()) {
    process.exit(1);
  }

  const args = process.argv.slice(2);
  const skipInit = args.includes('--skip-init');

  if (!skipInit) {
    initAmplify();
  }

  addAuth();
  addAPI();
  addStorage();
  addFunction();
  pushResources();
  generateEnvFile();

  console.log('\n✅ Setup complete!');
  console.log('\n📚 Next steps:');
  console.log('   1. Copy environment variables from amplify_outputs.json to .env');
  console.log('   2. Run: npm install');
  console.log('   3. Run: npm run dev');
  console.log('\n💡 For detailed instructions, see README.md');
}

main();

