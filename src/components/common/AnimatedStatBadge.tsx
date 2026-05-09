"use client";

import { useEffect, useRef, useState } from "react";

type AnimatedStatBadgeProps = {
  value: number;
  label: string;
  start: boolean;
  className?: string;
  durationMs?: number;
};

export default function AnimatedStatBadge({
  value,
  label,
  start,
  className,
  durationMs = 1400,
}: AnimatedStatBadgeProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (!start || hasAnimatedRef.current) {
      return;
    }

    hasAnimatedRef.current = true;
    const startedAt = performance.now();
    let frameId = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - startedAt) / durationMs, 1);
      const easedProgress = 1 - (1 - progress) * (1 - progress);
      const nextValue = Math.round(value * easedProgress);
      setDisplayValue(nextValue);

      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    frameId = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(frameId);
  }, [durationMs, start, value]);

  return (
    <div
      className={`${className} rounded-3xl border border-white/25 border-b-[#F5B335] bg-white/10 p-6 shadow-lg`}
    >
      <p className="text-5xl font-extrabold leading-none text-white">
        {displayValue}+
      </p>
      <p className="mt-3 text-lg text-white/90">{label}</p>
    </div>
  );
}
