import { WeaverseNextStudioConnect } from "@weaverse/next";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tech",
  description: "An electronics and technology storefront.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <WeaverseNextStudioConnect />
        {children}
      </body>
    </html>
  );
}
