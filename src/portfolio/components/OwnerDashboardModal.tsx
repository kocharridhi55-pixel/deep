import { useState, useEffect } from 'react';
import { X, Mail, RefreshCw, LogOut, CheckCircle2, Clock, Inbox } from 'lucide-react';
import { ContactMessage, UserSession } from '../types/portfolio';

interface OwnerDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserSession;
  onLogout: () => void;
}

export default function OwnerDashboardModal({
  isOpen,
  onClose,
  currentUser,
  onLogout,
}: OwnerDashboardModalProps) {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  const fetchMessages = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/contact');
      const data = await res.json();
      if (data.success && Array.isArray(data.messages)) {
        setMessages(data.messages);
        if (data.messages.length > 0 && !selectedMessage) {
          setSelectedMessage(data.messages[0]);
        }
      }
    } catch (err) {
      console.error('Failed to load inquiries:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchMessages();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl h-[85vh] rounded-xl border border-[#dedcd4] dark:border-[#2b283a] bg-[#fcfbf7] dark:bg-[#121118] flex flex-col shadow-2xl overflow-hidden">
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-[#e5e3dc] dark:border-[#201e2e] flex items-center justify-between bg-[#f4f2ea] dark:bg-[#15141e]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#ede9f5] dark:bg-[#251f33] text-[#7358a8] dark:text-[#a895d3]">
              <Inbox className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-editorial text-xl text-[#141318] dark:text-[#f4f3ef] font-medium">
                Portfolio Owner Portal
              </h3>
              <p className="text-xs text-[#6e6b79] dark:text-[#8e8a9c] font-tabular">
                Logged in as {currentUser.name} ({currentUser.username})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchMessages}
              disabled={isLoading}
              className="p-2 rounded-md text-[#6e6b79] dark:text-[#8e8a9c] hover:bg-[#e8e6de] dark:hover:bg-[#1f1d2a] transition-colors"
              title="Refresh messages"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#a33238] dark:text-[#e57373] hover:bg-[#f8e9ea] dark:hover:bg-[#2c181b] rounded-md transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-md text-[#6e6b79] dark:text-[#8e8a9c] hover:text-[#141318] dark:hover:text-[#f4f3ef] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Dashboard Main Content: Inquiries Mailbox */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden">
          {/* Left Inquiries List */}
          <div className="md:col-span-5 border-r border-[#e5e3dc] dark:border-[#201e2e] flex flex-col h-full bg-[#f8f7f2] dark:bg-[#100f16]">
            <div className="p-3.5 border-b border-[#e5e3dc] dark:border-[#201e2e] flex items-center justify-between text-xs text-[#6e6b79] dark:text-[#8e8a9c] font-tabular">
              <span>Direct Messages ({messages.length})</span>
              <span>Sorted by Most Recent</span>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-[#eceae3] dark:divide-[#1d1b28]">
              {messages.length === 0 ? (
                <div className="p-8 text-center text-xs text-[#827e8f]">
                  No messages submitted yet. Send a test note via the contact form!
                </div>
              ) : (
                messages.map((msg) => (
                  <button
                    key={msg.id}
                    onClick={() => setSelectedMessage(msg)}
                    className={`w-full text-left p-4 transition-colors flex flex-col gap-1 ${
                      selectedMessage?.id === msg.id
                        ? 'bg-white dark:bg-[#1c1926] border-l-2 border-[#7358a8] dark:border-[#a895d3]'
                        : 'hover:bg-black/5 dark:hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-xs text-[#141318] dark:text-[#f4f3ef] truncate">
                        {msg.name}
                      </span>
                      <span className="text-[10px] text-[#7d7a8a] dark:text-[#888395] font-tabular">
                        {new Date(msg.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <span className="text-xs text-[#7358a8] dark:text-[#a895d3] truncate">
                      {msg.subject}
                    </span>
                    <p className="text-[11px] text-[#63606f] dark:text-[#918c9e] line-clamp-2">
                      {msg.message}
                    </p>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Right Detailed Message View */}
          <div className="md:col-span-7 flex flex-col h-full bg-white dark:bg-[#13121b] p-6 overflow-y-auto">
            {selectedMessage ? (
              <div className="space-y-6">
                <div className="border-b border-[#eceae3] dark:border-[#201e2e] pb-4 space-y-2">
                  <span className="text-[10px] uppercase tracking-widest text-[#7358a8] dark:text-[#a895d3] font-tabular">
                    Message Details · {selectedMessage.id}
                  </span>
                  <h4 className="font-editorial text-2xl text-[#141318] dark:text-[#f4f3ef] font-medium">
                    {selectedMessage.subject}
                  </h4>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-[#6e6b79] dark:text-[#8e8a9c] font-tabular">
                    <span>From: <strong className="text-[#141318] dark:text-[#f4f3ef]">{selectedMessage.name}</strong></span>
                    <span>·</span>
                    <a href={`mailto:${selectedMessage.email}`} className="text-[#7358a8] dark:text-[#a895d3] underline">
                      {selectedMessage.email}
                    </a>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(selectedMessage.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[11px] uppercase tracking-wider text-[#797686] font-medium">
                    Message Body
                  </span>
                  <div className="p-5 rounded-lg border border-[#e5e3dc] dark:border-[#222030] bg-[#fcfbf7] dark:bg-[#100f16] text-xs sm:text-sm text-[#454250] dark:text-[#c4bfd0] leading-relaxed whitespace-pre-wrap">
                    {selectedMessage.message}
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <a
                    href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject)}`}
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#17161b] dark:bg-[#f4f3ef] dark:text-[#0f0e12] rounded-md hover:bg-[#2c2936] dark:hover:bg-[#dfdcd3] transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Reply via Email Client</span>
                  </a>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center text-xs text-[#807c8d] space-y-2">
                <Inbox className="w-8 h-8 text-[#7358a8]/50" />
                <p>Select a message from the left to view the complete communication.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
