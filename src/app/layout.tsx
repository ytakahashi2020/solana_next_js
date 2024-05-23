import AppWalletProvider from "../../components/AppWalletProvider";
import "@/app/globals.css";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppWalletProvider>
          <header className="p-4 bg-gray-800 text-white">
            <nav className="flex justify-end space-x-4">
              <Link href="/" className="text-blue-500 hover:text-blue-700">
                Home
              </Link>
              <Link
                href="/address"
                className="text-blue-500 hover:text-blue-700"
              >
                Address
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
            </nav>
          </header>
          {children}
        </AppWalletProvider>
      </body>
    </html>
  );
}
