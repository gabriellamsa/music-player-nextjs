import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import { PlayerProvider } from "@/context/PlayerContext";
import PlayerContainer from "@/components/music/PlayerContainer";

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
          <Header />
          {children}
          <PlayerContainer />
        </PlayerProvider>
      </body>
    </html>
  );
}
