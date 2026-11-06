import assert from "node:assert/strict";
import { test } from "node:test";
import type { ReactElement } from "react";

import ErrorPage from "../src/app/error";
import { STATIC_CONTENT } from "../src/lib/i18n/static-content";

test("Error fallback uses shared copy and delegates recovery to Next retry", () => {
  let retries = 0;
  let element = ErrorPage({
    retry: () => {
      retries++;
    },
  }) as ReactElement<{
    role: string;
    children: [
      ReactElement<{ children: string }>,
      ReactElement<{
        type: string;
        onClick: () => void;
        children: string;
      }>,
    ];
  }>;

  assert.equal(element.props.role, "alert");
  let [heading, button] = element.props.children;
  assert.equal(heading.props.children, STATIC_CONTENT.errors.unexpected);
  assert.equal(button.props.type, "button");
  assert.equal(button.props.children, STATIC_CONTENT.errors.retry);
  button.props.onClick();
  assert.equal(retries, 1);
});
