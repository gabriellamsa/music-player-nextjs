"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  isOpen: boolean;
};

export default function MobileNav({ isOpen }: Props) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  if (!isOpen) return null;

  return (
    <div className="absolute top-16 left-0 w-full bg-neutral-900 shadow-lg border-t border-neutral-800 z-50 flex flex-col px-6 py-4 gap-4 md:hidden">
      <Link
        href="/"
        className={`text-neutral-400 hover:text-white transition-colors ${
          isActive("/") ? "text-white font-semibold" : ""
        }`}
      >
        Home
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
  );
}
