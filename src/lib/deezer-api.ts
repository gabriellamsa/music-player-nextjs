export async function searchTracks(query: string) {
  const res = await fetch(`/api/deezer?q=${encodeURIComponent(query)}`);
  if (!res.ok) {
    throw new Error("Failed to fetch from local Deezer API route");
  }

  const data = await res.json();
  return data;
}
