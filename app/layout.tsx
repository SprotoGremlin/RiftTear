import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { WagmiProvider, createConfig, http } from "wagmi";
import { base, baseSepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { OnchainKitProvider } from "@coinbase/onchainkit";
import { ReactNode } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const config = createConfig({
  chains: [base, baseSepolia],
  transports: {
    [base.id]: http(),
    [baseSepolia.id]: http(),
  },
});

const queryClient = new QueryClient();

export const metadata: Metadata = {
  title: "RiftTear | 1v1 Reality-Tearing Runner on Base",
  description: "The most intense 1v1 endless runner on Base. Bet crypto, tear reality, win the pot. Insane glitch visuals, onchain matches & NFT skins.",
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "RiftTear — Reality Tearing 1v1 on Base",
    description: "Bet. Run. Tear. Win. The ultimate onchain endless runner with reality-breaking graphics.",
    images: [{ url: "/og-riftttear.png" }],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-black text-white overflow-x-hidden">
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <OnchainKitProvider
              apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY || ""}
              chain={base}
              config={{
                appearance: { mode: "dark", theme: "base" },
              }}
            >
              {children}
              <Toaster position="top-center" richColors closeButton />
            </OnchainKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
