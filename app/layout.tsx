import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import type React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ariens - Professional Grade Equipment",
  description:
    "High-performance battery-powered outdoor equipment for professionals and homeowners",
  verification: {
    google: "cEdooHi-JoDgaFyVxAJ7vt1KL2UyrKTSrOaMGhc_1ho",
    yandex: "yandex",
    yahoo: "yahoo",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="cEdooHi-JoDgaFyVxAJ7vt1KL2UyrKTSrOaMGhc_1ho"
        />
      </head>
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
        <script
          src="//code.tidio.co/1lbiactoezrtdzechohl6zwda8bfxttg.js"
          async
        ></script>
      </body>
    </html>
  );
}

import "./globals.css";
