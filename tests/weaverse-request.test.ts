import assert from "node:assert/strict";
import { test } from "node:test";

import { clientRequestContext } from "../src/lib/weaverse/request-context";
import {
  buildRequestContext,
  toSearchParams,
} from "../src/lib/weaverse/request-info";

test("Query conversion preserves repeated values, empty strings, and escaping", () => {
  let search = toSearchParams({
    q: "phone & case",
    color: ["black", "white"],
    empty: "",
    missing: undefined,
  });

  assert.equal(search.get("q"), "phone & case");
  assert.deepEqual(search.getAll("color"), ["black", "white"]);
  assert.equal(search.get("empty"), "");
  assert.equal(search.has("missing"), false);
  assert.match(search.toString(), /q=phone\+%26\+case/);
  assert.equal(toSearchParams().size, 0);
});

test("Request context builds a URL without a trailing question mark", () => {
  let context = buildRequestContext({
    headers: new Headers({ host: "localhost:3001" }),
    pathname: "/",
    type: "INDEX",
  });

  assert.equal(context.url, "http://localhost:3001/");
  assert.equal(context.pageType, "INDEX");
  assert.equal(context.i18n?.language, "EN");
  assert.equal(context.i18n?.locale, "en-US");
});

test("Request context preserves proxy origin, page handle, query and locale", () => {
  let headers = new Headers({
    host: "internal.example",
    "x-forwarded-host": "shop.example",
    "x-forwarded-proto": "https",
  });
  let locale = {
    country: "DE",
    language: "DE",
    locale: "de-DE",
    label: "Germany",
    pathPrefix: "/de-de",
  };
  let context = buildRequestContext({
    headers,
    pathname: "/products/headphones",
    type: "PRODUCT",
    handle: "headphones",
    searchParams: { color: ["black", "white"], isDesignMode: "true" },
    locale,
  });

  assert.equal(context.headers, headers);
  assert.equal(context.pageType, "PRODUCT");
  assert.equal(context.handle, "headphones");
  assert.deepEqual(context.i18n, locale);
  assert.equal(
    context.url,
    "https://shop.example/products/headphones?color=black&color=white&isDesignMode=true",
  );
  assert.deepEqual(context.searchParams?.getAll("color"), ["black", "white"]);
});

test("Request identity can be restored from the serialized server payload", () => {
  let context = buildRequestContext({
    headers: new Headers({ host: "shop.example" }),
    pathname: "/collections/audio",
    type: "COLLECTION",
    handle: "audio",
    searchParams: { color: ["black", "white"] },
  });
  let restored = clientRequestContext({
    page: { id: "test-page", items: [] },
    configs: {
      isDesignMode: true,
      requestInfo: {
        pathname: context.pathname,
        pageType: context.pageType,
        handle: context.handle,
        i18n: context.i18n,
        search: context.searchParams?.toString(),
      },
    },
  });

  assert.equal(restored.pathname, context.pathname);
  assert.equal(restored.pageType, context.pageType);
  assert.equal(restored.handle, context.handle);
  assert.deepEqual(restored.i18n, context.i18n);
  assert.equal(restored.isDesignMode, true);
  assert.deepEqual(restored.searchParams?.getAll("color"), ["black", "white"]);
});

test("Request context retains a relative URL when no host is supplied", () => {
  let context = buildRequestContext({
    headers: new Headers(),
    pathname: "/about",
    type: "CUSTOM",
    searchParams: { q: "hello world" },
  });

  assert.equal(context.url, "/about?q=hello+world");
});
