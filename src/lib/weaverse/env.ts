export type EnvSource = Readonly<Record<string, string | undefined>>;

export const SDK_ENV_KEYS = [
  "WEAVERSE_PROJECT_ID",
  "WEAVERSE_HOST",
  "WEAVERSE_PUBLIC_API_BASE",
  "PUBLIC_STORE_DOMAIN",
  "PUBLIC_STOREFRONT_API_TOKEN",
] as const;

function readKey(source: EnvSource, key: string): string {
  return source[key]?.trim() ?? "";
}

export function buildSdkEnv(
  source: EnvSource,
): Readonly<Record<string, string>> {
  let env: Record<string, string> = {};

  for (let key of SDK_ENV_KEYS) {
    env[key] = key === "WEAVERSE_PUBLIC_API_BASE" ? "" : readKey(source, key);
  }

  return Object.freeze(env);
}
