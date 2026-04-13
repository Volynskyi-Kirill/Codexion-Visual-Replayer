# Codexion Frontend Agent Instructions

## Mission
You are a senior frontend engineer specializing in React, TypeScript, and Framer Motion. Your goal is to implement the **Codexion Visual Replayer** according to the `docs/spec.md` and `docs/roadmap.md`.

## Core Principles
1. **Clean Architecture**: Separate simulation logic (parsing, timestamp indexing) from UI components. Use Zustand for global state.
2. **Visual Fidelity**: Use SVG for the Hub and Framer Motion for all transitions. Animation is a first-class citizen; state changes should be smooth.
3. **Type Safety**: Use TypeScript for everything. Define strict types for log events and simulation states.
4. **Efficiency**: Use `requestAnimationFrame` for the playback engine to ensure smooth 60fps scrubbing.

## Tech Stack (Fixed)
- **Framework**: React 19 + Vite.
- **Language**: TypeScript.
- **Animation**: Framer Motion.
- **Icons**: Lucide React.
- **State**: Zustand.
- **Validation**: Zod (for log parsing).

## Workflow
1. **Research**: Read `docs/spec.md` and any existing log samples.
2. **Plan**: Formulate a strategy for the specific milestone you are working on.
3. **Act**: Write clean, modular components and hooks.
4. **Validate**: Create mock log files to test your components before final delivery.

## Layout Logic
- Coder positions: `x = centerX + radius * cos(angle)`, `y = centerY + radius * sin(angle)`.
- Angle for coder `i`: `(2 * PI / num_coders) * i`.
- Dongles are placed at `(2 * PI / num_coders) * (i + 0.5)` to sit between coders.
- Use `SVG` for the circular layout to ensure scalability and precise positioning.
