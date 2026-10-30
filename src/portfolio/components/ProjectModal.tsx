import { useState } from 'react';
import { X, Send, Search, Plus, Minus, AlertTriangle, Sparkles, ShoppingBag, Check, ExternalLink, RefreshCw } from 'lucide-react';
import { Project } from '../types/portfolio';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl max-h-[92vh] rounded-xl border border-[#dedcd4] dark:border-[#2b283a] bg-[#fcfbf7] dark:bg-[#121118] flex flex-col shadow-2xl overflow-hidden">
        {/* Top bar */}
        <div className="px-6 py-4 border-b border-[#e5e3dc] dark:border-[#201e2e] flex items-center justify-between bg-[#f4f2ea] dark:bg-[#15141e] shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-widest text-[#7358a8] dark:text-[#a895d3] font-semibold">
              Interactive Preview
            </span>
            <span aria-hidden="true" className="text-[#a8a3b5]">·</span>
            <h3 className="font-editorial text-lg text-[#141318] dark:text-[#f4f3ef] font-medium truncate">
              {project.title}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-[#6e6b79] dark:text-[#8e8a9c] hover:text-[#141318] dark:hover:text-[#f4f3ef] transition-colors"
            aria-label="Close project modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 font-body">
          {/* Project Header Overview */}
          <div className="space-y-3">
            <h2 className="font-editorial text-3xl md:text-4xl text-[#141318] dark:text-[#f4f3ef] font-normal tracking-tight">
              {project.title}
            </h2>
            <p className="text-sm text-[#555260] dark:text-[#a8a3b5] leading-relaxed max-w-3xl">
              {project.longDescription}
            </p>

            {/* Unboxed Metadata */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#7358a8] dark:text-[#a895d3] font-tabular pt-1">
              <span>Category: {project.category}</span>
              <span aria-hidden="true">·</span>
              <span>Tech: {project.technologies.join(' · ')}</span>
            </div>
          </div>

          {/* Interactive Sandbox specific to project demoType */}
          <div className="rounded-xl border border-[#dedcd4] dark:border-[#252332] bg-[#f8f7f2] dark:bg-[#0e0d13] p-6 shadow-inner">
            {project.demoType === 'ai-chat' && <AiChatDemo />}
            {project.demoType === 'medical-inventory' && <MedicalInventoryDemo />}
            {project.demoType === 'data-science' && <DataScienceDemo />}
            {project.demoType === 'ecommerce' && <EcommerceDemo />}
            {project.demoType === 'portfolio' && <PortfolioArchitectureDemo />}
          </div>

          {/* Key Architectural Features */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-[#7358a8] dark:text-[#a895d3] font-semibold">
              Key Engineering Highlights
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {project.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-lg border border-[#e5e3dc] dark:border-[#201e2e] bg-white dark:bg-[#14131d] flex items-start gap-2.5 text-xs text-[#4b4857] dark:text-[#9e9aa8]"
                >
                  <Check className="w-3.5 h-3.5 text-[#7358a8] dark:text-[#a895d3] shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 1. AI Chatbot Interactive Demo
function AiChatDemo() {
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'bot'; text: string }>>([
    {
      sender: 'bot',
      text: 'Greetings. I am the Custom AI Chatbot neural model. I can analyze data models, explain neural architectures, or discuss the developer’s engineering stack. What would you like to explore?',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { sender: 'bot', text: data.reply || 'Insight processed.' }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: `Neural Core Response: The developer leverages Python, Pandas, Scikit-Learn, and the Gemini AI API to construct performant intelligence systems. Received: "${userMsg}".`,
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[#e5e3dc] dark:border-[#201e2e]">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#7358a8] dark:text-[#a895d3]" />
          <span className="font-editorial text-lg text-[#141318] dark:text-[#f4f3ef] font-medium">
            Live AI Chatbot Sandbox
          </span>
        </div>
        <span className="text-[11px] text-[#7358a8] dark:text-[#a895d3] font-tabular">
          Active Neural Engine
        </span>
      </div>

      {/* Chat scroll box */}
      <div className="h-64 overflow-y-auto space-y-3 p-3 rounded-lg bg-white dark:bg-[#121118] border border-[#e5e3dc] dark:border-[#1f1d2a]">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] p-3 rounded-lg text-xs leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-[#17161b] text-white dark:bg-[#f4f3ef] dark:text-[#0f0e12]'
                  : 'bg-[#f4f2ea] text-[#2c2a33] dark:bg-[#1b1924] dark:text-[#dfdbe8] border border-[#e6e4dc] dark:border-[#2a2638]'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="text-xs text-[#7358a8] dark:text-[#a895d3] animate-pulse">
            Neural agent is synthesizing...
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="flex gap-2">
        <input
          type="text"
          placeholder="Ask a question about the project or developer's skills..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-3.5 py-2 text-xs rounded-md border border-[#d6d3ca] dark:border-[#292738] bg-white dark:bg-[#14131d] text-[#141318] dark:text-[#f4f3ef] focus:outline-none focus:border-[#7358a8]"
        />
        <button
          type="submit"
          disabled={isTyping}
          className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#17161b] dark:bg-[#f4f3ef] dark:text-[#0f0e12] rounded-md hover:bg-[#2c2936] disabled:opacity-50"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}

// 2. Medical Shop Inventory Demo
function MedicalInventoryDemo() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'alert'>('all');
  const [inventory, setInventory] = useState([
    { id: 'SKU-101', name: 'Amlodipine 10mg', stock: 840, minAlert: 200, expiry: 'Oct 2027', category: 'Cardiology' },
    { id: 'SKU-102', name: 'Metformin 500mg', stock: 120, minAlert: 150, expiry: 'Dec 2026', category: 'Diabetes' },
    { id: 'SKU-103', name: 'Lisinopril 20mg', stock: 45, minAlert: 100, expiry: 'Nov 2026', category: 'Cardiology' },
    { id: 'SKU-104', name: 'Azithromycin 250mg', stock: 310, minAlert: 100, expiry: 'Aug 2027', category: 'Antibiotic' },
    { id: 'SKU-105', name: 'Gabapentin 300mg', stock: 18, minAlert: 80, expiry: 'Jan 2027', category: 'Neurology' },
  ]);

  const adjustStock = (id: string, delta: number) => {
    setInventory((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, stock: Math.max(0, item.stock + delta) } : item
      )
    );
  };

  const filtered = inventory.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || item.id.toLowerCase().includes(search.toLowerCase());
    const matchesAlert = filter === 'all' || item.stock < item.minAlert;
    return matchesSearch && matchesAlert;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#e5e3dc] dark:border-[#201e2e]">
        <div className="flex items-center gap-2">
          <span className="font-editorial text-lg text-[#141318] dark:text-[#f4f3ef] font-medium">
            Pharmaceutical Stock Ledger &amp; Expiry Monitor
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilter(filter === 'all' ? 'alert' : 'all')}
            className={`px-3 py-1 text-xs rounded-md transition-colors ${
              filter === 'alert'
                ? 'bg-[#b83838] text-white'
                : 'border border-[#d6d3ca] dark:border-[#282637] text-[#605d6e] dark:text-[#a8a3b5]'
            }`}
          >
            {filter === 'alert' ? 'Showing Low Stock Alerts' : 'Filter Low Stock'}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[#e5e3dc] dark:border-[#201e2e] text-[#6e6b79] dark:text-[#8e8a9c] font-tabular">
              <th className="py-2.5 px-3">SKU ID</th>
              <th className="py-2.5 px-3">Medication Name</th>
              <th className="py-2.5 px-3">Class</th>
              <th className="py-2.5 px-3">Expiry Date</th>
              <th className="py-2.5 px-3">Stock Units</th>
              <th className="py-2.5 px-3 text-right">Adjust</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#eceae3] dark:divide-[#1d1b28]">
            {filtered.map((item) => {
              const isLow = item.stock < item.minAlert;
              return (
                <tr key={item.id} className="hover:bg-black/5 dark:hover:bg-white/5 font-tabular">
                  <td className="py-2.5 px-3 text-[#7358a8] dark:text-[#a895d3] font-medium">{item.id}</td>
                  <td className="py-2.5 px-3 font-medium text-[#141318] dark:text-[#f4f3ef]">{item.name}</td>
                  <td className="py-2.5 px-3 text-[#646170] dark:text-[#8e899b]">{item.category}</td>
                  <td className="py-2.5 px-3 text-[#646170] dark:text-[#8e899b]">{item.expiry}</td>
                  <td className="py-2.5 px-3">
                    <span className={`inline-flex items-center gap-1.5 font-medium ${isLow ? 'text-[#c23434] dark:text-[#f87171]' : 'text-[#2e7d32] dark:text-[#4ade80]'}`}>
                      {isLow && <AlertTriangle className="w-3 h-3" />}
                      {item.stock} units {isLow && '(Reorder Alert)'}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <div className="inline-flex items-center gap-1">
                      <button
                        onClick={() => adjustStock(item.id, -10)}
                        className="p-1 rounded bg-black/5 dark:bg-white/10 hover:bg-black/10 text-xs"
                        title="Reduce 10"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => adjustStock(item.id, 10)}
                        className="p-1 rounded bg-black/5 dark:bg-white/10 hover:bg-black/10 text-xs"
                        title="Add 10"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// 3. Data Science Demo
function DataScienceDemo() {
  const [epochs, setEpochs] = useState(150);
  const [metric, setMetric] = useState<'loss' | 'accuracy' | 'f1'>('accuracy');

  const accuracyValue = (0.75 + (epochs / 300) * 0.23).toFixed(3);
  const lossValue = (0.55 - (epochs / 300) * 0.48).toFixed(3);
  const f1Value = (0.73 + (epochs / 300) * 0.24).toFixed(3);

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#e5e3dc] dark:border-[#201e2e]">
        <div>
          <span className="font-editorial text-lg text-[#141318] dark:text-[#f4f3ef] font-medium block">
            Multidimensional Model Convergence Telemetry
          </span>
          <span className="text-xs text-[#6e6b79] dark:text-[#8e8a9c] font-tabular">
            Pandas pipeline + Scikit-Learn validation curves
          </span>
        </div>
        <div className="flex items-center gap-2">
          {(['accuracy', 'loss', 'f1'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMetric(m)}
              className={`px-3 py-1 text-xs font-medium uppercase tracking-wider rounded-md transition-colors ${
                metric === m
                  ? 'bg-[#17161b] text-white dark:bg-[#f4f3ef] dark:text-[#0f0e12]'
                  : 'border border-[#d6d3ca] dark:border-[#282637] text-[#605d6e] dark:text-[#a8a3b5]'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive slider */}
      <div className="p-4 rounded-lg bg-white dark:bg-[#121118] border border-[#e5e3dc] dark:border-[#201e2e] space-y-2">
        <div className="flex justify-between text-xs text-[#6e6b79] dark:text-[#8e8a9c] font-tabular">
          <span>Simulation Epochs: {epochs} / 300</span>
          <span>
            Current {metric.toUpperCase()}:{' '}
            <strong className="text-[#7358a8] dark:text-[#a895d3]">
              {metric === 'accuracy' ? `${accuracyValue} (98.4%)` : metric === 'loss' ? lossValue : f1Value}
            </strong>
          </span>
        </div>
        <input
          type="range"
          min="10"
          max="300"
          value={epochs}
          onChange={(e) => setEpochs(parseInt(e.target.value, 10))}
          className="w-full accent-[#7358a8]"
        />
      </div>

      {/* Feature Importance bars */}
      <div className="space-y-2">
        <span className="text-xs uppercase tracking-wider text-[#6e6b79] dark:text-[#8e8a9c] font-medium block">
          Top Predictive Features (SHAP Values)
        </span>
        <div className="space-y-2 text-xs font-tabular">
          {[
            { name: 'Patient Dosage History', weight: '0.38', pct: 85 },
            { name: 'Biometric Variance (Blood Pressure)', weight: '0.27', pct: 65 },
            { name: 'Renal Clearance Rate', weight: '0.19', pct: 45 },
            { name: 'Inter-drug Interaction Index', weight: '0.14', pct: 32 },
          ].map((f) => (
            <div key={f.name} className="space-y-1">
              <div className="flex justify-between text-[#4b4857] dark:text-[#c4bfd0]">
                <span>{f.name}</span>
                <span>+{f.weight}</span>
              </div>
              <div className="h-1.5 w-full bg-[#e3e0d8] dark:bg-[#201e2e] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#7358a8] to-[#a895d3]"
                  style={{ width: `${f.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 4. E-commerce Demo
function EcommerceDemo() {
  const [cartCount, setCartCount] = useState(1);
  const [selectedSize, setSelectedSize] = useState('42mm');

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-[#e5e3dc] dark:border-[#201e2e]">
        <span className="font-editorial text-lg text-[#141318] dark:text-[#f4f3ef] font-medium">
          Editorial Boutique Shopping Flow
        </span>
        <div className="flex items-center gap-1.5 text-xs text-[#7358a8] dark:text-[#a895d3] font-tabular">
          <ShoppingBag className="w-4 h-4" />
          <span>Bag ({cartCount})</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
        <div className="aspect-square rounded-lg bg-[#0e0d13] overflow-hidden border border-white/10 relative">
          <img
            src="/images/hero_cinematic_sculpture_1793294830736.jpg"
            alt="Sculptural Timepiece"
            className="w-full h-full object-cover"
          />
          <span className="absolute top-3 left-3 text-[10px] font-tabular uppercase tracking-widest text-white/80 bg-black/60 px-2 py-0.5 rounded">
            Limited Series
          </span>
        </div>

        <div className="space-y-4">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-widest text-[#7358a8] dark:text-[#a895d3] font-semibold">
              Chronograph Studio
            </span>
            <h4 className="font-editorial text-2xl text-[#141318] dark:text-[#f4f3ef] font-medium">
              Obsidian Monolith Dial
            </h4>
            <p className="font-editorial text-xl text-[#7358a8] dark:text-[#a895d3] font-tabular">
              $1,480.00 USD
            </p>
          </div>

          <p className="text-xs text-[#524f5c] dark:text-[#9e9aa8] leading-relaxed">
            Crafted with brushed titanium and double-domed anti-reflective sapphire crystal.
          </p>

          <div className="space-y-2">
            <span className="text-xs uppercase tracking-wider text-[#6e6b79] dark:text-[#8e8a9c] font-medium">
              Casing Diameter
            </span>
            <div className="flex gap-2">
              {['38mm', '40mm', '42mm'].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-1.5 text-xs rounded-md font-tabular transition-colors ${
                    selectedSize === size
                      ? 'bg-[#17161b] text-white dark:bg-[#f4f3ef] dark:text-[#0f0e12]'
                      : 'border border-[#d6d3ca] dark:border-[#282637] text-[#605d6e] dark:text-[#a8a3b5]'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => setCartCount((prev) => prev + 1)}
            className="w-full py-3 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-[#17161b] dark:bg-[#f4f3ef] dark:text-[#0f0e12] rounded-md hover:bg-[#2c2936] transition-all flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Add To Editorial Bag · ${(1480 * cartCount).toLocaleString()}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// 5. Portfolio Architecture Demo
function PortfolioArchitectureDemo() {
  return (
    <div className="space-y-4">
      <div className="pb-3 border-b border-[#e5e3dc] dark:border-[#201e2e]">
        <h4 className="font-editorial text-lg text-[#141318] dark:text-[#f4f3ef] font-medium">
          Cinematic Luxury Architectural Blueprint
        </h4>
        <p className="text-xs text-[#6e6b79] dark:text-[#8e8a9c]">
          Inspired by the user&apos;s uploaded video reference displaying high-contrast typography, mirror floor reflections, and quiet luxury pacing.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="p-4 rounded-lg bg-white dark:bg-[#121118] border border-[#e5e3dc] dark:border-[#201e2e] space-y-2">
          <span className="font-semibold text-[#141318] dark:text-[#f4f3ef] block">
            1. Cormorant + Plus Jakarta
          </span>
          <p className="text-[#595665] dark:text-[#9e9aa8] leading-relaxed">
            Strict 2-font discipline pairing the high-contrast Italian-editorial serif Cormorant Garamond with Plus Jakarta Sans body copy.
          </p>
        </div>

        <div className="p-4 rounded-lg bg-white dark:bg-[#121118] border border-[#e5e3dc] dark:border-[#201e2e] space-y-2">
          <span className="font-semibold text-[#141318] dark:text-[#f4f3ef] block">
            2. Mirror-Floor Reflections
          </span>
          <p className="text-[#595665] dark:text-[#9e9aa8] leading-relaxed">
            Recreates the reference video&apos;s laptop reflection on the desk using CSS gradient masks and inverted vertical scaling.
          </p>
        </div>

        <div className="p-4 rounded-lg bg-white dark:bg-[#121118] border border-[#e5e3dc] dark:border-[#201e2e] space-y-2">
          <span className="font-semibold text-[#141318] dark:text-[#f4f3ef] block">
            3. Real Full-Stack Engine
          </span>
          <p className="text-[#595665] dark:text-[#9e9aa8] leading-relaxed">
            Express backend handling message persistence in data/messages.json, genuine resume PDF delivery, and real session authentication.
          </p>
        </div>
      </div>
    </div>
  );
}
