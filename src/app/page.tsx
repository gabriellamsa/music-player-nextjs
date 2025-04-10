import MusicList from "@/components/music/MusicList";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-[#121212]">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-6">
          Trending Now
        </h1>
        <MusicList />
      </div>
    </main>
  );
}
