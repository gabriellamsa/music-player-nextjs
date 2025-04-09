"use client";

import { usePlayer } from "@/context/PlayerContext";
import MusicPlayer from "./MusicPlayer";

export default function PlayerContainer() {
  const { currentTrack } = usePlayer();

  if (!currentTrack) return null;

  return <MusicPlayer track={currentTrack} />;
}
