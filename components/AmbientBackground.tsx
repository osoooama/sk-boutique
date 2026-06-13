"use client";

const ORBS = [
  {
    style: {
      top: "0",
      left: "0",
      width: "500px",
      height: "500px",
      background: "var(--orb-1)",
      filter: "blur(100px)",
      animation: "float-orb 28s ease-in-out infinite",
      animationDelay: "0s",
    },
  },
  {
    style: {
      bottom: "0",
      right: "0",
      width: "600px",
      height: "600px",
      background: "var(--orb-2)",
      filter: "blur(120px)",
      animation: "float-orb 22s ease-in-out infinite",
      animationDelay: "-7s",
    },
  },
  {
    style: {
      top: "50%",
      right: "10%",
      width: "400px",
      height: "400px",
      background: "var(--orb-3)",
      filter: "blur(90px)",
      animation: "float-orb 35s ease-in-out infinite",
      animationDelay: "-14s",
    },
  },
];

export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      {ORBS.map((orb, i) => (
        <div
          key={i}
          className="absolute rounded-full will-change-transform"
          style={orb.style}
        />
      ))}
    </div>
  );
}
