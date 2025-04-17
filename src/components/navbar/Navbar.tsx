"use client";

import ResponsiveNav from "./ResponsiveNav";

export default function Navbar() {
  return (
    <nav className="w-full bg-gradient-to-r from-neutral-900 to-black border-b border-neutral-800 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <ResponsiveNav />
      </div>
    </nav>
  );
}
