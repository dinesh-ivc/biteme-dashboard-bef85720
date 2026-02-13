'use client';

export default function StatusBar({ weather }) {
  return (
    <div className="bg-[#FFFF77] border-b border-[#CA1E08]">
      <div className="px-6 h-10 flex items-center justify-center md:justify-start">
        <span className="text-[#8E1606] font-bold text-sm">
          ☼ Today's Weather: {weather}
        </span>
      </div>
    </div>
  );
}