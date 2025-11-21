import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <div className="container-custom text-center">
        <h1 className="heading-2 mb-4">Project Not Found</h1>
        <p className="body-large mb-8">
          Sorry, we couldn't find the project you're looking for.
        </p>
        <Link href="/#portfolio" className="btn-primary inline-block">
          View All Projects
        </Link>
      </div>
    </div>
  );
}
