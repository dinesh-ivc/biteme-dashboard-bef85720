'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function EntryNavigation({ previousEntry, nextEntry }) {
  const router = useRouter();

  return (
    <div className="max-w-6xl mx-auto flex items-center justify-between gap-8">
      {/* Previous Entry */}
      {previousEntry ? (
        <button
          onClick={() => router.push(`/entry/${previousEntry.slug}`)}
          className="flex items-center gap-4 bg-[#FFFF77] hover:bg-[#FFDF4E] transition-colors p-6 flex-1 max-w-md"
        >
          <ChevronLeft className="w-6 h-6 text-[#8E1606] flex-shrink-0" />
          <div className="text-left">
            <p className="text-[#8E1606] text-sm mb-1">Entry</p>
            <p className="text-[#8E1606] text-2xl font-bold mb-1">
              #{String(previousEntry.number).padStart(2, '0')}
            </p>
            <p className="text-[#8E1606] text-sm font-bold">
              {previousEntry.title}
            </p>
          </div>
        </button>
      ) : (
        <div className="flex-1 max-w-md"></div>
      )}

      {/* Next Entry */}
      {nextEntry ? (
        <button
          onClick={() => router.push(`/entry/${nextEntry.slug}`)}
          className="flex items-center gap-4 bg-[#FFFF77] hover:bg-[#FFDF4E] transition-colors p-6 flex-1 max-w-md"
        >
          <div className="text-right flex-1">
            <p className="text-[#8E1606] text-sm mb-1">Entry</p>
            <p className="text-[#8E1606] text-2xl font-bold mb-1">
              #{String(nextEntry.number).padStart(2, '0')}
            </p>
            <p className="text-[#8E1606] text-sm font-bold">
              {nextEntry.title}
            </p>
          </div>
          <ChevronRight className="w-6 h-6 text-[#8E1606] flex-shrink-0" />
        </button>
      ) : (
        <div className="flex-1 max-w-md"></div>
      )}
    </div>
  );
}