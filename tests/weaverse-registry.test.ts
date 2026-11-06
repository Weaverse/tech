import assert from "node:assert/strict";
import { test } from "node:test";

import { WEAVERSE_COMPONENTS } from "../src/lib/weaverse/components";
import { SECTION_SCHEMAS } from "../src/lib/weaverse/section-schemas";

test("Client registry matches the schema list", () => {
  let clientTypes = WEAVERSE_COMPONENTS.map((entry) => entry.schema.type);
  let schemaTypes = SECTION_SCHEMAS.map((schema) => schema.type);

  assert.deepEqual(clientTypes.toSorted(), schemaTypes.toSorted());
});

test("Registries contain no duplicate component types", () => {
  let clientTypes = WEAVERSE_COMPONENTS.map((entry) => entry.schema.type);
  let schemaTypes = SECTION_SCHEMAS.map((schema) => schema.type);

  assert.equal(new Set(clientTypes).size, clientTypes.length);
  assert.equal(new Set(schemaTypes).size, schemaTypes.length);
});

test("Client registry uses the declared schema objects", () => {
  for (let schema of SECTION_SCHEMAS) {
    let entry = WEAVERSE_COMPONENTS.find(
      (component) => component.schema.type === schema.type,
    );

    assert.ok(entry, `Missing client component: ${schema.type}`);
    assert.strictEqual(entry.schema, schema);
  }
});
