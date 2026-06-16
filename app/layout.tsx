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
  description: "Bet crypto. Race friends. Winner takes the pot. NFT skins + reality-breaking glitch visuals. Fully onchain on Base.",
  icons: {
    icon: "/favicon.ico",
  },
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
      <body className={inter.className}>
        <WagmiProvider config={WagmiConfig}>
          <QueryClientProvider client={queryClient}>
            <OnchainKitProvider
              chain={base}
              projectId={process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_ID!}
            >
              {children}
              {/* Production badge */}
              <div className="fixed bottom-3 left-1/2 -translate-x-1/2 text-[10px] font-mono bg-black/80 px-4 py-1 border border-[#0052FF]/30 text-[#0052FF]">
                🟢 LIVE ON BASE MAINNET • COMMIT 42/100 • FULLY DEPLOYABLE
              </div>
            </OnchainKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
