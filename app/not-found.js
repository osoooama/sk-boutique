import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)] p-6">
      <div className="text-center space-y-6 max-w-md">
        <div className="w-20 h-20 mx-auto rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center">
          <i className="fas fa-compass text-3xl text-gold" />
        </div>
        <h1 className="text-6xl font-extrabold text-gold font-cinzel">404</h1>
        <h2 className="text-xl font-bold text-[var(--text-primary)] font-cairo">
          Page Not Found
        </h2>
        <p className="text-sm text-[var(--text-muted)] font-light leading-relaxed">
          The page you are looking for does not exist or has been moved. Let us help you find your way back.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-gold hover:bg-gold/90 text-black font-semibold rounded-xl text-sm transition-all duration-300"
        >
          <i className="fas fa-arrow-right text-xs" /> Return to Home
        </Link>
      </div>
    </div>
  );
}
