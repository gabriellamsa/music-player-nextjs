export interface DeezerTrack {
  id: number;
  title: string;
  duration: number;
  preview: string;
  artist: {
    id: number;
    name: string;
    picture: string;
  };
  album: {
    id: number;
    title: string;
    cover: string;
    cover_small: string;
    cover_medium: string;
    cover_big: string;
  };
}

export interface DeezerSearchResponse {
  data: DeezerTrack[];
  total: number;
  next?: string;
}

export interface PlayerState {
  currentTrack: DeezerTrack | null;
  isPlaying: boolean;
  volume: number;
  duration: number;
  currentTime: number;
  queue: DeezerTrack[];
} 