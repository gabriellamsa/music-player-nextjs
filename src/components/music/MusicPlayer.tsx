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
    <div className="fixed bottom-0 w-full bg-white dark:bg-neutral-900 border-t border-gray-200 dark:border-neutral-700 p-4 shadow-xl z-50">
      <audio
        ref={audioRef}
        src={track.preview}
        preload="metadata"
        onLoadedMetadata={handleLoaded}
      />

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 max-w-5xl mx-auto w-full">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <img
            src={track.album.cover_small}
            alt={track.title}
            className="w-12 h-12 rounded-md object-cover"
          />
          <div className="truncate">
            <p className="font-semibold text-sm truncate">{track.title}</p>
            <p className="text-xs text-gray-500 truncate">
              {track.artist.name}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center w-full md:flex-1 md:max-w-md">
          <div className="flex items-center justify-center gap-6">
            <button onClick={playPrevious}>
              <SkipBack size={20} />
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
              className="p-2 rounded-full"
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </motion.button>

            <button onClick={playNext}>
              <SkipForward size={20} />
            </button>
          </div>

          <div className="flex items-center gap-2 w-full mt-2">
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
    </div>
  );
}
