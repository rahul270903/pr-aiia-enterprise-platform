import React, { useState } from 'react';
import {
  BarChart3, Settings, Sliders, Shield, ShieldCheck, CheckCircle2, AlertTriangle,
  Download, Plus, Filter, Search, X, CheckSquare, Laptop, Lock, ArrowLeft,
  ChevronRight, Check, Play, RefreshCw, Database, Terminal, Cpu, Clock,
  ExternalLink, Zap, Users, Globe, Eye, FileText, Activity, TrendingUp,
  DollarSign, Key, Radio, Send, Bell, Save, Sparkles, Building2
} from 'lucide-react';

// ============================================================================
// REUSABLE ORBITNAPP NEXORA STYLE KPI CARD
// ============================================================================

export function KpiCard({
  title,
  value,
  subtext,
  trend,
  trendPositive = true,
  accentColor = 'blue',
  sparkValues = [30, 45, 52, 60, 72, 85, 94]
}: {
  title: string;
  value: string | number;
  subtext?: string;
  trend?: string;
  trendPositive?: boolean;
  accentColor?: 'blue' | 'indigo' | 'emerald' | 'purple' | 'amber';
  sparkValues?: number[];
}) {
  const accentBorder = {
    blue: 'border-l-blue-600',
    indigo: 'border-l-indigo-600',
    emerald: 'border-l-emerald-600',
    purple: 'border-l-purple-600',
    amber: 'border-l-amber-500'
  }[accentColor] || 'border-l-blue-600';

  const accentPill = trendPositive
    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
    : 'bg-red-50 text-red-700 border-red-200';

  const min = Math.min(...sparkValues);
  const max = Math.max(...sparkValues);
  const range = max - min || 1;
  const width = 84;
  const height = 26;
  const points = sparkValues
    .map((v, i) => {
      const x = (i / (sparkValues.length - 1)) * width;
      const y = height - ((v - min) / range) * (height - 6) - 3;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  const strokeColor = {
    blue: '#2563eb',
    indigo: '#4f46e5',
    emerald: '#059669',
    purple: '#7c3aed',
    amber: '#d97706'
  }[accentColor] || '#2563eb';

  return (
    <div
      className={`bg-white rounded-xl border border-slate-200/90 border-l-[4px] ${accentBorder} p-4 shadow-xs hover:shadow-md transition-all duration-200 space-y-2`}
    >
      <div className="flex items-center justify-between text-slate-500">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 truncate max-w-[190px]">
          {title}
        </span>
        <span className="text-slate-300 hover:text-slate-500 cursor-pointer font-bold tracking-widest text-xs select-none">
          ···
        </span>
      </div>

      <div className="flex items-baseline justify-between gap-2">
        <div className="text-3xl font-extrabold text-slate-900 tracking-tight font-mono">
          {value}
        </div>
        {subtext && (
          <span className="text-xs text-slate-400 font-medium truncate max-w-[120px]">
            {subtext}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between pt-1 border-t border-slate-100">
        {trend ? (
          <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-bold border ${accentPill}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${trendPositive ? 'bg-emerald-500' : 'bg-red-500'}`} />
            {trend}
          </span>
        ) : <div />}

        <svg width={width} height={height} className="overflow-visible shrink-0">
          <polyline
            fill="none"
            stroke={strokeColor}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={points}
          />
        </svg>
      </div>
    </div>
  );
}

// ============================================================================
// REPORTS & EXECUTIVE ANALYTICS SCREEN
// ============================================================================

export function ReportsScreen({
  appState,
  navigateToRecord,
  notify
}: {
  appState: any;
  navigateToRecord: (screen: string, recordId?: string) => void;
  notify: (msg: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}) {
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('30d');
  const [search, setSearch] = useState('');
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [scheduleConfig, setScheduleConfig] = useState({
    title: 'CISO Monthly Board Deck',
    frequency: 'Monthly',
    recipients: 'marcus.vance@apexglobal.io, ciso-board@apexglobal.io',
    format: 'PDF + Encrypted Ledger Hash'
  });

  const reportsList = [
    {
      id: 'REP-2026-Q2-CISO',
      title: 'Executive CISO Board Security & Velocity Briefing',
      period: 'Q2 2026 (YTD)',
      format: 'PDF / Board Pack',
      generatedAt: 'May 14, 2026',
      status: 'Ready',
      size: '4.2 MB',
      hash: 'sha256:7d8a91024bfe9012'
    },
    {
      id: 'REP-2026-WK46-ITSM',
      title: 'Autonomous ITSM Deflection & MTTR Velocity Report',
      period: 'Trailing 30 Days',
      format: 'PDF + CSV Telemetry',
      generatedAt: 'May 14, 2026',
      status: 'Ready',
      size: '1.8 MB',
      hash: 'sha256:41a809b4c091e842'
    },
    {
      id: 'REP-2026-M10-NIST',
      title: 'NIST SP 800-53 Rev 5 Attestation & POA&M POAM-2026-112',
      period: 'Continuous Attestation',
      format: 'NIST OSCAL / PDF',
      generatedAt: 'May 14, 2026',
      status: 'Certified',
      size: '8.4 MB',
      hash: 'sha256:91bc048201fa9481'
    },
    {
      id: 'REP-2026-REV-CRM',
      title: 'Revenue Operations & Deal Desk Action Firewall Audit',
      period: 'Current Quarter',
      format: 'Excel / CSV',
      generatedAt: 'May 14, 2026',
      status: 'Ready',
      size: '950 KB',
      hash: 'sha256:32c01948ba10e994'
    },
    {
      id: 'REP-2026-SCM-OPS',
      title: 'Autonomous Supply Chain Chokepoint & Resilience Telemetry',
      period: 'Q2 2026',
      format: 'Intermodal Logistics CSV',
      generatedAt: 'May 14, 2026',
      status: 'Ready',
      size: '2.1 MB',
      hash: 'sha256:194a82bf0912e840'
    }
  ];

  const handleDownloadReport = (rep: any) => {
    notify(`Report ${rep.id} downloaded (${rep.format}). Cryptographic hash: ${rep.hash.slice(0, 16)}...`, 'success');
  };

  const handleExportAll = () => {
    notify('Compiling Executive Analytics Data Pack (CSV). Export ready for download.', 'success');
  };

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowScheduleModal(false);
    notify(`Automated schedule set: ${scheduleConfig.title} (${scheduleConfig.frequency}) configured for ${scheduleConfig.recipients}.`, 'success');
  };

  const filteredReports = reportsList.filter((r) =>
    r.id.toLowerCase().includes(search.toLowerCase()) ||
    r.title.toLowerCase().includes(search.toLowerCase()) ||
    r.period.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* 1. Executive Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-sm border border-blue-200 font-semibold">
              PR AIIA ENTERPRISE · EXECUTIVE DECISION INTELLIGENCE
            </span>
            <span className="text-xs text-slate-400">|</span>
            <span className="text-xs text-slate-500 font-medium">Dataset: Real-Time Golden Thread Mesh</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-1 flex items-center gap-2.5">
            <BarChart3 className="w-6 h-6 text-blue-600" />
            Reports & Executive Analytics
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Cross-platform velocity benchmarks, MTTR telemetry, autonomous resolution velocity, and executive board governance packs.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="bg-slate-100 p-0.5 rounded-lg border border-slate-200 flex items-center text-xs">
            {['7d', '30d', 'qtd', 'ytd'].map((rng) => (
              <button
                key={rng}
                onClick={() => setDateRange(rng)}
                className={`px-3 py-1.5 rounded-md font-semibold transition cursor-pointer ${
                  dateRange === rng ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {rng.toUpperCase()}
              </button>
            ))}
          </div>

          <button
            onClick={handleExportAll}
            className="px-3.5 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 shadow-xs transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            Export Analytics CSV
          </button>

          <button
            onClick={() => setShowScheduleModal(true)}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition cursor-pointer"
          >
            <Clock className="w-4 h-4" />
            Schedule Report
          </button>
        </div>
      </div>

      {/* 2. Top KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="MTTR Reduction via AI Agents"
          value="74.2%"
          subtext="−18.4 mins"
          trend="+5.8 pts"
          trendPositive={true}
          accentColor="blue"
          sparkValues={[55, 60, 64, 68, 71, 73, 74.2]}
        />
        <KpiCard
          title="Autonomous Resolution Rate"
          value="81.6%"
          subtext="tier-1 & tier-2"
          trend="+6.8 pts"
          trendPositive={true}
          accentColor="emerald"
          sparkValues={[68, 71, 74, 76, 78, 80, 81.6]}
        />
        <KpiCard
          title="Critical CVE Patch Velocity"
          value="11 mins"
          subtext="detect-to-stage"
          trend="3.2x faster"
          trendPositive={true}
          accentColor="indigo"
          sparkValues={[35, 28, 22, 18, 14, 12, 11]}
        />
        <KpiCard
          title="Audit & Traceability Score"
          value="100%"
          subtext="NIST/SOC2 sealed"
          trend="Zero gaps"
          trendPositive={true}
          accentColor="purple"
          sparkValues={[96, 98, 99, 100, 100, 100, 100]}
        />
      </div>

      {/* 3. Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-2">
        {[
          { id: 'overview', label: 'Executive Overview & Velocity', icon: Activity },
          { id: 'burndown', label: 'Security & CVE Burndown', icon: ShieldCheck },
          { id: 'roi', label: 'AI Workforce ROI & Productivity', icon: DollarSign },
          { id: 'reports', label: 'Executive Audit Packs & Downloads', icon: FileText }
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition cursor-pointer ${
                isActive
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 4. Tab Contents */}

      {/* TAB 1: Executive Overview & Velocity */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* MTTR Benchmark Comparison Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Incident Resolution Velocity: Manual vs Pr AiiA</h3>
                <p className="text-xs text-slate-500">Comparing typical enterprise manual operations against autonomous L1–L3 agents.</p>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                87% FASTER OVERALL
              </span>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between font-medium mb-1">
                  <span className="text-slate-700">1. Incident Ingestion & Triage</span>
                  <span className="text-blue-600 font-bold">4.2 mins (vs 42 mins manual)</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden flex">
                  <div className="bg-blue-600 h-full rounded-full" style={{ width: '10%' }} />
                  <div className="bg-slate-300 h-full opacity-40" style={{ width: '90%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-medium mb-1">
                  <span className="text-slate-700">2. Root Cause Telemetry & Topology Correlation</span>
                  <span className="text-blue-600 font-bold">8.1 mins (vs 65 mins manual)</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden flex">
                  <div className="bg-blue-600 h-full rounded-full" style={{ width: '12%' }} />
                  <div className="bg-slate-300 h-full opacity-40" style={{ width: '88%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-medium mb-1">
                  <span className="text-slate-700">3. Patch Validation, Staging & Action Firewall Check</span>
                  <span className="text-blue-600 font-bold">11.0 mins (vs 180 mins manual)</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden flex">
                  <div className="bg-emerald-600 h-full rounded-full" style={{ width: '6%' }} />
                  <div className="bg-slate-300 h-full opacity-40" style={{ width: '94%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-medium mb-1">
                  <span className="text-slate-700">4. Compliance Attestation & Audit Hash Sealing</span>
                  <span className="text-purple-600 font-bold">Instant / &lt;10s (vs 240 mins manual)</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden flex">
                  <div className="bg-purple-600 h-full rounded-full" style={{ width: '2%' }} />
                  <div className="bg-slate-300 h-full opacity-40" style={{ width: '98%' }} />
                </div>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
              <span>Overall Golden Thread MTTR (INC-2026-8842):</span>
              <span className="font-mono font-bold text-slate-900">23.3 minutes end-to-end</span>
            </div>
          </div>

          {/* Autonomous Deflection Breakdown */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Autonomous Tier Distribution</h3>
                <p className="text-xs text-slate-500">Breakdown of 1,840 operational actions handled across autonomy levels.</p>
              </div>
              <span className="text-xs font-mono font-bold text-slate-800">1,840 Total</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 space-y-1">
                <span className="text-slate-500 text-[11px] block">L1 Autonomous</span>
                <span className="text-xl font-bold text-slate-900 block font-mono">1,040 actions</span>
                <span className="text-[10px] text-emerald-600 font-semibold">56.5% · Deflected touchless</span>
              </div>
              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 space-y-1">
                <span className="text-slate-500 text-[11px] block">L2/L3 Supervised</span>
                <span className="text-xl font-bold text-slate-900 block font-mono">612 actions</span>
                <span className="text-[10px] text-blue-600 font-semibold">33.3% · Action Firewall certified</span>
              </div>
              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 space-y-1">
                <span className="text-slate-500 text-[11px] block">L4 Autonomous with Audit</span>
                <span className="text-xl font-bold text-slate-900 block font-mono">148 actions</span>
                <span className="text-[10px] text-purple-600 font-semibold">8.0% · Cryptographic ledger sealed</span>
              </div>
              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 space-y-1">
                <span className="text-slate-500 text-[11px] block">Escalated to Human CISO</span>
                <span className="text-xl font-bold text-slate-900 block font-mono">40 actions</span>
                <span className="text-[10px] text-amber-600 font-semibold">2.2% · Critical sign-off queue</span>
              </div>
            </div>

            <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-lg text-xs text-blue-900 flex items-center justify-between">
              <span className="font-medium">Total Executive Deflection Rate:</span>
              <span className="font-bold text-blue-700 text-sm">97.8% touchless or pre-staged</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Security & CVE Burndown */}
      {activeTab === 'burndown' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Enterprise Vulnerability Burndown Velocity</h3>
                <p className="text-xs text-slate-500">Tracking CVE detection, sandbox verification, and deployment across 3,412 endpoints.</p>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                0 Critical Unpatched
              </span>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-emerald-50/50 border border-emerald-200 text-xs flex items-center justify-between">
                <div>
                  <span className="font-bold text-emerald-900">CVE-2026-4109 (Linux Kernel Privilege Escalation)</span>
                  <p className="text-emerald-700 text-[11px] mt-0.5">Affected APEX-MBP16-094. Patch staged via Ansible playbook REM-2026-309 and verified.</p>
                </div>
                <span className="font-mono text-emerald-700 font-bold bg-white px-2 py-1 rounded border border-emerald-200">
                  REMEDIATED
                </span>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-800">CVE-2026-2188 (OpenSSL Memory Corruption Buffer)</span>
                  <p className="text-slate-500 text-[11px] mt-0.5">Automated patch staged across 42 web proxy gateway nodes in EU-West cluster.</p>
                </div>
                <span className="font-mono text-blue-700 font-bold bg-blue-50 px-2 py-1 rounded border border-blue-200">
                  STAGED 100%
                </span>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-800">CVE-2026-1049 (BGP Route Flap Anomaly)</span>
                  <p className="text-slate-500 text-[11px] mt-0.5">Resolved by AGT-02 Self-Healing Agent; zero packet loss recorded.</p>
                </div>
                <span className="font-mono text-slate-700 font-bold bg-white px-2 py-1 rounded border border-slate-200">
                  AUTO-HEALED
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2">
              Fleet Compliance Health
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Executive Finance Tier:</span>
                <span className="font-mono font-bold text-emerald-600">100% Compliant</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Production Cloud Nodes:</span>
                <span className="font-mono font-bold text-emerald-600">99.8% Healthy</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Global Corporate Fleet:</span>
                <span className="font-mono font-bold text-blue-600">99.2% Patched</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Action Firewall Policy Blocks:</span>
                <span className="font-mono font-bold text-purple-600">24 Quarantined</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: AI Workforce ROI & Productivity */}
      {activeTab === 'roi' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-4 bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-xl p-6 shadow-xs space-y-4 border border-slate-800">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-300 bg-indigo-500/20 px-2 py-0.5 rounded font-bold">
                EXECUTIVE ROI SUMMARY
              </span>
              <h3 className="text-2xl font-bold text-white mt-2">$1,420,000</h3>
              <p className="text-xs text-slate-300 mt-1">Direct annualized engineering & SecOps capacity saved.</p>
            </div>

            <div className="space-y-2 border-t border-white/10 pt-3 text-xs text-slate-200">
              <div className="flex justify-between">
                <span className="text-slate-400">Total Hours Saved:</span>
                <span className="font-mono font-bold text-white">4,820 hrs</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Blended SecOps Rate:</span>
                <span className="font-mono text-white">$295 / hr</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Touchless Actions:</span>
                <span className="font-mono text-emerald-400 font-bold">1,840 executions</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Compliance Audit Time:</span>
                <span className="font-mono text-purple-300">Reduced from 6wks to 0</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
              Autonomous Agent Workforce Leaderboard
            </h3>
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2 px-3">Agent</th>
                  <th className="py-2 px-3">Autonomy</th>
                  <th className="py-2 px-3">Actions (30d)</th>
                  <th className="py-2 px-3">Hours Saved</th>
                  <th className="py-2 px-3">Compliance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-slate-900">Lead Qualifier (Revenue)</td>
                  <td className="py-2.5 px-3"><span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-purple-50 text-purple-700 font-bold">L4</span></td>
                  <td className="py-2.5 px-3 font-mono">4,812</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-blue-600">1,240 hrs</td>
                  <td className="py-2.5 px-3 font-mono text-emerald-600 font-bold">98.6%</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-slate-900">AGT-02 (Self-Healing AIOps)</td>
                  <td className="py-2.5 px-3"><span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-indigo-50 text-indigo-700 font-bold">L3</span></td>
                  <td className="py-2.5 px-3 font-mono">1,420</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-blue-600">890 hrs</td>
                  <td className="py-2.5 px-3 font-mono text-emerald-600 font-bold">99.8%</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-slate-900">Demand Sensing Agent (SCM)</td>
                  <td className="py-2.5 px-3"><span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-indigo-50 text-indigo-700 font-bold">L3</span></td>
                  <td className="py-2.5 px-3 font-mono">2,840</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-blue-600">760 hrs</td>
                  <td className="py-2.5 px-3 font-mono text-emerald-600 font-bold">98.4%</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-slate-900">AGT-04 (Evidence Harvester GRC)</td>
                  <td className="py-2.5 px-3"><span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-purple-50 text-purple-700 font-bold">L4</span></td>
                  <td className="py-2.5 px-3 font-mono">812</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-blue-600">1,120 hrs</td>
                  <td className="py-2.5 px-3 font-mono text-emerald-600 font-bold">100.0%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: Executive Audit Packs & Downloads */}
      {activeTab === 'reports' && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs space-y-4 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Certified Executive Governance & Board Reports</h3>
              <p className="text-xs text-slate-500">Cryptographically sealed reports ready for board presentation and regulatory audit.</p>
            </div>
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search report titles or ID..."
                className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 placeholder-slate-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Report ID</th>
                  <th className="py-2.5 px-3">Report Title</th>
                  <th className="py-2.5 px-3">Period</th>
                  <th className="py-2.5 px-3">Format</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Evidence Hash</th>
                  <th className="py-2.5 px-3 text-right">Download</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredReports.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50 transition">
                    <td className="py-3 px-3 font-mono font-bold text-blue-600">{r.id}</td>
                    <td className="py-3 px-3">
                      <div className="font-semibold text-slate-900">{r.title}</div>
                      <div className="text-[11px] text-slate-400">{r.size} · Generated {r.generatedAt}</div>
                    </td>
                    <td className="py-3 px-3 text-slate-600">{r.period}</td>
                    <td className="py-3 px-3 font-mono text-[11px] text-slate-500">{r.format}</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono">
                        {r.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono text-[10px] text-slate-400">{r.hash.slice(0, 16)}...</td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => handleDownloadReport(r)}
                        className="px-3 py-1.5 rounded-md text-xs font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition cursor-pointer flex items-center gap-1 ml-auto"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Schedule Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                Schedule Recurring Executive Report
              </h3>
              <button onClick={() => setShowScheduleModal(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleScheduleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Report Title</label>
                <input
                  type="text"
                  value={scheduleConfig.title}
                  onChange={(e) => setScheduleConfig({ ...scheduleConfig, title: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Frequency</label>
                  <select
                    value={scheduleConfig.frequency}
                    onChange={(e) => setScheduleConfig({ ...scheduleConfig, frequency: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900 focus:outline-none cursor-pointer"
                  >
                    <option value="Daily">Daily Summary</option>
                    <option value="Weekly">Weekly Digest</option>
                    <option value="Monthly">Monthly Board Deck</option>
                    <option value="Quarterly">Quarterly Attestation</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Export Format</label>
                  <select
                    value={scheduleConfig.format}
                    onChange={(e) => setScheduleConfig({ ...scheduleConfig, format: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900 focus:outline-none cursor-pointer"
                  >
                    <option value="PDF + Encrypted Ledger Hash">PDF + Signed Hash</option>
                    <option value="Excel / CSV Archive">Excel / CSV Archive</option>
                    <option value="NIST OSCAL JSON">NIST OSCAL JSON</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Delivery Recipients (Comma separated)</label>
                <input
                  type="text"
                  value={scheduleConfig.recipients}
                  onChange={(e) => setScheduleConfig({ ...scheduleConfig, recipients: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900 focus:outline-none"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowScheduleModal(false)}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs cursor-pointer"
                >
                  Save Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// ADMINISTRATION & GUARDRAILS SCREEN
// ============================================================================

export function AdministrationScreen({
  appState,
  setAppState,
  notify
}: {
  appState: any;
  setAppState: React.Dispatch<React.SetStateAction<any>>;
  notify: (msg: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}) {
  const [activeTab, setActiveTab] = useState('guardrails');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteForm, setInviteForm] = useState({
    name: '',
    email: '',
    role: 'SecOps Incident Commander',
    department: 'Global Security & Operations'
  });

  // Guardrail policies
  const [policies, setPolicies] = useState([
    {
      id: 'POL-AI-01',
      name: 'Financial Action Blast Radius Ceiling (> $100K)',
      category: 'Treasury & Revenue',
      enforcement: 'Strict Enforce',
      status: 'Active',
      desc: 'Autonomous financial actions exceeding $100,000 ARR strictly require dual CISO and VP Finance signoff.'
    },
    {
      id: 'POL-AI-02',
      name: 'Kernel Driver & Ring-0 Injection Guardrail',
      category: 'SecOps & EDR',
      enforcement: 'Strict Enforce',
      status: 'Active',
      desc: 'Prohibits any autonomous agent from loading kernel modules without hardware FIPS enclave attestation.'
    },
    {
      id: 'POL-CRM-004',
      name: 'Commercial Non-Standard Discount Corridor (> 15%)',
      category: 'Commercial Deal Desk',
      enforcement: 'Strict Enforce',
      status: 'Active',
      desc: 'All CPQ quotes exceeding 15% discount hurdle require Deal Desk VP approval before e-signature dispatch.'
    },
    {
      id: 'POL-SCM-014',
      name: 'Maritime Lane & Intermodal Rerouting Ceiling',
      category: 'Supply Chain',
      enforcement: 'Active',
      status: 'Active',
      desc: 'Logistics Rerouter can reroute up to 2,000 TEU before triggering Executive Supply Operations intervention.'
    },
    {
      id: 'POL-FED-009',
      name: 'FedRAMP High & CJIS Data Sovereignty Boundary',
      category: 'GRC & FedRAMP',
      enforcement: 'Strict Enforce',
      status: 'Active',
      desc: 'Restricts sovereign tenant telemetry ingest exclusively to AWS GovCloud / Azure Government enclaves.'
    }
  ]);

  // Enterprise Users
  const [users, setUsers] = useState([
    {
      id: 'USR-01',
      name: 'Marcus Vance',
      email: 'marcus.vance@apexglobal.io',
      role: 'CISO & VP Enterprise Operations',
      department: 'Executive Security',
      mfa: 'Hardware FIDO2 WebAuthn',
      status: 'Active'
    },
    {
      id: 'USR-02',
      name: 'Elena Rostova',
      email: 'elena.rostova@apexglobal.io',
      role: 'VP Treasury & Global Finance',
      department: 'Global Finance',
      mfa: 'Hardware FIDO2 WebAuthn',
      status: 'Active'
    },
    {
      id: 'USR-03',
      name: 'Sarah Jenkins',
      email: 'sarah.jenkins@apexglobal.io',
      role: 'SecOps Incident Commander',
      department: 'Security Operations',
      mfa: 'TOTP Verified',
      status: 'Active'
    },
    {
      id: 'USR-04',
      name: 'David Chen',
      email: 'david.chen@apexglobal.io',
      role: 'Platform Infrastructure Lead',
      department: 'Cloud Infrastructure',
      mfa: 'Hardware FIDO2 WebAuthn',
      status: 'Active'
    },
    {
      id: 'USR-SYS',
      name: 'AGT-AIIA-DAEMON',
      email: 'mesh-daemon@apexglobal.internal',
      role: 'Autonomous Neural Mesh Service Principal',
      department: 'System Architecture',
      mfa: 'mTLS Client Cert',
      status: 'Active'
    }
  ]);

  const handleTogglePolicyStatus = (policyId: string) => {
    setPolicies((prev) =>
      prev.map((p) => {
        if (p.id === policyId) {
          const nextStatus = p.status === 'Active' ? 'Audit Only' : 'Active';
          notify(`Updated ${p.id} enforcement to ${nextStatus}. Action Firewall synchronized.`, 'info');
          return { ...p, status: nextStatus };
        }
        return p;
      })
    );
  };

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteForm.name.trim() || !inviteForm.email.trim()) return;

    const newId = `USR-0${users.length + 1}`;
    const newUser = {
      id: newId,
      name: inviteForm.name.trim(),
      email: inviteForm.email.trim(),
      role: inviteForm.role,
      department: inviteForm.department,
      mfa: 'Pending Setup (FIDO2 Required)',
      status: 'Invited'
    };

    setUsers([...users, newUser]);
    setShowInviteModal(false);
    setInviteForm({
      name: '',
      email: '',
      role: 'SecOps Incident Commander',
      department: 'Global Security & Operations'
    });
    notify(`Invited ${newUser.name} as ${newUser.role}. FIDO2 provisioning link dispatched.`, 'success');
  };

  const handleTestIdp = (idpName: string) => {
    notify(`Testing connection to ${idpName}... SAML 2.0 handshake verified (Response: 34ms).`, 'success');
  };

  const handleSyncDirectory = () => {
    notify('SCIM 2.0 User Directory Synchronized: 3,412 enterprise identities verified.', 'success');
  };

  return (
    <div className="space-y-6">
      {/* 1. Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-purple-600 bg-purple-50 px-2 py-0.5 rounded-sm border border-purple-200 font-semibold">
              TENANT ADMINISTRATION & CONSTITUTIONAL GUARDRAILS
            </span>
            <span className="text-xs text-slate-400">|</span>
            <span className="text-xs text-slate-500 font-medium">FIPS 140-3 Hardware Enclave</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-1 flex items-center gap-2.5">
            <Sliders className="w-6 h-6 text-purple-600" />
            Administration & Guardrails
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure SSO/SCIM identity federation, role-based access control (RBAC), and Constitutional AI Action Firewall blast-radius thresholds.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => notify('Audit syslog exported to SIEM (RFC 5424 formatted).', 'success')}
            className="px-3.5 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 shadow-xs transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            Export Syslog
          </button>
          <button
            onClick={() => setShowInviteModal(true)}
            className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Invite Administrator
          </button>
        </div>
      </div>

      {/* 2. Top KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Hardware MFA Enforcement"
          value="100%"
          subtext="FIDO2 WebAuthn"
          trend="Strict Enforce"
          trendPositive={true}
          accentColor="emerald"
          sparkValues={[100, 100, 100, 100, 100, 100, 100]}
        />
        <KpiCard
          title="Active Admin Seats"
          value="14 / 20"
          subtext="6 available"
          trend="Tier-1 Ent"
          trendPositive={true}
          accentColor="blue"
          sparkValues={[10, 11, 12, 12, 13, 14, 14]}
        />
        <KpiCard
          title="Constitutional Guardrails"
          value="42 Active"
          subtext="Action Firewall"
          trend="Zero Bypasses"
          trendPositive={true}
          accentColor="purple"
          sparkValues={[36, 38, 40, 41, 42, 42, 42]}
        />
        <KpiCard
          title="Cryptographic Ledger"
          value="FIPS 140-3"
          subtext="ECDSA P-256"
          trend="Immutable"
          trendPositive={true}
          accentColor="indigo"
          sparkValues={[1, 1, 1, 1, 1, 1, 1]}
        />
      </div>

      {/* 3. Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-2">
        {[
          { id: 'guardrails', label: 'Constitutional AI Guardrails', icon: ShieldCheck },
          { id: 'rbac', label: 'Role-Based Access Control (RBAC)', icon: Users },
          { id: 'idp', label: 'Identity Federation (SAML / SCIM)', icon: Key },
          { id: 'audit', label: 'Administrative Audit Log', icon: Terminal }
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition cursor-pointer ${
                isActive
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 4. Tab Contents */}

      {/* TAB 1: Constitutional Guardrails */}
      {activeTab === 'guardrails' && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Constitutional AI Policies & Blast-Radius Rules</h3>
              <p className="text-xs text-slate-500">Every autonomous agent action is evaluated in hardware enclaves against these non-bypassable guardrails.</p>
            </div>
            <span className="text-xs font-mono font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
              5 Core Policies
            </span>
          </div>

          <div className="space-y-3">
            {policies.map((p) => (
              <div key={p.id} className="p-3.5 rounded-lg border border-slate-200 hover:border-slate-300 transition bg-slate-50/50 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                      {p.id}
                    </span>
                    <span className="font-bold text-xs text-slate-900">{p.name}</span>
                    <span className="text-[10px] text-slate-400 font-medium">({p.category})</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">{p.desc}</p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold border font-mono ${
                    p.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                  }`}>
                    {p.status}
                  </span>
                  <button
                    onClick={() => handleTogglePolicyStatus(p.id)}
                    className="px-3 py-1.5 rounded-md text-xs font-semibold bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 transition cursor-pointer"
                  >
                    {p.status === 'Active' ? 'Set to Audit Only' : 'Strict Enforce'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: RBAC & Users */}
      {activeTab === 'rbac' && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs space-y-4 p-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Role-Based Access Control (RBAC) & Administrators</h3>
              <p className="text-xs text-slate-500">Enterprise administrators, department executives, and autonomous daemon service principals.</p>
            </div>
            <span className="text-xs font-mono font-bold text-slate-800">{users.length} Total Principals</span>
          </div>

          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Principal / Name</th>
                <th className="py-2.5 px-3">Assigned Role</th>
                <th className="py-2.5 px-3">Department</th>
                <th className="py-2.5 px-3">Authentication & MFA</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50 transition">
                  <td className="py-3 px-3">
                    <div className="font-semibold text-slate-900">{u.name}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{u.email}</div>
                  </td>
                  <td className="py-3 px-3 font-medium text-slate-700">{u.role}</td>
                  <td className="py-3 px-3 text-slate-500">{u.department}</td>
                  <td className="py-3 px-3">
                    <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {u.mfa}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                      {u.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => notify(`Updated permissions for ${u.name}.`, 'info')}
                      className="px-2.5 py-1 rounded text-xs font-semibold text-slate-600 hover:text-blue-600 hover:bg-slate-100 transition cursor-pointer"
                    >
                      Edit →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 3: Identity Federation (SAML / SCIM) */}
      {activeTab === 'idp' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">SAML 2.0 & OIDC Identity Providers</h3>
              <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                FEDERATED
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">Okta Enterprise SSO</div>
                  <div className="text-[11px] text-slate-500">Entity ID: okta.apexglobal.io · JIT Provisioning Active</div>
                </div>
                <button
                  onClick={() => handleTestIdp('Okta Enterprise SSO')}
                  className="px-3 py-1.5 rounded-md bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold cursor-pointer"
                >
                  Test Connection
                </button>
              </div>

              <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">Microsoft Entra ID (Azure AD)</div>
                  <div className="text-[11px] text-slate-500">Standby Secondary Tenant · Conditional Access Enforced</div>
                </div>
                <button
                  onClick={() => handleTestIdp('Microsoft Entra ID')}
                  className="px-3 py-1.5 rounded-md bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold cursor-pointer"
                >
                  Test Connection
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">SCIM 2.0 Automated User Provisioning</h3>
              <span className="text-xs font-mono font-bold text-blue-600">3,412 Active Sync</span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Real-time synchronization for role updates, department transfers, and immediate offboarding de-provisioning within 2.4 seconds.
            </p>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Last Successful Sync:</span>
                <span className="font-medium text-slate-800">4 minutes ago</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Endpoint Hygiene Hook:</span>
                <span className="text-emerald-600 font-semibold">Automatic CrowdStrike sync</span>
              </div>
            </div>

            <button
              onClick={handleSyncDirectory}
              className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold text-center transition cursor-pointer"
            >
              Sync Directory Now
            </button>
          </div>
        </div>
      )}

      {/* TAB 4: Administrative Audit Log */}
      {activeTab === 'audit' && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Administrative Ledger & Immutable Session Audit</h3>
              <p className="text-xs text-slate-500">Real-time log of administrative policy modifications and authorization grants.</p>
            </div>
            <span className="text-xs font-mono text-slate-500">FIPS 140-3 Sealed</span>
          </div>

          <div className="space-y-2 text-xs font-mono">
            {[
              { id: 'LOG-8841', actor: 'marcus.vance (CISO)', action: 'Enforced POL-AI-01 Financial Blast Radius Ceiling', time: '12m ago', ip: '10.240.12.88' },
              { id: 'LOG-8839', actor: 'sarah.jenkins (SecOps)', action: 'Approved Sandbox Execution for REM-2026-309', time: '28m ago', ip: '10.240.12.92' },
              { id: 'LOG-8832', actor: 'mesh-daemon (System)', action: 'Re-seeded cryptographic hash SI-2 / EVD-7741', time: '1h ago', ip: '127.0.0.1' },
              { id: 'LOG-8828', actor: 'elena.rostova (VP Fin)', action: 'Authorized Meridian Health Group 14.5% CPQ rider', time: '2h ago', ip: '10.240.14.19' }
            ].map((l) => (
              <div key={l.id} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-purple-700 font-bold">{l.id}</span>
                  <span className="text-slate-700">{l.action}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-400 text-[11px]">
                  <span>{l.actor}</span>
                  <span>IP: {l.ip}</span>
                  <span>{l.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Plus className="w-4 h-4 text-purple-600" />
                Invite Enterprise Administrator
              </h3>
              <button onClick={() => setShowInviteModal(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleInviteSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  value={inviteForm.name}
                  onChange={(e) => setInviteForm({ ...inviteForm, name: e.target.value })}
                  placeholder="e.g. Rachel Sterling"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Corporate Email Address *</label>
                <input
                  type="email"
                  value={inviteForm.email}
                  onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })}
                  placeholder="e.g. rachel.sterling@apexglobal.io"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Enterprise Role</label>
                  <select
                    value={inviteForm.role}
                    onChange={(e) => setInviteForm({ ...inviteForm, role: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900 focus:outline-none cursor-pointer"
                  >
                    <option value="SecOps Incident Commander">SecOps Incident Commander</option>
                    <option value="Compliance & GRC Auditor">Compliance & GRC Auditor</option>
                    <option value="Deal Desk VP">Deal Desk VP</option>
                    <option value="DevOps Infrastructure Admin">DevOps Infrastructure Admin</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Department</label>
                  <input
                    type="text"
                    value={inviteForm.department}
                    onChange={(e) => setInviteForm({ ...inviteForm, department: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold shadow-xs cursor-pointer"
                >
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// PLATFORM SETTINGS SCREEN
// ============================================================================

export function PlatformSettingsScreen({
  appState,
  setAppState,
  onResetDemo,
  notify
}: {
  appState: any;
  setAppState: React.Dispatch<React.SetStateAction<any>>;
  onResetDemo: () => void;
  notify: (msg: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}) {
  const [orgName, setOrgName] = useState(appState.organization || 'Apex Global Financial — Prod');
  const [userRole, setUserRole] = useState(appState.currentUserRole || 'CISO & VP Enterprise Operations');
  const [primaryModel, setPrimaryModel] = useState('Claude 3.5 Sonnet (Governed)');
  const [confidenceHurdle, setConfidenceHurdle] = useState(85);
  const [maxHourlyActions, setMaxHourlyActions] = useState(500);
  const [autoPauseOnBreach, setAutoPauseOnBreach] = useState(true);
  const [ring0AutoRestart, setRing0AutoRestart] = useState(true);

  // Webhooks
  const [webhooks, setWebhooks] = useState([
    { id: 'WH-01', name: 'Splunk Enterprise Security', endpoint: 'https://splunk.apexglobal.io/hec/v1', status: 'Connected', enabled: true },
    { id: 'WH-02', name: 'ServiceNow ITSM Connector', endpoint: 'https://apexglobal.service-now.com/api/v2', status: 'Connected', enabled: true },
    { id: 'WH-03', name: 'CrowdStrike Falcon Fusion Stream', endpoint: 'Active Real-Time Telemetry', status: 'Connected', enabled: true },
    { id: 'WH-04', name: 'Slack Executive Incident War Room', endpoint: '#secops-critical-alerts', status: 'Connected', enabled: true },
    { id: 'WH-05', name: 'Jira Service Management', endpoint: 'https://jira.apexglobal.io/rest/api/2', status: 'Connected', enabled: true },
    { id: 'WH-06', name: 'PagerDuty Escrow Bridge', endpoint: 'P1 Security Escalation Service', status: 'Connected', enabled: true }
  ]);

  const handleTestPing = (whName: string) => {
    notify(`Test ping delivered to ${whName}: HTTP 200 OK (Latency: 28ms).`, 'success');
  };

  const handleToggleWebhook = (whId: string) => {
    setWebhooks((prev) =>
      prev.map((w) => (w.id === whId ? { ...w, enabled: !w.enabled } : w))
    );
    notify('Webhook endpoint status updated.', 'info');
  };

  const handleSaveSettings = () => {
    setAppState((prev: any) => ({
      ...prev,
      organization: orgName,
      currentUserRole: userRole
    }));
    notify('Platform settings saved successfully. Local state synchronized.', 'success');
  };

  const handleDownloadStateJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(appState, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `PrAiiA_State_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    notify('Full prototype state JSON downloaded.', 'success');
  };

  return (
    <div className="space-y-6">
      {/* 1. Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-sm border border-emerald-200 font-semibold">
              SYSTEM CONFIGURATION & TELEMETRY
            </span>
            <span className="text-xs text-slate-400">|</span>
            <span className="text-xs text-slate-500 font-medium">State Version: LocalStorage v4</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-1 flex items-center gap-2.5">
            <Sliders className="w-6 h-6 text-emerald-600" />
            Platform Settings & Webhooks
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage workspace preferences, SIEM/SOAR webhooks, neural mesh telemetry, and state persistence.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={onResetDemo}
            className="px-3.5 py-2 rounded-lg border border-red-300 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold flex items-center gap-1.5 shadow-xs transition cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5 text-red-600" />
            Reset Demo State
          </button>
          <button
            onClick={handleSaveSettings}
            className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition cursor-pointer"
          >
            <Save className="w-4 h-4" />
            Save All Settings
          </button>
        </div>
      </div>

      {/* 2. Top KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Persistence Mode"
          value="v4 Active"
          subtext="Local storage"
          trend="Healthy"
          trendPositive={true}
          accentColor="blue"
          sparkValues={[1, 1, 1, 1, 1, 1, 1]}
        />
        <KpiCard
          title="Neural Mesh Engine"
          value="v4.18"
          subtext="Sub-40ms latency"
          trend="Optimized"
          trendPositive={true}
          accentColor="emerald"
          sparkValues={[38, 36, 35, 34, 32, 30, 28]}
        />
        <KpiCard
          title="Active Webhooks"
          value="6 / 6 Live"
          subtext="Zero failed events"
          trend="100% Delivery"
          trendPositive={true}
          accentColor="indigo"
          sparkValues={[6, 6, 6, 6, 6, 6, 6]}
        />
        <KpiCard
          title="Golden Thread Sync"
          value="Step 1 of 11"
          subtext="INC-2026-8842"
          trend="Active"
          trendPositive={true}
          accentColor="purple"
          sparkValues={[1, 1, 1, 1, 1, 1, 1]}
        />
      </div>

      {/* 3. Settings Sections Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Section 1: General Workspace & Roles */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900">Workspace & Organization Branding</h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-bold border border-blue-200">
              PROD
            </span>
          </div>

          <div className="space-y-3.5 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Organization Name</label>
              <input
                type="text"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Active User Role (Persona Preview)</label>
              <select
                value={userRole}
                onChange={(e) => setUserRole(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900 focus:outline-none cursor-pointer"
              >
                <option value="CISO & VP Enterprise Operations">CISO & VP Enterprise Operations (Super Admin)</option>
                <option value="SecOps Incident Commander">SecOps Incident Commander (SecOps Lead)</option>
                <option value="VP Treasury & Global Finance">VP Treasury & Global Finance (Executive)</option>
                <option value="Compliance & GRC Officer">Compliance & GRC Officer (Auditor)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Deployment Tier</label>
              <input
                type="text"
                disabled
                value="Multi-Region Enterprise Dedicated (US-East & EU-West)"
                className="w-full bg-slate-100 border border-slate-200 rounded-lg p-2 text-slate-500 cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Section 2: AI Orchestration & Confidence */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900">AI Workforce & Model Orchestration</h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
              GOVERNED
            </span>
          </div>

          <div className="space-y-3.5 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Primary LLM Reasoning Engine</label>
              <select
                value={primaryModel}
                onChange={(e) => setPrimaryModel(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900 focus:outline-none cursor-pointer"
              >
                <option value="Claude 3.5 Sonnet (Governed)">Claude 3.5 Sonnet (Governed Enclave)</option>
                <option value="GPT-4o Enterprise">GPT-4o Enterprise (Dedicated Cluster)</option>
                <option value="Gemini 1.5 Pro Governed">Gemini 1.5 Pro (DeepMind Enclave)</option>
              </select>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-semibold text-slate-700">Autonomous Execution Confidence Hurdle</label>
                <span className="font-mono font-bold text-emerald-600">{confidenceHurdle}%</span>
              </div>
              <input
                type="range"
                min="60"
                max="99"
                value={confidenceHurdle}
                onChange={(e) => setConfidenceHurdle(Number(e.target.value))}
                className="w-full cursor-pointer accent-blue-600"
              />
              <span className="text-[10px] text-slate-400">Actions scoring below this threshold require human signoff.</span>
            </div>

            <div className="pt-2 border-t border-slate-100 space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoPauseOnBreach}
                  onChange={(e) => setAutoPauseOnBreach(e.target.checked)}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <span className="font-semibold text-slate-800">Auto-pause agents on Action Firewall policy breach</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={ring0AutoRestart}
                  onChange={(e) => setRing0AutoRestart(e.target.checked)}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <span className="font-semibold text-slate-800">Ring-0 Sensor Watchdog & Self-Healing Playbook</span>
              </label>
            </div>
          </div>
        </div>

        {/* Section 3: Webhook Integrations */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">SIEM, SOAR & Event Webhook Connectors</h3>
              <p className="text-xs text-slate-500">Real-time bi-directional streaming for incidents, telemetry, and audit events.</p>
            </div>
            <button
              onClick={() => notify('Webhook connector added.', 'info')}
              className="px-3 py-1.5 rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-semibold border border-blue-200 transition cursor-pointer flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Endpoint</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {webhooks.map((w) => (
              <div key={w.id} className="p-3 rounded-lg border border-slate-200 bg-slate-50/50 flex items-center justify-between gap-3">
                <div className="space-y-0.5 truncate">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${w.enabled ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
                    <span>{w.name}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono truncate">{w.endpoint}</div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleTestPing(w.name)}
                    className="px-2.5 py-1 rounded bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-[11px] font-semibold cursor-pointer"
                  >
                    Test Ping
                  </button>
                  <button
                    onClick={() => handleToggleWebhook(w.id)}
                    className={`px-2 py-1 rounded text-[11px] font-bold cursor-pointer ${
                      w.enabled ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {w.enabled ? 'ON' : 'OFF'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Data Retention & State Controls */}
        <div className="lg:col-span-2 bg-slate-900 text-white rounded-xl p-5 shadow-xs space-y-4 border border-slate-800">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-white">Prototype State & Local Storage Management</h3>
              <p className="text-xs text-slate-400">Controls for persistent simulation data, Golden Thread state, and JSON exports.</p>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded font-bold">
              v4 SYNCHRONIZED
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="space-y-1">
              <span className="text-slate-400 block">Current Organization Context:</span>
              <span className="font-semibold text-white block">{appState.organization}</span>
              <span className="text-[11px] text-slate-400 block font-mono">
                Incidents: {appState.incidents?.length || 0} · Endpoints: {appState.endpoints?.length || 0} · CRM: {appState.crmRecords?.length || 0} · SCM: {appState.supplyChainPlans?.length || 0}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={handleDownloadStateJson}
                className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export State JSON</span>
              </button>

              <button
                onClick={onResetDemo}
                className="px-3.5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Re-Seed Golden Thread</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
