import React, { useState } from 'react';
import {
  Users, DollarSign, TrendingUp, UserPlus, ArrowUpRight, PhoneCall, Target,
  ShieldCheck, CheckCircle2, AlertTriangle, Sparkles, Download, Plus, Filter,
  Search, X, CheckSquare, Laptop, Lock, ArrowLeft, ChevronRight, Check, Play
} from 'lucide-react';

// ============================================================================
// DEFAULT CRM MOCK DATA & AGENTS (ORBITNAPP NEXORA CRM & ENTERPRISE PIPELINE)
// ============================================================================

export const DEFAULT_CRM_RECORDS = [
  {
    id: 'OPP-30871',
    name: 'Enterprise platform renewal',
    account: 'Meridian Health Group',
    amount: '$1,420,000',
    amountRaw: 1420000,
    closeDate: 'Dec 15',
    status: 'Qualified',
    agentTouched: true,
    submodule: 'Opportunities',
    submoduleIdx: 1,
    contactName: 'Dr. Alistair Vance',
    contactRole: 'Chief Information Officer',
    contactEmail: 'a.vance@meridianhealth.org',
    stage: 'Stage 3 - Technical Validation',
    probability: 75,
    handlingAgent: 'Lead Qualifier',
    dealCoachAgent: 'Deal Coach',
    quoteAgent: 'Quote Agent',
    policy: 'POL-CRM-004',
    firewallChecks: '8/8 checks passed',
    evidenceHash: 'a710bf4912e84011',
    linkedIncident: 'INC-2026-8842',
    linkedDevice: 'END-FIN-094',
    discountRequested: '14.5%',
    discountMaxCorridor: '15.0%',
    termMonths: 36,
    notes: 'Multi-hospital EHR cloud migration and security compliance rider approved under HIPAA BAAs.',
    timeline: [
      { date: 'Nov 02', title: 'Inbound expansion request received', actor: 'A. Vance (CIO)' },
      { date: 'Nov 04', title: 'Lead Qualifier enriched ICP profile & tech stack', actor: 'Lead Qualifier (L4 Agent)' },
      { date: 'Nov 12', title: 'Deal Coach verified 14.5% 3-year term discount policy', actor: 'Deal Coach (L2 Agent)' },
      { date: 'Nov 20', title: 'Action Firewall certified policy compliance POL-CRM-004', actor: 'Action Firewall' }
    ]
  },
  {
    id: 'OPP-30884',
    name: 'Net-new — Smart grid analytics',
    account: 'Voltara Energy',
    amount: '$860,000',
    amountRaw: 860000,
    closeDate: 'Nov 30',
    status: 'Proposed',
    agentTouched: true,
    submodule: 'Quotes & Orders',
    submoduleIdx: 2,
    contactName: 'Helena Berg',
    contactRole: 'VP Operational Technology',
    contactEmail: 'h.berg@voltara-energy.com',
    stage: 'Stage 4 - Proposal & Terms',
    probability: 65,
    handlingAgent: 'Deal Coach',
    dealCoachAgent: 'Deal Coach',
    quoteAgent: 'Quote Agent',
    policy: 'POL-CRM-004',
    firewallChecks: '8/8 checks passed',
    evidenceHash: 'c904fa18209eb412',
    linkedIncident: 'INC-2026-8842',
    linkedDevice: 'END-FIN-094',
    discountRequested: '10.0%',
    discountMaxCorridor: '12.0%',
    termMonths: 24,
    notes: 'SCADA infrastructure telemetry ingest with distributed edge compute nodes.',
    timeline: [
      { date: 'Oct 15', title: 'Inbound RFP via European Energy Consortium', actor: 'H. Berg' },
      { date: 'Oct 22', title: 'Lead Qualifier parsed RFP specs against product capability matrix', actor: 'Lead Qualifier (L4 Agent)' },
      { date: 'Nov 05', title: 'Quote Agent generated formal quote QTE-90124', actor: 'Quote Agent (L3 Agent)' }
    ]
  },
  {
    id: 'LD-77120',
    name: 'Inbound — CFO webinar attendee',
    account: 'Harbor Freight Systems',
    amount: '$220,000',
    amountRaw: 220000,
    closeDate: 'Jan 31',
    status: 'New',
    agentTouched: true,
    submodule: 'Leads',
    submoduleIdx: 0,
    contactName: 'Marcus Holloway',
    contactRole: 'Head of IT Procurement',
    contactEmail: 'm.holloway@harborfreight-sys.com',
    stage: 'Stage 1 - Discovery & Enrichment',
    probability: 40,
    handlingAgent: 'Lead Qualifier',
    dealCoachAgent: 'Deal Coach',
    quoteAgent: 'Quote Agent',
    policy: 'POL-CRM-002',
    firewallChecks: '8/8 checks passed',
    evidenceHash: '8b41092e0fa55182',
    linkedIncident: null,
    linkedDevice: null,
    discountRequested: '0.0%',
    discountMaxCorridor: '10.0%',
    termMonths: 12,
    notes: 'Interested in autonomous endpoint management and automated ITSM incident triage.',
    timeline: [
      { date: 'Nov 18', title: 'Registered and attended Executive CFO Tech Briefing', actor: 'Webinar Portal' },
      { date: 'Nov 19', title: 'Lead Qualifier enriched company firmographics (3,400 endpoints)', actor: 'Lead Qualifier (L4 Agent)' }
    ]
  },
  {
    id: 'CS-40119',
    name: 'Core Banking Infrastructure & Expansion',
    account: 'Apex Global Financial',
    amount: '$2,450,000',
    amountRaw: 2450000,
    closeDate: 'Jan 10',
    status: 'Active',
    agentTouched: true,
    submodule: 'Customer Success',
    submoduleIdx: 3,
    contactName: 'Elena Rostova',
    contactRole: 'VP Treasury & Global Finance',
    contactEmail: 'elena.rostova@apexglobal.io',
    stage: 'Stage 6 - Customer Success & Retention',
    probability: 95,
    handlingAgent: 'Churn Sentinel',
    dealCoachAgent: 'Deal Coach',
    quoteAgent: 'Quote Agent',
    policy: 'POL-CRM-009',
    firewallChecks: '8/8 checks passed (FedRAMP / SOC2)',
    evidenceHash: 'fe7109248bb01994',
    linkedIncident: 'INC-2026-8842',
    linkedDevice: 'END-FIN-094',
    discountRequested: '8.0%',
    discountMaxCorridor: '10.0%',
    termMonths: 36,
    notes: 'Flagship enterprise tier. Linked to P1 incident INC-2026-8842 remediation. Proactive CS agent engaged.',
    timeline: [
      { date: 'Nov 01', title: 'Annual executive QBR initiated with CISO Marcus Vance & Elena Rostova', actor: 'Account Director' },
      { date: 'Nov 14', title: 'Churn Sentinel monitored telemetry recovery on END-FIN-094 workstation', actor: 'Churn Sentinel (L3 Agent)' },
      { date: 'Nov 18', title: 'Proactive renewal contract draft prepared with zero SLA penalty credits', actor: 'Deal Coach (L2 Agent)' }
    ]
  },
  {
    id: 'OPP-30902',
    name: 'Expansion — 4,000 seats',
    account: 'Kestrel Bank',
    amount: '$2,150,000',
    amountRaw: 2150000,
    closeDate: 'Nov 12',
    status: 'Closed Won',
    agentTouched: false,
    submodule: 'Opportunities',
    submoduleIdx: 1,
    contactName: 'Simon Kestrel',
    contactRole: 'Chief Technology Officer',
    contactEmail: 's.kestrel@kestrelbank.co.uk',
    stage: 'Stage 5 - Executed & Booked',
    probability: 100,
    handlingAgent: 'Human team',
    dealCoachAgent: 'Deal Coach',
    quoteAgent: 'Quote Agent',
    policy: 'POL-CRM-004',
    firewallChecks: 'Signed & verified',
    evidenceHash: '44a019842bf6910a',
    linkedIncident: null,
    linkedDevice: null,
    discountRequested: '12.0%',
    discountMaxCorridor: '15.0%',
    termMonths: 36,
    notes: 'Tier-1 UK bank retail banking digital transformation rollout across 180 branches.',
    timeline: [
      { date: 'Oct 01', title: 'Contract draft approved by legal and executive board', actor: 'Legal Counsel' },
      { date: 'Nov 12', title: 'Electronic signature finalized via DocuSign; deal closed won', actor: 'S. Kestrel (CTO)' }
    ]
  },
  {
    id: 'OPP-30911',
    name: 'Cross-sell — Observability',
    account: 'Halcyon Telecom',
    amount: '$540,000',
    amountRaw: 540000,
    closeDate: 'Dec 08',
    status: 'Evaluating',
    agentTouched: true,
    submodule: 'Quotes & Orders',
    submoduleIdx: 2,
    contactName: 'Nadia Solis',
    contactRole: 'Director of Cloud Infrastructure',
    contactEmail: 'n.solis@halcyon-telecom.net',
    stage: 'Stage 3 - Proof of Value',
    probability: 60,
    handlingAgent: 'Deal Coach',
    dealCoachAgent: 'Deal Coach',
    quoteAgent: 'Quote Agent',
    policy: 'POL-CRM-004',
    firewallChecks: '8/8 checks passed',
    evidenceHash: '66d019f4a18e2098',
    linkedIncident: null,
    linkedDevice: null,
    discountRequested: '12.5%',
    discountMaxCorridor: '15.0%',
    termMonths: 12,
    notes: 'Expanding existing ITSM deployment into network edge telemetry and AI self-healing.',
    timeline: [
      { date: 'Nov 08', title: 'Telemetry trial deployed on 500 edge gateways', actor: 'N. Solis' },
      { date: 'Nov 15', title: 'Deal Coach produced ROI summary showing 41% MTTR reduction', actor: 'Deal Coach (L2 Agent)' }
    ]
  },
  {
    id: 'OPP-30915',
    name: 'Renewal — at-risk',
    account: 'Pioneer Retail Group',
    amount: '$310,000',
    amountRaw: 310000,
    closeDate: 'Oct 31',
    status: 'At Risk',
    agentTouched: true,
    submodule: 'Customer Success',
    submoduleIdx: 3,
    contactName: 'Gareth Edwards',
    contactRole: 'VP Retail Operations',
    contactEmail: 'g.edwards@pioneer-retail.com',
    stage: 'Stage 4 - Retention & Recovery',
    probability: 35,
    handlingAgent: 'Churn Sentinel',
    dealCoachAgent: 'Deal Coach',
    quoteAgent: 'Quote Agent',
    policy: 'POL-CRM-008',
    firewallChecks: 'Risk flag elevated',
    evidenceHash: '992a0141bdf01934',
    linkedIncident: null,
    linkedDevice: null,
    discountRequested: '18.0%',
    discountMaxCorridor: '15.0%',
    termMonths: 12,
    notes: 'Account flagged by Churn Sentinel due to 34% drop in active admin logins and store restructuring.',
    timeline: [
      { date: 'Oct 10', title: 'Usage telemetry dropped 34% over 30 days', actor: 'Telemetry Engine' },
      { date: 'Oct 14', title: 'Churn Sentinel escalated retention plan to VP Customer Success', actor: 'Churn Sentinel (L3 Agent)' },
      { date: 'Oct 20', title: 'Executive sponsor meeting scheduled with account team', actor: 'P. Nair (CS Lead)' }
    ]
  },
  {
    id: 'OPP-30920',
    name: 'Public sector pilot',
    account: 'State of Oregon DAS',
    amount: '$475,000',
    amountRaw: 475000,
    closeDate: 'Feb 14',
    status: 'Proposed',
    agentTouched: false,
    submodule: 'Opportunities',
    submoduleIdx: 1,
    contactName: 'Carla Morales',
    contactRole: 'State Procurement Officer',
    contactEmail: 'carla.morales@das.oregon.gov',
    stage: 'Stage 2 - Scope Definition',
    probability: 50,
    handlingAgent: 'Human team',
    dealCoachAgent: 'Deal Coach',
    quoteAgent: 'Quote Agent',
    policy: 'POL-CRM-009',
    firewallChecks: 'Pending CJIS compliance check',
    evidenceHash: '314a9082ef781a02',
    linkedIncident: null,
    linkedDevice: null,
    discountRequested: '5.0%',
    discountMaxCorridor: '10.0%',
    termMonths: 24,
    notes: 'State government pilot for multi-agency autonomous endpoint hygiene and compliance.',
    timeline: [
      { date: 'Nov 05', title: 'State RFP response submitted with GSA schedule pricing', actor: 'Public Sector Desk' },
      { date: 'Nov 18', title: 'Invited to finalist technical demonstration', actor: 'C. Morales' }
    ]
  }
];

export const DEFAULT_CRM_AGENTS = [
  {
    id: 'AGT-CRM-01',
    name: 'Lead Qualifier',
    role: 'Scores and enriches inbound leads against ICP and historical win patterns using real-time firmographics and tech stack signals.',
    autonomyLevel: 'L4',
    autonomyLabel: 'Autonomous with audit',
    status: 'Active',
    owner: 'A. Mendez (Head of Revenue Ops)',
    actionsWeek: 4812,
    approvalRate: 98.6,
    recentAction: 'Auto-qualified and enriched Harbor Freight Systems ($220K ARR); matched 94% ICP score.',
    sparkValues: [45, 52, 60, 68, 72, 80, 89, 95]
  },
  {
    id: 'AGT-CRM-02',
    name: 'Deal Coach',
    role: 'Flags deal margin risks, calculates discount corridors against Action Firewall POL-CRM-004, and drafts executive win plans.',
    autonomyLevel: 'L2',
    autonomyLabel: 'Draft for approval',
    status: 'Active',
    owner: 'T. Brooks (VP Commercial Strategy)',
    actionsWeek: 182,
    approvalRate: 96.1,
    recentAction: 'Prepared 14.5% discount justification corridor for Meridian Health Group 36-mo renewal.',
    sparkValues: [38, 44, 50, 62, 59, 74, 82, 91]
  },
  {
    id: 'AGT-CRM-03',
    name: 'Quote Agent',
    role: 'Assembles compliant multi-year CPQ proposals, validates contractual riders with legal policies, and generates e-sign envelopes.',
    autonomyLevel: 'L3',
    autonomyLabel: 'Act with approval',
    status: 'Active',
    owner: 'C. Hale (Director Deal Desk)',
    actionsWeek: 319,
    approvalRate: 99.1,
    recentAction: 'Assembled Voltara Energy 24-mo edge SCADA quote QTE-90124 with automated legal riders.',
    sparkValues: [55, 60, 64, 71, 78, 85, 90, 96]
  },
  {
    id: 'AGT-CRM-04',
    name: 'Churn Sentinel',
    role: 'Detects retention risks from real-time endpoint telemetry, open P1 ITSM tickets, and drop in customer platform engagement.',
    autonomyLevel: 'L3',
    autonomyLabel: 'Act with approval',
    status: 'Active',
    owner: 'Y. Nakamura (VP Customer Success)',
    actionsWeek: 84,
    approvalRate: 92.4,
    recentAction: 'Monitored Apex Global Financial telemetry recovery post INC-2026-8842; protected $2.45M renewal.',
    sparkValues: [70, 65, 60, 52, 48, 62, 75, 84]
  }
];

// Helper for status badge styling
function getCrmStatusBadge(status: string) {
  const s = (status || '').toLowerCase();
  if (s.includes('closed won') || s.includes('active') || s.includes('approved')) {
    return 'bg-emerald-50 text-emerald-700 border-emerald-200';
  }
  if (s.includes('at risk')) {
    return 'bg-red-50 text-red-700 border-red-200';
  }
  if (s.includes('proposed') || s.includes('qualified')) {
    return 'bg-blue-50 text-blue-700 border-blue-200';
  }
  if (s.includes('evaluating') || s.includes('new')) {
    return 'bg-purple-50 text-purple-700 border-purple-200';
  }
  return 'bg-slate-100 text-slate-700 border-slate-200';
}

// Helper for account initials
function getInitials(accountName: string) {
  if (!accountName) return 'CR';
  const words = accountName.trim().split(/\s+/);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

// ============================================================================
// CRMScreen Component
// ============================================================================

export function CRMScreen({
  records,
  agents,
  onOpenRecord,
  navigateToRecord,
  setAppState,
  notify,
  requestConfirmation
}: {
  records: any[];
  agents: any[];
  onOpenRecord: (id: string) => void;
  navigateToRecord: (screen: string, recordId?: string) => void;
  setAppState: React.Dispatch<React.SetStateAction<any>>;
  notify: (msg: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  requestConfirmation: (opts: any) => void;
}) {
  const activeRecords = Array.isArray(records) && records.length > 0 ? records : DEFAULT_CRM_RECORDS;
  const activeAgents = Array.isArray(agents) && agents.length > 0 ? agents : DEFAULT_CRM_AGENTS;

  const [activeSubTab, setActiveSubTab] = useState('All');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortField, setSortField] = useState('id');
  const [sortAsc, setSortAsc] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [selectedDrawerRecord, setSelectedDrawerRecord] = useState<any>(null);
  const [inspectingAgent, setInspectingAgent] = useState<any>(null);
  const [showNewModal, setShowNewModal] = useState(false);
  const [formError, setFormError] = useState('');

  // Replay simulation state
  const [isReplaying, setIsReplaying] = useState(false);
  const [simulationStep, setSimulationStep] = useState(-1);

  // New opportunity form state
  const [newRecord, setNewRecord] = useState({
    name: '',
    account: '',
    amount: '',
    closeDate: 'Jan 15',
    submodule: 'Opportunities',
    contactName: '',
    contactEmail: '',
    assignedAgent: 'Lead Qualifier'
  });

  const submodules = ['All', 'Leads', 'Opportunities', 'Quotes & Orders', 'Customer Success'];
  const workflowSteps = [
    { num: '01', title: 'Lead capture', desc: 'Inbound RFPs & firmographic enrichment via Lead Qualifier (L4)', agent: 'Lead Qualifier' },
    { num: '02', title: 'ICP qualification', desc: 'Neural Fit scoring & budget authority validation (94% accuracy)', agent: 'Lead Qualifier' },
    { num: '03', title: 'Opportunity strategy', desc: 'Deal Coach analyzes competitive corridors & margin hurdles', agent: 'Deal Coach' },
    { num: '04', title: 'Quote & proposal', desc: 'Quote Agent generates CPQ pricing & Action Firewall POL-CRM-004 check', agent: 'Quote Agent' },
    { num: '05', title: 'Closing & hand-off', desc: 'E-sign execution and Churn Sentinel account onboarding telemetry', agent: 'Churn Sentinel' }
  ];

  const handleReplaySimulation = () => {
    if (isReplaying) return;
    setIsReplaying(true);
    setSimulationStep(0);

    const stepInterval = (step: number) => {
      if (step < 5) {
        setSimulationStep(step);
        setTimeout(() => stepInterval(step + 1), 600);
      } else {
        setTimeout(() => {
          setIsReplaying(false);
          setSimulationStep(-1);
          notify('Signature revenue workflow simulation completed. All 5 pipeline stages verified.', 'success');
        }, 800);
      }
    };
    stepInterval(0);
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  // Filter and sort records
  const filteredRecords = activeRecords
    .filter((r) => {
      const matchesSub = activeSubTab === 'All' || r.submodule === activeSubTab;
      const matchesStatus = statusFilter === 'All' || r.status === statusFilter;
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        r.id.toLowerCase().includes(q) ||
        r.name.toLowerCase().includes(q) ||
        r.account.toLowerCase().includes(q) ||
        (r.contactName && r.contactName.toLowerCase().includes(q)) ||
        (r.handlingAgent && r.handlingAgent.toLowerCase().includes(q));
      return matchesSub && matchesStatus && matchesSearch;
    })
    .sort((a, b) => {
      if (sortField === 'amountRaw') {
        const valA = Number(a.amountRaw || 0);
        const valB = Number(b.amountRaw || 0);
        return sortAsc ? valA - valB : valB - valA;
      }
      if (sortField === 'probability') {
        const valA = Number(a.probability || 0);
        const valB = Number(b.probability || 0);
        return sortAsc ? valA - valB : valB - valA;
      }
      const valA = String(a[sortField] || '');
      const valB = String(b[sortField] || '');
      return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
    });

  // Select all handler
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(new Set(filteredRecords.map((r) => r.id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const handleToggleRow = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  // Bulk actions
  const handleBulkApprove = () => {
    if (selectedIds.size === 0) return;
    setAppState((prev: any) => {
      const currentList = Array.isArray(prev.crmRecords) && prev.crmRecords.length > 0
        ? prev.crmRecords
        : activeRecords;
      return {
        ...prev,
        crmRecords: currentList.map((r: any) =>
          selectedIds.has(r.id) ? { ...r, status: 'Approved' } : r
        ),
        auditLog: [
          {
            id: `AUD-CRM-${Math.floor(1000 + Math.random() * 9000)}`,
            actor: 'CISO & VP Commercial Operations',
            action: `Bulk approved ${selectedIds.size} quotes / deals under Action Firewall Policy POL-CRM-004.`,
            time: 'Just now',
            status: 'Authorized'
          },
          ...(prev.auditLog || [])
        ]
      };
    });
    notify(`Approved ${selectedIds.size} quotes / deals — logged to Chain of Evidence.`, 'success');
    setSelectedIds(new Set());
  };

  const handleBulkMarkWon = () => {
    if (selectedIds.size === 0) return;
    setAppState((prev: any) => {
      const currentList = Array.isArray(prev.crmRecords) && prev.crmRecords.length > 0
        ? prev.crmRecords
        : activeRecords;
      return {
        ...prev,
        crmRecords: currentList.map((r: any) =>
          selectedIds.has(r.id) ? { ...r, status: 'Closed Won', probability: 100 } : r
        ),
        auditLog: [
          {
            id: `AUD-CRM-${Math.floor(1000 + Math.random() * 9000)}`,
            actor: 'Revenue Director',
            action: `Marked ${selectedIds.size} deals as Closed Won. ERP billing and license provisioning triggered.`,
            time: 'Just now',
            status: 'Closed Won'
          },
          ...(prev.auditLog || [])
        ]
      };
    });
    notify(`Marked ${selectedIds.size} deals as Closed Won — ERP provisioning initiated.`, 'success');
    setSelectedIds(new Set());
  };

  const handleBulkExport = () => {
    const listToExport = selectedIds.size > 0
      ? activeRecords.filter((r) => selectedIds.has(r.id))
      : filteredRecords;
    
    // Create CSV content
    const headers = ['ID', 'Account', 'Name', 'Amount', 'Close Date', 'Status', 'Submodule', 'Agent', 'Contact', 'Policy'];
    const rows = listToExport.map((r) => [
      r.id,
      `"${(r.account || '').replace(/"/g, '""')}"`,
      `"${(r.name || '').replace(/"/g, '""')}"`,
      r.amount,
      r.closeDate,
      r.status,
      r.submodule,
      r.handlingAgent,
      `"${(r.contactName || '').replace(/"/g, '""')}"`,
      r.policy
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `CRM_Pipeline_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    notify(`Export generated: ${listToExport.length} pipeline records downloaded as CSV.`, 'success');
  };

  // Create new opportunity
  const handleCreateOpportunity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRecord.account.trim() || !newRecord.name.trim()) {
      setFormError('Please enter both the Account name and Opportunity title.');
      return;
    }
    setFormError('');

    const rawNum = parseInt(newRecord.amount.replace(/[^0-9]/g, ''), 10) || 250000;
    const formattedAmount = '$' + rawNum.toLocaleString();
    const newId = `OPP-${Math.floor(30930 + Math.random() * 100)}`;

    const createdItem = {
      id: newId,
      name: newRecord.name.trim(),
      account: newRecord.account.trim(),
      amount: formattedAmount,
      amountRaw: rawNum,
      closeDate: newRecord.closeDate.trim() || 'Feb 28',
      status: 'Qualified',
      agentTouched: newRecord.assignedAgent !== 'Human team',
      submodule: newRecord.submodule,
      submoduleIdx: submodules.indexOf(newRecord.submodule) > 0 ? submodules.indexOf(newRecord.submodule) - 1 : 1,
      contactName: newRecord.contactName.trim() || 'Key Decision Maker',
      contactRole: 'VP Technology / Procurement',
      contactEmail: newRecord.contactEmail.trim() || 'procurement@enterprise.com',
      stage: 'Stage 2 - Qualification & Fit',
      probability: 50,
      handlingAgent: newRecord.assignedAgent,
      dealCoachAgent: 'Deal Coach',
      quoteAgent: 'Quote Agent',
      policy: 'POL-CRM-004',
      firewallChecks: '8/8 checks passed',
      evidenceHash: `evd-${Math.random().toString(36).substring(2, 10)}`,
      linkedIncident: null,
      linkedDevice: null,
      discountRequested: '5.0%',
      discountMaxCorridor: '12.0%',
      termMonths: 12,
      notes: 'Newly generated opportunity; agent ICP verification and firmographic sync initiated.',
      timeline: [
        { date: 'Today', title: 'Opportunity created in CRM', actor: 'Enterprise User' },
        { date: 'Today', title: `Assigned to ${newRecord.assignedAgent} for automated deal assist`, actor: newRecord.assignedAgent }
      ]
    };

    setAppState((prev: any) => {
      const currentList = Array.isArray(prev.crmRecords) && prev.crmRecords.length > 0
        ? prev.crmRecords
        : activeRecords;
      return {
        ...prev,
        crmRecords: [createdItem, ...currentList],
        auditLog: [
          {
            id: `AUD-CRM-${Math.floor(1000 + Math.random() * 9000)}`,
            actor: 'Revenue Operations',
            action: `Created new CRM record ${newId} for ${createdItem.account} (${createdItem.amount}) assigned to ${createdItem.handlingAgent}.`,
            time: 'Just now',
            status: 'Created'
          },
          ...(prev.auditLog || [])
        ]
      };
    });

    setShowNewModal(false);
    setNewRecord({
      name: '',
      account: '',
      amount: '',
      closeDate: 'Jan 15',
      submodule: 'Opportunities',
      contactName: '',
      contactEmail: '',
      assignedAgent: 'Lead Qualifier'
    });
    notify(`Created opportunity ${newId} for ${createdItem.account} — assigned to ${createdItem.handlingAgent}.`, 'success');
  };

  // Toggle agent status
  const handleToggleAgentStatus = (agentName: string) => {
    setAppState((prev: any) => {
      const currentAgents = Array.isArray(prev.crmAgents) && prev.crmAgents.length > 0
        ? prev.crmAgents
        : activeAgents;
      const nextAgents = currentAgents.map((a: any) => {
        if (a.name === agentName) {
          const nextStatus = a.status === 'Active' ? 'Paused' : 'Active';
          return { ...a, status: nextStatus };
        }
        return a;
      });
      return {
        ...prev,
        crmAgents: nextAgents,
        auditLog: [
          {
            id: `AUD-AGT-${Math.floor(1000 + Math.random() * 9000)}`,
            actor: 'AI Revenue Governor',
            action: `Toggled status of ${agentName} to ${nextAgents.find((x: any) => x.name === agentName)?.status}.`,
            time: 'Just now',
            status: 'Governance Change'
          },
          ...(prev.auditLog || [])
        ]
      };
    });

    const curr = activeAgents.find((a) => a.name === agentName);
    const willBe = curr?.status === 'Active' ? 'Paused' : 'Active';
    notify(`${agentName} is now ${willBe}. Action Firewall routing updated.`, willBe === 'Active' ? 'success' : 'info');
    if (inspectingAgent) {
      setInspectingAgent((prev: any) => (prev ? { ...prev, status: willBe } : null));
    }
  };

  // Authorize Deal Desk Discount for Meridian Health Group
  const handleAuthorizeDiscount = (recordId: string) => {
    setAppState((prev: any) => {
      const currentList = Array.isArray(prev.crmRecords) && prev.crmRecords.length > 0
        ? prev.crmRecords
        : activeRecords;
      const updatedList = currentList.map((r: any) =>
        r.id === recordId
          ? {
              ...r,
              status: 'Proposed',
              stage: 'Stage 4 - Proposal & Terms',
              notes: '14.5% non-standard discount approved by Deal Desk VP under POL-CRM-004. Contract rider sealed.'
            }
          : r
      );
      return {
        ...prev,
        crmRecords: updatedList,
        auditLog: [
          {
            id: `AUD-DISC-${Math.floor(1000 + Math.random() * 9000)}`,
            actor: 'Deal Desk VP & Action Firewall',
            action: `Authorized 14.5% multi-year discount for ${recordId} under Policy POL-CRM-004.`,
            time: 'Just now',
            status: 'Authorized'
          },
          ...(prev.auditLog || [])
        ]
      };
    });

    notify('Authorized 14.5% discount for Meridian Health Group — Deal Desk policy certified and logged to Chain of Evidence.', 'success');
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Section */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-sm border border-blue-200 font-semibold">
              PR AIIA ENTERPRISE · AUTONOMOUS REVENUE ENGINE
            </span>
            <span className="text-xs text-slate-400">|</span>
            <span className="text-xs text-slate-500 font-medium">Model: Claude 3.5 Sonnet (Governed)</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-1 flex items-center gap-2.5">
            <Users className="w-6 h-6 text-blue-600" />
            CRM & Customer Pipeline
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Pipeline you can trust: agents qualify, enrich, and draft — sellers close.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleBulkExport}
            className="px-3.5 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 shadow-xs transition"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            Export Pipeline CSV
          </button>
          <button
            onClick={() => setShowNewModal(true)}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition"
          >
            <Plus className="w-4 h-4" />
            New Opportunity
          </button>
        </div>
      </div>

      {/* 2. Top Metric KPI Cards (Nexora k: Win Rate, Pipeline Coverage, Churn TTM + AI Deal Assist) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4.5 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Win Rate</span>
            <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-sm border border-emerald-200">
              +2.7 pts
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-slate-900">31.4%</span>
            <span className="text-xs text-slate-400">quarter-to-date</span>
          </div>
          <div className="text-[11px] text-slate-500 flex items-center gap-1 pt-1">
            <TrendingUp className="w-3 h-3 text-emerald-500" />
            <span>Top percentile in enterprise B2B software</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4.5 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Pipeline Coverage</span>
            <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-sm border border-emerald-200">
              +0.3x
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-slate-900">3.4x</span>
            <span className="text-xs text-slate-400">weighted ARR</span>
          </div>
          <div className="text-[11px] text-slate-500 flex items-center gap-1 pt-1">
            <CheckCircle2 className="w-3 h-3 text-blue-500" />
            <span>Above recommended 3.0x quota guardrail</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4.5 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Churn (TTM)</span>
            <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-sm border border-emerald-200">
              −0.4 pts
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-slate-900">5.2%</span>
            <span className="text-xs text-slate-400">gross revenue</span>
          </div>
          <div className="text-[11px] text-slate-500 flex items-center gap-1 pt-1">
            <ShieldCheck className="w-3 h-3 text-emerald-500" />
            <span>Monitored by Churn Sentinel agent</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4.5 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Touchless AI Deal Assist</span>
            <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded-sm border border-indigo-200">
              +12.4 pts
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-slate-900">68.0%</span>
            <span className="text-xs text-slate-400">of opportunities</span>
          </div>
          <div className="text-[11px] text-slate-500 flex items-center gap-1 pt-1">
            <Sparkles className="w-3 h-3 text-indigo-500" />
            <span>Enriched & quoted without human keying</span>
          </div>
        </div>
      </div>

      {/* 3. Interactive Signature Workflow Bar (Lead -> Qualification -> Opportunity -> Quote -> Order) */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Autonomous Signature Revenue Workflow
            </h3>
            <span className="text-[11px] text-slate-400 font-normal">
              (5 Governed Pipeline Stages)
            </span>
          </div>
          <button
            onClick={handleReplaySimulation}
            disabled={isReplaying}
            className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 transition disabled:opacity-50 cursor-pointer"
          >
            <Play className={`w-3 h-3 ${isReplaying ? 'animate-spin' : ''}`} />
            {isReplaying ? 'Simulating Pipeline Flow...' : 'Replay Simulation'}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
          {workflowSteps.map((step, idx) => {
            const isSimActive = simulationStep === idx;
            return (
              <div
                key={step.num}
                className={`p-3 rounded-lg border text-xs transition duration-200 ${
                  isSimActive
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md ring-2 ring-blue-300 scale-[1.02]'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between font-mono text-[11px] opacity-70 mb-1">
                  <span>{step.num}</span>
                  <span className={`text-[9px] px-1 py-0.2 rounded ${isSimActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700 font-semibold'}`}>
                    {step.agent}
                  </span>
                </div>
                <div className="font-semibold text-xs leading-tight mb-1">
                  {step.title}
                </div>
                <p className={`text-[11px] leading-snug ${isSimActive ? 'text-blue-100' : 'text-slate-500'}`}>
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (8 cols): Submodule tabs, filters, table, bulk bar */}
        <div className="lg:col-span-8 space-y-4">
          {/* Submodule Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 border-b border-slate-200 pb-2">
            {submodules.map((tab) => {
              const count = tab === 'All' ? activeRecords.length : activeRecords.filter((r) => r.submodule === tab).length;
              const isActive = activeSubTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveSubTab(tab)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <span>{tab}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isActive ? 'bg-slate-800 text-slate-200' : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search, Status & Sort Bar */}
          <div className="bg-white rounded-xl border border-slate-200 p-3 shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-1 min-w-[200px]">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search accounts, deals, contacts, or ID..."
                className="text-xs text-slate-800 placeholder-slate-400 focus:outline-none w-full"
              />
              {search && (
                <button onClick={() => setSearch('')} className="text-slate-400 hover:text-slate-600">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <Filter className="w-3.5 h-3.5" />
                <span>Status:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-md text-xs py-1 px-2 text-slate-700 font-medium focus:outline-none cursor-pointer"
                >
                  <option value="All">All Statuses</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Proposed">Proposed</option>
                  <option value="New">New</option>
                  <option value="Closed Won">Closed Won</option>
                  <option value="Evaluating">Evaluating</option>
                  <option value="At Risk">At Risk</option>
                  <option value="Active">Active</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>

              <div className="flex items-center gap-1 text-xs text-slate-500 border-l border-slate-200 pl-2">
                <span>Sort:</span>
                <button
                  onClick={() => handleSort('amountRaw')}
                  className={`px-2 py-1 rounded text-xs font-medium cursor-pointer ${
                    sortField === 'amountRaw' ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Amount {sortField === 'amountRaw' && (sortAsc ? '↑' : '↓')}
                </button>
                <button
                  onClick={() => handleSort('closeDate')}
                  className={`px-2 py-1 rounded text-xs font-medium cursor-pointer ${
                    sortField === 'closeDate' ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Date {sortField === 'closeDate' && (sortAsc ? '↑' : '↓')}
                </button>
              </div>
            </div>
          </div>

          {/* High-Value Deal Desk Alert Banner */}
          {activeRecords.some((r) => r.id === 'OPP-30871' && r.status === 'Qualified') && (
            <div className="bg-amber-50/90 border border-amber-300/80 rounded-xl p-3.5 flex items-start justify-between gap-3 shadow-xs">
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-amber-900">
                    Deal Desk Authorization Required: Meridian Health Group ($1,420,000 ARR)
                  </div>
                  <div className="text-[11px] text-amber-800 mt-0.5">
                    Dr. Alistair Vance requested 14.5% 3-year term discount. Deal Coach verified healthy 62.4% net margin corridor. Action Firewall Policy <code className="font-mono font-semibold">POL-CRM-004</code> requires Deal Desk VP approval.
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleAuthorizeDiscount('OPP-30871')}
                className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shrink-0 shadow-xs transition cursor-pointer"
              >
                Authorize 14.5% Discount
              </button>
            </div>
          )}

          {/* Main CRM Table */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold select-none">
                  <tr>
                    <th className="py-2.5 px-3 w-8">
                      <input
                        type="checkbox"
                        checked={selectedIds.size > 0 && selectedIds.size === filteredRecords.length}
                        onChange={handleSelectAll}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                      />
                    </th>
                    <th className="py-2.5 px-3 cursor-pointer hover:text-slate-800" onClick={() => handleSort('account')}>
                      Account & Opportunity {sortField === 'account' && (sortAsc ? '↑' : '↓')}
                    </th>
                    <th className="py-2.5 px-3">Submodule</th>
                    <th className="py-2.5 px-3 cursor-pointer hover:text-slate-800" onClick={() => handleSort('amountRaw')}>
                      Amount {sortField === 'amountRaw' && (sortAsc ? '↑' : '↓')}
                    </th>
                    <th className="py-2.5 px-3 cursor-pointer hover:text-slate-800" onClick={() => handleSort('closeDate')}>
                      Close Date {sortField === 'closeDate' && (sortAsc ? '↑' : '↓')}
                    </th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3">Assigned Agent</th>
                    <th className="py-2.5 px-3 text-center">Evidence</th>
                    <th className="py-2.5 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredRecords.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="py-8 text-center text-slate-500">
                        No CRM records matching filters.
                      </td>
                    </tr>
                  ) : (
                    filteredRecords.map((r) => {
                      const isSelected = selectedIds.has(r.id);
                      return (
                        <tr
                          key={r.id}
                          onClick={() => setSelectedDrawerRecord(r)}
                          className={`hover:bg-blue-50/40 cursor-pointer transition select-none ${
                            isSelected ? 'bg-blue-50/70' : ''
                          }`}
                        >
                          <td className="py-2.5 px-3" onClick={(e) => handleToggleRow(r.id, e)}>
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => {}}
                              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                            />
                          </td>
                          <td className="py-2.5 px-3">
                            <div className="flex items-center gap-2.5">
                              <div className="w-7 h-7 rounded-md bg-blue-100 text-blue-700 font-bold text-[10px] flex items-center justify-center shrink-0 border border-blue-200">
                                {getInitials(r.account)}
                              </div>
                              <div>
                                <div className="font-semibold text-slate-900 hover:text-blue-600 flex items-center gap-1.5">
                                  <span>{r.account}</span>
                                  {r.id === 'CS-40119' && (
                                    <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-amber-50 text-amber-700 border border-amber-200 font-bold">
                                      FLAGSHIP
                                    </span>
                                  )}
                                </div>
                                <div className="text-[11px] text-slate-500 font-normal truncate max-w-[200px]">
                                  {r.name} · <span className="font-mono text-slate-400">{r.id}</span>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-2.5 px-3">
                            <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium border border-slate-200">
                              {r.submodule}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 font-semibold text-slate-900 font-mono">
                            {r.amount}
                          </td>
                          <td className="py-2.5 px-3 text-slate-600 text-xs">
                            {r.closeDate}
                          </td>
                          <td className="py-2.5 px-3">
                            <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border ${getCrmStatusBadge(r.status)}`}>
                              {r.status}
                            </span>
                          </td>
                          <td className="py-2.5 px-3">
                            <div className="flex items-center gap-1.5">
                              <Sparkles className="w-3 h-3 text-blue-500 shrink-0" />
                              <span className="text-slate-700 font-medium truncate max-w-[110px]">
                                {r.handlingAgent}
                              </span>
                            </div>
                          </td>
                          <td className="py-2.5 px-3 text-center" onClick={(e) => { e.stopPropagation(); setSelectedDrawerRecord(r); }}>
                            <button className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition font-semibold cursor-pointer">
                              COE
                            </button>
                          </td>
                          <td className="py-2.5 px-3 text-right" onClick={(e) => e.stopPropagation()}>
                            <button
                              onClick={() => onOpenRecord(r.id)}
                              className="px-2.5 py-1 rounded-md text-xs font-semibold text-blue-600 hover:bg-blue-50 transition border border-transparent hover:border-blue-200 cursor-pointer"
                            >
                              Inspect →
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            <div className="bg-slate-50/80 px-4 py-2 border-t border-slate-200 text-slate-500 text-xs flex items-center justify-between">
              <span>Showing {filteredRecords.length} of {activeRecords.length} opportunities</span>
              <span className="font-mono text-[11px]">Sync: Real-time (Salesforce / HubSpot / ERP Twin)</span>
            </div>
          </div>

          {/* Floating Bulk Action Bar */}
          {selectedIds.size > 0 && (
            <div className="bg-slate-900 text-white rounded-xl p-3 shadow-lg flex items-center justify-between gap-4 animate-fade-in border border-slate-800">
              <div className="flex items-center gap-2 text-xs">
                <CheckSquare className="w-4 h-4 text-blue-400" />
                <span className="font-semibold">{selectedIds.size} deal{selectedIds.size > 1 ? 's' : ''} selected</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleBulkApprove}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition cursor-pointer"
                >
                  Approve Quotes
                </button>
                <button
                  onClick={handleBulkMarkWon}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition cursor-pointer"
                >
                  Mark as Won
                </button>
                <button
                  onClick={handleBulkExport}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition cursor-pointer"
                >
                  Export CSV
                </button>
                <button
                  onClick={() => setSelectedIds(new Set())}
                  className="px-2.5 py-1.5 rounded-lg text-slate-400 hover:text-white text-xs transition cursor-pointer"
                >
                  Clear
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column (4 cols): Embedded Agents, Golden Thread connection & Policy */}
        <div className="lg:col-span-4 space-y-4">
          {/* Embedded CRM Agents Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Embedded CRM Workforce
                </h3>
              </div>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                4 Active Agents
              </span>
            </div>

            <div className="space-y-2.5">
              {activeAgents.map((ag) => {
                const isPaused = ag.status === 'Paused';
                return (
                  <div
                    key={ag.id}
                    onClick={() => setInspectingAgent(ag)}
                    className="p-3 rounded-lg border border-slate-200 hover:border-slate-300 hover:shadow-xs cursor-pointer transition space-y-2 bg-slate-50/50 hover:bg-white"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            isPaused ? 'bg-slate-400' : 'bg-emerald-500 animate-pulse'
                          }`}
                        />
                        <span className="font-semibold text-xs text-slate-900">{ag.name}</span>
                      </div>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold">
                        {ag.autonomyLevel}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-snug line-clamp-2">
                      {ag.role}
                    </p>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-100 pt-1.5">
                      <span>Owner: {ag.owner.split(' ')[0]} {ag.owner.split(' ')[1]?.[0]}.</span>
                      <span className="font-mono text-emerald-600 font-semibold">{ag.approvalRate}% compliance</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Cross-Module Integration: Apex Global Financial Flagship Record */}
          <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-xl p-4 shadow-xs space-y-3 border border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-blue-300 bg-blue-500/20 px-2 py-0.5 rounded font-bold">
                CROSS-MODULE ENTERPRISE STORY
              </span>
              <span className="text-xs font-mono text-emerald-400 font-semibold">$2.45M ARR</span>
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">Apex Global Financial (CS-40119)</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Flagship Customer Success tier. Tied to Security Incident <code className="text-blue-300 font-mono">INC-2026-8842</code> (Finance VP workstation kernel drop) on <code className="text-blue-300 font-mono">END-FIN-094</code>.
              </p>
            </div>
            <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-300 space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <span>Retention Signal:</span>
                <span className="text-emerald-400 font-semibold">95% (Healthy)</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span>Assigned Agent:</span>
                <span className="text-white font-medium">Churn Sentinel (L3)</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span>Compliance Rider:</span>
                <span className="text-amber-300 font-mono">SOC2 / FedRAMP Verified</span>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => navigateToRecord('incident-detail', 'INC-2026-8842')}
                className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold text-center transition cursor-pointer"
              >
                Inspect Linked P1 Incident →
              </button>
            </div>
          </div>

          {/* Action Firewall Policy Guardrail Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-600" />
                <h4 className="text-xs font-bold text-slate-900">Commercial Action Firewall</h4>
              </div>
              <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold border border-emerald-200">
                ACTIVE
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Every discount, contractual commitment, and quote generated by AI agents is verified against strict commercial guardrails.
            </p>
            <div className="space-y-1 text-xs text-slate-600 pt-1">
              <div className="flex items-center justify-between py-1 border-b border-slate-100">
                <span className="font-mono text-[11px]">POL-CRM-004</span>
                <span className="text-slate-500 text-[11px]">Discounts &gt;15% require VP Signoff</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-100">
                <span className="font-mono text-[11px]">POL-CRM-009</span>
                <span className="text-slate-500 text-[11px]">Regulated customer riders (FedRAMP/CJIS)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Slide-over Quick Drawer */}
      {selectedDrawerRecord && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end bg-slate-900/40 backdrop-blur-xs transition-opacity">
          <div className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto border-l border-slate-200 p-6 space-y-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between border-b border-slate-200 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      {selectedDrawerRecord.id}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border ${getCrmStatusBadge(selectedDrawerRecord.status)}`}>
                      {selectedDrawerRecord.status}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 mt-1">{selectedDrawerRecord.account}</h2>
                  <p className="text-xs text-slate-500">{selectedDrawerRecord.name}</p>
                </div>
                <button
                  onClick={() => setSelectedDrawerRecord(null)}
                  className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Quick Specs Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-slate-500 block text-[11px]">Deal Value</span>
                  <span className="font-bold text-base text-slate-900 font-mono mt-0.5 block">{selectedDrawerRecord.amount}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-slate-500 block text-[11px]">Close Date</span>
                  <span className="font-semibold text-slate-800 mt-0.5 block">{selectedDrawerRecord.closeDate}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-slate-500 block text-[11px]">Primary Contact</span>
                  <span className="font-semibold text-slate-800 mt-0.5 block truncate">{selectedDrawerRecord.contactName}</span>
                  <span className="text-[10px] text-slate-400 block truncate">{selectedDrawerRecord.contactEmail}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-slate-500 block text-[11px]">Win Probability</span>
                  <span className="font-semibold text-slate-800 mt-0.5 block">{selectedDrawerRecord.probability}%</span>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full mt-1 overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${selectedDrawerRecord.probability}%` }} />
                  </div>
                </div>
              </div>

              {/* 6-Stage Chain of Evidence */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                    Chain of Evidence (COE)
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    Hash: {selectedDrawerRecord.evidenceHash}
                  </span>
                </div>
                <div className="bg-slate-50 rounded-xl border border-slate-200 p-3.5 space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div>
                      <span className="text-slate-400 block text-[10px]">1. AGENT INGESTION</span>
                      <span className="font-semibold text-slate-700">{selectedDrawerRecord.handlingAgent}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">2. MODEL INFERENCE</span>
                      <span className="font-semibold text-slate-700">Claude 3.5 Sonnet (Temp 0.1)</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">3. DATA TELEMETRY</span>
                      <span className="font-semibold text-slate-700">CRM Sync & MDM Twin</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">4. FIREWALL POLICY</span>
                      <span className="font-semibold text-slate-700 font-mono">{selectedDrawerRecord.policy}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">5. GOVERNANCE STATE</span>
                      <span className="font-semibold text-emerald-600">{selectedDrawerRecord.firewallChecks}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">6. LEDGER SIGNATURE</span>
                      <span className="font-mono text-slate-600 text-[10px]">Verified SHA-256</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes & Commercial Context */}
              <div className="space-y-1.5 pt-1">
                <span className="text-xs font-bold text-slate-800">Commercial Context & Guardrails</span>
                <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200 leading-relaxed">
                  {selectedDrawerRecord.notes}
                </p>
              </div>

              {/* Linked Incident Alert if present */}
              {selectedDrawerRecord.linkedIncident && (
                <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-xs text-blue-900 space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <Laptop className="w-3.5 h-3.5 text-blue-600" />
                    Connected to IT Incident {selectedDrawerRecord.linkedIncident}
                  </div>
                  <p className="text-[11px] text-blue-700">
                    Linked to device <code className="font-mono font-semibold">{selectedDrawerRecord.linkedDevice}</code>. Telemetry integrity monitored by Churn Sentinel.
                  </p>
                </div>
              )}
            </div>

            {/* Drawer Bottom Actions */}
            <div className="border-t border-slate-200 pt-4 flex items-center justify-between gap-3">
              <button
                onClick={() => {
                  const id = selectedDrawerRecord.id;
                  setSelectedDrawerRecord(null);
                  onOpenRecord(id);
                }}
                className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold text-center transition cursor-pointer"
              >
                Open Full Record View →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. Create New Opportunity Modal */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Plus className="w-4 h-4 text-blue-600" />
                Create New Opportunity
              </h3>
              <button
                onClick={() => setShowNewModal(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700">
                {formError}
              </div>
            )}

            <form onSubmit={handleCreateOpportunity} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Account Name *</label>
                <input
                  type="text"
                  value={newRecord.account}
                  onChange={(e) => setNewRecord({ ...newRecord, account: e.target.value })}
                  placeholder="e.g. Apex Global Financial, Meridian Health"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Opportunity Title *</label>
                <input
                  type="text"
                  value={newRecord.name}
                  onChange={(e) => setNewRecord({ ...newRecord, name: e.target.value })}
                  placeholder="e.g. Enterprise Cloud Renewal & Observability"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Deal Amount ($)</label>
                  <input
                    type="text"
                    value={newRecord.amount}
                    onChange={(e) => setNewRecord({ ...newRecord, amount: e.target.value })}
                    placeholder="e.g. $450,000"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900 focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Expected Close</label>
                  <input
                    type="text"
                    value={newRecord.closeDate}
                    onChange={(e) => setNewRecord({ ...newRecord, closeDate: e.target.value })}
                    placeholder="e.g. Dec 31"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Submodule</label>
                  <select
                    value={newRecord.submodule}
                    onChange={(e) => setNewRecord({ ...newRecord, submodule: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900 focus:outline-none focus:border-blue-500 cursor-pointer"
                  >
                    <option value="Leads">Leads</option>
                    <option value="Opportunities">Opportunities</option>
                    <option value="Quotes & Orders">Quotes & Orders</option>
                    <option value="Customer Success">Customer Success</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Assigned Agent</label>
                  <select
                    value={newRecord.assignedAgent}
                    onChange={(e) => setNewRecord({ ...newRecord, assignedAgent: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900 focus:outline-none focus:border-blue-500 cursor-pointer"
                  >
                    <option value="Lead Qualifier">Lead Qualifier (L4)</option>
                    <option value="Deal Coach">Deal Coach (L2)</option>
                    <option value="Quote Agent">Quote Agent (L3)</option>
                    <option value="Churn Sentinel">Churn Sentinel (L3)</option>
                    <option value="Human team">Human team</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Contact Name</label>
                  <input
                    type="text"
                    value={newRecord.contactName}
                    onChange={(e) => setNewRecord({ ...newRecord, contactName: e.target.value })}
                    placeholder="e.g. Dr. Alistair Vance"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Contact Email</label>
                  <input
                    type="email"
                    value={newRecord.contactEmail}
                    onChange={(e) => setNewRecord({ ...newRecord, contactEmail: e.target.value })}
                    placeholder="e.g. a.vance@enterprise.com"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs cursor-pointer"
                >
                  Create Opportunity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 7. Agent Inspector Modal */}
      {inspectingAgent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <h3 className="text-base font-bold text-slate-900">{inspectingAgent.name}</h3>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-indigo-50 text-indigo-700 font-bold border border-indigo-200">
                  {inspectingAgent.autonomyLevel}
                </span>
              </div>
              <button
                onClick={() => setInspectingAgent(null)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <p className="text-slate-600 leading-relaxed">{inspectingAgent.role}</p>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Autonomy Status:</span>
                  <span className={`font-semibold ${inspectingAgent.status === 'Active' ? 'text-emerald-600' : 'text-slate-500'}`}>
                    {inspectingAgent.status} ({inspectingAgent.autonomyLabel})
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Business Owner:</span>
                  <span className="font-medium text-slate-800">{inspectingAgent.owner}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Action Volume:</span>
                  <span className="font-mono text-slate-800">{inspectingAgent.actionsWeek.toLocaleString()} actions/qtr</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Policy Compliance:</span>
                  <span className="font-mono text-emerald-600 font-bold">{inspectingAgent.approvalRate}%</span>
                </div>
              </div>

              <div>
                <span className="font-semibold text-slate-700 block mb-1">Most Recent Autonomous Action:</span>
                <p className="p-2.5 bg-blue-50/60 rounded border border-blue-200 text-blue-900 text-[11px] leading-relaxed">
                  {inspectingAgent.recentAction}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                <button
                  onClick={() => handleToggleAgentStatus(inspectingAgent.name)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    inspectingAgent.status === 'Active'
                      ? 'bg-amber-100 hover:bg-amber-200 text-amber-800'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  }`}
                >
                  {inspectingAgent.status === 'Active' ? 'Pause Agent' : 'Resume Agent'}
                </button>
                <button
                  onClick={() => setInspectingAgent(null)}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// CRMDetailScreen Component
// ============================================================================

export function CRMDetailScreen({
  record,
  records,
  agents,
  onBack,
  navigateToRecord,
  setAppState,
  notify,
  requestConfirmation
}: {
  record: any;
  records: any[];
  agents: any[];
  onBack: () => void;
  navigateToRecord: (screen: string, recordId?: string) => void;
  setAppState: React.Dispatch<React.SetStateAction<any>>;
  notify: (msg: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  requestConfirmation: (opts: any) => void;
}) {
  if (!record) {
    return (
      <div className="bg-white p-8 rounded-xl border border-slate-200 text-center space-y-3">
        <p className="text-slate-600 text-sm font-semibold">CRM record not found.</p>
        <button onClick={onBack} className="px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold cursor-pointer">
          Return to CRM
        </button>
      </div>
    );
  }

  const assignedAgentObj = agents.find((a) => a.name === record.handlingAgent);
  const relatedRecords = records.filter((r) => r.id !== record.id).slice(0, 3);

  const handleApprove = () => {
    setAppState((prev: any) => {
      const base = Array.isArray(prev.crmRecords) && prev.crmRecords.length > 0
        ? prev.crmRecords
        : (records || DEFAULT_CRM_RECORDS);
      return {
        ...prev,
        crmRecords: base.map((r: any) =>
          r.id === record.id ? { ...r, status: 'Closed Won', probability: 100 } : r
        ),
        auditLog: [
          {
            id: `AUD-CRM-${Math.floor(1000 + Math.random() * 9000)}`,
            actor: 'CISO & VP Commercial Operations',
            action: `Approved and executed CRM opportunity ${record.id} (${record.account} — ${record.amount}) via Action Firewall.`,
            time: 'Just now',
            status: 'Authorized'
          },
          ...(prev.auditLog || [])
        ]
      };
    });
    notify(`Executed ${record.id} (${record.account}) — logged to Chain of Evidence and ERP Twin.`, 'success');
  };

  const handleRunRiskScan = () => {
    notify(`Deal Coach completed deep risk scan: Margin corridor compliant (64.2%), Zero churn signals for ${record.account}.`, 'info');
  };

  const workflowSteps = ['01 Lead Capture', '02 ICP Qualification', '03 Opportunity Strategy', '04 Quote & CPQ', '05 Closing & Won'];
  const curStep =
    record.status === 'Closed Won' ? 4 :
    record.status === 'Proposed' ? 3 :
    record.status === 'Qualified' ? 2 :
    record.status === 'Active' ? 4 : 1;

  return (
    <div className="space-y-6">
      {/* 1. Breadcrumbs & Top Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <button onClick={onBack} className="hover:underline text-blue-600 font-medium cursor-pointer">
                CRM & Customer Pipeline
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span>{record.submodule}</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-mono font-semibold text-slate-700">{record.id}</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 mt-0.5">{record.account}</h1>
            <p className="text-xs text-slate-500">{record.name}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${getCrmStatusBadge(record.status)}`}>
            {record.status}
          </span>
          <button
            onClick={handleRunRiskScan}
            className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium cursor-pointer"
          >
            Run Deal Risk Scan
          </button>
          {record.status !== 'Closed Won' && (
            <button
              onClick={handleApprove}
              className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs cursor-pointer"
            >
              Approve & Close Deal
            </button>
          )}
        </div>
      </div>

      {/* 2. Signature Workflow Lifecycle Position Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-2">
        <div className="text-xs font-semibold text-slate-700">Signature Revenue Workflow Lifecycle Position</div>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
          {workflowSteps.map((step, idx) => {
            const isCompleted = idx < curStep;
            const isCurrent = idx === curStep;
            return (
              <div
                key={step}
                className={`p-2.5 rounded-lg border text-xs font-medium flex items-center gap-2 transition ${
                  isCurrent
                    ? 'bg-blue-600 text-white border-blue-600 font-bold shadow-xs'
                    : isCompleted
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    : 'bg-slate-50 text-slate-400 border-slate-200'
                }`}
              >
                {isCompleted ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                ) : (
                  <span className="font-mono text-[10px] opacity-70">0{idx + 1}</span>
                )}
                <span className="truncate">{step.slice(3)}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Main Detail Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (8 cols): Commercial Overview, Chain of Evidence, Guardrails & Timeline */}
        <div className="lg:col-span-8 space-y-6">
          {/* Commercial Specs Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">Commercial Parameters & Deal Terms</h3>
              <span className="text-xs font-mono font-bold text-emerald-600 text-base">{record.amount}</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Contract Term</span>
                <span className="font-semibold text-slate-800 mt-0.5 block">{record.termMonths || 36} Months</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Discount Requested</span>
                <span className="font-semibold text-slate-800 mt-0.5 block font-mono">{record.discountRequested || '10.0%'}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Max Corridor Allowed</span>
                <span className="font-semibold text-slate-800 mt-0.5 block font-mono">{record.discountMaxCorridor || '15.0%'}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Win Probability</span>
                <span className="font-semibold text-slate-800 mt-0.5 block font-mono text-emerald-600">{record.probability}%</span>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Primary Decision Maker</span>
                <span className="font-semibold text-slate-800 mt-0.5 block">{record.contactName} ({record.contactRole || 'VP Procurement'})</span>
                <span className="text-slate-500 text-[11px] font-mono">{record.contactEmail}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Stage Classification</span>
                <span className="font-semibold text-slate-800 mt-0.5 block">{record.stage}</span>
                <span className="text-slate-500 text-[11px]">Close Target: {record.closeDate}</span>
              </div>
            </div>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs text-slate-700 leading-relaxed">
              <span className="font-semibold block text-slate-900 mb-1">Deal Intelligence Notes:</span>
              {record.notes}
            </div>
          </div>

          {/* 6-Node Chain of Evidence */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900">Chain of Evidence (COE)</h3>
              </div>
              <span className="text-xs font-mono text-slate-500">Hash: {record.evidenceHash}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">1. Ingesting Agent</span>
                <div className="font-semibold text-slate-800">{record.handlingAgent}</div>
                <div className="text-[11px] text-slate-500">Autonomy Level: Governed L3</div>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">2. Inference Engine</span>
                <div className="font-semibold text-slate-800">Claude 3.5 Sonnet</div>
                <div className="text-[11px] text-slate-500">Deterministic CPQ Pricing (Temp 0.1)</div>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">3. Underlying Data</span>
                <div className="font-semibold text-slate-800">ERP & CRM Telemetry</div>
                <div className="text-[11px] text-slate-500">Verified against MDM Golden Record</div>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">4. Firewall Policy</span>
                <div className="font-semibold text-slate-800 font-mono">{record.policy}</div>
                <div className="text-[11px] text-slate-500">Discount Corridor &lt; 15.0%</div>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">5. Action Approval</span>
                <div className="font-semibold text-emerald-600">Action Firewall Certified</div>
                <div className="text-[11px] text-slate-500">{record.firewallChecks}</div>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">6. Ledger Signature</span>
                <div className="font-semibold text-slate-800">Cryptographically Sealed</div>
                <div className="text-[11px] text-slate-500 font-mono">ECDSA P-256 Valid</div>
              </div>
            </div>
          </div>

          {/* Action Firewall Guardrail Verification */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm font-bold text-slate-900">Commercial Action Firewall (8/8 Checks Passed)</h3>
              </div>
              <button
                onClick={() => navigateToRecord('ai-firewall')}
                className="text-xs text-blue-600 hover:underline font-semibold cursor-pointer"
              >
                View in AI Firewall →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-2 p-2 rounded bg-emerald-50/50 border border-emerald-100 text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Discount corridor check (&lt; 15.0% max limit)</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-emerald-50/50 border border-emerald-100 text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Net margin hurdle verified (&gt; 62.0%)</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-emerald-50/50 border border-emerald-100 text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Regulatory contract rider (HIPAA/FedRAMP BAA)</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-emerald-50/50 border border-emerald-100 text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Sanctions list & OFAC screening passed</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-emerald-50/50 border border-emerald-100 text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Credit solvency & D&B risk rating grade A</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-emerald-50/50 border border-emerald-100 text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>SLA liability ceiling verified (&lt; 2x ARR)</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-emerald-50/50 border border-emerald-100 text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Payment terms 30-day net standard</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-emerald-50/50 border border-emerald-100 text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Immutable cryptographic audit hash sealed</span>
              </div>
            </div>
          </div>

          {/* Activity & Engagement Timeline */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
              Opportunity Activity & Engagement Timeline
            </h3>
            <div className="space-y-3 text-xs">
              {(record.timeline || []).map((tl: any, idx: number) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-800">{tl.title}</span>
                      <span className="text-[10px] text-slate-400">{tl.date}</span>
                    </div>
                    <span className="text-[11px] text-slate-500">Actor: {tl.actor}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Assigned Agent & Cross-Module Incident Link */}
        <div className="lg:col-span-4 space-y-6">
          {/* Assigned Agent Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Assigned Revenue Agent
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-bold border border-blue-200">
                {assignedAgentObj?.autonomyLevel || 'L3'}
              </span>
            </div>

            <div className="space-y-2">
              <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-blue-600" />
                {record.handlingAgent}
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                {assignedAgentObj?.role || 'Autonomous revenue optimization agent continuously evaluating deal margin and customer fit.'}
              </p>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Business Owner:</span>
                  <span className="font-medium text-slate-800">{assignedAgentObj?.owner || 'Revenue Ops Desk'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Quarterly Actions:</span>
                  <span className="font-mono text-slate-800">{assignedAgentObj?.actionsWeek?.toLocaleString() || '1,420'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Compliance Rate:</span>
                  <span className="font-mono text-emerald-600 font-semibold">{assignedAgentObj?.approvalRate || '98.4'}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Cross-Module Link Card */}
          {record.linkedIncident && (
            <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-xl p-5 shadow-xs space-y-3 border border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-blue-300 bg-blue-500/20 px-2 py-0.5 rounded font-bold">
                  CONNECTED IT INCIDENT
                </span>
                <span className="text-xs font-mono text-red-400 font-bold">P1 - Critical</span>
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">{record.linkedIncident}</h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Endpoint Kernel Privilege Escalation on workstation <code className="text-blue-300 font-mono">{record.linkedDevice}</code> (Elena Rostova, VP Global Finance & Treasury).
                </p>
              </div>
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-300 space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span>Workstation Status:</span>
                  <span className="text-emerald-400 font-semibold">Remediated & Verified</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span>Customer CSAT Impact:</span>
                  <span className="text-emerald-400 font-semibold">Protected (Zero Credit)</span>
                </div>
              </div>
              <button
                onClick={() => navigateToRecord('incident-detail', record.linkedIncident)}
                className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold text-center transition cursor-pointer"
              >
                Inspect Incident INC-2026-8842 →
              </button>
            </div>
          )}

          {/* Related Opportunities */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2">
              Related Pipeline Deals
            </h4>
            <div className="space-y-2">
              {relatedRecords.map((rel: any) => (
                <div
                  key={rel.id}
                  onClick={() => navigateToRecord('crm-detail', rel.id)}
                  className="p-2.5 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 cursor-pointer transition space-y-1"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-900">{rel.account}</span>
                    <span className="font-mono font-bold text-slate-800">{rel.amount}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span className="truncate max-w-[150px]">{rel.name}</span>
                    <span className={`px-1.5 py-0.2 rounded text-[10px] font-semibold border ${getCrmStatusBadge(rel.status)}`}>
                      {rel.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
