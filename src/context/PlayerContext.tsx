"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface PlayerContextType {
  currentTrack: any | null;
  playlist: any[];
  library: any[];
  setCurrentTrack: (track: any | null) => void;
  playTrack: (track: any, playlist?: any[]) => void;
  playNext: () => void;
  playPrevious: () => void;
  addToLibrary: (track: any) => void;
  removeFromLibrary: (trackId: number) => void;
  isInLibrary: (trackId: number) => boolean;
  isLyricsVisible: boolean;
  toggleLyrics: () => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<any | null>(null);
  const [playlist, setPlaylist] = useState<any[]>([]);
  const [library, setLibrary] = useState<any[]>([]);
  const [isLyricsVisible, setIsLyricsVisible] = useState(false);

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

  const addToLibrary = (track: any) => {
    if (!library.some((t) => t.id === track.id)) {
      setLibrary([...library, track]);
    }
  };

  const removeFromLibrary = (trackId: number) => {
    setLibrary(library.filter((track) => track.id !== trackId));
  };

  const isInLibrary = (trackId: number) => {
    return library.some((track) => track.id === trackId);
  };

  const toggleLyrics = () => {
    setIsLyricsVisible(!isLyricsVisible);
  };

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        playlist,
        library,
        setCurrentTrack,
        playTrack,
        playNext,
        playPrevious,
        addToLibrary,
        removeFromLibrary,
        isInLibrary,
        isLyricsVisible,
        toggleLyrics,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
}
