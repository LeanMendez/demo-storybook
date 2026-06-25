# Storybook story conventions (this repo)

## Canonical examples to mirror

- `src/app/design-system/badge/badge.stories.ts` — variants, sizes, edge cases, `render` template.
- `src/app/design-system/user-card/user-card.stories.ts` — required input, output `control: false`, play function.
- `src/app/design-system/user-list/user-list.stories.ts` — the 4 states (loading/error/empty/ready) + selection play.

## Why these rules

- **Detailed argTypes** (`control`, `description`, `table.category`, `defaultValue`) drive rich
  Controls and a useful autodocs page generated from the props.
- **Meta-level `args`** keep stories DRY; each story overrides only what changes.
- **`tags: ['autodocs']`** is opt-in — without it, no docs page is generated.
- **Exhaustive state coverage** (default, each variant, edge cases) is the whole point of stories:
  document every state a component can be in.
- **Play functions** turn stories into interaction tests (`storybook/test`: `within`, `userEvent`, `expect`, `fn`).
- **Never hallucinate props** — the #1 AI failure mode. Always read the component first; with the
  Storybook MCP addon, use its `get-documentation` / `get-storybook-story-instructions` tools instead of guessing.

## Zoneless / signals notes

- signal `input()` / `input.required()` map to args by name; `output()` maps to a callback arg.
- Storybook runs zoneless via `experimentalZoneless: true` in `angular.json` — never add `zone.js`.

## Sources

- Storybook — How to write stories: https://storybook.js.org/docs/writing-stories
- Controls: https://storybook.js.org/docs/essentials/controls
- Autodocs: https://storybook.js.org/docs/writing-docs/autodocs
- Play function: https://storybook.js.org/docs/writing-stories/play-function
- Using Storybook with AI / MCP: https://storybook.js.org/docs/ai
