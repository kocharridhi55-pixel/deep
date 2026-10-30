import { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, GraduationCap, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import StatsStrip from './StatsStrip';

interface AboutProps {
  onOpenResume: () => void;
}

export default function About({ onOpenResume }: AboutProps) {
  const [activeTab, setActiveTab] = useState<'narrative' | 'focus'>('narrative');

  return (
    <section id="about" className="py-24 md:py-32 relative border-t border-[#e8e6df] dark:border-[#1d1b26]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-96 h-96 bg-[#856cae]/5 dark:bg-[#7859a8]/8 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-6 border-b border-[#e5e3dc] dark:border-[#201e2b]">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] text-[#7358a8] dark:text-[#a895d3] font-semibold">
              Editorial Profile · 01
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-normal text-[#141318] dark:text-[#f4f3ef] tracking-tight">
              About The Developer
            </h2>
          </div>
          <p className="text-xs md:text-sm text-[#666270] dark:text-[#8d8898] max-w-md font-body">
            Combining analytical data science foundations with modern interface engineering.
          </p>
        </div>

        {/* Two-Column Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Portrait & Visual Monograph */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative group rounded-xl overflow-hidden border border-[#dcdad3] dark:border-[#282633] bg-[#f8f7f2] dark:bg-[#111016] shadow-lg"
            >
              <div className="aspect-[4/5] w-full overflow-hidden relative bg-[#14131a]">
                <img
                  src={PERSONAL_INFO.portraitImage}
                  alt="Developer and Data Science Student editorial portrait"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-102"
                />
                {/* Subtle scrim for contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0c12]/85 via-transparent to-transparent pointer-events-none" />

                {/* Quiet portrait watermark/caption */}
                <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-xs text-white/90 font-tabular">
                  <span>Student & Engineer</span>
                  <span className="text-white/70">Portfolio Monograph</span>
                </div>
              </div>

              {/* Bottom Card Strip */}
              <div className="p-5 border-t border-[#e8e6df] dark:border-[#23212d] flex items-center justify-between">
                <div>
                  <h4 className="font-editorial text-base text-[#141318] dark:text-[#f4f3ef] font-medium">
                    {PERSONAL_INFO.name}
                  </h4>
                  <p className="text-xs text-[#6e6b79] dark:text-[#918c9e] font-tabular">
                    Computer Applications & Applied AI
                  </p>
                </div>
                <button
                  onClick={onOpenResume}
                  className="p-2 rounded-full border border-[#d6d3ca] dark:border-[#2d2b38] hover:bg-[#eae8e1] dark:hover:bg-[#1f1d28] transition-colors"
                  aria-label="View Resume Overview"
                >
                  <ArrowUpRight className="w-4 h-4 text-[#7358a8] dark:text-[#a895d3]" />
                </button>
              </div>
            </motion.div>

            {/* Quick Specialization Badges without pill clutter (clean unboxed text) */}
            <div className="p-5 rounded-xl border border-[#e2e0d8] dark:border-[#201e2b] bg-[#fcfbf7] dark:bg-[#0f0e14] space-y-3">
              <span className="text-xs uppercase tracking-widest text-[#7358a8] dark:text-[#a895d3] font-medium">
                Core Disciplines
              </span>
              <div className="text-xs text-[#524f5c] dark:text-[#a19cae] space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#7358a8] dark:text-[#a895d3] shrink-0" />
                  <span>Exploratory Data Analysis, Data Wrangling (Pandas/NumPy)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#7358a8] dark:text-[#a895d3] shrink-0" />
                  <span>Interactive React & Next.js Architecture with Tailwind CSS</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#7358a8] dark:text-[#a895d3] shrink-0" />
                  <span>Generative AI System Integration & Prompt Engineering</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative, Academic Milestones & Goals */}
          <div className="lg:col-span-7 space-y-8">
            {/* Perspective Switcher */}
            <div className="flex items-center gap-2 p-1 bg-[#eae7df] dark:bg-[#17151f] rounded-lg w-fit">
              <button
                onClick={() => setActiveTab('narrative')}
                className={`px-4 py-2 text-xs font-medium rounded-md transition-colors ${
                  activeTab === 'narrative'
                    ? 'bg-[#ffffff] dark:bg-[#252233] text-[#141318] dark:text-[#f4f3ef] shadow-sm'
                    : 'text-[#646170] dark:text-[#8e8a9a] hover:text-[#141318] dark:hover:text-[#f4f3ef]'
                }`}
              >
                Philosophy & Narrative
              </button>
              <button
                onClick={() => setActiveTab('focus')}
                className={`px-4 py-2 text-xs font-medium rounded-md transition-colors ${
                  activeTab === 'focus'
                    ? 'bg-[#ffffff] dark:bg-[#252233] text-[#141318] dark:text-[#f4f3ef] shadow-sm'
                    : 'text-[#646170] dark:text-[#8e8a9a] hover:text-[#141318] dark:hover:text-[#f4f3ef]'
                }`}
              >
                Key Academic Programs
              </button>
            </div>

            {/* Tab 1: Narrative */}
            {activeTab === 'narrative' ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6 text-[#4a4754] dark:text-[#a9a4b5] font-body leading-relaxed"
              >
                <p className="text-lg md:text-xl text-[#1e1c24] dark:text-[#eceae4] font-editorial font-normal leading-relaxed">
                  &ldquo;Software shouldn&apos;t just compute—it should resonate. I develop systems that
                  unite clean mathematical clarity with quiet, high-craft aesthetics.&rdquo;
                </p>

                <p className="text-sm md:text-base">
                  {PERSONAL_INFO.bio}
                </p>

                <p className="text-sm md:text-base">
                  {PERSONAL_INFO.goals}
                </p>

              </motion.div>
            ) : (
              /* Tab 2: Academic Focus (Highlighting AI Course & PGDCA) */
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {/* Course 1: PGDCA */}
                <div className="p-6 rounded-xl border border-[#dedcd4] dark:border-[#282637] bg-[#f8f7f2] dark:bg-[#121118] space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-[#e7e3f2] dark:bg-[#251e36] text-[#7358a8] dark:text-[#a895d3]">
                        <GraduationCap className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-editorial text-xl text-[#141318] dark:text-[#f4f3ef] font-medium">
                          Post Graduate Diploma in Computer Applications (PGDCA)
                        </h4>
                        <span className="text-xs text-[#7358a8] dark:text-[#a895d3] font-tabular">
                          Advanced Systems & Software Foundations
                        </span>
                      </div>
                    </div>
                    <span className="text-xs text-[#6e6b79] dark:text-[#8e8a9c] font-tabular shrink-0">
                      2024 — Present
                    </span>
                  </div>
                  <p className="text-xs text-[#524f5c] dark:text-[#9e9aa8] leading-relaxed">
                    Rigorous academic immersion in database systems, relational algebra, object-oriented
                    software design, and advanced algorithmic computation. Equips me with strong
                    backend and structural software fundamentals.
                  </p>
                </div>

                {/* Course 2: AI Course */}
                <div className="p-6 rounded-xl border border-[#dedcd4] dark:border-[#282637] bg-[#f8f7f2] dark:bg-[#121118] space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-[#e7e3f2] dark:bg-[#251e36] text-[#7358a8] dark:text-[#a895d3]">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-editorial text-xl text-[#141318] dark:text-[#f4f3ef] font-medium">
                          Applied Artificial Intelligence & Machine Learning
                        </h4>
                        <span className="text-xs text-[#7358a8] dark:text-[#a895d3] font-tabular">
                          Neural Networks, Prompt Engineering & Model Integration
                        </span>
                      </div>
                    </div>
                    <span className="text-xs text-[#6e6b79] dark:text-[#8e8a9c] font-tabular shrink-0">
                      Completed 2024
                    </span>
                  </div>
                  <p className="text-xs text-[#524f5c] dark:text-[#9e9aa8] leading-relaxed">
                    Specialized training in machine learning workflows: data pre-processing, Scikit-Learn
                    classification and regression pipelines, deep learning foundations, and modern
                    generative AI integrations utilizing the Gemini API.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Statistics / Highlights strip (4 KPI Metrics) — cinematic count-up reveal */}
            <StatsStrip stats={PERSONAL_INFO.stats} />
          </div>
        </div>
      </div>
    </section>
  );
}
