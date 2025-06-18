const features = [
  {
    icon: '🛡️',
    title: 'Secure Booking',
    description: 'Your payments and data are protected with top-level encryption.',
  },
  {
    icon: '🚤',
    title: 'Luxury Fleet',
    description: 'Choose from a wide selection of high-end yachts for any occasion.',
  },
  {
    icon: '📞',
    title: '24/7 Support',
    description: 'Our expert team is here to help you anytime, anywhere.',
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-16 bg-white text-center px-4">
      <h2 className="text-3xl font-bold mb-12 text-gray-800">Why Choose Us</h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition"
          >
            <div className="text-5xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
            <p className="text-gray-700">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
