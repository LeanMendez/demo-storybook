---
name: stories
description: "Trigger: /stories, missing stories, scan stories, generate all stories. Scan the design system for components without a .stories.ts file and generate one for each using the storybook-stories skill."
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
user_invocable: true
---

# stories

Scan the design system for components missing a `.stories.ts` file and generate
one for each, delegating per-component generation to the `storybook-stories` skill.

## Activation Contract

Invoked as `/stories` (no arguments). Scans `src/app/design-system/` automatically.

## Execution Steps

1. **Scan** — Glob `src/app/design-system/**/*.ts` excluding `*.spec.ts`,
   `*.stories.ts`, and barrel/index files. Each match is a component file.
2. **Detect** — For each component file, check if a sibling `.stories.ts` exists
   (same name, same directory). Collect the ones that are missing.
3. **Report** — List what was found:
   - Components WITH stories (skip these).
   - Components WITHOUT stories (will generate).
   If everything is covered, say so and stop.
4. **Generate** — For each missing story, invoke the `storybook-stories` skill
   passing the component path as argument. Follow its full execution steps
   (read component, build meta + stories, lint, build-storybook).
5. **Verify** — After all stories are written, run `npm run lint` and
   `npm run build-storybook` once to confirm nothing broke.

## Hard Rules

- NEVER generate a story for a component that already has one.
- NEVER skip the scan — always detect automatically, do not ask the user which
  components to cover.
- Delegate ALL story generation logic to the `storybook-stories` skill. This
  skill only orchestrates.
- If a generation fails (lint or build error), fix it before moving to the next
  component.

## Output Contract

Report:
- Components scanned (total count).
- Stories already present (list).
- Stories generated (list with file paths).
- Final lint + build-storybook result (pass/fail).
