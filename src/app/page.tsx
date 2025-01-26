import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";
import { Metadata } from 'next';
import { defaultMetadata } from '@/lib/metadata';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-indigo-950">
      <div className="grid grid-rows-[80px_1fr_auto_60px] min-h-screen p-8 max-w-7xl mx-auto">
        <Header />
        <Hero />
        <Pricing />
        <Footer />
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  ...defaultMetadata,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    ...defaultMetadata.openGraph,
    title: 'Habinvest - Transform Your Habits into Valuable Assets',
    description: 'Build lasting habits and watch them grow in value. Join Habinvest to turn your daily routines into measurable success.',
  },
};

