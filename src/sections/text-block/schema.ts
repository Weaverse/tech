import { createSchema } from "@weaverse/next";

export const schema = createSchema({
  type: "text-block",
  title: "Text block",
  settings: [
    {
      group: "Content",
      inputs: [
        {
          type: "text",
          name: "heading",
          label: "Heading",
          defaultValue: "Explore Tech",
        },
      ],
    },
  ],
  presets: {
    heading: "Explore Tech",
  },
});
