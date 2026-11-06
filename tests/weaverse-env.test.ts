import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import { test } from "node:test";

import { buildSdkEnv, SDK_ENV_KEYS } from "../src/lib/weaverse/env";

test("SDK env key list matches the installed server bundles", async () => {
  let require = createRequire(import.meta.url);
  let packageRoot = path.dirname(
    require.resolve("@weaverse/next/package.json"),
  );

  for (let bundle of ["server.mjs", "server.js"]) {
    let source = await readFile(path.join(packageRoot, "dist", bundle), "utf8");
    let keys = new Set(
      [...source.matchAll(/readEnv\(\s*env\s*,\s*["']([^"']+)["']\s*\)/g)].map(
        (match) => match[1],
      ),
    );

    assert.ok(
      keys.size > 0,
      `No SDK env reads found in ${bundle}; review this test`,
    );
    assert.deepEqual(
      [...SDK_ENV_KEYS].toSorted(),
      [...keys].toSorted(),
      `SDK_ENV_KEYS must cover exactly the environment keys read by ${bundle}`,
    );
  }
});

test("SDK env supplies explicit empty values when configuration is missing", () => {
  let env = buildSdkEnv({});

  assert.deepEqual(env, {
    WEAVERSE_PROJECT_ID: "",
    WEAVERSE_HOST: "",
    WEAVERSE_PUBLIC_API_BASE: "",
    PUBLIC_STORE_DOMAIN: "",
    PUBLIC_STOREFRONT_API_TOKEN: "",
  });
});

test("SDK env trims configured values and suppresses the API base override", () => {
  let env = buildSdkEnv({
    WEAVERSE_PROJECT_ID: " project-A ",
    WEAVERSE_HOST: " https://builder.example.com ",
    WEAVERSE_PUBLIC_API_BASE: "https://override.example.com",
    PUBLIC_STORE_DOMAIN: " demo.myshopify.com ",
    PUBLIC_STOREFRONT_API_TOKEN: " public-test-token ",
  });

  assert.equal(env.WEAVERSE_PROJECT_ID, "project-A");
  assert.equal(env.WEAVERSE_HOST, "https://builder.example.com");
  assert.equal(env.WEAVERSE_PUBLIC_API_BASE, "");
  assert.equal(env.PUBLIC_STORE_DOMAIN, "demo.myshopify.com");
  assert.equal(env.PUBLIC_STOREFRONT_API_TOKEN, "public-test-token");
});

test("SDK env excludes private credentials and unrelated variables", () => {
  let source = {
    WEAVERSE_PROJECT_ID: "project-A",
    PRIVATE_STOREFRONT_API_TOKEN: "private-test-token",
    OTHER_SETTING: "unrelated",
  };

  let env = buildSdkEnv(source);

  assert.equal(Object.hasOwn(env, "PRIVATE_STOREFRONT_API_TOKEN"), false);
  assert.equal(Object.hasOwn(env, "OTHER_SETTING"), false);
  assert.equal(JSON.stringify(env).includes("private-test-token"), false);
  assert.equal(source.PRIVATE_STOREFRONT_API_TOKEN, "private-test-token");
});

test("SDK env is frozen after construction", () => {
  let env = buildSdkEnv({});

  assert.equal(Object.isFrozen(env), true);
});
