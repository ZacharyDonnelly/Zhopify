import { siteConfig } from "@/lib/constants/config";
import Footer from "@/lib/ui/components/layout/footer";
import Header from "@/lib/ui/components/layout/header";
import "@/lib/ui/styles/global.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "./providers/AuthProvider";

export const metadata: Metadata = siteConfig;
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col`}>
        <AuthProvider>
          <Header className="flex-shrink-0" />
          <main className="min-w-[300px] flex-1">{children}</main>
          <Footer className="flex-shrink-0" />
        </AuthProvider>
      </body>
    </html>
  );
}
