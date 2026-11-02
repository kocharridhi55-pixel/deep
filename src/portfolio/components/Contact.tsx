
import { useState } from 'react';
import emailjs from '@emailjs/browser';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    social: '',
  });

  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');

  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    if (status !== 'idle') {
      setStatus('idle');
      setFeedbackMessage('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.name.trim().length < 2) {
      setStatus('error');
      setFeedbackMessage(
        'Please enter your name (at least 2 characters).'
      );
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email.trim())) {
      setStatus('error');
      setFeedbackMessage('Please enter a valid email address.');
      return;
    }

    if (formData.message.trim().length < 10) {
      setStatus('error');
      setFeedbackMessage(
        'Please enter a message (at least 10 characters).'
      );
      return;
    }

    setStatus('loading');
    setFeedbackMessage('');

    try {
      await emailjs.send(
        'service_w6gneuf',
        'template_488fwwl',
        {
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          social: formData.social.trim(),
          message: formData.message.trim(),
        },
        {
          publicKey: 't6aZYEi4nTGK9Ny1L',
        }
      );

      setStatus('success');

      setFeedbackMessage(
        'Thank you! Your message has been sent successfully. I will get back to you soon.'
      );

      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        social: '',
      });
    } catch (error) {
      console.error('EmailJS error:', error);

      setStatus('error');

      setFeedbackMessage(
        'Unable to send your message. Please try again.'
      );
    }
  };

  return (
    <section
      id="contact"
      className="py-16 md:py-20 relative border-t border-[#e8e6df] dark:border-[#1d1b26]"
    >
      <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] bg-[#8973b5]/6 dark:bg-[#725a9f]/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-2xl mx-auto px-6 md:px-10 relative">

        {/* Contact Heading */}
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

        
{/* Contact Form Card */}
<div className="p-6 sm:p-8 md:p-9 rounded-2xl border border-[#dedcd4] dark:border-[#262435] bg-[#f8f7f2] dark:bg-[#111017] shadow-lg backdrop-blur-sm">

  <form
    onSubmit={handleSubmit}
    noValidate
    className="space-y-4 sm:space-y-5"
  >

    {/* Name */}
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

    {/* Email */}
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

    {/* Phone */}
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

    {/* Message */}
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

    {/* Social */}
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

    {/* Success Message */}
    {status === 'success' && (
      <div className="p-4 rounded-lg bg-[#ebf7ed] dark:bg-[#16271c] border border-[#a8dbb3] dark:border-[#2b4c33] text-xs sm:text-sm text-[#204a29] dark:text-[#8ee2a2] flex items-center gap-2.5 animate-in fade-in">
        <CheckCircle2 className="w-4 h-4 shrink-0 text-[#204a29] dark:text-[#8ee2a2]" />
        <span>{feedbackMessage}</span>
      </div>
    )}

    {/* Error Message */}
    {status === 'error' && (
      <div className="p-4 rounded-lg bg-[#fdf0f0] dark:bg-[#2b1618] border border-[#f5b8b8] dark:border-[#4d2327] text-xs sm:text-sm text-[#8a1f26] dark:text-[#fca5a5] flex items-center gap-2.5 animate-in fade-in">
        <AlertCircle className="w-4 h-4 shrink-0 text-[#8a1f26] dark:text-[#fca5a5]" />
        <span>{feedbackMessage}</span>
      </div>
    )}

    {/* Submit Button */}
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

