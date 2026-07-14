import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section span-2" data-reveal="bottom">
      <h2>Page not found</h2>
      <p>The page you are looking for does not exist.</p>
      <Link href="/" className="btn btn-secondary btn-pill">
        Back Home
      </Link>
    </section>
  );
}
