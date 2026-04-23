import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DREC Healthcare Academy",
  description: "100-Day Diabetes Reversal — Patient & Admin Platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-bg text-ink">
        <div className="mx-auto min-h-screen max-w-[1480px]">{children}</div>
      </body>
    </html>
  );
}
