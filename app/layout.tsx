import type { Metadata } from "next";
import { Geist, Geist_Mono, Cagliostro, Yomogi, Nothing_You_Could_Do, Knewave, Chango, Dongle} from "next/font/google";

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

const cagli = Cagliostro({
  variable: "--font-calgi",
  weight: '400',
  subsets: ['latin'],
})

//choosen as default
const yomogi = Yomogi({
  variable: "--font-yomogi",
  weight: '400',
  subsets: ['latin'],
})

const nothing = Nothing_You_Could_Do({
  variable: "--font-nothing",
  weight: '400',
  subsets: ['latin'],
})

//chosen - chapter inner titles & outer sub
const knewave = Knewave({
  variable: "--font-knewave",
  weight: '400',
  subsets: ['latin'],
})

//choosen - outer title
const chango = Chango({
  variable: "--font-chango",
  weight: '400',
  subsets: ['latin'],
})

//choosed - chapter details
const dongle = Dongle({
  variable: "--font-dongle",
  weight: '400',
  subsets: ['latin'],
})


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
      <body className={`${geistSans.variable} ${geistMono.variable} ${cagli.variable} ${yomogi.variable} ${nothing.variable} ${knewave.variable} ${chango.variable} ${dongle.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system">
          <div className="min-h-screen">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
