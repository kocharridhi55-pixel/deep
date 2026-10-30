import { useState, useEffect } from 'react';
import { Sun, Moon, Lock, UserCheck, Menu, X } from 'lucide-react';
import { UserSession } from '../types/portfolio';

interface NavbarProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  onOpenAuth: () => void;
  currentUser: UserSession | null;
  onOpenDashboard: () => void;
}

export default function Navbar({
  theme,
  toggleTheme,
  onOpenAuth,
  currentUser,
  onOpenDashboard,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Resume', href: '#resume' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#fcfbf7]/90 dark:bg-[#0b0b0d]/90 backdrop-blur-md border-b border-[#e5e4de] dark:border-[#222227] py-3.5 shadow-sm'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark (Single text element) */}
          <a
            href="#home"
            className="font-editorial text-xl md:text-2xl font-medium tracking-tight text-[#17161a] dark:text-[#f4f3ef] whitespace-nowrap shrink-0"
          >
            <span className="brand-glow" data-text="RIDHI KOCHAR">RIDHI KOCHAR</span>
          </a>

          {/* Zone 2: Navigation Links (Clean single-line text links) */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-medium tracking-wider uppercase text-[#5a5763] dark:text-[#9e9aa8]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-[#17161a] dark:hover:text-[#f4f3ef] transition-colors whitespace-nowrap shrink-0"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary Actions (Theme Switch + Login / Owner Badge) */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Theme Switcher */}
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              className="p-2 rounded-full text-[#5a5763] dark:text-[#9e9aa8] hover:text-[#17161a] dark:hover:text-[#f4f3ef] hover:bg-[#eae8e1] dark:hover:bg-[#1a1921] transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Login / Owner Action */}
            {currentUser ? (
              <button
                onClick={onOpenDashboard}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#2d2542] dark:text-[#ded8ec] bg-[#ece8f4] dark:bg-[#251f33] border border-[#d3cae8] dark:border-[#3f3554] rounded-md hover:bg-[#e2daf0] dark:hover:bg-[#2e263f] transition-colors whitespace-nowrap shrink-0"
              >
                <UserCheck className="w-3.5 h-3.5 text-[#7358a8] dark:text-[#a58be0]" />
                <span>Owner Portal</span>
              </button>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#17161a] dark:text-[#f4f3ef] border border-[#dcdad3] dark:border-[#2a2932] rounded-md hover:border-[#17161a] dark:hover:border-[#9e9aa8] hover:bg-[#f3f2ee] dark:hover:bg-[#15141b] transition-all whitespace-nowrap shrink-0"
              >
                <Lock className="w-3 h-3 text-[#7a748c] dark:text-[#8e879f]" />
                <span>Login</span>
              </button>
            )}

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#17161a] dark:text-[#f4f3ef] hover:bg-[#eae8e1] dark:hover:bg-[#1a1921] rounded-md transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 lg:hidden bg-[#fcfbf7]/98 dark:bg-[#0b0b0d]/98 backdrop-blur-xl flex flex-col justify-center px-8 py-16 animate-in fade-in duration-200">
          <div className="space-y-6 text-center">
            <span className="text-xs uppercase tracking-widest text-[#7a748c] dark:text-[#7f7a8f] font-tabular">
              Navigation Menu
            </span>
            <div className="flex flex-col gap-5">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-editorial text-2xl text-[#17161a] dark:text-[#f4f3ef] hover:text-[#7358a8] dark:hover:text-[#a58be0] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="pt-8 border-t border-[#e5e4de] dark:border-[#222227] flex justify-center gap-4">
              <button
                onClick={() => {
                  toggleTheme();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-wider text-[#5a5763] dark:text-[#9e9aa8] border border-[#dcdad3] dark:border-[#2a2932] rounded-md"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                <span>{theme === 'dark' ? 'Light Theme' : 'Dark Theme'}</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  currentUser ? onOpenDashboard() : onOpenAuth();
                }}
                className="flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-wider text-[#17161a] dark:text-[#f4f3ef] bg-[#17161a]/10 dark:bg-white/10 rounded-md"
              >
                <Lock className="w-4 h-4" />
                <span>{currentUser ? 'Owner Portal' : 'Login'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
