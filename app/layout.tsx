import { siteConfig } from "@/lib/constants/config";
import Footer from "@/ui/components/layout/footer";
import Header from "@/ui/components/layout/header";
import "@/ui/styles/global.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

export const metadata: Metadata = siteConfig;
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="min-w-[300px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
