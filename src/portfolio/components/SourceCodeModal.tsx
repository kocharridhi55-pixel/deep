import { X, Code, ExternalLink, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { Project } from '../types/portfolio';

interface SourceCodeModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function SourceCodeModal({ project, onClose }: SourceCodeModalProps) {
  const [copied, setCopied] = useState(false);

  if (!project) return null;

  const sampleSnippet =
    project.demoType === 'ai-chat'
      ? `// Gemini AI Streaming Inference Pipeline
import { GoogleGenAI } from '@google/genai';

export async function generateStreamingResponse(prompt: string, context: string[]) {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      systemInstruction: 'You are an intelligent, articulate assistant embedded in the luxury portfolio of a Developer and Data Science Student.'
    }
  });
  return response.text;
}`
      : project.demoType === 'medical-inventory'
      ? `// Pharmaceutical Stock & Expiry Alert Engine
export function evaluateBatchRisk(skus: MedicationItem[]) {
  const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;
  const now = Date.now();

  return skus.map(item => {
    const expiryTimestamp = new Date(item.expiry).getTime();
    const daysUntilExpiry = Math.floor((expiryTimestamp - now) / (24 * 60 * 60 * 1000));
    
    return {
      ...item,
      needsReorder: item.stock <= item.reorderThreshold,
      isNearExpiry: daysUntilExpiry <= 60,
      urgencyGrade: daysUntilExpiry < 30 ? 'CRITICAL' : 'MONITOR'
    };
  });
}`
      : project.demoType === 'data-science'
      ? `# Exploratory Data Analysis & Feature Importance with Pandas/NumPy
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier

def process_clinical_features(dataset_path: str):
    df = pd.read_csv(dataset_path)
    df.fillna(df.median(numeric_only=True), inplace=True)
    
    # Feature engineering & correlation matrix
    corr_matrix = df.corr()
    X = df.drop(columns=['target_outcome'])
    y = df['target_outcome']
    
    rf = RandomForestClassifier(n_estimators=200, random_state=42)
    rf.fit(X, y)
    
    return {
        'feature_importances': dict(zip(X.columns, rf.feature_importances_)),
        'correlation': corr_matrix
    }`
      : `// Modern React + Motion Component with Mirror Floor
export function LuxuryProductShowcase({ product, onAddToCart }: Props) {
  return (
    <article className="group relative rounded-xl border border-white/10 bg-[#121118]">
      <div className="aspect-[4/3] overflow-hidden">
        <img src={product.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
      </div>
      <div className="mirror-floor absolute -bottom-24 left-0 right-0 h-24 transform scale-y-[-1] opacity-30" />
    </article>
  );
}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(sampleSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl rounded-xl border border-[#dedcd4] dark:border-[#2b283a] bg-[#fcfbf7] dark:bg-[#121118] p-6 sm:p-8 shadow-2xl overflow-hidden font-body">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-md text-[#787584] dark:text-[#888394] hover:text-[#141318] dark:hover:text-[#f4f3ef] transition-colors"
          aria-label="Close source code modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="mb-6 space-y-1">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#7358a8] dark:text-[#a895d3] font-semibold">
            <Code className="w-4 h-4" />
            <span>Architecture &amp; Repository</span>
          </div>
          <h3 className="font-editorial text-2xl text-[#141318] dark:text-[#f4f3ef] font-medium">
            {project.title} · Source Architecture
          </h3>
          <p className="text-xs text-[#6e6b79] dark:text-[#8e8a9c] font-tabular">
            Target Stack: {project.technologies.join(' · ')}
          </p>
        </div>

        {/* Code Snippet Box */}
        <div className="relative rounded-lg bg-[#0e0d14] border border-[#2b283b] p-4 text-xs font-mono text-[#dcd7ea] overflow-x-auto mb-6">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-[10px] text-white/50 uppercase tracking-widest">
            <span>Primary Core Implementation</span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              {copied ? <Check className="w-3 h-3 text-[#79c98a]" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <pre className="overflow-x-auto whitespace-pre">{sampleSnippet}</pre>
        </div>

        {/* Action footer */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[#e5e3dc] dark:border-[#201e2e]">
          <span className="text-xs text-[#6e6b79] dark:text-[#8e8a9c]">
            Open repository for full tests, documentation, and commits.
          </span>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#17161b] dark:bg-[#f4f3ef] dark:text-[#0f0e12] rounded-md hover:bg-[#2c2936] dark:hover:bg-[#dfdcd3] transition-colors"
          >
            <span>Inspect On GitHub</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
