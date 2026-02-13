import { DotGothic16 } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';

const dotGothic = DotGothic16({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-dotgothic',
});

export const metadata = {
  title: 'BiteMe - A Daily Dose of Vegan',
  description: 'Join Dean Overfelt on a 365-day journey from meat lover to vegan, featuring daily recipes, reviews, and plant-based discoveries.',
  keywords: 'vegan, recipes, plant-based, daily vegan recipes, vegan journey',
  openGraph: {
    title: 'BiteMe - A Daily Dose of Vegan',
    description: 'Join Dean Overfelt on a 365-day journey from meat lover to vegan',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={dotGothic.variable}>
      <body className="font-dotgothic antialiased">
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}