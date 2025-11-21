import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ['300', '400', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-nunito',
});

export const metadata: Metadata = {
  title: "ResponsiveWorks - Custom Software Development",
  description: "We build exceptional software solutions for small to mid-sized businesses. Expert integration, consulting, and development services.",
  keywords: ["software development", "custom software", "web development", "integration", "consulting"],
  authors: [{ name: "ResponsiveWorks" }],
  openGraph: {
    title: "ResponsiveWorks - Custom Software Development",
    description: "We build exceptional software solutions for small to mid-sized businesses.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={nunito.variable}>
      <body className={nunito.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
