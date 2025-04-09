"use client";

import Link from "next/link";

type Props = {
  isOpen: boolean;
};

export default function MobileNav({ isOpen }: Props) {
  if (!isOpen) return null;

  return (
    <div className="absolute top-16 left-0 w-full bg-white shadow-md border-t border-gray-100 z-50 flex flex-col px-6 py-4 gap-4 md:hidden">
      <Link href="#">Home</Link>
      <Link href="#">Browse</Link>
      <Link href="#">Library</Link>
    </div>
  );
}
