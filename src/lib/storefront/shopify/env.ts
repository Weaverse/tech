import "server-only";

export function readShopifyEnv(source: NodeJS.ProcessEnv = process.env) {
  let storeDomain = source.PUBLIC_STORE_DOMAIN?.trim().toLowerCase();
  let privateStorefrontToken = source.PRIVATE_STOREFRONT_API_TOKEN?.trim();

  if (
    !storeDomain ||
    !/^[a-z0-9][a-z0-9-]*\.myshopify\.com$/.test(storeDomain)
  ) {
    throw new Error(
      "PUBLIC_STORE_DOMAIN must be a valid myshopify.com hostname.",
    );
  }

  if (!privateStorefrontToken) {
    throw new Error("PRIVATE_STOREFRONT_API_TOKEN is required.");
  }

  return { storeDomain, privateStorefrontToken };
}
