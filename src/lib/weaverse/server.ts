import "server-only";

import { createWeaverseNextServerClient } from "@weaverse/next/server";
import { headers } from "next/headers";

import { buildSdkEnv } from "./env";
import { buildRequestContext, type RequestContextInput } from "./request-info";
import { WEAVERSE_SERVER_COMPONENTS } from "./server-components";

export function weaverseProjectId(): string | null {
  let projectId = process.env.WEAVERSE_PROJECT_ID?.trim();
  return projectId || null;
}

export type LoadWeaversePageOptions = Omit<RequestContextInput, "headers">;

export async function loadWeaversePage({
  type,
  handle,
  pathname,
  searchParams,
  locale,
}: LoadWeaversePageOptions) {
  try {
    let projectId = weaverseProjectId();

    if (!projectId) {
      return null;
    }

    let requestHeaders = await headers();

    let requestContext = buildRequestContext({
      headers: new Headers(requestHeaders),
      type,
      handle,
      pathname,
      searchParams,
      locale,
    });

    let client = createWeaverseNextServerClient({
      env: buildSdkEnv(process.env),
      projectId,
      requestContext,
      components: WEAVERSE_SERVER_COMPONENTS,
    });

    let data = await client.loadPage({
      type,
      handle,
      cache: {
        revalidate: 60,
        tags: ["weaverse:page"],
      },
    });

    return data ?? null;
  } catch {
    return null;
  }
}
