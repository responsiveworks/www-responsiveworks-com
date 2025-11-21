"use client";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-16 md:pt-20">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          <h1 className="heading-1">
            We build software that{" "}
            <span className="text-primary-600">works</span>
          </h1>

          <p className="body-large max-w-2xl mx-auto">
            Custom software development, integration, and consulting services
            for small to mid-sized businesses.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a href="#portfolio" className="btn-primary">
              View Our Work
            </a>
            <a href="#contact" className="btn-secondary">
              Get In Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
