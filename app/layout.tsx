import type { Metadata } from "next";
import { Bitcount_Prop_Double, Bitcount_Prop_Single } from "next/font/google";
import type React from "react";
import "./globals.css";

// Google fonts
const bitcountPropDouble = Bitcount_Prop_Double({
  variable: "--font-bitcount-prop-double",
  subsets: ["latin"],
});

const bitcountPropSingle = Bitcount_Prop_Single({
  variable: "--font-bitcount-prop-single",
  subsets: ["latin"],
});

// Metadata
export const metadata: Metadata = {
  title: "%s | mp-4",
  description: "Next app homework using api with key",
};

// RootLayout
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en" className={`${bitcountPropDouble.variable} ${bitcountPropSingle.variable}`}>
            <body>
                <main>{children}</main>
            </body>
      </html>
    </>
  );
}
