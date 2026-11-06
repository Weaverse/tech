import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { test } from "node:test";

for (let scenario of [
  "success",
  "unconfigured",
  "missing",
  "undefined",
  "headers-error",
  "client-error",
  "load-error",
  "route-success",
  "route-missing",
  "route-unconfigured",
  "route-load-error",
]) {
  test(`Server page loader handles ${scenario}`, () => {
    execFileSync(
      process.execPath,
      [
        fileURLToPath(
          new URL("./fixtures/weaverse-server.mjs", import.meta.url),
        ),
        scenario,
      ],
      { stdio: "pipe" },
    );
  });
}
