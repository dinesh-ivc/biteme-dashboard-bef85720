'use client';

import Link from 'next/link';

export default function NavigationBar({ ingredientOfDay, dayNumber }) {
  return (
    <nav className="sticky top-0 z-50 bg-[#FFFF77] border-b border-[#CA1E08]">
      {/* Desktop & Tablet Layout */}
      <div className="hidden md:flex items-center justify-between px-6 h-16">
        <Link href="/" className="text-[#8E1606] font-bold text-lg hover:opacity-80 transition-opacity">
          Home :)
        </Link>
        <div className="text-[#8E1606] font-bold text-base">
          Today's Ingredient: {ingredientOfDay} • Day {dayNumber}
        </div>
        <Link href="/about" className="text-[#8E1606] font-bold text-lg hover:opacity-80 transition-opacity">
          About Me
        </Link>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden">
        <div className="flex items-center justify-start px-6 h-12 border-b border-[#CA1E08]">
          <Link href="/" className="text-[#8E1606] font-bold text-base hover:opacity-80 transition-opacity">
            Home :)
          </Link>
        </div>
        <div className="flex items-center justify-center px-6 h-12 border-b border-[#CA1E08]">
          <div className="text-[#8E1606] font-bold text-sm text-center">
            {ingredientOfDay} • Day {dayNumber}
          </div>
        </div>
        <div className="flex items-center justify-end px-6 h-12">
          <Link href="/about" className="text-[#8E1606] font-bold text-base hover:opacity-80 transition-opacity">
            About Me
          </Link>
        </div>
      </div>
    </nav>
  );
}