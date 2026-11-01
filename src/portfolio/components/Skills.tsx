import { useState } from 'react';
import { motion } from 'motion/react';
import { Search } from 'lucide-react';
import { SKILLS_DATA } from '../data/portfolioData';

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Programming', 'Frontend', 'Data Science', 'AI & ML', 'Tools'];

  const filteredSkills = SKILLS_DATA.filter((skill) => {
    const matchesCategory = selectedCategory === 'All' || skill.category === selectedCategory;
    const matchesSearch =
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="skills" className="py-16 md:py-20 relative border-t border-[#e8e6df] dark:border-[#1d1b26]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 mb-8 pb-5 md:mb-10 md:pb-6 border-b border-[#e5e3dc] dark:border-[#201e2b]">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] text-[#7358a8] dark:text-[#a895d3] font-semibold">
              Technical Competencies · 02
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-normal text-[#141318] dark:text-[#f4f3ef] tracking-tight">
              Skills & Engineering Stack
            </h2>
          </div>
          <p className="text-xs md:text-sm text-[#666270] dark:text-[#8d8898] max-w-md font-body">
            Curated toolkit covering computational algorithms, data pipelines, and responsive frontend systems.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-8">
          {/* Functional Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#eae7df] dark:bg-[#16141e] rounded-lg">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap shrink-0 ${
                  selectedCategory === category
                    ? 'bg-[#ffffff] dark:bg-[#252233] text-[#141318] dark:text-[#f4f3ef] shadow-sm'
                    : 'text-[#646170] dark:text-[#8e8a9a] hover:text-[#141318] dark:hover:text-[#f4f3ef]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Quick Search input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#7c7888] dark:text-[#837e90]" />
            <input
              type="text"
              placeholder="Search skills (e.g. Python)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-md border border-[#d8d5cc] dark:border-[#272535] bg-[#fcfbf7] dark:bg-[#100f16] text-[#141318] dark:text-[#f4f3ef] placeholder:text-[#8e8a9a] focus:outline-none focus:border-[#7358a8] dark:focus:border-[#a895d3] transition-colors"
            />
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.04 }}
              className="group p-5 rounded-xl border border-[#dedcd4] dark:border-[#22202e] bg-[#f8f7f2] dark:bg-[#111017] hover:border-[#17161b]/30 dark:hover:border-[#a895d3]/40 transition-all shadow-sm hover:shadow-md flex flex-col justify-between h-full"
            >
              {/* Header: Name + Category metadata (No pills: unboxed text with separator) */}
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <h3 className="font-editorial text-lg text-[#141318] dark:text-[#f4f3ef] font-medium group-hover:text-[#7358a8] dark:group-hover:text-[#b4a4d9] transition-colors">
                      {skill.name}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-[#6e6b79] dark:text-[#8e899c] font-tabular">
                      <span>{skill.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{skill.proficiencyText}</span>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-[#7358a8] dark:text-[#a895d3] font-tabular">
                    {skill.level}%
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-[#524f5c] dark:text-[#9e9aa8] leading-relaxed mb-4">
                  {skill.description}
                </p>
              </div>

              {/* Animated Progress Indicator Bar */}
              <div className="w-full h-1 bg-[#e3e0d8] dark:border dark:border-[#262434] dark:bg-[#191722] rounded-full overflow-hidden mt-auto">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full bg-gradient-to-r from-[#7358a8] to-[#9f8cc9]"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty state if search finds nothing */}
        {filteredSkills.length === 0 && (
          <div className="py-16 text-center text-[#757182] dark:text-[#8a8596] text-xs">
            No matching technologies found for &ldquo;{searchQuery}&rdquo;. Try another keyword.
          </div>
        )}
      </div>
    </section>
  );
}
