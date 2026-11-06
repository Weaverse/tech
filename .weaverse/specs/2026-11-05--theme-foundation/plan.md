# Foundation Review Remediation Plan

Status: In progress
Owner: @HoangHuy1305HP
Source: https://github.com/Weaverse/tech/pull/10

## Working Approach

- Work on `feat/storefront-foundation` in its separate worktree.
- Preserve the uncommitted design-system work in the original directory.
- Explain each change before implementation, then inspect and verify it.
- Keep changes focused on the foundation review.
- Update work logs with actual changes and verification results.
- Commit and push only when the user authorizes that step.

## 1. Repository Guidance and Spec

- [x] Add Tech architecture and tooling guidance to root `AGENTS.md`.
- [x] Preserve the Next.js-generated guidance block.
- [x] Add internal SDD guidance in `.weaverse/AGENTS.md`.
- [x] Add the spec README, implementation plan, and work logs.
- [x] Move capability boundaries, decisions, and status out of root README.

Verification:
- Read all documents for consistency with issue #1 and the corrected review.
- Confirm planned features are not described as already implemented.
- Keep this plan under 500 lines.
- Inspect the documentation diff for accidental runtime changes.

## 2. TextBlock and Studio Attributes

- [x] Add `WeaverseElementProps` and `elementAttributes()`.
- [x] Forward safe identity and accessibility attributes to the section root.
- [x] Handle `className` separately.
- [x] Keep authored settings and `loaderData` off the DOM.
- [x] Change the heading input label to `Heading`.
- [x] Add the schema default and align the preset with it.
- [x] Remove the conflicting component default.
- [x] Add focused rendered-output regression coverage.

Verification:
- Confirm Studio identity attributes reach the outermost element.
- Confirm settings and loader data do not become HTML attributes.
- Check className and accessibility attributes.
- Verify Studio selection, outline, and heading edits in the browser.

## 3. Client and Server Registries

- [x] Keep `"use client"` and `entry()` in the client render registry.
- [x] Add a schema-only list.
- [x] Add `server-components.ts` with `import "server-only"`.
- [x] Use a `NO_RENDER` default stub in the server registry.
- [x] Attach server loaders only where a section requires them. TextBlock needs none.
- [x] Remove render-module imports from the server client setup.
- [x] Add registry consistency coverage.

Verification:
- Confirm client and server registrations contain matching section types.
- Confirm the server registry does not import the render registry.
- Confirm server loaders do not enter the browser import graph.
- Run typecheck and production build after the registry change.

## 4. Environment and Project Identity

- [x] Add an explicit Weaverse environment helper.
- [x] Cover every environment key read by the installed SDK.
- [x] Supply explicit empty values for absent or suppressed SDK keys.
- [x] Keep private Shopify credentials out of the SDK environment object.
- [x] Add `PUBLIC_STOREFRONT_API_TOKEN` to `.env.example` and setup docs.
- [x] Keep the environment project gate.
- [x] Prefer the payload project id on the client, with a configured fallback.

Verification:
- Test missing and configured project ids.
- Test a payload project id that differs from the configured fallback.
- Test that private credentials never enter SDK/public payloads.
- Verify the SDK key list against the installed package.
- Use synthetic values in tests; never log real credentials.

## 5. Request Context and Page Loading

- [x] Extract pure `buildRequestContext()` into `request-info.ts`.
- [x] Preserve repeated query values, pathname, page type, handle, and locale.
- [x] Avoid a trailing `?` when the query is empty.
- [x] Keep the HTTP protocol fallback from the corrected review.
- [x] Replace the Home-specific loader with `loadWeaversePage()`.
- [x] Mark the server integration module with `import "server-only"`.
- [x] Catch page-loading failures and return `null`.
- [x] Translate `null` into `notFound()` in the route.
- [x] Add an error boundary for otherwise unhandled application errors.
- [x] Remove hardcoded shopper-facing fallback copy from the Home route.

Verification:
- Test request identity, query arrays, URL construction, and locale.
- Test missing configuration, missing page, and rejected page loads.
- Confirm the route chooses the page type rather than hardcoding it twice.
- Check behavior in standalone and Studio previews.
- Ensure error output contains no credentials.

## 6. Cache Policy

- [x] Inspect the installed Next.js and Weaverse cache behavior.
- [x] Select published-data revalidation lifetimes and tags.
- [x] Preserve the SDK's design/revision no-store behavior.
- [x] Document the purpose of `cacheComponents`, or remove it if unnecessary.
- [x] Record the chosen policy and its limitations in the spec.

Verification:
- Confirm published requests receive the intended cache options.
- Confirm design/revision requests remain fresh.
- Verify observed behavior rather than assuming every preview flag is identical.

## 7. Hydrogen and Shopify Read

- [x] Follow the installed/generated Hydrogen guidance for Next.js.
- [x] Add a compatible Hydrogen dependency and update `bun.lock`.
- [x] Centralize Shopify environment validation.
- [x] Create the server-owned `private_no_buyer_context` storefront client.
- [x] Keep raw Shopify access behind the storefront data boundary.
- [x] Add one real read through application code.
- [x] Keep this read independent of Weaverse's SDK environment.

Verification:
- Test environment validation and sanitized error handling.
- Run applicable Hydrogen GraphQL validation.
- Verify a successful application read against the designated demo store.
- Confirm private tokens stay out of browser code and serialized output.
- Record the live verification result without credentials.

## 8. Tooling and Code Conventions

- [x] Add Biome configuration and dependency.
- [x] Replace ESLint scripts and remove unused ESLint dependencies/config.
- [x] Add `format` and `format:check`.
- [x] Add the focused test scripts needed by this foundation.
- [x] Add `src/lib/cn.ts` for conditional class composition.
- [x] Apply the requested let/ALL_CAPS-const convention to request context.
- [x] Align Node types with the chosen runtime.
- [x] Remove unsupported `ignoreScripts`.
- [x] Keep dependencies, lockfile, guidance, and scripts consistent.
- [x] Add format and test checks to CI.
- [x] Remove the feature-branch push trigger that duplicates PR checks.

Verification:
- Run frozen-lockfile installation, lint, format check, tests, typecheck,
  and production build.
- Inspect workflow triggers and check commands.
- Confirm documented commands exist and run successfully.

## 9. Cleanup and Final Verification

- [x] Replace scaffold metadata.
- [x] Resolve unused/overridden scaffold fonts without importing unrelated
      design-system changes.
- [x] Remove unused scaffold SVGs after checking references.
- [x] Remove duplicate ignore patterns and preserve `.env.example`.
- [x] Remove branch-specific setup instructions from root README.
- [x] Retain the existing stable Vercel branch alias for review.
- [x] Keep root README focused on setup and usage.
- [x] Record deferred work and unresolved decisions in the spec.
- [x] Inspect the cleanup diff and rerun checks affected by final changes.

Verification:
- Complete the implemented quality gates.
- Verify the Home page and Studio editing behavior.
- Verify the application Shopify read.
- Confirm no secrets, environment files, or generated build output are staged.
- Confirm the original design-system working directory remains intact.

## 10. PR Update

- [ ] Record final results and limitations in work logs.
- [ ] Commit and push to `feat/storefront-foundation` when authorized.
- [ ] Update the PR description around the final implementation.
- [ ] Check CI results for the pushed revision.
- [ ] Prepare a mapping of review comments to changes and verification.

## Files Touched

Paths below are planned. Confirm names during implementation and update this
list when scope changes.

| Area | Existing files | Planned additions |
| --- | --- | --- |
| Guidance | `AGENTS.md` | `.weaverse/AGENTS.md` |
| Spec | — | `.weaverse/specs/2026-11-05--theme-foundation/{README.md,plan.md,work-logs.md}` |
| Section | `src/sections/text-block/index.tsx`, `schema.ts` | `src/sections/weaverse-element.ts` |
| Registry | `src/lib/weaverse/components.ts`, `server.ts` | `section-schemas.ts`, `server-components.ts` in the same directory |
| Env and requests | `.env.example`, `src/lib/weaverse/request-context.ts` | `env.ts`, `request-info.ts` under `src/lib/weaverse/` |
| Rendering | `src/lib/weaverse/page.tsx`, `src/app/page.tsx`, `layout.tsx` | `src/app/error.tsx`, optional `not-found.tsx` |
| Error copy | — | `src/lib/i18n/static-content.ts` (English defaults; full translation deferred) |
| Request/loader tests | — | `tests/weaverse-request.test.ts`, `tests/weaverse-server.test.ts`, `tests/fixtures/weaverse-server.mjs`, `tests/error-page.test.ts` |
| Shopify | `package.json`, `bun.lock` | Minimal modules under `src/lib/storefront/` and `src/lib/storefront/shopify/` |
| Tooling | `package.json`, `bun.lock`, `.github/workflows/ci.yml`, `next.config.ts` | `biome.json`, `src/lib/cn.ts`, focused tests and test configuration |
| Cleanup | `README.md`, `.gitignore`, `src/app/globals.css`, unused `public/*.svg` | — |

Remove `eslint.config.mjs` when the Biome migration is complete.

## Deferred Work

- Full catalog, search, filtering, cart, and account experiences.
- Multi-market routing and localization UI.
- Root theme settings/provider integration, followed by header/footer work.
- Resource-backed section revalidation when such sections are introduced.
- Vercel Protection Bypass evaluation; no protection setting changes in this plan.

## Pending Decisions

- Resolve design questions through issue #9 before affected UI work.
- Confirm initial commerce/account scope and supported markets.
- Confirm merchant-editable global settings.
