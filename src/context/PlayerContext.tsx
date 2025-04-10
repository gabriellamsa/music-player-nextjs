"use client";

import { createContext, useContext, useState } from "react";

interface PlayerContextType {
  currentTrack: any;
  playlist: any[];
  playTrack: (track: any, playlist?: any[]) => void;
  playNext: () => void;
  playPrevious: () => void;
}

const PlayerContext = createContext<PlayerContextType>({
  currentTrack: null,
  playlist: [],
  playTrack: () => {},
  playNext: () => {},
  playPrevious: () => {},
});

export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentTrack, setCurrentTrack] = useState<any | null>(null);
  const [playlist, setPlaylist] = useState<any[]>([]);

  const playTrack = (track: any, list?: any[]) => {
    setCurrentTrack(track);
    if (list) setPlaylist(list);
  };

  const playNext = () => {
    if (!currentTrack || playlist.length === 0) return;
    const currentIndex = playlist.findIndex((t) => t.id === currentTrack.id);
    const nextTrack = playlist[currentIndex + 1];
    if (nextTrack) setCurrentTrack(nextTrack);
  };

  const playPrevious = () => {
    if (!currentTrack || playlist.length === 0) return;
    const currentIndex = playlist.findIndex((t) => t.id === currentTrack.id);
    const previousTrack = playlist[currentIndex - 1];
    if (previousTrack) setCurrentTrack(previousTrack);
  };

  return (
    <PlayerContext.Provider
      value={{ currentTrack, playlist, playTrack, playNext, playPrevious }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => useContext(PlayerContext);
