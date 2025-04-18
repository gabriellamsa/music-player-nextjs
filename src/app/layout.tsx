import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import { PlayerProvider } from "@/context/PlayerContext";
import PlayerContainer from "@/components/music/PlayerContainer";
import NowPlayingView from "@/components/music/NowPlayingView";

const font = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Music App",
  description: "Next.js App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className} antialiased`}>
        <PlayerProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 relative">
              <div className="max-w-7xl mx-auto w-full transition-all duration-300">
                {children}
              </div>
              <NowPlayingView />
            </main>
            <PlayerContainer />
          </div>
        </PlayerProvider>
      </body>
    </html>
  );
}
