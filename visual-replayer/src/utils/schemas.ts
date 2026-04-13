import { z } from 'zod';

const BaseEventSchema = z.object({
  ts: z.number(),
  status: z.string(),
});

const InitializeEventSchema = z.object({
  status: z.literal('INITIALIZE'),
  num_coders: z.number(),
  num_dongles: z.number(),
  time_to_burnout: z.number(),
});

const RequestDongleEventSchema = BaseEventSchema.extend({
  status: z.literal('REQUEST_DONGLE'),
  coder_id: z.number(),
  dongle_id: z.number(),
  queue: z.array(z.number()),
  priorities: z.array(z.number()),
});

const TakeDongleEventSchema = BaseEventSchema.extend({
  status: z.literal('TAKE_DONGLE'),
  coder_id: z.number(),
  dongle_id: z.number(),
  queue: z.array(z.number()),
  priorities: z.array(z.number()),
});

const StateTransitionEventSchema = BaseEventSchema.extend({
  status: z.union([
    z.literal('START_COMPILE'),
    z.literal('START_DEBUG'),
    z.literal('START_REFACTOR'),
  ]),
  coder_id: z.number(),
  details: z.object({
    compiles_done: z.number(),
    deadline: z.number(),
  }),
});

const ReleaseDongleEventSchema = BaseEventSchema.extend({
  status: z.literal('RELEASE_DONGLE'),
  coder_id: z.number(),
  dongle_id: z.number(),
});

const BurnoutEventSchema = BaseEventSchema.extend({
  status: z.literal('BURNOUT'),
  coder_id: z.number(),
});

const SuccessEventSchema = BaseEventSchema.extend({
  status: z.literal('SUCCESS'),
});

export const LogEventSchema = z.union([
  InitializeEventSchema,
  RequestDongleEventSchema,
  TakeDongleEventSchema,
  StateTransitionEventSchema,
  ReleaseDongleEventSchema,
  BurnoutEventSchema,
  SuccessEventSchema,
]);

export type ParsedLogEvent = z.infer<typeof LogEventSchema>;
