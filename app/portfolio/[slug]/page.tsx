import { notFound } from "next/navigation";
import Link from "next/link";
import { portfolioProjects } from "@/data/portfolio";
import type { Metadata } from "next";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return portfolioProjects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = portfolioProjects.find((p) => p.slug === params.slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} - ResponsiveWorks Portfolio`,
    description: project.description,
  };
}

export default function ProjectPage({ params }: Props) {
  const project = portfolioProjects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container-custom">
        {/* Back Button */}
        <Link
          href="/#portfolio"
          className="inline-flex items-center gap-2 text-neutral-600 hover:text-neutral-900 mb-8 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Portfolio
        </Link>

        {/* Project Header */}
        <div className="max-w-4xl mb-12">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag, index) => (
              <span
                key={index}
                className="text-sm px-3 py-1 bg-neutral-100 text-neutral-600 rounded"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="heading-2 mb-4">{project.title}</h1>
          <p className="body-large">{project.longDescription}</p>

          <div className="flex gap-6 mt-6 text-sm text-neutral-600">
            <div>
              <span className="font-semibold">Year:</span> {project.year}
            </div>
            <div>
              <span className="font-semibold">Technologies:</span>{" "}
              {project.technologies.join(", ")}
            </div>
          </div>
        </div>

        {/* Project Image Placeholder */}
        <div className="aspect-video bg-gradient-to-br from-neutral-200 to-neutral-300 rounded-lg mb-16 flex items-center justify-center">
          <span className="text-6xl font-bold text-neutral-400">
            {project.title.charAt(0)}
          </span>
        </div>

        {/* Project Details */}
        <div className="max-w-4xl space-y-12">
          {/* Challenge */}
          <div>
            <h2 className="heading-3 mb-4">The Challenge</h2>
            <p className="text-lg text-neutral-700">{project.challenge}</p>
          </div>

          {/* Solution */}
          <div>
            <h2 className="heading-3 mb-4">Our Solution</h2>
            <p className="text-lg text-neutral-700">{project.solution}</p>
          </div>

          {/* Results */}
          <div>
            <h2 className="heading-3 mb-6">Results</h2>
            <ul className="space-y-4">
              {project.results.map((result, index) => (
                <li key={index} className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-lg text-neutral-700">{result}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies */}
          <div>
            <h2 className="heading-3 mb-6">Technologies Used</h2>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-neutral-100 border border-neutral-200 rounded-lg font-medium text-neutral-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-4xl mt-16 p-8 bg-neutral-50 rounded-lg border border-neutral-200 text-center">
          <h3 className="text-2xl font-semibold mb-4">
            Ready to start your project?
          </h3>
          <p className="text-neutral-600 mb-6">
            Let's discuss how we can help bring your ideas to life.
          </p>
          <Link href="/#contact" className="btn-primary inline-block">
            Get In Touch
          </Link>
        </div>
      </div>
    </div>
  );
}
