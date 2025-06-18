const destinations = [
  {
    icon: '📍',
    title: 'Bodrum',
    description: 'Crystal-clear waters and vibrant nightlife.',
  },
  {
    icon: '🏝️',
    title: 'Göcek',
    description: 'Hidden bays and serene nature routes.',
  },
  {
    icon: '⚓',
    title: 'Marmaris',
    description: 'Historic harbors and luxurious marinas.',
  },
];

const PopularDestinations = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900 text-center px-4">
      <h2 className="text-3xl font-bold mb-12 text-gray-800 dark:text-white">Popular Destinations</h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {destinations.map((d) => (
          <div key={d.title} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow hover:shadow-lg transition">
            <div className="text-5xl mb-4">{d.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{d.title}</h3>
            <p className="text-gray-600 dark:text-gray-400">{d.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularDestinations;
