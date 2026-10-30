import { ArrowUp } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#e5e3dc] dark:border-[#1d1b26] py-14 bg-[#f8f7f2] dark:bg-[#0c0c0f] font-body">
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left Column: Brand & Tagline */}
        <div className="space-y-1 text-center md:text-left">
          <span className="font-editorial text-xl font-medium tracking-tight text-[#141318] dark:text-[#f4f3ef]">
            KOCHAR <span className="italic font-light text-[#7358a8] dark:text-[#a895d3]">/ EDITORIAL</span>
          </span>
          <p className="text-xs text-[#6e6b79] dark:text-[#8e8a9c] font-tabular">
            Developer · Data Science Student · 2026 Portfolio
          </p>
        </div>

        {/* Center: Clean single-line links */}
        <div className="flex flex-wrap justify-center items-center gap-6 text-xs text-[#5f5c6b] dark:text-[#9590a2] font-tabular">
          <a href="#about" className="hover:text-[#141318] dark:hover:text-[#f4f3ef] transition-colors">About</a>
          <a href="#skills" className="hover:text-[#141318] dark:hover:text-[#f4f3ef] transition-colors">Skills</a>
          <a href="#projects" className="hover:text-[#141318] dark:hover:text-[#f4f3ef] transition-colors">Projects</a>
          <a href="#experience" className="hover:text-[#141318] dark:hover:text-[#f4f3ef] transition-colors">Experience</a>
          <a href="#resume" className="hover:text-[#141318] dark:hover:text-[#f4f3ef] transition-colors">Resume</a>
          <a href="#contact" className="hover:text-[#141318] dark:hover:text-[#f4f3ef] transition-colors">Contact</a>
        </div>

        {/* Right: Scroll to top */}
        <div className="flex items-center gap-4">
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[#d6d3ca] dark:border-[#272535] text-xs text-[#605d6e] dark:text-[#9590a2] hover:text-[#141318] dark:hover:text-[#f4f3ef] hover:border-[#141318] transition-colors"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
