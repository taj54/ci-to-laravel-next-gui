import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CI to Laravel Migration Tool",
  description: "Easily migrate your CodeIgniter app to Laravel.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-900 min-h-screen`}
      >
        <div className="flex flex-col min-h-screen">
          {/* Header */}
          <header className="bg-white shadow-sm py-4 px-6">
            <h1 className="text-2xl font-semibold text-center">
              CI → Laravel Migration Tool
            </h1>
          </header>

          {/* Main content area */}
          <main className="flex-1 p-6 max-w-4xl mx-auto w-full">
            {children}
          </main>

          {/* Footer */}
          <footer className="text-center text-sm text-gray-500 py-4 border-t">
            © {new Date().getFullYear()} Migration Tools Inc. All rights reserved.
          </footer>
        </div>
      </body>
    </html>
  );
}
