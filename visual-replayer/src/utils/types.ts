export type SimulationStatus =
  | 'INITIALIZE'
  | 'REQUEST_DONGLE'
  | 'TAKE_DONGLE'
  | 'START_COMPILE'
  | 'START_DEBUG'
  | 'START_REFACTOR'
  | 'RELEASE_DONGLE'
  | 'BURNOUT'
  | 'SUCCESS';

export interface BaseEvent {
  ts: number;
  status: SimulationStatus;
}

export interface InitializeEvent {
  ts?: number; // Optional ts for INITIALIZE to simplify sorting/indexing if needed
  status: 'INITIALIZE';
  num_coders: number;
  num_dongles: number;
  time_to_burnout: number;
}

export interface RequestDongleEvent extends BaseEvent {
  status: 'REQUEST_DONGLE';
  coder_id: number;
  dongle_id: number;
  queue: number[];
  priorities: number[];
}

export interface TakeDongleEvent extends BaseEvent {
  status: 'TAKE_DONGLE';
  coder_id: number;
  dongle_id: number;
  queue: number[];
  priorities: number[];
}

export interface StateTransitionEvent extends BaseEvent {
  status: 'START_COMPILE' | 'START_DEBUG' | 'START_REFACTOR';
  coder_id: number;
  details: {
    compiles_done: number;
    deadline: number;
  };
}

export interface ReleaseDongleEvent extends BaseEvent {
  status: 'RELEASE_DONGLE';
  coder_id: number;
  dongle_id: number;
}

export interface BurnoutEvent extends BaseEvent {
  status: 'BURNOUT';
  coder_id: number;
}

export interface SuccessEvent extends BaseEvent {
  status: 'SUCCESS';
}

export type TimedEvent =
  | RequestDongleEvent
  | TakeDongleEvent
  | StateTransitionEvent
  | ReleaseDongleEvent
  | BurnoutEvent
  | SuccessEvent;

export type LogEvent = InitializeEvent | TimedEvent;

export interface CoderState {
  id: number;
  status: 'IDLE' | 'WAITING' | 'COMPILING' | 'DEBUGGING' | 'REFACTORING' | 'BURNOUT';
  deadline: number;
  current_dongle_id: number | null;
  compiles_done: number;
}

export interface DongleState {
  id: number;
  current_owner_id: number | null;
  queue: number[];
  priorities: number[];
  cooldown_until: number;
}

export interface SimulationSnapshot {
  ts: number;
  coders: Map<number, CoderState>;
  dongles: Map<number, DongleState>;
  isBurnedOut: boolean;
  isSuccess: boolean;
}
