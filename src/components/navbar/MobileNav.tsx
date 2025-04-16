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
    <div className="absolute top-16 left-0 w-full bg-white shadow-md border-t border-gray-100 z-50 flex flex-col px-6 py-4 gap-4 md:hidden">
      <Link
        href="/"
        className={`text-gray-700 hover:text-gray-900 transition-colors ${
          isActive("/") ? "text-gray-900 font-semibold" : ""
        }`}
      >
        Home
      </Link>
      <Link
        href="/browse"
        className={`text-gray-700 hover:text-gray-900 transition-colors ${
          isActive("/browse") ? "text-gray-900 font-semibold" : ""
        }`}
      >
        Browse
      </Link>
      <Link
        href="/library"
        className={`text-gray-700 hover:text-gray-900 transition-colors ${
          isActive("/library") ? "text-gray-900 font-semibold" : ""
        }`}
      >
        Library
      </Link>
    </div>
  );
}
