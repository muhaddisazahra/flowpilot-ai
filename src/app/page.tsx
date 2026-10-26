
"use client";

import { useState } from "react";

const projects = [
  {
    number: "01",
    icon: "⚡",
    name: "FlowPilot AI",
    category: "WORKFLOW AUTOMATION",
    description:
      "A smarter way for freelancers and service businesses to organize client onboarding, track tasks, and simplify everyday communication.",
    tags: ["Workflow Automation", "AI Assistants", "Productivity"],
    color: "bg-blue-50 text-blue-600",
  },
  {
    number: "02",
    icon: "🔬",
    name: "EvidencePilot AI",
    category: "RESEARCH INTELLIGENCE",
    description:
      "A research intelligence concept designed to organize scientific literature, analyze findings, verify citations, and identify evidence gaps.",
    tags: ["Research AI", "Evidence Synthesis", "Agentic AI"],
    color: "bg-cyan-50 text-cyan-700",
  },
  {
    number: "03",
    icon: "✦",
    name: "SmartBrief AI",
    category: "KNOWLEDGE AUTOMATION",
    description:
      "A digital productivity concept that transforms lengthy information into structured summaries, actionable insights, and clear next steps.",
    tags: ["Information Design", "AI Workflows", "Productivity"],
    color: "bg-violet-50 text-violet-700",
  },
];

const initialTasks = [
  { id: 1, title: "Send welcome email to Olivia", client: "Northstar Studio", due: "Today", done: true },
  { id: 2, title: "Collect project requirements", client: "Meridian Creative", due: "Today", done: false },
  { id: 3, title: "Review brand guidelines", client: "Northstar Studio", due: "Tomorrow", done: false },
  { id: 4, title: "Prepare project kickoff", client: "Atlas Consulting", due: "Oct 28", done: false },
];

const clients = [
  {
    name: "Olivia Bennett",
    company: "Northstar Studio",
    initials: "OB",
    color: "bg-blue-100 text-blue-700",
    progress: 100,
    status: "Complete",
    statusColor: "bg-emerald-50 text-emerald-700",
    documents: "4 of 4 received",
  },
  {
    name: "James Carter",
    company: "Meridian Creative",
    initials: "JC",
    color: "bg-violet-100 text-violet-700",
    progress: 65,
    status: "In progress",
    statusColor: "bg-blue-50 text-blue-700",
    documents: "2 of 3 received",
  },
  {
    name: "Sophia Williams",
    company: "Atlas Consulting",
    initials: "SW",
    color: "bg-amber-100 text-amber-700",
    progress: 30,
    status: "Needs attention",
    statusColor: "bg-amber-50 text-amber-700",
    documents: "1 of 4 received",
  },
];

type Client = (typeof clients)[number];

export default function Home() {
  const [tasks, setTasks] = useState(initialTasks);
  const [selectedClient, setSelectedClient] = useState<Client>(clients[1]);
  const [showEmail, setShowEmail] = useState(false);
  const [activeTab, setActiveTab] = useState("Overview");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [notice, setNotice] = useState("");
  const [emailCopied, setEmailCopied] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [formSent, setFormSent] = useState(false);

  const completedTasks = tasks.filter((task) => task.done).length;

  const toggleTask = (id: number) => {
    setTasks((previous) =>
      previous.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const showNotice = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 3200);
  };

  const copyEmail = async () => {
    const email = `Subject: Following up on your onboarding — ${selectedClient.company}

Hi ${selectedClient.name.split(" ")[0]},

I hope you're doing well! I'm following up on your project onboarding.

We've received ${selectedClient.documents}. ${
      selectedClient.progress < 100
        ? "Could you please share the remaining information when you have a moment? This will help us keep your project moving smoothly."
        : "Everything is in place, and we're ready for the next step."
    }

Please let me know if you have any questions.

Best regards,
Your Project Team`;

    try {
      await navigator.clipboard.writeText(email);
      setEmailCopied(true);
      showNotice("Email draft copied to clipboard.");
      window.setTimeout(() => setEmailCopied(false), 2500);
    } catch {
      showNotice("Clipboard access is unavailable in this browser.");
    }
  };

  const scrollTo = (id: string) => {
    setMobileMenu(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSent(true);
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
          scroll-padding-top: 90px;
        }
        body {
          margin: 0;
          font-family: Arial, Helvetica, sans-serif;
        }
        * {
          box-sizing: border-box;
        }
        button,
        a,
        input,
        textarea {
          -webkit-tap-highlight-color: transparent;
        }
        .grid-pattern {
          background-image: radial-gradient(#cbd5e1 0.8px, transparent 0.8px);
          background-size: 22px 22px;
        }
        .soft-shadow {
          box-shadow: 0 18px 55px -28px rgba(15, 38, 84, 0.22);
        }
        .blue-shadow {
          box-shadow: 0 12px 26px -12px rgba(37, 99, 235, 0.52);
        }
        .fade-up {
          animation: fadeUp 0.65s ease-out both;
        }
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            scroll-behavior: auto !important;
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
          <button
            onClick={() => scrollTo("home")}
            className="group flex items-center gap-2.5"
            aria-label="FlowPilot AI home"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-200 transition-transform group-hover:rotate-3">
              <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                <path
                  d="M4 7h9l-3-3m3 3-3 3M20 17h-9l3-3m-3 3 3 3"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5 12h14"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <span className="text-lg font-extrabold tracking-tight text-slate-900">
              FlowPilot<span className="text-blue-600"> AI</span>
            </span>
          </button>

          <div className="hidden items-center gap-8 md:flex">
            {[
              ["Platform", "platform"],
              ["How it works", "how-it-works"],
              ["About", "about"],
              ["Projects", "projects"],
            ].map(([label, id]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-600"
              >
                {label}
              </button>
            ))}
          </div>

          <div className="hidden md:block">
            <button
              onClick={() => scrollTo("contact")}
              className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200"
            >
              Let&apos;s connect <span className="ml-1">↗</span>
            </button>
          </div>

          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 md:hidden"
            aria-label="Toggle navigation"
            aria-expanded={mobileMenu}
          >
            {mobileMenu ? "✕" : "☰"}
          </button>
        </nav>

        {mobileMenu && (
          <div className="border-t border-slate-100 bg-white px-5 py-4 shadow-lg md:hidden">
            {[
              ["Platform", "platform"],
              ["How it works", "how-it-works"],
              ["About", "about"],
              ["Projects", "projects"],
              ["Contact", "contact"],
            ].map(([label, id]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="block w-full rounded-lg px-3 py-3 text-left text-sm font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600"
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Hero */}
      <section
        id="home"
        className="relative isolate overflow-hidden bg-gradient-to-b from-blue-50/70 via-white to-white"
      >
        <div className="grid-pattern absolute inset-0 -z-10 opacity-35" />
        <div className="absolute -right-48 -top-36 -z-10 h-[500px] w-[500px] rounded-full bg-cyan-200/30 blur-[110px]" />
        <div className="absolute -left-48 top-52 -z-10 h-[380px] w-[380px] rounded-full bg-blue-200/30 blur-[100px]" />

        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 pt-16 sm:px-8 sm:pb-24 sm:pt-24 lg:grid-cols-[0.93fr_1.07fr] lg:gap-12 lg:px-12 lg:pb-28 lg:pt-24">
          <div className="fade-up relative z-10">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/90 px-3.5 py-2 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-600" />
              </span>
              <span className="text-xs font-bold tracking-wide text-blue-800">
                A NEW WAY TO WORK SMARTER
              </span>
            </div>

            <h1 className="max-w-2xl text-[2.9rem] font-extrabold leading-[1.08] tracking-[-0.055em] text-slate-950 sm:text-6xl lg:text-[4.45rem]">
              Less admin.
              <br />
              More <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">meaningful work.</span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
              Meet <strong className="font-semibold text-slate-800">FlowPilot AI</strong> — a smarter approach to client onboarding and workflow management. Keep requests organized, stay ahead of deadlines, and make every client feel looked after.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => scrollTo("platform")}
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white blue-shadow transition-all hover:-translate-y-0.5 hover:bg-blue-700"
              >
                Explore the platform
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </button>
              <button
                onClick={() => scrollTo("how-it-works")}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 transition-all hover:border-blue-200 hover:bg-blue-50"
              >
                See how it works <span>↗</span>
              </button>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-slate-200/80 pt-6">
              {["Client-first workflows", "Clear next steps", "Less busywork"].map((item) => (
                <span key={item} className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 sm:text-sm">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-[11px] text-emerald-700">✓</span>
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Interactive product preview */}
          <div id="platform" className="relative mx-auto w-full max-w-[600px] lg:ml-auto">
            <div className="absolute -inset-5 -z-10 rounded-[2.5rem] bg-gradient-to-br from-blue-100/80 via-white to-cyan-100/80 blur-xl" />
            <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white soft-shadow sm:rounded-3xl">
              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4 sm:px-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white">F</div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Workspace overview</p>
                    <p className="text-[11px] text-slate-500">Monday, October 26 · Sample data</p>
                  </div>
                </div>
                <span className="flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1.5 text-[10px] font-bold text-amber-800">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500" /> Concept preview
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2.5 bg-slate-50/80 p-4 sm:gap-3 sm:p-5">
                {[
                  { label: "Active clients", value: "12", change: "Across projects", icon: "♙", color: "text-blue-600" },
                  { label: "Open tasks", value: String(tasks.filter((t) => !t.done).length + 8), change: "Needs attention", icon: "▤", color: "text-violet-600" },
                  { label: "Completed", value: String(completedTasks + 16), change: "This month", icon: "✓", color: "text-emerald-600" },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-xl border border-slate-100 bg-white p-3 sm:p-4">
                    <span className={`text-base ${stat.color}`}>{stat.icon}</span>
                    <p className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900">{stat.value}</p>
                    <p className="mt-0.5 text-[10px] font-semibold text-slate-700 sm:text-xs">{stat.label}</p>
                    <p className="mt-1 hidden text-[10px] text-slate-400 sm:block">{stat.change}</p>
                  </div>
                ))}
              </div>

              <div className="px-4 pb-4 pt-2 sm:px-5 sm:pb-5">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900">Client onboarding</h3>
                  <span className="text-[11px] font-semibold text-blue-600">View workspace →</span>
                </div>

                <div className="space-y-2">
                  {clients.map((client) => (
                    <button
                      key={client.name}
                      onClick={() => {
                        setSelectedClient(client);
                        setShowEmail(false);
                      }}
                      className={`w-full rounded-xl border p-3 text-left transition-all hover:border-blue-200 ${
                        selectedClient.name === client.name
                          ? "border-blue-300 bg-blue-50/50"
                          : "border-slate-100 bg-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${client.color}`}>
                          {client.initials}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-xs font-bold text-slate-800">{client.name}</p>
                          <p className="mt-0.5 truncate text-[10px] text-slate-500">{client.company}</p>
                        </div>
                        <span className={`hidden rounded-full px-2 py-1 text-[9px] font-bold sm:inline-block ${client.statusColor}`}>
                          {client.status}
                        </span>
                        <span className="w-9 text-right text-xs font-bold text-slate-700">{client.progress}%</span>
                      </div>
                      <div className="ml-12 mt-2.5 h-1.5 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            client.progress === 100 ? "bg-emerald-500" : "bg-blue-500"
                          }`}
                          style={{ width: `${client.progress}%` }}
                        />
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-4 rounded-xl border border-cyan-100 bg-gradient-to-r from-cyan-50/80 to-blue-50/80 p-3.5 sm:p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-lg shadow-sm">✦</div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-xs font-bold text-slate-900">AI follow-up assistant</p>
                        <span className="rounded-full border border-blue-100 bg-white px-2 py-0.5 text-[9px] font-bold text-blue-700">Illustrative</span>
                      </div>
                      <p className="mt-1 text-[11px] leading-5 text-slate-600">
                        {selectedClient.name.split(" ")[0]}&apos;s onboarding is {selectedClient.progress}% complete. Prepare a personalized follow-up based on the remaining requirements.
                      </p>
                      <button
                        onClick={() => setShowEmail(!showEmail)}
                        className="mt-3 rounded-lg bg-blue-600 px-3.5 py-2 text-[11px] font-bold text-white transition-colors hover:bg-blue-700"
                      >
                        {showEmail ? "Hide email preview ↑" : "Preview email draft →"}
                      </button>
                    </div>
                  </div>

                  {showEmail && (
                    <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 fade-up">
                      <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
                        <p className="text-xs font-bold text-slate-800">Draft message</p>
                        <span className="text-[10px] text-slate-400">Not sent</span>
                      </div>
                      <p className="mt-3 text-[11px] text-slate-500">To: {selectedClient.name}</p>
                      <p className="mt-2 text-xs font-bold text-slate-800">Following up on your onboarding</p>
                      <p className="mt-3 text-xs leading-6 text-slate-600">
                        Hi {selectedClient.name.split(" ")[0]},<br /><br />
                        I hope you&apos;re doing well! We&apos;ve received {selectedClient.documents}. {selectedClient.progress < 100 ? "Could you please share the remaining information when you have a moment? This will help us keep your project moving smoothly." : "Everything is in place, and we&apos;re ready for the next step."}<br /><br />
                        Please let me know if you have any questions.<br /><br />
                        Best regards,<br />Your Project Team
                      </p>
                      <button onClick={copyEmail} className="mt-3 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50">
                        {emailCopied ? "✓ Copied" : "Copy draft"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3 sm:px-6">
                <span className="text-[10px] text-slate-400">Illustrative interface · Sample client data</span>
                <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-slate-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500" /> Concept in development
                </span>
              </div>
            </div>

            <div className="absolute -right-2 top-20 hidden rounded-xl border border-slate-100 bg-white p-3.5 soft-shadow sm:block lg:-right-8">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">✓</span>
                <div>
                  <p className="text-xs font-bold text-slate-800">Next step identified</p>
                  <p className="mt-0.5 text-[10px] text-slate-500">Illustrative automation</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-5 -left-4 hidden rounded-xl border border-slate-100 bg-white p-3.5 soft-shadow sm:block lg:-left-8">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">✦</span>
                <div>
                  <p className="text-xs font-bold text-slate-800">One workspace. Clearer work.</p>
                  <p className="mt-0.5 text-[10px] text-slate-500">Designed for busy teams</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust / value strip */}
      <section className="border-y border-slate-100 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-5 py-8 sm:px-8 md:grid-cols-4 lg:px-12">
          {[
            ["01", "Client onboarding", "A clear start for every project"],
            ["02", "Task visibility", "Know what needs attention"],
            ["03", "Timely follow-ups", "Keep communication moving"],
            ["04", "AI-assisted work", "Spend less time on busywork"],
          ].map(([number, title, subtitle]) => (
            <div key={number} className="flex items-start gap-3">
              <span className="pt-0.5 text-xs font-extrabold text-blue-600">{number}</span>
              <div>
                <p className="text-sm font-bold text-slate-800">{title}</p>
                <p className="mt-1 text-xs leading-5 text-slate-500">{subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Platform overview */}
      <section id="how-it-works" className="bg-white px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-blue-600">One organized workflow</span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
              From first inquiry to
              <span className="text-blue-600"> project kickoff.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
              Client work gets complicated when requests, documents, and deadlines live in different places. FlowPilot AI is designed to bring the moving parts together.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                number: "01",
                icon: "📥",
                title: "Capture every request",
                text: "Give each client a clear starting point. Organize inquiries, record project details, and identify the information needed before work begins.",
                points: ["Centralized client details", "Structured intake checklist", "Clear onboarding status"],
                color: "bg-blue-50",
              },
              {
                number: "02",
                icon: "🗂️",
                title: "Keep tasks on track",
                text: "Turn project requirements into visible next steps. Identify missing documents, assign responsibilities, and keep deadlines in view.",
                points: ["Task and deadline tracking", "Document requirement lists", "Progress at a glance"],
                color: "bg-cyan-50",
              },
              {
                number: "03",
                icon: "✦",
                title: "Communicate with clarity",
                text: "Prepare contextual follow-up messages and status updates, helping you spend less time rewriting the same administrative emails.",
                points: ["Personalized draft messages", "Friendly reminders", "Human-reviewed communication"],
                color: "bg-violet-50",
              },
            ].map((feature) => (
              <article key={feature.number} className="group rounded-2xl border border-slate-200/80 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5 sm:p-7">
                <div className="flex items-center justify-between">
                  <span className={`flex h-12 w-12 items-center justify-center rounded-2xl text-xl ${feature.color}`}>{feature.icon}</span>
                  <span className="text-xs font-extrabold tracking-widest text-slate-300">{feature.number}</span>
                </div>
                <h3 className="mt-6 text-lg font-bold tracking-tight text-slate-900">{feature.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{feature.text}</p>
                <ul className="mt-6 space-y-3 border-t border-slate-100 pt-5">
                  {feature.points.map((point) => (
                    <li key={point} className="flex items-center gap-2.5 text-xs font-medium text-slate-600">
                      <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-[10px] font-bold text-emerald-600">✓</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive workspace */}
      <section className="bg-slate-50/80 px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-blue-600">Your work, in context</span>
              <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-4xl">
                An overview that helps you focus on what&apos;s next.
              </h2>
              <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base">
                No more guessing which client is waiting, which task is overdue, or which document is missing. FlowPilot AI is designed around a simple question: what needs to happen next?
              </p>

              <div className="mt-8 space-y-5">
                {[
                  ["See the whole picture", "Bring client progress, outstanding tasks, and recent activity into one view."],
                  ["Catch missing details", "Make outstanding requirements visible before they delay a project."],
                  ["Keep the human touch", "Prepare thoughtful messages and review them before sending."],
                ].map(([title, text]) => (
                  <div key={title} className="flex gap-3.5">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-sm font-bold text-blue-700">✓</span>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">{title}</h3>
                      <p className="mt-1 text-sm leading-6 text-slate-600">{text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-7 text-xs leading-5 text-slate-400">
                These are proposed product capabilities shown through an illustrative interface, not a claim of a fully implemented production system.
              </p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white soft-shadow sm:rounded-3xl">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-4 py-4 sm:px-6">
                <div>
                  <p className="text-base font-extrabold tracking-tight text-slate-900">My workspace</p>
                  <p className="mt-1 text-xs text-slate-500">An interactive product concept</p>
                </div>
                <span className="rounded-lg bg-blue-50 px-3 py-2 text-xs font-bold text-blue-700">Sample workspace</span>
              </div>

              <div className="flex gap-1 overflow-x-auto border-b border-slate-100 px-4 pt-3 sm:px-6">
                {["Overview", "Tasks", "Activity"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`whitespace-nowrap border-b-2 px-3 py-3 text-xs font-bold transition-colors ${
                      activeTab === tab
                        ? "border-blue-600 text-blue-700"
                        : "border-transparent text-slate-400 hover:text-slate-700"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="min-h-[380px] p-4 sm:p-6">
                {activeTab === "Overview" && (
                  <div className="fade-up">
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                      <div className="rounded-xl bg-blue-50/70 p-4">
                        <p className="text-xs font-medium text-slate-500">Onboarding</p>
                        <p className="mt-2 text-2xl font-extrabold text-slate-900">75%</p>
                        <div className="mt-3 h-1.5 rounded-full bg-blue-100"><div className="h-full w-3/4 rounded-full bg-blue-600" /></div>
                      </div>
                      <div className="rounded-xl bg-emerald-50/70 p-4">
                        <p className="text-xs font-medium text-slate-500">Tasks done</p>
                        <p className="mt-2 text-2xl font-extrabold text-slate-900">{completedTasks}/{tasks.length}</p>
                        <p className="mt-2 text-[10px] text-emerald-700">Interactive sample</p>
                      </div>
                      <div className="col-span-2 rounded-xl bg-violet-50/70 p-4 sm:col-span-1">
                        <p className="text-xs font-medium text-slate-500">Next deadline</p>
                        <p className="mt-2 text-xl font-extrabold text-slate-900">Oct 28</p>
                        <p className="mt-2 text-[10px] text-violet-700">Project kickoff</p>
                      </div>
                    </div>

                    <div className="mt-7">
                      <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-sm font-bold text-slate-900">Today&apos;s priorities</h3>
                        <button onClick={() => setActiveTab("Tasks")} className="text-xs font-semibold text-blue-600 hover:text-blue-800">View tasks →</button>
                      </div>
                      <div className="space-y-3">
                        {tasks.slice(0, 3).map((task) => (
                          <button key={task.id} onClick={() => toggleTask(task.id)} className="flex w-full items-center gap-3 rounded-xl border border-slate-100 p-3 text-left transition-colors hover:border-blue-200 hover:bg-blue-50/30">
                            <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border text-[10px] ${task.done ? "border-emerald-500 bg-emerald-500 text-white" : "border-slate-300 bg-white text-transparent"}`}>✓</span>
                            <span className={`min-w-0 flex-1 truncate text-xs font-semibold ${task.done ? "text-slate-400 line-through" : "text-slate-700"}`}>{task.title}</span>
                            <span className="shrink-0 text-[10px] text-slate-400">{task.due}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "Tasks" && (
                  <div className="fade-up">
                    <div className="mb-4 flex items-center justify-between gap-2">
                      <div>
                        <h3 className="text-sm font-bold text-slate-900">Task checklist</h3>
                        <p className="mt-1 text-xs text-slate-500">Select tasks to update their status.</p>
                      </div>
                      <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">{completedTasks} of {tasks.length}</span>
                    </div>
                    <div className="space-y-3">
                      {tasks.map((task) => (
                        <div key={task.id} className="flex items-start gap-3 rounded-xl border border-slate-100 p-3.5">
                          <button onClick={() => toggleTask(task.id)} className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border text-[10px] ${task.done ? "border-emerald-500 bg-emerald-500 text-white" : "border-slate-300 text-transparent hover:border-blue-400"}`} aria-label={`Mark ${task.title} ${task.done ? "incomplete" : "complete"}`}>✓</button>
                          <div className="min-w-0 flex-1">
                            <p className={`text-xs font-semibold leading-5 ${task.done ? "text-slate-400 line-through" : "text-slate-800"}`}>{task.title}</p>
                            <p className="mt-1 text-[10px] text-slate-500">{task.client}</p>
                          </div>
                          <span className={`shrink-0 rounded-md px-2 py-1 text-[10px] font-semibold ${task.done ? "bg-emerald-50 text-emerald-700" : task.due === "Today" ? "bg-amber-50 text-amber-700" : "bg-slate-100 text-slate-600"}`}>{task.done ? "Done" : task.due}</span>
                        </div>
                      ))}
                    </div>
                    <p className="mt-4 text-xs text-slate-400">Changes are temporary and held in this page&apos;s local state.</p>
                  </div>
                )}

                {activeTab === "Activity" && (
                  <div className="fade-up">
                    <h3 className="text-sm font-bold text-slate-900">Recent activity</h3>
                    <p className="mt-1 text-xs text-slate-500">A sample client project timeline.</p>
                    <div className="ml-2 mt-6 space-y-0">
                      {[
                        { time: "09:40 AM", title: "Client profile created", detail: "Meridian Creative · Client intake", icon: "＋", color: "bg-blue-100 text-blue-700" },
                        { time: "10:15 AM", title: "Project requirements reviewed", detail: "Initial information checklist prepared", icon: "✓", color: "bg-emerald-100 text-emerald-700" },
                        { time: "11:20 AM", title: "Document still outstanding", detail: "Brand assets · Follow-up may be needed", icon: "!", color: "bg-amber-100 text-amber-700" },
                        { time: "12:05 PM", title: "Next action identified", detail: "Prepare a personalized reminder", icon: "✦", color: "bg-violet-100 text-violet-700" },
                      ].map((item, index) => (
                        <div key={item.title} className="relative flex gap-3 pb-6 last:pb-0">
                          {index < 3 && <span className="absolute bottom-0 left-4 top-9 w-px bg-slate-200" />}
                          <span className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${item.color}`}>{item.icon}</span>
                          <div className="min-w-0 flex-1 pt-0.5">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <p className="text-xs font-bold text-slate-800">{item.title}</p>
                              <span className="text-[10px] text-slate-400">{item.time}</span>
                            </div>
                            <p className="mt-1 text-xs leading-5 text-slate-500">{item.detail}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="mt-5 text-xs text-slate-400">Illustrative timeline · Not connected to a live activity feed.</p>
                  </div>
                )}
              </div>
              <div className="border-t border-slate-100 bg-slate-50/70 px-4 py-3 sm:px-6">
                <p className="text-center text-[10px] leading-5 text-slate-500">Interactive demonstration · No backend, persistent storage, or live integrations connected</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client onboarding checklist */}
      <section className="bg-white px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="order-2 rounded-2xl border border-slate-200 bg-white p-5 soft-shadow sm:rounded-3xl sm:p-7 lg:order-1">
            <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-5">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-600">Client workspace</span>
                <h3 className="mt-2 text-lg font-extrabold text-slate-900">Onboarding checklist</h3>
                <p className="mt-1 text-xs text-slate-500">Meridian Creative · Sample project</p>
              </div>
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-xl">🗂️</span>
            </div>

            <div className="mt-5 flex items-center justify-between">
              <p className="text-xs font-semibold text-slate-700">Requirements received</p>
              <p className="text-sm font-extrabold text-blue-700">2 of 4</p>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full w-1/2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500" />
            </div>

            <div className="mt-6 space-y-3">
              {[
                { name: "Client intake form", detail: "Project goals and scope", done: true },
                { name: "Contact information", detail: "Primary contact details", done: true },
                { name: "Brand assets", detail: "Logo, colors, and guidelines", done: false },
                { name: "Project agreement", detail: "Signed agreement or approval", done: false },
              ].map((item) => (
                <div key={item.name} className="flex items-center gap-3 rounded-xl border border-slate-100 p-3.5">
                  <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border text-[10px] ${item.done ? "border-emerald-500 bg-emerald-500 text-white" : "border-slate-300 text-transparent"}`}>✓</span>
                  <div className="min-w-0 flex-1">
                    <p className={`text-xs font-bold ${item.done ? "text-slate-700" : "text-slate-800"}`}>{item.name}</p>
                    <p className="mt-1 text-[10px] text-slate-500">{item.detail}</p>
                  </div>
                  <span className={`rounded-full px-2 py-1 text-[9px] font-bold ${item.done ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>{item.done ? "Received" : "Pending"}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 flex items-start gap-3 rounded-xl border border-amber-100 bg-amber-50/60 p-4">
              <span className="text-base">⏳</span>
              <div>
                <p className="text-xs font-bold text-amber-900">Two items need attention</p>
                <p className="mt-1 text-xs leading-5 text-amber-800">A future FlowPilot workflow could flag outstanding requirements and prepare a reminder for review.</p>
              </div>
            </div>
            <p className="mt-4 text-center text-[10px] text-slate-400">Example checklist · Proposed product experience</p>
          </div>

          <div className="order-1 lg:order-2">
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-blue-600">Nothing falls through the cracks</span>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-4xl">
              A smoother onboarding experience for every client.
            </h2>
            <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base">
              Every new project comes with questions, files, approvals, and deadlines. A structured onboarding checklist gives your team and your client a shared understanding of what&apos;s required.
            </p>
            <div className="mt-8 space-y-6">
              {[
                ["Make requirements visible", "List the information and documents needed before work can move forward."],
                ["Identify outstanding items", "See what has arrived and what still needs a follow-up."],
                ["Start projects with confidence", "Keep the kickoff process organized, consistent, and easier to repeat."],
              ].map(([title, text], index) => (
                <div key={title} className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-sm font-extrabold text-blue-700">0{index + 1}</span>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{title}</h3>
                    <p className="mt-1.5 text-sm leading-6 text-slate-600">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AI email feature */}
      <section className="relative isolate overflow-hidden bg-slate-950 px-5 py-20 text-white sm:px-8 sm:py-28 lg:px-12">
        <div className="absolute -right-36 -top-36 -z-10 h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[110px]" />
        <div className="absolute -bottom-52 left-0 -z-10 h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[100px]" />

        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-3.5 py-2 text-xs font-bold text-blue-200">
              <span>✦</span> AI-ASSISTED COMMUNICATION
            </span>
            <h2 className="mt-6 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              Every follow-up,
              <span className="text-cyan-300"> a little easier.</span>
            </h2>
            <p className="mt-5 text-sm leading-7 text-slate-300 sm:text-base">
              Turn a missed document or an upcoming deadline into a thoughtful message. FlowPilot AI envisions context-aware drafts that save time without making client communication feel robotic.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Adapt the tone to the client and situation",
                "Reference missing documents or pending tasks",
                "Review, edit, and approve before sending",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-slate-200">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-400/15 text-xs font-bold text-cyan-300">✓</span>
                  {item}
                </div>
              ))}
            </div>
            <p className="mt-8 text-xs leading-5 text-slate-400">AI message generation is a proposed capability. This website previews example copy and does not connect to an AI model or send email.</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur sm:rounded-3xl sm:p-7">
            <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-5">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 text-lg text-white">✦</span>
                <div>
                  <p className="text-sm font-bold text-white">Follow-up message</p>
                  <p className="mt-1 text-xs text-slate-400">Illustrative AI draft preview</p>
                </div>
              </div>
              <span className="rounded-full border border-amber-300/20 bg-amber-300/10 px-2.5 py-1.5 text-[10px] font-bold text-amber-200">Example</span>
            </div>

            <div className="mt-5 flex items-center gap-3 rounded-xl bg-white/[0.06] p-3.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-300/15 text-xs font-bold text-violet-200">JC</span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-white">James Carter</p>
                <p className="mt-1 truncate text-[11px] text-slate-400">Meridian Creative · Project onboarding</p>
              </div>
              <span className="text-[10px] text-slate-400">Draft only</span>
            </div>

            <div className="mt-4 rounded-xl border border-white/10 bg-slate-900/80 p-4 sm:p-5">
              <p className="text-[11px] font-semibold text-cyan-300">SUBJECT</p>
              <p className="mt-2 text-sm font-bold text-white">A quick follow-up on your project assets</p>
              <div className="my-4 h-px bg-white/10" />
              <p className="text-sm leading-7 text-slate-300">
                Hi James,
                <br /><br />
                I hope your week is going well! We&apos;re getting everything ready for your project kickoff.
                <br /><br />
                We&apos;ve received your intake form and contact details. When you have a moment, could you share your brand assets and project agreement? Having these in place will help us get started smoothly.
                <br /><br />
                If you have any questions or need a hand, just let me know.
                <br /><br />
                Best regards,
                <br />
                Your Project Team
              </p>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <span className="text-[10px] leading-4 text-slate-400">Illustrative message · Human review recommended</span>
              <button onClick={() => showNotice("This is a concept preview. No email has been sent.")} className="rounded-lg border border-white/15 px-4 py-2.5 text-xs font-semibold text-slate-200 transition-colors hover:bg-white/10">Review draft ↗</button>
            </div>
          </div>
        </div>
      </section>

      {/* Real-world scenarios */}
      <section className="bg-white px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-blue-600">Built around real work</span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              One workflow. Different ways to work.
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">Explore how the FlowPilot AI concept could support people who manage multiple clients, moving deadlines, and repeated administrative tasks.</p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              {
                icon: "💻",
                label: "FREELANCERS",
                title: "Start every project right",
                text: "A freelance designer signs a new client. FlowPilot helps organize the brief, collect brand assets, track approval deadlines, and prepare a welcome message.",
                outcome: "From scattered emails to a clear checklist.",
                color: "bg-blue-50",
              },
              {
                icon: "🏢",
                label: "SMALL AGENCIES",
                title: "Keep every client moving",
                text: "An agency manages several projects at once. A shared overview makes outstanding tasks, client responsibilities, and upcoming milestones easier to review.",
                outcome: "From status chasing to shared visibility.",
                color: "bg-violet-50",
              },
              {
                icon: "🤝",
                label: "SERVICE BUSINESSES",
                title: "Make follow-ups consistent",
                text: "A consulting business needs signed agreements and client documents. A repeatable workflow can identify gaps and prepare reminders for staff review.",
                outcome: "From repetitive admin to repeatable processes.",
                color: "bg-cyan-50",
              },
            ].map((scenario) => (
              <article key={scenario.label} className="rounded-2xl border border-slate-200 p-6 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/5 sm:p-7">
                <span className={`flex h-12 w-12 items-center justify-center rounded-2xl text-xl ${scenario.color}`}>{scenario.icon}</span>
                <p className="mt-6 text-[10px] font-extrabold tracking-[0.16em] text-blue-600">{scenario.label}</p>
                <h3 className="mt-2 text-lg font-extrabold text-slate-900">{scenario.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{scenario.text}</p>
                <div className="mt-6 flex items-start gap-2 border-t border-slate-100 pt-5">
                  <span className="text-sm text-emerald-600">↗</span>
                  <p className="text-xs font-semibold leading-5 text-slate-700">{scenario.outcome}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-5 text-xs leading-5 text-slate-400">These scenarios describe intended use cases, not verified customer results or deployed integrations.</p>
        </div>
      </section>

      {/* About creator */}
      <section id="about" className="bg-slate-50 px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-blue-200/60 to-cyan-100/70 blur-xl" />
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 soft-shadow sm:p-9">
              <div className="flex items-center justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-2xl font-extrabold text-white">MZ</div>
                <span className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-[10px] font-bold text-emerald-700">Learning · Building · Growing</span>
              </div>
              <h3 className="mt-7 text-2xl font-extrabold tracking-tight text-slate-950">Muhaddisa Zahra</h3>
              <p className="mt-2 text-sm font-semibold text-blue-600">Pharm-D Graduate · Aspiring AI Builder</p>
              <div className="my-6 h-px bg-slate-100" />
              <p className="text-sm leading-7 text-slate-600">
                Exploring the intersection of practical problem-solving, web development, and Agentic AI to create useful digital products.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Curiosity", "Problem-solving", "Continuous learning"].map((skill) => (
                  <span key={skill} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-[11px] font-semibold text-slate-600">{skill}</span>
                ))}
              </div>
            </div>
          </div>

          <div>
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-blue-600">About the creator</span>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-4xl">
              A background in healthcare. A curiosity for what&apos;s next.
            </h2>
            <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base">
              I&apos;m Muhaddisa Zahra, a Pharm-D graduate exploring web development and Agentic AI. My academic background has shaped my appreciation for structured thinking, attention to detail, and solving problems carefully.
            </p>
            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              I&apos;m now applying that mindset to digital products that make everyday work more organized and accessible. FlowPilot AI is a project in development inspired by the administrative challenges that freelancers and small teams face while managing client relationships.
            </p>
            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              My goal is to keep learning, build practical solutions, and explore how thoughtful design and intelligent automation can help people focus on work that matters.
            </p>
            <button onClick={() => scrollTo("contact")} className="mt-7 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3.5 text-sm font-bold text-white transition-colors hover:bg-blue-700">
              Get in touch <span>↗</span>
            </button>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="bg-white px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-blue-600">Beyond one idea</span>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">Ideas designed to solve problems.</h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">A growing collection of concepts exploring workflow automation, research intelligence, and practical AI-powered tools.</p>
            </div>
            <span className="w-fit rounded-full border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-600">Selected project concepts</span>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <article key={project.number} className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5 sm:p-7">
                <div className="flex items-center justify-between">
                  <span className={`flex h-12 w-12 items-center justify-center rounded-2xl text-xl ${project.color}`}>{project.icon}</span>
                  <span className="text-xs font-extrabold tracking-widest text-slate-300">{project.number}</span>
                </div>
                <p className="mt-6 text-[10px] font-extrabold tracking-[0.15em] text-blue-600">{project.category}</p>
                <h3 className="mt-2 text-xl font-extrabold tracking-tight text-slate-900">{project.name}</h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">{project.description}</p>
                <div className="mt-6 flex flex-wrap gap-2 border-t border-slate-100 pt-5">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-md bg-slate-50 px-2.5 py-1.5 text-[10px] font-semibold text-slate-600">{tag}</span>
                  ))}
                </div>
                <button onClick={() => showNotice(`${project.name} is a project concept. Explore the page for its vision and planned capabilities.`)} className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5 text-left text-xs font-bold text-slate-700 transition-colors group-hover:text-blue-600">
                  Explore concept <span className="text-base transition-transform group-hover:translate-x-1">→</span>
                </button>
              </article>
            ))}
          </div>
          <p className="mt-6 text-xs leading-5 text-slate-400">Project names and descriptions communicate intended concepts. Features and integrations should only be described as implemented after they have been built and tested.</p>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 pb-20 sm:px-8 sm:pb-28 lg:px-12">
        <div className="relative isolate mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-600 px-6 py-14 text-center text-white sm:px-12 sm:py-20">
          <div className="absolute -right-16 -top-24 -z-10 h-72 w-72 rounded-full border border-white/10" />
          <div className="absolute -right-4 -top-12 -z-10 h-52 w-52 rounded-full border border-white/10" />
          <div className="absolute -bottom-36 -left-16 -z-10 h-72 w-72 rounded-full bg-cyan-300/10 blur-2xl" />

          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-2 text-xs font-semibold text-blue-50">
            <span>✦</span> THE FUTURE OF ORGANIZED WORK
          </span>
          <h2 className="mx-auto mt-6 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            Your best work deserves a better workflow.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-blue-50 sm:text-base">
            Explore the FlowPilot AI concept, share your ideas, or connect with me as I continue building practical digital solutions.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <button onClick={() => scrollTo("contact")} className="rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-blue-700 transition-all hover:-translate-y-0.5 hover:bg-blue-50">
              Let&apos;s connect <span className="ml-1">↗</span>
            </button>
            <button onClick={() => scrollTo("platform")} className="rounded-xl border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white/20">
              Explore the concept
            </button>
          </div>
          <p className="mt-5 text-[11px] text-blue-100">FlowPilot AI is currently a concept in development.</p>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-slate-50/80 px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-blue-600">Let&apos;s connect</span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">Have an idea in mind?</h2>
            <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base">
              I&apos;m always interested in thoughtful ideas, collaboration, and conversations about web development, AI automation, and useful digital products.
            </p>

            <div className="mt-8 space-y-5">
              <div className="flex items-start gap-3.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-blue-600">✉</span>
                <div>
                  <p className="text-sm font-bold text-slate-800">Start a conversation</p>
                  <p className="mt-1 text-sm leading-6 text-slate-500">Share your project idea or tell me what you&apos;re building.</p>
                </div>
              </div>
              <div className="flex items-start gap-3.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-blue-600">✦</span>
                <div>
                  <p className="text-sm font-bold text-slate-800">Areas of interest</p>
                  <p className="mt-1 text-sm leading-6 text-slate-500">Web development, Agentic AI, workflow automation, and digital product design.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 soft-shadow sm:rounded-3xl sm:p-8">
            {formSent ? (
              <div className="flex min-h-[350px] flex-col items-center justify-center text-center fade-up">
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-3xl text-emerald-600">✓</span>
                <h3 className="mt-6 text-xl font-extrabold text-slate-900">Your message is ready!</h3>
                <p className="mt-3 max-w-sm text-sm leading-7 text-slate-600">
                  This is a front-end demo, so your message has not been delivered or stored. Connect a form service or backend to enable submissions.
                </p>
                <button onClick={() => setFormSent(false)} className="mt-6 rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50">Back to form</button>
              </div>
            ) : (
              <>
                <h3 className="text-lg font-extrabold text-slate-900">Send a message</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">Tell me a little about what you have in mind.</p>
                <form onSubmit={handleSubmit} className="mt-7 space-y-5">
                  <div>
                    <label htmlFor="contact-name" className="mb-2 block text-xs font-bold text-slate-700">Your name</label>
                    <input id="contact-name" name="name" autoComplete="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Enter your name" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-50" />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="mb-2 block text-xs font-bold text-slate-700">Email address</label>
                    <input id="contact-email" name="email" type="email" autoComplete="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@company.com" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-50" />
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="mb-2 block text-xs font-bold text-slate-700">Your message</label>
                    <textarea id="contact-message" name="message" required rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell me about your idea, project, or collaboration..." className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm leading-6 text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-50" />
                  </div>
                  <button type="submit" className="group flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200">
                    Prepare message <span className="transition-transform group-hover:translate-x-1">→</span>
                  </button>
                  <p className="text-center text-[10px] leading-5 text-slate-400">Demo form only. Submissions are not transmitted to a server.</p>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white px-5 py-8 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 sm:flex-row">
          <button onClick={() => scrollTo("home")} className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white">F</span>
            <span className="text-base font-extrabold tracking-tight text-slate-900">FlowPilot<span className="text-blue-600"> AI</span></span>
          </button>
          <p className="text-center text-xs leading-5 text-slate-500">Designed with purpose by Muhaddisa Zahra · A project in development.</p>
          <button onClick={() => scrollTo("home")} className="text-xs font-semibold text-slate-600 transition-colors hover:text-blue-600">Back to top ↑</button>
        </div>
        <div className="mx-auto mt-6 max-w-7xl border-t border-slate-100 pt-5 text-center text-[10px] leading-5 text-slate-400">
          © {new Date().getFullYear()} FlowPilot AI. Concept and interface demonstration. Sample data is illustrative; AI, integrations, and backend functionality are not connected.
        </div>
      </footer>

      {/* Toast notification */}
      {notice && (
        <div role="status" className="fixed bottom-5 left-1/2 z-[60] w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 rounded-xl border border-slate-200 bg-white px-5 py-4 text-center text-sm font-semibold text-slate-800 soft-shadow fade-up">
          <span className="mr-2 text-blue-600">✦</span>{notice}
        </div>
      )}
    </main>
  );
}
