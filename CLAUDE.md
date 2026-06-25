# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Stack

Angular 20 single application (not a workspace). Standalone components — there are no NgModules; bootstrapping is `bootstrapApplication` in `src/main.ts`, providers live in `src/app/app.config.ts`. Component selector prefix is `app`. Package manager is npm.

## Commands

- `npm start` / `ng serve` — dev server
- `npm run build` / `ng build` — production build
- `npm run watch` — incremental dev build
- `npm test` / `ng test` — full test suite (Karma + Jasmine)
- `ng lint` — ESLint (`@angular-eslint`, config in `eslint.config.js`)
- Single test: no script alias exists. Run `ng test --watch=false --browsers=ChromeHeadless` and narrow with a focused `fdescribe`/`fit` in the spec, or `--include='src/app/app.spec.ts'`.

## Gotchas

- **Zoneless change detection** is enabled (`provideZonelessChangeDetection` in `app.config.ts`). There is no NgZone. Do not rely on Zone.js auto-detection — use signals, `async` pipe, or explicit `ChangeDetectorRef`. Tests that assume Zone-based async (`fakeAsync`/`tick` for microtasks) may behave differently; prefer signal-driven assertions.
- **Strict TypeScript** is on (`strictTemplates`, `noImplicitOverride`, `noImplicitReturns`). Template type errors fail the build.
- **Storybook is intended but not yet installed** despite the project name. There is no `.storybook/` config or Storybook dependency yet — don't reference Storybook in code until it's scaffolded.

## Code style

- 2-space indentation, single quotes (enforced by `.editorconfig`).
- Prettier is configured inside `package.json` (`printWidth: 100`, `singleQuote: true`). There's no format script, but a Claude Code hook auto-formats `.ts`/`.html`/`.scss` on edit. Manual: `npx prettier --write <files>`.
- ESLint via `@angular-eslint` (`eslint.config.js`). Run `ng lint`.

## Git

- Conventional commits (`feat:`, `fix:`, `chore:`, …).
- Do not add AI attribution or `Co-Authored-By` lines to commits.
- When something new needs ignoring, add it to `.gitignore` under the matching `# Section` comment (create a new commented section if none fits) — keep entries grouped, never appended loosely.
