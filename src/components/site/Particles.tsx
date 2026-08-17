import { useMemo } from "react";

export function Particles({ count = 18 }: { count?: number }) {
  const dots = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: (i * 37) % 100,
        top: 20 + ((i * 53) % 80),
        size: 2 + (i % 3),
        delay: (i % 9) * 0.9,
        duration: 9 + (i % 6),
        dx: ((i % 5) - 2) * 18,
        gold: i % 3 !== 0,
      })),
    [count],
  );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((d, i) => (
        <span
          key={i}
          className="particle"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            animationDelay: `${d.delay}s`,
            animationDuration: `${d.duration}s`,
            background: d.gold ? "var(--gold-soft)" : "var(--amethyst)",
            ["--dx" as string]: `${d.dx}px`,
            opacity: 0.7,
          }}
        />
      ))}
    </div>
  );
}
