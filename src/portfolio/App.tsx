import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Timeline from './components/Timeline';
import ResumeSection from './components/ResumeSection';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import PageLoader from './components/PageLoader';
import ProjectModal from './components/ProjectModal';
import SourceCodeModal from './components/SourceCodeModal';
import AuthModal from './components/AuthModal';
import OwnerDashboardModal from './components/OwnerDashboardModal';
import { Project, UserSession } from './types/portfolio';
import SmoothScroll from './cinema/SmoothScroll';
import Interactions from './cinema/Interactions';
import { useCinematicReveals } from './cinema/useCinematicReveals';

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('luxury_portfolio_theme');
      if (stored === 'light' || stored === 'dark') return stored;
    }
    return 'dark';
  });

  // Intro loader plays once per browser session; repeat visits / reloads go straight in.
  const [isLoading, setIsLoading] = useState(() => {
    try {
      return sessionStorage.getItem('luxury_portfolio_intro_seen') !== '1';
    } catch {
      return true;
    }
  });
  const [currentUser, setCurrentUser] = useState<UserSession | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [sourceCodeProject, setSourceCodeProject] = useState<Project | null>(null);

  // Sync theme class on <html>
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('luxury_portfolio_theme', theme);
  }, [theme]);

  // Check existing session
  useEffect(() => {
    const token = localStorage.getItem('luxury_portfolio_token');
    if (token) {
      fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.user) {
            setCurrentUser(data.user);
          }
        })
        .catch(() => {
          localStorage.removeItem('luxury_portfolio_token');
        });
    }
  }, []);

  useCinematicReveals(!isLoading);

  const toggleTheme = () => {
    const root = document.documentElement;
    root.classList.add('theme-ready');
    window.setTimeout(() => root.classList.remove('theme-ready'), 750);
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleLoginSuccess = (user: UserSession, token: string) => {
    setCurrentUser(user);
    localStorage.setItem('luxury_portfolio_token', token);
    setIsDashboardOpen(true);
  };

  const handleLogout = async () => {
    const token = localStorage.getItem('luxury_portfolio_token');
    if (token) {
      try {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (e) {
        console.error(e);
      }
    }
    localStorage.removeItem('luxury_portfolio_token');
    setCurrentUser(null);
  };

  const handleDownloadResume = () => {
    // Functional trigger: download real PDF via /api/resume/download or /resume.pdf
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Developer_DataScience_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#fcfbf7] dark:bg-[#0b0b0d] text-[#141318] dark:text-[#f4f3ef] transition-colors duration-700 font-body relative selection:bg-[#7358a8]/30 selection:text-[#f4f3ef]">
      {/* Cinematic Custom Cursor (Desktop Only) */}
      <CustomCursor />
      <SmoothScroll />
      <Interactions />

      {/* Page Loader Intro */}
      {isLoading && <PageLoader onComplete={() => {
        try { sessionStorage.setItem('luxury_portfolio_intro_seen', '1'); } catch { /* ignore */ }
        setIsLoading(false);
      }} />}

      {/* Navigation Top Bar Contract */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        onOpenAuth={() => setIsAuthOpen(true)}
        currentUser={currentUser}
        onOpenDashboard={() => setIsDashboardOpen(true)}
      />

      {/* Main Sections */}
      <main>
        {/* Section 1: Hero */}
        <Hero onDownloadResume={handleDownloadResume} ready={!isLoading} />

        {/* Section 2: About (with AI & PGDCA courses) */}
        <About onOpenResume={() => {
          const el = document.getElementById('resume');
          const lenis = (window as any).__lenis;
          if (el && lenis) lenis.scrollTo(el, { offset: -72 }); else el?.scrollIntoView({ behavior: 'smooth' });
        }} />

        {/* Section 3: Skills */}
        <Skills />

        {/* Section 4: Projects Showcase */}
        <Projects
          onSelectProject={(proj) => setSelectedProject(proj)}
          onViewSource={(proj) => setSourceCodeProject(proj)}
        />

        {/* Section 5: Trajectory & Timeline */}
        <Timeline />

        {/* Section 6: Resume & Credentials */}
        <ResumeSection onDownloadResume={handleDownloadResume} />

        {/* Section 7: Contact Form */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Portals */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <SourceCodeModal
        project={sourceCodeProject}
        onClose={() => setSourceCodeProject(null)}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {currentUser && (
        <OwnerDashboardModal
          isOpen={isDashboardOpen}
          onClose={() => setIsDashboardOpen(false)}
          currentUser={currentUser}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}
