import { motion } from 'motion/react';
import { FileText, Download, ExternalLink } from 'lucide-react';

export default function ResumeSection() {
  return (
    <section id="resume" className="py-20 md:py-28 relative border-t border-[#e8e6df] dark:border-[#1d1b26] overflow-hidden">
      {/* Subtle Purple Background Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[320px] bg-[#7358a8]/8 dark:bg-[#7358a8]/14 blur-[130px] pointer-events-none rounded-full"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-normal text-[#141318] dark:text-[#f4f3ef] tracking-tight">
            Resume
          </h2>
          <p className="text-sm sm:text-base text-[#5f5c6b] dark:text-[#9e9aa8] leading-relaxed">
            View or download my verified official curriculum vitae document.
          </p>
        </div>

        {/* Minimal Luxury Resume Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto rounded-2xl border border-[#dedcd4] dark:border-[#262438] bg-[#fcfbf7]/80 dark:bg-[#111017]/85 backdrop-blur-md p-6 sm:p-8 md:p-10 shadow-sm relative overflow-hidden group hover:border-[#7358a8]/40 dark:hover:border-[#7358a8]/50 transition-all duration-300"
        >
          {/* Subtle hover gradient wash */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#7358a8]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Document Info */}
            <div className="flex items-center gap-4 text-left w-full md:w-auto">
              <div className="p-3.5 rounded-xl bg-[#7358a8]/10 dark:bg-[#7358a8]/20 text-[#7358a8] dark:text-[#a895d3] shrink-0">
                <FileText className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-editorial text-lg sm:text-xl font-medium text-[#141318] dark:text-[#f4f3ef]">
                    Rythm_Kochar_Resume.pdf
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-[#7358a8]/15 text-[#7358a8] dark:text-[#a895d3]">
                    PDF
                  </span>
                </div>
                <p className="text-xs text-[#6e6b79] dark:text-[#8e8a9c] font-tabular">
                  Official Resume Document · Verified Copy
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto shrink-0">
              {/* 1. View Resume (opens PDF directly in a new tab) */}
              <a
                href="/Rythm_Kochar_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-semibold uppercase tracking-widest text-white bg-[#17161b] dark:bg-[#f4f3ef] dark:text-[#0f0e12] rounded-md hover:bg-[#2c2936] dark:hover:bg-[#dfdcd3] transition-all shadow-sm cursor-pointer whitespace-nowrap"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#a895d3] dark:text-[#7358a8]" />
                <span>View Resume</span>
              </a>

              {/* 2. Download Resume PDF */}
              <a
                href="/Rythm_Kochar_Resume.pdf"
                download="Rythm_Kochar_Resume.pdf"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-semibold uppercase tracking-widest text-[#17161b] dark:text-[#f4f3ef] border border-[#d6d3ca] dark:border-[#2d2b38] rounded-md hover:border-[#7358a8] dark:hover:border-[#a895d3] hover:bg-[#f2efe8] dark:hover:bg-[#16151c] transition-all cursor-pointer whitespace-nowrap"
              >
                <Download className="w-3.5 h-3.5 text-[#7358a8] dark:text-[#a895d3]" />
                <span>Download PDF</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
