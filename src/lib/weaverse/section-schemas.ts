import type { WeaverseNextComponent } from "@weaverse/next";

import { schema as textBlockSchema } from "@/sections/text-block/schema";

export const SECTION_SCHEMAS: WeaverseNextComponent["schema"][] = [
  textBlockSchema,
];
