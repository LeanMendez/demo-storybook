# demo-storybook

Aplicación de demostración para el workshop **Storybook + IA — Design Systems que no se rompen**.

Es un mini design system en **Angular 20** (zoneless + signals, standalone) pensado para mostrar, en vivo, cómo Storybook documenta y testea componentes y cómo la IA acelera la creación de stories.

## Design system

Tres componentes que se componen entre sí, en `src/app/design-system/`:

| Componente | Qué muestra |
|------------|-------------|
| **Badge** | Átomo con variantes, tamaños y dot. Ideal para Controls + autodocs. |
| **UserCard** | Compone `Badge`. Selección con click y teclado (accesible). Play function. |
| **UserList** | Compone `UserCard`. Estados **loading / error / empty / ready**. |

Cada componente tiene su `.ts`, `.html`, `.scss`, `.spec.ts` y `.stories.ts` al lado.

## Comandos

| Acción | Comando |
|--------|---------|
| Dev server | `npm start` |
| Build | `npm run build` |
| Tests (headless) | `ng test --watch=false --browsers=ChromeHeadless` |
| Lint | `ng lint` |
| Storybook (dev) | `npm run storybook` |
| Build Storybook | `npm run build-storybook` |

## Stack

- **Angular 20** — standalone, **zoneless** (`provideZonelessChangeDetection`), signals, OnPush.
- **Storybook 10** (`@storybook/angular`) con addons **a11y** y **docs** (Compodoc).
- **Karma + Jasmine** para unit tests · **ESLint** (`@angular-eslint`) · **Prettier**.

> ⚠️ **Zoneless + Storybook:** los targets `storybook` / `build-storybook` en `angular.json` necesitan `"experimentalZoneless": true`. Sin eso, el build falla con *"Can't resolve 'zone.js'"*.

## Generar stories con IA

El repo incluye una skill de Claude Code, `/storybook-stories <ruta-al-componente>`, que genera stories CSF3 siguiendo las buenas prácticas del proyecto (argTypes detallados, cobertura de estados, play functions, sin alucinar props). Ver `.claude/skills/storybook-stories/`.
