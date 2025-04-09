"use client";

import { createContext, useContext, useState, ReactNode } from "react";

const PlayerContext = createContext<any>(null);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playTrack = (track: any) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        setIsPlaying,
        playTrack,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  return useContext(PlayerContext);
}
