# Repository Guidelines

## Project Structure & Module Organization
Core Nuxt 4 code sits in `app/`: pages in `app/pages`, helpers in `app/utils`, and global styling in `app/assets` (entry `app/assets/css/main.css`). Static assets that bypass the build go in `public/`. Markdown content for the blog and homepage lives in `content/`, with behavior tuned via `content.config.ts`. Static exports from `pnpm generate` land in `dist/`; treat it as build output. Adjust modules or runtime options in `nuxt.config.ts` when enabling @nuxt/ui, @pinia/nuxt, fonts, or new integrations.

## Build, Test, and Development Commands
- `pnpm install --frozen-lockfile` — install dependencies with the pinned pnpm 10 toolchain (Node 24).
- `pnpm dev` — hot-reload dev server at http://localhost:3000.
- `pnpm build` — compile for production into `.output/`.
- `pnpm generate` — emit a static site in `dist/`.
- `pnpm preview` — serve the latest build for smoke checks.
- `pnpm lint` — run Oxlint and ESLint with autofix; review generated edits.

## Coding Style & Naming Conventions
Write Vue SFCs with `<script setup lang="ts">` and keep logic typed. Components use PascalCase filenames (place them in `app/components/` if you introduce the directory); composables belong in a top-level `composables/` folder with camelCase names so Nuxt can auto-import them. Favor Tailwind utility classes and keep any custom CSS scoped or centralized in `app/assets/css/main.css`. Localize copy in the same bilingual tone already present and rely on content queries instead of hard-coded URLs.

## Testing Guidelines
Automated tests are not wired yet, so validate features by running `pnpm generate` followed by `pnpm preview` to catch build-time regressions. When introducing critical logic, add Vitest-based component or composable specs under `tests/` using the `*.spec.ts` convention and seed lightweight Markdown fixtures in `content/` for rendering checks. Capture manual verification steps inside the pull request body.

## Commit & Pull Request Guidelines
Use Conventional Commits (`type: summary`), mirroring the existing `chore: update` history. Keep commits focused and lint-clean. Pull requests should include a concise summary, the commands executed (`pnpm lint`, `pnpm dev`, etc.), and screenshots or URLs for visual changes. Link relevant issues and request review only after local checks pass.

## Content & Localization
Markdown entries must include `title`, `description`, `date`, `tags`, and optional `cover` fields so listings stay consistent. Provide Simplified Chinese and English context where cards surface both languages. Store large media in `public/` or reference CDN paths, and prefer lightweight formats for hero imagery.
