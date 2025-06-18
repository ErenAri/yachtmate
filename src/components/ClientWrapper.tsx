'use client';

import Hero from './Hero';
import WhyChooseUs from './WhyChooseUs';
import ContactSection from './ContactSection';
import YachtCard from './YachtCard';

interface Props {
  yachts: any[];
}

export default function ClientWrapper({ yachts }: Props) {
  return (
    <>
      <Hero />
      <WhyChooseUs />

      <section id="fleet" className="bg-white py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
          Featured Yachts
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center">
          {yachts.map((yacht) => (
            <YachtCard key={yacht.id} yacht={yacht} />
          ))}
        </div>

        <div className="text-center mt-10">
          <a href="/yachts">
            <button className="bg-gray-800 text-white font-bold italic px-10 py-4 rounded-lg hover:bg-gray-900 transition text-lg tracking-wide">
              View All Yachts →
            </button>
          </a>
        </div>
      </section>

      <ContactSection />
    </>
  );
}
