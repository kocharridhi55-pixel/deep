import { motion, useReducedMotion } from 'motion/react';

interface WordRevealProps {
  text: string;
  delay?: number;
  stagger?: number;
  play?: boolean;
  className?: string;
}

/** Word-by-word masked rise with blur-to-sharp. Screen readers get the plain text. */
export default function WordReveal({ text, delay = 0, stagger = 0.08, play = true, className }: WordRevealProps) {
  const reduce = useReducedMotion();
  const words = text.split(' ');
  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]">
            <motion.span
              className="inline-block will-change-transform"
              initial={reduce ? false : { y: '105%', opacity: 0, filter: 'blur(10px)' }}
              animate={play ? { y: '0%', opacity: 1, filter: 'blur(0px)' } : {}}
              transition={{
                y: { type: 'spring', stiffness: 70, damping: 11, mass: 1, delay: delay + i * stagger },
                opacity: { duration: 0.7, delay: delay + i * stagger, ease: [0.16, 1, 0.3, 1] },
                filter: { duration: 0.8, delay: delay + i * stagger, ease: [0.16, 1, 0.3, 1] },
              }}
            >
              {w}
            </motion.span>
            {i < words.length - 1 ? '\u00A0' : ''}
          </span>
        ))}
      </span>
    </span>
  );
}
