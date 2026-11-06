import {
  elementAttributes,
  type WeaverseElementProps,
} from "@/sections/weaverse-element";

type TextBlockProps = WeaverseElementProps & {
  heading: string;
};

export default function TextBlock({
  heading,
  className,
  ...rest
}: TextBlockProps) {
  return (
    <h2 {...elementAttributes(rest)} className={className}>
      {heading}
    </h2>
  );
}

export { schema } from "./schema";
