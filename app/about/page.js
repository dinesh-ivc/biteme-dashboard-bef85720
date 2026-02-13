import NavigationBar from '@/components/NavigationBar';
import ResourceLink from '@/components/ResourceLink';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

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

async function getAboutContent() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/about`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error('Error fetching about content:', error);
    return null;
  }
}

async function getResources() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/resources`, {
      cache: 'no-store',
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Error fetching resources:', error);
    return [];
  }
}

export default async function AboutPage() {
  const [dailyStatus, aboutContent, resources] = await Promise.all([
    getDailyStatus(),
    getAboutContent(),
    getResources(),
  ]);

  return (
    <div className="min-h-screen bg-white">
      <NavigationBar 
        ingredientOfDay={dailyStatus?.ingredient_of_day || 'Swiss Chard'}
        dayNumber={dailyStatus?.day_number || 263}
      />

      {/* Hero Image */}
      <section 
        className="h-64 md:h-96 relative"
        style={{
          backgroundColor: aboutContent?.profile_image_url ? 'transparent' : '#CA1E08',
          backgroundImage: aboutContent?.profile_image_url ? `url(${aboutContent.profile_image_url})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {aboutContent?.profile_image_url && (
          <div className="absolute inset-0 bg-[#CA1E08] opacity-20"></div>
        )}
      </section>

      {/* About Content */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Left Column - About */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#8E1606] mb-8">
              ABOUT
            </h1>
            <div className="space-y-4 text-[#8E1606] text-base md:text-lg leading-relaxed">
              {aboutContent?.bio ? (
                aboutContent.bio.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))
              ) : (
                <>
                  <p>
                    Hi, I'm Dean Overfelt. I used to be a card-carrying member of the "Meat Lovers' Club." 
                    Then, I wondered...what if I tried going vegan? For a year? So I did.
                  </p>
                  <p>
                    It's a mix of recipes, reviews, and a whole lot of "wait, that's vegan?" moments. 
                    I'm hoping to show that eating plant based is not only possible, but delicious and fun. 
                    I'm also hoping to learn a thing or two along the way.
                  </p>
                  <p>
                    Feel free to join me, or just laugh at my culinary misfortunes. Either way, welcome!
                  </p>
                </>
              )}
            </div>
            {aboutContent?.email && (
              <Button 
                className="mt-8 bg-[#D9D9D9] hover:bg-[#C0C0C0] text-[#8E1606] font-bold px-8"
                onClick={() => window.location.href = `mailto:${aboutContent.email}`}
              >
                Email me
              </Button>
            )}
          </div>

          {/* Right Column - Resources */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#8E1606] mb-8">
              RESOURCES
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {resources.length > 0 ? (
                resources.map((resource) => (
                  <ResourceLink
                    key={resource.id}
                    name={resource.name}
                    url={resource.url}
                    imageUrl={resource.image_url}
                  />
                ))
              ) : (
                <>
                  <ResourceLink name="Eatvegan.com" url="https://eatvegan.com" />
                  <ResourceLink name="Veganrecipeforyou.com" url="https://veganrecipeforyou.com" />
                  <ResourceLink name="Plantbased.com" url="https://plantbased.com" />
                  <ResourceLink name="Millenialvegan.com" url="https://millenialvegan.com" />
                  <ResourceLink name="Veganrecipeforyou.com" url="https://veganrecipeforyou.com" />
                  <ResourceLink name="Veganforyou.com" url="https://veganforyou.com" />
                  <ResourceLink name="Veganyum.com" url="https://veganyum.com" />
                  <ResourceLink name="Easyvegan.com" url="https://easyvegan.com" />
                  <ResourceLink name="Eatvegan.com" url="https://eatvegan.com" />
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}