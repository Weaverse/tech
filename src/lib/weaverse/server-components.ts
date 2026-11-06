import "server-only";

import type { WeaverseNextComponent } from "@weaverse/next";

import { SECTION_SCHEMAS } from "./section-schemas";

const NO_RENDER: WeaverseNextComponent["default"] = () => null;

export const WEAVERSE_SERVER_COMPONENTS: WeaverseNextComponent[] =
  SECTION_SCHEMAS.map((schema) => ({
    default: NO_RENDER,
    schema,
  }));
