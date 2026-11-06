export interface WeaverseElementProps {
  "data-wv-id"?: string;
  "data-wv-type"?: string;
  id?: string;
  className?: string;
  [key: string]: unknown;
}

export function elementAttributes(
  props: WeaverseElementProps,
): Record<string, string> {
  let attributes: Record<string, string> = {};

  for (let key of Object.keys(props)) {
    let shouldForward =
      key === "data-wv-id" ||
      key === "data-wv-type" ||
      key === "id" ||
      key.startsWith("aria-");

    let value = props[key];

    if (shouldForward && typeof value === "string" && value.length > 0) {
      attributes[key] = value;
    }
  }

  if (typeof props.elementId === "string" && props.elementId.length > 0) {
    attributes.id = props.elementId;
  }

  return attributes;
}
