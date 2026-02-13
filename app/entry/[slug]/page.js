import { notFound } from 'next/navigation';
import NavigationBar from '@/components/NavigationBar';
import EntryNavigation from '@/components/EntryNavigation';
import Footer from '@/components/Footer';

async function getRecipe(slug) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/recipes/${slug}`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error('Error fetching recipe:', error);
    return null;
  }
}

async function getAdjacentRecipes(entryNumber) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/recipes`, {
      cache: 'no-store',
    });
    if (!res.ok) return { previous: null, next: null };
    const data = await res.json();
    
    if (!data.success || !data.data) return { previous: null, next: null };
    
    const recipes = data.data;
    const previous = recipes.find(r => r.entry_number === entryNumber - 1);
    const next = recipes.find(r => r.entry_number === entryNumber + 1);
    
    return { previous, next };
  } catch (error) {
    console.error('Error fetching adjacent recipes:', error);
    return { previous: null, next: null };
  }
}

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

export default async function EntryPage({ params }) {
  const { slug } = params;
  const recipe = await getRecipe(slug);

  if (!recipe) {
    notFound();
  }

  const [dailyStatus, adjacentRecipes] = await Promise.all([
    getDailyStatus(),
    getAdjacentRecipes(recipe.entry_number),
  ]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options).replace(',', 'th,');
  };

  return (
    <div className="min-h-screen bg-white">
      <NavigationBar 
        ingredientOfDay={dailyStatus?.ingredient_of_day || 'Swiss Chard'}
        dayNumber={dailyStatus?.day_number || 263}
      />

      {/* Hero Section */}
      <section 
        className="relative py-32 md:py-48 px-6"
        style={{
          backgroundColor: recipe.hero_image_url ? 'transparent' : 'rgba(0, 0, 0, 0.05)',
          backgroundImage: recipe.hero_image_url ? `url(${recipe.hero_image_url})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className={`${recipe.hero_image_url ? 'bg-black bg-opacity-50 p-8 rounded-lg' : ''} max-w-4xl mx-auto text-center`}>
          <p className="text-[#8E1606] text-base md:text-lg mb-4 font-bold">
            Entry #{String(recipe.entry_number).padStart(2, '0')}
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-[#8E1606] mb-4 uppercase">
            {recipe.title}
          </h1>
          <p className="text-[#8E1606] text-sm md:text-base">
            {formatDate(recipe.date)}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Ingredients Column */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#8E1606] mb-6">
              INGREDIENTS
            </h2>
            <ul className="space-y-3">
              {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="text-[#8E1606] text-base md:text-lg flex items-start">
                  <span className="mr-3">•</span>
                  <span>{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Steps Column */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#8E1606] mb-6">
              STEPS
            </h2>
            <ol className="space-y-4">
              {recipe.steps && recipe.steps.map((step, index) => (
                <li key={index} className="text-[#8E1606] text-base md:text-lg flex items-start">
                  <span className="font-bold mr-3">{index + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Entry Navigation */}
      <section className="py-16 px-6 border-t border-[#CA1E08]">
        <EntryNavigation
          previousEntry={adjacentRecipes.previous ? {
            number: adjacentRecipes.previous.entry_number,
            title: adjacentRecipes.previous.title,
            slug: adjacentRecipes.previous.slug,
          } : null}
          nextEntry={adjacentRecipes.next ? {
            number: adjacentRecipes.next.entry_number,
            title: adjacentRecipes.next.title,
            slug: adjacentRecipes.next.slug,
          } : null}
        />
      </section>

      <Footer />
    </div>
  );
}