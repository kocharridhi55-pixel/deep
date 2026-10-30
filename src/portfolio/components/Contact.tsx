import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Mail, Github, Linkedin, ArrowUpRight, Loader2 } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (status !== 'idle') {
      setStatus('idle');
      setFeedbackMessage('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side quick checks
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setStatus('error');
      setFeedbackMessage('Please enter your full name (at least 2 characters).');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setStatus('error');
      setFeedbackMessage('Please enter a valid email address.');
      return;
    }

    if (!formData.subject.trim() || formData.subject.trim().length < 2) {
      setStatus('error');
      setFeedbackMessage('Please enter a subject line for your message.');
      return;
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setStatus('error');
      setFeedbackMessage('Message must be at least 10 characters in length.');
      return;
    }

    setStatus('loading');
    setFeedbackMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        setFeedbackMessage(data.message || 'Your inquiry has been successfully delivered.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
        setFeedbackMessage(data.error || 'Failed to submit message. Please check the fields and try again.');
      }
    } catch (err: any) {
      setStatus('error');
      setFeedbackMessage('Network communication error. Please try again or reach out via email directly.');
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative border-t border-[#e8e6df] dark:border-[#1d1b26]">
      {/* Background glow */}
      <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] bg-[#8973b5]/6 dark:bg-[#725a9f]/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-6 border-b border-[#e5e3dc] dark:border-[#201e2b]">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] text-[#7358a8] dark:text-[#a895d3] font-semibold">
              Direct Communication · 06
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-normal text-[#141318] dark:text-[#f4f3ef] tracking-tight">
              Initiate A Conversation
            </h2>
          </div>
          <p className="text-xs md:text-sm text-[#666270] dark:text-[#8d8898] max-w-md font-body">
            Inquiries regarding full-stack engineering, data science research, or technical collaboration are welcomed.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Inquiries & Social Profiles */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h3 className="font-editorial text-2xl text-[#141318] dark:text-[#f4f3ef] font-medium">
                Let&apos;s build something meaningful.
              </h3>
              <p className="text-xs sm:text-sm text-[#524f5c] dark:text-[#9e9aa8] leading-relaxed">
                Whether you are exploring a machine learning project, seeking a dedicated developer with strong analytical rigor, or discussing academic research, I would be delighted to hear from you.
              </p>
            </div>

            {/* Direct Channels */}
            <div className="space-y-3 pt-2">
              <span className="text-xs uppercase tracking-widest text-[#7358a8] dark:text-[#a895d3] font-semibold">
                Direct Channels
              </span>

              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="group flex items-center justify-between p-4 rounded-xl border border-[#dedcd4] dark:border-[#22202e] bg-[#f8f7f2] dark:bg-[#111017] hover:border-[#17161b]/30 dark:hover:border-[#a895d3]/40 transition-all shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#eae6f4] dark:bg-[#251f33] text-[#7358a8] dark:text-[#a895d3]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-medium text-[#141318] dark:text-[#f4f3ef] block">
                      Electronic Mail
                    </span>
                    <span className="text-xs text-[#6e6b79] dark:text-[#8e8a9c] font-tabular">
                      {PERSONAL_INFO.email}
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#716e7e] dark:text-[#8a8597] group-hover:text-[#141318] dark:group-hover:text-[#f4f3ef] transition-colors" />
              </a>

              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between p-4 rounded-xl border border-[#dedcd4] dark:border-[#22202e] bg-[#f8f7f2] dark:bg-[#111017] hover:border-[#17161b]/30 dark:hover:border-[#a895d3]/40 transition-all shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#eae6f4] dark:bg-[#251f33] text-[#7358a8] dark:text-[#a895d3]">
                    <Github className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-medium text-[#141318] dark:text-[#f4f3ef] block">
                      GitHub Repositories
                    </span>
                    <span className="text-xs text-[#6e6b79] dark:text-[#8e8a9c] font-tabular">
                      Open source code &amp; experiments
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#716e7e] dark:text-[#8a8597] group-hover:text-[#141318] dark:group-hover:text-[#f4f3ef] transition-colors" />
              </a>

              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between p-4 rounded-xl border border-[#dedcd4] dark:border-[#22202e] bg-[#f8f7f2] dark:bg-[#111017] hover:border-[#17161b]/30 dark:hover:border-[#a895d3]/40 transition-all shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#eae6f4] dark:bg-[#251f33] text-[#7358a8] dark:text-[#a895d3]">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-medium text-[#141318] dark:text-[#f4f3ef] block">
                      LinkedIn Network
                    </span>
                    <span className="text-xs text-[#6e6b79] dark:text-[#8e8a9c] font-tabular">
                      Professional profile &amp; trajectory
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#716e7e] dark:text-[#8a8597] group-hover:text-[#141318] dark:group-hover:text-[#f4f3ef] transition-colors" />
              </a>
            </div>

            {/* Note on availability */}
            <div className="p-4 rounded-lg border border-[#e5e3dc] dark:border-[#22202e] bg-[#fcfbf7] dark:bg-[#0f0e15] text-xs text-[#676373] dark:text-[#8e899b]">
              <span className="font-semibold text-[#141318] dark:text-[#f4f3ef] block mb-1">
                Current Status:
              </span>
              Actively reviewing opportunities for Software Engineer, Full-Stack Developer, and Data Science Intern / Associate roles.
            </div>
          </div>

          {/* Right Column: Functional Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-7 md:p-10 rounded-xl border border-[#dedcd4] dark:border-[#262435] bg-[#f8f7f2] dark:bg-[#111017] shadow-xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="name"
                      className="text-xs uppercase tracking-wider text-[#524f5c] dark:text-[#9e9aa8] font-medium block"
                    >
                      Full Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="e.g. Elena Rostova"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 text-xs sm:text-sm rounded-md border border-[#d6d3ca] dark:border-[#292738] bg-[#fdfdfb] dark:bg-[#14131d] text-[#141318] dark:text-[#f4f3ef] placeholder:text-[#8f8b9b] focus:outline-none focus:border-[#7358a8] dark:focus:border-[#a895d3] transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="email"
                      className="text-xs uppercase tracking-wider text-[#524f5c] dark:text-[#9e9aa8] font-medium block"
                    >
                      Email Address *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="e.g. elena@studio.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 text-xs sm:text-sm rounded-md border border-[#d6d3ca] dark:border-[#292738] bg-[#fdfdfb] dark:bg-[#14131d] text-[#141318] dark:text-[#f4f3ef] placeholder:text-[#8f8b9b] focus:outline-none focus:border-[#7358a8] dark:focus:border-[#a895d3] transition-colors"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="subject"
                    className="text-xs uppercase tracking-wider text-[#524f5c] dark:text-[#9e9aa8] font-medium block"
                  >
                    Subject *
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    placeholder="e.g. Collaboration on AI/Data Science Project"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-xs sm:text-sm rounded-md border border-[#d6d3ca] dark:border-[#292738] bg-[#fdfdfb] dark:bg-[#14131d] text-[#141318] dark:text-[#f4f3ef] placeholder:text-[#8f8b9b] focus:outline-none focus:border-[#7358a8] dark:focus:border-[#a895d3] transition-colors"
                  />
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="message"
                    className="text-xs uppercase tracking-wider text-[#524f5c] dark:text-[#9e9aa8] font-medium block"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder="Describe your inquiry, project scope, or opportunity..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-xs sm:text-sm rounded-md border border-[#d6d3ca] dark:border-[#292738] bg-[#fdfdfb] dark:bg-[#14131d] text-[#141318] dark:text-[#f4f3ef] placeholder:text-[#8f8b9b] focus:outline-none focus:border-[#7358a8] dark:focus:border-[#a895d3] transition-colors resize-y"
                  />
                </div>

                {/* Feedback status message */}
                {status === 'success' && (
                  <div className="p-4 rounded-lg bg-[#ebf7ed] dark:bg-[#16271c] border border-[#a8dbb3] dark:border-[#2b4c33] text-xs text-[#204a29] dark:text-[#8ee2a2] flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-[#204a29] dark:text-[#8ee2a2]" />
                    <span>{feedbackMessage}</span>
                  </div>
                )}

                {status === 'error' && (
                  <div className="p-4 rounded-lg bg-[#fdf0f0] dark:bg-[#2b1618] border border-[#f5b8b8] dark:border-[#4d2327] text-xs text-[#8a1f26] dark:text-[#fca5a5] flex items-center gap-2.5">
                    <AlertCircle className="w-4 h-4 shrink-0 text-[#8a1f26] dark:text-[#fca5a5]" />
                    <span>{feedbackMessage}</span>
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-3.5 px-6 text-xs font-semibold uppercase tracking-widest text-white bg-[#17161b] dark:bg-[#f4f3ef] dark:text-[#0f0e12] rounded-md hover:bg-[#2c2936] dark:hover:bg-[#dfdcd3] disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#7358a8]" />
                      <span>Transmitting Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
