import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar }  from "@/components/layout/Navbar";
import { Footer }  from "@/components/layout/Footer";

export const metadata: Metadata = {
  title:       { default: "Hair Classic", template: "%s | Hair Classic" },
  description: "London's most refined hair salon. Bespoke styling, artisan colour, and an experience of quiet, lasting elegance.",
  keywords:    ["luxury hair salon", "London salon", "balayage", "hair colour", "keratin treatment"],
  openGraph: {
    type:     "website",
    locale:   "en_GB",
    url:      "https://hairclassic.co.uk",
    siteName: "Hair Classic",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Hair Classic — Quiet Elegance" }],
  },
  manifest: "/manifest.json",
  icons:    { apple: "/icon.svg", icon: "/icon.svg" },
};

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
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Jost:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-parchment text-dark font-body antialiased overflow-x-hidden">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
