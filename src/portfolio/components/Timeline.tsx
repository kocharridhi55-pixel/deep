import { motion } from 'motion/react';
import { GraduationCap, Briefcase, Award, Check } from 'lucide-react';
import { TIMELINE_DATA } from '../data/portfolioData';

export default function Timeline() {
  const filteredItems = TIMELINE_DATA;

  return (
    <section id="experience" className="py-16 md:py-20 relative border-t border-[#e8e6df] dark:border-[#1d1b26]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 mb-10 pb-5 md:mb-12 md:pb-6 border-b border-[#e5e3dc] dark:border-[#201e2b]">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] text-[#7358a8] dark:text-[#a895d3] font-semibold">
              Trajectory &amp; Foundation · 04
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-normal text-[#141318] dark:text-[#f4f3ef] tracking-tight">
              Education &amp; Experience
            </h2>
          </div>
          <p className="text-xs md:text-sm text-[#666270] dark:text-[#8d8898] max-w-md font-body">
            Academic credentials, computer application specialization, and technical coursework.
          </p>
        </div>

        {/* Minimal Vertical Timeline */}
        {filteredItems.length === 0 ? (
          <div className="py-16 text-center text-xs font-tabular tracking-wider uppercase text-[#716e7e] dark:text-[#8d889c]">
            No experience records to display
          </div>
        ) : (
          <div className="relative border-l border-[#dcdad3] dark:border-[#262433] ml-4 md:ml-32 space-y-8 md:space-y-10">
          {filteredItems.map((item, index) => {
            const isCourse = item.type === 'course';
            const isEducation = item.type === 'education';

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative pl-8 md:pl-12 group"
              >
                {/* Node icon */}
                <div className="absolute -left-3.5 top-1.5 w-7 h-7 rounded-full border border-[#d2cfc4] dark:border-[#383449] bg-[#f8f7f2] dark:bg-[#121118] flex items-center justify-center text-[#7358a8] dark:text-[#a895d3] group-hover:border-[#7358a8] dark:group-hover:border-[#a895d3] transition-colors shadow-sm">
                  {isCourse ? (
                    <Award className="w-3.5 h-3.5" />
                  ) : isEducation ? (
                    <GraduationCap className="w-3.5 h-3.5" />
                  ) : (
                    <Briefcase className="w-3.5 h-3.5" />
                  )}
                </div>

                {/* Period label for desktop (offset left) */}
                {item.period ? (
                  <div className="hidden md:block absolute -left-32 top-2 w-24 text-right text-xs text-[#716e7e] dark:text-[#8d889c] font-tabular">
                    {item.period}
                  </div>
                ) : null}

                {/* Card Container */}
                <div className="p-6 rounded-xl border border-[#dedcd4] dark:border-[#22202e] bg-[#f8f7f2] dark:bg-[#111017] hover:border-[#17161b]/30 dark:hover:border-[#a895d3]/40 transition-all shadow-sm">
                  {/* Period for mobile */}
                  {item.period ? (
                    <span className="md:hidden block text-xs text-[#716e7e] dark:text-[#8d889c] font-tabular mb-1">
                      {item.period}
                    </span>
                  ) : null}

                  {/* Title & Institution */}
                  <div className="mb-3">
                    <h3 className="font-editorial text-xl sm:text-2xl font-medium text-[#141318] dark:text-[#f4f3ef]">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#7358a8] dark:text-[#a895d3] font-tabular mt-0.5">
                      {item.institution}
                    </p>
                  </div>

                  {/* Description */}
                  {item.description ? (
                    <p
                      className={`text-xs sm:text-sm text-[#504d5b] dark:text-[#9e9aa8] leading-relaxed ${
                        item.highlights && item.highlights.length > 0 ? 'mb-4' : ''
                      }`}
                    >
                      {item.description}
                    </p>
                  ) : null}

                  {/* Highlights Bullet List */}
                  {item.highlights && item.highlights.length > 0 ? (
                    <div className="space-y-1.5 pt-2 border-t border-[#e8e6df] dark:border-[#1f1d2a]">
                      {item.highlights.map((highlight, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-2 text-xs text-[#5f5b6b] dark:text-[#918c9e]">
                          <Check className="w-3 h-3 text-[#7358a8] dark:text-[#a895d3] shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  </section>
);
}
