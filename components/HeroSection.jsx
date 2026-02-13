'use client';

export default function HeroSection() {
  return (
    <section className="bg-[rgba(0,0,0,0.05)] py-20 md:py-32 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-[#FFFF77] text-4xl md:text-6xl lg:text-7xl font-bold mb-6 drop-shadow-lg">
          Bite Me: A Daily Dose of Vegan
        </h1>
        <p className="text-[#FFFF77] text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto drop-shadow-lg">
          Join me as I munch my way through 365+ days of plant-based deliciousness. 
          Expect questionable puns, unexpected recipes, and a whole lot of leafy greens.
        </p>
      </div>
    </section>
  );
}