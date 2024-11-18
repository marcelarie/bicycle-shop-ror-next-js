import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Marcus' Bike Shop",
  description: "A simple bike shop",
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Readonly<Props>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <h1 className="text-3xl font-bold text-center m-8">
          Marcus&apos; Bike Shop
        </h1>
        <div className="flex justify-center space-x-4 mb-4">
          <Link
            href="/"
            className="block bg-gray-800 text-white py-2 px-4 rounded-md text-center"
          >
            {"Home Page"}
          </Link>
          <Link
            href="/admin"
            className="block bg-gray-800 text-white py-2 px-4 rounded-md text-center"
          >
            {"🔒 Admin"}
          </Link>
        </div>
        {children}
      </body>
    </html>
  );
}
