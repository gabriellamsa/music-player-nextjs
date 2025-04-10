"use client";

import { Play } from "lucide-react";
import { usePlayer } from "@/context/PlayerContext";

interface MusicItemProps {
  track: any;
}

export default function MusicItem({ track }: MusicItemProps) {
  const { playTrack } = usePlayer();

  return (
    <div className="bg-white dark:bg-neutral-900/70 rounded-xl shadow-sm p-4 flex items-center gap-4 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition">
      <img
        src={track.album.cover_medium}
        alt={track.title}
        className="w-16 h-16 rounded-xl object-cover"
      />
      <div className="flex-1">
        <p className="text-base font-semibold">{track.title}</p>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          {track.artist.name}
        </p>
      </div>
      <button
        onClick={() => playTrack(track)}
        className="p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 transition"
      >
        <Play size={18} className="text-black dark:text-white" />
      </button>
    </div>
  );
}
