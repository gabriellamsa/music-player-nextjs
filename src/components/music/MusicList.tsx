"use client";

import { useEffect, useState } from "react";
import { searchTracks } from "@/lib/deezer-api";
import MusicItem from "./MusicItem";

export default function MusicList() {
  const [tracks, setTracks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTracks() {
      try {
        const results = await searchTracks("benson boone"); // inicial search
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {tracks.map((track) => (
        <MusicItem key={track.id} track={track} />
      ))}
    </div>
  );
}
