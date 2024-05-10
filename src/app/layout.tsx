import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./components/layout/Header";
import QueryProvider from "./contexts/query-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kairon Labs",
  description: "Technical Assignment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <Header />
          <div className="container mx-auto">{children}</div>
        </QueryProvider>
      </body>
    </html>
  );
}
