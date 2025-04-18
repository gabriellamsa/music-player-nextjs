"use client";

import { useEffect, useState } from "react";
import { searchTracks } from "@/lib/deezer-api";
import MusicItem from "@/components/music/MusicItem";
import { DeezerTrack } from "@/types/deezer";

export default function BrowsePage() {
  const [tracks, setTracks] = useState<DeezerTrack[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTracks() {
      try {
        const results = await searchTracks("popular");
        setTracks(results);
      } catch (error) {
        console.error("Error fetching tracks:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTracks();
  }, []);

  if (loading) return <div className="p-4">Loading tracks...</div>;

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-[#121212]">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-6">
          Browse Popular Music
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {tracks.map((track) => (
            <MusicItem key={track.id} track={track} allTracks={tracks} />
          ))}
        </div>
      </div>
    </main>
  );
} 