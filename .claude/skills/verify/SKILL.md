---
name: verify
description: Verify a change compiles and passes tests in this Angular project. Runs a production build and the headless test suite, then reports pass/fail with the relevant output. Use after implementing or modifying code, before handing work back.
---

# Verify

Confirm the current working tree builds and passes tests. Zoneless change detection and strict templates make subtle breakage common — never claim a change works without running this.

## Steps

1. Lint: `ng lint` — `@angular-eslint` rules for templates and TS.
2. Build: `ng build`
   - Surfaces strict-template and type errors that won't show up at runtime.
3. Test (headless, no watch): `ng test --watch=false --browsers=ChromeHeadless`
   - If ChromeHeadless is unavailable, fall back to `ng test --watch=false` and note the browser used.

## Reporting

- If both pass: state it plainly with the test count.
- If either fails: show the failing output (build error or failing spec), do NOT paper over it, and propose the fix. Re-run after fixing.
