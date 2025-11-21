import Link from "next/link";
import { portfolioProjects } from "@/data/portfolio";

export default function Portfolio() {
  return (
    <section id="portfolio" className="section-padding">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="heading-2 mb-6">Our Work</h2>
          <p className="body-large">
            Explore some of the projects we&apos;ve delivered for our clients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioProjects.map((project) => (
            <Link
              key={project.id}
              href={`/portfolio/${project.slug}`}
              className="group"
            >
              <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden hover:border-neutral-300 transition-all hover:shadow-lg">
                {/* Project Image */}
                <div className="aspect-video bg-neutral-100 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-neutral-200 to-neutral-300 group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl font-bold text-neutral-400">
                      {project.title.charAt(0)}
                    </span>
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-1 bg-neutral-100 text-neutral-600 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-neutral-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-neutral-600 text-sm line-clamp-2">
                    {project.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
