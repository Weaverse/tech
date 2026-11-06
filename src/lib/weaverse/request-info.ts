import type { WeaverseNextRequestContext } from "@weaverse/next";

export type SearchParams = Record<string, string | string[] | undefined>;

export function toSearchParams(input: SearchParams = {}): URLSearchParams {
  let params = new URLSearchParams();

  for (let [key, value] of Object.entries(input)) {
    if (Array.isArray(value)) {
      for (let entry of value) {
        params.append(key, entry);
      }
    } else if (value !== undefined) {
      params.set(key, value);
    }
  }

  return params;
}

export interface RequestContextInput {
  headers: Headers;
  pathname: string;
  type: NonNullable<WeaverseNextRequestContext["pageType"]>;
  handle?: string;
  searchParams?: SearchParams;
  locale?: WeaverseNextRequestContext["i18n"];
}

export function buildRequestContext({
  headers,
  pathname,
  type,
  handle,
  searchParams,
  locale,
}: RequestContextInput): WeaverseNextRequestContext {
  let search = toSearchParams(searchParams);
  let host = headers.get("x-forwarded-host") ?? headers.get("host");
  let protocol = headers.get("x-forwarded-proto") ?? "http";
  let origin = host === null ? "" : `${protocol}://${host}`;
  let query = search.size > 0 ? `?${search.toString()}` : "";

  return {
    headers,
    pathname,
    pageType: type,
    handle,
    searchParams: search,
    url: `${origin}${pathname}${query}`,
    i18n: locale ?? {
      country: "US",
      language: "EN",
      locale: "en-US",
      label: "United States",
      pathPrefix: "",
    },
  };
}
