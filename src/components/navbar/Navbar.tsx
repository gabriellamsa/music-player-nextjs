"use client";

import ResponsiveNav from "./ResponsiveNav";

export default function Navbar() {
  return (
    <nav className="w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <ResponsiveNav />
      </div>
    </nav>
  );
}
