# Dependency State

Last reviewed: 2026-11-16

State file for the `upgrade-deps` skill (rules: `~/.agents/custom-skills/upgrade-deps/SKILL.md`).
Full per-pass detail lives in `git log -p DEPENDENCIES.md pnpm-lock.yaml`.

## House rules

- **Package manager:** pnpm 11.24.0, pinned in `package.json` `packageManager` and `mise.toml`. Run tools through mise.
- **Runtime:** Node 26.8.1 (`mise.toml`).
- **Green gate:** `pnpm test` (build, `biome check`, unit tests, knip, type-check, and the three `test-apps`). The pre-push hook runs it.
- **Dependabot** keeps opening minor and patch PRs; merged ones move master often, so pull before pushing.

## Major Upgrades Blocked

Every row below was deferred by Edu on 2026-11-16 ("not now, next deps pass"), not blocked upstream. Not tried yet.

| Package | Current | Latest | Blocker | Since | Re-checked | Last tried |
| ------- | ------- | ------ | ------- | ----- | ---------- | ---------- |
| `vitest`, `@vitest/coverage-v8` | 4.1.11 | 5.1.0 | Deferred to the next pass, move both together | 2026-11-16 | 2026-11-16 | - |
| `pnpm` (`packageManager`, `mise.toml`) | 11.24.0 | 12.21.0 | Deferred to the next pass | 2026-11-16 | 2026-11-16 | - |

## Upgrade history

- **2026-11-16** `biome.json` migrated to the 2.6 schema (`preset` replaces `recommended`).
