import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-[32px] surface-panel p-10 text-center shadow-glow backdrop-blur-xl">
      <p className="text-sm uppercase tracking-[0.4em] text-[color:var(--accent)/0.8]">404</p>
      <h1 className="mt-4 text-4xl font-semibold text-primary">Page Not Found</h1>
      <p className="mt-3 max-w-md text-muted">
        The visual learning route you tried does not exist yet. Return to the home page to continue your OS journey.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex items-center justify-center rounded-3xl bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[var(--surface-base)] transition hover:bg-[var(--accent)]/90"
      >
        Go Home
      </Link>
    </div>
  );
}
