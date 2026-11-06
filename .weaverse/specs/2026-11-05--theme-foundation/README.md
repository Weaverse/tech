# Tech Theme Foundation

- Status: In progress — PR review remediation
- Owner: @HoangHuy1305HP
- Technical reviewer: @hta218
- Created: 2026-11-05
- Last Updated: 2026-11-05
- Source issue: https://github.com/Weaverse/tech/issues/1
- Pull request: https://github.com/Weaverse/tech/pull/10
- Design review: https://github.com/Weaverse/tech/issues/9

## Original Prompt

Source: issue #1, "[Dev] Set up the theme foundation and development environment".

Build the foundation for the new electronics/tech Next.js theme. Tech is a working name and may change before release.

1. Review the approved design handoff with @imsinhp and record unresolved design decisions before implementing affected UI.
2. Establish the Next.js App Router and Weaverse foundation in this repository, using https://github.com/Weaverse/forward as the working reference. Reuse proven storefront patterns without rebuilding the SDK or copying Forward's visual identity.
3. Connect the designated Shopify demo store and Weaverse project. Document environment variable names in `.env.example`; keep credentials out of GitHub.
4. Configure local development, lint, typecheck, build and CI, and publish a working preview deployment. Verify the actual package versions used.
5. Record which commerce, account, localization and Studio capabilities are inherited and which need theme implementation. Plan these boundaries from the start.
6. Share the preview and concise setup instructions so the remaining tasks can proceed.

Implementation owner: @HoangHuy1305HP. Technical reviewer: @hta218.
Design review: #9.

## Summary

Establish Tech's Next.js App Router foundation, Weaverse page composition,
Shopify data boundary, development tooling, and preview workflow.

The initial foundation exists in PR #10. Review remediation is in progress.
This spec records the intended scope and distinguishes existing code from
behavior that still needs implementation or verification.

Forward is the reference for integration patterns. Its visual identity and
unrelated storefront features are outside this change.

## Current Baseline

- Next.js App Router and a Weaverse-rendered Home page are implemented.
- TextBlock is registered with an editable heading.
- Client rendering and server registration are separate. The server registry
  derives its entries from a schema-only list and uses a non-rendering stub;
  TextBlock does not require a server loader.
- Server-to-client request context restoration is implemented.
- Server request context construction is now a tested pure helper. Home uses
  the generic page loader and translates unavailable composition to `notFound()`.
- A client error boundary uses centralized English fallback copy and Next's
  retry callback. Full localization/theme-editable copy remains deferred.
- The server passes explicit SDK environment keys and excludes private Shopify
  credentials. The client prefers the server payload's project identity before
  the configured fallback; the environment project gate remains in place.
- Bun scripts and CI currently run lint, typecheck, and build.
- Earlier verification reported successful local checks, a Shopify terminal
  query, and heading updates in Studio. These have not been rerun as part
  of this documentation step.
- A server-only Hydrogen client reads a catalog sample from Shopify. The
  developer confirmed the local Next.js check route returned a product from
  the demo store. That route returns 404 in production.
- TextBlock now preserves filtered Studio attributes on its root. The developer
  verified selection, hover outlines, and heading edits in Studio against the
  local foundation preview after enabling element selection mode.
- The design-system work in the separate working directory is outside this PR.

## Review Remediation Scope

- Add repository guidance and this spec.
- Preserve safe Studio attributes on registered section roots and test them.
- Separate client rendering from server schemas and loaders.
- Prefer the server payload's project id on the client.
- Explicitly control the environment passed to the Weaverse SDK.
- Extract reusable request-context and page-loading helpers.
- Handle missing pages and load failures consistently.
- Define cache behavior for published and design/revision requests.
- Add Hydrogen and a server-side Shopify client, with one real application read.
- Align lint and formatting with Biome and update CI.
- Clean up setup documentation and unused scaffold files.

The corrected review supersedes earlier requests to merge registries,
remove the environment gate, change the protocol fallback to HTTPS,
or spread the entire runtime prop bag onto the DOM.

## Capability Boundaries

| Area | Platform support | Tech responsibility |
| --- | --- | --- |
| Page composition | Weaverse schemas, page loading, and rendering | Registries, route identity, sections, and safe DOM attributes |
| Catalog | Shopify Storefront API and Hydrogen client | Server configuration, queries, data mapping, and route integration |
| Search and filtering | Shopify search, facets, sort keys, and pagination | Query validation, URL state, presentation, and interactions |
| Cart and checkout | Shopify Cart API and hosted checkout | Cart identity, mutations, UI, persistence, and checkout handoff |
| Customer accounts | Shopify Customer Account APIs and Hydrogen helpers | Configuration, sessions, routes, and account UI |
| Localization | Shopify market context and Weaverse translation capabilities | Supported locales, routing, formatting, and theme copy |
| Studio editing | Weaverse editing runtime and Studio bridge | Correct registration, DOM identity, request context, and browser verification |
| Resource-backed sections | Weaverse server loaders and revalidation support | Section loaders and a revalidation endpoint when needed |
| Theme settings | Weaverse theme schema and root provider | Tech settings, header/footer integration, and CSS variables |

Platform support does not mean the capability is already integrated or
verified in Tech.

## Deferred Work

- Full catalog, search, filtering, cart, and account experiences.
- Multi-market routing and the localization UI.
- Root theme settings/provider integration and header/footer implementation.
  Plan these before building surfaces that depend on global settings.
- Resource-backed section revalidation when such sections are introduced.
- Evaluate Vercel Protection Bypass for Studio previews. This spec does not
  change deployment protection settings.

## Unresolved Decisions

- Approved design handoff details and unresolved decisions from issue #9.
- Initial commerce and customer-account scope.
- Supported markets, languages, and default market.
- Merchant-editable global settings.

## Page Data Cache

Published Weaverse page requests use a 60-second revalidation interval and
the shared `weaverse:page` tag. The interval limits how long the data can
remain fresh while avoiding a Weaverse request on every compatible page load.
Revalidation is request-driven. The tag is available for future on-demand
invalidation and is not currently wired to publishing.

Design and revision requests use the SDK's `no-store` behavior. Section-only
preview returns synthetic data without fetching the page. Cache Components
prerenders the shell while Home reads request headers and streams under
Suspense. Shopify data will have a separate cache policy.

## Completion Criteria

- Applicable PR review comments are addressed or explicitly deferred.
- Application code successfully reads the designated Shopify demo store.
- Studio selection, outline, and heading editing are verified.
- Environment boundaries are covered without exposing private credentials.
- Lint, typecheck, formatting, relevant tests, and production build pass.
- CI runs the agreed checks without duplicate feature-branch triggers.
- Setup instructions and a stable preview link are available.
- Verification results and remaining limitations are recorded in work logs.
