'use client';

import { useRouter } from 'next/navigation';

export default function RecipeCard({ entryNumber, title, slug, thumbnailUrl }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/entry/${slug}`);
  };

  return (
    <div
      onClick={handleClick}
      className="relative aspect-square bg-[#FFFF77] hover:bg-[#FFDF4E] transition-colors cursor-pointer p-4 flex flex-col justify-between"
      style={{
        backgroundImage: thumbnailUrl ? `url(${thumbnailUrl})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {thumbnailUrl && (
        <div className="absolute inset-0 bg-[#FFFF77] opacity-80 hover:opacity-70 transition-opacity"></div>
      )}
      
      <div className="relative z-10">
        <p className="text-[#8E1606] text-xs mb-1">Entry</p>
        <p className="text-[#8E1606] text-xl font-bold">
          #{String(entryNumber).padStart(2, '0')}
        </p>
      </div>

      <div className="relative z-10">
        <p className="text-[#8E1606] text-sm font-bold text-center">
          {title}
        </p>
      </div>
    </div>
  );
}