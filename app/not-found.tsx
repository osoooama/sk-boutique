export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--page-bg)] text-[var(--page-text)] flex flex-col items-center justify-center p-6 text-center space-y-6">
      <div className="text-8xl font-bold text-accent-gold/20">404</div>
      <h1 className="text-2xl font-bold">Page Not Found</h1>
      <p className="text-accent-gold/60 text-sm max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>
      <a
        href="/"
        className="btn-primary"
      >
        Back to Home
      </a>
    </div>
  );
}
