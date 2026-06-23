import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="mx-auto grid min-h-[60vh] max-w-7xl place-items-center px-4 py-16 text-center">
      <div>
        <p className="text-xs uppercase tracking-[0.4em] text-sand-300/70">404</p>
        <h1 className="mt-4 text-4xl font-semibold text-sand-50">That page drifted off.</h1>
        <Link to="/" className="mt-6 inline-block rounded-full bg-sand-50 px-5 py-3 text-sm font-semibold text-ink-950">
          Go home
        </Link>
      </div>
    </div>
  );
}

