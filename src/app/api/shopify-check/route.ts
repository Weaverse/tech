import { readShopifyCatalogSample } from "@/lib/storefront/shopify/catalog";

export async function GET() {
  if (process.env.NODE_ENV !== "development") {
    return new Response(null, { status: 404 });
  }

  try {
    let product = await readShopifyCatalogSample();

    return Response.json(
      { ok: true, product },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return Response.json(
      { ok: false, message: "Shopify catalog read failed." },
      { status: 502 },
    );
  }
}
