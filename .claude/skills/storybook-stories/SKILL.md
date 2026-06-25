---
name: storybook-stories
description: "Trigger: storybook stories, write/generate stories, CSF3, argTypes, controls. Generate high-quality Storybook CSF3 stories for this project's Angular 20 components."
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

# storybook-stories

Generate Storybook 10 CSF3 stories for an Angular 20 (zoneless, signal-based) component.

## Activation Contract

Use when asked to create or update stories for a component, or when invoked as
`/storybook-stories <path-to-component.ts>`. The component path is `$ARGUMENTS`
(default: the component in context). Output file: `<component>.stories.ts` beside it.

## Hard Rules

- NEVER hallucinate props. Read the component file FIRST; derive `args`/`argTypes`
  only from its real `input()` / `input.required()` / `output()` and their types.
- CSF3 only: `Meta<T>` + `StoryObj<T>` from `@storybook/angular`. Named exports are objects.
- One `*.stories.ts` per component. `title: 'Design System/<Name>'`. Add `tags: ['autodocs']`.
- Put shared defaults in meta `args`; each story overrides the minimum.
- Outputs: `control: false` + `action: '<name>'` (the JSON control is noise). Use `fn()` for play asserts.
- Play functions import from `storybook/test` (NOT `@storybook/test`).
- After writing, run `npm run lint` and `npm run build-storybook`; fix what breaks.

## Decision Gates — input type → control

| Input type | argType control |
|------------|-----------------|
| string | `text` |
| boolean | `boolean` |
| union of literals | `radio` (2-3 options) or `select` (4+) with `options` |
| number | `number` |
| object / interface (e.g. User) | no control; pass via `args`, set `control: false` |
| `output()` | `control: false`, `action: '<name>'` |

## Execution Steps

1. Read `$ARGUMENTS`. List every input (name, type, default) and output.
2. Build `meta`: component, `tags: ['autodocs']`, `args` (defaults), `argTypes`
   with `control`, `description`, and `table: { category, defaultValue }`.
3. Write stories: `Default`, one per variant/state, edge cases (long text, empty,
   missing data), and at least one `play` interaction asserting behavior.
4. Re-check every prop against the component — drop anything not declared on it.
5. Run lint + build-storybook. Report results.

See `assets/story-template.stories.ts` for the canonical shape and
`references/conventions.md` for rationale and repo examples.

## Output Contract

Report: the story file written, inputs/outputs covered, story count, and the
lint/build-storybook result.

## References

- `assets/story-template.stories.ts` — annotated CSF3 template.
- `references/conventions.md` — best practices + canonical repo stories.
