"use client";

import { createContext, useContext, useState } from "react";

interface PlayerContextType {
  currentTrack: any;
  playlist: any[];
  library: any[];
  playTrack: (track: any, playlist?: any[]) => void;
  playNext: () => void;
  playPrevious: () => void;
  addToLibrary: (track: any) => void;
  removeFromLibrary: (trackId: number) => void;
  isInLibrary: (trackId: number) => boolean;
}

const PlayerContext = createContext<PlayerContextType>({
  currentTrack: null,
  playlist: [],
  library: [],
  playTrack: () => {},
  playNext: () => {},
  playPrevious: () => {},
  addToLibrary: () => {},
  removeFromLibrary: () => {},
  isInLibrary: () => false,
});

export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentTrack, setCurrentTrack] = useState<any | null>(null);
  const [playlist, setPlaylist] = useState<any[]>([]);
  const [library, setLibrary] = useState<any[]>([]);

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

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        playlist,
        library,
        playTrack,
        playNext,
        playPrevious,
        addToLibrary,
        removeFromLibrary,
        isInLibrary,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => useContext(PlayerContext);
