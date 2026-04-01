import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar }  from "@/components/layout/Navbar";
import { Footer }  from "@/components/layout/Footer";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://hairclassic.in"),
  title:       { default: "Hair Classic | Quiet Luxury Salon", template: "%s | Hair Classic" },
  description: "Siliguri's most refined hair salon. Bespoke styling, artisan colour, and an experience of quiet, lasting elegance.",
  keywords:    ["luxury hair salon", "Siliguri salon", "balayage", "hair colour", "keratin treatment", "bespoke styling", "premium hair care"],
  openGraph: {
    title:    "Hair Classic | Quiet Luxury Salon",
    description: "Siliguri's most refined hair salon. Bespoke styling, artisan colour, and an experience of quiet, lasting elegance.",
    type:     "website",
    locale:   "en_IN",
    url:      "/",
    siteName: "Hair Classic",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Hair Classic — Quiet Elegance" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hair Classic | Quiet Luxury Salon",
    description: "Siliguri's most refined hair salon.",
    images: ["/og-image.jpg"],
  },
  manifest: "/manifest.json",
  icons:    { apple: "/icon.svg", icon: "/icon.svg" },
};

import { CookieNotice } from "@/components/ui/CookieNotice";
import { CustomCursor } from "@/components/ui/custom-cursor";

export const viewport: Viewport = {
  themeColor: "#ECEAE4",
  width:      "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&family=Manrope:wght@200..800&display=swap" 
          rel="stylesheet" 
        />
        <link 
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="bg-surface text-on-surface font-body antialiased overflow-x-hidden flex flex-col min-h-screen">
        <CustomCursor />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieNotice />
      </body>
    </html>
  );
}
