/// <reference types="vite/client" />

/**
 * Type definitions for Vite environment variables
 */
interface ImportMetaEnv {
  readonly VITE_APP_API_ENDPOINT?: string;
  readonly VITE_APP_REGION?: string;
  readonly VITE_APP_USER_POOL_ID?: string;
  readonly VITE_APP_USER_POOL_CLIENT_ID?: string;
  readonly VITE_APP_STORAGE_BUCKET?: string;
  readonly VITE_ENABLE_EXPORT_TO_S3?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

