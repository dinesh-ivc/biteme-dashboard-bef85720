import NavigationBar from '@/components/NavigationBar';
import StatusBar from '@/components/StatusBar';
import HeroSection from '@/components/HeroSection';
import RecipeCard from '@/components/RecipeCard';
import Footer from '@/components/Footer';

async function getDailyStatus() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/daily-status`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error('Error fetching daily status:', error);
    return null;
  }
}

async function getRecipes() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/recipes`, {
      cache: 'no-store',
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return [];
  }
}

export default async function HomePage() {
  const [dailyStatus, recipes] = await Promise.all([
    getDailyStatus(),
    getRecipes(),
  ]);

  return (
    <div className="min-h-screen bg-white">
      <NavigationBar 
        ingredientOfDay={dailyStatus?.ingredient_of_day || 'Swiss Chard'}
        dayNumber={dailyStatus?.day_number || 263}
      />
      <StatusBar weather={dailyStatus?.weather || 'Sunny'} />
      <HeroSection />
      
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-[#8E1606] mb-4">
              Lettuce Begin!
            </h2>
            <p className="text-lg text-[#8E1606]">
              Check out my daily vegan recipes.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {recipes.length > 0 ? (
              recipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  entryNumber={recipe.entry_number}
                  title={recipe.title}
                  slug={recipe.slug}
                  thumbnailUrl={recipe.thumbnail_image_url}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-[#8E1606] text-lg">No recipes available yet. Check back soon!</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}