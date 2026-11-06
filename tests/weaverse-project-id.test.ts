import assert from "node:assert/strict";
import { test } from "node:test";
import type { ComponentProps, ReactElement } from "react";
import {
  WeaverseNextProvider,
  type WeaverseNextLoaderData,
} from "@weaverse/next";

import { WeaversePage } from "../src/lib/weaverse/page";

function projectIdPassedToProvider(
  data: WeaverseNextLoaderData,
): string | undefined {
  // Inspect the wrapper's returned element without mounting the SDK runtime.
  let element = WeaversePage({
    data,
    projectId: "configured-project",
  }) as ReactElement<ComponentProps<typeof WeaverseNextProvider>>;

  assert.equal(element.type, WeaverseNextProvider);
  assert.ok(element.props.client);
  return element.props.client.projectId;
}

test("Client prefers configs project id over project metadata and configured id", () => {
  let data: WeaverseNextLoaderData = {
    configs: { projectId: "payload-project" },
    project: { id: "metadata-project" },
    page: { id: "test-page", items: [] },
  };

  assert.equal(projectIdPassedToProvider(data), "payload-project");
});

test("Client uses project metadata when configs project id is absent", () => {
  let data: WeaverseNextLoaderData = {
    configs: {},
    project: { id: "metadata-project" },
    page: { id: "test-page", items: [] },
  };

  assert.equal(projectIdPassedToProvider(data), "metadata-project");
});

test("Client falls back to configured project id when payload ids are absent", () => {
  let data: WeaverseNextLoaderData = {
    page: { id: "test-page", items: [] },
  };

  assert.equal(projectIdPassedToProvider(data), "configured-project");
});
