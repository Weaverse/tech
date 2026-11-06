"use client";

import {
  createWeaverseNextClient,
  WeaverseNextProvider,
  WeaverseNextRenderer,
  type WeaverseNextLoaderData,
} from "@weaverse/next";

import { WEAVERSE_COMPONENTS } from "./components";
import { clientRequestContext } from "./request-context";

type WeaversePageProps = {
  data: WeaverseNextLoaderData;
  projectId: string;
};

export function WeaversePage({ data, projectId }: WeaversePageProps) {
  let resolvedProjectId =
    (data.configs?.projectId as string | undefined) ??
    (data.project?.id as string | undefined) ??
    projectId;

  let client = createWeaverseNextClient({
    components: WEAVERSE_COMPONENTS,
    projectId: resolvedProjectId,
    requestContext: clientRequestContext(data),
  });

  return (
    <WeaverseNextProvider client={client}>
      <WeaverseNextRenderer data={data} />
    </WeaverseNextProvider>
  );
}
