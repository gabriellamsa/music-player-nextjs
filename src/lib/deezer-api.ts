export async function searchTracks(query: string) {
  const res = await fetch(`https://api.deezer.com/search?q=${query}`);
  if (!res.ok) {
    throw new Error("Failed to fetch from Deezer API");
  }

  const data = await res.json();
  return data.data; 
}
