/**
 * Documentation of every environment variable consumed by the backend
 * (NestJS) and the MCP server. Sourced from .env.example at the repo
 * root and grep of `process.env.*` across apps/backend and apps/mcp-server.
 *
 * The frontend (apps/frontend) does not read any custom env vars: it uses
 * Vite's proxy to forward /api → http://127.0.0.1:3000 in dev, so its
 * "environment" is configured via vite.config.ts, not a .env file.
 *
 * Translation keys live under Manual.local_dev.env.vars.<id>.
 * Each entry includes a literal default/example (rendered as code) so
 * the page doesn't depend on i18n for technical strings.
 */
export type Required = 'required' | 'recommended' | 'optional';

export interface EnvVar {
  /** Stable id used as the i18n key suffix. Matches the env var name in kebab form. */
  id: string;
  /** Actual variable name. */
  name: string;
  /** Default or example value to render as code. Empty string means no sensible default. */
  example?: string;
  /** Required level — drives the badge in the table. */
  required: Required;
}

export interface EnvGroup {
  id: string;
  vars: EnvVar[];
}

export const ENV_GROUPS: EnvGroup[] = [
  {
    id: 'security',
    vars: [
      { id: 'jwt-secret', name: 'JWT_SECRET', example: 'openssl rand -base64 64', required: 'required' },
      { id: 'encryption-key', name: 'ENCRYPTION_KEY', example: 'openssl rand -base64 32', required: 'required' },
      { id: 'settings-encryption-key', name: 'SETTINGS_ENCRYPTION_KEY', example: 'openssl rand -base64 32', required: 'optional' },
    ],
  },
  {
    id: 'login-helper',
    vars: [
      { id: 'enable-login-helper', name: 'ENABLE_LOGIN_HELPER', example: 'true', required: 'optional' },
      { id: 'login-helper-roles', name: 'LOGIN_HELPER_ROLES', example: 'SYSTEM_ADMIN,ADMIN,TEACHER,DEPUTY,PRINCIPAL,STUDENT,PARENT', required: 'optional' },
      { id: 'demo-password', name: 'DEMO_PASSWORD', example: '"Demo1234!"', required: 'optional' },
    ],
  },
  {
    id: 'database',
    vars: [
      { id: 'db-adapter', name: 'DB_ADAPTER', example: 'sqlite', required: 'recommended' },
      { id: 'database-url', name: 'DATABASE_URL', example: 'file:./dev.db', required: 'recommended' },
    ],
  },
  {
    id: 'smtp',
    vars: [
      { id: 'smtp-host', name: 'SMTP_HOST', example: 'localhost', required: 'recommended' },
      { id: 'smtp-port', name: 'SMTP_PORT', example: '1025', required: 'recommended' },
      { id: 'smtp-user', name: 'SMTP_USER', example: '', required: 'optional' },
      { id: 'smtp-pass', name: 'SMTP_PASS', example: '', required: 'optional' },
      { id: 'mail-from', name: 'MAIL_FROM', example: 'noreply@edustack.local', required: 'recommended' },
    ],
  },
  {
    id: 'services',
    vars: [
      { id: 'port', name: 'PORT', example: '3000', required: 'recommended' },
      { id: 'mcp-port', name: 'MCP_PORT', example: '3001', required: 'recommended' },
      { id: 'cors-origin', name: 'CORS_ORIGIN', example: 'http://127.0.0.1:5173', required: 'recommended' },
      { id: 'frontend-url', name: 'FRONTEND_URL', example: 'http://127.0.0.1:5173', required: 'recommended' },
      { id: 'mcp-server-url', name: 'MCP_SERVER_URL', example: 'http://127.0.0.1:3001/sse', required: 'recommended' },
    ],
  },
  {
    id: 'mcp',
    vars: [
      { id: 'mcp-host', name: 'MCP_HOST', example: '127.0.0.1', required: 'recommended' },
      { id: 'mcp-auth-token', name: 'MCP_AUTH_TOKEN', example: 'openssl rand -hex 32', required: 'optional' },
      { id: 'mcp-cors-origin', name: 'MCP_CORS_ORIGIN', example: '', required: 'optional' },
    ],
  },
  {
    id: 'ai',
    vars: [
      { id: 'opencode-base-url', name: 'OPENCODE_BASE_URL', example: 'http://127.0.0.1:3001/v1', required: 'optional' },
      { id: 'opencode-api-key', name: 'OPENCODE_API_KEY', example: '', required: 'optional' },
      { id: 'google-ai-api-key', name: 'GOOGLE_AI_API_KEY', example: '', required: 'optional' },
      { id: 'gemini-api-key', name: 'GEMINI_API_KEY', example: '', required: 'optional' },
      { id: 'openai-api-key', name: 'OPENAI_API_KEY', example: '', required: 'optional' },
      { id: 'anthropic-api-key', name: 'ANTHROPIC_API_KEY', example: '', required: 'optional' },
    ],
  },
  {
    id: 'r2',
    vars: [
      { id: 'r2-endpoint', name: 'R2_ENDPOINT', example: 'https://<account>.r2.cloudflarestorage.com', required: 'optional' },
      { id: 'r2-access-key-id', name: 'R2_ACCESS_KEY_ID', example: '', required: 'optional' },
      { id: 'r2-secret-access-key', name: 'R2_SECRET_ACCESS_KEY', example: '', required: 'optional' },
      { id: 'r2-bucket-name', name: 'R2_BUCKET_NAME', example: 'edustack-backups', required: 'optional' },
      { id: 'backup-dir', name: 'BACKUP_DIR', example: 'data/backups', required: 'optional' },
      { id: 'auto-backup', name: 'AUTO_BACKUP', example: 'false', required: 'optional' },
    ],
  },
  {
    id: 'dev',
    vars: [
      { id: 'node-env', name: 'NODE_ENV', example: 'development', required: 'recommended' },
      { id: 'auto-seed', name: 'AUTO_SEED', example: 'true', required: 'optional' },
      { id: 'seed-file', name: 'SEED_FILE', example: '', required: 'optional' },
      { id: 'seed-admin-email', name: 'SEED_ADMIN_EMAIL', example: 'admin@edustack.cz', required: 'optional' },
      { id: 'seed-admin-first-name', name: 'SEED_ADMIN_FIRST_NAME', example: 'System', required: 'optional' },
      { id: 'seed-admin-last-name', name: 'SEED_ADMIN_LAST_NAME', example: 'Admin', required: 'optional' },
      { id: 'seed-admin-password', name: 'SEED_ADMIN_PASSWORD', example: '"Demo1234!"', required: 'optional' },
    ],
  },
];

export const FRONTEND_URLS = [
  { id: 'app', url: 'http://localhost:5173' },
  { id: 'backend', url: 'http://localhost:3000' },
  { id: 'swagger', url: 'http://localhost:3000/api/docs' },
  { id: 'maildev', url: 'http://localhost:1081' },
  { id: 'mcp', url: 'http://localhost:3001/sse' },
];
