import { LogEventSchema } from './schemas';
import { SimulationStatus } from './types';
import type { LogEvent, InitializeEvent, TimedEvent } from './types';
import { ERROR_MESSAGES } from '../constants';

export interface ParsedLog {
  metadata: InitializeEvent;
  events: TimedEvent[];
  maxTime: number;
}

export function parseLogs(content: string): ParsedLog {
  const lines = content.split('\n').filter((line) => line.trim() !== '');
  const events: TimedEvent[] = [];
  let metadata: InitializeEvent | null = null;
  let maxTime = 0;

  for (const line of lines) {
    try {
      const rawObj = JSON.parse(line);
      const parsed = LogEventSchema.parse(rawObj) as LogEvent;

      if (parsed.status === SimulationStatus.INITIALIZE) {
        metadata = parsed;
      } else {
        events.push(parsed as TimedEvent);
        if (parsed.ts > maxTime) {
          maxTime = parsed.ts;
        }
      }
    } catch (e) {
      console.warn('Skipping invalid log line:', line, e);
    }
  }

  if (!metadata) {
    throw new Error(ERROR_MESSAGES.MISSING_INITIALIZE);
  }

  events.sort((a, b) => a.ts - b.ts);

  return {
    metadata,
    events,
    maxTime,
  };
}
