"use client";

import { Play } from "lucide-react";
import { usePlayer } from "@/context/PlayerContext";

interface MusicItemProps {
  track: any;
  allTracks: any[];
}

export default function MusicItem({ track, allTracks }: MusicItemProps) {
  const { playTrack } = usePlayer();

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
  );
}
