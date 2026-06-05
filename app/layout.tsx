import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lumapaw.example"),
  title: "LumaPaw Grooming | Professional Grooming for Happy Pets",
  description:
    "Premium pet grooming, spa treatments, nail care, and full-service appointments for happy, healthy pets.",
  keywords: [
    "pet grooming",
    "dog grooming",
    "pet spa",
    "nail trimming",
    "full grooming",
    "premium pet care",
  ],
  openGraph: {
    title: "Professional Grooming for Happy Pets",
    description: "Pampering your pets with expert grooming and loving care.",
    images: [{ url: "/images/hero-dog.png", width: 1024, height: 1536 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable}`}>{children}</body>
    </html>
  );
}
