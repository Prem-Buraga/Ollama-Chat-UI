import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Local Chat (Ollama + Gemma 3)",
  description: "ChatGPT-style UI for local Ollama models",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="h-screen">{children}</body>
    </html>
  );
}
