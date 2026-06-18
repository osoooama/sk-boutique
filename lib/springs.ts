export const springs = {
  gentle: { type: "spring" as const, stiffness: 120, damping: 14 },
  bouncy: { type: "spring" as const, stiffness: 300, damping: 20 },
  snappy: { type: "spring" as const, stiffness: 400, damping: 30 },
  wobbly: { type: "spring" as const, stiffness: 180, damping: 12 },
  heavy:  { type: "spring" as const, stiffness: 80,  damping: 15 },
};
