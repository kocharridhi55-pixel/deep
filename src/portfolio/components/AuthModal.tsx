import { useState } from 'react';
import { X, Lock, AlertCircle, Loader2, KeyRound } from 'lucide-react';
import { UserSession } from '../types/portfolio';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserSession, token: string) => void;
}

export default function AuthModal({ isOpen, onClose, onLoginSuccess }: AuthModalProps) {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('luxury2026');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        onLoginSuccess(data.user, data.token);
        onClose();
      } else {
        setError(data.error || 'Authentication failed. Please verify credentials.');
      }
    } catch {
      setError('Unable to contact authentication server. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-xl border border-[#dedcd4] dark:border-[#2b283a] bg-[#fcfbf7] dark:bg-[#121118] p-8 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-md text-[#787584] dark:text-[#888394] hover:text-[#141318] dark:hover:text-[#f4f3ef] transition-colors"
          aria-label="Close authentication modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="mb-6 space-y-1.5">
          <div className="inline-flex items-center gap-2 p-2 rounded-lg bg-[#ede9f5] dark:bg-[#251f33] text-[#7358a8] dark:text-[#a895d3] mb-2">
            <Lock className="w-4 h-4" />
          </div>
          <h3 className="font-editorial text-2xl text-[#141318] dark:text-[#f4f3ef] font-medium">
            Owner &amp; Reviewer Authentication
          </h3>
          <p className="text-xs text-[#6e6b79] dark:text-[#8e8a9c] leading-relaxed">
            Access internal portfolio controls, review submitted contact messages, and manage site configurations.
          </p>
        </div>

        {/* Demo Credentials Tip */}
        <div className="mb-6 p-3 rounded-lg border border-[#e5e1f0] dark:border-[#2f2742] bg-[#f6f4fa] dark:bg-[#191524] text-[11px] text-[#4d3e6c] dark:text-[#c4b6e5] flex items-start gap-2.5">
          <KeyRound className="w-4 h-4 shrink-0 mt-0.5 text-[#7358a8] dark:text-[#a895d3]" />
          <div>
            <span className="font-semibold block">Pre-configured Demo Credentials:</span>
            <span>Username: <strong className="font-mono">admin</strong> · Password: <strong className="font-mono">luxury2026</strong></span>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-5 p-3 rounded-lg border border-[#f5b8b8] dark:border-[#4d2327] bg-[#fdf0f0] dark:bg-[#2b1618] text-xs text-[#8a1f26] dark:text-[#fca5a5] flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-wider text-[#524f5c] dark:text-[#9e9aa8] font-medium block">
              Username / Email
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-md border border-[#d6d3ca] dark:border-[#292738] bg-[#fdfdfb] dark:bg-[#14131d] text-[#141318] dark:text-[#f4f3ef] focus:outline-none focus:border-[#7358a8] dark:focus:border-[#a895d3]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-wider text-[#524f5c] dark:text-[#9e9aa8] font-medium block">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-md border border-[#d6d3ca] dark:border-[#292738] bg-[#fdfdfb] dark:bg-[#14131d] text-[#141318] dark:text-[#f4f3ef] focus:outline-none focus:border-[#7358a8] dark:focus:border-[#a895d3]"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 text-xs font-semibold uppercase tracking-widest text-white bg-[#17161b] dark:bg-[#f4f3ef] dark:text-[#0f0e12] rounded-md hover:bg-[#2c2936] dark:hover:bg-[#dfdcd3] disabled:opacity-50 transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Verifying...</span>
              </>
            ) : (
              <span>Sign In to Dashboard</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
