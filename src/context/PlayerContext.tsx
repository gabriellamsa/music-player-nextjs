"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { DeezerTrack } from "@/types/deezer";

interface PlayerContextType {
  currentTrack: DeezerTrack | null;
  playlist: DeezerTrack[];
  library: DeezerTrack[];
  setCurrentTrack: (track: DeezerTrack | null) => void;
  playTrack: (track: DeezerTrack, playlist?: DeezerTrack[]) => void;
  playNext: () => void;
  playPrevious: () => void;
  addToLibrary: (track: DeezerTrack) => void;
  removeFromLibrary: (trackId: number) => void;
  isInLibrary: (trackId: number) => boolean;
  isLyricsVisible: boolean;
  toggleLyrics: () => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<DeezerTrack | null>(null);
  const [playlist, setPlaylist] = useState<DeezerTrack[]>([]);
  const [library, setLibrary] = useState<DeezerTrack[]>([]);
  const [isLyricsVisible, setIsLyricsVisible] = useState(false);

  const playTrack = (track: DeezerTrack, list?: DeezerTrack[]) => {
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

  const addToLibrary = (track: DeezerTrack) => {
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
