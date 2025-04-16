"use client";

import { ListMusic, X } from "lucide-react";
import { useState } from "react";
import { usePlayer } from "@/context/PlayerContext";
import MusicItem from "./MusicItem";

export default function PlaylistToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const { playlist, currentTrack } = usePlayer();

  if (!currentTrack) return null;

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-20 right-4 p-3 bg-white dark:bg-neutral-800 rounded-full shadow-lg z-50 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
      >
        {isOpen ? <X size={24} /> : <ListMusic size={24} />}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-4 w-80 max-h-[60vh] bg-white dark:bg-neutral-800 rounded-xl shadow-xl z-40 overflow-hidden">
          <div className="p-4 border-b border-neutral-200 dark:border-neutral-700">
            <h3 className="font-semibold">Playlist</h3>
          </div>
          <div className="overflow-y-auto max-h-[calc(60vh-3rem)]">
            {playlist.map((track) => (
              <div
                key={track.id}
                className={`p-3 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer ${
                  track.id === currentTrack.id
                    ? "bg-neutral-100 dark:bg-neutral-700"
                    : ""
                }`}
              >
                <MusicItem track={track} allTracks={playlist} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
} 