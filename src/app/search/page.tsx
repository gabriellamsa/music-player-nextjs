"use client";

import { useState } from "react";
import { searchTracks } from "@/lib/deezer-api";
import MusicItem from "@/components/music/MusicItem";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { DeezerTrack } from "@/types/deezer";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [tracks, setTracks] = useState<DeezerTrack[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const results = await searchTracks(query);
      setTracks(results);
    } catch (error) {
      console.error("Error searching tracks:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-900 to-black p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <form onSubmit={handleSearch} className="mb-8">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for artists, songs, or albums..."
              className="w-full bg-neutral-800/50 border border-neutral-700 rounded-lg py-3 px-4 pl-12 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={20} />
          </div>
        </form>

        {loading ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {tracks.map((track, index) => (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <MusicItem track={track} allTracks={tracks} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
} 