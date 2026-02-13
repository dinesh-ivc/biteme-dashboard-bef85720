'use client';

import { ExternalLink } from 'lucide-react';

export default function ResourceLink({ name, url, imageUrl }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="relative aspect-square flex flex-col items-center justify-center p-4 overflow-hidden group transition-all hover:opacity-90"
      style={{
        backgroundColor: imageUrl ? 'transparent' : 'rgba(0, 0, 0, 0.2)',
        backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {imageUrl && (
        <div className="absolute inset-0 bg-black opacity-20 group-hover:opacity-30 transition-opacity"></div>
      )}
      
      <div className="relative z-10 text-center">
        <p className="text-[#CA1E08] text-xs md:text-sm font-bold mb-2">
          {name}
        </p>
        <div className="flex items-center justify-center gap-1">
          <span className="text-[#CA1E08] text-xs">Read more</span>
          <ExternalLink className="w-3 h-3 text-[#CA1E08]" />
        </div>
      </div>
    </a>
  );
}