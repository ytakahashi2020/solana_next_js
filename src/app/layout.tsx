"use client";

import AppWalletProvider from "../../components/AppWalletProvider";
import "@/app/globals.css";
import Link from "next/link";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useState, useEffect } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <html lang="en">
      <body>
        <AppWalletProvider>
          <header className="p-4 bg-gray-800 text-white">
            <nav className="flex justify-end items-center space-x-4">
              <Link href="/" className="text-blue-500 hover:text-blue-700">
                Home
              </Link>

              <Link
                href="/transfer"
                className="text-blue-500 hover:text-blue-700"
              >
                Transfer
              </Link>
              <Link
                href="/anchor"
                className="text-blue-500 hover:text-blue-700"
              >
                Anchor
              </Link>
              <Link href="/pda" className="text-blue-500 hover:text-blue-700">
                PDA
              </Link>

              <div className="ml-4">
                <WalletMultiButton style={{}} />
              </div>
            </nav>
          </header>
          {children}
        </AppWalletProvider>
      </body>
    </html>
  );
}
