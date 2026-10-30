import { useState, useRef } from 'react';
import { Download, ExternalLink, FileText, Check, Upload, RefreshCw } from 'lucide-react';

interface ResumeSectionProps {
  onDownloadResume: () => void;
}

export default function ResumeSection({ onDownloadResume }: ResumeSectionProps) {
  const [activeTab, setActiveTab] = useState<'preview' | 'text'>('preview');
  const [customPdfName, setCustomPdfName] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleOpenNewTab = () => {
    window.open('/resume.pdf', '_blank', 'noopener,noreferrer');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCustomPdfName(file.name);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3500);
    }
  };

  return (
    <section id="resume" className="py-24 md:py-32 relative border-t border-[#e8e6df] dark:border-[#1d1b26]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-6 border-b border-[#e5e3dc] dark:border-[#201e2b]">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] text-[#7358a8] dark:text-[#a895d3] font-semibold">
              Curriculum Vitae · 05
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-normal text-[#141318] dark:text-[#f4f3ef] tracking-tight">
              Resume & Credentials
            </h2>
          </div>

          {/* Action cluster: Download + Open in New Tab + Upload */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onDownloadResume}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#17161b] dark:bg-[#f4f3ef] dark:text-[#0f0e12] rounded-md hover:bg-[#2c2936] dark:hover:bg-[#dfdcd3] transition-all shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Resume PDF</span>
            </button>

            <button
              onClick={handleOpenNewTab}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium uppercase tracking-wider text-[#17161b] dark:text-[#f4f3ef] border border-[#d6d3ca] dark:border-[#2d2b38] rounded-md hover:border-[#17161b] dark:hover:border-[#9e9aa8] hover:bg-[#f2efe8] dark:hover:bg-[#16151c] transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#7358a8] dark:text-[#a895d3]" />
              <span>Open in New Tab</span>
            </button>

            {/* Replace / Upload PDF button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 text-xs text-[#5f5c6b] dark:text-[#9590a2] border border-dashed border-[#cfccc2] dark:border-[#323040] rounded-md hover:text-[#17161b] dark:hover:text-[#f4f3ef] hover:border-[#7358a8] transition-colors"
              title="Replace resume PDF with your own file"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Replace PDF</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={handleFileUpload}
            />
          </div>
        </div>

        {/* Upload feedback banner */}
        {uploadSuccess && (
          <div className="mb-6 p-4 rounded-lg bg-[#eaf4ec] dark:bg-[#18281d] border border-[#b2d9ba] dark:border-[#27482f] text-xs text-[#204a29] dark:text-[#8ee2a2] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#204a29] dark:text-[#8ee2a2]" />
              <span>Resume PDF updated with &ldquo;{customPdfName}&rdquo;. Download button is now synced.</span>
            </div>
          </div>
        )}

        {/* Resume Preview Presentation Box */}
        <div className="rounded-xl border border-[#dedcd4] dark:border-[#262435] bg-[#f8f7f2] dark:bg-[#111017] shadow-xl overflow-hidden">
          {/* Top toolbar */}
          <div className="px-6 py-4 border-b border-[#e5e3dc] dark:border-[#201e2e] flex flex-wrap items-center justify-between gap-4 bg-[#f3f1e9] dark:bg-[#14131d]">
            <div className="flex items-center gap-3">
              <FileText className="w-4 h-4 text-[#7358a8] dark:text-[#a895d3]" />
              <span className="font-editorial text-base text-[#141318] dark:text-[#f4f3ef] font-medium">
                {customPdfName || 'Developer_DataScience_Resume.pdf'}
              </span>
              <span className="text-[11px] text-[#787584] dark:text-[#888394] font-tabular">
                (Standard Letter · PDF 1.4)
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  activeTab === 'preview'
                    ? 'bg-white dark:bg-[#252233] text-[#141318] dark:text-[#f4f3ef] font-medium shadow-xs'
                    : 'text-[#656272] dark:text-[#8e8a9c]'
                }`}
              >
                Typeset Document
              </button>
              <button
                onClick={() => setActiveTab('text')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  activeTab === 'text'
                    ? 'bg-white dark:bg-[#252233] text-[#141318] dark:text-[#f4f3ef] font-medium shadow-xs'
                    : 'text-[#656272] dark:text-[#8e8a9c]'
                }`}
              >
                Plain Text
              </button>
            </div>
          </div>

          {/* Document Content Viewport */}
          <div className="p-8 md:p-14 max-w-4xl mx-auto space-y-10 font-body">
            {activeTab === 'preview' ? (
              <div className="space-y-8 bg-white dark:bg-[#0c0c10] p-8 md:p-12 rounded-lg border border-[#e8e6df] dark:border-[#1e1c28] shadow-sm">
                {/* Header */}
                <div className="border-b border-[#eceae3] dark:border-[#1e1c28] pb-6 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                    <h3 className="font-editorial text-3xl font-normal tracking-tight text-[#141318] dark:text-[#f4f3ef]">
                      Developer &amp; Data Science Student
                    </h3>
                    <span className="text-xs text-[#7358a8] dark:text-[#a895d3] font-tabular">
                      contact@developer.portfolio
                    </span>
                  </div>
                  <p className="text-xs text-[#6e6b79] dark:text-[#8e8a9c] font-tabular">
                    Web Development · Machine Learning · Exploratory Data Analysis · Generative AI
                  </p>
                </div>

                {/* Professional Summary */}
                <div className="space-y-2">
                  <h4 className="text-xs uppercase tracking-widest text-[#7358a8] dark:text-[#a895d3] font-semibold">
                    Professional Summary
                  </h4>
                  <p className="text-xs sm:text-sm text-[#4e4b59] dark:text-[#a19cae] leading-relaxed">
                    Results-driven Developer and Data Science Student with core expertise across modern web
                    architectures (React, Next.js, Tailwind CSS), analytical pipelines (Pandas, NumPy, Matplotlib),
                    and artificial intelligence workflows. Proven ability to turn complex analytical data models
                    into responsive, cinematic user applications.
                  </p>
                </div>

                {/* Education & Academic Courses (Explicit AI & PGDCA) */}
                <div className="space-y-4">
                  <h4 className="text-xs uppercase tracking-widest text-[#7358a8] dark:text-[#a895d3] font-semibold">
                    Education &amp; Specialized Courses
                  </h4>
                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 text-xs">
                      <div>
                        <span className="font-medium text-[#141318] dark:text-[#f4f3ef]">
                          Post Graduate Diploma in Computer Applications (PGDCA)
                        </span>
                        <p className="text-[#686574] dark:text-[#8b8798]">
                          Database Management Systems, Systems Programming, Algorithm Architecture
                        </p>
                      </div>
                      <span className="text-[#7358a8] dark:text-[#a895d3] font-tabular shrink-0">
                        2024 — Present
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 text-xs">
                      <div>
                        <span className="font-medium text-[#141318] dark:text-[#f4f3ef]">
                          Applied Artificial Intelligence &amp; Machine Learning Specialization
                        </span>
                        <p className="text-[#686574] dark:text-[#8b8798]">
                          Neural Networks, Deep Learning, Prompt Engineering, Gemini AI Integration
                        </p>
                      </div>
                      <span className="text-[#7358a8] dark:text-[#a895d3] font-tabular shrink-0">
                        Completed 2024
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 text-xs">
                      <div>
                        <span className="font-medium text-[#141318] dark:text-[#f4f3ef]">
                          Bachelor of Science in Information Technology / Computer Science
                        </span>
                        <p className="text-[#686574] dark:text-[#8b8798]">
                          Core Computer Science Foundations, Data Structures, Web Engineering
                        </p>
                      </div>
                      <span className="text-[#7358a8] dark:text-[#a895d3] font-tabular shrink-0">
                        2021 — 2024
                      </span>
                    </div>
                  </div>
                </div>

                {/* Technical Expertise */}
                <div className="space-y-2">
                  <h4 className="text-xs uppercase tracking-widest text-[#7358a8] dark:text-[#a895d3] font-semibold">
                    Technical Expertise
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="font-medium text-[#141318] dark:text-[#f4f3ef]">Languages: </span>
                      <span className="text-[#595665] dark:text-[#9e9aa8]">Python, JavaScript, TypeScript, SQL, HTML5, CSS3</span>
                    </div>
                    <div>
                      <span className="font-medium text-[#141318] dark:text-[#f4f3ef]">Frontend: </span>
                      <span className="text-[#595665] dark:text-[#9e9aa8]">React, Next.js, Tailwind CSS, Motion</span>
                    </div>
                    <div>
                      <span className="font-medium text-[#141318] dark:text-[#f4f3ef]">Data Science &amp; AI: </span>
                      <span className="text-[#595665] dark:text-[#9e9aa8]">Pandas, NumPy, Matplotlib, Scikit-Learn, Gemini AI API</span>
                    </div>
                    <div>
                      <span className="font-medium text-[#141318] dark:text-[#f4f3ef]">Tools: </span>
                      <span className="text-[#595665] dark:text-[#9e9aa8]">Git, GitHub, VS Code, Vite, Linux/Bash</span>
                    </div>
                  </div>
                </div>

                {/* Featured Projects Highlight */}
                <div className="space-y-3">
                  <h4 className="text-xs uppercase tracking-widest text-[#7358a8] dark:text-[#a895d3] font-semibold">
                    Representative Projects
                  </h4>
                  <div className="space-y-2 text-xs text-[#524f5c] dark:text-[#9e9aa8]">
                    <p>
                      <strong className="text-[#141318] dark:text-[#f4f3ef]">1. Custom AI Chatbot: </strong>
                      Generative conversational agent powered by Gemini AI API with streaming responses and contextual memory.
                    </p>
                    <p>
                      <strong className="text-[#141318] dark:text-[#f4f3ef]">2. Medical Shop Inventory Management: </strong>
                      Clinical pharmaceutical inventory platform tracking 14k+ SKUs with batch expiry predictions.
                    </p>
                    <p>
                      <strong className="text-[#141318] dark:text-[#f4f3ef]">3. Data Analysis &amp; Visualization Suite: </strong>
                      Exploratory data analytics dashboard demonstrating feature correlations and statistical distributions.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <pre className="p-6 rounded-lg bg-[#ffffff] dark:bg-[#0c0c10] border border-[#e8e6df] dark:border-[#1e1c28] text-xs font-mono text-[#4a4754] dark:text-[#a8a3b5] overflow-x-auto whitespace-pre-wrap leading-relaxed">
{`DEVELOPER | DATA SCIENCE STUDENT
Email: contact@developer.portfolio  |  GitHub: github.com/developer

PROFESSIONAL SUMMARY
Results-driven Developer and Data Science Student with deep expertise across modern web architectures,
interactive visualization, and machine learning pipelines. Passionate about crafting high-performance,
cinematic digital experiences and building data-driven systems that deliver measurable impact.

EDUCATION & PROFESSIONAL COURSES
• Post Graduate Diploma in Computer Applications (PGDCA) | 2024 — Present
  - Advanced Database Management Systems (RDBMS & SQL Normalization)
  - Data Structures & Systems Programming
• Applied Artificial Intelligence & Machine Learning Specialization | Completed 2024
  - Deep Learning Architectures, Neural Networks, Prompt Engineering, Gemini AI API
• Bachelor of Science in Information Technology / Computer Science | 2021 — 2024
  - Graduated with Academic Honors, Capstone Full-Stack Architecture

TECHNICAL SKILLS
• Programming: Python, JavaScript, TypeScript, SQL
• Frontend: React, Next.js, Tailwind CSS, Motion
• Data Science: Pandas, NumPy, Matplotlib, Exploratory Data Analysis (EDA)
• AI & Machine Learning: Scikit-Learn, Prompt Engineering, Gemini AI API
• Tools: Git, GitHub, VS Code, Vite, Linux/Bash`}
              </pre>
            )}

            {/* Bottom Download Prompt */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-lg border border-[#e2e0d8] dark:border-[#222030] bg-[#fdfdfb] dark:bg-[#13121b]">
              <div>
                <h5 className="font-editorial text-lg text-[#141318] dark:text-[#f4f3ef] font-medium">
                  Ready for detailed review?
                </h5>
                <p className="text-xs text-[#6e6b79] dark:text-[#8e8a9c]">
                  Get the official PDF version for archiving or application tracking.
                </p>
              </div>
              <button
                onClick={onDownloadResume}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#17161b] dark:bg-[#f4f3ef] dark:text-[#0f0e12] rounded-md hover:bg-[#2c2936] dark:hover:bg-[#dfdcd3] transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
