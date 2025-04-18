"use client";

import { usePlayer } from "@/context/PlayerContext";
import PlaylistToggle from "./PlaylistToggle";
import { Music2, Mic2 } from "lucide-react";
import Image from "next/image";

export default function NowPlayingView() {
  const { currentTrack, isLyricsVisible } = usePlayer();

  if (!currentTrack) return null;

  return (
    <>
      <div 
        className={`fixed bottom-0 left-0 right-0 bg-gradient-to-b from-neutral-900 to-black border-t border-neutral-800 transition-all duration-300 ${
          isLyricsVisible 
            ? 'h-[calc(100vh-4rem)] sm:h-[calc(100vh-5rem)] opacity-100' 
            : 'h-0 opacity-0'
        }`}
      >
        <div className="h-full overflow-y-auto">
          <div className="flex flex-col items-center gap-4 sm:gap-6 md:gap-8 p-4 sm:p-6">
            <div className="relative group">
              <Image
                src={currentTrack.album.cover}
                alt={currentTrack.title}
                width={256}
                height={256}
                className="rounded-xl object-cover shadow-2xl group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center">
                <Music2 size={40} className="text-white" />
              </div>
            </div>
            
            <div className="text-center w-full">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">{currentTrack.title}</h2>
              <p className="text-base sm:text-lg text-neutral-400">
                {currentTrack.artist.name}
              </p>
            </div>

            <div className="w-full max-w-2xl mx-auto">
              <div className="flex items-center gap-2 mb-2 sm:mb-4">
                <Mic2 size={20} className="text-neutral-400" />
                <h3 className="text-base sm:text-lg font-semibold text-white">Song Lyrics</h3>
              </div>
              <div className="bg-neutral-900/50 rounded-lg p-3 sm:p-4">
                <p className="text-sm sm:text-base text-neutral-400 text-center">
                  Lyrics will be displayed here when available.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PlaylistToggle />
    </>
  );
} 