"use client";

import { Pause, Play, SkipBack, SkipForward } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface MusicPlayerProps {
  track: any;
}

export default function MusicPlayer({ track }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (audioRef.current) {
        setProgress(audioRef.current.currentTime);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setProgress(time);
    }
  };

  return (
    <div className="fixed bottom-0 w-full bg-white dark:bg-neutral-900 border-t border-gray-200 dark:border-neutral-700 p-4 shadow-xl z-50">
      <audio ref={audioRef} src={track.preview} preload="metadata" />

      <div className="flex items-center justify-between gap-4 max-w-4xl mx-auto">
        <div className="flex items-center gap-4">
          <img
            src={track.album.cover_small}
            alt={track.title}
            className="w-12 h-12 rounded-md object-cover"
          />
          <div>
            <p className="font-semibold text-sm">{track.title}</p>
            <p className="text-xs text-gray-500">{track.artist.name}</p>
          </div>
        </div>

        <div className="flex flex-col items-center flex-1 max-w-md">
          <div className="flex items-center gap-6">
            <button>
              <SkipBack size={20} />
            </button>
            <button onClick={() => setIsPlaying(!isPlaying)}>
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>

            <button>
              <SkipForward size={20} />
            </button>
          </div>

          <input
            type="range"
            min={0}
            max={30}
            value={progress}
            onChange={handleSeek}
            className="w-full mt-2"
          />
        </div>
      </div>
    </div>
  );
}
