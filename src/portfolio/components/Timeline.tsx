import { useState } from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Briefcase, Award, BookOpen, Check } from 'lucide-react';
import { TIMELINE_DATA } from '../data/portfolioData';

export default function Timeline() {
  const [filterType, setFilterType] = useState<'all' | 'education' | 'experience'>('all');

  const filteredItems = TIMELINE_DATA.filter((item) => {
    if (filterType === 'all') return true;
    if (filterType === 'education') return item.type === 'education' || item.type === 'course';
    if (filterType === 'experience') return item.type === 'experience';
    return true;
  });

  return (
    <section id="experience" className="py-24 md:py-32 relative border-t border-[#e8e6df] dark:border-[#1d1b26]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-6 border-b border-[#e5e3dc] dark:border-[#201e2b]">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] text-[#7358a8] dark:text-[#a895d3] font-semibold">
              Trajectory & Pedagogy · 04
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-normal text-[#141318] dark:text-[#f4f3ef] tracking-tight">
              Education & Experience
            </h2>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-[#eae7df] dark:bg-[#16141e] rounded-lg">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all ${
                filterType === 'all'
                  ? 'bg-white dark:bg-[#252233] text-[#141318] dark:text-[#f4f3ef] shadow-sm'
                  : 'text-[#646170] dark:text-[#8e8a9a] hover:text-[#141318] dark:hover:text-[#f4f3ef]'
              }`}
            >
              All Milestones
            </button>
            <button
              onClick={() => setFilterType('education')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all ${
                filterType === 'education'
                  ? 'bg-white dark:bg-[#252233] text-[#141318] dark:text-[#f4f3ef] shadow-sm'
                  : 'text-[#646170] dark:text-[#8e8a9a] hover:text-[#141318] dark:hover:text-[#f4f3ef]'
              }`}
            >
              Education & Courses
            </button>
            <button
              onClick={() => setFilterType('experience')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all ${
                filterType === 'experience'
                  ? 'bg-white dark:bg-[#252233] text-[#141318] dark:text-[#f4f3ef] shadow-sm'
                  : 'text-[#646170] dark:text-[#8e8a9a] hover:text-[#141318] dark:hover:text-[#f4f3ef]'
              }`}
            >
              Experience
            </button>
          </div>
        </div>

        {/* Minimal Vertical Timeline */}
        <div className="relative border-l border-[#dcdad3] dark:border-[#262433] ml-4 md:ml-32 space-y-12">
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
                <div className="hidden md:block absolute -left-32 top-2 w-24 text-right text-xs text-[#716e7e] dark:text-[#8d889c] font-tabular">
                  {item.period}
                </div>

                {/* Card Container */}
                <div className="p-6 rounded-xl border border-[#dedcd4] dark:border-[#22202e] bg-[#f8f7f2] dark:bg-[#111017] hover:border-[#17161b]/30 dark:hover:border-[#a895d3]/40 transition-all shadow-sm">
                  {/* Period for mobile */}
                  <span className="md:hidden block text-xs text-[#716e7e] dark:text-[#8d889c] font-tabular mb-1">
                    {item.period}
                  </span>

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
                  <p className="text-xs sm:text-sm text-[#504d5b] dark:text-[#9e9aa8] leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="space-y-1.5 pt-2 border-t border-[#e8e6df] dark:border-[#1f1d2a]">
                    {item.highlights.map((highlight, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2 text-xs text-[#5f5b6b] dark:text-[#918c9e]">
                        <Check className="w-3 h-3 text-[#7358a8] dark:text-[#a895d3] shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
