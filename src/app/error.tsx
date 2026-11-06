"use client";

import { STATIC_CONTENT } from "@/lib/i18n/static-content";

type ErrorPageProps = {
  retry: () => void;
};

export default function ErrorPage({ retry }: ErrorPageProps) {
  return (
    <div role="alert">
      <h2>{STATIC_CONTENT.errors.unexpected}</h2>
      <button type="button" onClick={() => retry()}>
        {STATIC_CONTENT.errors.retry}
      </button>
    </div>
  );
}
