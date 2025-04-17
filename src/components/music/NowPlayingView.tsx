"use client";

import { usePlayer } from "@/context/PlayerContext";
import PlaylistToggle from "./PlaylistToggle";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function NowPlayingView() {
  const { currentTrack } = usePlayer();
  const [isMinimized, setIsMinimized] = useState(false);

  if (!currentTrack) return null;

  return (
    <>
      <div 
        className={`fixed right-0 top-16 h-[calc(100vh-8rem)] w-full md:w-1/3 bg-neutral-100 dark:bg-neutral-800 border-l border-neutral-200 dark:border-neutral-700 p-6 overflow-y-auto transition-transform duration-300 ${
          isMinimized ? 'translate-x-full' : 'translate-x-0'
        }`}
      >
        <button
          onClick={() => setIsMinimized(!isMinimized)}
          className="absolute top-2 right-2 p-2 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
        >
          {isMinimized ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
        </button>
        
        <div className="flex flex-col items-center gap-6">
          <img
            src={currentTrack.album.cover_big}
            alt={currentTrack.title}
            className="w-48 h-48 md:w-64 md:h-64 rounded-xl object-cover shadow-lg"
          />
          
          <div className="text-center">
            <h2 className="text-xl md:text-2xl font-bold mb-2">{currentTrack.title}</h2>
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400">
              {currentTrack.artist.name}
            </p>
          </div>

          <div className="w-full">
            <h3 className="text-base md:text-lg font-semibold mb-4">Lyrics</h3>
            <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400">
              Lyrics will be displayed here when available.
            </p>
          </div>
        </div>
      </div>

      {isMinimized && (
        <button
          onClick={() => setIsMinimized(false)}
          className="fixed right-0 top-1/2 -translate-y-1/2 p-2.5 rounded-l-lg bg-neutral-100/80 dark:bg-neutral-800/80 backdrop-blur-sm border border-r-0 border-neutral-200/50 dark:border-neutral-700/50 hover:bg-neutral-200/90 dark:hover:bg-neutral-700/90 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <ChevronLeft size={20} className="text-neutral-600 dark:text-neutral-400" />
        </button>
      )}

      <PlaylistToggle />
    </>
  );
} 