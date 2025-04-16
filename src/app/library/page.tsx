"use client";

import { usePlayer } from "@/context/PlayerContext";
import MusicItem from "@/components/music/MusicItem";

export default function LibraryPage() {
  const { library } = usePlayer();

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-[#121212]">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-6">
          Your Library
        </h1>
        {library.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-neutral-600 dark:text-neutral-400">
              Your library is empty. Start adding songs by clicking the heart icon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {library.map((track) => (
              <MusicItem key={track.id} track={track} allTracks={library} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
} 