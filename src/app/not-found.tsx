import Link from "next/link";

/**
 * Root 404.
 *
 * Next needs this to exist for `notFound()` to render anything, and without it
 * unmatched paths fell through to the root `[[...locale]]` catch-all and served
 * the homepage with a 200.
 */
export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center bg-prakash-bg px-4 py-20 text-center font-crimson dark:bg-nisha-bg">
      <p className="font-merriweather mb-3 text-sm font-semibold uppercase tracking-widest text-prakash-primary dark:text-nisha-primary">
        404
      </p>
      <h1 className="font-newsreader mb-4 text-3xl font-bold md:text-4xl">
        This page could not be found
      </h1>
      <p className="font-merriweather mb-8 max-w-md text-lg text-muted-foreground">
        The page you are looking for may have moved, or the link may be
        mistyped.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="rounded-md bg-prakash-primary px-5 py-2.5 font-medium text-white transition-colors hover:bg-prakash-primary/90 dark:bg-nisha-primary dark:hover:bg-nisha-primary/90"
        >
          Read the Gita
        </Link>
        <Link
          href="/chapter/1"
          className="rounded-md border px-5 py-2.5 font-medium transition-colors hover:bg-accent"
        >
          Start from Chapter 1
        </Link>
      </div>
    </div>
  );
}
