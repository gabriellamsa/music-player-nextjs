"use client";

import { Pause, Play, SkipBack, SkipForward } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { usePlayer } from "@/context/PlayerContext";

interface MusicPlayerProps {
  track: any;
}

export default function MusicPlayer({ track }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(30);
  const { playNext, playPrevious } = usePlayer();

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      setProgress(0);
      setIsPlaying(false);
      setDuration(30);
    }
  }, [track]);

  useEffect(() => {
    const interval = setInterval(() => {
      const audio = audioRef.current;
      if (audio && isPlaying) {
        setProgress(audio.currentTime);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // autoplay
  const handleLoaded = () => {
    const audio = audioRef.current;
    if (audio) {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setDuration(audio.duration || 30);
        })
        .catch((err) => console.warn("Playback error:", err.message));
    }
  };

  // manual
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.warn("Playback error:", err.message));
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setProgress(time);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="fixed bottom-0 w-full bg-white dark:bg-neutral-900 border-t border-gray-200 dark:border-neutral-700 p-2 shadow-xl z-30">
      <audio
        ref={audioRef}
        src={track.preview}
        preload="metadata"
        onLoadedMetadata={handleLoaded}
      />

      <div className="flex items-center justify-between gap-4 max-w-5xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <img
            src={track.album.cover_small}
            alt={track.title}
            className="w-10 h-10 rounded-md object-cover"
          />
          <div className="truncate">
            <p className="font-semibold text-sm truncate">{track.title}</p>
            <p className="text-xs text-gray-500 truncate">
              {track.artist.name}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={playPrevious} className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full">
            <SkipBack size={18} />
          </button>

          <motion.button
            onClick={togglePlay}
            whileTap={{ scale: 0.9 }}
            animate={
              isPlaying
                ? {
                    scale: [1, 1.1, 1],
                    transition: { duration: 1, repeat: Infinity },
                  }
                : {}
            }
            className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </motion.button>

          <button onClick={playNext} className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full">
            <SkipForward size={18} />
          </button>
        </div>

        <div className="flex items-center gap-2 w-1/3">
          <span className="text-xs text-gray-500 w-10 text-right">
            {formatTime(progress)}
          </span>
          <input
            type="range"
            min={0}
            max={duration}
            value={progress}
            onChange={handleSeek}
            className="w-full accent-pink-500"
          />
          <span className="text-xs text-gray-500 w-10">
            {formatTime(duration)}
          </span>
        </div>
      </div>
    </div>
  );
}
