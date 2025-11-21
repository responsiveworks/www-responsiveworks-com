export default function About() {
  const technologies = [
    "Java", "Python", "C#", "JavaScript", "TypeScript",
    "React", "Next.js", "Node.js", "PHP", "HTML/CSS"
  ];

  const services = [
    {
      title: "Custom Development",
      description: "Tailored software solutions designed specifically for your business needs."
    },
    {
      title: "System Integration",
      description: "Connect your existing systems and tools for seamless workflows."
    },
    {
      title: "Consulting",
      description: "Expert guidance on technology strategy and implementation."
    }
  ];

  return (
    <section id="about" className="section-padding bg-neutral-50">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="heading-2 mb-6">About Us</h2>
          <p className="body-large">
            We partner with small to mid-sized businesses to create software solutions
            that drive growth and efficiency.
          </p>
        </div>

        {/* Services */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-lg border border-neutral-200 hover:border-neutral-300 transition-colors"
            >
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-neutral-600">{service.description}</p>
            </div>
          ))}
        </div>

        {/* Technologies */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-xl font-semibold text-center mb-8">Technologies We Use</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {technologies.map((tech, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-white border border-neutral-200 rounded-full text-sm font-medium text-neutral-700"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
