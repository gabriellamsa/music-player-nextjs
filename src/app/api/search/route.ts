import { NextResponse } from "next/server";
import { DeezerSearchResponse } from "@/types/deezer";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json({ error: "Query parameter is required" }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://api.deezer.com/search?q=${encodeURIComponent(query)}&limit=50`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch from Deezer API");
    }

    const data: DeezerSearchResponse = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error searching tracks:", error);
    return NextResponse.json(
      { error: "Failed to search tracks" },
      { status: 500 }
    );
  }
} 