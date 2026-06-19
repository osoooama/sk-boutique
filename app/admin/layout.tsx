import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | SK BOUTIQUE",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen w-full overflow-x-hidden font-alexandria"
      style={{ background: "var(--bg-primary)" }}
    >
      {children}
    </div>
  );
}
