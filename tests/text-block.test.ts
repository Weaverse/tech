import assert from "node:assert/strict";
import { test } from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import TextBlock from "../src/sections/text-block";
import { schema } from "../src/sections/text-block/schema";

test("TextBlock preserves Studio identity and presentation props", () => {
  let html = renderToStaticMarkup(
    createElement(TextBlock, {
      heading: "Explore Tech",
      "data-wv-id": "item-1",
      "data-wv-type": "text-block",
      "aria-label": "Introduction",
      className: "text-center",
    }),
  );

  assert.match(html, /^<h2\b/);
  assert.match(html, /data-wv-id="item-1"/);
  assert.match(html, /data-wv-type="text-block"/);
  assert.match(html, /aria-label="Introduction"/);
  assert.match(html, /class="text-center"/);
  assert.match(html, />Explore Tech<\/h2>$/);
});

test("TextBlock filters internal props and applies the authored anchor", () => {
  let html = renderToStaticMarkup(
    createElement(TextBlock, {
      heading: "Hello",
      id: "runtime-id",
      elementId: "introduction",
      loaderData: { products: [] },
      internalSetting: "must-not-reach-dom",
    }),
  );

  assert.match(html, /id="introduction"/);
  assert.doesNotMatch(html, /runtime-id/);
  assert.doesNotMatch(html, /elementId|loaderData|internalSetting/i);
  assert.doesNotMatch(html, /must-not-reach-dom/);
});

test("Heading schema default matches its preset", () => {
  let input = schema.settings
    ?.flatMap((group) => group.inputs)
    .find((setting) => setting.name === "heading");

  assert.ok(input);
  assert.equal(input.label, "Heading");
  assert.equal(input.defaultValue, "Explore Tech");
  assert.equal(schema.presets?.heading, input.defaultValue);
});
