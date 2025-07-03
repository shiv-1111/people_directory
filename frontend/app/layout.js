// app/layout.js

import "./globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "People Directory",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-gray-100 text-gray-900 min-h-screen flex flex-col items-center">
        {/* Header */}
        <header className="w-full bg-white shadow py-4 px-6 mb-6">
          <div className="max-w-5xl w-full">
            <Link href={"/"} className="text-2xl font-bold text-blue-600">
              People Directory
            </Link>
          </div>
        </header>

        {/* Main content */}
        <main className="w-full max-w-2xl px-4 sm:px-6 flex-grow">
          <div className="bg-white p-6 rounded-lg shadow-md">{children}</div>
        </main>

        {/* Optional Footer */}
        <footer className="mt-8 text-sm text-gray-500 pb-4">
          &copy; {new Date().getFullYear()} People Directory
        </footer>
      </body>
    </html>
  );
}
