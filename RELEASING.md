# Releasing

This repository uses [`commit-and-tag-version`](https://github.com/absolute-version/commit-and-tag-version) for release commits, changelog generation, and git tags. Package publishing happens from GitHub Actions via npm trusted publishing.

## Prerequisites

- Start from a clean working tree.
- Release from the intended base branch tip after CI is green.
- Use Conventional Commits for merged changes so the generated changelog is useful.

## Standard Release Flow

```sh
pnpm install --frozen-lockfile
pnpm test

# optional: regenerate docs locally and inspect them
pnpm doc:html

# creates:
# - package.json version bump
# - CHANGELOG.md update
# - chore(release): x.y.z commit
# - vx.y.z git tag
pnpm run version

# review the generated release commit and changelog
git show --stat

# publish commit + tag
git push --follow-tags origin <release-branch>
```

Pushing the release tag triggers [`.github/workflows/publish.yml`](./.github/workflows/publish.yml), which:

- installs dependencies with `pnpm install --frozen-lockfile`
- runs `pnpm test`
- runs `npm pack --dry-run`
- publishes the package to npm using trusted publishing (OIDC)
- creates a GitHub Release whose body is the matching `CHANGELOG.md` section (falls back to GitHub's auto-generated notes if the section is empty)

## Adding a Manual Summary to the Generated CHANGELOG

`commit-and-tag-version` writes the new entry as a flat list of commit subjects grouped by type. For a notable release it is often worth prefacing the auto-generated bullets with a short prose summary so the GitHub Release page reads well.

The auto-generated commit and tag both happen inside `pnpm run version`, so the supported edit flow is amend-then-retag (the `run` is mandatory; `pnpm version` without `run` hits pnpm's built-in command and ignores the package script):

```sh
# 1. generate the release commit + tag as usual
pnpm run version

# 2. edit CHANGELOG.md - add a summary block at the top of the new entry,
#    just under the `## [X.Y.Z]` heading, before the auto-generated bullets

# 3. fold the edit into the release commit
git add CHANGELOG.md
git commit --amend --no-edit

# 4. move the tag onto the amended commit
git tag -d vX.Y.Z
git tag -a vX.Y.Z -m "vX.Y.Z"

# 5. push commit + retagged tag
git push --follow-tags origin <release-branch>
```

Alternative: pass `--skip.tag` to the version script so the tag is not created until you are happy with the changelog, then tag manually.

```sh
pnpm run version --skip.tag
# edit CHANGELOG.md, amend the chore(release) commit if needed
git tag -a vX.Y.Z -m "vX.Y.Z"
git push --follow-tags origin <release-branch>
```

The `awk` block in `publish.yml` extracts the section between the `## [X.Y.Z]` heading and the next `## [` heading, so any prose, sub-headings, or bullets you add between those markers are included in the GitHub Release body verbatim.

## One-Step Local Prep

```sh
pnpm prepare-release
git push --follow-tags origin <release-branch>
```

`pnpm prepare-release` runs `pnpm reset`, `pnpm test`, `pnpm doc:html`, `pnpm run version`, `pnpm doc:publish`. Note that `pnpm reset` is destructive.

## Docs

`pnpm doc:html` runs typedoc through `pnpm dlx` with a pinned TypeScript 6.0.3, because no typedoc release supports the TypeScript 7 compiler this repo builds with (its peer range stops at `6.0.x`). Once typedoc ships TS 7 support, move `typedoc` back into `devDependencies` and drop the `dlx` wrapper.

## First Release / Special Cases

Examples (note: `pnpm run version` is mandatory; `pnpm version` is intercepted by pnpm's built-in command):

```sh
# prerelease
pnpm run version -- --prerelease alpha

# signed tag / commit
pnpm run version -- --sign
```

## Notes

- Always invoke as `pnpm run version`. Running `pnpm version` (no `run`) hits pnpm's built-in `version` command, which prints engine versions and ignores the package script entirely.
- `commit-and-tag-version` rewrites the CHANGELOG.md preamble from a built-in template on every run, so edits to those lines do not survive across releases.
- Review `CHANGELOG.md` before pushing tags.
- The publish workflow does not regenerate the typedoc site. Run `pnpm doc:html && pnpm doc:publish` locally before tagging if you want it refreshed.
- npm trusted publishing automatically generates provenance for public packages published from this public GitHub repository, so the workflow uses plain `npm publish --access public` (the `--access` flag is required for a scoped package).
- `pnpm check:cycles` is intentionally not part of `pnpm test`: the KeySet class hierarchy has known circular imports between `-base.ts` and its subclasses. Run it manually when refactoring module boundaries.
- Do not publish from a local machine unless you are intentionally bypassing the normal release path.
