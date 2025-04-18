"use client";
import { Menu, Music } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import MobileNav from "./MobileNav";
import { usePathname } from "next/navigation";

export default function ResponsiveNav() {
  const [isOpen, setIosOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <div className="flex items-center justify-between h-16">
      <Link 
        href="/" 
        className="flex items-center gap-2 text-xl font-bold text-white hover:text-neutral-300 transition-colors"
      >
        <Music size={24} className="text-green-500" />
        <span>MusicApp</span>
      </Link>

      <div className="hidden md:flex items-center gap-8 text-sm font-medium">
        <Link
          href="/"
          className={`text-neutral-400 hover:text-white transition-colors ${
            isActive("/") ? "text-white font-semibold" : ""
          }`}
        >
          Home
        </Link>
        <Link
          href="/search"
          className={`text-neutral-400 hover:text-white transition-colors ${
            isActive("/search") ? "text-white font-semibold" : ""
          }`}
        >
          Search
        </Link>
        <Link
          href="/browse"
          className={`text-neutral-400 hover:text-white transition-colors ${
            isActive("/browse") ? "text-white font-semibold" : ""
          }`}
        >
          Browse
        </Link>
        <Link
          href="/library"
          className={`text-neutral-400 hover:text-white transition-colors ${
            isActive("/library") ? "text-white font-semibold" : ""
          }`}
        >
          Library
        </Link>
      </div>

      <button
        className="md:hidden p-2 text-neutral-400 hover:text-white transition-colors"
        onClick={() => setIosOpen(!isOpen)}
        aria-label="Toggle Menu"
      >
        <Menu className="h-6 w-6" />
      </button>

      <MobileNav isOpen={isOpen} />
    </div>
  );
}
