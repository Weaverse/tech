import "server-only";

import {
  createShopifyRequestContext,
  createStorefrontClient,
} from "@shopify/hydrogen";

import { readShopifyEnv } from "./env";

export function createShopifyReadClient() {
  let config = readShopifyEnv();

  let requestContext = createShopifyRequestContext({
    request: { headers: new Headers() },
    i18n: { country: "US", language: "EN" },
  });

  return createStorefrontClient({
    type: "private_no_buyer_context",
    requestContext,
    config,
  });
}
