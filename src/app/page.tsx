import MusicList from "@/components/music/MusicList";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-white mb-8 text-center sm:text-left">
          Trending Now
        </h1>
        <MusicList />
      </div>
    </main>
  );
}
