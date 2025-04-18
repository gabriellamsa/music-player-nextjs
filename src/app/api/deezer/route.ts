import { DeezerSearchResponse } from '@/types/deezer';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return new Response(JSON.stringify({ error: "Query is required" }), {
      status: 400,
    });
  }

  try {
    const res = await fetch(`https://api.deezer.com/search?q=${query}`);
    const data: DeezerSearchResponse = await res.json();

    return new Response(JSON.stringify(data.data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch {
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
    });
  }
}