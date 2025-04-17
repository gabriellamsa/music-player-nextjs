"use client";

import { Heart, Play } from "lucide-react";
import { usePlayer } from "@/context/PlayerContext";
import { motion } from "framer-motion";

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
    <motion.div
      onClick={() => playTrack(track, allTracks)}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="group cursor-pointer bg-neutral-900/50 backdrop-blur-sm rounded-lg p-4 flex items-center gap-4 hover:bg-neutral-800/50 transition-all duration-200 border border-neutral-800/50 hover:border-neutral-700/50"
    >
      <div className="relative">
        <img
          src={track.album.cover_medium}
          alt={track.title}
          className="w-16 h-16 rounded-lg object-cover shadow-lg group-hover:shadow-xl transition-shadow duration-200"
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center backdrop-blur-sm"
        >
          <Play size={24} className="text-white" />
        </motion.div>
      </div>
      
      <div className="flex-1 min-w-0">
        <p className="text-base font-semibold text-white truncate">{track.title}</p>
        <p className="text-sm text-neutral-400 truncate">{track.artist.name}</p>
      </div>
      
      <div className="flex gap-3">
        <motion.button
          onClick={handleLibraryClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`p-2 rounded-full transition-colors ${
            isInUserLibrary
              ? "text-red-500 hover:text-red-400"
              : "text-neutral-400 hover:text-white"
          }`}
        >
          <Heart 
            size={20} 
            fill={isInUserLibrary ? "currentColor" : "none"} 
            className="transition-transform duration-200 group-hover:scale-110"
          />
        </motion.button>
        
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            playTrack(track, allTracks);
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-700/50 transition-colors"
        >
          <Play size={20} />
        </motion.button>
      </div>
    </motion.div>
  );
}
