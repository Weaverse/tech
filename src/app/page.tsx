import { notFound } from "next/navigation";
import { Suspense } from "react";

import { WeaversePage } from "@/lib/weaverse/page";
import type { SearchParams } from "@/lib/weaverse/request-info";
import { loadWeaversePage, weaverseProjectId } from "@/lib/weaverse/server";

type HomePageProps = {
  searchParams: Promise<SearchParams>;
};

async function HomeContent({ searchParams }: HomePageProps) {
  let projectId = weaverseProjectId();

  if (!projectId) {
    notFound();
  }

  let data = await loadWeaversePage({
    type: "INDEX",
    pathname: "/",
    searchParams: await searchParams,
  });

  if (!data) {
    notFound();
  }

  return <WeaversePage data={data} projectId={projectId} />;
}

export default function HomePage({ searchParams }: HomePageProps) {
  return (
    <Suspense fallback={null}>
      <HomeContent searchParams={searchParams} />
    </Suspense>
  );
}
