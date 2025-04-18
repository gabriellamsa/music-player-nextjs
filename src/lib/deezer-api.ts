import { DeezerTrack } from "@/types/deezer";

export async function searchTracks(query: string): Promise<DeezerTrack[]> {
  try {
    const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
    
    if (!response.ok) {
      throw new Error("Failed to fetch from local API route");
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("Error searching tracks:", error);
    return [];
  }
}
