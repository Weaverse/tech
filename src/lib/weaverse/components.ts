"use client";

import type { WeaverseNextComponent } from "@weaverse/next";

import * as TextBlock from "@/sections/text-block";

function entry(module: {
  default: unknown;
  schema: WeaverseNextComponent["schema"];
}): WeaverseNextComponent {
  return {
    default: module.default as WeaverseNextComponent["default"],
    schema: module.schema,
  };
}

export const WEAVERSE_COMPONENTS: WeaverseNextComponent[] = [entry(TextBlock)];
