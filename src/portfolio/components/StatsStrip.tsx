import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion, animate } from 'motion/react';

interface Stat {
  label: string;
  value: string;
}

/** Splits "1,400+" into { num: 1400, suffix: '+' } so the number can count up. */
function parseStat(value: string) {
  const match = value.match(/^([\d,]+)(.*)$/);
  const num = parseInt((match?.[1] ?? '0').replace(/,/g, ''), 10);
  const suffix = match?.[2] ?? '';
  return { num: Number.isNaN(num) ? 0 : num, suffix };
}

function formatNum(n: number) {
  return n.toLocaleString('en-US');
}

interface StatItemProps {
  stat: Stat;
  index: number;
  active: boolean;
  reduced: boolean;
}

function StatItem({ stat, index, active, reduced }: StatItemProps) {
  const { num, suffix } = parseStat(stat.value);
  const [display, setDisplay] = useState(reduced ? num : 0);
  const [settled, setSettled] = useState(reduced);

  // Count up once, when the strip first enters the viewport
  useEffect(() => {
    if (!active || reduced) return;
    const controls = animate(0, num, {
      duration: 1.8,
      delay: 0.2 + index * 0.16,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
      onComplete: () => setSettled(true),
    });
    return () => controls.stop();
  }, [active, reduced, num, index]);

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 26 }}
      animate={active || reduced ? { opacity: 1, y: 0 } : {}}
      transition={{ type: 'spring', stiffness: 110, damping: 17, delay: reduced ? 0 : index * 0.16 }}
      {...(!reduced ? { whileHover: { y: -5 } } : {})}
      className="stat-card group relative space-y-1.5 py-1"
    >
      {/* Number: counts up, then a soft spring overshoot as it settles */}
      <motion.span
        animate={settled && !reduced ? { scale: [1.07, 1] } : { scale: 1 }}
        transition={{ type: 'spring', stiffness: 320, damping: 11 }}
        className="stat-glow font-editorial text-3xl sm:text-4xl font-normal text-[#141318] dark:text-[#f4f3ef] font-tabular inline-block"
      >
        {formatNum(display)}
        {suffix}
      </motion.span>

      <span className="block text-xs text-[#686574] dark:text-[#8b8797]">{stat.label}</span>

      {/* Thin underline that expands beneath each statistic */}
      <motion.span
        initial={reduced ? false : { scaleX: 0 }}
        animate={active || reduced ? { scaleX: 1 } : {}}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: reduced ? 0 : 0.35 + index * 0.16 }}
        className="block h-px w-10 origin-left bg-[#7358a8]/50 dark:bg-[#a895d3]/50 transition-[width,background-color] duration-500 group-hover:w-14 group-hover:bg-[#7358a8]/80 dark:group-hover:bg-[#a895d3]/80"
      />
    </motion.div>
  );
}

export default function StatsStrip({ stats }: { stats: Stat[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const reduced = useReducedMotion() ?? false;

  return (
    <div
      ref={ref}
      className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-[#e5e3dc] dark:border-[#201e2b]"
    >
      {stats.map((stat, i) => (
        <StatItem key={stat.label} stat={stat} index={i} active={inView} reduced={reduced} />
      ))}
    </div>
  );
}
