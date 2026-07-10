import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { OnchainKitProvider } from "@coinbase/onchainkit";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { base } from "viem/chains";
import { WagmiConfig } from "@/lib/wagmi";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RiftTear • 1v1 Endless Runner + Onchain Betting on Base",
  description: "Bet crypto. Race friends. Winner takes the pot. NFT skins with insane glitch visuals. Fully onchain on Base.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  openGraph: {
    title: "RiftTear • Rift the Reality on Base",
    description: "High-stakes 1v1 runner with live escrow betting. Deployed on Base mainnet.",
    images: [{ url: "https://riftttear.base/og.jpg" }],
  },
};

const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0052FF" />
      </head>
      <body className={inter.className}>
        <WagmiProvider config={WagmiConfig}>
          <QueryClientProvider client={queryClient}>
            <OnchainKitProvider
              chain={base}
              projectId={process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_ID!}
            >
              {children}
            </OnchainKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
