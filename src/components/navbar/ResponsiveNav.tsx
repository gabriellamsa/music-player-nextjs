"use client";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import MobileNav from "./MobileNav";

export default function ResponsiveNav() {
  const [isOpen, setIosOpen] = useState(false);

  return (
    <div className="flex items-center justify-between">
      <Link href="/" className="text-2xl font-bold text-gray-800">
        MusicApp
      </Link>

      <div className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
        <Link href="#">Home</Link>
        <Link href="#">Browse</Link>
        <Link href="#">Library</Link>
      </div>

      <button
        className="md:hidden p-2 text-gray-700"
        onClick={() => setIosOpen(!isOpen)}
        aria-label="Toggle Menu"
      >
        <Menu className="h-6 w-6" />
      </button>

      <MobileNav isOpen={isOpen} />
    </div>
  );
}
