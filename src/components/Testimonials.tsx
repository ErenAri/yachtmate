import Image from 'next/image';

const testimonials = [
  {
    name: 'John D.',
    text: 'An unforgettable experience! The yacht was spotless and the crew was very professional.',
    avatar: '/images/user1.jpg',
  },
  {
    name: 'Emily R.',
    text: 'We had the best family vacation ever. Thank you for the seamless booking process!',
    avatar: '/images/user1.jpg',
  },
  {
    name: 'Carlos M.',
    text: 'Everything was perfect — from departure to return. Highly recommended!',
    avatar: '/images/user1.jpg',
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-white dark:bg-gray-900 text-center px-4">
      <h2 className="text-3xl font-bold mb-12 text-gray-800 dark:text-white">What Our Clients Say</h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 shadow hover:shadow-md transition"
          >
            <Image
              src={t.avatar}
              alt={t.name}
              width={64}
              height={64}
              className="rounded-full mx-auto mb-4 object-cover"
            />
            <p className="text-gray-700 dark:text-gray-300 mb-4 italic">&quot;{t.text}&quot;</p>
            <p className="font-semibold text-gray-900 dark:text-white">{t.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
