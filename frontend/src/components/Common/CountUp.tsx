import { useEffect, useRef, useState } from 'react';

interface CountUpProps {
  end: number;
  durationMs?: number;
  prefix?: string;
  suffix?: string;
  formatWithCommas?: boolean;
  className?: string;
}

export default function CountUp({
  end,
  durationMs = 1200,
  prefix = '',
  suffix = '',
  formatWithCommas = true,
  className,
}: CountUpProps) {
  const [current, setCurrent] = useState<number>(0);
  const [started, setStarted] = useState<boolean>(false);
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const node = ref.current;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started) {
            setStarted(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    io.observe(node);
    return () => io.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const start = performance.now();
    const from = 0;
    const to = end;

    let raf = 0;
    const step = (ts: number) => {
      const progress = Math.min(1, (ts - start) / durationMs);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(from + (to - from) * eased);
      setCurrent(value);
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [started, end, durationMs]);

  const format = (n: number) => {
    const s = formatWithCommas ? n.toLocaleString() : String(n);
    return `${prefix}${s}${suffix}`;
  };

  return (
    <span ref={ref} className={className}>
      {format(current)}
    </span>
  );
}


