"use client";

import { usePlayer } from "@/context/PlayerContext";
import PlaylistToggle from "./PlaylistToggle";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Music2, Mic2 } from "lucide-react";

export default function NowPlayingView() {
  const { currentTrack } = usePlayer();
  const [isMinimized, setIsMinimized] = useState(false);

  if (!currentTrack) return null;

  return (
    <>
      <div 
        className={`fixed right-0 top-16 h-[calc(100vh-8rem)] w-full md:w-1/3 bg-gradient-to-b from-neutral-900 to-black border-l border-neutral-800 p-6 overflow-y-auto transition-transform duration-300 ${
          isMinimized ? 'translate-x-full' : 'translate-x-0'
        }`}
      >
        <button
          onClick={() => setIsMinimized(!isMinimized)}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-neutral-800 transition-colors"
        >
          {isMinimized ? <ChevronLeft size={24} className="text-neutral-400" /> : <ChevronRight size={24} className="text-neutral-400" />}
        </button>
        
        <div className="flex flex-col items-center gap-8">
          <div className="relative group">
            <img
              src={currentTrack.album.cover_big}
              alt={currentTrack.title}
              className="w-64 h-64 rounded-xl object-cover shadow-2xl group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center">
              <Music2 size={40} className="text-white" />
            </div>
          </div>
          
          <div className="text-center w-full">
            <h2 className="text-2xl font-bold text-white mb-2">{currentTrack.title}</h2>
            <p className="text-lg text-neutral-400">
              {currentTrack.artist.name}
            </p>
          </div>

          <div className="w-full">
            <div className="flex items-center gap-2 mb-4">
              <Mic2 size={20} className="text-neutral-400" />
              <h3 className="text-lg font-semibold text-white">Song Lyrics</h3>
            </div>
            <div className="bg-neutral-900/50 rounded-lg p-4">
              <p className="text-neutral-400 text-center">
                Lyrics will be displayed here when available.
              </p>
            </div>
          </div>
        </div>
      </div>

      {isMinimized && (
        <button
          onClick={() => setIsMinimized(false)}
          className="fixed right-0 top-1/2 -translate-y-1/2 p-2.5 rounded-l-lg bg-neutral-900/80 backdrop-blur-sm border border-r-0 border-neutral-800/50 hover:bg-neutral-800/90 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <ChevronLeft size={20} className="text-neutral-400" />
        </button>
      )}

      <PlaylistToggle />
    </>
  );
} 