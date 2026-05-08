import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "TrustPay — Secure Escrow for African Social Commerce",
    template: "%s | TrustPay",
  },
  description: "Trust infrastructure for African social commerce. Secure escrow transactions between buyers and sellers on Instagram, WhatsApp, TikTok, and X.",
  keywords: ["escrow", "fintech", "Nigeria", "social commerce", "secure payments", "TrustPay"],
};

import { GoogleOAuthProvider } from "@react-oauth/google";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";

  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <GoogleOAuthProvider clientId={googleClientId}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            {children}
            <Toaster position="top-right" richColors closeButton theme="system" />
          </ThemeProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
