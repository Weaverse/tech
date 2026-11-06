# Weaverse maintainer guidance

Read the root `AGENTS.md` first. Its rules apply throughout this repository.
This file adds the internal spec-driven development workflow for Tech.

## Spec-driven development

- Store specs under `.weaverse/specs/`, one folder per change.
- Name each folder `YYYY-MM-DD--kebab-title`, using the date the spec is created.
- Write all spec content in English.
- Each spec must contain:
  - `README.md`: Status, Owner, Created, Last Updated, Original Prompt,
    and Summary.
  - `plan.md`: implementation steps, verification, deferred work, and a
    files-touched section. Keep it under 500 lines.
  - `work-logs.md`: an append-only record of work performed, checks run,
    results, and remaining limitations.
- Include the source issue URL and its original request in Original Prompt.
  Record later scope changes separately rather than rewriting that request.
- Distinguish planned work, implemented work, and verified behavior.
  Do not mark a feature complete based only on a plan or a successful build.
- Keep capability boundaries, unresolved decisions, and implementation status
  in the spec. Keep the repository README focused on setup and usage.
- Update the spec as implementation proceeds. Record only checks actually run.

## Foundation reference

- The foundation request is issue #1:
  https://github.com/Weaverse/tech/issues/1
- Use Weaverse/forward as the reference for proven integration patterns,
  adapting them to Tech's scope and approved design.
- Follow the corrected review in PR #10 when it supersedes earlier comments:
  https://github.com/Weaverse/tech/pull/10
- Record unresolved design decisions before implementing affected UI.
- Record deferred work explicitly, including its reason and expected follow-up.