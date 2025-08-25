import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { BackgroundBlobs, FloatingShapes, MeshGradient } from "@/components/ui/BackgroundEffects";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Workflow Automation",
    default: "Workflow Automation - Find the Perfect Automation Software",
  },
  description: "Expert reviews, comparisons, and guides to help you find the perfect automation software for your business. Save time and increase efficiency.",
  keywords: ["workflow automation", "business process management", "software reviews", "automation tools", "productivity software"],
  authors: [{ name: "Workflow Automation Team" }],
  creator: "Workflow Automation",
  publisher: "Workflow Automation",
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Workflow Automation - Find the Perfect Automation Software",
    description: "Expert reviews, comparisons, and guides to help you find the perfect automation software for your business.",
    url: "https://workflowautomation.net",
    siteName: "Workflow Automation",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Workflow Automation - Find the Perfect Automation Software",
    description: "Expert reviews, comparisons, and guides to help you find the perfect automation software for your business.",
    creator: "@workflowautomation",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>
          {/* Background effects - layered for depth */}
          <MeshGradient />
          <BackgroundBlobs />
          <FloatingShapes />
          
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 relative z-10">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
