export interface DeezerArtist {
  id: number;
  name: string;
  link: string;
  picture: string;
  picture_small: string;
  picture_medium: string;
  picture_big: string;
  picture_xl: string;
  tracklist: string;
  type: string;
}

export interface DeezerAlbum {
  id: number;
  title: string;
  cover: string;
  cover_small: string;
  cover_medium: string;
  cover_big: string;
  cover_xl: string;
  md5_image: string;
  tracklist: string;
  type: string;
}

export interface DeezerTrack {
  id: number;
  readable: boolean;
  title: string;
  title_short: string;
  title_version: string;
  link: string;
  duration: number;
  rank: number;
  explicit_lyrics: boolean;
  explicit_content_lyrics: number;
  explicit_content_cover: number;
  preview: string;
  md5_image: string;
  artist: DeezerArtist;
  album: DeezerAlbum;
  type: string;
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
  playlist: DeezerTrack[];
  library: DeezerTrack[];
  isLyricsVisible: boolean;
}

export interface PlayerContextType {
  currentTrack: DeezerTrack | null;
  playlist: DeezerTrack[];
  library: DeezerTrack[];
  setCurrentTrack: (track: DeezerTrack | null) => void;
  playTrack: (track: DeezerTrack, playlist?: DeezerTrack[]) => void;
  playNext: () => void;
  playPrevious: () => void;
  addToLibrary: (track: DeezerTrack) => void;
  removeFromLibrary: (trackId: number) => void;
  isInLibrary: (trackId: number) => boolean;
  isLyricsVisible: boolean;
  toggleLyrics: () => void;
} 