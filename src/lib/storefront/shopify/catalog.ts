import "server-only";

import { gql } from "@shopify/hydrogen";

import { createShopifyReadClient } from "./client";

const CATALOG_SAMPLE_QUERY = gql(`
  query CatalogSample {
    products(first: 1) {
      nodes {
        id
        title
        handle
      }
    }
  }
`);

export async function readShopifyCatalogSample() {
  let client = createShopifyReadClient();
  let { data, errors } = await client.graphql(CATALOG_SAMPLE_QUERY);

  if (errors?.length || !data) {
    throw new Error("Could not read the Shopify catalog.");
  }

  return data.products.nodes[0] ?? null;
}
