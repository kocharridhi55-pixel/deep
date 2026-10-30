import { motion } from 'motion/react';
import { ArrowUpRight, Code, Sparkles, Layers } from 'lucide-react';
import { Project } from '../types/portfolio';
import { PROJECTS_DATA } from '../data/portfolioData';

interface ProjectsProps {
  onSelectProject: (project: Project) => void;
  onViewSource: (project: Project) => void;
}

export default function Projects({ onSelectProject, onViewSource }: ProjectsProps) {
  return (
    <section id="projects" className="py-24 md:py-32 relative border-t border-[#e8e6df] dark:border-[#1d1b26]">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#856cae]/5 dark:bg-[#7859a8]/8 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20 pb-6 border-b border-[#e5e3dc] dark:border-[#201e2b]">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] text-[#7358a8] dark:text-[#a895d3] font-semibold">
              Selected Works · 03
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-normal text-[#141318] dark:text-[#f4f3ef] tracking-tight">
              Featured Engineering Projects
            </h2>
          </div>
          <p className="text-xs md:text-sm text-[#666270] dark:text-[#8d8898] max-w-md font-body">
            A cinematic exhibition of machine learning tools, real-time web applications, and exploratory data systems.
          </p>
        </div>

        {/* Projects List with Alternating Editorial Layout */}
        <div className="space-y-24 md:space-y-36">
          {PROJECTS_DATA.map((project, index) => {
            const isReversed = index % 2 === 1;

            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center ${
                  isReversed ? 'lg:grid-flow-dense' : ''
                }`}
              >
                {/* Media Container (Oversized image with zoom & reflection) */}
                <div
                  className={`lg:col-span-7 ${
                    isReversed ? 'lg:col-start-6' : 'lg:col-start-1'
                  }`}
                >
                  <div
                    onClick={() => onSelectProject(project)}
                    className="group relative cursor-pointer rounded-xl overflow-hidden border border-[#dedcd4] dark:border-[#252332] bg-[#100f16] shadow-xl"
                  >
                    <div className="aspect-[16/10] w-full overflow-hidden relative">
                      <img
                        src={project.image}
                        alt={`${project.title} preview`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />

                      {/* Dark gradient scrim */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0e0d13]/90 via-[#0e0d13]/20 to-transparent pointer-events-none" />

                      {/* Interactive hover CTA overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
                        <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#111016] text-xs font-semibold uppercase tracking-wider shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                          <Sparkles className="w-3.5 h-3.5 text-[#7358a8]" />
                          <span>Launch Live Preview</span>
                        </span>
                      </div>

                      {/* Project Index Watermark / Tag */}
                      <div className="absolute top-4 left-4 text-xs font-tabular tracking-wider uppercase text-white/80 bg-black/50 backdrop-blur-md px-3 py-1 rounded-md border border-white/10">
                        {String(index + 1).padStart(2, '0')} / 05
                      </div>
                    </div>

                    {/* Bottom Image Caption Bar */}
                    <div className="p-4 bg-[#14131b] border-t border-white/10 flex items-center justify-between text-xs text-white/80 font-tabular">
                      <div className="flex items-center gap-2">
                        <Layers className="w-3.5 h-3.5 text-[#a895d3]" />
                        <span>{project.category}</span>
                      </div>
                      <span className="text-white/60">Click to interact</span>
                    </div>
                  </div>
                </div>

                {/* Narrative & Details Column */}
                <div
                  className={`lg:col-span-5 space-y-6 ${
                    isReversed ? 'lg:col-start-1' : 'lg:col-start-8'
                  }`}
                >
                  {/* Category & Subtitle (Unboxed metadata, no pills) */}
                  <div className="space-y-1">
                    <span className="text-xs uppercase tracking-widest text-[#7358a8] dark:text-[#a895d3] font-semibold">
                      {project.category}
                    </span>
                    <h3 className="font-editorial text-2xl sm:text-3xl md:text-4xl font-normal text-[#141318] dark:text-[#f4f3ef] tracking-tight">
                      {project.title}
                    </h3>
                    <p className="text-xs text-[#6e6b79] dark:text-[#8e8a9c] font-tabular">
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-[#4e4b59] dark:text-[#9e9aa8] leading-relaxed font-body">
                    {project.description}
                  </p>

                  {/* Quantitative Metrics (Claim-to-Proof Adjacency §1.H) */}
                  <div className="grid grid-cols-3 gap-3 py-2 border-y border-[#e5e3dc] dark:border-[#201e2b]">
                    {project.metrics.map((metric) => (
                      <div key={metric.label} className="space-y-0.5">
                        <span className="font-editorial text-lg md:text-xl font-medium text-[#141318] dark:text-[#f4f3ef] font-tabular">
                          {metric.value}
                        </span>
                        <p className="text-[10px] uppercase tracking-wider text-[#736f80] dark:text-[#888494]">
                          {metric.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Technologies Used (Clean unboxed text with · separators §1.A) */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] uppercase tracking-wider text-[#7a7687] dark:text-[#807b8c] font-medium">
                      Architecture & Stack
                    </span>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#524f5c] dark:text-[#a5a0b2] font-tabular">
                      {project.technologies.map((tech, techIdx) => (
                        <span key={tech} className="inline-flex items-center gap-2">
                          <span>{tech}</span>
                          {techIdx < project.technologies.length - 1 && (
                            <span aria-hidden="true" className="text-[#a09cae] dark:text-[#524e60]">·</span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons: View Project & View Source Code */}
                  <div className="flex items-center gap-3 pt-2">
                    <button
                      onClick={() => onSelectProject(project)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#17161b] dark:bg-[#f4f3ef] dark:text-[#0f0e12] rounded-md hover:bg-[#2c2936] dark:hover:bg-[#dfdcd3] transition-all shadow-sm"
                    >
                      <span>View Project</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onViewSource(project)}
                      className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium uppercase tracking-wider text-[#17161b] dark:text-[#f4f3ef] border border-[#d6d3ca] dark:border-[#2d2b38] rounded-md hover:border-[#17161b] dark:hover:border-[#9e9aa8] hover:bg-[#f2efe8] dark:hover:bg-[#16151c] transition-all"
                    >
                      <Code className="w-3.5 h-3.5 text-[#7358a8] dark:text-[#a895d3]" />
                      <span>Source Code</span>
                    </button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
