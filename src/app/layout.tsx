import type { Metadata } from "next";
import { Inter } from "next/font/google";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "reisetopia Coding Challenge",
  description: "reisetopia Coding Challenge",
};

export default function RootLayout(
  props: Readonly<{ children: React.ReactNode }>
) {
  return (
    <html lang="en">
      <body className={font.className}>{props.children}</body>
    </html>
  );
}
