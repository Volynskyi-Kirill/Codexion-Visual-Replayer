/**
 * Application-wide constants
 */

export const APP_TITLE = 'Codexion Visual Replayer';
export const UPLOAD_PROMPT = 'Upload a log file to get started.';

export const ERROR_MESSAGES = {
  PARSING_FAILED: 'Failed to parse logs',
  MISSING_INITIALIZE: 'Missing INITIALIZE event in log file',
} as const;

export const SIMULATION_DEFAULTS = {
  MOCK_COOLDOWN_MS: 500,
} as const;
