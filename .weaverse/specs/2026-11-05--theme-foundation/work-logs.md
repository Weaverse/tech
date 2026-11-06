# Work Logs

## 2026-11-05 — Foundation review preparation

### Work performed

- Inspected PR #10 and its corrected review.
- Compared the foundation code with the local Forward reference.
- Confirmed the remote foundation branch points to commit `a6bb0f0`.
- Created a separate worktree for `feat/storefront-foundation`.
- Preserved the uncommitted design-system work in the original directory.
- Added root repository guidance while preserving the Next.js-generated block.
- Added internal SDD guidance in `.weaverse/AGENTS.md`.
- Added the foundation spec README and implementation plan.

The developer created the guidance and spec documents with assistant-provided
content. The assistant read back and checked the saved files.

### Verification performed

- Inspected Git branches, worktrees, status, and the foundation diff.
- Read issue #1 and compared its request with the spec's Original Prompt.
- Checked the saved guidance, spec README, and implementation plan.
- Confirmed the plan is under 500 lines.
- Ran `git diff --check` for tracked changes; no whitespace errors were reported.

### Remaining work

- Move plan/status content out of the repository README.
- Finish the documentation review and update the plan checkboxes.
- Implement the runtime and tooling changes listed in `plan.md`.

### Limitations

- No runtime code has been changed during this documentation step.
- Lint, typecheck, tests, build, and live integrations were not rerun.
- Previously reported Shopify and Studio checks remain historical evidence.
- No commit, push, deployment, or GitHub update was performed.

### Historical preview configuration

The original PR reported that Vercel Authentication was disabled to allow
Studio embedding. This configuration has not been rechecked during this step.
Protection Bypass evaluation is deferred; no Vercel settings were changed.

## 2026-11-05 — Documentation step completed

- Reviewed the developer's saved guidance, spec, plan, and work logs.
- Confirmed the repository README now focuses on setup and preview usage;
  capability boundaries, decisions, and implementation status live in the spec.
- Moved the historical preview protection note from README to this log.
- Removed excess blank lines and marked the five documentation tasks complete.
- The earlier documentation tasks listed under Remaining work are now complete.
  Runtime and tooling remediation remains pending.
- No runtime code, dependencies, credentials, or deployment settings were changed.

## 2026-11-05 — TextBlock checks and lint convention

- Reviewed the developer's TextBlock, schema, shared attribute helper, and tests.
- `bun test tests/text-block.test.ts`: 3 passed, 0 failed.
- `bun run typecheck`: passed after the test was added.
- Stopped the initial full-repository lint run before completion; it is not
  recorded as passing.
- Focused lint initially reported seven `prefer-const` errors, conflicting
  with the review's let-for-variables convention.
- Disabled `prefer-const` after the Next.js presets in `eslint.config.mjs`.
  This permits the convention; it does not enforce ALL_CAPS constant naming.
- Reran ESLint on the attribute helper, TextBlock, schema, test, and ESLint
  config: passed.
- Studio selection/outline/editing and a production build remain pending.
- No commit, push, or deployment was performed.

## 2026-11-05 — TextBlock verification completed

- The developer confirmed direct preview selection, hover outlines, and heading
  edits in Studio against `http://localhost:3001`. Hover outlines appeared after
  enabling element selection mode. This is developer-reported browser evidence;
  the assistant could not complete native browser automation in this session.
- `bun run build`: passed with `.env.local` loaded; Home is partially prerendered
  with dynamic server-streamed content. Environment values were not printed.
- `bun run lint`: passed across the repository.
- The three TextBlock tests and typecheck passed earlier in this step; runtime
  code has not changed since those checks.
- Marked step 2 complete. Registry, env, request loading, cache, Shopify, and
  tooling migration remain pending; this does not complete PR #10.
- Prepared the documentation and TextBlock changes for an authorized local
  commit. No push or deployment is included.

## 2026-11-05 — Server registry split completed

- The developer added the schema-only list and server-only registry, then wired
  `server.ts` to that registry instead of importing the TextBlock render module.
- Kept the client registry's `"use client"` directive and `entry()` unchanged.
- The server registry derives entries from `SECTION_SCHEMAS` with `NO_RENDER`.
  TextBlock needs no loader; future data-backed sections attach theirs here.
- Added three tests comparing client types/schema objects with the schema list
  and rejecting duplicate types. These tests do not directly import the
  server-only module or execute future loaders.
- Inspected the server import chain: server client -> server registry -> schema
  list -> TextBlock schema. It does not reach the client render registry.
- `bun test tests`: 6 passed, 0 failed.
- `bun run lint`: passed across the repository.
- `bun run build`: passed with `.env.local`, including TypeScript validation.
- The developer confirmed TextBlock display, direct selection, hover outline,
  and heading editing still work in Studio after the registry change.
- Marked step 3 complete. Environment/project identity remediation is next.
- This step is prepared for a local commit; no push or deployment is included.

## 2026-11-05 — SDK environment helper tests

- Added four tests using synthetic configuration only: explicit empty keys,
  trimming and API-base suppression, private/unrelated key exclusion, and
  frozen output. No real environment credentials were read by these tests.
- `bun test tests/weaverse-env.test.ts`: 4 passed, 0 failed.
- `bun run typecheck`: passed.
- Focused ESLint on `env.ts` and `weaverse-env.test.ts`: passed.
- Step 4 remains in progress: installed SDK key coverage, project-id precedence,
  full integration checks, and Studio verification are still pending.

## 2026-11-05 — Installed SDK environment key coverage

- Inspected the installed `@weaverse/next` 1.0.1 server bundle's `readEnv` calls.
- Added a regression test comparing `SDK_ENV_KEYS` with literal `readEnv(env,
  key)` calls in both the ESM and CommonJS server bundles. The comparison rejects
  missing and stale keys, and fails if no calls are found after a bundle refactor.
- All five configured keys match the installed SDK. This source inspection is
  tied to the package's current bundle structure; a changed or dynamic env-read
  implementation needs review when upgrading the SDK.
- Env suite: 5 passed, 0 failed. Typecheck and focused test-file lint passed.
- Project-id precedence and final integration checks remain pending.

## 2026-11-05 — Client project identity verification

- Added three tests exercising `WeaversePage` with synthetic payloads and
  inspecting the real client passed to `WeaverseNextProvider`. Configs metadata
  wins over project metadata, which wins over the configured fallback.
- The tests do not mount Studio or call a remote API. No runtime helper was
  added solely to expose the selection expression to tests.
- Confirmed `.env.example` documents the public token with an empty value and
  README distinguishes public Studio configuration from private server reads.
- `bun test tests`: 14 passed, 0 failed across four files.
- `bun run typecheck`, full-repository lint, and production build passed.
- Studio re-verification and public-token configuration confirmation are pending
  the developer's response. Step 4 is not yet recorded as complete or committed.

## 2026-11-05 — Environment and project identity step completed

- The developer confirmed all Studio interactions work after step 4, then added
  the public Storefront token locally and confirmed section edits update the
  local preview at port 3001. This is developer-reported integration evidence.
- Rebuilt after the local configuration update: production build and its
  TypeScript validation passed. Credentials were not printed or staged.
- The preceding 14 tests, full lint, and standalone typecheck passed; runtime
  code has not changed since those checks.
- Confirmed `.env.example` contains empty values only. The local `.env.local`
  file is excluded from the commit.
- Marked step 4 complete. Request context and page-loading remediation is next.
- Public token API validity/resource-picker behavior was not independently
  queried; successful heading editing alone does not establish token validity.
- Prepared only review-related env/project identity code, tests, setup docs,
  and spec updates for the authorized local commit. No push is included.

## 2026-11-05 — Request context, loading, and error handling completed

- Added pure query/context helpers preserving repeated query values, route type,
  handle, headers, proxy origin, and locale. Empty queries add no trailing `?`;
  the corrected review's HTTP fallback remains. No-host inputs retain a relative
  path. Locale currently accepts an i18n object and defaults to US/English.
- Replaced the Home-only loader with generic `loadWeaversePage()`. Server-side
  configuration remains protected by `server-only`; loading failures and absent
  data return `null`, and Home calls `notFound()` for unavailable composition.
- Removed obsolete Home request-building code and shopper-facing fallback copy.
- Added `error.tsx` with generic copy in `lib/i18n/static-content.ts` and the
  installed Next 16.4.4 `retry` callback. It does not display/log raw exceptions.
  This centralizes English defaults; it does not implement full translation.
- Added query/context and client round-trip tests; loader tests run in isolated
  child processes with synthetic configuration and mocked SDK/Next boundaries.
  Covered successful data, absent configuration/page, undefined response,
  header/client/fetch failures, and Home rendering versus `notFound()`.
- Added a fallback component test confirming shared copy and retry delegation.
  This is not a live browser test of error-boundary recovery.
- One expanded test run initially failed because the navigation mock omitted SDK
  imports. Preserved real navigation exports while overriding only `notFound`;
  the corrected full suite passed: 31 tests, 0 failures across seven test files.
- Typecheck, full lint, and production build with local env passed. The final
  navigation-mock fix changed only test code; full tests and lint were rerun.
- The developer confirmed standalone/Studio display, selection, hover outline,
  and heading editing still work after the loader migration.
- Step 5 is complete. Cache policy is next. No deployment or push is included.

## 2026-11-06 — Weaverse page cache

- The developer added the 60-second revalidation interval and the
  `weaverse:page` tag to page loads, updated the loader test fixture, and
  documented why Cache Components is enabled.
- Ran the installed SDK with a synthetic response and an injected fetch. A
  published load passed the expected revalidation interval and tag to fetch.
  Design and revision loads passed `no-store`. Section preview made no fetch.
- All 31 tests, lint, and the production build with TypeScript passed. The
  build continued to report Home as partially prerendered.
- The developer confirmed that editing a heading still updates the local
  Studio preview after the cache change.
- The SDK probe verified fetch options. Cache-hit timing on a deployed
  storefront remains unmeasured.

## 2026-11-06 — Hydrogen and Shopify catalog read

- Added Hydrogen 2026.10.2 and a server-only Shopify env reader, Storefront
  client, and catalog sample query. Shopify private credentials are read
  separately from the Weaverse SDK env.
- The developer verified a real product response through the local Next.js
  route `/api/shopify-check`. The route is retained for repeatable local
  verification and returns 404 in production.
- A synthetic probe verified missing or malformed env rejection, the
  production guard before any catalog read, and a sanitized 502 response.
- The Hydrogen CLI produced a Windows absolute schema path that gql.tada
  treated as a URL. The final GraphQL check uses gql.tada directly with
  relative paths to Hydrogen's bundled schemas.
- Typecheck including GraphQL validation, all 31 tests, lint, and production
  build passed. CI already calls typecheck.

## 2026-11-06 — Tooling and code conventions

- Replaced ESLint with Biome, formatted the repository, and added format and
  test scripts to CI. Removed the duplicate feature-branch push trigger.
- Added `cn()` for class composition and applied the local variable convention
  in request context. Scaffold font and metadata cleanup remains in step 9.
- Aligned Node types with CI, removed `ignoreScripts`, and updated the tooling
  guidance in `AGENTS.md`.
- Frozen install, format check, lint, all 31 tests, typecheck including GraphQL,
  and the production build passed locally. The updated workflow has yet to run
  on GitHub.

## 2026-11-06 — Preview documentation

- Synchronized the root README with the Biome and CI commands.
- Retained the existing Vercel Git branch alias for PR review. Its URL follows
  the latest deployment for the foundation branch rather than a single commit.
  Live access could not be verified in this session and remains a PR check.

## 2026-11-06 — Foundation cleanup and local verification

- Replaced scaffold metadata, removed Geist and unused SVGs, and removed
  duplicate ignore rules while preserving `.env.example`.
- Format check, lint, all 31 tests, typecheck, GraphQL validation, and
  production build passed locally.
- The developer confirmed Studio section selection and outline, heading
  editing, and published content on the local Home page after a hard refresh.
  A normal refresh still showed cached content during the check.
- The local Shopify check route returned a real catalog product.
