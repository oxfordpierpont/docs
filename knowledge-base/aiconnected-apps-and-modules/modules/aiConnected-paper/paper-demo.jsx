import React, { useState, useEffect } from 'react';

const STEPS = [
  { id: 'topic', label: 'Analyzing Topic', detail: 'Understanding your subject matter and key themes...' },
  { id: 'keywords', label: 'Researching Keywords', detail: 'Identifying trending search terms and industry language...' },
  { id: 'news', label: 'Reading Recent News', detail: 'Scanning 50+ publications for the latest developments...' },
  { id: 'reports', label: 'Analyzing Industry Reports', detail: 'Extracting insights from market research and white papers...' },
  { id: 'competitors', label: 'Competitor Analysis', detail: 'Reviewing thought leadership from industry leaders...' },
  { id: 'outline', label: 'Creating Outline', detail: 'Structuring your content for maximum impact...' },
  { id: 'writing', label: 'Writing Content', detail: 'Crafting compelling, research-backed narrative...' },
  { id: 'stats', label: 'Adding Statistics', detail: 'Incorporating relevant data and visualizations...' },
  { id: 'design', label: 'Applying Design', detail: 'Formatting into professional template...' },
  { id: 'review', label: 'Final Review', detail: 'Quality checking and polish...' },
];

// Simulated generated content preview
const SAMPLE_OUTPUT = {
  title: "AI Implementation Strategy Guide",
  subtitle: "How Forward-Thinking Companies Are Winning with Artificial Intelligence",
  sections: [
    "Start with High-Impact, Low-Risk Use Cases",
    "Invest in Data Infrastructure Before Algorithms", 
    "Build vs. Buy: Making the Right Choice",
    "Measure What Matters"
  ],
  stats: ["73% ROI exceeded", "4.2x average return", "67% faster insights"],
  pages: 7,
  readTime: "12 min"
};

export default function ThoughtLeadershipApp() {
  const [screen, setScreen] = useState('input'); // input, generating, preview
  const [topic, setTopic] = useState('');
  const [industry, setIndustry] = useState('');
  const [tone, setTone] = useState('professional');
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  
  // Simulate generation process
  useEffect(() => {
    if (screen === 'generating' && currentStep < STEPS.length) {
      const timer = setTimeout(() => {
        setCompletedSteps(prev => [...prev, STEPS[currentStep].id]);
        setCurrentStep(prev => prev + 1);
      }, 1500 + Math.random() * 1000);
      return () => clearTimeout(timer);
    } else if (screen === 'generating' && currentStep >= STEPS.length) {
      setTimeout(() => setScreen('preview'), 500);
    }
  }, [screen, currentStep]);

  const handleGenerate = () => {
    if (!topic.trim()) return;
    setScreen('generating');
    setCurrentStep(0);
    setCompletedSteps([]);
  };

  const handleReset = () => {
    setScreen('input');
    setTopic('');
    setIndustry('');
    setCurrentStep(0);
    setCompletedSteps([]);
  };

  // ==================== INPUT SCREEN ====================
  if (screen === 'input') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl">
          {/* Logo/Brand */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                <svg className="w-7 h-7 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span className="text-2xl font-semibold text-white tracking-tight">Content Strategist</span>
            </div>
            <p className="text-slate-400 text-lg">Generate executive-quality thought leadership in minutes</p>
          </div>

          {/* Input Card */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 shadow-2xl">
            <div className="space-y-6">
              {/* Topic Input */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  What topic should we cover?
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., AI implementation strategies for mid-market companies"
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Industry Select */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Target Industry
                </label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all appearance-none cursor-pointer"
                >
                  <option value="">Select an industry...</option>
                  <option value="financial">Financial Services</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="technology">Technology</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="retail">Retail & E-commerce</option>
                  <option value="realestate">Real Estate</option>
                  <option value="legal">Legal Services</option>
                  <option value="consulting">Consulting</option>
                </select>
              </div>

              {/* Tone Select */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Content Tone
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'professional', label: 'Professional', icon: '📊' },
                    { id: 'conversational', label: 'Conversational', icon: '💬' },
                    { id: 'authoritative', label: 'Authoritative', icon: '🎯' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTone(t.id)}
                      className={`px-4 py-3 rounded-xl border transition-all ${
                        tone === t.id
                          ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                          : 'bg-slate-800/30 border-slate-600 text-slate-400 hover:border-slate-500'
                      }`}
                    >
                      <span className="text-lg mb-1 block">{t.icon}</span>
                      <span className="text-sm">{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={!topic.trim()}
                className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${
                  topic.trim()
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 hover:from-amber-400 hover:to-amber-500 shadow-lg shadow-amber-500/25'
                    : 'bg-slate-700 text-slate-500 cursor-not-allowed'
                }`}
              >
                Generate Thought Leadership
              </button>
            </div>
          </div>

          {/* Features */}
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            {[
              { icon: '🔬', label: 'Deep Research' },
              { icon: '📈', label: 'Real Statistics' },
              { icon: '✨', label: 'Executive Design' },
            ].map((f, i) => (
              <div key={i} className="text-slate-500">
                <span className="text-2xl block mb-1">{f.icon}</span>
                <span className="text-sm">{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ==================== GENERATING SCREEN ====================
  if (screen === 'generating') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-2xl font-semibold text-white mb-2">Creating Your Content</h2>
            <p className="text-slate-400">"{topic}"</p>
          </div>

          {/* Progress Card */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 shadow-2xl">
            {/* Overall Progress */}
            <div className="mb-8">
              <div className="flex justify-between text-sm text-slate-400 mb-2">
                <span>Progress</span>
                <span>{Math.round((completedSteps.length / STEPS.length) * 100)}%</span>
              </div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-500 ease-out"
                  style={{ width: `${(completedSteps.length / STEPS.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Steps List */}
            <div className="space-y-3">
              {STEPS.map((step, index) => {
                const isCompleted = completedSteps.includes(step.id);
                const isCurrent = index === currentStep;
                const isPending = index > currentStep;

                return (
                  <div
                    key={step.id}
                    className={`flex items-center gap-4 p-3 rounded-xl transition-all ${
                      isCurrent ? 'bg-amber-500/10 border border-amber-500/30' : 
                      isCompleted ? 'bg-green-500/5' : 'opacity-40'
                    }`}
                  >
                    {/* Status Icon */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isCompleted ? 'bg-green-500' :
                      isCurrent ? 'bg-amber-500' : 'bg-slate-600'
                    }`}>
                      {isCompleted ? (
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : isCurrent ? (
                        <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <span className="text-slate-400 text-sm">{index + 1}</span>
                      )}
                    </div>

                    {/* Step Info */}
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium ${
                        isCompleted ? 'text-green-400' :
                        isCurrent ? 'text-amber-300' : 'text-slate-500'
                      }`}>
                        {step.label}
                      </p>
                      {isCurrent && (
                        <p className="text-sm text-slate-500 truncate">{step.detail}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Estimated Time */}
          <p className="text-center text-slate-500 mt-6 text-sm">
            Estimated time remaining: {Math.max(0, (STEPS.length - completedSteps.length) * 2)} seconds
          </p>
        </div>
      </div>
    );
  }

  // ==================== PREVIEW SCREEN ====================
  if (screen === 'preview') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-semibold text-white mb-1">Your Content is Ready</h2>
              <p className="text-slate-400">Review, edit, or distribute your thought leadership piece</p>
            </div>
            <button
              onClick={handleReset}
              className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
            >
              ← Create Another
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Preview Panel */}
            <div className="lg:col-span-2">
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
                {/* PDF Preview Mock */}
                <div className="aspect-[8.5/11] bg-white p-8 relative">
                  {/* Cover simulation */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-800">
                    <div className="absolute bottom-0 left-0 right-0 bg-slate-800 p-8">
                      <h1 className="text-3xl font-serif text-white mb-2">{SAMPLE_OUTPUT.title}</h1>
                      <p className="text-slate-300">{SAMPLE_OUTPUT.subtitle}</p>
                    </div>
                    <div className="absolute bottom-4 right-4 text-amber-400 font-semibold">
                      Your Brand Here
                    </div>
                  </div>
                </div>

                {/* Preview Controls */}
                <div className="bg-slate-800/50 px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button className="p-2 text-slate-400 hover:text-white transition-colors">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <span className="text-slate-300">Page 1 of {SAMPLE_OUTPUT.pages}</span>
                    <button className="p-2 text-slate-400 hover:text-white transition-colors">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-slate-400 hover:text-white transition-colors">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </button>
                    <button className="p-2 text-slate-400 hover:text-white transition-colors">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Details & Actions Panel */}
            <div className="space-y-6">
              {/* Content Summary */}
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Content Summary</h3>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Title</p>
                    <p className="text-white font-medium">{SAMPLE_OUTPUT.title}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-slate-500 mb-2">Sections</p>
                    <ul className="space-y-1">
                      {SAMPLE_OUTPUT.sections.map((section, i) => (
                        <li key={i} className="text-slate-300 text-sm flex items-start gap-2">
                          <span className="text-amber-500">•</span>
                          {section}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-4 pt-2">
                    <div>
                      <p className="text-2xl font-semibold text-amber-400">{SAMPLE_OUTPUT.pages}</p>
                      <p className="text-xs text-slate-500">Pages</p>
                    </div>
                    <div>
                      <p className="text-2xl font-semibold text-amber-400">{SAMPLE_OUTPUT.readTime}</p>
                      <p className="text-xs text-slate-500">Read Time</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Statistics */}
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Key Statistics Included</h3>
                <div className="space-y-2">
                  {SAMPLE_OUTPUT.stats.map((stat, i) => (
                    <div key={i} className="flex items-center gap-2 text-slate-300 text-sm">
                      <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {stat}
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button className="w-full py-4 rounded-xl font-semibold text-lg bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 hover:from-amber-400 hover:to-amber-500 shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Distribute
                </button>
                
                <button className="w-full py-4 rounded-xl font-semibold text-lg bg-slate-700 text-white hover:bg-slate-600 transition-all flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit Content
                </button>

                <button className="w-full py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download PDF
                </button>
              </div>

              {/* Distribution Options (collapsed) */}
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Quick Distribute</h3>
                <div className="grid grid-cols-5 gap-2">
                  {['LinkedIn', 'Twitter', 'Facebook', 'Website', 'Email'].map((platform) => (
                    <button
                      key={platform}
                      className="p-3 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 transition-colors text-slate-400 hover:text-white text-xs text-center"
                    >
                      {platform}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
