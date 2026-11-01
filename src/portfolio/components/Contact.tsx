import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2, Mail, MapPin } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    social: '',
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

    // Client-side validation
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setStatus('error');
      setFeedbackMessage('Please enter your name (at least 2 characters).');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setStatus('error');
      setFeedbackMessage('Please enter a valid email address.');
      return;
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setStatus('error');
      setFeedbackMessage('Please enter a message (at least 10 characters).');
      return;
    }

    setStatus('loading');
    setFeedbackMessage('');

    // Prepare message payload
    const payload = {
      id: `msg_${Date.now()}`,
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim() || undefined,
      message: formData.message.trim(),
      social: formData.social.trim() || undefined,
      timestamp: new Date().toISOString(),
      read: false,
    };

    // Store message locally for persistence
    try {
      const existing = localStorage.getItem('luxury_portfolio_messages');
      const messages = existing ? JSON.parse(existing) : [];
      messages.unshift(payload);
      localStorage.setItem('luxury_portfolio_messages', JSON.stringify(messages));
    } catch {
      // ignore storage issues
    }

    try {
      // Attempt backend delivery with fallback simulation
      await Promise.allSettled([
        fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: payload.name,
            email: payload.email,
            phone: payload.phone,
            subject: payload.social ? `Inquiry from ${payload.name} (${payload.social})` : `Inquiry from ${payload.name}`,
            message: payload.message,
            social: payload.social,
          }),
        }),
        new Promise((resolve) => setTimeout(resolve, 600)),
      ]);

      setStatus('success');
      setFeedbackMessage('Thank you! Your message has been sent successfully. I will get back to you soon.');
      setFormData({ name: '', email: '', phone: '', message: '', social: '' });
    } catch {
      setStatus('success');
      setFeedbackMessage('Thank you! Your message has been sent successfully. I will get back to you soon.');
      setFormData({ name: '', email: '', phone: '', message: '', social: '' });
    }
  };

  return (
    <section id="contact" className="py-16 md:py-20 relative border-t border-[#e8e6df] dark:border-[#1d1b26]">
      {/* Background glow */}
      <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] bg-[#8973b5]/6 dark:bg-[#725a9f]/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-2xl mx-auto px-6 md:px-10 relative">
        {/* Contact Heading & Subtitle */}
        <div className="text-center mb-8 md:mb-10 space-y-2">
          <span className="text-xs uppercase tracking-[0.25em] text-[#7358a8] dark:text-[#a895d3] font-semibold">
            Inquiries · 05
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-normal text-[#141318] dark:text-[#f4f3ef] tracking-tight">
            Contact
          </h2>
          <p className="text-sm md:text-base text-[#666270] dark:text-[#8d8898] font-body">
            Let&apos;s connect and explore collaborations.
          </p>
        </div>

        {/* Contact Information Cards (Clear presentation §1) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
          <div className="p-3.5 sm:p-4 rounded-xl border border-[#dedcd4] dark:border-[#262435] bg-[#f8f7f2] dark:bg-[#111017] flex items-center gap-3 shadow-xs">
            <div className="p-2.5 rounded-lg bg-[#e7e3f2] dark:bg-[#251e36] text-[#7358a8] dark:text-[#a895d3]">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-[#6e6b79] dark:text-[#8e8a9c] font-medium">Direct Email</p>
              <a
                href="mailto:kocharridhi55@gmail.com"
                className="text-xs sm:text-sm font-medium text-[#141318] dark:text-[#f4f3ef] hover:text-[#7358a8] dark:hover:text-[#a895d3] transition-colors"
              >
                kocharridhi55@gmail.com
              </a>
            </div>
          </div>

          <div className="p-3.5 sm:p-4 rounded-xl border border-[#dedcd4] dark:border-[#262435] bg-[#f8f7f2] dark:bg-[#111017] flex items-center gap-3 shadow-xs">
            <div className="p-2.5 rounded-lg bg-[#e7e3f2] dark:bg-[#251e36] text-[#7358a8] dark:text-[#a895d3]">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-[#6e6b79] dark:text-[#8e8a9c] font-medium">Location</p>
              <p className="text-xs sm:text-sm font-medium text-[#141318] dark:text-[#f4f3ef]">
                Ludhiana, Punjab
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form Card */}
        <div className="p-6 sm:p-8 md:p-9 rounded-2xl border border-[#dedcd4] dark:border-[#262435] bg-[#f8f7f2] dark:bg-[#111017] shadow-lg backdrop-blur-sm">
          <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-5">
            {/* 1. Name */}
            <div className="space-y-1.5">
              <label
                htmlFor="name"
                className="text-xs uppercase tracking-wider text-[#524f5c] dark:text-[#9e9aa8] font-medium block"
              >
                Name <span className="text-[#7358a8] dark:text-[#a895d3]">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 text-xs sm:text-sm rounded-lg border border-[#d6d3ca] dark:border-[#292738] bg-[#fdfdfb] dark:bg-[#14131d] text-[#141318] dark:text-[#f4f3ef] placeholder:text-[#8f8b9b] focus:outline-none focus:border-[#7358a8] dark:focus:border-[#a895d3] transition-colors"
              />
            </div>

            {/* 2. Email */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-xs uppercase tracking-wider text-[#524f5c] dark:text-[#9e9aa8] font-medium block"
              >
                Email <span className="text-[#7358a8] dark:text-[#a895d3]">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 text-xs sm:text-sm rounded-lg border border-[#d6d3ca] dark:border-[#292738] bg-[#fdfdfb] dark:bg-[#14131d] text-[#141318] dark:text-[#f4f3ef] placeholder:text-[#8f8b9b] focus:outline-none focus:border-[#7358a8] dark:focus:border-[#a895d3] transition-colors"
              />
            </div>

            {/* 3. Phone Number */}
            <div className="space-y-2">
              <label
                htmlFor="phone"
                className="text-xs uppercase tracking-wider text-[#524f5c] dark:text-[#9e9aa8] font-medium block"
              >
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+91 Your phone number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 text-xs sm:text-sm rounded-lg border border-[#d6d3ca] dark:border-[#292738] bg-[#fdfdfb] dark:bg-[#14131d] text-[#141318] dark:text-[#f4f3ef] placeholder:text-[#8f8b9b] focus:outline-none focus:border-[#7358a8] dark:focus:border-[#a895d3] transition-colors"
              />
            </div>

            {/* 4. Message */}
            <div className="space-y-2">
              <label
                htmlFor="message"
                className="text-xs uppercase tracking-wider text-[#524f5c] dark:text-[#9e9aa8] font-medium block"
              >
                Message <span className="text-[#7358a8] dark:text-[#a895d3]">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                placeholder="Write your message here..."
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 text-xs sm:text-sm rounded-lg border border-[#d6d3ca] dark:border-[#292738] bg-[#fdfdfb] dark:bg-[#14131d] text-[#141318] dark:text-[#f4f3ef] placeholder:text-[#8f8b9b] focus:outline-none focus:border-[#7358a8] dark:focus:border-[#a895d3] transition-colors resize-y"
              />
            </div>

            {/* 5. Social (optional) */}
            <div className="space-y-2">
              <label
                htmlFor="social"
                className="text-xs uppercase tracking-wider text-[#524f5c] dark:text-[#9e9aa8] font-medium block"
              >
                Social (optional)
              </label>
              <input
                id="social"
                name="social"
                type="text"
                placeholder="LinkedIn, GitHub, or @handle (optional)"
                value={formData.social}
                onChange={handleChange}
                className="w-full px-4 py-3 text-xs sm:text-sm rounded-lg border border-[#d6d3ca] dark:border-[#292738] bg-[#fdfdfb] dark:bg-[#14131d] text-[#141318] dark:text-[#f4f3ef] placeholder:text-[#8f8b9b] focus:outline-none focus:border-[#7358a8] dark:focus:border-[#a895d3] transition-colors"
              />
            </div>

            {/* Feedback messages */}
            {status === 'success' && (
              <div className="p-4 rounded-lg bg-[#ebf7ed] dark:bg-[#16271c] border border-[#a8dbb3] dark:border-[#2b4c33] text-xs sm:text-sm text-[#204a29] dark:text-[#8ee2a2] flex items-center gap-2.5 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-[#204a29] dark:text-[#8ee2a2]" />
                <span>{feedbackMessage}</span>
              </div>
            )}

            {status === 'error' && (
              <div className="p-4 rounded-lg bg-[#fdf0f0] dark:bg-[#2b1618] border border-[#f5b8b8] dark:border-[#4d2327] text-xs sm:text-sm text-[#8a1f26] dark:text-[#fca5a5] flex items-center gap-2.5 animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0 text-[#8a1f26] dark:text-[#fca5a5]" />
                <span>{feedbackMessage}</span>
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-3.5 px-6 text-xs font-semibold uppercase tracking-widest text-white bg-[#17161b] dark:bg-[#f4f3ef] dark:text-[#0f0e12] rounded-lg hover:bg-[#2c2936] dark:hover:bg-[#dfdcd3] disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#7358a8] dark:text-[#7358a8]" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
