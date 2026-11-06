# Tech repository guidance

## Project

Tech is an electronics and technology Shopify storefront built with Next.js
App Router and powered by Weaverse. Tech is a working name.

Use Weaverse/forward as the implementation reference for proven integration
patterns. Preserve Tech's approved design and scope; do not copy Forward's
visual identity or unrelated features.

Internal maintainers must also read `.weaverse/AGENTS.md` when present.

## Architecture

- Use Server Components by default. Add a client boundary where browser
  APIs, React context, or interactive state require it.
- Sections are presentation components. Receive content and resolved data
  through props; do not read environment variables, query Shopify, or parse
  route query parameters inside visual sections.
- Keep the Shopify data layer and Weaverse composition layer separate.
  Routes coordinate them and pass resolved data to presentation components.
- Keep filtering, sorting, pagination, and resource identity in the
  route/data layer. Shared form controls only report user input.
- Keep cart and account behavior theme-owned. Header and footer are
  theme-owned components configured through theme settings.
- Render Weaverse pages as authored. Do not invent a fallback composition
  when a page is missing or empty.

## Weaverse integration

- Import Weaverse APIs and types from `@weaverse/next` or its documented
  subpaths. Do not rely on hoisted internal Weaverse packages.
- Keep the client render registry in `src/lib/weaverse/components.ts`,
  with `"use client"` and `entry()`.
- Keep the server registry separate in `server-components.ts`. It must be
  server-only and contain schemas, a non-rendering default stub, and
  server loaders where needed.
- Share schema declarations through a dedicated schema list. Do not import
  render modules into the server registry or server loaders into the client
  registry.
- Registered components must preserve Studio identity attributes on their
  outermost DOM element. Filter runtime props through `elementAttributes()`;
  never spread authored settings or `loaderData` directly onto the DOM.
- Handle `className` explicitly. Keep setting defaults in the schema.
- Preserve pathname, query parameters, page type, handle, and locale when
  building request context and restoring it on the client.
- Prefer the project id from the server payload when creating the client.
  Use the configured project id only as a fallback.
- Keep server configuration and SDK environment construction behind a
  server-only boundary. Explicitly control every environment key the SDK
  reads; omitted keys may fall back to `process.env`.

## Shopify and credentials

- Centralize Shopify environment access in
  `src/lib/storefront/shopify/env.ts`.
- Use a server-side storefront client for catalog reads. Follow the
  installed Hydrogen guidance for Next.js integration.
- Keep the private Storefront token on the server. Never include it in
  browser code, serialized props, Studio payloads, logs, errors, or fixtures.
- The public Storefront token may be supplied to Weaverse Studio through
  its public environment payload. Never substitute the private token.
- Document environment variable names in `.env.example`, with empty values.
  Never commit credentials or populated environment files.

## Styling and code conventions

- Use Tech's approved Figma design and shared typography, color, spacing,
  and radius tokens.
- Keep `src/app/globals.css` for Tailwind, shared tokens, and document-level
  base styles. Keep component presentation with the component.
- Reuse shared UI components and `src/components/icon.tsx`.
- Use `cn()` for conditional or composed class names.
- Use `let` for ordinary variables. Reserve `const` for module-level
  `ALL_CAPS` constants.
- Use TypeScript types for component contracts and native HTML props where
  appropriate.
- Put theme-owned shopper-facing copy through the i18n/theme settings layer.
  Keep merchant-authored content in settings and Shopify content in Shopify.

## Tooling and verification

- Use Bun, pinned by `packageManager` in `package.json`, and commit
  `bun.lock` when dependencies change.
- Keep the application compatible with Node.js 24, as configured in CI.
- Use Biome for linting and formatting. Run `bun run format` to apply formatting.
- Before committing, run `bun run format:check`, `bun run lint`,
  `bun run typecheck`, `bun run test`, and `bun run build`.
- Keep this guidance and CI synchronized with the scripts in `package.json`.
- Add focused regression tests for Studio attributes, registry consistency,
  request context, and environment boundaries as those changes land.
- Verify Studio selection, outline, and editing in the browser; a heading
  update alone does not prove the integration works.
- Report checks actually run and any verification that remains pending.
- Inspect the final diff. Keep generated files and build output out of Git.

## Working safely

- Preserve unrelated local changes and the developer's existing test setup.
- Read the relevant installed Next.js and Hydrogen guidance before changing
  their integration.
- Do not commit, push, deploy, merge, or modify external services unless
  authorized by the user.
<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
