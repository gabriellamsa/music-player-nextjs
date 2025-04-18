"use client";

import {
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
  Mic2,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { usePlayer } from "@/context/PlayerContext";
import { DeezerTrack } from "@/types/deezer";
import Image from "next/image";

interface MusicPlayerProps {
  track: DeezerTrack;
}

export default function MusicPlayer({ track }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(30);
  const [volume, setVolume] = useState(1);
  const { playNext, playPrevious, isLyricsVisible, toggleLyrics } = usePlayer();

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

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
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
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-0 w-full bg-gradient-to-r from-neutral-900/95 to-black/95 backdrop-blur-md border-t border-neutral-800/50 p-4 shadow-2xl z-30"
    >
      <audio
        ref={audioRef}
        src={track.preview}
        preload="metadata"
        onLoadedMetadata={handleLoaded}
      />

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-4 w-full md:w-auto md:flex-1">
          <motion.div className="relative w-12 h-12">
            <Image
              src={track.album.cover}
              alt={track.title}
              width={48}
              height={48}
              className="rounded-md object-cover shadow-lg"
            />
          </motion.div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-white truncate text-sm md:text-base">
              {track.title}
            </p>
            <p className="text-xs md:text-sm text-neutral-400 truncate">
              {track.artist.name}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 w-full md:w-auto md:flex-1">
          <div className="flex items-center gap-4 md:gap-6">
            <motion.button
              onClick={playPrevious}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 hover:bg-neutral-800 rounded-full transition-colors"
            >
              <SkipBack size={20} className="text-neutral-400" />
            </motion.button>

            <motion.button
              onClick={togglePlay}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              animate={
                isPlaying
                  ? {
                      scale: [1, 1.1, 1],
                      transition: { duration: 1, repeat: Infinity },
                    }
                  : {}
              }
              className="p-3 rounded-full bg-white hover:bg-neutral-200 transition-colors shadow-lg"
            >
              {isPlaying ? (
                <Pause size={24} className="text-black" />
              ) : (
                <Play size={24} className="text-black" />
              )}
            </motion.button>

            <motion.button
              onClick={playNext}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 hover:bg-neutral-800 rounded-full transition-colors"
            >
              <SkipForward size={20} className="text-neutral-400" />
            </motion.button>

            <motion.button
              onClick={toggleLyrics}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`p-2 rounded-full transition-colors ${
                isLyricsVisible ? "bg-green-500/20" : "hover:bg-neutral-800"
              }`}
            >
              <Mic2
                size={20}
                className={
                  isLyricsVisible ? "text-green-500" : "text-neutral-400"
                }
              />
            </motion.button>
          </div>

          <div className="flex items-center gap-2 w-full max-w-md">
            <span className="text-xs text-neutral-400 w-10 text-right">
              {formatTime(progress)}
            </span>
            <input
              type="range"
              min={0}
              max={duration}
              value={progress}
              onChange={handleSeek}
              className="w-full h-1 bg-neutral-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:hover:scale-110 [&::-webkit-slider-thumb]:transition-transform"
            />
            <span className="text-xs text-neutral-400 w-10">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2 flex-1 justify-end">
          <Volume2 size={20} className="text-neutral-400" />
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={handleVolumeChange}
            className="w-24 h-1 bg-neutral-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:hover:scale-110 [&::-webkit-slider-thumb]:transition-transform"
          />
        </div>
      </div>
    </motion.div>
  );
}
