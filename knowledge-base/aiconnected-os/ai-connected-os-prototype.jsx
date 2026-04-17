import { useState, useEffect } from "react";
import {
  MessageSquare, Search, LayoutGrid, Users, Settings, ChevronRight, ChevronDown,
  Mic, Paperclip, ArrowUp, Pin, Plus, Moon, Sun, Menu, X, User,
  CreditCard, Volume2, HardDrive, Globe, Cpu, Link2, Zap, Clock,
  Brain, GitBranch, Heart, ExternalLink, Activity, Shield, RotateCcw,
  Eye, Home, Bot, BarChart3, Sparkles, Hash, MapPin, UserCircle,
  Folder, Command, Copy, MoreHorizontal,
  Square, RefreshCw, GitFork, Filter, Send, Inbox,
  AtSign, UserPlus, FileText, Download, Trash2, Archive, Edit3,
  Image, FileCode, FilePlus, Upload, EyeOff, FolderOpen, Layers,
  Sliders, ArrowRight, ToggleLeft, ToggleRight, Info, Bell,
  Bookmark, History, FileDown, AlertCircle,
  ArrowLeft, Maximize2, Minimize2, Columns, Compass
} from "lucide-react";

// â”€â”€â”€ DATA (mock data representing platform entities) â”€â”€â”€
// Entities: Persona, Instance, Chat, Message, SearchResult, Task
// Phase2: File, WorkspaceItem, InstanceSettings, ModelRole, APIKey, PersonaBoundary, PersonaDeployment
// Phase3: SearchHistory, DeletedChat, ExtendedSearch, Tier, Notification, Model
// Phase4: ForumMessage, Team, InsightMetric, BrowserSession, OnboardingStep, BrowserTab
const PERSONAS = [
  { id: 1, name: "Sally", role: "Web Designer", status: "active", mood: "Focused", skills: 7, maxSkills: 10, memories: 142, decisions: 28, lastUpdate: "5 min ago" },
  { id: 2, name: "Sam", role: "Business Analyst", status: "active", mood: "Cheerful", skills: 5, maxSkills: 10, memories: 89, decisions: 14, lastUpdate: "15 min ago" },
  { id: 3, name: "Nora", role: "Research Assistant", status: "idle", mood: "Neutral", skills: 8, maxSkills: 10, memories: 203, decisions: 41, lastUpdate: "2 hrs ago" },
  { id: 4, name: "Dev", role: "Software Engineer", status: "sleeping", mood: "Neutral", skills: 9, maxSkills: 10, memories: 312, decisions: 55, lastUpdate: "Yesterday" },
];
const INSTANCES = [
  { id: 1, name: "Client Website Redesign", type: "Business", chats: 12, files: 34, tasks: 4, lastActive: "2 min ago", personas: [1, 2], status: "active" },
  { id: 2, name: "Q1 Marketing Strategy", type: "Business", chats: 8, files: 15, tasks: 6, lastActive: "1 hr ago", personas: [3], status: "active" },
  { id: 3, name: "Personal Journal", type: "Personal", chats: 45, files: 3, tasks: 0, lastActive: "Yesterday", personas: [], status: "idle" },
  { id: 4, name: "App Development", type: "Project", chats: 23, files: 67, tasks: 11, lastActive: "3 hrs ago", personas: [4, 1], status: "active" },
  { id: 5, name: "Financial Planning", type: "Personal", chats: 6, files: 9, tasks: 2, lastActive: "3 days ago", personas: [2], status: "idle" },
];
const CHATS = [
  { id: 1, title: "Hero Section Layout", instance: 1, time: "2 min ago", preview: "I'll finalize that direction and prepare responsive breakpoints...", personas: [1, 2], tags: ["design", "hero"], type: "collaborative" },
  { id: 2, title: "Navigation Redesign", instance: 1, time: "1 hr ago", preview: "Sticky nav with transparency on scroll works well...", personas: [1], tags: ["design"], type: "private" },
  { id: 3, title: "Brand Color Discussion", instance: 1, time: "3 hrs ago", preview: "Navy #1a1a2e primary, #e94560 accent...", personas: [1], tags: ["brand"], type: "private" },
  { id: 4, title: "Client Feedback Review", instance: 1, time: "Yesterday", preview: "Reviewed client notes from last call...", personas: [2], tags: ["client", "feedback"], type: "private" },
  { id: 5, title: "Competitor Analysis", instance: 2, time: "1 hr ago", preview: "Found 12 competitors in direct space...", personas: [3], tags: ["research"], type: "private" },
  { id: 6, title: "Daily Reflection", instance: 3, time: "Yesterday", preview: "Took a walk and thought about priorities...", personas: [], tags: [], type: "private" },
  { id: 7, title: "React Architecture", instance: 4, time: "3 hrs ago", preview: "Component tree for the dashboard module...", personas: [4, 1], tags: ["code", "architecture"], type: "collaborative" },
  { id: 8, title: "Budget Review", instance: 5, time: "3 days ago", preview: "Current runway and projected expenses...", personas: [2], tags: ["finance"], type: "private" },
];
const INIT_MESSAGES = [
  { id: 1, sender: "You", persona: null, text: "Sally, can you show me the latest mockup for the hero section?", time: "2:34 PM", date: "Feb 13", pinned: false, hasLink: false, hasMedia: false },
  { id: 2, sender: "Sally", persona: 1, text: "Of course! I've been working on three variations. The first uses the asymmetric layout we discussed â€” large hero image on the left with the headline offset to the right.", time: "2:34 PM", date: "Feb 13", pinned: true, hasLink: false, hasMedia: false },
  { id: 3, sender: "You", persona: null, text: "Go with the first one. The asymmetric layout feels more aligned with the brand.", time: "2:35 PM", date: "Feb 13", pinned: true, hasLink: false, hasMedia: false },
  { id: 4, sender: "Sally", persona: 1, text: "Agreed â€” I'll finalize that direction and prepare the responsive breakpoints. Should I also adjust the navigation bar to match the new visual weight?", time: "2:35 PM", date: "Feb 13", pinned: false, hasLink: false, hasMedia: false },
  { id: 5, sender: "You", persona: null, text: "Yes, and make sure Sam reviews the copy before we send it to the client. Here's the reference: https://docs.apex.co/brand-guide", time: "2:36 PM", date: "Feb 13", pinned: false, hasLink: true, hasMedia: false },
  { id: 6, sender: "Sally", persona: 1, text: "Got it. I've flagged Sam â€” he'll review the headline and subhead copy. I'll have the full mockup ready within the hour.", time: "2:36 PM", date: "Feb 13", pinned: false, hasLink: false, hasMedia: false },
  { id: 7, sender: "Sam", persona: 2, text: "I'll take a look at the copy now. Quick question â€” are we keeping the tagline from the original brief or drafting something new?", time: "2:38 PM", date: "Feb 13", pinned: false, hasLink: false, hasMedia: false },
  { id: 8, sender: "You", persona: null, text: "Let's draft something new. The original was too generic.", time: "2:39 PM", date: "Feb 13", pinned: false, hasLink: false, hasMedia: false },
];
const SEARCH_RESULTS = [
  { id: 1, title: "Hero Section Layout Patterns 2026", url: "designsystems.io", snippet: "Modern hero section layouts including asymmetric, split-screen, and immersive full-bleed approaches.", type: "web" },
  { id: 2, title: "Responsive Typography Scale Calculator", url: "typescale.com", snippet: "Generate fluid typography scales using clamp() and modern CSS.", type: "web" },
  { id: 3, title: "Client Brand Guidelines â€” Apex Corp", url: "Internal", snippet: "Navy #1a1a2e, Accent #e94560. DM Sans headings, Source Sans body.", type: "internal" },
];
const TASKS = [
  { task: "Finalize hero section layout", assignee: "Sally", due: "Today", status: "active" },
  { task: "Review headline copy", assignee: "Sam", due: "Today", status: "pending" },
  { task: "Prepare responsive breakpoints", assignee: "Sally", due: "Tomorrow", status: "pending" },
  { task: "Client presentation deck", assignee: "Sam", due: "Feb 15", status: "pending" },
];
const CHATNAV_SECTIONS = [
  { date: "Feb 10", items: [
    { id: "cn1", label: "Project kickoff & goals", summary: "Defined the scope for the Apex Corp website redesign. Agreed on timeline, deliverables, and initial creative direction." },
    { id: "cn2", label: "Brand identity discussion", summary: "Explored color palettes and typography. Narrowed to navy + accent approach. Referenced competitor sites for inspiration." },
  ]},
  { date: "Feb 11", items: [
    { id: "cn3", label: "Wireframe review", summary: "Reviewed three wireframe options. Identified strengths in Option B's information hierarchy. Decided to iterate on it." },
  ]},
  { date: "Feb 12", items: [
    { id: "cn4", label: "Hero section options", summary: "Sally presented three hero layout variations: centered, asymmetric, and full-bleed. Discussed pros and cons of each." },
  ]},
  { date: "Feb 13", items: [
    { id: "cn5", label: "Layout decision: asymmetric", summary: "Chose the asymmetric hero layout. Sally will finalize with responsive breakpoints. Sam assigned to review copy." },
    { id: "cn6", label: "Sam joins for copy review", summary: "Sam reviewing headline and tagline. Decision to draft new tagline â€” original was too generic." },
  ]},
];
const MEMORIES = {
  1: [
    { id: 1, type: "decision", text: "Prefers asymmetric layouts over traditional centered designs", chat: "Hero Section Layout", chatId: 1, time: "Feb 13", strength: "strong" },
    { id: 2, type: "fact", text: "Brand colors: Navy #1a1a2e primary, #e94560 accent", chat: "Brand Color Discussion", chatId: 3, time: "Feb 12", strength: "strong" },
    { id: 3, type: "preference", text: "Sam must review all client-facing copy before delivery", chat: "Hero Section Layout", chatId: 1, time: "Feb 13", strength: "strong" },
    { id: 4, type: "fact", text: "Client is Apex Corp â€” B2B SaaS in fintech", chat: "Client Feedback", chatId: 4, time: "Feb 11", strength: "strong" },
    { id: 5, type: "preference", text: "Sticky navigation with transparency on scroll", chat: "Navigation Redesign", chatId: 2, time: "Feb 12", strength: "medium" },
    { id: 6, type: "decision", text: "DM Sans headings, Source Sans Pro body", chat: "Brand Color Discussion", chatId: 3, time: "Feb 12", strength: "strong" },
    { id: 7, type: "skill", text: "Mobile-first responsive approach", chat: "Navigation Redesign", chatId: 2, time: "Feb 12", strength: "medium" },
    { id: 8, type: "preference", text: "Dislikes overly rounded corners â€” 4-8px max", chat: "Hero Section Layout", chatId: 1, time: "Feb 13", strength: "medium" },
  ],
  2: [{ id: 1, type: "preference", text: "Concise executive summaries over long reports", chat: "Client Feedback", chatId: 4, time: "Feb 11", strength: "strong" }],
  3: [{ id: 1, type: "skill", text: "Prioritize academic sources over blogs", chat: "Competitor Analysis", chatId: 4, time: "Feb 12", strength: "strong" }],
  4: [{ id: 1, type: "fact", text: "React 19 + TypeScript + Tailwind CSS", chat: "App Development", chatId: 4, time: "Feb 10", strength: "strong" }],
};

// â”€â”€â”€ EXTENDED DATA (files, workspace, settings, models, keys, boundaries) â”€â”€â”€
const FILES = {
  1: [
    { id: "f1", name: "brand-guidelines.pdf", type: "pdf", size: "2.4 MB", origin: "upload", visibility: "instance", date: "Feb 10", chat: "Brand Color Discussion" },
    { id: "f2", name: "hero-mockup-v3.png", type: "image", size: "1.8 MB", origin: "generated", visibility: "visible", date: "Feb 13", chat: "Hero Section Layout" },
    { id: "f3", name: "competitor-analysis.docx", type: "doc", size: "340 KB", origin: "generated", visibility: "visible", date: "Feb 11", chat: "Client Feedback Review" },
    { id: "f4", name: "apex-logo.svg", type: "image", size: "24 KB", origin: "upload", visibility: "visible", date: "Feb 10", chat: null },
    { id: "f5", name: "wireframe-optionB.fig", type: "other", size: "5.1 MB", origin: "upload", visibility: "instance", date: "Feb 11", chat: "Navigation Redesign" },
    { id: "f6", name: "color-palette-export.json", type: "code", size: "4 KB", origin: "generated", visibility: "hidden", date: "Feb 12", chat: "Brand Color Discussion" },
    { id: "f7", name: "responsive-specs.pdf", type: "pdf", size: "890 KB", origin: "generated", visibility: "visible", date: "Feb 13", chat: "Hero Section Layout" },
  ],
  2: [
    { id: "f8", name: "market-research-q1.pdf", type: "pdf", size: "3.2 MB", origin: "upload", visibility: "visible", date: "Feb 9", chat: null },
    { id: "f9", name: "competitor-grid.xlsx", type: "doc", size: "120 KB", origin: "generated", visibility: "visible", date: "Feb 12", chat: "Competitor Analysis" },
  ],
  4: [
    { id: "f10", name: "component-tree.tsx", type: "code", size: "12 KB", origin: "generated", visibility: "visible", date: "Feb 11", chat: "React Architecture" },
    { id: "f11", name: "api-schema.json", type: "code", size: "8 KB", origin: "generated", visibility: "instance", date: "Feb 10", chat: "React Architecture" },
  ],
};
const WORKSPACE_ITEMS = [
  { id: "w1", title: "Asymmetric layout decision", section: "Hero Section", type: "decision", source: "Hero Section Layout", content: "Chose asymmetric hero layout over centered and full-bleed options." },
  { id: "w2", title: "Brand colors finalized", section: "Brand Identity", type: "fact", source: "Brand Color Discussion", content: "Navy #1a1a2e primary, #e94560 accent. DM Sans headings." },
  { id: "w3", title: "Client feedback notes", section: "Client Input", type: "note", source: "Client Feedback Review", content: "Client wants bold, modern feel. Avoid generic corporate look." },
  { id: "w4", title: "Nav behavior spec", section: "Hero Section", type: "spec", source: "Navigation Redesign", content: "Sticky nav with transparency on scroll. Mobile hamburger." },
  { id: "w5", title: "Copy review process", section: "Process", type: "decision", source: "Hero Section Layout", content: "All client-facing copy must be reviewed by Sam before delivery." },
];
const INST_SETTINGS = {
  voice: { value: "Professional, warm", source: "Type: Business", custom: false },
  tone: { value: "Confident, clear", source: "Type: Business", custom: false },
  personality: { value: "Collaborative, detail-oriented", source: "Custom", custom: true },
  model: { value: "Research: Claude Opus Â· Writing: Claude Sonnet", source: "Global", custom: false },
  storage: { value: "Local + Google Drive", source: "Custom", custom: true },
  cleanup: { value: "Weekly Â· Auto-rename enabled", source: "Global", custom: false },
};
const MODEL_ROLES = [
  { role: "Research", primary: "Claude Opus", fallback: "GPT-4o", provider: "Anthropic", icon: <Search size={14} /> },
  { role: "Writing", primary: "Claude Sonnet", fallback: "Claude Haiku", provider: "Anthropic", icon: <FileText size={14} /> },
  { role: "Coding", primary: "Claude Sonnet", fallback: "GPT-4o", provider: "Anthropic", icon: <FileCode size={14} /> },
  { role: "Design", primary: "DALL-E 3", fallback: "Midjourney", provider: "OpenAI", icon: <Image size={14} /> },
  { role: "Planning", primary: "Claude Opus", fallback: "Claude Sonnet", provider: "Anthropic", icon: <Layers size={14} /> },
  { role: "Reasoning", primary: "Claude Opus", fallback: "o1-mini", provider: "Anthropic", icon: <Brain size={14} /> },
];
const API_KEYS = [
  { id: "k1", provider: "Anthropic", label: "Claude API", status: "active", lastUsed: "2 min ago", masked: "sk-ant-...x9Qf" },
  { id: "k2", provider: "OpenAI", label: "OpenAI", status: "active", lastUsed: "1 hr ago", masked: "sk-...mR4j" },
  { id: "k3", provider: "OpenRouter", label: "OpenRouter", status: "inactive", lastUsed: "3 days ago", masked: "sk-or-...7KpL" },
];
const TYPE_TEMPLATES = [
  { id: "t1", name: "Business", instances: 2, defaults: { voice: "Professional", cleanup: "Weekly", model: "Claude Sonnet" } },
  { id: "t2", name: "Personal", instances: 2, defaults: { voice: "Casual, warm", cleanup: "Monthly", model: "Claude Haiku" } },
  { id: "t3", name: "Project", instances: 1, defaults: { voice: "Technical, precise", cleanup: "Weekly", model: "Claude Opus" } },
];
const INSTRUCTION_MEMORY = [
  { id: "im1", rule: "Always confirm before sending anything to a client", source: "Hero Section Layout", scope: "Global", date: "Feb 13", active: true },
  { id: "im2", rule: "Use DM Sans for headings in all design outputs", source: "Brand Color Discussion", scope: "Instance: Client Website Redesign", date: "Feb 12", active: true },
  { id: "im3", rule: "Keep executive summaries under 200 words", source: "Client Feedback Review", scope: "Type: Business", date: "Feb 11", active: true },
  { id: "im4", rule: "Prefer async communication references over meetings", source: "Budget Review", scope: "Global", date: "Feb 10", active: false },
  { id: "im5", rule: "Format code examples with TypeScript by default", source: "React Architecture", scope: "Instance: App Development", date: "Feb 11", active: true },
];
const SETTINGS_CASCADE = [
  { layer: "Global Chat", desc: "Base defaults for all conversations", items: ["Greeting style: Warm", "Max tokens: 4096", "Auto-rename: On"] },
  { layer: "Global Instance", desc: "Defaults for all Instances", items: ["Cleanup: Weekly", "Storage: Local", "File visibility: Visible"] },
  { layer: "Type: Business", desc: "Overrides for Business Instances", items: ["Voice: Professional", "Tone: Confident", "Cleanup: Weekly"] },
  { layer: "Instance: Client Website Redesign", desc: "Instance-level overrides", items: ["Personality: Collaborative", "Storage: Local + Drive"] },
];
const PERSONA_BOUNDARIES = {
  1: { will: ["Design UI layouts", "Create responsive mockups", "Suggest color palettes", "Review visual consistency"], wont: ["Write backend code", "Make budget decisions", "Approve client deliverables"], escalation: "Flags Sam for copy review, flags Bob for client approval", ceiling: 7, canLearn: true },
  2: { will: ["Analyze business data", "Write executive summaries", "Review client-facing copy", "Create presentation decks"], wont: ["Design interfaces", "Write production code", "Make hiring decisions"], escalation: "Flags Bob for financial decisions over $5K", ceiling: 6, canLearn: true },
  3: { will: ["Search academic sources", "Compile research briefs", "Fact-check claims", "Summarize papers"], wont: ["Make strategic recommendations", "Contact external parties", "Publish content"], escalation: "Flags Bob for all external communications", ceiling: 8, canLearn: true },
  4: { will: ["Write React/TypeScript code", "Review pull requests", "Debug issues", "Architect components"], wont: ["Design UI without spec", "Deploy to production", "Access databases directly"], escalation: "Requires Bob's approval for any deployment", ceiling: 9, canLearn: true },
};
const PERSONA_DEPLOYMENTS = {
  1: [{ inst: "Client Website Redesign", role: "Lead Designer", since: "Feb 10" }, { inst: "App Development", role: "UI Consultant", since: "Feb 11" }],
  2: [{ inst: "Client Website Redesign", role: "Copy Reviewer", since: "Feb 11" }, { inst: "Financial Planning", role: "Analyst", since: "Feb 8" }],
  3: [{ inst: "Q1 Marketing Strategy", role: "Researcher", since: "Feb 9" }],
  4: [{ inst: "App Development", role: "Lead Engineer", since: "Feb 8" }],
};
const SEARCH_HISTORY = [
  { id: "sh1", query: "asymmetric layout patterns", time: "2 hrs ago", saved: true },
  { id: "sh2", query: "responsive breakpoints best practices", time: "Yesterday", saved: false },
  { id: "sh3", query: "Apex Corp brand guidelines", time: "Feb 11", saved: true },
  { id: "sh4", query: "DM Sans font pairing", time: "Feb 10", saved: false },
];
const DELETED_CHATS = [
  { id: "dc1", title: "Old brainstorm ideas", deletedAt: "Feb 11", expiresIn: "27 days" },
  { id: "dc2", title: "Test conversation", deletedAt: "Feb 12", expiresIn: "28 days" },
];
const EXTENDED_SEARCH = [
  ...SEARCH_RESULTS,
  { id: 4, title: "Asymmetric layout decision", url: "Memory", snippet: "Sally: Prefers asymmetric layouts over traditional centered designs. Strength: strong.", type: "memory" },
  { id: 5, title: "Hero Section Layout", url: "Chat Â· Client Website Redesign", snippet: "Discussion about hero variations. Chose asymmetric approach with responsive breakpoints.", type: "chat" },
  { id: 6, title: "brand-guidelines.pdf", url: "Files Â· Client Website Redesign Â· 2.4 MB", snippet: "Apex Corp brand guidelines document uploaded Feb 10.", type: "file" },
];
const TIERS = [
  { id: "free", name: "Free", price: "$0", features: ["2 Personas", "3 Instances", "5 chats/day", "Basic models", "1 GB storage"], current: false },
  { id: "plus", name: "Plus", price: "$19.99", features: ["5 Personas", "10 Instances", "50 chats/day", "Standard models", "10 GB storage", "File uploads"], current: false },
  { id: "premium", name: "Premium", price: "$49.99", features: ["15 Personas", "Unlimited Instances", "Unlimited chats", "All models", "50 GB storage", "BYOK support", "Teams (coming soon)"], current: false },
  { id: "pro", name: "Pro", price: "$99.99", features: ["Unlimited Personas", "Unlimited everything", "Priority models", "200 GB storage", "Full BYOK", "Teams", "API access", "Dedicated support"], current: true },
];
const NOTIFICATIONS = [
  { id: "n1", text: "Sally updated hero section mockup", time: "2 min ago", type: "persona", read: false },
  { id: "n2", text: "Auto-rename suggested for 2 chats", time: "15 min ago", type: "system", read: false },
  { id: "n3", text: "Nora completed competitor analysis", time: "1 hr ago", type: "persona", read: true },
  { id: "n4", text: "Weekly cleanup: 3 chats archived", time: "Yesterday", type: "system", read: true },
  { id: "n5", text: "New model available: Claude Opus 4.5", time: "2 days ago", type: "system", read: true },
];
const MODELS_LIST = [
  { id: "m1", name: "Claude Opus", provider: "Anthropic", tag: "Best overall" },
  { id: "m2", name: "Claude Sonnet", provider: "Anthropic", tag: "Fast" },
  { id: "m3", name: "GPT-4o", provider: "OpenAI", tag: "Versatile" },
  { id: "m4", name: "Gemini 2.5", provider: "Google", tag: "Research" },
  { id: "m5", name: "DeepSeek R1", provider: "DeepSeek", tag: "Reasoning" },
  { id: "m6", name: "Minimax", provider: "OpenRouter", tag: "Lightweight" },
];
const FORUM_MESSAGES = [
  { id: "fm1", sender: "You", text: "Team â€” what's our priority for the rest of the week?", time: "9:12 AM" },
  { id: "fm2", sender: "Sally", persona: 1, text: "The hero section responsive breakpoints are my top item. Should be done by EOD.", time: "9:14 AM" },
  { id: "fm3", sender: "Sam", persona: 2, text: "I need to finalize the competitive positioning section of the deck. Also waiting on updated copy.", time: "9:15 AM" },
  { id: "fm4", sender: "You", text: "Good. Sally, make sure the mobile nav is tested too. Sam, draft the positioning by lunch.", time: "9:17 AM" },
];
const TEAMS_DATA = [
  { id: "at1", name: "Content Pipeline", type: "Recurring", status: "active", members: 4, lastRun: "2 hrs ago", tasks: 12, completed: 9, desc: "Weekly blog + social content creation" },
  { id: "at2", name: "Competitive Intel", type: "Long-Term", status: "active", members: 3, lastRun: "Yesterday", tasks: 8, completed: 5, desc: "Ongoing competitor monitoring and analysis" },
  { id: "at3", name: "Client Onboarding", type: "Short-Term", status: "idle", members: 2, lastRun: "3 days ago", tasks: 6, completed: 6, desc: "Onboarding docs for Apex Corp" },
  { id: "at4", name: "Market Research Sprint", type: "Short-Term", status: "active", members: 5, lastRun: "1 hr ago", tasks: 15, completed: 3, desc: "Q1 market sizing for three verticals" },
];
const INSIGHTS_DATA = {
  conversations: { value: 234, trend: "+12%", label: "Total Conversations" },
  personaUtil: { value: "78%", trend: "+5%", label: "Persona Utilization" },
  memoryGrowth: { value: 142, trend: "+42 this week", label: "Memories Created" },
  modelUsage: { value: "Sonnet", trend: "62% of calls", label: "Top Model" },
  topPersona: { value: "Sally", trend: "89 conversations", label: "Most Active Persona" },
  avgLength: { value: "18 msgs", trend: "-3% vs last week", label: "Avg Conversation Length" },
  tokensSaved: { value: "340K", trend: "via BYOK", label: "Tokens This Month" },
  searchQueries: { value: 67, trend: "+8 today", label: "Searches Performed" },
};
const BROWSER_SESSIONS = [
  { id: "bs1", url: "apex-corp.com/pricing", persona: "Sally", action: "Extracting competitor pricing", time: "10 min ago" },
  { id: "bs2", url: "figma.com/file/Kj9x...", persona: "Sally", action: "Reviewing design spec", time: "25 min ago" },
  { id: "bs3", url: "docs.google.com/spreadsheet/...", persona: "Sam", action: "Analyzing Q1 revenue data", time: "1 hr ago" },
];
const ONBOARDING_STEPS = [
  { id: "ob1", title: "Chat", desc: "Your conversations live here. This is the backbone of everything.", icon: <MessageSquare size={24} /> },
  { id: "ob2", title: "Spaces", desc: "Organize work into Instances â€” each a complete workspace.", icon: <LayoutGrid size={24} /> },
  { id: "ob3", title: "People", desc: "AI Personas with real memory, skills, and boundaries.", icon: <Users size={24} /> },
  { id: "ob4", title: "Search", desc: "Find anything across chats, files, memories, and the web.", icon: <Search size={24} /> },
];

// â”€â”€â”€ THEMES (light/dark mode color tokens) â”€â”€â”€
// Tokens: bg, surface, surfaceAlt, text, textSec, textMuted, textFaint,
//   border, borderSubtle, accent, accentText, dot (active/idle/sleeping),
//   inputBg, pinBg, pinBorder, sidebar (bg/bgHover/bgActive/text/textMuted/textFaint/border)
const T = {
  light: {
    bg: "#fafafa", surface: "#ffffff", surfaceAlt: "#f5f5f5",
    text: "#0a0a0a", textSec: "#525252", textMuted: "#a3a3a3", textFaint: "#d4d4d4",
    border: "#e5e5e5", borderSubtle: "#f0f0f0",
    accent: "#0a0a0a", accentText: "#fafafa",
    dot: { active: "#22c55e", idle: "#f59e0b", sleeping: "#cbd5e1" },
    inputBg: "#f5f5f5", pinBg: "#fffbeb", pinBorder: "#fde68a",
    sidebar: { bg: "#111111", bgHover: "#1a1a1a", bgActive: "#222222", text: "#e5e5e5", textMuted: "#777", textFaint: "#444", border: "#282828" },
  },
  dark: {
    bg: "#0a0a0a", surface: "#141414", surfaceAlt: "#1a1a1a",
    text: "#fafafa", textSec: "#a3a3a3", textMuted: "#666", textFaint: "#333",
    border: "#1e1e1e", borderSubtle: "#181818",
    accent: "#fafafa", accentText: "#0a0a0a",
    dot: { active: "#4ade80", idle: "#fbbf24", sleeping: "#475569" },
    inputBg: "#1a1a1a", pinBg: "#1a1700", pinBorder: "#3d3400",
    sidebar: { bg: "#0a0a0a", bgHover: "#141414", bgActive: "#1a1a1a", text: "#e5e5e5", textMuted: "#666", textFaint: "#333", border: "#1e1e1e" },
  }
};

// â”€â”€â”€ SHARED ATOMS (reusable across all screens) â”€â”€â”€
// Components: StatusDot (active/idle/sleeping indicator), Avatar (initial-based circle),
//   MemoryTypeIcon (decision/fact/preference/skill icons)
const Dot = ({ status, t, s = 7 }) => <span style={{ width: s, height: s, borderRadius: "50%", background: t.dot[status] || t.dot.sleeping, display: "inline-block", flexShrink: 0 }} />;
const Av = ({ name, s = 32, t, style: sx }) => (
  <div style={{ width: s, height: s, borderRadius: "50%", background: t.surfaceAlt, display: "flex", alignItems: "center", justifyContent: "center", fontSize: s * 0.36, color: t.textMuted, fontWeight: 500, flexShrink: 0, letterSpacing: "-0.02em", ...sx }}>{name?.[0]}</div>
);
const MemI = ({ type, t }) => {
  const p = { size: 13, color: t.textMuted, strokeWidth: 1.5 };
  return ({ decision: <GitBranch {...p} />, fact: <Brain {...p} />, preference: <Heart {...p} />, skill: <Zap {...p} /> })[type] || <Hash {...p} />;
};

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// EXTRACTED COMPONENTS (used within screens)
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

// â”€â”€â”€ CHAT LIST DRAWER (left panel of Chat screen) â”€â”€â”€
// Sub-components: DrawerSearchBar, InstanceGroupedChatList, ChatListItem (hover actions),
//   BatchActionBar (Move/Archive/Delete), RecentlyDeletedSection
function ChatDrawer({ open, onClose, chats, activeChat, onSelect, t, mobile, instances, selectMode, setSelectMode, selected, setSelected, showDeleted, setShowDeleted }) {
  const [q, setQ] = useState("");
  const [hovChat, setHovChat] = useState(null);
  if (!open) return null;
  const filtered = q ? chats.filter(c => c.title.toLowerCase().includes(q.toLowerCase())) : chats;
  const grouped = {};
  filtered.forEach(c => {
    const inst = instances.find(i => i.id === c.instance);
    const key = inst?.name || "General";
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(c);
  });
  const toggleSel = (cid) => setSelected(prev => prev.includes(cid) ? prev.filter(x => x !== cid) : [...prev, cid]);
  return (
    <div style={{
      width: mobile ? "100%" : 280, height: "100%", background: t.surface,
      borderRight: `1px solid ${t.borderSubtle}`, display: "flex", flexDirection: "column",
      flexShrink: 0, ...(mobile ? { position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 40 } : {})
    }}>
      <div style={{ padding: "14px 16px 8px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <span style={{ fontSize: 13, fontWeight: 500, color: t.text }}>Conversations</span>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <button onClick={() => { setSelectMode(!selectMode); setSelected([]); }} title="Select chats" style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
            <Square size={13} color={selectMode ? t.accent : t.textFaint} />
          </button>
          <Plus size={15} color={t.textMuted} style={{ cursor: "pointer" }} />
          {mobile && <X size={15} color={t.textMuted} onClick={onClose} style={{ cursor: "pointer" }} />}
        </div>
      </div>
      {/* Batch actions */}
      {selectMode && selected.length > 0 && (
        <div style={{ padding: "6px 12px", display: "flex", gap: 4, borderBottom: `1px solid ${t.borderSubtle}` }}>
          <span style={{ fontSize: 10, color: t.text, fontWeight: 450, alignSelf: "center", marginRight: 4 }}>{selected.length}</span>
          <button style={{ background: "none", border: `1px solid ${t.border}`, borderRadius: 5, padding: "2px 7px", fontSize: 9, color: t.textMuted, cursor: "pointer", display: "flex", alignItems: "center", gap: 2 }}><ArrowRight size={9} />Move</button>
          <button style={{ background: "none", border: `1px solid ${t.border}`, borderRadius: 5, padding: "2px 7px", fontSize: 9, color: t.textMuted, cursor: "pointer", display: "flex", alignItems: "center", gap: 2 }}><Archive size={9} />Archive</button>
          <button style={{ background: "none", border: `1px solid ${t.border}`, borderRadius: 5, padding: "2px 7px", fontSize: 9, color: "#ef4444", cursor: "pointer", display: "flex", alignItems: "center", gap: 2 }}><Trash2 size={9} />Delete</button>
        </div>
      )}
      <div style={{ padding: "0 12px 8px" }}>
        <div style={{ display: "flex", alignItems: "center", background: t.surfaceAlt, borderRadius: 8, padding: "6px 10px" }}>
          <Search size={12} color={t.textFaint} style={{ marginRight: 6, flexShrink: 0 }} />
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search chats..."
            style={{ border: "none", background: "none", outline: "none", fontSize: 11, color: t.text, fontWeight: 350, width: "100%" }} />
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto" }}>
        {Object.entries(grouped).map(([instName, cs]) => (
          <div key={instName}>
            <div style={{ padding: "10px 16px 4px", fontSize: 10, fontWeight: 500, color: t.textFaint, textTransform: "uppercase", letterSpacing: "0.06em" }}>{instName}</div>
            {cs.map(c => (
              <div key={c.id} onMouseEnter={() => setHovChat(c.id)} onMouseLeave={() => setHovChat(null)}
                onClick={() => selectMode ? toggleSel(c.id) : onSelect(c.id)} style={{
                padding: "9px 16px", cursor: "pointer", display: "flex", alignItems: "flex-start", gap: 8,
                background: activeChat === c.id && !selectMode ? t.surfaceAlt : "transparent",
                borderLeft: activeChat === c.id && !selectMode ? `2px solid ${t.accent}` : "2px solid transparent",
              }}>
                {selectMode && (
                  <div style={{ width: 14, height: 14, borderRadius: 3, border: selected.includes(c.id) ? "none" : `1.5px solid ${t.border}`, background: selected.includes(c.id) ? t.accent : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                    {selected.includes(c.id) && <span style={{ color: t.accentText, fontSize: 9, fontWeight: 700 }}>âœ“</span>}
                  </div>
                )}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
                    <span style={{ fontSize: 12, fontWeight: activeChat === c.id ? 500 : 400, color: t.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 140 }}>{c.title}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 2, flexShrink: 0, marginLeft: 6 }}>
                      {hovChat === c.id && !selectMode && (<>
                        <button onClick={e => { e.stopPropagation(); }} title="Archive" style={{ background: "none", border: "none", color: t.textFaint, cursor: "pointer", display: "flex", padding: 1 }}><Archive size={10} /></button>
                        <button onClick={e => { e.stopPropagation(); }} title="Delete" style={{ background: "none", border: "none", color: t.textFaint, cursor: "pointer", display: "flex", padding: 1 }}><Trash2 size={10} /></button>
                      </>)}
                      <span style={{ fontSize: 10, color: t.textFaint, fontWeight: 300 }}>{c.time}</span>
                    </div>
                  </div>
                  <div style={{ fontSize: 11, color: t.textMuted, fontWeight: 300, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.preview}</div>
                  {c.personas.length > 0 && (
                    <div style={{ display: "flex", gap: 2, marginTop: 4 }}>
                      {PERSONAS.filter(p => c.personas.includes(p.id)).map(p => <Av key={p.id} name={p.name} s={14} t={t} />)}
                    </div>
                  )}
                  {c.tags && c.tags.length > 0 && (
                    <div style={{ display: "flex", gap: 3, marginTop: 4 }}>
                      {c.tags.map(tag => <span key={tag} style={{ fontSize: 9, color: t.textFaint, background: t.surfaceAlt, padding: "1px 5px", borderRadius: 4, fontWeight: 350 }}>#{tag}</span>)}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
        {/* Recently Deleted */}
        <div style={{ borderTop: `1px solid ${t.borderSubtle}`, margin: "8px 0" }} />
        <div style={{ padding: "8px 16px" }}>
          <div onClick={() => setShowDeleted && setShowDeleted(!showDeleted)} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: t.textFaint, fontWeight: 400, cursor: "pointer" }}>
            <Trash2 size={11} />Recently Deleted
            <span style={{ marginLeft: "auto", fontSize: 10, padding: "1px 6px", background: t.surfaceAlt, borderRadius: 8 }}>{DELETED_CHATS.length}</span>
            <ChevronRight size={10} color={t.textFaint} style={{ transform: showDeleted ? "rotate(90deg)" : "none", transition: "transform 0.15s" }} />
          </div>
          {showDeleted && DELETED_CHATS.map(dc => (
            <div key={dc.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 0 7px 17px", marginTop: 4 }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 11, color: t.textMuted, fontWeight: 350, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{dc.title}</div>
                <div style={{ fontSize: 9, color: t.textFaint, fontWeight: 300 }}>Expires {dc.expiresIn}</div>
              </div>
              <button title="Restore" style={{ background: "none", border: "none", color: t.textFaint, cursor: "pointer", display: "flex", padding: 2 }}><RotateCcw size={10} /></button>
              <button title="Delete permanently" style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", display: "flex", padding: 2, opacity: 0.6 }}><Trash2 size={10} /></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// â”€â”€â”€ FILTER BAR (message filtering chips in Chat screen) â”€â”€â”€
// Sub-components: FilterChips (All/Sent/Received/Pinned/Links/Media),
//   InlineSearchBar (expandable search within filtered results), FilterCount
function FilterBar({ filters, setFilters, msgCount, filteredCount, t, searchActive, setSearchActive, filterSearch, setFilterSearch }) {
  const chips = [
    { id: "all", label: "All" },
    { id: "sent", label: "Sent" },
    { id: "received", label: "Received" },
    { id: "pinned", label: "Pinned", icon: <Pin size={10} /> },
    { id: "links", label: "Links", icon: <Link2 size={10} /> },
    { id: "media", label: "Media", icon: <Image size={10} /> },
  ];
  const toggle = (id) => {
    if (id === "all") {
      setFilters({ all: true, sent: false, received: false, pinned: false, links: false, media: false });
      setSearchActive(false); setFilterSearch("");
    } else {
      const nf = { ...filters, [id]: !filters[id], all: false };
      if (!nf.sent && !nf.received && !nf.pinned && !nf.links && !nf.media && !searchActive) nf.all = true;
      setFilters(nf);
    }
  };
  return (
    <div style={{ flexShrink: 0 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 5, flexWrap: "wrap" }}>
        {chips.map(c => {
          const on = c.id === "all" ? filters.all : filters[c.id];
          return (
            <button key={c.id} onClick={() => toggle(c.id)} style={{
              display: "flex", alignItems: "center", gap: 3, padding: "4px 11px", borderRadius: 20,
              fontSize: 11, cursor: "pointer", fontWeight: 400, border: "none",
              background: on ? t.accent : t.surfaceAlt, color: on ? t.accentText : t.textMuted,
              transition: "all 0.15s",
            }}>{c.icon}{c.label}</button>
          );
        })}
        <button onClick={() => { setSearchActive(!searchActive); if (searchActive) setFilterSearch(""); }}
          style={{
            display: "flex", alignItems: "center", gap: 3, padding: "4px 11px", borderRadius: 20,
            fontSize: 11, cursor: "pointer", fontWeight: 400, border: "none",
            background: searchActive ? t.accent : t.surfaceAlt,
            color: searchActive ? t.accentText : t.textMuted,
          }}><Search size={10} />Search</button>
        {!filters.all && <span style={{ fontSize: 10, color: t.textFaint, fontWeight: 300, marginLeft: 4 }}>{filteredCount} of {msgCount}</span>}
      </div>
      {searchActive && (
        <div style={{ marginTop: 8, display: "flex", alignItems: "center", background: t.surfaceAlt, borderRadius: 8, padding: "6px 10px" }}>
          <Search size={12} color={t.textFaint} style={{ marginRight: 6 }} />
          <input value={filterSearch} onChange={e => setFilterSearch(e.target.value)} placeholder="Search in conversation..."
            autoFocus style={{ border: "none", background: "none", outline: "none", fontSize: 11, color: t.text, fontWeight: 350, width: "100%" }} />
          {filterSearch && <X size={12} color={t.textFaint} onClick={() => setFilterSearch("")} style={{ cursor: "pointer" }} />}
        </div>
      )}
    </div>
  );
}

// â”€â”€â”€ PARTICIPANTS BAR (shows who is in the current chat) â”€â”€â”€
// Sub-components: UserAvatar, PersonaChip (removable), AddPersonaButton
function ParticipantsBar({ personas, t, onAdd, onRemove }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, paddingBottom: 10, borderBottom: `1px solid ${t.borderSubtle}`, marginBottom: 10 }}>
      <span style={{ fontSize: 10, color: t.textFaint, fontWeight: 400 }}>In chat</span>
      <Av name="B" s={20} t={t} />
      {personas.map(p => (
        <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 3, padding: "2px 7px 2px 2px", background: t.surfaceAlt, borderRadius: 12 }}>
          <Av name={p.name} s={16} t={t} />
          <span style={{ fontSize: 10, color: t.text, fontWeight: 400 }}>{p.name}</span>
          <X size={9} color={t.textFaint} onClick={() => onRemove(p.id)} style={{ cursor: "pointer" }} />
        </div>
      ))}
      <button onClick={onAdd} style={{ display: "flex", alignItems: "center", gap: 2, background: "none", border: `1px dashed ${t.border}`, borderRadius: 12, padding: "2px 7px", fontSize: 10, color: t.textMuted, cursor: "pointer" }}>
        <UserPlus size={9} />Add
      </button>
    </div>
  );
}

// â”€â”€â”€ PERSONA SELECTOR (@ mention dropdown in composer) â”€â”€â”€
// Sub-components: PersonaDropdown (list with avatars/roles), EveryoneOption
function PersonaSelector({ open, onToggle, selected, onSelect, personas, t }) {
  return (
    <div style={{ position: "relative" }}>
      <button onClick={onToggle} title="Direct to..." style={{
        display: "flex", alignItems: "center", gap: 3, background: selected ? t.surfaceAlt : "none",
        border: selected ? `1px solid ${t.border}` : "none", borderRadius: 8, padding: "3px 7px",
        fontSize: 11, color: selected ? t.text : t.textFaint, cursor: "pointer", fontWeight: 400
      }}>
        <AtSign size={12} />
        {selected ? PERSONAS.find(p => p.id === selected)?.name : ""}
      </button>
      {open && (
        <div style={{ position: "absolute", bottom: "100%", left: 0, marginBottom: 4, background: t.surface, border: `1px solid ${t.border}`, borderRadius: 10, padding: 4, minWidth: 150, boxShadow: "0 4px 16px rgba(0,0,0,0.1)", zIndex: 10 }}>
          <div onClick={() => onSelect(null)} style={{ padding: "5px 10px", borderRadius: 6, cursor: "pointer", fontSize: 11, color: t.textMuted }}>Everyone</div>
          {personas.map(p => (
            <div key={p.id} onClick={() => onSelect(p.id)} style={{ padding: "5px 10px", borderRadius: 6, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, background: selected === p.id ? t.surfaceAlt : "transparent" }}>
              <Av name={p.name} s={18} t={t} />
              <div><div style={{ fontSize: 11, color: t.text, fontWeight: 400 }}>{p.name}</div><div style={{ fontSize: 9, color: t.textFaint }}>{p.role}</div></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// â”€â”€â”€ CHAT NAVIGATOR PANEL (chronological conversation map in right panel) â”€â”€â”€
// Sub-components: NavSearchBar, DateGroup, ExpandableNavItem (label + summary)
function ChatNavPanel({ sections, t, expanded, toggle }) {
  const [q, setQ] = useState("");
  const f = q ? sections.map(s => ({ ...s, items: s.items.filter(i => i.label.toLowerCase().includes(q.toLowerCase()) || i.summary.toLowerCase().includes(q.toLowerCase())) })).filter(s => s.items.length > 0) : sections;
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ padding: "10px 14px 6px", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", background: t.surfaceAlt, borderRadius: 7, padding: "5px 8px" }}>
          <Search size={11} color={t.textFaint} style={{ marginRight: 5 }} />
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search nav..."
            style={{ border: "none", background: "none", outline: "none", fontSize: 10, color: t.text, fontWeight: 350, width: "100%" }} />
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto" }}>
        {f.map((sec, si) => (
          <div key={si}>
            <div style={{ padding: "10px 14px 3px", fontSize: 10, fontWeight: 500, color: t.textFaint, letterSpacing: "0.06em" }}>{sec.date}</div>
            {sec.items.map(item => (
              <div key={item.id}>
                <div onClick={() => toggle(item.id)} style={{ padding: "7px 14px", cursor: "pointer", display: "flex", alignItems: "flex-start", gap: 5 }}>
                  <ChevronRight size={11} color={t.textFaint} style={{ marginTop: 2, flexShrink: 0, transform: expanded[item.id] ? "rotate(90deg)" : "none", transition: "transform 0.15s" }} />
                  <span style={{ fontSize: 11, color: t.textSec, fontWeight: 400, lineHeight: 1.4 }}>{item.label}</span>
                </div>
                {expanded[item.id] && (
                  <div style={{ padding: "0 14px 6px 30px" }}>
                    <div style={{ fontSize: 10, color: t.textMuted, fontWeight: 300, lineHeight: 1.5 }}>{item.summary}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// MAIN APPLICATION
// State: Navigation (screen/chat/inst/persona), UI (sidebar/drawer/panels/modals),
//   Filters, Selections, Browser (view/mode/tabs/nav), Settings
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
export default function App() {
  const [dark, setDark] = useState(false);
  const t = dark ? T.dark : T.light;
  const s = t.sidebar;

  // Navigation
  const [screen, setScreen] = useState("home");
  const [chat, setChat] = useState(1);
  const [inst, setInst] = useState(null);
  const [persona, setPersona] = useState(null);
  const [iTab, setITab] = useState("Overview");
  const [pTab, setPTab] = useState("overview");
  const [mFilt, setMFilt] = useState("all");
  const [rOpen, setROpen] = useState(false);
  const [rPanel, setRPanel] = useState("chatnav");
  const [sQuery, setSQuery] = useState("");
  const [cInput, setCInput] = useState("");
  const [sExp, setSExp] = useState(true);
  const [sHover, setSHover] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);

  // Phase 1 state
  const [chatDrawer, setChatDrawer] = useState(false);
  const [filters, setFilters] = useState({ all: true, sent: false, received: false, pinned: false, links: false, media: false });
  const [searchActive, setSearchActive] = useState(false);
  const [filterSearch, setFilterSearch] = useState("");
  const [messages, setMessages] = useState(INIT_MESSAGES);
  const [hovMsg, setHovMsg] = useState(null);
  const [pSel, setPSel] = useState(null);
  const [pSelOpen, setPSelOpen] = useState(false);
  const [participants, setParticipants] = useState([1, 2]);
  const [cnExp, setCnExp] = useState({});

  // Phase 2 state
  const [fileFilter, setFileFilter] = useState("all"); // all | upload | generated
  const [instMenu, setInstMenu] = useState(false);
  const [wsSection, setWsSection] = useState("all");

  // Phase 3 state
  const [settingsTab, setSettingsTab] = useState("general");
  const [imFilter, setImFilter] = useState("all");
  const [cascadeOpen, setCascadeOpen] = useState({});

  // Phase 4 state
  const [personaMenu, setPersonaMenu] = useState(false);
  const [editingMem, setEditingMem] = useState(null);
  const [createPersona, setCreatePersona] = useState(false);
  const [createStep, setCreateStep] = useState(0);

  // Phase 5 state
  const [searchFilter, setSearchFilter] = useState("all");
  const [showHistory, setShowHistory] = useState(true);
  const [cmdPalette, setCmdPalette] = useState(false);
  const [showRename, setShowRename] = useState(true);
  const [showExport, setShowExport] = useState(false);
  const [showDeleted, setShowDeleted] = useState(false);

  // Phase 6+7 state
  const [powerUser, setPowerUser] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [obStep, setObStep] = useState(0);
  const [notiOpen, setNotiOpen] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);

  // Phase 8 state (completions)
  const [activeModel, setActiveModel] = useState("m2");
  const [modelSelOpen, setModelSelOpen] = useState(false);
  const [forumInput, setForumInput] = useState("");
  const [chatSelectMode, setChatSelectMode] = useState(false);
  const [chatSelected, setChatSelected] = useState([]);
  const [fileSelectMode, setFileSelectMode] = useState(false);
  const [fileSelected, setFileSelected] = useState([]);
  const [memSelectMode, setMemSelectMode] = useState(false);
  const [memSelected, setMemSelected] = useState([]);
  const [showMoveSuggest, setShowMoveSuggest] = useState(true);
  const [notiPage, setNotiPage] = useState(false);
  const [fileSearchQ, setFileSearchQ] = useState("");
  const [teamsFilter, setTeamsFilter] = useState("all");
  const [insightsTab, setInsightsTab] = useState("overview");
  const [browserView, setBrowserView] = useState("sidebar"); // float, icon, sidebar, split, chatonly
  const [browserViewMenu, setBrowserViewMenu] = useState(false);
  const [browserViewMenu2, setBrowserViewMenu2] = useState(false);
  const [browserUrl, setBrowserUrl] = useState("https://apex-corp.com/services");
  const [browserNavVisible, setBrowserNavVisible] = useState(true);
  const [browserNavMinimized, setBrowserNavMinimized] = useState(false);
  const [browserChatInput, setBrowserChatInput] = useState("");
  const [browserMode, setBrowserMode] = useState("sessions"); // browse, sessions, history, extracts
  const [browserPersona, setBrowserPersona] = useState(1); // Sally by default
  const [browserPageAware, setBrowserPageAware] = useState(true);
  const [browserTabListPopup, setBrowserTabListPopup] = useState(false);
  const [activeBrowserTab, setActiveBrowserTab] = useState(0);
  const browserTabs = [
    { id: 0, title: "Apex Corp â€” Services", url: "https://apex-corp.com/services", favicon: "A", color: "#e94560" },
    { id: 1, title: "Apex Corp â€” Pricing", url: "https://apex-corp.com/pricing", favicon: "A", color: "#e94560" },
    { id: 2, title: "Figma â€” Hero Mockup", url: "https://figma.com/file/Kj9x...", favicon: "F", color: "#a259ff" },
    { id: 3, title: "MDN â€” CSS Grid Layout", url: "https://developer.mozilla.org/CSS/Grid", favicon: "M", color: "#1a73e8" },
    { id: 4, title: "Stripe Docs â€” Payments", url: "https://stripe.com/docs/payments", favicon: "S", color: "#635bff" },
  ];

  useEffect(() => { const c = () => setMobile(window.innerWidth < 768); c(); window.addEventListener("resize", c); return () => window.removeEventListener("resize", c); }, []);

  const go = (sc, o = {}) => {
    setScreen(sc);
    if (o.inst !== undefined) setInst(o.inst);
    if (o.persona !== undefined) { setPersona(o.persona); setPTab("overview"); setMFilt("all"); }
    if (o.chat !== undefined) setChat(o.chat);
    if (o.tab !== undefined) setITab(o.tab);
    if (sc === "spaces" && o.inst === undefined) setInst(null);
    if (sc === "people" && o.persona === undefined) setPersona(null);
    if (sc === "chat") { if (mobile) { setChatDrawer(false); } }
    setMobileNav(false);
  };

  const sideW = mobile ? 0 : sHover || sExp ? 200 : 56;
  const showLabel = sHover || sExp;

  const navItems = [
    { id: "home", icon: <Home size={18} />, label: "Dashboard" },
    { id: "chat", icon: <MessageSquare size={18} />, label: "Chat" },
    { id: "search", icon: <Search size={18} />, label: "Search" },
    { id: "spaces", icon: <LayoutGrid size={18} />, label: "Spaces" },
    { id: "files", icon: <Folder size={18} />, label: "Files" },
    { id: "people", icon: <Users size={18} />, label: "People" },
  ];
  const futureItems = [
    { id: "teams", icon: <Bot size={18} />, label: "Teams", tier: "Pro" },
    { id: "browser", icon: <Globe size={18} />, label: "Browser", tier: "Pro" },
    { id: "insights", icon: <BarChart3 size={18} />, label: "Insights", tier: null },
  ];

  // Filter logic (union)
  const filteredMsgs = (() => {
    let m = messages;
    if (!filters.all) {
      m = m.filter(msg => {
        const checks = [];
        if (filters.sent) checks.push(msg.sender === "You");
        if (filters.received) checks.push(msg.sender !== "You");
        if (filters.pinned) checks.push(msg.pinned);
        if (filters.links) checks.push(msg.hasLink);
        if (filters.media) checks.push(msg.hasMedia);
        return checks.length === 0 || checks.some(Boolean);
      });
    }
    if (filterSearch.trim()) {
      const q = filterSearch.toLowerCase();
      m = m.filter(msg => msg.text.toLowerCase().includes(q));
    }
    return m;
  })();

  const togglePin = id => setMessages(p => p.map(m => m.id === id ? { ...m, pinned: !m.pinned } : m));
  const toggleCn = id => setCnExp(p => ({ ...p, [id]: !p[id] }));
  const chatPersonas = PERSONAS.filter(p => participants.includes(p.id));

  // Breadcrumbs
  const crumbs = (() => {
    switch (screen) {
      case "home": return [{ label: "Dashboard" }];
      case "chat": {
        const c = CHATS.find(x => x.id === chat);
        const ci = c ? INSTANCES.find(x => x.id === c.instance) : null;
        return [{ label: "Chat", onClick: () => go("chat") }, ci && { label: ci.name }, c && { label: c.title }].filter(Boolean);
      }
      case "search": return [{ label: "Search" }];
      case "files": return [{ label: "Files" }];
      case "teams": return [{ label: "Teams" }];
      case "browser": {
        if (browserMode === "browse") {
          const domain = browserUrl.replace(/^https?:\/\//, "").split("/")[0];
          return [{ label: "Browser", onClick: () => setBrowserMode("sessions") }, { label: domain }];
        }
        return [{ label: "Browser" }];
      }
      case "insights": return [{ label: "Insights" }];
      case "spaces":
        if (inst) { const i = INSTANCES.find(x => x.id === inst); return [{ label: "Spaces", onClick: () => go("spaces") }, { label: i?.name }, iTab !== "Overview" && { label: iTab }].filter(Boolean); }
        return [{ label: "Spaces" }];
      case "people":
        if (persona) { const p = PERSONAS.find(x => x.id === persona); return [{ label: "People", onClick: () => go("people") }, { label: p?.name }]; }
        return [{ label: "People" }];
      case "settings": {
        const tabLabel = { general: "General", models: "Models", keys: "API Keys", types: "Types", hierarchy: "Cascade", learned: "Learned Rules" }[settingsTab];
        return [{ label: "Settings", onClick: () => setSettingsTab("general") }, settingsTab !== "general" && { label: tabLabel }].filter(Boolean);
      }
      default: return [];
    }
  })();

  const px = mobile ? 20 : 48;
  const py = mobile ? 24 : 40;

  // â”€â”€â”€ SCREEN ROUTER â”€â”€â”€
  // Renders the active screen based on `screen` state.
  // Screens: home, chat, search, spaces, files, people, teams, browser, insights, settings
  const renderMain = () => {

    // â”€â”€â”€ HOME / DASHBOARD SCREEN â”€â”€â”€
    // Components: DashboardGreeting, QuickActions, RecentActivityFeed
    if (screen === "home") return (
      <div style={{ padding: `${py}px ${px}px`, overflowY: "auto", height: "100%", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 28, fontWeight: 300, color: t.text, letterSpacing: "-0.03em" }}>Welcome back, <span style={{ fontWeight: 600 }}>Bob</span></div>
          <div style={{ fontSize: 14, color: t.textMuted, marginTop: 8, fontWeight: 300 }}>Here's your workspace at a glance.</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr 1fr" : "1fr 1fr 1fr 1fr", gap: 24, marginBottom: 56 }}>
          {[
            { v: INSTANCES.length, l: "Instances", icon: <LayoutGrid size={16} /> },
            { v: PERSONAS.length, l: "Personas", icon: <Users size={16} /> },
            { v: INSTANCES.reduce((a, i) => a + i.chats, 0), l: "Chats", icon: <MessageSquare size={16} /> },
            { v: INSTANCES.reduce((a, i) => a + i.tasks, 0), l: "Tasks", icon: <Hash size={16} /> },
          ].map((x, i) => (
            <div key={i}>
              <div style={{ color: t.textFaint, marginBottom: 12 }}>{x.icon}</div>
              <div style={{ fontSize: 36, fontWeight: 200, color: t.text, letterSpacing: "-0.04em", lineHeight: 1 }}>{x.v}</div>
              <div style={{ fontSize: 12, color: t.textMuted, marginTop: 6, fontWeight: 400, letterSpacing: "0.02em" }}>{x.l}</div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 11, fontWeight: 500, color: t.textMuted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 20 }}>Recent</div>
        {[
          { text: "Sally updated hero section mockup", sub: "Client Website Redesign", time: "2 min ago" },
          { text: "Sam reviewed headline copy", sub: "Client Website Redesign", time: "15 min ago" },
          { text: "Nora completed competitor analysis", sub: "Q1 Marketing Strategy", time: "1 hr ago" },
          { text: "Dev pushed component library update", sub: "App Development", time: "3 hrs ago" },
        ].map((a, i) => (
          <div key={i} style={{ padding: "16px 0", borderBottom: `1px solid ${t.borderSubtle}`, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <div>
              <div style={{ fontSize: 14, color: t.text, fontWeight: 400 }}>{a.text}</div>
              <div style={{ fontSize: 12, color: t.textMuted, marginTop: 3, fontWeight: 300 }}>{a.sub}</div>
            </div>
            <span style={{ fontSize: 11, color: t.textFaint, flexShrink: 0, marginLeft: 20, fontWeight: 300 }}>{a.time}</span>
          </div>
        ))}
      </div>
    );

    // â”€â”€â”€ CHAT SCREEN â”€â”€â”€
    // Components: ChatDrawer (left panel), ChatFilterBar, MessageList, MessageComposer,
    //   ModelSelector, PersonaSelector, ParticipantsBar, ChatNavigator (right panel),
    //   DraftIndicator, SuggestedMoveBanner, RecentlyDeletedSection, ChatMultiSelect
    if (screen === "chat") return (
      <div style={{ display: "flex", height: "100%", width: "100%" }}>
        {!mobile && <ChatDrawer open={chatDrawer} chats={CHATS} activeChat={chat} onSelect={id => { setChat(id); setFilters({ all: true, sent: false, received: false, pinned: false, links: false, media: false }); setSearchActive(false); setFilterSearch(""); }} t={t} mobile={false} instances={INSTANCES} selectMode={chatSelectMode} setSelectMode={setChatSelectMode} selected={chatSelected} setSelected={setChatSelected} showDeleted={showDeleted} setShowDeleted={setShowDeleted} />}
        {mobile && <ChatDrawer open={chatDrawer} onClose={() => setChatDrawer(false)} chats={CHATS} activeChat={chat} onSelect={id => { setChat(id); setChatDrawer(false); }} t={t} mobile={true} instances={INSTANCES} selectMode={chatSelectMode} setSelectMode={setChatSelectMode} selected={chatSelected} setSelected={setChatSelected} showDeleted={showDeleted} setShowDeleted={setShowDeleted} />}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
          <div style={{ flex: 1, overflowY: "auto", padding: `12px ${px}px` }}>
            {/* Auto-rename suggestion */}
            {showRename && (
              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", background: t.surfaceAlt, borderRadius: 8, marginBottom: 16 }}>
                <Sparkles size={13} color={t.textMuted} />
                <span style={{ flex: 1, fontSize: 12, color: t.textSec, fontWeight: 350 }}>Rename to <strong style={{ fontWeight: 500 }}>"Hero Layout: Asymmetric Decision"</strong>?</span>
                <button onClick={() => setShowRename(false)} style={{ background: t.accent, color: t.accentText, border: "none", borderRadius: 6, padding: "3px 10px", fontSize: 11, cursor: "pointer", fontWeight: 450 }}>Apply</button>
                <button onClick={() => setShowRename(false)} style={{ background: "none", border: "none", color: t.textFaint, cursor: "pointer", display: "flex", padding: 2 }}><X size={12} /></button>
              </div>
            )}
            {/* Suggested move banner */}
            {showMoveSuggest && (
              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", background: t.surfaceAlt, borderRadius: 8, marginBottom: 16, border: `1px solid ${t.borderSubtle}` }}>
                <ArrowRight size={13} color={t.textMuted} />
                <span style={{ flex: 1, fontSize: 12, color: t.textSec, fontWeight: 350 }}>This looks like it belongs in <strong style={{ fontWeight: 500 }}>Client Website Redesign</strong></span>
                <button onClick={() => setShowMoveSuggest(false)} style={{ background: t.accent, color: t.accentText, border: "none", borderRadius: 6, padding: "3px 10px", fontSize: 11, cursor: "pointer", fontWeight: 450 }}>Move</button>
                <button onClick={() => setShowMoveSuggest(false)} style={{ background: "none", border: `1px solid ${t.border}`, borderRadius: 6, padding: "3px 10px", fontSize: 11, cursor: "pointer", color: t.textMuted }}>Choose</button>
                <button onClick={() => setShowMoveSuggest(false)} style={{ background: "none", border: "none", color: t.textFaint, cursor: "pointer", display: "flex", padding: 2 }}><X size={12} /></button>
              </div>
            )}
            {filteredMsgs.map((msg, i) => {
              const isUser = msg.sender === "You";
              const hov = hovMsg === msg.id;
              const per = msg.persona ? PERSONAS.find(p => p.id === msg.persona) : null;
              const isLast = i === filteredMsgs.length - 1 && !isUser;
              return (
                <div key={msg.id} onMouseEnter={() => setHovMsg(msg.id)} onMouseLeave={() => setHovMsg(null)}
                  style={{
                    marginBottom: 22, position: "relative",
                    ...(msg.pinned ? { background: t.pinBg, margin: "0 -10px 22px", padding: "10px", borderRadius: 8, borderLeft: `2px solid ${t.pinBorder}` } : {})
                  }}>
                  {/* Cipher routing note */}
                  {msg.id === 2 && <div style={{ paddingLeft: 34, marginBottom: 4, display: "flex", alignItems: "center", gap: 5 }}><Zap size={9} color={t.textFaint} /><span style={{ fontSize: 10, color: t.textFaint, fontWeight: 300, fontStyle: "italic" }}>Routed to Sally (Web Design)</span></div>}
                  {msg.id === 7 && <div style={{ paddingLeft: 34, marginBottom: 4, display: "flex", alignItems: "center", gap: 5 }}><Zap size={9} color={t.textFaint} /><span style={{ fontSize: 10, color: t.textFaint, fontWeight: 300, fontStyle: "italic" }}>Routed to Sam (Business Analyst)</span></div>}
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <Av name={isUser ? "B" : msg.sender} s={26} t={t} style={per ? { border: `1.5px solid ${t.dot[per.status]}` } : {}} />
                    <span style={{ fontSize: 12, fontWeight: 500, color: t.text }}>{msg.sender}</span>
                    {per && <span style={{ fontSize: 10, color: t.textFaint, fontWeight: 300 }}>{per.role}</span>}
                    <span style={{ fontSize: 10, color: t.textFaint, fontWeight: 300 }}>{msg.time}</span>
                    {msg.pinned && <Pin size={9} color={t.textMuted} />}
                    {hov && (
                      <div style={{ marginLeft: "auto", display: "flex", gap: 1 }}>
                        {[
                          { icon: <Pin size={11} />, tip: "Pin", fn: () => togglePin(msg.id) },
                          { icon: <Copy size={11} />, tip: "Copy" },
                          { icon: <GitFork size={11} />, tip: "Fork" },
                          { icon: <MoreHorizontal size={11} />, tip: "More" },
                        ].map((a, j) => (
                          <button key={j} onClick={a.fn} title={a.tip}
                            style={{ background: t.surfaceAlt, border: "none", borderRadius: 4, padding: 3, cursor: "pointer", color: t.textMuted, display: "flex" }}>{a.icon}</button>
                        ))}
                      </div>
                    )}
                  </div>
                  <div style={{ fontSize: 14, lineHeight: 1.7, color: t.textSec, paddingLeft: 34, fontWeight: 350 }}>{msg.text}</div>
                  {/* Memory extraction indicator */}
                  {msg.id === 3 && <div style={{ paddingLeft: 34, marginTop: 4, display: "flex", alignItems: "center", gap: 4 }}><Brain size={9} color={t.textFaint} /><span style={{ fontSize: 10, color: t.textFaint, fontWeight: 300 }}>1 memory saved</span></div>}
                  {/* Fluid UI: inline interactive component */}
                  {msg.id === 4 && (
                    <div style={{ paddingLeft: 34, marginTop: 10 }}>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, maxWidth: 380 }}>
                        {[{ title: "Navigation", time: "~2 hrs", status: "Ready" }, { title: "Breakpoints", time: "~1 hr", status: "Pending" }].map((card, ci) => (
                          <div key={ci} style={{ padding: "10px 12px", background: t.surfaceAlt, borderRadius: 8, border: `1px solid ${t.borderSubtle}` }}>
                            <div style={{ fontSize: 12, fontWeight: 450, color: t.text, marginBottom: 3 }}>{card.title}</div>
                            <div style={{ fontSize: 11, color: t.textMuted, fontWeight: 300 }}>Est: {card.time}</div>
                            <div style={{ fontSize: 10, color: card.status === "Ready" ? t.dot.active : t.dot.idle, fontWeight: 400, marginTop: 4 }}>{card.status}</div>
                          </div>
                        ))}
                      </div>
                      <div style={{ fontSize: 9, color: t.textFaint, fontWeight: 300, marginTop: 4, fontStyle: "italic" }}>Interactive component</div>
                    </div>
                  )}
                  {isLast && (
                    <div style={{ paddingLeft: 34, marginTop: 6, display: "flex", gap: 5 }}>
                      <button style={{ display: "flex", alignItems: "center", gap: 3, background: "none", border: `1px solid ${t.border}`, borderRadius: 6, padding: "3px 9px", fontSize: 10, color: t.textMuted, cursor: "pointer" }}>
                        <RefreshCw size={10} />Regenerate
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
            {filteredMsgs.length === 0 && <div style={{ padding: 48, textAlign: "center", color: t.textFaint, fontSize: 12, fontWeight: 300 }}>No messages match this filter.</div>}
          </div>
          <div style={{ padding: `10px ${px}px 18px`, flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center", background: t.inputBg, borderRadius: 12, padding: "9px 12px", border: `1px solid ${t.border}` }}>
              <PersonaSelector open={pSelOpen} onToggle={() => setPSelOpen(!pSelOpen)} selected={pSel}
                onSelect={id => { setPSel(id); setPSelOpen(false); }} personas={chatPersonas} t={t} />
              {/* Model switcher */}
              <div style={{ position: "relative", marginLeft: 4 }}>
                <button onClick={() => setModelSelOpen(!modelSelOpen)} title="Switch model" style={{ display: "flex", alignItems: "center", gap: 3, background: "none", border: `1px solid ${t.borderSubtle}`, borderRadius: 6, padding: "2px 7px", fontSize: 10, color: t.textMuted, cursor: "pointer", fontWeight: 400, whiteSpace: "nowrap" }}>
                  <Cpu size={10} />{MODELS_LIST.find(m => m.id === activeModel)?.name || "Model"}
                  <ChevronDown size={9} />
                </button>
                {modelSelOpen && (
                  <div style={{ position: "absolute", bottom: "100%", left: 0, marginBottom: 4, background: t.surface, border: `1px solid ${t.border}`, borderRadius: 10, padding: 4, minWidth: 180, boxShadow: "0 4px 16px rgba(0,0,0,0.12)", zIndex: 10 }}>
                    <div style={{ padding: "4px 8px 6px", fontSize: 10, color: t.textFaint, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>Switch Model</div>
                    {MODELS_LIST.map(m => (
                      <div key={m.id} onClick={() => { setActiveModel(m.id); setModelSelOpen(false); }} style={{ padding: "6px 10px", borderRadius: 6, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", background: activeModel === m.id ? t.surfaceAlt : "transparent" }}>
                        <div><div style={{ fontSize: 11, color: t.text, fontWeight: 400 }}>{m.name}</div><div style={{ fontSize: 9, color: t.textFaint }}>{m.provider}</div></div>
                        <span style={{ fontSize: 9, color: t.textMuted, background: t.surfaceAlt, padding: "1px 5px", borderRadius: 4 }}>{m.tag}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <input value={cInput} onChange={e => setCInput(e.target.value)}
                placeholder={pSel ? `Message ${PERSONAS.find(p => p.id === pSel)?.name}...` : "Message everyone..."}
                style={{ flex: 1, border: "none", background: "none", outline: "none", fontSize: 13, color: t.text, fontWeight: 350, marginLeft: 6 }} />
              <div style={{ display: "flex", gap: 10, marginLeft: 10, flexShrink: 0 }}>
                <Mic size={15} color={t.textFaint} style={{ cursor: "pointer" }} />
                <Paperclip size={15} color={t.textFaint} style={{ cursor: "pointer" }} />
                <ArrowUp size={15} color={t.textMuted} style={{ cursor: "pointer" }} />
              </div>
            </div>
            {cInput.length > 0 && <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "2px 14px 0", opacity: 0.5 }}>
              <div style={{ width: 4, height: 4, borderRadius: "50%", background: t.dot.active }} />
              <span style={{ fontSize: 9, color: t.textFaint, fontWeight: 300 }}>Draft saved</span>
            </div>}
          </div>
        </div>
      </div>
    );

    // â”€â”€â”€ SEARCH SCREEN â”€â”€â”€
    // Components: SearchInput, SearchFilterChips (All/Web/Chats/Files/Memory/Internal),
    //   SearchResultList, SearchResultActions (ChatWith/SendToInstance/Save),
    //   SearchHistory, SavedSearches
    if (screen === "search") {
      const sFilters = [
        { id: "all", l: "All" },
        { id: "web", l: "Web", icon: <Globe size={10} /> },
        { id: "internal", l: "Internal", icon: <LayoutGrid size={10} /> },
        { id: "memory", l: "Memory", icon: <Brain size={10} /> },
        { id: "chat", l: "Chats", icon: <MessageSquare size={10} /> },
        { id: "file", l: "Files", icon: <Folder size={10} /> },
      ];
      const filtResults = searchFilter === "all" ? EXTENDED_SEARCH : EXTENDED_SEARCH.filter(r => r.type === searchFilter);
      const typeIcon = (type) => ({ web: <Globe size={12} color={t.textFaint} />, internal: <LayoutGrid size={12} color={t.textFaint} />, memory: <Brain size={12} color={t.textFaint} />, chat: <MessageSquare size={12} color={t.textFaint} />, file: <Folder size={12} color={t.textFaint} /> })[type] || null;
      return (
        <div style={{ padding: `${py}px ${px}px`, overflowY: "auto", height: "100%", maxWidth: 700, margin: "0 auto" }}>
          {/* Search input */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", background: t.inputBg, borderRadius: 12, padding: "14px 18px", border: `1px solid ${t.border}` }}>
              <Search size={16} color={t.textMuted} style={{ marginRight: 12 }} />
              <input value={sQuery} onChange={e => { setSQuery(e.target.value); setShowHistory(!e.target.value); }}
                placeholder="Search everything..."
                style={{ flex: 1, border: "none", background: "none", outline: "none", fontSize: 15, color: t.text, fontWeight: 350 }} />
              <span style={{ fontSize: 11, color: t.textFaint, fontWeight: 300 }}><Command size={11} style={{ display: "inline", verticalAlign: "middle" }} /> K</span>
            </div>
          </div>

          {/* Scope indicator */}
          {inst && (
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12, padding: "5px 10px", background: t.surfaceAlt, borderRadius: 8, width: "fit-content" }}>
              <LayoutGrid size={11} color={t.textMuted} />
              <span style={{ fontSize: 11, color: t.textSec, fontWeight: 400 }}>Scoped to: {INSTANCES.find(i => i.id === inst)?.name}</span>
              <X size={10} color={t.textFaint} onClick={() => setInst(null)} style={{ cursor: "pointer" }} />
            </div>
          )}

          {/* Filter chips */}
          <div style={{ display: "flex", gap: 5, marginBottom: 24, flexWrap: "wrap" }}>
            {sFilters.map(f => (
              <button key={f.id} onClick={() => setSearchFilter(f.id)} style={{
                display: "flex", alignItems: "center", gap: 3, padding: "4px 11px", borderRadius: 20,
                fontSize: 11, cursor: "pointer", fontWeight: 400, border: "none",
                background: searchFilter === f.id ? t.accent : t.surfaceAlt,
                color: searchFilter === f.id ? t.accentText : t.textMuted,
              }}>{f.icon}{f.l}</button>
            ))}
          </div>

          {/* Search history (when no query) */}
          {showHistory && !sQuery && (<>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 11, fontWeight: 500, color: t.textMuted, textTransform: "uppercase", letterSpacing: "0.1em" }}>Recent Searches</div>
            </div>
            {SEARCH_HISTORY.map(h => (
              <div key={h.id} onClick={() => { setSQuery(h.query); setShowHistory(false); }}
                style={{ padding: "10px 0", borderBottom: `1px solid ${t.borderSubtle}`, display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
                <History size={13} color={t.textFaint} />
                <span style={{ flex: 1, fontSize: 13, color: t.text, fontWeight: 350 }}>{h.query}</span>
                <span style={{ fontSize: 10, color: t.textFaint, fontWeight: 300 }}>{h.time}</span>
                <button onClick={e => { e.stopPropagation(); }} title={h.saved ? "Saved" : "Save"} style={{ background: "none", border: "none", color: h.saved ? t.accent : t.textFaint, cursor: "pointer", display: "flex", padding: 2 }}>
                  <Bookmark size={12} fill={h.saved ? "currentColor" : "none"} />
                </button>
              </div>
            ))}
            <div style={{ fontSize: 11, fontWeight: 500, color: t.textMuted, textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 28, marginBottom: 12 }}>Saved Searches</div>
            {SEARCH_HISTORY.filter(h => h.saved).map(h => (
              <div key={h.id} onClick={() => { setSQuery(h.query); setShowHistory(false); }}
                style={{ padding: "10px 0", borderBottom: `1px solid ${t.borderSubtle}`, display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
                <Bookmark size={13} color={t.accent} fill={t.accent} />
                <span style={{ flex: 1, fontSize: 13, color: t.text, fontWeight: 350 }}>{h.query}</span>
              </div>
            ))}
          </>)}

          {/* Search results */}
          {(sQuery || !showHistory) && filtResults.map(r => (
            <div key={r.id} style={{ marginBottom: 28 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                {typeIcon(r.type)}
                <div style={{ fontSize: 16, fontWeight: 500, color: t.text }}>{r.title}</div>
              </div>
              <div style={{ fontSize: 12, color: t.textFaint, marginBottom: 8, fontWeight: 300 }}>{r.url}</div>
              <div style={{ fontSize: 14, color: t.textSec, lineHeight: 1.6, fontWeight: 350 }}>{r.snippet}</div>
              <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                {["Chat with this", "Send to Instance", "Save"].map((a, i) => (
                  <button key={i} style={{ background: "none", border: `1px solid ${t.border}`, borderRadius: 8, padding: "5px 12px", fontSize: 11, color: t.textSec, cursor: "pointer", fontWeight: 400 }}>{a}</button>
                ))}
              </div>
            </div>
          ))}
          {sQuery && filtResults.length === 0 && <div style={{ padding: 48, textAlign: "center", color: t.textFaint, fontSize: 12, fontWeight: 300 }}>No results match "{sQuery}" in this filter.</div>}
        </div>
      );
    }

    // â”€â”€â”€ SPACES / INSTANCES SCREEN â”€â”€â”€
    // Components: InstanceList, InstanceCard, InstanceDetail,
    //   InstanceTabs (Overview/Tasks/Workspace/Chats/Files/Settings),
    //   InstanceOverview (ForumChat, PersonaRoster, TasksSummary, ActivityLog),
    //   TaskBoard, WorkspaceView, InstanceChatList, InstanceFileBrowser,
    //   InstanceSettings (SettingsCascade, ModelRoles, StorageConfig)
    if (screen === "spaces") {
      if (inst) {
        const ins = INSTANCES.find(i => i.id === inst);
        const tabs = ["Overview", "Tasks", "Workspace", "Chats", "Files", "Settings"];
        const instFiles = FILES[inst] || [];
        const filtFiles = fileFilter === "all" ? instFiles : instFiles.filter(f => f.origin === fileFilter);
        const fileIcon = (type) => ({ pdf: <FileText size={14} />, image: <Image size={14} />, doc: <FileText size={14} />, code: <FileCode size={14} /> })[type] || <FileText size={14} />;
        const visIcon = (v) => ({ visible: <Eye size={11} />, instance: <LayoutGrid size={11} />, hidden: <EyeOff size={11} /> })[v] || <Eye size={11} />;
        const wsSections = [...new Set(WORKSPACE_ITEMS.map(w => w.section))];
        const filtWs = wsSection === "all" ? WORKSPACE_ITEMS : WORKSPACE_ITEMS.filter(w => w.section === wsSection);
        return (
          <div style={{ display: "flex", flexDirection: "column", height: "100%", maxWidth: 900, margin: "0 auto", width: "100%" }}>
            <div style={{ padding: `${py}px ${px}px 0`, flexShrink: 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ fontSize: 24, fontWeight: 300, color: t.text, letterSpacing: "-0.02em" }}>{ins.name}</div>
                  <div style={{ fontSize: 13, color: t.textMuted, marginTop: 4, fontWeight: 300 }}>{ins.type} Â· {ins.chats} chats Â· {ins.files} files</div>
                </div>
                <div style={{ position: "relative" }}>
                  <button onClick={() => setInstMenu(!instMenu)} style={{ background: "none", border: `1px solid ${t.border}`, borderRadius: 8, padding: "6px 8px", cursor: "pointer", color: t.textMuted, display: "flex" }}>
                    <MoreHorizontal size={16} />
                  </button>
                  {instMenu && (
                    <div style={{ position: "absolute", right: 0, top: "100%", marginTop: 4, background: t.surface, border: `1px solid ${t.border}`, borderRadius: 10, padding: 4, minWidth: 160, boxShadow: "0 4px 16px rgba(0,0,0,0.1)", zIndex: 10 }}>
                      {[
                        { icon: <Edit3 size={12} />, label: "Rename" },
                        { icon: <Layers size={12} />, label: "Change Type" },
                        { icon: <Download size={12} />, label: "Export" },
                        { icon: <Archive size={12} />, label: "Archive" },
                        { icon: <Trash2 size={12} />, label: "Delete", danger: true },
                      ].map((a, i) => (
                        <div key={i} onClick={() => setInstMenu(false)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 10px", borderRadius: 6, cursor: "pointer", fontSize: 12, color: a.danger ? "#ef4444" : t.text, fontWeight: 400 }}>
                          <span style={{ color: a.danger ? "#ef4444" : t.textMuted }}>{a.icon}</span>{a.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div style={{ display: "flex", gap: mobile ? 16 : 24, marginTop: 28, borderBottom: `1px solid ${t.borderSubtle}`, overflowX: "auto" }}>
                {tabs.map(tab => (
                  <button key={tab} onClick={() => setITab(tab)} style={{
                    padding: "0 0 12px", fontSize: 13, fontWeight: iTab === tab ? 500 : 350,
                    color: iTab === tab ? t.text : t.textMuted, background: "none", border: "none",
                    borderBottom: iTab === tab ? `1.5px solid ${t.accent}` : "1.5px solid transparent", cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0
                  }}>{tab}</button>
                ))}
              </div>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: `24px ${px}px ${py}px` }}>

              {/* OVERVIEW */}
              {iTab === "Overview" && (<>
                {/* OPEN FORUM â€” persistent shared chat */}
                <div style={{ marginBottom: 28 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <Hash size={14} color={t.textMuted} />
                      <span style={{ fontSize: 14, color: t.text, fontWeight: 450 }}>Open Forum</span>
                      <span style={{ fontSize: 10, color: t.textFaint, fontWeight: 300, padding: "1px 7px", background: t.surfaceAlt, borderRadius: 8 }}>Persistent</span>
                    </div>
                    <button onClick={() => go("chat", { chat: 1 })} style={{ background: "none", border: `1px solid ${t.border}`, borderRadius: 6, padding: "3px 10px", fontSize: 10, color: t.textMuted, cursor: "pointer", display: "flex", alignItems: "center", gap: 3 }}><ExternalLink size={9} />Expand</button>
                  </div>
                  <div style={{ border: `1px solid ${t.borderSubtle}`, borderRadius: 12, overflow: "hidden" }}>
                    <div style={{ maxHeight: 240, overflowY: "auto", padding: "12px 14px" }}>
                      {FORUM_MESSAGES.map(fm => {
                        const isFUser = fm.sender === "You";
                        const fPer = fm.persona ? PERSONAS.find(p => p.id === fm.persona) : null;
                        return (
                          <div key={fm.id} style={{ marginBottom: 14, display: "flex", gap: 8 }}>
                            {isFUser ? <Av name="B" s={22} t={t} /> : <Av name={fPer?.name} s={22} t={t} />}
                            <div style={{ flex: 1 }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                                <span style={{ fontSize: 11, fontWeight: 500, color: t.text }}>{fm.sender}</span>
                                <span style={{ fontSize: 9, color: t.textFaint, fontWeight: 300 }}>{fm.time}</span>
                              </div>
                              <div style={{ fontSize: 12, color: t.textSec, fontWeight: 350, lineHeight: 1.5 }}>{fm.text}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div style={{ borderTop: `1px solid ${t.borderSubtle}`, padding: "8px 12px", display: "flex", alignItems: "center", gap: 8, background: t.surfaceAlt }}>
                      <input value={forumInput} onChange={e => setForumInput(e.target.value)} placeholder="Message the forum..." style={{ flex: 1, border: "none", background: "none", outline: "none", fontSize: 12, color: t.text, fontWeight: 350 }} />
                      <Paperclip size={13} color={t.textFaint} style={{ cursor: "pointer" }} />
                      <ArrowUp size={13} color={t.textMuted} style={{ cursor: "pointer" }} />
                    </div>
                  </div>
                </div>
                {ins.personas.length > 0 && (<>
                  <div style={{ fontSize: 11, fontWeight: 500, color: t.textMuted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>Personas</div>
                  <div style={{ display: "flex", gap: 10, marginBottom: 28, flexWrap: "wrap" }}>
                    {PERSONAS.filter(p => ins.personas.includes(p.id)).map(p => (
                      <div key={p.id} onClick={() => go("people", { persona: p.id })} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 12px 6px 6px", background: t.surfaceAlt, borderRadius: 10, cursor: "pointer" }}>
                        <Av name={p.name} s={22} t={t} /><span style={{ fontSize: 12, color: t.text, fontWeight: 400 }}>{p.name}</span><Dot status={p.status} t={t} s={5} />
                      </div>
                    ))}
                    <button style={{ display: "flex", alignItems: "center", gap: 3, padding: "6px 12px", background: "none", border: `1px dashed ${t.border}`, borderRadius: 10, fontSize: 12, color: t.textMuted, cursor: "pointer" }}><UserPlus size={11} />Add</button>
                  </div>
                </>)}
                <div style={{ fontSize: 11, fontWeight: 500, color: t.textMuted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>Activity</div>
                {[{ text: "Sally updated hero mockup", time: "2 min ago" }, { text: "Sam reviewed copy", time: "15 min ago" }, { text: "brand-guidelines.pdf uploaded", time: "1 hr ago" }].map((a, i) => (
                  <div key={i} style={{ padding: "12px 0", borderBottom: `1px solid ${t.borderSubtle}`, display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 14, color: t.text, fontWeight: 350 }}>{a.text}</span>
                    <span style={{ fontSize: 11, color: t.textFaint, fontWeight: 300 }}>{a.time}</span>
                  </div>
                ))}
              </>)}

              {/* TASKS */}
              {iTab === "Tasks" && (<>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                  <span style={{ fontSize: 14, color: t.text, fontWeight: 400 }}>{TASKS.length} tasks</span>
                  <button style={{ display: "flex", alignItems: "center", gap: 4, background: "none", border: `1px solid ${t.border}`, borderRadius: 8, padding: "5px 12px", fontSize: 12, color: t.textSec, cursor: "pointer" }}><Plus size={12} />New Task</button>
                </div>
                {TASKS.map((tk, i) => (
                  <div key={i} style={{ padding: "14px 0", borderBottom: `1px solid ${t.borderSubtle}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: 14, color: t.text, fontWeight: 400 }}>{tk.task}</div>
                      <div style={{ fontSize: 12, color: t.textMuted, marginTop: 3, fontWeight: 300 }}>{tk.assignee} Â· {tk.due}</div>
                    </div>
                    <Dot status={tk.status === "active" ? "active" : "idle"} t={t} />
                  </div>
                ))}
              </>)}

              {/* WORKSPACE */}
              {iTab === "Workspace" && (<>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 10 }}>
                  <div style={{ display: "flex", gap: 5 }}>
                    <button onClick={() => setWsSection("all")} style={{ padding: "4px 11px", borderRadius: 20, fontSize: 11, border: "none", cursor: "pointer", background: wsSection === "all" ? t.accent : t.surfaceAlt, color: wsSection === "all" ? t.accentText : t.textMuted }}>All</button>
                    {wsSections.map(sec => (
                      <button key={sec} onClick={() => setWsSection(sec)} style={{ padding: "4px 11px", borderRadius: 20, fontSize: 11, border: "none", cursor: "pointer", background: wsSection === sec ? t.accent : t.surfaceAlt, color: wsSection === sec ? t.accentText : t.textMuted }}>{sec}</button>
                    ))}
                  </div>
                  <button style={{ display: "flex", alignItems: "center", gap: 4, background: "none", border: `1px solid ${t.border}`, borderRadius: 8, padding: "5px 12px", fontSize: 12, color: t.textSec, cursor: "pointer" }}><FilePlus size={12} />Import from Chat</button>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: 16 }}>
                  {filtWs.map(item => (
                    <div key={item.id} style={{ padding: 16, background: t.surfaceAlt, borderRadius: 10, cursor: "pointer" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                        <span style={{ fontSize: 13, fontWeight: 450, color: t.text }}>{item.title}</span>
                        <MoreHorizontal size={14} color={t.textFaint} />
                      </div>
                      <div style={{ fontSize: 12, color: t.textSec, lineHeight: 1.5, fontWeight: 350, marginBottom: 10 }}>{item.content}</div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: 10, padding: "2px 8px", background: t.bg, borderRadius: 10, color: t.textMuted, fontWeight: 400 }}>{item.section}</span>
                        <span style={{ fontSize: 10, color: t.textFaint, fontWeight: 300 }}>{item.type}</span>
                        <span style={{ fontSize: 10, color: t.textFaint, fontWeight: 300 }}>from {item.source}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 24, padding: 20, border: `1px dashed ${t.border}`, borderRadius: 10, textAlign: "center" }}>
                  <div style={{ fontSize: 12, color: t.textMuted, fontWeight: 350, marginBottom: 4 }}>Drag-and-drop canvas view coming soon</div>
                  <div style={{ fontSize: 11, color: t.textFaint, fontWeight: 300 }}>Miro-style whiteboard for connecting components</div>
                </div>
              </>)}

              {/* CHATS */}
              {iTab === "Chats" && (<>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                  <span style={{ fontSize: 14, color: t.text, fontWeight: 400 }}>{CHATS.filter(c => c.instance === inst).length} conversations</span>
                  <button style={{ display: "flex", alignItems: "center", gap: 4, background: "none", border: `1px solid ${t.border}`, borderRadius: 8, padding: "5px 12px", fontSize: 12, color: t.textSec, cursor: "pointer" }}><Plus size={12} />New Chat</button>
                </div>
                {CHATS.filter(c => c.instance === inst).map(c => (
                  <div key={c.id} onClick={() => go("chat", { chat: c.id })} style={{ padding: "14px 0", borderBottom: `1px solid ${t.borderSubtle}`, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: 14, color: t.text, fontWeight: 400 }}>{c.title}</div>
                      <div style={{ fontSize: 12, color: t.textMuted, marginTop: 3, fontWeight: 300, display: "flex", alignItems: "center", gap: 6 }}>
                        {c.time}
                        {c.personas.length > 0 && <span style={{ display: "flex", gap: 2 }}>{PERSONAS.filter(p => c.personas.includes(p.id)).map(p => <Av key={p.id} name={p.name} s={14} t={t} />)}</span>}
                      </div>
                    </div>
                    <ChevronRight size={14} color={t.textFaint} />
                  </div>
                ))}
              </>)}

              {/* FILES */}
              {iTab === "Files" && (<>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 10 }}>
                  <div style={{ display: "flex", gap: 5 }}>
                    {[{ id: "all", l: "All" }, { id: "upload", l: "Uploads" }, { id: "generated", l: "AI Generated" }].map(f => (
                      <button key={f.id} onClick={() => setFileFilter(f.id)} style={{ padding: "4px 11px", borderRadius: 20, fontSize: 11, border: "none", cursor: "pointer", background: fileFilter === f.id ? t.accent : t.surfaceAlt, color: fileFilter === f.id ? t.accentText : t.textMuted }}>{f.l}</button>
                    ))}
                  </div>
                  <button style={{ display: "flex", alignItems: "center", gap: 4, background: "none", border: `1px solid ${t.border}`, borderRadius: 8, padding: "5px 12px", fontSize: 12, color: t.textSec, cursor: "pointer" }}><Upload size={12} />Upload</button>
                </div>
                {filtFiles.length === 0 && <div style={{ padding: 48, textAlign: "center", color: t.textFaint, fontSize: 12, fontWeight: 300 }}>No files yet. Upload files or they'll appear here when AI generates them.</div>}
                {filtFiles.map(f => (
                  <div key={f.id} style={{ padding: "12px 0", borderBottom: `1px solid ${t.borderSubtle}`, display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ color: t.textFaint }}>{fileIcon(f.type)}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, color: t.text, fontWeight: 400, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.name}</div>
                      <div style={{ fontSize: 11, color: t.textMuted, marginTop: 2, fontWeight: 300, display: "flex", alignItems: "center", gap: 8 }}>
                        <span>{f.size}</span>
                        <span>{f.date}</span>
                        <span style={{ padding: "1px 6px", background: f.origin === "generated" ? t.surfaceAlt : "transparent", borderRadius: 8, fontSize: 10 }}>{f.origin === "generated" ? "AI" : "Upload"}</span>
                        {f.chat && <span style={{ display: "flex", alignItems: "center", gap: 3 }}><MessageSquare size={9} />{f.chat}</span>}
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
                      <button title={f.visibility} style={{ background: "none", border: "none", color: f.visibility === "hidden" ? t.textFaint : t.textMuted, cursor: "pointer", display: "flex", padding: 3 }}>{visIcon(f.visibility)}</button>
                      <button title="Download" style={{ background: "none", border: "none", color: t.textFaint, cursor: "pointer", display: "flex", padding: 3 }}><Download size={13} /></button>
                      <button title="Delete" style={{ background: "none", border: "none", color: t.textFaint, cursor: "pointer", display: "flex", padding: 3 }}><Trash2 size={13} /></button>
                    </div>
                  </div>
                ))}
              </>)}

              {/* SETTINGS */}
              {iTab === "Settings" && (<>
                <div style={{ marginBottom: 28 }}>
                  <div style={{ fontSize: 14, color: t.text, fontWeight: 450, marginBottom: 4 }}>Instance Settings</div>
                  <div style={{ fontSize: 12, color: t.textMuted, fontWeight: 300 }}>Settings cascade: Global â†’ Type â†’ Instance. Custom overrides shown below.</div>
                </div>
                {Object.entries(INST_SETTINGS).map(([key, val]) => (
                  <div key={key} style={{ padding: "16px 0", borderBottom: `1px solid ${t.borderSubtle}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, color: t.text, fontWeight: 450, textTransform: "capitalize" }}>{key}</div>
                      <div style={{ fontSize: 12, color: t.textSec, marginTop: 3, fontWeight: 350 }}>{val.value}</div>
                      <div style={{ fontSize: 10, color: val.custom ? t.accent : t.textFaint, marginTop: 3, fontWeight: 300, display: "flex", alignItems: "center", gap: 4 }}>
                        {val.custom ? <Edit3 size={9} /> : <ArrowRight size={9} />}
                        {val.custom ? "Custom override" : `Inherited from ${val.source}`}
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                      <button style={{ background: "none", border: `1px solid ${t.border}`, borderRadius: 6, padding: "4px 10px", fontSize: 11, color: t.textMuted, cursor: "pointer" }}>Edit</button>
                      {val.custom && <button style={{ background: "none", border: `1px solid ${t.border}`, borderRadius: 6, padding: "4px 10px", fontSize: 11, color: t.textFaint, cursor: "pointer" }}>Reset</button>}
                    </div>
                  </div>
                ))}
              </>)}

            </div>
          </div>
        );
      }
      return (
        <div style={{ padding: `${py}px ${px}px`, overflowY: "auto", height: "100%", maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 40 }}>
            <div style={{ fontSize: 28, fontWeight: 300, color: t.text, letterSpacing: "-0.03em" }}>Spaces</div>
            <button style={{ background: "none", border: `1px solid ${t.border}`, borderRadius: 8, padding: "7px 16px", fontSize: 13, color: t.textSec, cursor: "pointer", fontWeight: 400, display: "flex", alignItems: "center", gap: 5 }}><Plus size={14} />New</button>
          </div>
          {INSTANCES.map(ins => (
            <div key={ins.id} onClick={() => go("spaces", { inst: ins.id, tab: "Overview" })}
              style={{ padding: "20px 0", borderBottom: `1px solid ${t.borderSubtle}`, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 16, fontWeight: 450, color: t.text }}>{ins.name}</div>
                <div style={{ fontSize: 13, color: t.textMuted, marginTop: 4, fontWeight: 300, display: "flex", alignItems: "center", gap: 12 }}>
                  <span>{ins.type}</span><span>{ins.chats} chats</span><span>{ins.files} files</span>
                  {ins.personas.length > 0 && <span style={{ display: "flex", gap: 3 }}>{PERSONAS.filter(p => ins.personas.includes(p.id)).map(p => <Av key={p.id} name={p.name} s={18} t={t} />)}</span>}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}><Dot status={ins.status} t={t} /><ChevronRight size={16} color={t.textFaint} /></div>
            </div>
          ))}
        </div>
      );
    }

    // â”€â”€â”€ GLOBAL FILES SCREEN â”€â”€â”€
    // Components: FileSearchBar, FileFilterChips (All/Uploads/AI Generated),
    //   FileGrid, FileBulkSelect, FileBatchActions (Download/Move/Delete)
    if (screen === "files") {
      const allFiles = Object.entries(FILES).flatMap(([instId, fs]) => fs.map(f => ({ ...f, instId: Number(instId), instName: INSTANCES.find(i => i.id === Number(instId))?.name || "Unknown" })));
      const filtAll = (fileFilter === "all" ? allFiles : allFiles.filter(f => f.origin === fileFilter)).filter(f => !fileSearchQ || f.name.toLowerCase().includes(fileSearchQ.toLowerCase()));
      const fileIcon = (type) => ({ pdf: <FileText size={14} />, image: <Image size={14} />, doc: <FileText size={14} />, code: <FileCode size={14} /> })[type] || <FileText size={14} />;
      const toggleFileSelect = (fid) => setFileSelected(prev => prev.includes(fid) ? prev.filter(x => x !== fid) : [...prev, fid]);
      return (
        <div style={{ padding: `${py}px ${px}px`, overflowY: "auto", height: "100%", maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 20 }}>
            <div style={{ fontSize: 28, fontWeight: 300, color: t.text, letterSpacing: "-0.03em" }}>Files</div>
            <div style={{ display: "flex", gap: 6 }}>
              <button onClick={() => { setFileSelectMode(!fileSelectMode); setFileSelected([]); }} style={{ display: "flex", alignItems: "center", gap: 4, background: fileSelectMode ? t.accent : "none", border: fileSelectMode ? "none" : `1px solid ${t.border}`, borderRadius: 8, padding: "7px 14px", fontSize: 12, color: fileSelectMode ? t.accentText : t.textMuted, cursor: "pointer", fontWeight: 400 }}><Square size={12} />{fileSelectMode ? `${fileSelected.length} selected` : "Select"}</button>
              <button style={{ display: "flex", alignItems: "center", gap: 4, background: "none", border: `1px solid ${t.border}`, borderRadius: 8, padding: "7px 16px", fontSize: 13, color: t.textSec, cursor: "pointer", fontWeight: 400 }}><Upload size={14} />Upload</button>
            </div>
          </div>
          {/* Search bar */}
          <div style={{ display: "flex", alignItems: "center", background: t.surfaceAlt, borderRadius: 10, padding: "8px 12px", marginBottom: 16 }}>
            <Search size={13} color={t.textFaint} style={{ marginRight: 8, flexShrink: 0 }} />
            <input value={fileSearchQ} onChange={e => setFileSearchQ(e.target.value)} placeholder="Search files..." style={{ border: "none", background: "none", outline: "none", fontSize: 12, color: t.text, fontWeight: 350, width: "100%" }} />
            {fileSearchQ && <X size={12} color={t.textFaint} onClick={() => setFileSearchQ("")} style={{ cursor: "pointer" }} />}
          </div>
          {/* Batch actions bar */}
          {fileSelectMode && fileSelected.length > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, padding: "8px 12px", background: t.surfaceAlt, borderRadius: 8 }}>
              <span style={{ fontSize: 11, color: t.text, fontWeight: 450 }}>{fileSelected.length} selected</span>
              <button style={{ background: "none", border: `1px solid ${t.border}`, borderRadius: 6, padding: "3px 10px", fontSize: 10, color: t.textMuted, cursor: "pointer", display: "flex", alignItems: "center", gap: 3 }}><Download size={10} />Download</button>
              <button style={{ background: "none", border: `1px solid ${t.border}`, borderRadius: 6, padding: "3px 10px", fontSize: 10, color: t.textMuted, cursor: "pointer", display: "flex", alignItems: "center", gap: 3 }}><ArrowRight size={10} />Move</button>
              <button style={{ background: "none", border: `1px solid ${t.border}`, borderRadius: 6, padding: "3px 10px", fontSize: 10, color: "#ef4444", cursor: "pointer", display: "flex", alignItems: "center", gap: 3 }}><Trash2 size={10} />Delete</button>
            </div>
          )}
          <div style={{ display: "flex", gap: 5, marginBottom: 20 }}>
            {[{ id: "all", l: "All" }, { id: "upload", l: "Uploads" }, { id: "generated", l: "AI Generated" }].map(f => (
              <button key={f.id} onClick={() => setFileFilter(f.id)} style={{ padding: "5px 12px", borderRadius: 20, fontSize: 12, border: "none", cursor: "pointer", background: fileFilter === f.id ? t.accent : t.surfaceAlt, color: fileFilter === f.id ? t.accentText : t.textMuted }}>{f.l}</button>
            ))}
            <span style={{ fontSize: 10, color: t.textFaint, alignSelf: "center", marginLeft: 4 }}>{filtAll.length} files</span>
          </div>
          {filtAll.length === 0 && <div style={{ padding: 48, textAlign: "center", color: t.textFaint, fontSize: 13, fontWeight: 300 }}>No files match this filter.</div>}
          {filtAll.map(f => (
            <div key={f.id} style={{ padding: "12px 0", borderBottom: `1px solid ${t.borderSubtle}`, display: "flex", alignItems: "center", gap: 12 }}>
              {fileSelectMode && (
                <div onClick={() => toggleFileSelect(f.id)} style={{ width: 16, height: 16, borderRadius: 4, border: fileSelected.includes(f.id) ? "none" : `1.5px solid ${t.border}`, background: fileSelected.includes(f.id) ? t.accent : "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {fileSelected.includes(f.id) && <span style={{ color: t.accentText, fontSize: 10, fontWeight: 700 }}>âœ“</span>}
                </div>
              )}
              <div style={{ color: t.textFaint }}>{fileIcon(f.type)}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, color: t.text, fontWeight: 400, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.name}</div>
                <div style={{ fontSize: 11, color: t.textMuted, marginTop: 2, fontWeight: 300, display: "flex", alignItems: "center", gap: 8 }}>
                  <span>{f.size}</span><span>{f.date}</span>
                  <span onClick={() => go("spaces", { inst: f.instId, tab: "Files" })} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 3 }}><LayoutGrid size={9} />{f.instName}</span>
                  <span style={{ padding: "1px 6px", background: f.origin === "generated" ? t.surfaceAlt : "transparent", borderRadius: 8, fontSize: 10 }}>{f.origin === "generated" ? "AI" : "Upload"}</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
                <button title="Download" style={{ background: "none", border: "none", color: t.textFaint, cursor: "pointer", display: "flex", padding: 3 }}><Download size={13} /></button>
                <button title="Delete" style={{ background: "none", border: "none", color: t.textFaint, cursor: "pointer", display: "flex", padding: 3 }}><Trash2 size={13} /></button>
              </div>
            </div>
          ))}
        </div>
      );
    }

    // â”€â”€â”€ PEOPLE / PERSONAS SCREEN â”€â”€â”€
    // Components: PersonaList, PersonaCard (avatar/status/mood/skills),
    //   PersonaDetail, PersonaTabs (overview/identity/boundaries/memory/skills/health),
    //   PersonaOverview (DeploymentsList, ConversationHistory, QuickStats),
    //   PersonaIdentity (Name/Role/Personality/VisibilityToggle),
    //   PersonaBoundaries (WillDo/WontDo/EscalationRule/SkillCeiling),
    //   PersonaMemory (MemoryList/BulkSelect/BatchActions/FilterChips),
    //   PersonaSkills (SkillList/LearnableToggle),
    //   PersonaHealth (MoodIndicator/StatusDot/HealthMetrics),
    //   CreatePersonaModal (multi-step wizard)
    if (screen === "people") {
      if (persona) {
        const p = PERSONAS.find(x => x.id === persona);
        const mems = MEMORIES[p.id] || [];
        const fm = mFilt === "all" ? mems : mems.filter(m => m.type === mFilt);
        const bounds = PERSONA_BOUNDARIES[p.id] || { will: [], wont: [], escalation: "", ceiling: 5, canLearn: true };
        const deploys = PERSONA_DEPLOYMENTS[p.id] || [];
        return (
          <div style={{ display: "flex", flexDirection: "column", height: "100%", maxWidth: 800, margin: "0 auto", width: "100%" }}>
            <div style={{ padding: `${py}px ${px}px 0`, flexShrink: 0 }}>
              {/* Header with actions */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 24 }}>
                <Av name={p.name} s={52} t={t} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 24, fontWeight: 300, color: t.text, letterSpacing: "-0.02em" }}>{p.name}</div>
                  <div style={{ fontSize: 13, color: t.textMuted, fontWeight: 300, display: "flex", alignItems: "center", gap: 8, marginTop: 2 }}>
                    {p.role} <Dot status={p.status} t={t} s={6} /> <span>{p.mood}</span>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                  <button style={{ background: "none", border: `1px solid ${t.border}`, borderRadius: 8, padding: "6px 14px", fontSize: 12, color: t.textSec, cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}>
                    <MessageSquare size={12} />Chat
                  </button>
                  <div style={{ position: "relative" }}>
                    <button onClick={() => setPersonaMenu(!personaMenu)} style={{ background: "none", border: `1px solid ${t.border}`, borderRadius: 8, padding: "6px 8px", cursor: "pointer", color: t.textMuted, display: "flex" }}>
                      <MoreHorizontal size={16} />
                    </button>
                    {personaMenu && (
                      <div style={{ position: "absolute", right: 0, top: "100%", marginTop: 4, background: t.surface, border: `1px solid ${t.border}`, borderRadius: 10, padding: 4, minWidth: 170, boxShadow: "0 4px 16px rgba(0,0,0,0.1)", zIndex: 10 }}>
                        {[
                          { icon: <Edit3 size={12} />, label: "Edit Identity" },
                          { icon: p.status === "sleeping" ? <Eye size={12} /> : <EyeOff size={12} />, label: p.status === "sleeping" ? "Enable" : "Disable" },
                          { icon: <Copy size={12} />, label: "Save as Template" },
                          { icon: <Archive size={12} />, label: "Archive" },
                          { icon: <Trash2 size={12} />, label: "Delete", danger: true },
                        ].map((a, i) => (
                          <div key={i} onClick={() => setPersonaMenu(false)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 10px", borderRadius: 6, cursor: "pointer", fontSize: 12, color: a.danger ? "#ef4444" : t.text, fontWeight: 400 }}>
                            <span style={{ color: a.danger ? "#ef4444" : t.textMuted }}>{a.icon}</span>{a.label}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: mobile ? 14 : 24, borderBottom: `1px solid ${t.borderSubtle}`, overflowX: "auto" }}>
                {[{ id: "overview", l: "Overview" }, { id: "identity", l: "Identity" }, { id: "boundaries", l: "Boundaries" }, { id: "memory", l: "Memory" }, { id: "skills", l: "Skills" }, { id: "health", l: "Health" }].map(tab => (
                  <button key={tab.id} onClick={() => setPTab(tab.id)} style={{
                    padding: "0 0 12px", fontSize: 13, fontWeight: pTab === tab.id ? 500 : 350,
                    color: pTab === tab.id ? t.text : t.textMuted, background: "none", border: "none",
                    borderBottom: pTab === tab.id ? `1.5px solid ${t.accent}` : "1.5px solid transparent", cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0
                  }}>{tab.l}</button>
                ))}
              </div>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: `24px ${px}px ${py}px` }}>

              {/* OVERVIEW */}
              {pTab === "overview" && (<>
                <div style={{ display: "flex", gap: mobile ? 24 : 48, marginBottom: 40 }}>
                  {[{ v: p.memories, l: "Memories" }, { v: p.decisions, l: "Decisions" }, { v: `${p.skills}/${p.maxSkills}`, l: "Skills" }].map((x, i) => (
                    <div key={i}>
                      <div style={{ fontSize: 32, fontWeight: 200, color: t.text, letterSpacing: "-0.04em", lineHeight: 1 }}>{x.v}</div>
                      <div style={{ fontSize: 12, color: t.textMuted, marginTop: 6, fontWeight: 300 }}>{x.l}</div>
                    </div>
                  ))}
                </div>
                {deploys.length > 0 && (<>
                  <div style={{ fontSize: 11, fontWeight: 500, color: t.textMuted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>Deployments</div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 32 }}>
                    {deploys.map((d, i) => (
                      <div key={i} style={{ padding: "6px 14px", background: t.surfaceAlt, borderRadius: 10, fontSize: 12 }}>
                        <span style={{ color: t.text, fontWeight: 400 }}>{d.inst}</span>
                        <span style={{ color: t.textFaint, fontWeight: 300 }}> Â· {d.role} Â· since {d.since}</span>
                      </div>
                    ))}
                  </div>
                </>)}
                <div style={{ fontSize: 11, fontWeight: 500, color: t.textMuted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>Skills</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 40 }}>
                  {["UI Design", "Wireframing", "Figma", "CSS/Tailwind", "Responsive", "Brand Systems", "Prototyping"].slice(0, p.skills).map((sk, i) => (
                    <span key={i} style={{ padding: "5px 14px", background: t.surfaceAlt, borderRadius: 20, fontSize: 12, color: t.textSec, fontWeight: 400 }}>{sk}</span>
                  ))}
                </div>
                <div style={{ fontSize: 11, fontWeight: 500, color: t.textMuted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>Recent Conversations</div>
                {[{ title: "Hero section layout", sub: "Client Website Redesign", time: "2 min ago" }, { title: "Brand color discussion", sub: "Client Website Redesign", time: "3 hrs ago" }].map((c, i) => (
                  <div key={i} style={{ padding: "12px 0", borderBottom: `1px solid ${t.borderSubtle}`, display: "flex", justifyContent: "space-between" }}>
                    <div><div style={{ fontSize: 14, color: t.text, fontWeight: 400 }}>{c.title}</div><div style={{ fontSize: 12, color: t.textMuted, marginTop: 2, fontWeight: 300 }}>{c.sub}</div></div>
                    <span style={{ fontSize: 11, color: t.textFaint, fontWeight: 300 }}>{c.time}</span>
                  </div>
                ))}
              </>)}

              {/* IDENTITY */}
              {pTab === "identity" && (<>
                <div style={{ marginBottom: 28 }}>
                  <div style={{ fontSize: 14, color: t.text, fontWeight: 450, marginBottom: 4 }}>Core Identity</div>
                  <div style={{ fontSize: 12, color: t.textMuted, fontWeight: 300 }}>Define who this Persona is. Changes here affect how they communicate and present themselves.</div>
                </div>
                {[
                  { label: "Name", value: p.name },
                  { label: "Role", value: p.role },
                  { label: "Purpose", value: p.id === 1 ? "Design beautiful, functional web interfaces that align with brand identity and user needs" : p.id === 2 ? "Analyze business data and ensure client-facing communications are clear and compelling" : p.id === 3 ? "Research topics thoroughly using academic and reliable sources to inform team decisions" : "Architect and build robust React applications with clean, maintainable code" },
                  { label: "Voice", value: p.id === 1 ? "Creative, detail-oriented, visually descriptive" : p.id === 2 ? "Professional, concise, data-driven" : p.id === 3 ? "Thorough, academic, precise" : "Technical, pragmatic, solution-focused" },
                ].map((field, i) => (
                  <div key={i} style={{ padding: "16px 0", borderBottom: `1px solid ${t.borderSubtle}`, display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 20 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12, color: t.textMuted, fontWeight: 400, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>{field.label}</div>
                      <div style={{ fontSize: 14, color: t.text, fontWeight: 350, lineHeight: 1.5 }}>{field.value}</div>
                    </div>
                    <button style={{ background: "none", border: `1px solid ${t.border}`, borderRadius: 6, padding: "4px 10px", fontSize: 11, color: t.textMuted, cursor: "pointer", flexShrink: 0 }}>Edit</button>
                  </div>
                ))}
                <div style={{ padding: "16px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontSize: 13, color: t.text, fontWeight: 450 }}>Lock Identity</div>
                    <div style={{ fontSize: 12, color: t.textMuted, fontWeight: 300, marginTop: 2 }}>Prevent accidental edits to name and role</div>
                  </div>
                  <button style={{ background: "none", border: "none", cursor: "pointer", color: t.textFaint, display: "flex" }}><ToggleLeft size={20} /></button>
                </div>
                <div style={{ padding: "16px 0", borderTop: `1px solid ${t.borderSubtle}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontSize: 13, color: t.text, fontWeight: 450 }}>Visibility</div>
                    <div style={{ fontSize: 12, color: t.textMuted, fontWeight: 300, marginTop: 2 }}>Who can see and interact with this Persona</div>
                  </div>
                  <div style={{ display: "flex", gap: 4 }}>
                    <button style={{ padding: "4px 10px", borderRadius: 6, fontSize: 11, border: "none", background: t.accent, color: t.accentText, cursor: "pointer" }}>Private</button>
                    <button style={{ padding: "4px 10px", borderRadius: 6, fontSize: 11, border: `1px solid ${t.border}`, background: "none", color: t.textMuted, cursor: "pointer" }}>Shared</button>
                  </div>
                </div>
              </>)}

              {/* BOUNDARIES */}
              {pTab === "boundaries" && (<>
                <div style={{ marginBottom: 28 }}>
                  <div style={{ fontSize: 14, color: t.text, fontWeight: 450, marginBottom: 4 }}>Boundaries & Safety</div>
                  <div style={{ fontSize: 12, color: t.textMuted, fontWeight: 300 }}>Define what this Persona should and shouldn't do.</div>
                </div>
                <div style={{ marginBottom: 28 }}>
                  <div style={{ fontSize: 12, fontWeight: 500, color: t.dot.active, marginBottom: 10, display: "flex", alignItems: "center", gap: 6 }}><Shield size={13} />Will do</div>
                  {bounds.will.map((item, i) => (
                    <div key={i} style={{ padding: "8px 0", fontSize: 13, color: t.text, fontWeight: 350, display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ width: 4, height: 4, borderRadius: 2, background: t.dot.active, flexShrink: 0 }} />{item}
                    </div>
                  ))}
                  <button style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 4, background: "none", border: `1px dashed ${t.border}`, borderRadius: 6, padding: "4px 10px", fontSize: 11, color: t.textMuted, cursor: "pointer" }}><Plus size={10} />Add</button>
                </div>
                <div style={{ marginBottom: 28 }}>
                  <div style={{ fontSize: 12, fontWeight: 500, color: "#ef4444", marginBottom: 10, display: "flex", alignItems: "center", gap: 6 }}><Shield size={13} />Won't do</div>
                  {bounds.wont.map((item, i) => (
                    <div key={i} style={{ padding: "8px 0", fontSize: 13, color: t.text, fontWeight: 350, display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ width: 4, height: 4, borderRadius: 2, background: "#ef4444", flexShrink: 0 }} />{item}
                    </div>
                  ))}
                  <button style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 4, background: "none", border: `1px dashed ${t.border}`, borderRadius: 6, padding: "4px 10px", fontSize: 11, color: t.textMuted, cursor: "pointer" }}><Plus size={10} />Add</button>
                </div>
                <div style={{ padding: 16, background: t.surfaceAlt, borderRadius: 10, marginBottom: 24 }}>
                  <div style={{ fontSize: 12, fontWeight: 450, color: t.text, marginBottom: 4 }}>Escalation Rule</div>
                  <div style={{ fontSize: 13, color: t.textSec, fontWeight: 350 }}>{bounds.escalation}</div>
                </div>
                <div style={{ display: "flex", gap: mobile ? 16 : 32, marginBottom: 24 }}>
                  <div>
                    <div style={{ fontSize: 12, color: t.textMuted, fontWeight: 400, marginBottom: 6 }}>Skill Ceiling</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 120, height: 4, background: t.surfaceAlt, borderRadius: 2, overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${(bounds.ceiling / 10) * 100}%`, background: t.accent, borderRadius: 2 }} />
                      </div>
                      <span style={{ fontSize: 12, color: t.text, fontWeight: 400 }}>{bounds.ceiling}/10</span>
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: 12, color: t.textMuted, fontWeight: 400, marginBottom: 6 }}>Can Learn</div>
                    <button style={{ background: "none", border: "none", cursor: "pointer", color: bounds.canLearn ? t.dot.active : t.textFaint, display: "flex" }}>
                      {bounds.canLearn ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
                    </button>
                  </div>
                </div>
              </>)}

              {/* MEMORY (enhanced) */}
              {pTab === "memory" && (<>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14, flexWrap: "wrap", gap: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ fontSize: 14, color: t.text, fontWeight: 400 }}>{fm.length} memories</div>
                    <button onClick={() => { setMemSelectMode(!memSelectMode); setMemSelected([]); }} style={{ display: "flex", alignItems: "center", gap: 3, padding: "3px 8px", borderRadius: 6, fontSize: 10, border: memSelectMode ? "none" : `1px solid ${t.border}`, background: memSelectMode ? t.accent : "none", color: memSelectMode ? t.accentText : t.textMuted, cursor: "pointer" }}><Square size={10} />{memSelectMode ? `${memSelected.length} selected` : "Select"}</button>
                  </div>
                  <div style={{ display: "flex", gap: 6 }}>
                    {[{ id: "all", l: "All" }, { id: "decision", l: "Decisions" }, { id: "fact", l: "Facts" }, { id: "preference", l: "Prefs" }, { id: "skill", l: "Skills" }].map(f => (
                      <button key={f.id} onClick={() => setMFilt(f.id)} style={{
                        padding: "5px 12px", borderRadius: 20, fontSize: 12, cursor: "pointer", fontWeight: 400,
                        background: mFilt === f.id ? t.accent : "transparent",
                        color: mFilt === f.id ? t.accentText : t.textMuted,
                        border: mFilt === f.id ? "none" : `1px solid ${t.border}`
                      }}>{f.l}</button>
                    ))}
                  </div>
                </div>
                {/* Batch action bar */}
                {memSelectMode && memSelected.length > 0 && (
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14, padding: "8px 12px", background: t.surfaceAlt, borderRadius: 8 }}>
                    <span style={{ fontSize: 11, color: t.text, fontWeight: 450 }}>{memSelected.length} selected</span>
                    <button style={{ background: "none", border: `1px solid ${t.border}`, borderRadius: 6, padding: "3px 10px", fontSize: 10, color: t.textMuted, cursor: "pointer", display: "flex", alignItems: "center", gap: 3 }}><Archive size={10} />Archive</button>
                    <button style={{ background: "none", border: `1px solid ${t.border}`, borderRadius: 6, padding: "3px 10px", fontSize: 10, color: "#ef4444", cursor: "pointer", display: "flex", alignItems: "center", gap: 3 }}><Trash2 size={10} />Delete</button>
                    <button style={{ background: "none", border: `1px solid ${t.border}`, borderRadius: 6, padding: "3px 10px", fontSize: 10, color: t.textMuted, cursor: "pointer", display: "flex", alignItems: "center", gap: 3 }}><Shield size={10} />Flag</button>
                  </div>
                )}
                {fm.map(mem => (
                  <div key={mem.id} style={{ padding: "18px 0", borderBottom: `1px solid ${t.borderSubtle}` }}>
                    <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      {memSelectMode && (
                        <div onClick={() => setMemSelected(prev => prev.includes(mem.id) ? prev.filter(x => x !== mem.id) : [...prev, mem.id])} style={{ width: 16, height: 16, borderRadius: 4, border: memSelected.includes(mem.id) ? "none" : `1.5px solid ${t.border}`, background: memSelected.includes(mem.id) ? t.accent : "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 3 }}>
                          {memSelected.includes(mem.id) && <span style={{ color: t.accentText, fontSize: 10, fontWeight: 700 }}>âœ“</span>}
                        </div>
                      )}
                      <div style={{ marginTop: 3 }}><MemI type={mem.type} t={t} /></div>
                      <div style={{ flex: 1 }}>
                        {editingMem === mem.id ? (
                          <div>
                            <textarea defaultValue={mem.text} style={{ width: "100%", background: t.surfaceAlt, border: `1px solid ${t.border}`, borderRadius: 8, padding: "8px 10px", fontSize: 13, color: t.text, fontWeight: 350, resize: "vertical", minHeight: 60, fontFamily: "inherit", outline: "none" }} />
                            <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
                              <button onClick={() => setEditingMem(null)} style={{ background: t.accent, color: t.accentText, border: "none", borderRadius: 6, padding: "4px 12px", fontSize: 11, cursor: "pointer", fontWeight: 450 }}>Save</button>
                              <button onClick={() => setEditingMem(null)} style={{ background: "none", border: `1px solid ${t.border}`, borderRadius: 6, padding: "4px 12px", fontSize: 11, color: t.textMuted, cursor: "pointer" }}>Cancel</button>
                            </div>
                          </div>
                        ) : (
                          <div style={{ fontSize: 14, color: t.text, lineHeight: 1.6, fontWeight: 400, marginBottom: 8 }}>{mem.text}</div>
                        )}
                        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                          <span style={{ fontSize: 11, color: t.textMuted, fontWeight: 400, textTransform: "capitalize" }}>{mem.type}</span>
                          <span style={{ fontSize: 11, color: mem.strength === "strong" ? t.textSec : t.textFaint, fontWeight: 300 }}>{mem.strength}</span>
                          <span style={{ fontSize: 11, color: t.textFaint, fontWeight: 300 }}>{mem.time}</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8 }}>
                          <div onClick={() => go("chat", { chat: mem.chatId })} style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, color: t.textMuted, cursor: "pointer", fontWeight: 400, padding: "4px 10px", borderRadius: 16, background: t.surfaceAlt }}>
                            <MessageSquare size={10} />{mem.chat}<ExternalLink size={8} />
                          </div>
                        </div>
                      </div>
                      {/* Memory action buttons */}
                      <div style={{ display: "flex", gap: 2, flexShrink: 0, marginTop: 2 }}>
                        <button onClick={() => setEditingMem(editingMem === mem.id ? null : mem.id)} title="Edit" style={{ background: "none", border: "none", color: t.textFaint, cursor: "pointer", display: "flex", padding: 3 }}><Edit3 size={12} /></button>
                        <button title="Flag as harmful" style={{ background: "none", border: "none", color: t.textFaint, cursor: "pointer", display: "flex", padding: 3 }}><Shield size={12} /></button>
                        <button title="Delete" style={{ background: "none", border: "none", color: t.textFaint, cursor: "pointer", display: "flex", padding: 3 }}><Trash2 size={12} /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </>)}

              {/* SKILLS */}
              {pTab === "skills" && (<>
                <div style={{ marginBottom: 24 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ fontSize: 12, color: t.textMuted, fontWeight: 300 }}>{p.skills} of {p.maxSkills} slots used</span>
                  </div>
                  <div style={{ height: 4, background: t.surfaceAlt, borderRadius: 2, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${(p.skills / p.maxSkills) * 100}%`, background: t.accent, borderRadius: 2 }} />
                  </div>
                </div>
                {["UI Design", "Wireframing", "Figma", "CSS/Tailwind", "Responsive Design", "Brand Systems", "Prototyping"].slice(0, p.skills).map((sk, i) => (
                  <div key={i} style={{ padding: "14px 0", borderBottom: `1px solid ${t.borderSubtle}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}><Zap size={14} color={t.textFaint} /><span style={{ fontSize: 14, color: t.text, fontWeight: 400 }}>{sk}</span></div>
                    <span style={{ fontSize: 11, color: t.textFaint, fontWeight: 300 }}>Permanent</span>
                  </div>
                ))}
              </>)}

              {/* HEALTH */}
              {pTab === "health" && (<>
                <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: 24, marginBottom: 40 }}>
                  {[{ l: "Memory Stability", v: "98%" }, { l: "Skill Stability", v: "100%" }, { l: "Last Sleep", v: "6 hrs ago" }, { l: "Drift", v: "Low" }].map((m, i) => (
                    <div key={i}>
                      <div style={{ fontSize: 28, fontWeight: 200, color: t.text, letterSpacing: "-0.03em" }}>{m.v}</div>
                      <div style={{ fontSize: 12, color: t.textMuted, marginTop: 4, fontWeight: 300 }}>{m.l}</div>
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: 11, fontWeight: 500, color: t.textMuted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>Recovery</div>
                {[{ l: "Soft Reset", d: "Clear moods and confusion" }, { l: "Minimize Experience", d: "Reduce memory weight" }].map((r, i) => (
                  <div key={i} style={{ padding: "14px 0", borderBottom: `1px solid ${t.borderSubtle}`, cursor: "pointer" }}>
                    <div style={{ fontSize: 14, color: t.text, fontWeight: 400 }}>{r.l}</div>
                    <div style={{ fontSize: 12, color: t.textMuted, marginTop: 2, fontWeight: 300 }}>{r.d}</div>
                  </div>
                ))}
              </>)}

            </div>
          </div>
        );
      }

      // â”€â”€â”€ PEOPLE LIST + CREATION MODAL â”€â”€â”€
      const createSteps = ["Name & Role", "Purpose", "Boundaries", "Review"];
      return (
        <div style={{ padding: `${py}px ${px}px`, overflowY: "auto", height: "100%", maxWidth: 900, margin: "0 auto", position: "relative" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 40 }}>
            <div style={{ fontSize: 28, fontWeight: 300, color: t.text, letterSpacing: "-0.03em" }}>People</div>
            <button onClick={() => { setCreatePersona(true); setCreateStep(0); }} style={{ background: "none", border: `1px solid ${t.border}`, borderRadius: 8, padding: "7px 16px", fontSize: 13, color: t.textSec, cursor: "pointer", fontWeight: 400, display: "flex", alignItems: "center", gap: 5 }}><Plus size={14} />New</button>
          </div>
          {PERSONAS.map(p => (
            <div key={p.id} onClick={() => go("people", { persona: p.id })}
              style={{ padding: "20px 0", borderBottom: `1px solid ${t.borderSubtle}`, cursor: "pointer", display: "flex", alignItems: "center", gap: 16 }}>
              <Av name={p.name} s={40} t={t} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 16, fontWeight: 450, color: t.text, display: "flex", alignItems: "center", gap: 8 }}>{p.name}<Dot status={p.status} t={t} s={6} /></div>
                <div style={{ fontSize: 13, color: t.textMuted, marginTop: 2, fontWeight: 300 }}>{p.role} Â· {p.skills}/{p.maxSkills} skills Â· {p.memories} memories</div>
              </div>
              <ChevronRight size={16} color={t.textFaint} />
            </div>
          ))}
          <div style={{ marginTop: 28, padding: "14px 16px", background: t.surfaceAlt, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 450, color: t.text }}>Persona Templates</div>
              <div style={{ fontSize: 12, color: t.textMuted, fontWeight: 300, marginTop: 2 }}>Save and share Persona configurations</div>
            </div>
            <button style={{ fontSize: 11, padding: "3px 10px", background: t.surfaceAlt, borderRadius: 8, color: t.textMuted, border: `1px solid ${t.border}`, cursor: "pointer" }}>Browse</button>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
            {[{ name: "Researcher", desc: "Academic source prioritization" }, { name: "Copywriter", desc: "Brand voice consistency" }, { name: "Code Reviewer", desc: "PR review + test coverage" }].map((tpl, i) => (
              <div key={i} style={{ padding: "8px 14px", background: t.surfaceAlt, borderRadius: 8, cursor: "pointer", border: `1px solid ${t.borderSubtle}` }}>
                <div style={{ fontSize: 11, color: t.text, fontWeight: 450 }}>{tpl.name}</div>
                <div style={{ fontSize: 9, color: t.textFaint, marginTop: 1 }}>{tpl.desc}</div>
              </div>
            ))}
          </div>

          {/* CREATION MODAL */}
          {createPersona && (
            <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50 }}>
              <div style={{ background: t.surface, borderRadius: 16, padding: 32, width: mobile ? "90%" : 480, maxHeight: "80vh", overflowY: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                  <div style={{ fontSize: 18, fontWeight: 400, color: t.text }}>Create Persona</div>
                  <button onClick={() => setCreatePersona(false)} style={{ background: "none", border: "none", color: t.textMuted, cursor: "pointer", display: "flex" }}><X size={18} /></button>
                </div>
                {/* Steps indicator */}
                <div style={{ display: "flex", gap: 4, marginBottom: 28 }}>
                  {createSteps.map((step, i) => (
                    <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                      <div style={{ width: "100%", height: 3, borderRadius: 2, background: i <= createStep ? t.accent : t.surfaceAlt }} />
                      <span style={{ fontSize: 10, color: i <= createStep ? t.text : t.textFaint, fontWeight: i === createStep ? 500 : 300 }}>{step}</span>
                    </div>
                  ))}
                </div>
                {/* Step content */}
                {createStep === 0 && (
                  <div>
                    <div style={{ marginBottom: 20 }}>
                      <label style={{ fontSize: 12, color: t.textMuted, fontWeight: 400, display: "block", marginBottom: 6 }}>Name</label>
                      <input placeholder="e.g. Alex" style={{ width: "100%", padding: "10px 14px", background: t.surfaceAlt, border: `1px solid ${t.border}`, borderRadius: 8, fontSize: 14, color: t.text, outline: "none", boxSizing: "border-box" }} />
                    </div>
                    <div>
                      <label style={{ fontSize: 12, color: t.textMuted, fontWeight: 400, display: "block", marginBottom: 6 }}>Role</label>
                      <input placeholder="e.g. Marketing Strategist" style={{ width: "100%", padding: "10px 14px", background: t.surfaceAlt, border: `1px solid ${t.border}`, borderRadius: 8, fontSize: 14, color: t.text, outline: "none", boxSizing: "border-box" }} />
                    </div>
                  </div>
                )}
                {createStep === 1 && (
                  <div>
                    <label style={{ fontSize: 12, color: t.textMuted, fontWeight: 400, display: "block", marginBottom: 6 }}>Purpose</label>
                    <textarea placeholder="Describe what this Persona will do..." rows={4} style={{ width: "100%", padding: "10px 14px", background: t.surfaceAlt, border: `1px solid ${t.border}`, borderRadius: 8, fontSize: 14, color: t.text, outline: "none", resize: "vertical", fontFamily: "inherit", boxSizing: "border-box" }} />
                  </div>
                )}
                {createStep === 2 && (
                  <div>
                    <div style={{ marginBottom: 16 }}>
                      <label style={{ fontSize: 12, color: t.textMuted, fontWeight: 400, display: "block", marginBottom: 6 }}>What should this Persona do?</label>
                      <textarea placeholder="e.g. Research market trends, write reports..." rows={3} style={{ width: "100%", padding: "10px 14px", background: t.surfaceAlt, border: `1px solid ${t.border}`, borderRadius: 8, fontSize: 13, color: t.text, outline: "none", resize: "vertical", fontFamily: "inherit", boxSizing: "border-box" }} />
                    </div>
                    <div>
                      <label style={{ fontSize: 12, color: t.textMuted, fontWeight: 400, display: "block", marginBottom: 6 }}>What should this Persona avoid?</label>
                      <textarea placeholder="e.g. Making financial commitments, contacting clients..." rows={3} style={{ width: "100%", padding: "10px 14px", background: t.surfaceAlt, border: `1px solid ${t.border}`, borderRadius: 8, fontSize: 13, color: t.text, outline: "none", resize: "vertical", fontFamily: "inherit", boxSizing: "border-box" }} />
                    </div>
                  </div>
                )}
                {createStep === 3 && (
                  <div style={{ padding: 16, background: t.surfaceAlt, borderRadius: 10 }}>
                    <div style={{ fontSize: 14, color: t.text, fontWeight: 450, marginBottom: 12 }}>Review</div>
                    <div style={{ fontSize: 13, color: t.textSec, fontWeight: 350, lineHeight: 1.6 }}>
                      Your new Persona will start with no memories or skills. They'll learn from conversations and build knowledge over time. You can always adjust their identity, boundaries, and skills later.
                    </div>
                  </div>
                )}
                {/* Nav buttons */}
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 28 }}>
                  <button onClick={() => createStep > 0 ? setCreateStep(createStep - 1) : setCreatePersona(false)} style={{ background: "none", border: `1px solid ${t.border}`, borderRadius: 8, padding: "8px 20px", fontSize: 13, color: t.textSec, cursor: "pointer" }}>
                    {createStep === 0 ? "Cancel" : "Back"}
                  </button>
                  <button onClick={() => createStep < 3 ? setCreateStep(createStep + 1) : setCreatePersona(false)} style={{ background: t.accent, color: t.accentText, border: "none", borderRadius: 8, padding: "8px 24px", fontSize: 13, cursor: "pointer", fontWeight: 450 }}>
                    {createStep < 3 ? "Next" : "Create"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }

    // â”€â”€â”€ TEAMS SCREEN â”€â”€â”€
    // Components: TeamsHeader, TeamsFilterChips (All/Short-Term/Long-Term/Recurring),
    //   TeamCard (progress/status/memberCount/lastRun),
    //   ExecutiveTeamsTeaser (Enterprise tier gate),
    //   NewTeamButton
    if (screen === "teams") {
      const filteredTeams = teamsFilter === "all" ? TEAMS_DATA : TEAMS_DATA.filter(te => te.type.toLowerCase().replace("-", "") === teamsFilter);
      return (
        <div style={{ padding: `${py}px ${px}px`, overflowY: "auto", height: "100%" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
              <div>
                <div style={{ fontSize: 22, fontWeight: 300, color: t.text, letterSpacing: "-0.03em" }}>Agentic Teams</div>
                <div style={{ fontSize: 13, color: t.textMuted, fontWeight: 300, marginTop: 4 }}>Coordinate Personas to work together autonomously on complex goals.</div>
              </div>
              <button style={{ background: t.accent, color: t.accentText, border: "none", borderRadius: 8, padding: "8px 18px", fontSize: 12, cursor: "pointer", fontWeight: 450, display: "flex", alignItems: "center", gap: 5 }}><Plus size={13} />New Team</button>
            </div>
            <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
              {[{ id: "all", l: "All" }, { id: "shortterm", l: "Short-Term", icon: <Zap size={10} /> }, { id: "longterm", l: "Long-Term", icon: <Clock size={10} /> }, { id: "recurring", l: "Recurring", icon: <RefreshCw size={10} /> }].map(f => (
                <button key={f.id} onClick={() => setTeamsFilter(f.id)} style={{ display: "flex", alignItems: "center", gap: 3, padding: "5px 12px", borderRadius: 20, fontSize: 11, cursor: "pointer", fontWeight: 400, border: "none", background: teamsFilter === f.id ? t.accent : t.surfaceAlt, color: teamsFilter === f.id ? t.accentText : t.textMuted }}>{f.icon}{f.l}</button>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {filteredTeams.map(te => (
                <div key={te.id} style={{ padding: "16px 20px", background: t.surface, border: `1px solid ${t.borderSubtle}`, borderRadius: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                        <span style={{ fontSize: 15, fontWeight: 450, color: t.text }}>{te.name}</span>
                        <Dot status={te.status} t={t} s={6} />
                        <span style={{ fontSize: 10, padding: "1px 7px", background: t.surfaceAlt, borderRadius: 8, color: t.textMuted }}>{te.type}</span>
                      </div>
                      <div style={{ fontSize: 12, color: t.textMuted, fontWeight: 300 }}>{te.desc}</div>
                    </div>
                    <button style={{ background: "none", border: `1px solid ${t.border}`, borderRadius: 6, padding: "4px 10px", fontSize: 10, color: t.textMuted, cursor: "pointer" }}>Manage</button>
                  </div>
                  <div style={{ display: "flex", gap: mobile ? 16 : 28, fontSize: 12 }}>
                    <span style={{ color: t.textMuted }}><span style={{ fontWeight: 450, color: t.text }}>{te.members}</span> Personas</span>
                    <span style={{ color: t.textMuted }}><span style={{ fontWeight: 450, color: t.text }}>{te.completed}/{te.tasks}</span> tasks done</span>
                    <span style={{ color: t.textFaint }}>Last run {te.lastRun}</span>
                  </div>
                  <div style={{ marginTop: 10, height: 3, borderRadius: 2, background: t.surfaceAlt, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${(te.completed/te.tasks)*100}%`, background: t.dot.active, borderRadius: 2 }} />
                  </div>
                </div>
              ))}
            </div>
            {/* Executive Teams teaser */}
            <div style={{ marginTop: 24, padding: "16px 20px", background: t.surfaceAlt, borderRadius: 12, border: `1px dashed ${t.border}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <Layers size={14} color={t.textMuted} />
                <span style={{ fontSize: 13, fontWeight: 450, color: t.text }}>Executive Teams</span>
                <span style={{ fontSize: 8, padding: "1px 5px", borderRadius: 4, background: "#2e95f3", color: "#fff", fontWeight: 600 }}>Enterprise</span>
              </div>
              <div style={{ fontSize: 12, color: t.textMuted, fontWeight: 300 }}>High-level strategic teams that manage and coordinate other teams for complex multi-phase operations.</div>
            </div>
          </div>
        </div>
      );
    }

    // â”€â”€â”€ BROWSER / CO-BROWSING WORKSPACE SCREEN â”€â”€â”€
    // Components: BrowserSessionManager (ActiveSessions/History/SavedExtracts tabs),
    //   WebViewport (simulated webpage with page content),
    //   FloatingNavBar (Back/Forward/Refresh/URLBar/HighlightTool/ExtractButton/ViewSwitcher/MinimizeButton),
    //   ViewSwitcherMenu (FloatBar/IconOnly/Sidebar/50-50/ChatOnly),
    //   FloatingPersonaBar (last message + input, overlaid on page, float mode),
    //   PersonaDot (minimized persona avatar, icon mode),
    //   MinimizedNavDot (collapsed nav bar as compass dot),
    //   PageAwarenessIndicator ("Sally is reading this page" badge),
    //   TabStrip (horizontal favicon row with expand popup),
    //   TabListPopup (vertical floating menu with tab names),
    //   BrowserChatPanel (persona header + chat messages + composer),
    //   QuickActionChips (SummarizePage/ExtractPricing/FindContact/CompareToInstance),
    //   HighlightOverlay (blue border + persona attribution on page sections)
    if (screen === "browser") {
      const bPer = PERSONAS.find(p => p.id === browserPersona);
      const viewOpts = [
        { id: "float", l: "Float Bar", desc: "Floating chat input over the page", icon: <Compass size={13} /> },
        { id: "icon", l: "Icon Only", desc: "Persona dot â€” click to expand", icon: <Minimize2 size={13} /> },
        { id: "sidebar", l: "Sidebar", desc: "Chat panel docked to the right", icon: <Columns size={13} /> },
        { id: "split", l: "50/50", desc: "Equal split between browser and chat", icon: <Columns size={13} /> },
        { id: "chatonly", l: "Chat Only", desc: "Full chat with browser minimized", icon: <MessageSquare size={13} /> },
      ];
      const browserChat = [
        { id: "b1", sender: "You", text: "Sally, can you find the pricing section on this page?" },
        { id: "b2", sender: "Sally", text: "Found it â€” they have three tiers. The Enterprise plan at $299/mo looks closest to what our client needs. I've highlighted the section.", persona: 1 },
        { id: "b3", sender: "You", text: "Extract that pricing table and save it to the Client Website Redesign instance." },
        { id: "b4", sender: "Sally", text: "Done â€” saved as \"Apex competitor pricing table\" in your files. I also noticed their nav uses a sticky header pattern similar to what we discussed.", persona: 1 },
      ];

      // Sessions/History/Extracts secondary view
      if (browserMode !== "browse") return (
        <div style={{ padding: `${py}px ${px}px`, overflowY: "auto", height: "100%" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
              <div>
                <div style={{ fontSize: 22, fontWeight: 300, color: t.text, letterSpacing: "-0.03em" }}>Browser</div>
                <div style={{ fontSize: 13, color: t.textMuted, fontWeight: 300, marginTop: 4 }}>Browse the web with Personas alongside you.</div>
              </div>
              <button onClick={() => { setBrowserMode("browse"); setSExp(false); }} style={{ background: t.accent, color: t.accentText, border: "none", borderRadius: 8, padding: "8px 18px", fontSize: 12, cursor: "pointer", fontWeight: 450, display: "flex", alignItems: "center", gap: 5 }}><Compass size={13} />Open Browser</button>
            </div>
            <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
              {[{ id: "sessions", l: "Active Sessions" }, { id: "history", l: "History" }, { id: "extracts", l: "Saved Extracts" }].map(tab => (
                <button key={tab.id} onClick={() => setBrowserMode(tab.id)} style={{ padding: "6px 14px", borderRadius: 20, fontSize: 11, cursor: "pointer", fontWeight: 400, border: "none", background: browserMode === tab.id ? t.accent : t.surfaceAlt, color: browserMode === tab.id ? t.accentText : t.textMuted }}>{tab.l}</button>
              ))}
            </div>
            {browserMode === "sessions" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {BROWSER_SESSIONS.map(bs => (
                  <div key={bs.id} onClick={() => { setBrowserUrl(bs.url.startsWith("http") ? bs.url : `https://${bs.url}`); setBrowserMode("browse"); setSExp(false); }} style={{ padding: "14px 18px", background: t.surface, border: `1px solid ${t.borderSubtle}`, borderRadius: 12, display: "flex", alignItems: "center", gap: 14, cursor: "pointer" }}>
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: t.surfaceAlt, display: "flex", alignItems: "center", justifyContent: "center" }}><Globe size={16} color={t.textMuted} /></div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 450, color: t.text, marginBottom: 2 }}>{bs.url}</div>
                      <div style={{ fontSize: 11, color: t.textMuted, fontWeight: 300 }}>{bs.action} Â· <span style={{ color: t.textFaint }}>{bs.persona}</span></div>
                    </div>
                    <span style={{ fontSize: 10, color: t.textFaint }}>{bs.time}</span>
                  </div>
                ))}
              </div>
            )}
            {browserMode === "history" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {[{ url: "figma.com/file/Kj9x...", persona: "Sally", time: "2 hrs ago", extracted: 3 }, { url: "mdn web docs â€” CSS Grid", persona: "Dev", time: "Yesterday", extracted: 1 }, { url: "arxiv.org/abs/2401.1234", persona: "Nora", time: "2 days ago", extracted: 5 }, { url: "stripe.com/docs/payments", persona: "Dev", time: "3 days ago", extracted: 2 }].map((h, i) => (
                  <div key={i} style={{ padding: "12px 16px", background: t.surface, border: `1px solid ${t.borderSubtle}`, borderRadius: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: 12, color: t.text, fontWeight: 400 }}>{h.url}</div>
                      <div style={{ fontSize: 10, color: t.textFaint, marginTop: 2 }}>{h.persona} Â· {h.time} Â· {h.extracted} extracts</div>
                    </div>
                    <div style={{ display: "flex", gap: 4 }}>
                      <button onClick={() => { setBrowserMode("browse"); setSExp(false); }} style={{ background: "none", border: `1px solid ${t.border}`, borderRadius: 5, padding: "3px 8px", fontSize: 10, color: t.textMuted, cursor: "pointer" }}>Revisit</button>
                      <button style={{ background: "none", border: "none", padding: 3, cursor: "pointer", color: t.textFaint, display: "flex" }}><Trash2 size={11} /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {browserMode === "extracts" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {[{ title: "Apex competitor pricing table", source: "apex-corp.com", instance: "Client Website Redesign", time: "10 min ago" }, { title: "CSS Grid best practices", source: "MDN Web Docs", instance: "App Development", time: "Yesterday" }, { title: "Transformer attention paper â€” key findings", source: "arxiv.org", instance: "Q1 Marketing Strategy", time: "2 days ago" }].map((sv, i) => (
                  <div key={i} style={{ padding: "12px 16px", background: t.surface, border: `1px solid ${t.borderSubtle}`, borderRadius: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontSize: 12, color: t.text, fontWeight: 450 }}>{sv.title}</span>
                      <span style={{ fontSize: 10, color: t.textFaint }}>{sv.time}</span>
                    </div>
                    <div style={{ fontSize: 10, color: t.textMuted }}>From {sv.source} Â· Saved to <strong style={{ fontWeight: 450 }}>{sv.instance}</strong></div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      );

      // â”€â”€â”€ MAIN CO-BROWSE LAYOUT â”€â”€â”€
      // Layout: WebViewport (flex) + UnifiedRightSidebar (fixed width)
      // View modes: float (chat bubble overlay), icon (persona dot), sidebar (320px),
      //   split (50/50), chatonly (full-width chat, no viewport)
      const showChatPanel = browserView === "sidebar" || browserView === "split" || browserView === "chatonly";
      const showWebView = browserView !== "chatonly";

      return (
        <div style={{ display: "flex", height: "100%", position: "relative", overflow: "hidden" }}>
          {/* â”€â”€â”€ WEB VIEWPORT â”€â”€â”€ */}
          {showWebView && (
            <div style={{ flex: 1, display: "flex", flexDirection: "column", position: "relative", minWidth: 0, background: "#f8f8f8" }}>
              {/* Tab strip inside viewport when sidebar is hidden (float/icon modes) */}
              {(browserView === "float" || browserView === "icon") && (
                <div style={{ flexShrink: 0, borderBottom: `1px solid ${t.borderSubtle}`, padding: "6px 12px", display: "flex", alignItems: "center", gap: 6, background: t.surface, position: "relative" }}>
                  {browserTabs.map(tab => (
                    <div key={tab.id} onClick={() => { setActiveBrowserTab(tab.id); setBrowserUrl(tab.url); setBrowserTabListPopup(false); }} title={tab.title}
                      style={{
                        width: 26, height: 26, borderRadius: 6, background: tab.color, display: "flex", alignItems: "center", justifyContent: "center",
                        cursor: "pointer", flexShrink: 0,
                        outline: activeBrowserTab === tab.id ? `2px solid ${t.accent}` : "2px solid transparent",
                        outlineOffset: 1, opacity: activeBrowserTab === tab.id ? 1 : 0.55,
                        transition: "opacity 0.15s ease, outline 0.15s ease",
                      }}>
                      <span style={{ color: "#fff", fontSize: 10, fontWeight: 700 }}>{tab.favicon}</span>
                    </div>
                  ))}
                  <div style={{ flex: 1 }} />
                  <button title="New tab" style={{ background: "none", border: `1px dashed ${t.border}`, color: t.textFaint, cursor: "pointer", display: "flex", padding: 3, borderRadius: 6, width: 26, height: 26, alignItems: "center", justifyContent: "center" }}><Plus size={11} /></button>
                  <button onClick={() => setBrowserTabListPopup(!browserTabListPopup)} title="Show tab names" style={{ background: "none", border: "none", color: t.textFaint, cursor: "pointer", display: "flex", padding: 3 }}><Maximize2 size={12} /></button>
                  {/* Floating tab name list */}
                  {browserTabListPopup && (
                    <div style={{ position: "absolute", top: "100%", right: 12, marginTop: 4, background: t.surface, border: `1px solid ${t.border}`, borderRadius: 10, padding: 6, minWidth: 240, boxShadow: "0 8px 24px rgba(0,0,0,0.18)", zIndex: 50 }}>
                      {browserTabs.map(tab => (
                        <div key={tab.id} onClick={() => { setActiveBrowserTab(tab.id); setBrowserUrl(tab.url); setBrowserTabListPopup(false); }}
                          style={{ padding: "7px 10px", borderRadius: 7, cursor: "pointer", display: "flex", alignItems: "center", gap: 10, background: activeBrowserTab === tab.id ? t.surfaceAlt : "transparent" }}>
                          <div style={{ width: 20, height: 20, borderRadius: 5, background: tab.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <span style={{ color: "#fff", fontSize: 9, fontWeight: 700 }}>{tab.favicon}</span>
                          </div>
                          <div style={{ fontSize: 11, color: activeBrowserTab === tab.id ? t.text : t.textMuted, fontWeight: activeBrowserTab === tab.id ? 450 : 350, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{tab.title}</div>
                          {activeBrowserTab === tab.id && <span style={{ marginLeft: "auto", width: 5, height: 5, borderRadius: "50%", background: t.accent, flexShrink: 0 }} />}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              {/* Simulated webpage content */}
              <div style={{ flex: 1, overflow: "auto", position: "relative" }}>
                {/* Simulated website header */}
                <div style={{ background: "#1a1a2e", padding: "16px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 28, height: 28, borderRadius: 6, background: "#e94560", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "#fff", fontSize: 12, fontWeight: 700 }}>A</span></div>
                    <span style={{ color: "#fff", fontSize: 15, fontWeight: 600, letterSpacing: "-0.02em" }}>Apex Corp</span>
                  </div>
                  <div style={{ display: "flex", gap: 24 }}>
                    {["Home", "Services", "Pricing", "About", "Contact"].map(nav => (
                      <span key={nav} style={{ color: nav === "Services" ? "#e94560" : "rgba(255,255,255,0.7)", fontSize: 13, fontWeight: nav === "Services" ? 500 : 350, cursor: "pointer" }}>{nav}</span>
                    ))}
                  </div>
                </div>
                {/* Simulated hero */}
                <div style={{ padding: "48px 32px", background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)" }}>
                  <div style={{ maxWidth: 520 }}>
                    <div style={{ fontSize: 11, color: "#e94560", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>Our Services</div>
                    <div style={{ fontSize: 28, fontWeight: 300, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.3, marginBottom: 16 }}>Enterprise solutions that scale with your ambition</div>
                    <div style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", fontWeight: 300, lineHeight: 1.6 }}>From cloud infrastructure to AI integration, we help businesses transform their digital operations.</div>
                  </div>
                </div>
                {/* Simulated pricing section â€” highlighted by persona */}
                <div style={{ padding: "32px 32px", background: "#fff" }}>
                  <div style={{ fontSize: 20, fontWeight: 400, color: "#1a1a2e", marginBottom: 6 }}>Pricing Plans</div>
                  <div style={{ fontSize: 13, color: "#666", fontWeight: 300, marginBottom: 24 }}>Choose the plan that fits your team.</div>
                  {/* Sally's highlight overlay */}
                  <div style={{ border: "2px solid #2e95f3", borderRadius: 14, padding: 3, position: "relative" }}>
                    <div style={{ position: "absolute", top: -10, left: 16, background: "#2e95f3", color: "#fff", fontSize: 9, fontWeight: 600, padding: "2px 8px", borderRadius: 4, display: "flex", alignItems: "center", gap: 4 }}>
                      <Eye size={9} />Sally highlighted this section
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr 1fr", gap: 12, padding: 12 }}>
                      {[
                        { name: "Starter", price: "$49", features: ["5 Users", "10 GB Storage", "Email Support", "Basic Analytics"] },
                        { name: "Professional", price: "$149", features: ["25 Users", "100 GB Storage", "Priority Support", "Advanced Analytics", "API Access"], popular: true },
                        { name: "Enterprise", price: "$299", features: ["Unlimited Users", "1 TB Storage", "Dedicated Support", "Custom Integrations", "SLA", "SSO"] },
                      ].map((plan, i) => (
                        <div key={i} style={{ padding: 20, borderRadius: 10, border: plan.popular ? "2px solid #e94560" : "1px solid #eee", background: plan.popular ? "#fef7f8" : "#fff", position: "relative" }}>
                          {plan.popular && <div style={{ position: "absolute", top: -8, right: 16, background: "#e94560", color: "#fff", fontSize: 9, fontWeight: 600, padding: "2px 8px", borderRadius: 4 }}>Popular</div>}
                          <div style={{ fontSize: 14, fontWeight: 500, color: "#1a1a2e", marginBottom: 4 }}>{plan.name}</div>
                          <div style={{ fontSize: 28, fontWeight: 300, color: "#1a1a2e", marginBottom: 12 }}>{plan.price}<span style={{ fontSize: 12, color: "#999", fontWeight: 300 }}>/mo</span></div>
                          {plan.features.map((f, j) => (
                            <div key={j} style={{ fontSize: 12, color: "#555", padding: "4px 0", fontWeight: 350 }}>âœ“ {f}</div>
                          ))}
                          <button style={{ width: "100%", marginTop: 14, padding: "8px 0", borderRadius: 6, border: plan.popular ? "none" : "1px solid #ddd", background: plan.popular ? "#e94560" : "#fff", color: plan.popular ? "#fff" : "#333", fontSize: 12, fontWeight: 450, cursor: "pointer" }}>Get Started</button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* More simulated content */}
                <div style={{ padding: "32px 32px", background: "#f5f5f5" }}>
                  <div style={{ fontSize: 16, color: "#333", fontWeight: 400, marginBottom: 12 }}>Why teams choose Apex</div>
                  <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr 1fr", gap: 16 }}>
                    {["99.9% Uptime SLA", "SOC 2 Certified", "24/7 Support"].map((item, i) => (
                      <div key={i} style={{ padding: 20, background: "#fff", borderRadius: 8, textAlign: "center" }}>
                        <div style={{ fontSize: 13, color: "#333", fontWeight: 450 }}>{item}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* â”€â”€â”€ FLOATING PERSONA BAR (float mode) â”€â”€â”€ */}
              {(browserView === "float") && (
                <div style={{ position: "absolute", bottom: 80, left: "50%", transform: "translateX(-50%)", width: mobile ? "90%" : 440, background: t.surface, borderRadius: 16, boxShadow: "0 8px 32px rgba(0,0,0,0.18)", border: `1px solid ${t.borderSubtle}`, padding: "10px 14px", display: "flex", flexDirection: "column", gap: 8, zIndex: 20 }}>
                  {/* Last message preview */}
                  <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                    <Av name={bPer?.name} s={22} t={t} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 10, fontWeight: 500, color: t.text, marginBottom: 2 }}>{bPer?.name}</div>
                      <div style={{ fontSize: 11, color: t.textSec, fontWeight: 350, lineHeight: 1.4 }}>Found the pricing section â€” Enterprise at $299/mo looks closest. I've highlighted it.</div>
                    </div>
                  </div>
                  {/* Input */}
                  <div style={{ display: "flex", alignItems: "center", gap: 8, background: t.surfaceAlt, borderRadius: 10, padding: "7px 10px" }}>
                    <input value={browserChatInput} onChange={e => setBrowserChatInput(e.target.value)} placeholder={`Ask ${bPer?.name}...`} style={{ flex: 1, border: "none", background: "none", outline: "none", fontSize: 12, color: t.text, fontWeight: 350 }} />
                    <Mic size={13} color={t.textFaint} style={{ cursor: "pointer" }} />
                    <ArrowUp size={13} color={t.textMuted} style={{ cursor: "pointer" }} />
                  </div>
                </div>
              )}

              {/* â”€â”€â”€ ICON-ONLY PERSONA DOT (icon mode) â”€â”€â”€ */}
              {browserView === "icon" && (
                <div onClick={() => setBrowserView("float")} style={{ position: "absolute", bottom: 80, right: 24, width: 44, height: 44, borderRadius: "50%", background: t.accent, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 4px 16px rgba(0,0,0,0.2)", zIndex: 20 }}>
                  <Av name={bPer?.name} s={34} t={{ ...t, surfaceAlt: "rgba(255,255,255,0.15)", textMuted: "#fff" }} />
                  <span style={{ position: "absolute", bottom: 0, right: 0, width: 10, height: 10, borderRadius: "50%", background: t.dot.active, border: `2px solid ${t.surface}` }} />
                </div>
              )}

              {/* â”€â”€â”€ FLOATING WEB NAV BAR â”€â”€â”€ */}
              {!browserNavMinimized && browserNavVisible && (
                <div style={{ position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center", gap: 6, background: "rgba(20,20,20,0.88)", backdropFilter: "blur(12px)", borderRadius: 14, padding: "7px 10px", zIndex: 30, boxShadow: "0 4px 20px rgba(0,0,0,0.25)" }}>
                  <button style={{ background: "none", border: "none", color: "rgba(255,255,255,0.6)", cursor: "pointer", display: "flex", padding: 4 }}><ArrowLeft size={14} /></button>
                  <button style={{ background: "none", border: "none", color: "rgba(255,255,255,0.6)", cursor: "pointer", display: "flex", padding: 4 }}><ArrowRight size={14} /></button>
                  <button style={{ background: "none", border: "none", color: "rgba(255,255,255,0.6)", cursor: "pointer", display: "flex", padding: 4 }}><RefreshCw size={12} /></button>
                  <div style={{ display: "flex", alignItems: "center", background: "rgba(255,255,255,0.1)", borderRadius: 8, padding: "4px 10px", flex: 1, minWidth: mobile ? 120 : 220 }}>
                    <Globe size={10} color="rgba(255,255,255,0.4)" style={{ marginRight: 6, flexShrink: 0 }} />
                    <input value={browserUrl} onChange={e => setBrowserUrl(e.target.value)} style={{ border: "none", background: "none", outline: "none", fontSize: 11, color: "rgba(255,255,255,0.8)", fontWeight: 350, width: "100%" }} />
                  </div>
                  {/* Co-browse actions */}
                  <button title="Highlight" style={{ background: "none", border: "none", color: "rgba(255,255,255,0.5)", cursor: "pointer", display: "flex", padding: 4 }}><Eye size={13} /></button>
                  <button title="Extract to Instance" style={{ background: "none", border: "none", color: "rgba(255,255,255,0.5)", cursor: "pointer", display: "flex", padding: 4 }}><Download size={13} /></button>
                  {/* View switcher */}
                  <div style={{ position: "relative" }}>
                    <button onClick={() => setBrowserViewMenu(!browserViewMenu)} title="Change View" style={{ background: "rgba(255,255,255,0.1)", border: "none", color: "rgba(255,255,255,0.7)", cursor: "pointer", display: "flex", padding: "4px 8px", borderRadius: 6, alignItems: "center", gap: 3, fontSize: 10 }}>
                      <Columns size={11} />{!mobile && <span>View</span>}<ChevronDown size={9} />
                    </button>
                    {browserViewMenu && (
                      <div style={{ position: "absolute", bottom: "100%", right: 0, marginBottom: 6, background: t.surface, border: `1px solid ${t.border}`, borderRadius: 12, padding: 6, minWidth: 200, boxShadow: "0 8px 24px rgba(0,0,0,0.2)", zIndex: 40 }}>
                        <div style={{ padding: "4px 10px 6px", fontSize: 10, color: t.textFaint, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>Chat Layout</div>
                        {viewOpts.map(v => (
                          <div key={v.id} onClick={() => { setBrowserView(v.id); setBrowserViewMenu(false); }} style={{ padding: "7px 10px", borderRadius: 7, cursor: "pointer", display: "flex", alignItems: "center", gap: 10, background: browserView === v.id ? t.surfaceAlt : "transparent" }}>
                            <span style={{ color: browserView === v.id ? t.accent : t.textFaint, display: "flex" }}>{v.icon}</span>
                            <div>
                              <div style={{ fontSize: 12, color: t.text, fontWeight: browserView === v.id ? 500 : 400 }}>{v.l}</div>
                              <div style={{ fontSize: 10, color: t.textFaint, fontWeight: 300 }}>{v.desc}</div>
                            </div>
                          </div>
                        ))}
                        <div style={{ borderTop: `1px solid ${t.borderSubtle}`, margin: "6px 0" }} />
                        <div onClick={() => { setBrowserNavMinimized(true); setBrowserViewMenu(false); }} style={{ padding: "6px 10px", borderRadius: 7, cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
                          <span style={{ color: t.textFaint, display: "flex" }}><Minimize2 size={13} /></span>
                          <div style={{ fontSize: 12, color: t.textMuted, fontWeight: 400 }}>Minimize nav to dot</div>
                        </div>
                        <div onClick={() => setBrowserMode("sessions")} style={{ padding: "6px 10px", borderRadius: 7, cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
                          <span style={{ color: t.textFaint, display: "flex" }}><History size={13} /></span>
                          <div style={{ fontSize: 12, color: t.textMuted, fontWeight: 400 }}>Sessions & History</div>
                        </div>
                      </div>
                    )}
                  </div>
                  {/* Minimize nav */}
                  <button onClick={() => setBrowserNavMinimized(true)} title="Minimize navigation" style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer", display: "flex", padding: 4 }}><Minimize2 size={11} /></button>
                </div>
              )}

              {/* â”€â”€â”€ MINIMIZED NAV DOT â”€â”€â”€ */}
              {browserNavMinimized && (
                <div onClick={() => setBrowserNavMinimized(false)} style={{ position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)", width: 36, height: 36, borderRadius: "50%", background: "rgba(20,20,20,0.85)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 30, boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }}>
                  <Compass size={16} color="rgba(255,255,255,0.7)" />
                </div>
              )}

              {/* â”€â”€â”€ PAGE AWARENESS INDICATOR â”€â”€â”€ */}
              {browserPageAware && (
                <div style={{ position: "absolute", top: 8, right: 8, display: "flex", alignItems: "center", gap: 6, background: "rgba(46,149,243,0.9)", borderRadius: 8, padding: "4px 10px", zIndex: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>
                  <Eye size={10} color="#fff" />
                  <span style={{ fontSize: 9, color: "#fff", fontWeight: 500 }}>{bPer?.name} is reading this page</span>
                  <button onClick={() => setBrowserPageAware(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.6)", display: "flex", padding: 1 }}><X size={9} /></button>
                </div>
              )}
            </div>
          )}

          {/* â”€â”€â”€ UNIFIED RIGHT SIDEBAR: Tabs + Chat â”€â”€â”€ */}
          {(showChatPanel || showWebView) && browserView !== "float" && browserView !== "icon" && (
            <div style={{ width: browserView === "chatonly" ? "100%" : browserView === "split" ? "50%" : 320, borderLeft: showWebView ? `1px solid ${t.borderSubtle}` : "none", background: t.surface, display: "flex", flexDirection: "column", height: "100%", flexShrink: 0 }}>

              {/* â”€â”€ Compact tab strip (horizontal favicons) â”€â”€ */}
              {showWebView && (
                <div style={{ flexShrink: 0, borderBottom: `1px solid ${t.borderSubtle}`, padding: "6px 12px", display: "flex", alignItems: "center", gap: 6, position: "relative" }}>
                  {browserTabs.map(tab => (
                    <div key={tab.id} onClick={() => { setActiveBrowserTab(tab.id); setBrowserUrl(tab.url); setBrowserTabListPopup(false); }} title={tab.title}
                      style={{
                        width: 26, height: 26, borderRadius: 6, background: tab.color, display: "flex", alignItems: "center", justifyContent: "center",
                        cursor: "pointer", flexShrink: 0,
                        outline: activeBrowserTab === tab.id ? `2px solid ${t.accent}` : "2px solid transparent",
                        outlineOffset: 1, opacity: activeBrowserTab === tab.id ? 1 : 0.55,
                        transition: "opacity 0.15s ease, outline 0.15s ease",
                      }}>
                      <span style={{ color: "#fff", fontSize: 10, fontWeight: 700 }}>{tab.favicon}</span>
                    </div>
                  ))}
                  <div style={{ flex: 1 }} />
                  <button title="New tab" style={{ background: "none", border: `1px dashed ${t.border}`, color: t.textFaint, cursor: "pointer", display: "flex", padding: 3, borderRadius: 6, width: 26, height: 26, alignItems: "center", justifyContent: "center" }}><Plus size={11} /></button>
                  <button onClick={() => setBrowserTabListPopup(!browserTabListPopup)} title="Show tab names" style={{ background: "none", border: "none", color: t.textFaint, cursor: "pointer", display: "flex", padding: 3 }}><Maximize2 size={12} /></button>
                  {/* Floating tab name list */}
                  {browserTabListPopup && (
                    <div style={{ position: "absolute", top: "100%", left: 12, marginTop: 4, background: t.surface, border: `1px solid ${t.border}`, borderRadius: 10, padding: 6, minWidth: 240, boxShadow: "0 8px 24px rgba(0,0,0,0.18)", zIndex: 50 }}>
                      {browserTabs.map(tab => (
                        <div key={tab.id} onClick={() => { setActiveBrowserTab(tab.id); setBrowserUrl(tab.url); setBrowserTabListPopup(false); }}
                          style={{ padding: "7px 10px", borderRadius: 7, cursor: "pointer", display: "flex", alignItems: "center", gap: 10, background: activeBrowserTab === tab.id ? t.surfaceAlt : "transparent" }}>
                          <div style={{ width: 20, height: 20, borderRadius: 5, background: tab.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <span style={{ color: "#fff", fontSize: 9, fontWeight: 700 }}>{tab.favicon}</span>
                          </div>
                          <div style={{ fontSize: 11, color: activeBrowserTab === tab.id ? t.text : t.textMuted, fontWeight: activeBrowserTab === tab.id ? 450 : 350, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{tab.title}</div>
                          {activeBrowserTab === tab.id && <span style={{ marginLeft: "auto", width: 5, height: 5, borderRadius: "50%", background: t.accent, flexShrink: 0 }} />}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* â”€â”€ Persona header (compact) â”€â”€ */}
              <div style={{ padding: "10px 14px", borderBottom: `1px solid ${t.borderSubtle}`, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Av name={bPer?.name} s={22} t={t} />
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 500, color: t.text }}>{bPer?.name}</div>
                    <div style={{ fontSize: 9, color: t.dot.active, fontWeight: 400 }}>Co-browsing Â· Page aware</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
                  <div style={{ position: "relative" }}>
                    <button onClick={() => setBrowserViewMenu2(!browserViewMenu2)} title="Change View" style={{ background: browserView === "chatonly" ? t.surfaceAlt : "none", border: "none", color: t.textFaint, cursor: "pointer", display: "flex", padding: "3px 5px", borderRadius: 5, alignItems: "center", gap: 2 }}>
                      <Columns size={12} />{browserView === "chatonly" && <span style={{ fontSize: 10, color: t.textMuted }}>View</span>}<ChevronDown size={9} />
                    </button>
                    {browserViewMenu2 && (
                      <div style={{ position: "absolute", top: "100%", right: 0, marginTop: 4, background: t.surface, border: `1px solid ${t.border}`, borderRadius: 12, padding: 6, minWidth: 200, boxShadow: "0 8px 24px rgba(0,0,0,0.2)", zIndex: 40 }}>
                        <div style={{ padding: "4px 10px 6px", fontSize: 10, color: t.textFaint, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>Chat Layout</div>
                        {viewOpts.map(v => (
                          <div key={v.id} onClick={() => { setBrowserView(v.id); setBrowserViewMenu2(false); }} style={{ padding: "7px 10px", borderRadius: 7, cursor: "pointer", display: "flex", alignItems: "center", gap: 10, background: browserView === v.id ? t.surfaceAlt : "transparent" }}>
                            <span style={{ color: browserView === v.id ? t.accent : t.textFaint, display: "flex" }}>{v.icon}</span>
                            <div>
                              <div style={{ fontSize: 12, color: t.text, fontWeight: browserView === v.id ? 500 : 400 }}>{v.l}</div>
                              <div style={{ fontSize: 10, color: t.textFaint, fontWeight: 300 }}>{v.desc}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <button onClick={() => { const pa = PERSONAS.filter(p => p.id !== browserPersona); if (pa.length) setBrowserPersona(pa[0].id); }} title="Switch Persona" style={{ background: "none", border: "none", color: t.textFaint, cursor: "pointer", display: "flex", padding: 3 }}><Users size={13} /></button>
                  <button onClick={() => setBrowserMode("sessions")} title="Sessions" style={{ background: "none", border: "none", color: t.textFaint, cursor: "pointer", display: "flex", padding: 3 }}><History size={13} /></button>
                </div>
              </div>

              {/* â”€â”€ Chat messages â”€â”€ */}
              <div style={{ flex: 1, overflowY: "auto", padding: "12px 14px" }}>
                {browserChat.map(m => {
                  const isUser = m.sender === "You";
                  const mPer = m.persona ? PERSONAS.find(p => p.id === m.persona) : null;
                  return (
                    <div key={m.id} style={{ marginBottom: 14, display: "flex", gap: 8 }}>
                      {isUser ? <Av name="B" s={20} t={t} /> : <Av name={mPer?.name} s={20} t={t} />}
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 11, fontWeight: 500, color: t.text, marginBottom: 2 }}>{m.sender}</div>
                        <div style={{ fontSize: 12, color: t.textSec, fontWeight: 350, lineHeight: 1.5 }}>{m.text}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* â”€â”€ Composer â”€â”€ */}
              <div style={{ padding: "10px 14px", borderTop: `1px solid ${t.borderSubtle}`, flexShrink: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, background: t.surfaceAlt, borderRadius: 10, padding: "8px 10px" }}>
                  <input value={browserChatInput} onChange={e => setBrowserChatInput(e.target.value)} placeholder={`Ask ${bPer?.name} about this page...`} style={{ flex: 1, border: "none", background: "none", outline: "none", fontSize: 12, color: t.text, fontWeight: 350 }} />
                  <Mic size={13} color={t.textFaint} style={{ cursor: "pointer" }} />
                  <Paperclip size={13} color={t.textFaint} style={{ cursor: "pointer" }} />
                  <ArrowUp size={13} color={t.textMuted} style={{ cursor: "pointer" }} />
                </div>
                <div style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
                  {["Summarize page", "Extract pricing", "Find contact info", "Compare to Instance"].map((q, i) => (
                    <button key={i} style={{ padding: "3px 8px", borderRadius: 6, fontSize: 10, border: `1px solid ${t.border}`, background: "none", color: t.textMuted, cursor: "pointer", fontWeight: 350 }}>{q}</button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }

    // â”€â”€â”€ INSIGHTS & ANALYTICS SCREEN â”€â”€â”€
    // Components: InsightsTabs (Overview/PersonaPerformance/ModelUsage/MemoryHealth),
    //   OverviewMetricCards (Conversations/PersonaUtil/MemoryGrowth/TopModel),
    //   PersonaPerformanceTable (memories/decisions/skills per persona),
    //   ModelUsageBars (percentage/calls/cost per model),
    //   MemoryHealthGrid (Total/Decisions/Facts/Preferences/Skills/Flagged counts)
    if (screen === "insights") return (
      <div style={{ padding: `${py}px ${px}px`, overflowY: "auto", height: "100%" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 22, fontWeight: 300, color: t.text, letterSpacing: "-0.03em" }}>Insights & Analytics</div>
            <div style={{ fontSize: 13, color: t.textMuted, fontWeight: 300, marginTop: 4 }}>Understand how you and your Personas work together.</div>
          </div>
          <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
            {[{ id: "overview", l: "Overview" }, { id: "personas", l: "Persona Performance" }, { id: "models", l: "Model Usage" }, { id: "memory", l: "Memory Health" }].map(tab => (
              <button key={tab.id} onClick={() => setInsightsTab(tab.id)} style={{ padding: "6px 14px", borderRadius: 20, fontSize: 11, cursor: "pointer", fontWeight: 400, border: "none", background: insightsTab === tab.id ? t.accent : t.surfaceAlt, color: insightsTab === tab.id ? t.accentText : t.textMuted }}>{tab.l}</button>
            ))}
          </div>
          {insightsTab === "overview" && (
            <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr 1fr" : "1fr 1fr 1fr 1fr", gap: 12, marginBottom: 28 }}>
              {Object.values(INSIGHTS_DATA).map((m, i) => (
                <div key={i} style={{ padding: 16, background: t.surface, border: `1px solid ${t.borderSubtle}`, borderRadius: 10 }}>
                  <div style={{ fontSize: 10, color: t.textMuted, fontWeight: 400, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>{m.label}</div>
                  <div style={{ fontSize: 26, fontWeight: 200, color: t.text, letterSpacing: "-0.03em", lineHeight: 1 }}>{m.value}</div>
                  <div style={{ fontSize: 10, color: t.dot.active, fontWeight: 400, marginTop: 6 }}>{m.trend}</div>
                </div>
              ))}
            </div>
          )}
          {insightsTab === "personas" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {PERSONAS.map(p => (
                <div key={p.id} style={{ padding: "14px 18px", background: t.surface, border: `1px solid ${t.borderSubtle}`, borderRadius: 12, display: "flex", alignItems: "center", gap: 14 }}>
                  <Av name={p.name} s={36} t={t} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 450, color: t.text }}>{p.name} <span style={{ fontWeight: 300, color: t.textMuted }}>Â· {p.role}</span></div>
                    <div style={{ display: "flex", gap: 20, marginTop: 6, fontSize: 11 }}>
                      <span style={{ color: t.textMuted }}><span style={{ fontWeight: 450, color: t.text }}>{p.memories}</span> memories</span>
                      <span style={{ color: t.textMuted }}><span style={{ fontWeight: 450, color: t.text }}>{p.decisions}</span> decisions</span>
                      <span style={{ color: t.textMuted }}><span style={{ fontWeight: 450, color: t.text }}>{p.skills}/{p.maxSkills}</span> skills</span>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <Dot status={p.status} t={t} s={6} />
                    <div style={{ fontSize: 10, color: t.textFaint, marginTop: 4 }}>{p.lastUpdate}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {insightsTab === "models" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[{ name: "Claude Sonnet", pct: 62, calls: 145, cost: "$4.30" }, { name: "Claude Opus", pct: 21, calls: 49, cost: "$8.12" }, { name: "GPT-4o", pct: 11, calls: 26, cost: "$2.10" }, { name: "DALL-E 3", pct: 4, calls: 9, cost: "$1.35" }, { name: "Gemini 2.5", pct: 2, calls: 5, cost: "$0.18" }].map((m, i) => (
                <div key={i} style={{ padding: "12px 18px", background: t.surface, border: `1px solid ${t.borderSubtle}`, borderRadius: 10, display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 44, textAlign: "right", fontSize: 20, fontWeight: 200, color: t.text }}>{m.pct}%</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 400, color: t.text, marginBottom: 4 }}>{m.name}</div>
                    <div style={{ height: 3, borderRadius: 2, background: t.surfaceAlt, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${m.pct}%`, background: t.accent, borderRadius: 2 }} />
                    </div>
                  </div>
                  <div style={{ textAlign: "right", fontSize: 11 }}>
                    <div style={{ color: t.text, fontWeight: 400 }}>{m.calls} calls</div>
                    <div style={{ color: t.textFaint, fontSize: 10 }}>{m.cost}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {insightsTab === "memory" && (
            <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: 12 }}>
              {[{ l: "Total Memories", v: "746", sub: "Across all Personas" }, { l: "Decisions", v: "138", sub: "28 this week" }, { l: "Facts", v: "312", sub: "Most stable category" }, { l: "Preferences", v: "189", sub: "12 updated recently" }, { l: "Skills Learned", v: "107", sub: "Avg 7.1 per Persona" }, { l: "Flagged for Review", v: "4", sub: "2 conflicts detected" }].map((m, i) => (
                <div key={i} style={{ padding: 16, background: t.surface, border: `1px solid ${t.borderSubtle}`, borderRadius: 10 }}>
                  <div style={{ fontSize: 10, color: t.textMuted, fontWeight: 400, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>{m.l}</div>
                  <div style={{ fontSize: 28, fontWeight: 200, color: t.text, letterSpacing: "-0.03em", lineHeight: 1 }}>{m.v}</div>
                  <div style={{ fontSize: 10, color: t.textFaint, marginTop: 4 }}>{m.sub}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );

    // â”€â”€â”€ SETTINGS SCREEN â”€â”€â”€
    // Components: SettingsTabs (General/Models/Integrations/Account/Data/Cleanup),
    //   GeneralSettings (Theme/Notifications/DefaultModel/PrivacyMode),
    //   ModelSettings (RoleAssignment grid, APIKeys list, KeyForm),
    //   IntegrationsSettings (ProTierGate, ConnectedServicesList),
    //   AccountSettings (ProfileCard/PlanDisplay/TierUpgrade),
    //   DataSettings (ExportAll/ClearMemory/DeleteAccount),
    //   CleanupSettings (AutoRename/SuggestedMoves/ScheduledCleanup/FrequencySelector),
    //   LearnedRules (instance-specific auto-generated behaviors)
    if (screen === "settings") {
      const stabs = [
        { id: "general", l: "General" },
        { id: "models", l: "Models" },
        { id: "keys", l: "API Keys" },
        { id: "types", l: "Types" },
        { id: "hierarchy", l: "Cascade" },
        { id: "learned", l: "Learned Rules" },
      ];
      const filtIm = imFilter === "all" ? INSTRUCTION_MEMORY : INSTRUCTION_MEMORY.filter(r => imFilter === "active" ? r.active : !r.active);
      return (
        <div style={{ display: "flex", flexDirection: "column", height: "100%", maxWidth: 800, margin: "0 auto", width: "100%" }}>
          <div style={{ padding: `${py}px ${px}px 0`, flexShrink: 0 }}>
            <div style={{ fontSize: 28, fontWeight: 300, color: t.text, letterSpacing: "-0.03em", marginBottom: 28 }}>Settings</div>
            <div style={{ display: "flex", gap: mobile ? 14 : 20, borderBottom: `1px solid ${t.borderSubtle}`, overflowX: "auto" }}>
              {stabs.map(tab => (
                <button key={tab.id} onClick={() => setSettingsTab(tab.id)} style={{
                  padding: "0 0 12px", fontSize: 13, fontWeight: settingsTab === tab.id ? 500 : 350,
                  color: settingsTab === tab.id ? t.text : t.textMuted, background: "none", border: "none",
                  borderBottom: settingsTab === tab.id ? `1.5px solid ${t.accent}` : "1.5px solid transparent",
                  cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0
                }}>{tab.l}</button>
              ))}
            </div>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: `24px ${px}px ${py}px` }}>

            {/* GENERAL */}
            {settingsTab === "general" && (<>
              {/* Progressive Disclosure */}
              <div style={{ padding: "18px 0", borderBottom: `1px solid ${t.borderSubtle}`, display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ color: t.textFaint }}><Sliders size={18} /></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, color: t.text, fontWeight: 450 }}>Interface Mode</div>
                  <div style={{ fontSize: 13, color: t.textMuted, marginTop: 2, fontWeight: 300 }}>{powerUser ? "Power User â€” all features visible" : "Standard â€” simplified interface"}</div>
                </div>
                <div style={{ display: "flex", background: t.surfaceAlt, borderRadius: 8, overflow: "hidden" }}>
                  <button onClick={() => setPowerUser(false)} style={{ padding: "5px 12px", fontSize: 11, border: "none", cursor: "pointer", background: !powerUser ? t.accent : "transparent", color: !powerUser ? t.accentText : t.textMuted, fontWeight: 400 }}>Standard</button>
                  <button onClick={() => setPowerUser(true)} style={{ padding: "5px 12px", fontSize: 11, border: "none", cursor: "pointer", background: powerUser ? t.accent : "transparent", color: powerUser ? t.accentText : t.textMuted, fontWeight: 400 }}>Power</button>
                </div>
              </div>
              {[
                { l: "Account", d: "Bob Â· bob@email.com", i: <User size={18} /> },
              ].map((item, i) => (
                <div key={i} style={{ padding: "18px 0", borderBottom: `1px solid ${t.borderSubtle}`, display: "flex", alignItems: "center", gap: 16, cursor: "pointer" }}>
                  <div style={{ color: t.textFaint }}>{item.i}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, color: t.text, fontWeight: 450 }}>{item.l}</div>
                    <div style={{ fontSize: 13, color: t.textMuted, marginTop: 2, fontWeight: 300 }}>{item.d}</div>
                  </div>
                  <ChevronRight size={16} color={t.textFaint} />
                </div>
              ))}
              {/* Billing / Tier */}
              <div style={{ padding: "18px 0", borderBottom: `1px solid ${t.borderSubtle}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16, cursor: "pointer" }}>
                  <div style={{ color: t.textFaint }}><CreditCard size={18} /></div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, color: t.text, fontWeight: 450 }}>Billing</div>
                    <div style={{ fontSize: 13, color: t.textMuted, marginTop: 2, fontWeight: 300 }}>Pro Â· $99.99/mo</div>
                  </div>
                  <button onClick={() => setShowUpgrade(true)} style={{ background: "none", border: `1px solid ${t.border}`, borderRadius: 6, padding: "4px 12px", fontSize: 11, color: t.textMuted, cursor: "pointer" }}>Compare Plans</button>
                </div>
                <div style={{ marginTop: 12, paddingLeft: 34, display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <div style={{ padding: "6px 12px", background: t.surfaceAlt, borderRadius: 8, fontSize: 12 }}>
                    <span style={{ color: t.textMuted }}>BYOK:</span> <span style={{ color: t.dot.active, fontWeight: 400 }}>Active</span>
                  </div>
                  <div style={{ padding: "6px 12px", background: t.surfaceAlt, borderRadius: 8, fontSize: 12 }}>
                    <span style={{ color: t.textMuted }}>Credits:</span> <span style={{ color: t.text, fontWeight: 400 }}>2,450 remaining</span>
                  </div>
                </div>
                {/* Feature gating indicators */}
                <div style={{ marginTop: 10, paddingLeft: 34, display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {[{ l: "Agentic Teams", tier: "Premium+" }, { l: "Browser", tier: "Pro" }, { l: "Encrypted Export", tier: "Pro" }, { l: "API Access", tier: "Pro" }].map((g, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 4, padding: "3px 8px", background: t.surfaceAlt, borderRadius: 6, fontSize: 10, color: t.textFaint }}>
                      <Shield size={8} />{g.l} <span style={{ color: t.dot.active, fontWeight: 450 }}>âœ“</span>
                    </div>
                  ))}
                </div>
              </div>
              {[
                { l: "Voice & Tone", d: "Professional, warm", i: <Volume2 size={18} />, tier: null },
                { l: "Storage", d: "134 GB of 200 GB", i: <HardDrive size={18} />, tier: null },
                { l: "Integrations", d: "3 connected", i: <Link2 size={18} />, tier: "Pro" },
              ].map((item, i) => (
                <div key={i} style={{ padding: "18px 0", borderBottom: `1px solid ${t.borderSubtle}`, display: "flex", alignItems: "center", gap: 16, cursor: "pointer" }}>
                  <div style={{ color: t.textFaint }}>{item.i}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, color: t.text, fontWeight: 450, display: "flex", alignItems: "center", gap: 6 }}>{item.l}{item.tier && <span style={{ fontSize: 8, padding: "1px 5px", borderRadius: 4, background: "#2e95f3", color: "#fff", fontWeight: 600 }}>{item.tier}</span>}</div>
                    <div style={{ fontSize: 13, color: t.textMuted, marginTop: 2, fontWeight: 300 }}>{item.d}</div>
                  </div>
                  <ChevronRight size={16} color={t.textFaint} />
                </div>
              ))}
              {/* System Intelligence */}
              <div style={{ marginTop: 20, padding: "14px 16px", background: t.surfaceAlt, borderRadius: 10 }}>
                <div style={{ fontSize: 13, fontWeight: 450, color: t.text, marginBottom: 10 }}>System Intelligence</div>
                {[{ l: "Show routing notes", desc: "Display Cipher routing decisions in chat" }, { l: "Show memory extraction", desc: "Indicate when memories are saved from messages" }].map((toggle, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0" }}>
                    <div><div style={{ fontSize: 12, color: t.text, fontWeight: 400 }}>{toggle.l}</div><div style={{ fontSize: 10, color: t.textMuted, fontWeight: 300 }}>{toggle.desc}</div></div>
                    <button style={{ background: "none", border: "none", cursor: "pointer", color: t.dot.active, display: "flex" }}><ToggleRight size={18} /></button>
                  </div>
                ))}
              </div>
              {/* Onboarding replay */}
              <div style={{ marginTop: 16, padding: "12px 16px", background: t.surfaceAlt, borderRadius: 10, display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }} onClick={() => { setShowOnboarding(true); setObStep(0); }}>
                <div><div style={{ fontSize: 13, fontWeight: 400, color: t.text }}>Replay Welcome Tour</div><div style={{ fontSize: 11, color: t.textMuted, fontWeight: 300 }}>See the product walkthrough again</div></div>
                <ChevronRight size={14} color={t.textFaint} />
              </div>
              {/* Chat Cleanup & Organization */}
              <div style={{ marginTop: 20, padding: "14px 16px", background: t.surfaceAlt, borderRadius: 10 }}>
                <div style={{ fontSize: 13, fontWeight: 450, color: t.text, marginBottom: 10 }}>Chat Cleanup & Organization</div>
                {[{ l: "Auto-rename conversations", desc: "Suggest better names after context is established", on: true }, { l: "Suggest moves to Instances", desc: "Prompt to move chats matching an existing Instance", on: true }, { l: "Scheduled cleanup", desc: "Background scan for unorganized conversations", on: false }].map((toggle, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0" }}>
                    <div><div style={{ fontSize: 12, color: t.text, fontWeight: 400 }}>{toggle.l}</div><div style={{ fontSize: 10, color: t.textMuted, fontWeight: 300 }}>{toggle.desc}</div></div>
                    <button style={{ background: "none", border: "none", cursor: "pointer", color: toggle.on ? t.dot.active : t.textFaint, display: "flex" }}>{toggle.on ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}</button>
                  </div>
                ))}
                <div style={{ marginTop: 8, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0" }}>
                  <div><div style={{ fontSize: 12, color: t.text, fontWeight: 400 }}>Cleanup frequency</div><div style={{ fontSize: 10, color: t.textMuted, fontWeight: 300 }}>How often the background scan runs</div></div>
                  <div style={{ display: "flex", gap: 4 }}>
                    {["Hourly", "Daily", "Weekly"].map((f, i) => (
                      <button key={f} style={{ padding: "3px 8px", borderRadius: 5, fontSize: 10, border: i === 1 ? "none" : `1px solid ${t.border}`, background: i === 1 ? t.accent : "none", color: i === 1 ? t.accentText : t.textMuted, cursor: "pointer" }}>{f}</button>
                    ))}
                  </div>
                </div>
              </div>
            </>)}

            {/* MODELS */}
            {settingsTab === "models" && (<>
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 14, color: t.text, fontWeight: 450, marginBottom: 4 }}>Role Assignments</div>
                <div style={{ fontSize: 12, color: t.textMuted, fontWeight: 300 }}>Each role routes to a primary model with an automatic fallback.</div>
              </div>
              {MODEL_ROLES.map((r, i) => (
                <div key={i} style={{ padding: "16px 0", borderBottom: `1px solid ${t.borderSubtle}`, display: "flex", alignItems: mobile ? "flex-start" : "center", gap: 14, flexDirection: mobile ? "column" : "row" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 110 }}>
                    <span style={{ color: t.textFaint }}>{r.icon}</span>
                    <span style={{ fontSize: 14, color: t.text, fontWeight: 450 }}>{r.role}</span>
                  </div>
                  <div style={{ flex: 1, display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                    <div style={{ padding: "6px 14px", background: t.surfaceAlt, borderRadius: 8, fontSize: 12, color: t.text, fontWeight: 400, display: "flex", alignItems: "center", gap: 6 }}>
                      {r.primary}<span style={{ fontSize: 9, color: t.textFaint, fontWeight: 300 }}>primary</span>
                    </div>
                    <ArrowRight size={12} color={t.textFaint} />
                    <div style={{ padding: "6px 14px", background: "transparent", border: `1px solid ${t.border}`, borderRadius: 8, fontSize: 12, color: t.textMuted, fontWeight: 350, display: "flex", alignItems: "center", gap: 6 }}>
                      {r.fallback}<span style={{ fontSize: 9, color: t.textFaint, fontWeight: 300 }}>fallback</span>
                    </div>
                  </div>
                  <span style={{ fontSize: 10, color: t.textFaint, fontWeight: 300 }}>{r.provider}</span>
                </div>
              ))}
              <button style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 5, background: "none", border: `1px dashed ${t.border}`, borderRadius: 8, padding: "8px 16px", fontSize: 12, color: t.textMuted, cursor: "pointer" }}><Plus size={12} />Add Custom Role</button>
            </>)}

            {/* API KEYS */}
            {settingsTab === "keys" && (<>
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 14, color: t.text, fontWeight: 450, marginBottom: 4 }}>BYOK â€” Bring Your Own Keys</div>
                <div style={{ fontSize: 12, color: t.textMuted, fontWeight: 300 }}>Connect your own API keys for direct model access. Keys are encrypted at rest.</div>
              </div>
              {API_KEYS.map(k => (
                <div key={k.id} style={{ padding: "16px 0", borderBottom: `1px solid ${t.borderSubtle}`, display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: t.surfaceAlt, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Cpu size={16} color={t.textMuted} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, color: t.text, fontWeight: 450, display: "flex", alignItems: "center", gap: 8 }}>
                      {k.label}
                      <Dot status={k.status === "active" ? "active" : "sleeping"} t={t} s={6} />
                    </div>
                    <div style={{ fontSize: 11, color: t.textMuted, marginTop: 2, fontWeight: 300, display: "flex", gap: 10 }}>
                      <span style={{ fontFamily: "monospace", fontSize: 10 }}>{k.masked}</span>
                      <span>Last used: {k.lastUsed}</span>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button style={{ background: "none", border: `1px solid ${t.border}`, borderRadius: 6, padding: "4px 10px", fontSize: 11, color: t.textMuted, cursor: "pointer" }}>Edit</button>
                    <button style={{ background: "none", border: `1px solid ${t.border}`, borderRadius: 6, padding: "4px 10px", fontSize: 11, color: "#ef4444", cursor: "pointer" }}>Remove</button>
                  </div>
                </div>
              ))}
              <button style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 5, background: "none", border: `1px dashed ${t.border}`, borderRadius: 8, padding: "8px 16px", fontSize: 12, color: t.textMuted, cursor: "pointer" }}><Plus size={12} />Add API Key</button>
            </>)}

            {/* TYPES */}
            {settingsTab === "types" && (<>
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 14, color: t.text, fontWeight: 450, marginBottom: 4 }}>Instance Types</div>
                <div style={{ fontSize: 12, color: t.textMuted, fontWeight: 300 }}>Types provide default settings that all Instances of that type inherit.</div>
              </div>
              {TYPE_TEMPLATES.map(tp => (
                <div key={tp.id} style={{ padding: "18px 0", borderBottom: `1px solid ${t.borderSubtle}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <div>
                      <div style={{ fontSize: 15, color: t.text, fontWeight: 450 }}>{tp.name}</div>
                      <div style={{ fontSize: 12, color: t.textMuted, marginTop: 2, fontWeight: 300 }}>{tp.instances} instances</div>
                    </div>
                    <button style={{ background: "none", border: `1px solid ${t.border}`, borderRadius: 6, padding: "4px 12px", fontSize: 11, color: t.textMuted, cursor: "pointer" }}>Edit Defaults</button>
                  </div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {Object.entries(tp.defaults).map(([k, v]) => (
                      <span key={k} style={{ padding: "3px 10px", background: t.surfaceAlt, borderRadius: 8, fontSize: 11, color: t.textSec, fontWeight: 350 }}>
                        <span style={{ color: t.textFaint, textTransform: "capitalize" }}>{k}:</span> {v}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
              <button style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 5, background: "none", border: `1px dashed ${t.border}`, borderRadius: 8, padding: "8px 16px", fontSize: 12, color: t.textMuted, cursor: "pointer" }}><Plus size={12} />Create New Type</button>
            </>)}

            {/* CASCADE */}
            {settingsTab === "hierarchy" && (<>
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 14, color: t.text, fontWeight: 450, marginBottom: 4 }}>Settings Cascade</div>
                <div style={{ fontSize: 12, color: t.textMuted, fontWeight: 300 }}>Each layer inherits from above and can override. Lower layers take precedence.</div>
              </div>
              {SETTINGS_CASCADE.map((layer, li) => (
                <div key={li} style={{ marginBottom: 2 }}>
                  <div onClick={() => setCascadeOpen(p => ({ ...p, [li]: !p[li] }))}
                    style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 16px", background: t.surfaceAlt, borderRadius: cascadeOpen[li] ? "10px 10px 0 0" : 10, cursor: "pointer" }}>
                    <div style={{ width: 24, height: 24, borderRadius: "50%", background: t.accent, color: t.accentText, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, flexShrink: 0 }}>{li + 1}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, color: t.text, fontWeight: 450 }}>{layer.layer}</div>
                      <div style={{ fontSize: 11, color: t.textMuted, fontWeight: 300 }}>{layer.desc}</div>
                    </div>
                    <ChevronRight size={14} color={t.textFaint} style={{ transform: cascadeOpen[li] ? "rotate(90deg)" : "none", transition: "transform 0.15s" }} />
                  </div>
                  {cascadeOpen[li] && (
                    <div style={{ padding: "12px 16px 12px 50px", background: t.surfaceAlt, borderRadius: "0 0 10px 10px", borderTop: `1px solid ${t.borderSubtle}` }}>
                      {layer.items.map((item, ii) => (
                        <div key={ii} style={{ padding: "5px 0", fontSize: 12, color: t.textSec, fontWeight: 350, display: "flex", alignItems: "center", gap: 6 }}>
                          <span style={{ width: 4, height: 4, borderRadius: 2, background: t.textFaint, flexShrink: 0 }} />{item}
                        </div>
                      ))}
                    </div>
                  )}
                  {li < SETTINGS_CASCADE.length - 1 && (
                    <div style={{ display: "flex", justifyContent: "center", padding: "4px 0" }}>
                      <ChevronDown size={14} color={t.textFaint} />
                    </div>
                  )}
                </div>
              ))}
              <div style={{ marginTop: 20, padding: "14px 16px", background: t.surfaceAlt, borderRadius: 10 }}>
                <div style={{ fontSize: 12, fontWeight: 450, color: t.text, marginBottom: 6 }}>What's active for "Client Website Redesign"?</div>
                <div style={{ fontSize: 11, color: t.textSec, fontWeight: 350, lineHeight: 1.6 }}>
                  Voice: Professional (from Type: Business) Â· Personality: Collaborative (Custom override) Â· Storage: Local + Drive (Custom override) Â· Cleanup: Weekly (from Global)
                </div>
              </div>
            </>)}

            {/* LEARNED RULES */}
            {settingsTab === "learned" && (<>
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 14, color: t.text, fontWeight: 450, marginBottom: 4 }}>Instruction Memory</div>
                <div style={{ fontSize: 12, color: t.textMuted, fontWeight: 300 }}>Rules learned from your interactions. Toggle or remove rules that aren't helping.</div>
              </div>
              <div style={{ display: "flex", gap: 5, marginBottom: 20 }}>
                {[{ id: "all", l: "All" }, { id: "active", l: "Active" }, { id: "inactive", l: "Inactive" }].map(f => (
                  <button key={f.id} onClick={() => setImFilter(f.id)} style={{ padding: "4px 11px", borderRadius: 20, fontSize: 11, border: "none", cursor: "pointer", background: imFilter === f.id ? t.accent : t.surfaceAlt, color: imFilter === f.id ? t.accentText : t.textMuted }}>{f.l}</button>
                ))}
              </div>
              {filtIm.map(rule => (
                <div key={rule.id} style={{ padding: "16px 0", borderBottom: `1px solid ${t.borderSubtle}`, display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <button onClick={() => {}} style={{ marginTop: 2, background: "none", border: "none", cursor: "pointer", color: rule.active ? t.dot.active : t.textFaint, display: "flex", flexShrink: 0 }}>
                    {rule.active ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
                  </button>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, color: rule.active ? t.text : t.textMuted, fontWeight: 400, lineHeight: 1.5, textDecoration: rule.active ? "none" : "line-through", opacity: rule.active ? 1 : 0.6 }}>{rule.rule}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 10, padding: "2px 8px", background: t.surfaceAlt, borderRadius: 8, color: t.textMuted }}>{rule.scope}</span>
                      <span style={{ fontSize: 10, color: t.textFaint }}>from {rule.source}</span>
                      <span style={{ fontSize: 10, color: t.textFaint }}>{rule.date}</span>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
                    <button style={{ background: "none", border: "none", color: t.textFaint, cursor: "pointer", display: "flex", padding: 3 }}><Edit3 size={12} /></button>
                    <button style={{ background: "none", border: "none", color: t.textFaint, cursor: "pointer", display: "flex", padding: 3 }}><Trash2 size={12} /></button>
                  </div>
                </div>
              ))}
            </>)}

          </div>
        </div>
      );
    }

    return null;
  };

  // â”€â”€â”€ RIGHT PANEL (Chat screen only) â”€â”€â”€
  // Components: RightPanelTabs (Nav/Filters/Pinned/People),
  //   ChatNavigatorPanel, FiltersPanel (chips + search + export),
  //   PinnedMessagesPanel, PeoplePanel (participants + add/remove)
  const renderRight = () => {
    if (screen !== "chat") return null;
    const filterChips = [
      { id: "all", label: "All" }, { id: "sent", label: "Sent" }, { id: "received", label: "Received" },
      { id: "pinned", label: "Pinned" }, { id: "links", label: "Links" }, { id: "media", label: "Media" },
    ];
    const toggleFilter = (id) => {
      if (id === "all") { setFilters({ all: true, sent: false, received: false, pinned: false, links: false, media: false }); }
      else { setFilters(p => { const n = { ...p, [id]: !p[id], all: false }; if (!n.sent && !n.received && !n.pinned && !n.links && !n.media) n.all = true; return n; }); }
    };
    return (
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <div style={{ display: "flex", borderBottom: `1px solid ${t.borderSubtle}` }}>
          {[{ id: "chatnav", l: "Nav" }, { id: "filters", l: "Filters" }, { id: "pinned", l: "Pinned" }, { id: "people", l: "People" }].map(tab => (
            <button key={tab.id} onClick={() => setRPanel(tab.id)} style={{
              flex: 1, padding: "11px 0", fontSize: 11, fontWeight: rPanel === tab.id ? 500 : 350,
              color: rPanel === tab.id ? t.text : t.textMuted, background: "none", border: "none",
              borderBottom: rPanel === tab.id ? `1.5px solid ${t.accent}` : "1.5px solid transparent", cursor: "pointer"
            }}>{tab.l}{tab.id === "filters" && !filters.all && <span style={{ marginLeft: 3, width: 5, height: 5, borderRadius: "50%", background: t.accent, display: "inline-block" }} />}</button>
          ))}
        </div>
        <div style={{ flex: 1, overflowY: "auto" }}>
          {rPanel === "chatnav" && <ChatNavPanel sections={CHATNAV_SECTIONS} t={t} expanded={cnExp} toggle={toggleCn} />}

          {/* Filters panel */}
          {rPanel === "filters" && (
            <div style={{ padding: "12px 14px" }}>
              <div style={{ fontSize: 10, fontWeight: 500, color: t.textFaint, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>Message Filters</div>
              <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 14 }}>
                {filterChips.map(c => {
                  const on = c.id === "all" ? filters.all : filters[c.id];
                  return (
                    <button key={c.id} onClick={() => toggleFilter(c.id)} style={{
                      padding: "4px 10px", borderRadius: 16, fontSize: 10, cursor: "pointer", fontWeight: 400,
                      border: "none", background: on ? t.accent : t.surfaceAlt,
                      color: on ? t.accentText : t.textMuted, transition: "all 0.15s",
                    }}>{c.label}</button>
                  );
                })}
              </div>
              {!filters.all && (
                <div style={{ fontSize: 10, color: t.textFaint, fontWeight: 300, marginBottom: 12 }}>
                  Showing {filteredMsgs.length} of {messages.length} messages
                </div>
              )}
              {/* In-conversation search */}
              <div style={{ fontSize: 10, fontWeight: 500, color: t.textFaint, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Search in Chat</div>
              <div style={{ display: "flex", alignItems: "center", background: t.surfaceAlt, borderRadius: 8, padding: "6px 10px", marginBottom: 14 }}>
                <Search size={11} color={t.textFaint} style={{ marginRight: 6, flexShrink: 0 }} />
                <input value={filterSearch} onChange={e => setFilterSearch(e.target.value)} placeholder="Search messages..."
                  style={{ border: "none", background: "none", outline: "none", fontSize: 11, color: t.text, fontWeight: 350, width: "100%" }} />
                {filterSearch && <X size={11} color={t.textFaint} onClick={() => setFilterSearch("")} style={{ cursor: "pointer" }} />}
              </div>
              {/* Actions */}
              <div style={{ fontSize: 10, fontWeight: 500, color: t.textFaint, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Actions</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <button onClick={() => setShowExport(true)} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: `1px solid ${t.border}`, borderRadius: 8, padding: "8px 12px", fontSize: 11, color: t.textMuted, cursor: "pointer", fontWeight: 400 }}>
                  <FileDown size={12} />Export Conversation
                </button>
              </div>
            </div>
          )}

          {rPanel === "pinned" && (<>
            {messages.filter(m => m.pinned).length === 0 && <div style={{ padding: "36px 16px", textAlign: "center", color: t.textFaint, fontSize: 11, fontWeight: 300 }}>No pinned messages yet. Hover and click the pin icon.</div>}
            {messages.filter(m => m.pinned).map(m => (
              <div key={m.id} style={{ padding: "10px 16px", borderBottom: `1px solid ${t.borderSubtle}` }}>
                <div style={{ fontSize: 10, color: t.textFaint, marginBottom: 2, fontWeight: 300 }}>{m.sender} Â· {m.time}</div>
                <div style={{ fontSize: 11, color: t.textSec, lineHeight: 1.4, fontWeight: 350 }}>{m.text.length > 100 ? m.text.slice(0, 100) + "..." : m.text}</div>
              </div>
            ))}
          </>)}
          {rPanel === "people" && (
            <div>
              {/* Participants management */}
              <div style={{ padding: "10px 14px 6px" }}>
                <div style={{ fontSize: 10, fontWeight: 500, color: t.textFaint, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>In This Chat</div>
                <div style={{ display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "3px 8px 3px 3px", background: t.surfaceAlt, borderRadius: 10 }}>
                    <Av name="B" s={16} t={t} />
                    <span style={{ fontSize: 10, color: t.text, fontWeight: 400 }}>You</span>
                  </div>
                  {chatPersonas.map(p => (
                    <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 4, padding: "3px 8px 3px 3px", background: t.surfaceAlt, borderRadius: 10 }}>
                      <Av name={p.name} s={16} t={t} />
                      <span style={{ fontSize: 10, color: t.text, fontWeight: 400 }}>{p.name}</span>
                      <X size={8} color={t.textFaint} onClick={() => setParticipants(participants.filter(x => x !== p.id))} style={{ cursor: "pointer" }} />
                    </div>
                  ))}
                  <button onClick={() => { const n = PERSONAS.find(p => !participants.includes(p.id)); if (n) setParticipants([...participants, n.id]); }} style={{ display: "flex", alignItems: "center", gap: 2, background: "none", border: `1px dashed ${t.border}`, borderRadius: 10, padding: "3px 8px", fontSize: 10, color: t.textMuted, cursor: "pointer" }}>
                    <UserPlus size={9} />Add
                  </button>
                </div>
              </div>
              <div style={{ borderTop: `1px solid ${t.borderSubtle}`, margin: "8px 0" }} />
              {/* Persona details */}
              {chatPersonas.map(p => (
                <div key={p.id} onClick={() => go("people", { persona: p.id })} style={{ padding: "9px 14px", display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                  <Av name={p.name} s={24} t={t} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, color: t.text, fontWeight: 450 }}>{p.name}</div>
                    <div style={{ fontSize: 10, color: t.textMuted, fontWeight: 300 }}>{p.role}</div>
                  </div>
                  <Dot status={p.status} t={t} s={6} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  // APPLICATION SHELL
  // Components: Sidebar (NavItems/AdvancedSection/UserProfile/CollapsibleToggle),
  //   TopBar (Breadcrumbs/SidebarToggle/NewButton/NotificationBell/ThemeToggle),
  //   MobileSidebarOverlay, CommandPalette, OnboardingOverlay,
  //   NotificationDropdown, NotificationHistoryPage,
  //   PricingModal, KeyboardShortcutsModal
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  return (
    <div style={{ width: "100%", height: "100vh", display: "flex", fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif", overflow: "hidden", background: t.bg }}>
      {/* SIDEBAR (desktop) */}
      {!mobile && (
        <div onMouseEnter={() => setSHover(true)} onMouseLeave={() => setSHover(false)}
          style={{ width: sideW, flexShrink: 0, background: s.bg, display: "flex", flexDirection: "column", overflow: "hidden", transition: "width 0.2s ease", borderRight: `1px solid ${s.border}` }}>
          <div style={{ padding: showLabel ? "20px 16px" : "20px 0", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, height: 60 }}>
            <Sparkles size={18} color="#fff" style={{ flexShrink: 0 }} />
            {showLabel && <span style={{ fontSize: 14, fontWeight: 600, color: "#fff", letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>aiConnected</span>}
          </div>
          <div style={{ flex: 1, padding: "8px 0", overflowY: "auto", overflowX: "hidden" }}>
            {navItems.map(n => (
              <div key={n.id} onClick={() => go(n.id)}
                style={{
                  display: "flex", alignItems: "center", gap: 12, cursor: "pointer",
                  padding: showLabel ? "10px 16px" : "10px 0", justifyContent: showLabel ? "flex-start" : "center",
                  background: screen === n.id ? s.bgActive : "transparent",
                  color: screen === n.id ? s.text : s.textMuted,
                  margin: "1px 6px", borderRadius: 8, transition: "all 0.15s", whiteSpace: "nowrap"
                }}>
                <span style={{ display: "flex", flexShrink: 0 }}>{n.icon}</span>
                {showLabel && <span style={{ fontSize: 13, fontWeight: screen === n.id ? 500 : 350 }}>{n.label}</span>}
              </div>
            ))}
            <div style={{ borderTop: `1px solid ${s.border}`, margin: "12px 12px" }} />
            {showLabel && <div style={{ padding: "4px 20px 8px", fontSize: 10, fontWeight: 500, color: s.textFaint, textTransform: "uppercase", letterSpacing: "0.08em" }}>Advanced</div>}
            {futureItems.map((n, i) => (
              <div key={i} onClick={() => go(n.id)} style={{
                display: "flex", alignItems: "center", gap: 12, padding: showLabel ? "10px 16px" : "10px 0",
                justifyContent: showLabel ? "flex-start" : "center", cursor: "pointer",
                color: screen === n.id ? s.text : s.textMuted, margin: "1px 6px", borderRadius: 8,
                whiteSpace: "nowrap",
                background: screen === n.id ? s.bgActive : "transparent",
              }}>
                <span style={{ display: "flex", flexShrink: 0 }}>{n.icon}</span>
                {showLabel && <span style={{ fontSize: 13, fontWeight: screen === n.id ? 500 : 350 }}>{n.label}</span>}
                {showLabel && n.tier && <span style={{ fontSize: 8, padding: "1px 5px", borderRadius: 4, background: "#2e95f3", color: "#fff", fontWeight: 600, letterSpacing: "0.04em", marginLeft: "auto" }}>{n.tier}</span>}
              </div>
            ))}
          </div>
          <div style={{ borderTop: `1px solid ${s.border}`, padding: "8px 0" }}>
            <div onClick={() => go("settings")}
              style={{
                display: "flex", alignItems: "center", gap: 12, cursor: "pointer",
                padding: showLabel ? "10px 16px" : "10px 0", justifyContent: showLabel ? "flex-start" : "center",
                color: screen === "settings" ? s.text : s.textMuted,
                background: screen === "settings" ? s.bgActive : "transparent",
                margin: "1px 6px", borderRadius: 8, whiteSpace: "nowrap"
              }}>
              <Settings size={18} style={{ flexShrink: 0 }} />
              {showLabel && <span style={{ fontSize: 13, fontWeight: 350 }}>Settings</span>}
            </div>
          </div>
          <div style={{ borderTop: `1px solid ${s.border}`, padding: showLabel ? "14px 16px" : "14px 0", display: "flex", alignItems: "center", gap: 10, justifyContent: showLabel ? "flex-start" : "center" }}>
            <Av name="B" s={28} t={{ ...t, surfaceAlt: "#333", textMuted: "#888" }} />
            {showLabel && <div><div style={{ fontSize: 12, fontWeight: 500, color: s.text }}>Bob</div><div style={{ fontSize: 10, color: s.textFaint, fontWeight: 300 }}>Pro Plan</div></div>}
          </div>
        </div>
      )}

      {/* Mobile sidebar overlay */}
      {mobile && mobileNav && (
        <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex" }}>
          <div style={{ width: 260, background: T.light.sidebar.bg, display: "flex", flexDirection: "column", overflowY: "auto" }}>
            <div style={{ padding: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}><Sparkles size={18} color="#fff" /><span style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>aiConnected</span></div>
              <button onClick={() => setMobileNav(false)} style={{ background: "none", border: "none", color: "#888", cursor: "pointer" }}><X size={18} /></button>
            </div>
            {navItems.map(n => (
              <div key={n.id} onClick={() => go(n.id)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 16px", cursor: "pointer", color: screen === n.id ? "#fff" : "#888", background: screen === n.id ? "#222" : "transparent", margin: "1px 8px", borderRadius: 8 }}>
                {n.icon}<span style={{ fontSize: 13 }}>{n.label}</span>
              </div>
            ))}
            <div style={{ borderTop: "1px solid #282828", margin: "8px 12px" }} />
            <div onClick={() => go("settings")} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 16px", cursor: "pointer", color: screen === "settings" ? "#fff" : "#888", margin: "1px 8px", borderRadius: 8 }}>
              <Settings size={18} /><span style={{ fontSize: 13 }}>Settings</span>
            </div>
          </div>
          <div onClick={() => setMobileNav(false)} style={{ flex: 1, background: "rgba(0,0,0,0.5)" }} />
        </div>
      )}

      {/* MAIN AREA */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
        {/* TOP BAR */}
        <div style={{ height: 48, display: "flex", alignItems: "center", padding: "0 16px", flexShrink: 0, justifyContent: "space-between", background: t.surface, borderBottom: `1px solid ${t.borderSubtle}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {mobile && <button onClick={() => setMobileNav(true)} style={{ background: "none", border: "none", cursor: "pointer", color: t.textMuted, display: "flex", padding: 4 }}><Menu size={18} /></button>}
            {mobile && screen === "chat" && <button onClick={() => setChatDrawer(true)} style={{ background: "none", border: "none", cursor: "pointer", color: t.textMuted, display: "flex", padding: 4 }}><Inbox size={15} /></button>}
            {crumbs.map((b, i) => (
              <span key={i} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                {i > 0 && <ChevronRight size={11} color={t.textFaint} />}
                <span onClick={b.onClick} style={{ fontSize: 12, color: i === crumbs.length - 1 ? t.text : t.textMuted, fontWeight: i === crumbs.length - 1 ? 500 : 300, cursor: b.onClick ? "pointer" : "default" }}>{b.label}</span>
                {i === 0 && !mobile && <button onClick={() => setSExp(!sExp)} title={sExp ? "Collapse sidebar" : "Expand sidebar"} style={{ background: "none", border: "none", cursor: "pointer", color: t.textFaint, display: "flex", padding: 2, marginLeft: 2, borderRadius: 4 }}>
                  {sExp ? <Columns size={14} /> : <Columns size={14} />}
                </button>}
              </span>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            {/* NEW button / Command palette */}
            <button onClick={() => setCmdPalette(true)} title="New... (âŒ˜N)" style={{ background: "none", border: `1px solid ${t.border}`, borderRadius: 6, padding: "3px 8px", cursor: "pointer", color: t.textMuted, display: "flex", alignItems: "center", gap: 3, fontSize: 11, fontWeight: 400 }}>
              <Plus size={12} />New
            </button>
            {!mobile && screen === "chat" && (
              <button onClick={() => setChatDrawer(!chatDrawer)} title="Toggle chat list"
                style={{ background: "none", border: "none", cursor: "pointer", color: chatDrawer ? t.text : t.textFaint, display: "flex", padding: 5 }}>
                <MessageSquare size={14} />
              </button>
            )}
            <div style={{ position: "relative" }}>
              <button onClick={() => setNotiOpen(!notiOpen)} style={{ background: "none", border: "none", cursor: "pointer", color: t.textMuted, display: "flex", padding: 5, position: "relative" }} title="Notifications">
                <Bell size={15} />
                {NOTIFICATIONS.filter(n => !n.read).length > 0 && <span style={{ position: "absolute", top: 3, right: 3, width: 6, height: 6, borderRadius: "50%", background: "#ef4444" }} />}
              </button>
              {notiOpen && (
                <div style={{ position: "absolute", right: 0, top: "100%", marginTop: 4, width: 300, background: t.surface, border: `1px solid ${t.border}`, borderRadius: 12, boxShadow: "0 8px 24px rgba(0,0,0,0.12)", zIndex: 30, overflow: "hidden" }}>
                  <div style={{ padding: "12px 14px", borderBottom: `1px solid ${t.borderSubtle}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 13, fontWeight: 500, color: t.text }}>Notifications</span>
                    <span style={{ fontSize: 10, color: t.textMuted, cursor: "pointer" }}>Mark all read</span>
                  </div>
                  <div style={{ maxHeight: 280, overflowY: "auto" }}>
                    {NOTIFICATIONS.map(n => (
                      <div key={n.id} style={{ padding: "10px 14px", borderBottom: `1px solid ${t.borderSubtle}`, display: "flex", gap: 10, alignItems: "flex-start", background: n.read ? "transparent" : t.surfaceAlt }}>
                        <span style={{ marginTop: 3, color: t.textFaint }}>{n.type === "persona" ? <Users size={12} /> : <Bell size={12} />}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 12, color: t.text, fontWeight: n.read ? 350 : 400, lineHeight: 1.4 }}>{n.text}</div>
                          <div style={{ fontSize: 10, color: t.textFaint, fontWeight: 300, marginTop: 2 }}>{n.time}</div>
                        </div>
                        {!n.read && <span style={{ width: 6, height: 6, borderRadius: "50%", background: t.accent, flexShrink: 0, marginTop: 5 }} />}
                      </div>
                    ))}
                  </div>
                  <div style={{ padding: "8px 14px", borderTop: `1px solid ${t.borderSubtle}`, textAlign: "center" }}>
                    <span onClick={() => { setNotiPage(true); setNotiOpen(false); }} style={{ fontSize: 11, color: t.textMuted, cursor: "pointer", fontWeight: 400 }}>View all notifications</span>
                  </div>
                </div>
              )}
            </div>
            <button onClick={() => setDark(!dark)} style={{ background: "none", border: "none", cursor: "pointer", color: t.textMuted, display: "flex", padding: 5 }}>
              {dark ? <Sun size={15} /> : <Moon size={15} />}
            </button>
            {!mobile && screen === "chat" && (
              <button onClick={() => setROpen(!rOpen)} style={{ background: "none", border: "none", cursor: "pointer", color: rOpen ? t.text : t.textFaint, display: "flex", padding: 5 }}>
                {rOpen ? <Columns size={15} /> : <Columns size={15} />}
              </button>
            )}
          </div>
        </div>

        {/* CONTENT + RIGHT */}
        <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
          <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column", minWidth: 0 }}>
            {renderMain()}
          </div>
          {rOpen && !mobile && screen === "chat" && (
            <div style={{ width: 250, flexShrink: 0, borderLeft: `1px solid ${t.borderSubtle}`, overflowY: "auto", background: t.surface }}>
              {renderRight()}
            </div>
          )}
        </div>
      </div>

      {/* â”€â”€â”€ NOTIFICATION HISTORY â”€â”€â”€ */}
      {notiPage && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 60 }} onClick={() => setNotiPage(false)}>
          <div onClick={e => e.stopPropagation()} style={{ background: t.surface, borderRadius: 16, width: mobile ? "92%" : 520, maxHeight: "75vh", display: "flex", flexDirection: "column", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
            <div style={{ padding: "18px 22px", borderBottom: `1px solid ${t.borderSubtle}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
              <div style={{ fontSize: 16, fontWeight: 450, color: t.text }}>All Notifications</div>
              <button onClick={() => setNotiPage(false)} style={{ background: "none", border: "none", color: t.textMuted, cursor: "pointer", display: "flex" }}><X size={16} /></button>
            </div>
            <div style={{ overflowY: "auto", flex: 1 }}>
              {[...NOTIFICATIONS, { id: "n6", text: "Dev completed React Architecture component tree", time: "3 days ago", type: "persona", read: true }, { id: "n7", text: "File storage usage at 85%", time: "4 days ago", type: "system", read: true }, { id: "n8", text: "Sally flagged a memory conflict in Brand Color Discussion", time: "5 days ago", type: "persona", read: true }, { id: "n9", text: "Weekly summary: 23 conversations, 42 new memories", time: "1 week ago", type: "system", read: true }].map(n => (
                <div key={n.id} style={{ padding: "14px 22px", borderBottom: `1px solid ${t.borderSubtle}`, display: "flex", gap: 12, alignItems: "flex-start", background: n.read ? "transparent" : t.surfaceAlt }}>
                  <span style={{ marginTop: 2, color: t.textFaint }}>{n.type === "persona" ? <Users size={14} /> : <Bell size={14} />}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, color: t.text, fontWeight: n.read ? 350 : 420, lineHeight: 1.5 }}>{n.text}</div>
                    <div style={{ fontSize: 11, color: t.textFaint, fontWeight: 300, marginTop: 3 }}>{n.time}</div>
                  </div>
                  {!n.read && <span style={{ width: 7, height: 7, borderRadius: "50%", background: t.accent, flexShrink: 0, marginTop: 6 }} />}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* â”€â”€â”€ COMMAND PALETTE â”€â”€â”€ */}
      {cmdPalette && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: "15vh", zIndex: 60 }} onClick={() => setCmdPalette(false)}>
          <div onClick={e => e.stopPropagation()} style={{ background: t.surface, borderRadius: 16, width: mobile ? "90%" : 440, boxShadow: "0 20px 60px rgba(0,0,0,0.25)", overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", padding: "14px 18px", borderBottom: `1px solid ${t.borderSubtle}` }}>
              <Search size={16} color={t.textMuted} style={{ marginRight: 10 }} />
              <input autoFocus placeholder="What do you want to create?" style={{ flex: 1, border: "none", background: "none", outline: "none", fontSize: 15, color: t.text, fontWeight: 350 }} />
              <span style={{ fontSize: 10, color: t.textFaint, padding: "2px 6px", background: t.surfaceAlt, borderRadius: 4 }}>ESC</span>
            </div>
            <div style={{ padding: "8px 6px" }}>
              {[
                { icon: <MessageSquare size={16} />, label: "New Chat", desc: "Start a conversation", shortcut: "âŒ˜N" },
                { icon: <LayoutGrid size={16} />, label: "New Instance", desc: "Create a workspace", shortcut: "âŒ˜â‡§I" },
                { icon: <Users size={16} />, label: "New Persona", desc: "Add a team member", shortcut: "âŒ˜â‡§P" },
                { icon: <Search size={16} />, label: "Search", desc: "Find anything", shortcut: "âŒ˜K" },
                { icon: <Upload size={16} />, label: "Upload File", desc: "Add a file", shortcut: "âŒ˜U" },
              ].map((item, i) => (
                <div key={i} onClick={() => setCmdPalette(false)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 8, cursor: "pointer", margin: "1px 0" }}>
                  <span style={{ color: t.textFaint }}>{item.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, color: t.text, fontWeight: 400 }}>{item.label}</div>
                    <div style={{ fontSize: 11, color: t.textMuted, fontWeight: 300 }}>{item.desc}</div>
                  </div>
                  <span style={{ fontSize: 10, color: t.textFaint, fontFamily: "monospace" }}>{item.shortcut}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* â”€â”€â”€ EXPORT MODAL â”€â”€â”€ */}
      {showExport && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 60 }} onClick={() => setShowExport(false)}>
          <div onClick={e => e.stopPropagation()} style={{ background: t.surface, borderRadius: 16, padding: 28, width: mobile ? "85%" : 380, boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div style={{ fontSize: 16, fontWeight: 450, color: t.text }}>Export Conversation</div>
              <button onClick={() => setShowExport(false)} style={{ background: "none", border: "none", color: t.textMuted, cursor: "pointer", display: "flex" }}><X size={16} /></button>
            </div>
            <div style={{ fontSize: 12, color: t.textMuted, fontWeight: 300, marginBottom: 20 }}>Choose a format to export this conversation.</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[
                { label: "Markdown", ext: ".md", icon: <FileText size={18} /> },
                { label: "PDF", ext: ".pdf", icon: <FileText size={18} /> },
                { label: "JSON", ext: ".json", icon: <FileCode size={18} /> },
                { label: "HTML", ext: ".html", icon: <Globe size={18} /> },
              ].map((fmt, i) => (
                <button key={i} onClick={() => setShowExport(false)} style={{
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: 16,
                  background: t.surfaceAlt, border: `1px solid ${t.border}`, borderRadius: 10,
                  cursor: "pointer", color: t.text, fontSize: 13, fontWeight: 400,
                }}>
                  <span style={{ color: t.textMuted }}>{fmt.icon}</span>
                  {fmt.label}
                  <span style={{ fontSize: 10, color: t.textFaint, fontWeight: 300 }}>{fmt.ext}</span>
                </button>
              ))}
            </div>
            <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
              <button style={{ flex: 1, padding: "6px 10px", background: t.surfaceAlt, border: `1px solid ${t.border}`, borderRadius: 8, fontSize: 11, color: t.textSec, cursor: "pointer" }}>Full conversation</button>
              <button style={{ flex: 1, padding: "6px 10px", background: "none", border: `1px solid ${t.border}`, borderRadius: 8, fontSize: 11, color: t.textMuted, cursor: "pointer" }}>Filtered only</button>
            </div>
          </div>
        </div>
      )}

      {/* â”€â”€â”€ UPGRADE / TIER COMPARISON â”€â”€â”€ */}
      {showUpgrade && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 60 }} onClick={() => setShowUpgrade(false)}>
          <div onClick={e => e.stopPropagation()} style={{ background: t.surface, borderRadius: 16, padding: 28, width: mobile ? "95%" : 680, maxHeight: "85vh", overflowY: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <div style={{ fontSize: 18, fontWeight: 400, color: t.text }}>Compare Plans</div>
              <button onClick={() => setShowUpgrade(false)} style={{ background: "none", border: "none", color: t.textMuted, cursor: "pointer", display: "flex" }}><X size={18} /></button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr 1fr" : "1fr 1fr 1fr 1fr", gap: 12 }}>
              {TIERS.map(tier => (
                <div key={tier.id} style={{ padding: 16, background: tier.current ? t.surfaceAlt : "transparent", border: `1px solid ${tier.current ? t.accent : t.border}`, borderRadius: 12, display: "flex", flexDirection: "column" }}>
                  <div style={{ fontSize: 15, fontWeight: 500, color: t.text, marginBottom: 2 }}>{tier.name}</div>
                  <div style={{ fontSize: 22, fontWeight: 300, color: t.text, marginBottom: 12, letterSpacing: "-0.02em" }}>{tier.price}<span style={{ fontSize: 11, color: t.textMuted }}>/mo</span></div>
                  {tier.features.map((f, i) => (
                    <div key={i} style={{ fontSize: 11, color: t.textSec, fontWeight: 350, padding: "3px 0", display: "flex", alignItems: "center", gap: 5 }}>
                      <span style={{ width: 3, height: 3, borderRadius: 2, background: t.textFaint, flexShrink: 0 }} />{f}
                    </div>
                  ))}
                  <div style={{ marginTop: "auto", paddingTop: 12 }}>
                    {tier.current ? (
                      <div style={{ fontSize: 11, color: t.textMuted, fontWeight: 400, textAlign: "center" }}>Current Plan</div>
                    ) : (
                      <button style={{ width: "100%", background: "none", border: `1px solid ${t.border}`, borderRadius: 6, padding: "5px 0", fontSize: 11, color: t.textSec, cursor: "pointer" }}>Select</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* â”€â”€â”€ ONBOARDING MODAL â”€â”€â”€ */}
      {showOnboarding && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 60 }}>
          <div style={{ background: t.surface, borderRadius: 20, padding: mobile ? 28 : 40, width: mobile ? "90%" : 420, textAlign: "center", boxShadow: "0 20px 60px rgba(0,0,0,0.25)" }}>
            {obStep === 0 ? (<>
              <Sparkles size={36} color={t.text} style={{ marginBottom: 16 }} />
              <div style={{ fontSize: 22, fontWeight: 300, color: t.text, letterSpacing: "-0.02em", marginBottom: 8 }}>Welcome to aiConnected</div>
              <div style={{ fontSize: 14, color: t.textMuted, fontWeight: 300, lineHeight: 1.6, marginBottom: 28 }}>A digital intelligence environment where AI Personas work alongside you with real memory and skill.</div>
              <button onClick={() => setObStep(1)} style={{ background: t.accent, color: t.accentText, border: "none", borderRadius: 8, padding: "10px 32px", fontSize: 14, cursor: "pointer", fontWeight: 450, marginBottom: 8 }}>Take a Quick Tour</button>
              <div onClick={() => setShowOnboarding(false)} style={{ fontSize: 12, color: t.textFaint, cursor: "pointer", marginTop: 6 }}>Skip</div>
            </>) : (<>
              <div style={{ color: t.textFaint, marginBottom: 16 }}>{ONBOARDING_STEPS[obStep - 1].icon}</div>
              <div style={{ fontSize: 20, fontWeight: 400, color: t.text, marginBottom: 6 }}>{ONBOARDING_STEPS[obStep - 1].title}</div>
              <div style={{ fontSize: 14, color: t.textMuted, fontWeight: 300, lineHeight: 1.5, marginBottom: 24 }}>{ONBOARDING_STEPS[obStep - 1].desc}</div>
              <div style={{ display: "flex", gap: 4, justifyContent: "center", marginBottom: 20 }}>
                {ONBOARDING_STEPS.map((_, i) => (
                  <span key={i} style={{ width: obStep - 1 === i ? 20 : 6, height: 6, borderRadius: 3, background: obStep - 1 === i ? t.accent : t.surfaceAlt, transition: "width 0.2s" }} />
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button onClick={() => setShowOnboarding(false)} style={{ background: "none", border: "none", fontSize: 12, color: t.textFaint, cursor: "pointer" }}>Skip</button>
                <button onClick={() => obStep < 4 ? setObStep(obStep + 1) : setShowOnboarding(false)} style={{ background: t.accent, color: t.accentText, border: "none", borderRadius: 8, padding: "8px 24px", fontSize: 13, cursor: "pointer", fontWeight: 450 }}>
                  {obStep < 4 ? "Next" : "Get Started"}
                </button>
              </div>
            </>)}
          </div>
        </div>
      )}

      {/* â”€â”€â”€ KEYBOARD SHORTCUTS â”€â”€â”€ */}
      {showShortcuts && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 60 }} onClick={() => setShowShortcuts(false)}>
          <div onClick={e => e.stopPropagation()} style={{ background: t.surface, borderRadius: 16, padding: 28, width: mobile ? "90%" : 400, boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div style={{ fontSize: 16, fontWeight: 450, color: t.text }}>Keyboard Shortcuts</div>
              <button onClick={() => setShowShortcuts(false)} style={{ background: "none", border: "none", color: t.textMuted, cursor: "pointer", display: "flex" }}><X size={16} /></button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
              {[
                { keys: "âŒ˜ N", desc: "New (Command palette)" },
                { keys: "âŒ˜ K", desc: "Search" },
                { keys: "âŒ˜ /", desc: "Shortcuts" },
                { keys: "âŒ˜ â‡§ I", desc: "New Instance" },
                { keys: "âŒ˜ â‡§ P", desc: "New Persona" },
                { keys: "âŒ˜ U", desc: "Upload file" },
                { keys: "âŒ˜ D", desc: "Toggle dark mode" },
                { keys: "âŒ˜ .", desc: "Toggle sidebar" },
                { keys: "Esc", desc: "Close modal" },
                { keys: "âŒ˜ E", desc: "Export chat" },
              ].map((s2, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 10px", borderRadius: 6 }}>
                  <span style={{ fontSize: 12, color: t.textSec, fontWeight: 350 }}>{s2.desc}</span>
                  <span style={{ fontSize: 10, fontFamily: "monospace", color: t.textFaint, padding: "2px 6px", background: t.surfaceAlt, borderRadius: 4 }}>{s2.keys}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Shortcuts trigger */}
      <button onClick={() => setShowShortcuts(true)} style={{ position: "fixed", bottom: 16, right: 16, width: 28, height: 28, borderRadius: "50%", background: t.surfaceAlt, border: `1px solid ${t.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: t.textFaint, fontSize: 13, fontWeight: 500, zIndex: 5 }}>?</button>

    </div>
  );
}
