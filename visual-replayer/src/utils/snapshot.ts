import type { 
  TimedEvent, 
  InitializeEvent, 
  SimulationSnapshot, 
  CoderState, 
  DongleState 
} from './types';

export function generateSnapshot(
  metadata: InitializeEvent,
  events: TimedEvent[],
  targetTs: number
): SimulationSnapshot {
  const coders = new Map<number, CoderState>();
  const dongles = new Map<number, DongleState>();
  let isBurnedOut = false;
  let isSuccess = false;

  // Initialize coders
  for (let i = 0; i < metadata.num_coders; i++) {
    coders.set(i, {
      id: i,
      status: 'IDLE',
      deadline: 0,
      current_dongle_id: null,
      compiles_done: 0,
    });
  }

  // Initialize dongles
  for (let i = 0; i < metadata.num_dongles; i++) {
    dongles.set(i, {
      id: i,
      current_owner_id: null,
      queue: [],
      priorities: [],
      cooldown_until: 0,
    });
  }

  // Process events up to targetTs
  for (const event of events) {
    if (event.ts > targetTs) break;

    switch (event.status) {
      case 'REQUEST_DONGLE': {
        const coder = coders.get(event.coder_id);
        const dongle = dongles.get(event.dongle_id);
        if (coder) coder.status = 'WAITING';
        if (dongle) {
          dongle.queue = event.queue;
          dongle.priorities = event.priorities;
        }
        break;
      }
      case 'TAKE_DONGLE': {
        const coder = coders.get(event.coder_id);
        const dongle = dongles.get(event.dongle_id);
        if (coder) coder.current_dongle_id = event.dongle_id;
        if (dongle) {
          dongle.current_owner_id = event.coder_id;
          dongle.queue = event.queue;
          dongle.priorities = event.priorities;
        }
        break;
      }
      case 'START_COMPILE':
      case 'START_DEBUG':
      case 'START_REFACTOR': {
        const coder = coders.get(event.coder_id);
        if (coder) {
          coder.status = event.status === 'START_COMPILE' ? 'COMPILING' :
                        event.status === 'START_DEBUG' ? 'DEBUGGING' : 'REFACTORING';
          coder.deadline = event.details.deadline;
          coder.compiles_done = event.details.compiles_done;
        }
        break;
      }
      case 'RELEASE_DONGLE': {
        const coder = coders.get(event.coder_id);
        const dongle = dongles.get(event.dongle_id);
        if (coder) {
          coder.status = 'IDLE';
          coder.current_dongle_id = null;
        }
        if (dongle) {
          dongle.current_owner_id = null;
          // In actual sim, release triggers cooldown, but we don't have cooldown duration in this event.
          // We assume cooldown starts at event.ts. For visualization, cooldown is often fixed.
          // If the sim log provides cooldown info, we'd use it here.
          dongle.cooldown_until = event.ts + 500; // Mock cooldown for now if not in log
        }
        break;
      }
      case 'BURNOUT': {
        const coder = coders.get(event.coder_id);
        if (coder) coder.status = 'BURNOUT';
        isBurnedOut = true;
        break;
      }
      case 'SUCCESS': {
        isSuccess = true;
        break;
      }
    }
  }

  return {
    ts: targetTs,
    coders,
    dongles,
    isBurnedOut,
    isSuccess,
  };
}
