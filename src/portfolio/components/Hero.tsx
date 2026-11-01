import { useState, useRef, useEffect } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import { ArrowDown, ArrowUpRight, ExternalLink, Download } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

const CUBE_IMAGE = '/images/hero-ai-crystal-cube.png';
const FALLBACK_CUBE_IMAGE = '/images/hero_cinematic_sculpture_1793294830736.jpg';

const CUBE_PARTICLES = [
  { x: '14%', y: '22%', s: 3, d: 9, delay: 0 },
  { x: '82%', y: '18%', s: 2, d: 11, delay: 1.5 },
  { x: '24%', y: '72%', s: 2, d: 10, delay: 3 },
  { x: '72%', y: '66%', s: 3, d: 12, delay: 0.8, desktopOnly: true },
  { x: '50%', y: '12%', s: 2, d: 13, delay: 2.2, desktopOnly: true },
  { x: '90%', y: '48%', s: 2, d: 10, delay: 4, desktopOnly: true },
];

interface HeroProps {
  onDownloadResume?: () => void;
  ready?: boolean;
}

const TYPE_SPEED_MS = 78;
const TYPE_START_DELAY_MS = 1100;
const TYPE_HOLD_MS = 2600;
const TYPE_FADE_MS = 520;

// Cinematic typewriter for the hero kicker: types the role character by
// character, holds the full line, then fades and smoothly retypes.
function TypewriterTitle({ text }: { text: string }) {
  const reducedMotion = useReducedMotion();
  const [typed, setTyped] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (reducedMotion) return;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;

    const typeNext = (i: number) => {
      if (cancelled) return;
      if (i <= text.length) {
        setTyped(i);
        timer = setTimeout(() => typeNext(i + 1), TYPE_SPEED_MS);
      } else {
        timer = setTimeout(() => {
          if (cancelled) return;
          setFading(true);
          timer = setTimeout(() => {
            if (cancelled) return;
            setFading(false);
            setTyped(0);
            timer = setTimeout(() => typeNext(1), 450);
          }, TYPE_FADE_MS);
        }, TYPE_HOLD_MS);
      }
    };

    timer = setTimeout(() => typeNext(1), TYPE_START_DELAY_MS);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [text, reducedMotion]);

  if (reducedMotion) {
    return <span>{text}</span>;
  }

  return (
    <span
      className={`transition-opacity ${fading ? 'opacity-0 duration-500 ease-out' : 'opacity-100 duration-300'}`}
    >
      {text.slice(0, typed)}
      <span className="type-cursor" aria-hidden="true" />
    </span>
  );
}

// Staggered per-word bounce: rises from below, blur-to-sharp, soft overshoot
// then a subtle secondary settle. Final layout is untouched (inline-block words).
const BOUNCE_BASE_DELAY = 0.15;
const BOUNCE_STAGGER = 0.12;

function BounceWords({ text, play, startIndex }: { text: string; play: boolean; startIndex: number }) {
  const reducedMotion = useReducedMotion();
  const words = text.split(' ');
  if (reducedMotion) return <>{text}</>;
  return (
    <>
      {words.map((word, i) => (
        <span key={i} className="inline-block">
          <motion.span
            className="inline-block will-change-transform"
            initial={{ opacity: 0, y: '0.55em', filter: 'blur(8px)' }}
            animate={
              play
                ? { opacity: 1, y: ['0.55em', '-0.09em', '0.025em', '-0.02em', '0em'], filter: 'blur(0px)' }
                : {}
            }
            transition={{
              y: { delay: BOUNCE_BASE_DELAY + (startIndex + i) * BOUNCE_STAGGER, duration: 1.3, times: [0, 0.42, 0.66, 0.84, 1], ease: [0.22, 1, 0.36, 1] },
              opacity: { delay: BOUNCE_BASE_DELAY + (startIndex + i) * BOUNCE_STAGGER, duration: 0.6, ease: 'easeOut' },
              filter: { delay: BOUNCE_BASE_DELAY + (startIndex + i) * BOUNCE_STAGGER, duration: 0.75, ease: 'easeOut' },
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? ' ' : null}
        </span>
      ))}
    </>
  );
}

export default function Hero({ onDownloadResume, ready = true }: HeroProps) {
    const containerRef = useRef<HTMLDivElement>(null);
  const imageFrameRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [cubeImageSrc, setCubeImageSrc] = useState(CUBE_IMAGE);
  const [cubeImageFailed, setCubeImageFailed] = useState(false);

  const handleCubeImageError = () => {
    if (cubeImageSrc !== FALLBACK_CUBE_IMAGE) {
      setCubeImageSrc(FALLBACK_CUBE_IMAGE);
    } else {
      setCubeImageFailed(true);
    }
  };
  const { scrollYProgress } = useScroll({ target: imageFrameRef, offset: ['start end', 'end start'] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 24, mass: 0.4 });
  const scrollScale = useTransform(smoothProgress, [0.5, 1], [1, 1.08]);
  const scrollY = useTransform(smoothProgress, [0, 1], ['-4%', '4%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || reducedMotion) return;
    if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotateX(-y * 0.035);
    setRotateY(x * 0.035);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <section
      id="home"
      className="relative pt-24 md:pt-28 pb-8 md:pb-12 flex flex-col justify-center overflow-hidden"
    >
      {/* Subtle ambient light gradient */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-[#8973b5]/10 dark:bg-[#725a9f]/12 blur-[140px] pointer-events-none rounded-full cinema-ambient" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Typographic Editorial Focus */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7">
            {/* Title / Name kicker */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.34, 1.35, 0.64, 1] }}
              className="space-y-1.5"
            >
              <span className="text-xs tracking-[0.25em] uppercase text-[#7358a8] dark:text-[#a895d3] font-semibold">
                <TypewriterTitle text={PERSONAL_INFO.title} />
              </span>
              <p className="text-xs sm:text-sm font-light text-[#5e5b69] dark:text-[#a39fad] tracking-wide">
                Transforming ideas into practical digital solutions with modern web &amp; AI architectures
              </p>
            </motion.div>

            {/* Main Headline */}
            <h1
              className="font-editorial text-3xl sm:text-4xl md:text-5xl lg:text-[3.75rem] leading-[1.12] tracking-tight font-normal text-[#141318] dark:text-[#f7f6f2]"
              style={{ textWrap: 'balance' }}
            >
              <BounceWords text="Designing Ideas." play={ready} startIndex={0} />{' '}
              <span className="italic font-light text-[#4a4754] dark:text-[#c4bfd2]">
                <BounceWords text="Building Digital Experiences." play={ready} startIndex={2} />
              </span>
            </h1>

            {/* Lead Narrative */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.75, ease: [0.34, 1.35, 0.64, 1] }}
              className="text-sm sm:text-base text-[#524f5c] dark:text-[#9e9aa8] max-w-xl font-body leading-relaxed"
            >
              Developer and Data Science Student with knowledge of modern web development, data analysis,
              and artificial intelligence. Skilled in building responsive web applications using React,
              Next.js, and Tailwind CSS, working with data using Python, Pandas, and NumPy, and exploring AI
              chatbot development and Generative AI workflows.
            </motion.p>

            {/* Action Buttons: Explore My Projects + View Resume + Download Resume */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.9, ease: [0.34, 1.35, 0.64, 1] }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1"
            >
              {/* 1. Explore My Projects */}
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById('projects');
                  const lenis = (window as any).__lenis;
                  if (el && lenis) lenis.scrollTo(el, { offset: -72 });
                  else el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group relative inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-white bg-[#17161b] dark:bg-[#f4f3ef] dark:text-[#0f0e12] rounded-md hover:bg-[#2c2936] dark:hover:bg-[#dfdcd3] transition-all shadow-sm cursor-pointer whitespace-nowrap"
              >
                <span>Explore My Projects</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              {/* 2. View Resume */}
              <a
                href="/Rythm_Kochar_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs font-semibold uppercase tracking-widest text-[#17161b] dark:text-[#f4f3ef] border border-[#d6d3ca] dark:border-[#2d2b38] rounded-md hover:border-[#17161b] dark:hover:border-[#9e9aa8] hover:bg-[#f2efe8] dark:hover:bg-[#16151c] transition-all cursor-pointer whitespace-nowrap"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#7358a8] dark:text-[#a895d3]" />
                <span>View Resume</span>
              </a>

              {/* 3. Download Resume */}
              <a
                href="/Rythm_Kochar_Resume.pdf"
                download="Rythm_Kochar_Resume.pdf"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs font-semibold uppercase tracking-widest text-[#17161b] dark:text-[#f4f3ef] border border-[#d6d3ca] dark:border-[#2d2b38] rounded-md hover:border-[#7358a8] dark:hover:border-[#a895d3] hover:bg-[#f2efe8] dark:hover:bg-[#16151c] transition-all cursor-pointer whitespace-nowrap"
              >
                <Download className="w-3.5 h-3.5 text-[#7358a8] dark:text-[#a895d3]" />
                <span>Download Resume</span>
              </a>
            </motion.div>

            {/* Quick credibility line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={ready ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 1.05 }}
              className="flex items-center gap-3 pt-4 text-xs text-[#716e7a] dark:text-[#7f7a8c] font-tabular"
            >
              <span>Personal Portfolio</span>
              <span aria-hidden="true">·</span>
              <span>AI Specialization &amp; PGDCA</span>
              <span aria-hidden="true">·</span>
              <span>Ludhiana, Punjab</span>
            </motion.div>
          </div>

          {/* Right Column: Visual Composition with 3D Depth & Mirror Reflection */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              initial={{ opacity: 0, scale: 0.95, clipPath: 'inset(100% 0% 0% 0%)', y: 40 }}
              animate={ready ? { opacity: 1, scale: 1, clipPath: 'inset(-20% -20% -60% -20%)', y: [40, 0] } : {}}
              transition={{ duration: 1.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{
                perspective: 1000,
                transformStyle: 'preserve-3d',
              }}
              className="relative w-full max-w-[360px] sm:max-w-[390px] group cursor-pointer"
            >
              {/* Main Card with smooth 3D tilt */}
              <motion.div
                animate={{
                  rotateX,
                  rotateY,
                }}
                transition={{
                  type: 'spring',
                  damping: 24,
                  stiffness: 220,
                  mass: 0.4,
                }}
                className="relative rounded-xl overflow-hidden border border-[#dcdad3] dark:border-[#282633] bg-[#f8f7f2] dark:bg-[#111016] shadow-xl"
              >
                {/* Visual Image */}
                <div ref={imageFrameRef} className="relative aspect-[4/3] w-full overflow-hidden bg-[#0c0c0e]">
                  <div aria-hidden="true" className="cube-glow" />
                  <motion.div
                    className="w-full h-full"
                    initial={{ scale: 1.3, opacity: 0, filter: 'blur(10px)' }}
                    animate={ready ? { scale: 1, opacity: 1, filter: 'blur(0px)' } : {}}
                    transition={{ duration: 2.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <motion.div className="w-full h-full" style={reducedMotion ? {} : { scale: scrollScale, y: scrollY }}>
                      <div className="w-full h-full cube-float">
                        {cubeImageFailed ? (
                          <div
                            role="img"
                            aria-label="AI crystal cube visual unavailable"
                            className="w-full h-full flex items-center justify-center bg-[radial-gradient(circle_at_center,_rgba(139,92,246,0.28),_transparent_58%),linear-gradient(135deg,_#09070f,_#171020)]"
                          >
                            <span className="font-editorial text-6xl text-violet-200/80 drop-shadow-[0_0_24px_rgba(167,139,250,0.7)]">
                              AI
                            </span>
                          </div>
                        ) : (
                          <img
                            src={cubeImageSrc}
                            alt="Glass AI crystal cube with purple light and floating orbital rings"
                            width={1679}
                            height={937}
                            decoding="async"
                            onError={handleCubeImageError}
                            className="w-full h-full object-cover object-center"
                          />
                        )}
                      </div>
                    </motion.div>
                  </motion.div>
                  <div aria-hidden="true" className="cube-shimmer" />
                  <div aria-hidden="true" className="cube-particles">
                    {CUBE_PARTICLES.map((p, i) => (
                      <span
                        key={i}
                        className={p.desktopOnly ? 'hidden sm:block' : undefined}
                        style={{ left: p.x, top: p.y, width: p.s, height: p.s, animationDuration: `${p.d}s`, animationDelay: `${p.delay}s` }}
                      />
                    ))}
                  </div>
                  {/* Subtle vignette scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e0d12]/90 via-transparent to-transparent pointer-events-none" />

                  {/* Editorial label inside artwork */}
                  <div className="absolute bottom-3.5 left-4 right-4 flex items-center justify-between text-xs text-white/90 font-tabular">
                    <span className="tracking-widest uppercase text-[11px] text-white/70">
                      Sculptural Core
                    </span>
                    <span className="text-[11px] text-white/80">Figure 01 / Spatial Form</span>
                  </div>
                </div>

                {/* Card footer description */}
                <div className="p-5 space-y-2 border-t border-[#e8e6df] dark:border-[#23212d]">
                  <div className="flex items-center justify-between">
                    <span className="font-editorial text-lg text-[#141318] dark:text-[#f4f3ef] font-medium">
                      Form Follows Intelligence
                    </span>
                    <span className="text-xs text-[#7358a8] dark:text-[#a895d3] font-tabular">
                      2026 Edition
                    </span>
                  </div>
                  <p className="text-xs text-[#5d5a69] dark:text-[#8e8a99] leading-relaxed">
                    Sculpted geometry, data structures, and cinematic visual pacing rendered with
                    deliberate restraint.
                  </p>
                </div>
              </motion.div>

              {/* Reflection effect beneath the card (inspired by the reference video mirror surface) */}
              <div
                aria-hidden="true"
                className="mirror-floor pointer-events-none absolute -bottom-28 left-0 right-0 h-28 transform scale-y-[-1] opacity-35 blur-[1px] overflow-hidden"
              >
                <div className="rounded-xl border border-white/5 bg-[#111016]">
                  {!cubeImageFailed && (
                    <img
                      src={cubeImageSrc}
                      alt=""
                      aria-hidden="true"
                      onError={handleCubeImageError}
                      className="w-full h-24 object-cover object-bottom"
                    />
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="w-full flex justify-center pt-6"
      >
        <a
          href="#about"
          className="group flex flex-col items-center gap-2 text-[#7a7785] dark:text-[#7f7a8f] hover:text-[#17161b] dark:hover:text-[#f4f3ef] transition-colors"
        >
          <span className="text-[10px] tracking-[0.25em] uppercase font-tabular">
            Scroll To Discover
          </span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
}
