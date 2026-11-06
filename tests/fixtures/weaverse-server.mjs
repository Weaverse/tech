import assert from "node:assert/strict";
import { mock } from "bun:test";

// Each case runs in its own process so SDK/Next mocks cannot leak into other tests.
let scenario = process.argv[2];
let routeCase = scenario.startsWith("route-");
let mode = routeCase ? scenario.slice("route-".length) : scenario;
let headerCalls = 0;
let clientCalls = 0;
let loadCalls = 0;
let payload = { page: { id: "test-page", items: [] } };

for (let key of [
  "WEAVERSE_PROJECT_ID",
  "WEAVERSE_HOST",
  "WEAVERSE_PUBLIC_API_BASE",
  "PUBLIC_STORE_DOMAIN",
  "PUBLIC_STOREFRONT_API_TOKEN",
]) {
  process.env[key] = "";
}
process.env.WEAVERSE_PROJECT_ID =
  mode === "unconfigured" ? "   " : "test-project";
process.env.PRIVATE_STOREFRONT_API_TOKEN = "synthetic-private-token";

mock.module("server-only", () => ({}));
let navigation = await import("next/navigation");
mock.module("next/navigation", () => ({
  ...navigation,
  notFound: () => {
    throw new Error("TEST_NOT_FOUND");
  },
}));
mock.module("next/headers", () => ({
  headers: async () => {
    headerCalls++;
    if (mode === "headers-error") throw new Error("Synthetic headers failure");
    return new Headers({ host: "shop.example", "x-forwarded-proto": "https" });
  },
}));
mock.module("@weaverse/next/server", () => ({
  createWeaverseNextServerClient: (options) => {
    clientCalls++;
    assert.equal(options.projectId, "test-project");
    assert.equal(options.env.WEAVERSE_PROJECT_ID, "test-project");
    assert.equal(
      Object.hasOwn(options.env, "PRIVATE_STOREFRONT_API_TOKEN"),
      false,
    );
    assert.equal(
      options.requestContext.url,
      routeCase
        ? "https://shop.example/?color=black&color=white"
        : "https://shop.example/products/headphones?color=black&color=white",
    );
    assert.equal(
      options.requestContext.handle,
      routeCase ? undefined : "headphones",
    );
    assert.deepEqual(
      options.components.map((entry) => entry.schema.type),
      ["text-block"],
    );
    if (mode === "client-error") throw new Error("Synthetic client failure");
    return {
      loadPage: async (input) => {
        loadCalls++;
        assert.deepEqual(input, {
          type: routeCase ? "INDEX" : "PRODUCT",
          handle: routeCase ? undefined : "headphones",
          cache: {
            revalidate: 60,
            tags: ["weaverse:page"],
          },
        });
        if (mode === "load-error") throw new Error("Synthetic fetch failure");
        if (mode === "missing") return null;
        if (mode === "undefined") return undefined;
        return payload;
      },
    };
  },
}));

let { loadWeaversePage } = await import("../../src/lib/weaverse/server.ts");
if (routeCase) {
  let { default: HomePage } = await import("../../src/app/page.tsx");
  let { WeaversePage } = await import("../../src/lib/weaverse/page.tsx");
  let element = HomePage({
    searchParams: Promise.resolve({ color: ["black", "white"] }),
  });
  let child = element.props.children;
  if (mode === "success") {
    let result = await child.type(child.props);
    assert.equal(result.type, WeaversePage);
    assert.equal(result.props.data, payload);
    assert.equal(result.props.projectId, "test-project");
    assert.equal(loadCalls, 1);
  } else {
    await assert.rejects(() => child.type(child.props), /TEST_NOT_FOUND/);
    assert.equal(loadCalls, mode === "unconfigured" ? 0 : 1);
  }
  process.exit(0);
}
let data = await loadWeaversePage({
  type: "PRODUCT",
  handle: "headphones",
  pathname: "/products/headphones",
  searchParams: { color: ["black", "white"] },
});

assert.equal(data, scenario === "success" ? payload : null);
assert.equal(headerCalls, scenario === "unconfigured" ? 0 : 1);
assert.equal(
  clientCalls,
  ["unconfigured", "headers-error"].includes(scenario) ? 0 : 1,
);
assert.equal(
  loadCalls,
  ["unconfigured", "headers-error", "client-error"].includes(scenario) ? 0 : 1,
);
