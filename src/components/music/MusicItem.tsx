"use client";

import { Heart, Play } from "lucide-react";
import { usePlayer } from "@/context/PlayerContext";

interface MusicItemProps {
  track: any;
  allTracks: any[];
}

export default function MusicItem({ track, allTracks }: MusicItemProps) {
  const { playTrack, addToLibrary, removeFromLibrary, isInLibrary } = usePlayer();
  const isInUserLibrary = isInLibrary(track.id);

  const handleLibraryClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInUserLibrary) {
      removeFromLibrary(track.id);
    } else {
      addToLibrary(track);
    }
  };

  return (
    <div
      onClick={() => playTrack(track, allTracks)}
      className="cursor-pointer bg-white dark:bg-neutral-900 rounded-2xl shadow-md p-4 flex items-center gap-4 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
    >
      <img
        src={track.album.cover_medium}
        alt={track.title}
        className="w-16 h-16 rounded-xl object-cover"
      />
      <div className="flex-1">
        <p className="text-base font-semibold">{track.title}</p>
        <p className="text-sm text-neutral-500">{track.artist.name}</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={handleLibraryClick}
          className={`p-2 rounded-full transition-colors ${
            isInUserLibrary
              ? "text-red-500 hover:text-red-600"
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          <Heart size={20} fill={isInUserLibrary ? "currentColor" : "none"} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            playTrack(track, allTracks);
          }}
          className="p-2 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700"
        >
          <Play size={20} />
        </button>
      </div>
    </div>
  );
}
