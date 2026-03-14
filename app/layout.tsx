import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gentle Steps",
  description: "Digital interactive guide for motherhood",
  manifest: "/manifest.json",
  appleWebApp:{
    capable: true,
    title: "Gentle Steps",
    statusBarStyle: "default",
  },
};

export const viewport = {
  themeColor: "#ffffff"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system">
          <div className="min-h-screen">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
