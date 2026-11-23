import React, { useState, useEffect, useMemo } from 'react';
import { DEFAULT_CRM_RECORDS, DEFAULT_CRM_AGENTS, CRMScreen, CRMDetailScreen } from './CRMComponents';
import {
  Truck, Ship, Plane, Package, Boxes,
  Shield, Server, AlertTriangle, CheckCircle2, Clock, Search, Bell, HelpCircle,
  User, ChevronRight, ChevronDown, Terminal, Cpu, FileText, Lock, Activity,
  BarChart3, Settings, Layers, Zap, Eye, Check, X, Plus, Filter, ArrowLeft,
  RefreshCw, ExternalLink, MessageSquare, Sparkles, Database, Globe, Briefcase,
  Award, BookOpen, AlertOctagon, Sliders, Play, ShieldAlert, ShieldCheck,
  Laptop, HardDrive, Key, Users, FileCheck, GitBranch, Compass, Send, Trash2,
  Edit3, Download, Upload, CheckSquare, ChevronUp, MoreHorizontal, Info
} from 'lucide-react';

// ============================================================================
// INITIAL CONNECTED ENTERPRISE STATE (GOLDEN THREAD + REALISTIC ENTERPRISE DATA)
// ============================================================================

// ============================================================================
// DEFAULT SUPPLY CHAIN DEMO DATA
// ============================================================================

const DEFAULT_SUPPLY_CHAIN_PLANS = [
  {
    id: 'SHP-88214',
    name: 'Ocean — Shanghai → Rotterdam',
    laneNode: 'NYK Line · 14 TEU',
    quantity: '412 units',
    eta: 'Oct 19',
    status: 'At Risk',
    agentTouched: true,
    submodule: 'Demand Planning',
    submoduleIdx: 0,
    carrier: 'NYK Line',
    origin: 'Shanghai Port (CNSHA)',
    destination: 'Rotterdam Port (NLRTM)',
    mode: 'Ocean Freight',
    riskReason: 'Port congestion delay at Suez chokepoint (+4 days buffer exceeded)',
    handlingAgent: 'Logistics Rerouter',
    policy: 'POL-SCM-014',
    firewallChecks: '8/8 checks passed',
    evidenceHash: 'b49f28c1192e4088',
    linkedIncident: 'INC-2026-8842',
    linkedDevice: 'END-FIN-094'
  },
  {
    id: 'SP-2026-W41',
    name: 'Weekly supply plan — EMEA',
    laneNode: 'Hamburg DC',
    quantity: '18,400 units',
    eta: 'Oct 12',
    status: 'Approved',
    agentTouched: true,
    submodule: 'Supply Planning',
    submoduleIdx: 1,
    carrier: 'Kuehne+Nagel',
    origin: 'Munich Manufacturing Plant',
    destination: 'Hamburg Regional DC',
    mode: 'Intermodal Logistics',
    riskReason: 'Capacity constrained; reallocated from Leipzig warehouse buffer',
    handlingAgent: 'Supply Planner',
    policy: 'POL-SCM-011',
    firewallChecks: '8/8 checks passed',
    evidenceHash: 'c71289df4091a104',
    linkedIncident: 'INC-2026-8842',
    linkedDevice: 'END-FIN-094'
  },
  {
    id: 'SHP-88231',
    name: 'Air — Penang → Dallas',
    laneNode: 'DHL Global',
    quantity: '220 units',
    eta: 'Oct 08',
    status: 'In Progress',
    agentTouched: true,
    submodule: 'Logistics',
    submoduleIdx: 2,
    carrier: 'DHL Global Forwarding',
    origin: 'Penang Chip Fab (MYPEN)',
    destination: 'Dallas Fort Worth Hub (USDFW)',
    mode: 'Air Cargo Express',
    riskReason: 'Expedited consignment for priority server hardware replacement',
    handlingAgent: 'Demand Sensing Agent',
    policy: 'POL-SCM-012',
    firewallChecks: '8/8 checks passed',
    evidenceHash: '984102bc4501fd88',
    linkedIncident: 'INC-2026-8842',
    linkedDevice: 'END-FIN-094'
  },
  {
    id: 'SP-2026-W42',
    name: 'Weekly supply plan — APAC',
    laneNode: 'Singapore DC',
    quantity: '22,900 units',
    eta: 'Oct 19',
    status: 'Draft',
    agentTouched: true,
    submodule: 'Inventory',
    submoduleIdx: 3,
    carrier: 'Maersk Logistics',
    origin: 'Shenzhen Hub',
    destination: 'Singapore Regional DC',
    mode: 'Ocean / Hub Transfer',
    riskReason: 'Quarterly inventory rebalance draft under review',
    handlingAgent: 'Supply Planner',
    policy: 'POL-SCM-015',
    firewallChecks: '8/8 checks passed',
    evidenceHash: 'ea4019280bf61290',
    linkedIncident: 'INC-2026-8842',
    linkedDevice: 'END-FIN-094'
  },
  {
    id: 'PRD-31008',
    name: 'Production order — Line 4',
    laneNode: 'Monterrey Plant',
    quantity: '6,500 units',
    eta: 'Oct 14',
    status: 'Scheduled',
    agentTouched: false,
    submodule: 'Demand Planning',
    submoduleIdx: 0,
    carrier: 'Internal Plant Operations',
    origin: 'Monterrey Assembly Line 4',
    destination: 'Austin Final Integration Center',
    mode: 'Plant Production',
    riskReason: 'Manual operator sign-off required for batch run 31',
    handlingAgent: 'Human team',
    policy: 'POL-SCM-016',
    firewallChecks: 'Manual approval required',
    evidenceHash: '194012948bbca100',
    linkedIncident: 'INC-2026-8842',
    linkedDevice: 'END-FIN-094'
  },
  {
    id: 'SHP-88240',
    name: 'Rail — Chicago → Toronto',
    laneNode: 'CN Rail',
    quantity: '88 pallets',
    eta: 'Oct 10',
    status: 'Delivered',
    agentTouched: false,
    submodule: 'Supply Planning',
    submoduleIdx: 1,
    carrier: 'Canadian National Railway',
    origin: 'Chicago Central Depot',
    destination: 'Toronto Intermodal Terminal',
    mode: 'Rail Freight',
    riskReason: 'On-schedule transborder transit completed',
    handlingAgent: 'Human team',
    policy: 'POL-SCM-013',
    firewallChecks: 'Completed',
    evidenceHash: 'ff84019a28c41890',
    linkedIncident: 'INC-2026-8842',
    linkedDevice: 'END-FIN-094'
  },
  {
    id: 'SHP-88252',
    name: 'Truck — Lyon → Milan',
    laneNode: 'DB Schenker',
    quantity: '36 pallets',
    eta: 'Oct 09',
    status: 'In Progress',
    agentTouched: false,
    submodule: 'Logistics',
    submoduleIdx: 2,
    carrier: 'DB Schenker Logistics',
    origin: 'Lyon Distribution Center',
    destination: 'Milan Industrial Park',
    mode: 'Road Transport',
    riskReason: 'Alpine tunnel transit cleared on schedule',
    handlingAgent: 'Human team',
    policy: 'POL-SCM-017',
    firewallChecks: 'Completed',
    evidenceHash: 'c0918a2871bc9940',
    linkedIncident: 'INC-2026-8842',
    linkedDevice: 'END-FIN-094'
  }
];

const DEFAULT_SUPPLY_CHAIN_AGENTS = [
  {
    id: 'AGT-SCM-01',
    name: 'Demand Sensing Agent',
    role: 'Blends POS, weather, market indicators, and promotion signals to detect demand spikes and stockouts before ERP runs.',
    autonomyLevel: 'L3',
    autonomyLabel: 'Act with approval',
    status: 'Active',
    owner: 'C. Weber (VP Supply Operations)',
    actionsWeek: 2840,
    approvalRate: 98.4,
    recentAction: 'Auto-adjusted EMEA Q4 semiconductor demand buffer (+6.4%) based on automotive supply surge.',
    sparkValues: [40, 48, 55, 62, 70, 75, 82, 91]
  },
  {
    id: 'AGT-SCM-02',
    name: 'Supply Planner',
    role: 'Rebalances regional warehouse inventory, calculates safety stocks, and allocates constrained component capacity.',
    autonomyLevel: 'L3',
    autonomyLabel: 'Act with approval',
    status: 'Active',
    owner: 'J. Santos (Director SCM Planning)',
    actionsWeek: 1940,
    approvalRate: 97.2,
    recentAction: 'Generated Hamburg DC rebalance order SP-2026-W41; prevented stockout on 18,400 tier-1 units.',
    sparkValues: [30, 45, 42, 60, 68, 72, 85, 97]
  },
  {
    id: 'AGT-SCM-03',
    name: 'Logistics Rerouter',
    role: 'Monitors global shipping AIS telemetry, port bottlenecks, and carrier disruptions to dynamically reroute lanes.',
    autonomyLevel: 'L2',
    autonomyLabel: 'Draft for approval',
    status: 'Active',
    owner: 'H. Lindqvist (Global Logistics Head)',
    actionsWeek: 1120,
    approvalRate: 94.8,
    recentAction: 'Identified Red Sea / Suez transit delay for SHP-88214; prepared alternate Cape routing plan.',
    sparkValues: [50, 42, 58, 65, 60, 78, 88, 93]
  }
];

const INITIAL_STATE = {
  crmRecords: DEFAULT_CRM_RECORDS,
  crmAgents: DEFAULT_CRM_AGENTS,
  goldenThreadStep: 1, // 1 to 11 tracking the executive scenario progress
  organization: 'Apex Global Financial — Prod',
  currentUserRole: 'CISO & VP Enterprise Operations',
  incidents: [
    {
      id: 'INC-2026-8842',
      title: 'Endpoint Kernel Privilege Escalation & EDR Telemetry Drop on Finance VP Workstation',
      priority: 'P1 - Critical',
      status: 'Investigating',
      requester: 'Elena Rostova',
      requesterEmail: 'elena.rostova@apexglobal.io',
      requesterDept: 'Global Finance & Treasury',
      assignedTo: 'Marcus Vance (SecOps Lead)',
      deviceId: 'END-FIN-094',
      deviceName: 'APEX-MBP16-094',
      cveId: 'CVE-2026-4109',
      remediationId: 'REM-2026-309',
      firewallReqId: 'FW-REQ-9921',
      controlId: 'SI-2',
      poamId: 'POAM-2026-112',
      createdAt: '2026-05-14 08:14 UTC',
      description: 'Workstation experienced sudden kernel panic dump followed by intermittent CrowdStrike/Pr-Sensor telemetry drop after opening a macro-signed treasury settlement bundle. Outbound anomalous syscall blocked on ring-0 boundary.',
      aiDiagnosis: 'Pr AiiA Neural Correlator (99.4% Confidence): Telemetry drop matches active exploitation pattern of XNU Kernel Zero-Day (CVE-2026-4109). Local sandbox escape attempted via Mach port race condition. Immediate kernel hotfix 15.3.2-sec1 and EDR daemon restart required acrossEND-FIN-094 and 13 peer Finance fleet devices.',
      recommendedResolution: 'Execute automated Remediation Plan REM-2026-309 via Patch Remediation Agent (AGT-03) after Human-in-the-Loop AI Action Firewall authorization (FW-REQ-9921).',
      timeline: [
        { time: '08:14 UTC', actor: 'Elena Rostova', type: 'user', text: 'Reported system freeze and security sensor warning popup.' },
        { time: '08:14 UTC', actor: 'AGT-01 (L1 Service Desk Agent)', type: 'ai', text: 'Auto-triaged as P1 Security/Kernel Incident. Linked endpoint END-FIN-094.' },
        { time: '08:15 UTC', actor: 'AGT-04 (Vulnerability Triage Agent)', type: 'ai', text: 'Correlated kernel syscall trace with CVE-2026-4109 (CVSS 9.6) and NIST Control SI-2.' },
        { time: '08:16 UTC', actor: 'AGT-03 (Patch Remediation Agent)', type: 'ai', text: 'Staged Remediation Plan REM-2026-309 and queued AI Action Firewall request FW-REQ-9921.' }
      ]
    },
    {
      id: 'INC-2026-8839',
      title: 'Zero Trust Tunnel Latency Spike in Frankfurt Trading Enclave',
      priority: 'P2 - High',
      status: 'In Progress',
      requester: 'Dieter Klein',
      requesterEmail: 'd.klein@apexglobal.io',
      requesterDept: 'EU Fixed Income',
      assignedTo: 'AGT-02 (Self-Healing Agent)',
      deviceId: 'END-EU-412',
      deviceName: 'APEX-WIN11-412',
      cveId: 'CVE-2026-3811',
      remediationId: 'REM-2026-304',
      firewallReqId: 'FW-REQ-9918',
      controlId: 'SC-7',
      poamId: 'POAM-2026-108',
      createdAt: '2026-05-14 06:40 UTC',
      description: ' TLS 1.3 mutual authentication handshakes exceeding 450ms to Frankfurt ZTNA edge gateway.',
      aiDiagnosis: 'BGP route flap on DE-FRA-02 edge node combined with stale OpenSSL cipher buffer.',
      recommendedResolution: 'Reroute ZTNA gateway traffic to DE-FRA-01 and cycle local tunnel service.',
      timeline: [
        { time: '06:40 UTC', actor: 'AIOps Telemetry', type: 'ai', text: 'Synthetic probe detected 480ms P99 latency.' }
      ]
    },
    {
      id: 'INC-2026-8835',
      title: 'SAP S/4HANA Production Connector Certificate Expiration Warning',
      priority: 'P3 - Medium',
      status: 'Open',
      requester: 'Priya Nair',
      requesterEmail: 'p.nair@apexglobal.io',
      requesterDept: 'Enterprise ERP',
      assignedTo: 'Sarah Jenkins',
      deviceId: 'SRV-PROD-019',
      deviceName: 'APEX-LNX-ERP19',
      cveId: 'CVE-2026-2901',
      remediationId: 'REM-2026-299',
      firewallReqId: 'FW-REQ-9912',
      controlId: 'IA-5',
      poamId: 'POAM-2026-104',
      createdAt: '2026-05-13 19:22 UTC',
      description: 'Mutual TLS PKI leaf certificate expires in 72 hours on primary ERP middleware.',
      aiDiagnosis: 'Automated Vault PKI rotation blocked by legacy keystore permission lock.',
      recommendedResolution: 'Unlock PKCS12 keystore and run automated Vault cert renewal.',
      timeline: [
        { time: '19:22 UTC', actor: 'CertMonitor', type: 'ai', text: '72-hour expiration threshold triggered.' }
      ]
    },
    {
      id: 'INC-2026-8828',
      title: 'Automated USB Mass Storage Policy Violation Blocked',
      priority: 'P4 - Low',
      status: 'Resolved',
      requester: 'System DLP',
      requesterEmail: 'soc@apexglobal.io',
      requesterDept: 'Corporate IT',
      assignedTo: 'AGT-01 (L1 Service Desk Agent)',
      deviceId: 'END-CORP-208',
      deviceName: 'APEX-MBP14-208',
      cveId: 'N/A',
      remediationId: 'REM-2026-288',
      firewallReqId: 'FW-REQ-9901',
      controlId: 'MP-7',
      poamId: 'N/A',
      createdAt: '2026-05-13 14:10 UTC',
      description: 'Unauthorized external NVMe enclosure blocked by endpoint device control policy.',
      aiDiagnosis: 'Policy MP-7 enforced properly; user notified of secure cloud transfer policy.',
      recommendedResolution: 'No further action needed. Evidence logged to GRC.',
      timeline: [
        { time: '14:10 UTC', actor: 'AGT-01', type: 'ai', text: 'Port locked and compliance artifact generated.' }
      ]
    }
  ],
  endpoints: [
    {
      id: 'END-FIN-094',
      name: 'APEX-MBP16-094',
      owner: 'Elena Rostova (VP Finance)',
      department: 'Global Finance & Treasury',
      os: 'macOS 15.3.1 (Sequoia)',
      ip: '10.44.18.94',
      serial: 'C02ZN884MD6R',
      healthScore: 42,
      healthStatus: 'Critical',
      securityPosture: 'At Risk - Active CVE-2026-4109',
      lastCheckIn: '18 sec ago',
      patchStatus: 'Missing Critical Hotfix (15.3.2-sec1)',
      complianceStatus: 'Non-Compliant (SI-2)',
      cpuLoad: '78%',
      memoryUsage: '26.4 / 36 GB',
      diskEncrypted: 'FileVault 2 Active',
      edrStatus: 'Degraded (Ring-0 Sensor Warning)',
      installedSoftware: [
        { name: 'macOS XNU Kernel', version: '15.3.1-xnu-11215', status: 'Vulnerable (CVE-2026-4109)' },
        { name: 'Pr AiiA Autonomous Sensor', version: '4.18.2', status: 'Telemetry Degraded' },
        { name: 'Bloomberg Terminal Bridge', version: '2026.4.1', status: 'Healthy' },
        { name: 'OpenSSL Enterprise Lib', version: '3.3.1', status: 'Healthy' }
      ],
      patchHistory: [
        { date: '2026-04-12', kb: 'macOS-15.3.1', status: 'Installed' },
        { date: '2026-03-04', kb: 'PrSensor-4.18.2', status: 'Installed' }
      ]
    },
    {
      id: 'END-EU-412',
      name: 'APEX-WIN11-412',
      owner: 'Dieter Klein (Director Trading)',
      department: 'EU Fixed Income',
      os: 'Windows 11 Enterprise 24H2',
      ip: '10.82.11.42',
      serial: 'DELL-99412-X',
      healthScore: 76,
      healthStatus: 'Warning',
      securityPosture: 'Moderate Risk',
      lastCheckIn: '1 min ago',
      patchStatus: 'Pending Reboot (KB5039211)',
      complianceStatus: 'Compliant',
      cpuLoad: '34%',
      memoryUsage: '14.2 / 32 GB',
      diskEncrypted: 'BitLocker TPM 2.0',
      edrStatus: 'Active & Healthy',
      installedSoftware: [
        { name: 'Windows NT Kernel', version: '10.0.26100', status: 'Healthy' },
        { name: 'Pr AiiA ZTNA Client', version: '4.18.2', status: 'High Latency' }
      ],
      patchHistory: [
        { date: '2026-05-01', kb: 'KB5038841', status: 'Installed' }
      ]
    },
    {
      id: 'SRV-PROD-019',
      name: 'APEX-LNX-ERP19',
      owner: 'Priya Nair (ERP Platform)',
      department: 'Enterprise ERP',
      os: 'RHEL 9.4 (Plow)',
      ip: '172.16.40.19',
      serial: 'AWS-EC2-i0998421',
      healthScore: 88,
      healthStatus: 'Healthy',
      securityPosture: 'Cert Expiring (72h)',
      lastCheckIn: '4 sec ago',
      patchStatus: 'Up to Date',
      complianceStatus: 'Review Needed (IA-5)',
      cpuLoad: '51%',
      memoryUsage: '48.0 / 64 GB',
      diskEncrypted: 'LUKS2 AES-256',
      edrStatus: 'Active & Healthy',
      installedSoftware: [
        { name: 'Linux Kernel', version: '5.14.0-427.el9', status: 'Healthy' },
        { name: 'SAP HANA Connector', version: '2.19.04', status: 'Cert Warning' }
      ],
      patchHistory: [
        { date: '2026-05-08', kb: 'RHSA-2026:1942', status: 'Installed' }
      ]
    },
    {
      id: 'END-CORP-208',
      name: 'APEX-MBP14-208',
      owner: 'David Cho (Product Strategy)',
      department: 'Corporate IT',
      os: 'macOS 15.3.2 (Sequoia)',
      ip: '10.44.22.108',
      serial: 'C02XK119MD6R',
      healthScore: 98,
      healthStatus: 'Healthy',
      securityPosture: 'Secured & Hardened',
      lastCheckIn: '12 sec ago',
      patchStatus: 'Up to Date',
      complianceStatus: 'Compliant',
      cpuLoad: '19%',
      memoryUsage: '9.1 / 16 GB',
      diskEncrypted: 'FileVault 2 Active',
      edrStatus: 'Active & Healthy',
      installedSoftware: [
        { name: 'macOS XNU Kernel', version: '15.3.2-sec1', status: 'Healthy' }
      ],
      patchHistory: [
        { date: '2026-05-12', kb: 'macOS-15.3.2-sec1', status: 'Installed' }
      ]
    }
  ],
  vulnerabilities: [
    {
      id: 'CVE-2026-4109',
      name: 'macOS XNU Kernel Zero-Day Privilege Escalation & Sandbox Escape',
      severity: 'Critical',
      cvss: 9.6,
      affectedCount: 14,
      affectedDevices: ['END-FIN-094', 'END-FIN-095', 'END-FIN-098'],
      exploitStatus: 'Active in Wild (CISA KEV)',
      remediationPlanId: 'REM-2026-309',
      recommendedAction: 'Deploy Apple/Pr-Verified Kernel Hotfix 15.3.2-sec1 & cycle EDR kernel extension.',
      owner: 'Marcus Vance (SecOps Lead)',
      status: 'Remediation Staged',
      controlId: 'SI-2',
      publishedDate: '2026-05-13',
      description: 'A use-after-free race condition in the XNU Mach IPC voucher subsystem allows a local process or malicious document payload to elevate privileges to ring-0 kernel execution and blind endpoint security sensors.'
    },
    {
      id: 'CVE-2026-3811',
      name: 'OpenSSL DTLS 1.3 Buffer Over-Read in ZTNA Tunnel Daemon',
      severity: 'High',
      cvss: 8.1,
      affectedCount: 9,
      affectedDevices: ['END-EU-412'],
      exploitStatus: 'Proof of Concept Public',
      remediationPlanId: 'REM-2026-304',
      recommendedAction: 'Upgrade ZTNA OpenSSL package to 3.3.2-p1.',
      owner: 'Elena Rostova / NetSec',
      status: 'In Progress',
      controlId: 'SC-7',
      publishedDate: '2026-05-09',
      description: 'Malformed DTLS handshake fragments can trigger memory exhaustion or latency degradation on Windows ZTNA clients.'
    },
    {
      id: 'CVE-2026-2901',
      name: 'PKCS12 Keystore Race Condition on RHEL Middleware',
      severity: 'Medium',
      cvss: 6.4,
      affectedCount: 3,
      affectedDevices: ['SRV-PROD-019'],
      exploitStatus: 'Theoretical',
      remediationPlanId: 'REM-2026-299',
      recommendedAction: 'Apply RHSA-2026:2104 and rotate leaf certificate.',
      owner: 'Priya Nair',
      status: 'Open',
      controlId: 'IA-5',
      publishedDate: '2026-04-28',
      description: 'Concurrent PKI renewal requests can lock keystore permissions.'
    }
  ],
  remediations: [
    {
      id: 'REM-2026-309',
      title: 'Emergency Kernel Hotfix 15.3.2-sec1 + EDR Daemon Restart & Quarantine Check',
      cveId: 'CVE-2026-4109',
      incidentId: 'INC-2026-8842',
      targetPrimary: 'END-FIN-094 (Elena Rostova) + 13 Finance Fleet Peers',
      patchPackage: 'PKG-MACOS-15.3.2-SEC1-HOTFIX (SHA256: 9f84c...21b0)',
      riskAssessment: 'High Impact Asset (Tier-1 Finance VP Workstation). Zero-downtime live kernel kext reload supported; requires Human-in-the-Loop approval per Policy POL-AI-04.',
      approvalStatus: 'Pending Approval', // 'Pending Approval' | 'Approved' | 'Rejected'
      executionStatus: 'Staged', // 'Staged' | 'Scheduled' | 'Executing' | 'Deployed' | 'Verified'
      progress: 15,
      assignedAgent: 'AGT-03 (Patch Remediation Agent)',
      firewallReqId: 'FW-REQ-9921',
      controlId: 'SI-2',
      evidenceId: 'EVD-2026-7741',
      scheduleTime: 'Immediate (Upon Approval)',
      logs: [
        '[08:16:02] AGT-03: Validated cryptographic signature of PKG-MACOS-15.3.2-SEC1-HOTFIX.',
        '[08:16:05] AGT-03: Pre-flight snapshot created on END-FIN-094.',
        '[08:16:06] AI Action Firewall: Halted autonomous execution (Tier-1 Finance Asset). Awaiting FW-REQ-9921 approval.'
      ]
    },
    {
      id: 'REM-2026-304',
      title: 'ZTNA OpenSSL 3.3.2-p1 Live Library Patch & Gateway Failover',
      cveId: 'CVE-2026-3811',
      incidentId: 'INC-2026-8839',
      targetPrimary: 'END-EU-412 + 8 EU Trading Workstations',
      patchPackage: 'MSI-ZTNA-OPENSSL-332P1',
      riskAssessment: 'Medium Risk. Brief 2-second tunnel reconnect.',
      approvalStatus: 'Approved',
      executionStatus: 'Executing',
      progress: 65,
      assignedAgent: 'AGT-02 (Self-Healing Agent)',
      firewallReqId: 'FW-REQ-9918',
      controlId: 'SC-7',
      evidenceId: 'EVD-2026-7738',
      scheduleTime: 'Rolling Window Active',
      logs: [
        '[07:10:00] AGT-02: Rolling out OpenSSL patch across Frankfurt subgroup.'
      ]
    }
  ],
  firewallRequests: [
    {
      id: 'FW-REQ-9921',
      agentId: 'AGT-03',
      agentName: 'Patch Remediation Agent',
      actionCode: 'KERNEL_HOTFIX_DEPLOY_AND_ISOLATE_CLEAR',
      target: 'END-FIN-094 (APEX-MBP16-094) + 13 Finance Nodes',
      relatedIncident: 'INC-2026-8842',
      relatedRemediation: 'REM-2026-309',
      riskLevel: 'High (Tier-1 Executive Finance Asset)',
      policyRule: 'POL-AI-04: Production Kernel Modification on Executive / Treasury Endpoints Requires Human CISO/SecOps Sign-Off',
      blastRadius: '14 Endpoints (0 Server Downtime, Live Kext Reload)',
      authStatus: 'Policy Check Passed — Awaiting Human-in-the-Loop Sign-off',
      approvalStatus: 'Pending', // 'Pending' | 'Approved' | 'Rejected'
      requestedAt: '2026-05-14 08:16 UTC',
      payloadJson: `{
  "action": "KERNEL_HOTFIX_DEPLOY_AND_ISOLATE_CLEAR",
  "target_primary": "END-FIN-094",
  "package_hash": "sha256:9f84c88102a74e12b900121b0",
  "rollback_snapshot": "APFS_SNAP_20260514_0816",
  "compliance_mapping": ["NIST-800-53:SI-2", "NIST-800-53:IR-4"]
}`
    },
    {
      id: 'FW-REQ-9918',
      agentId: 'AGT-02',
      agentName: 'Self-Healing Agent',
      actionCode: 'BGP_ZTNA_TUNNEL_REROUTE_DE_FRA',
      target: 'END-EU-412 & DE-FRA-01 Edge',
      relatedIncident: 'INC-2026-8839',
      relatedRemediation: 'REM-2026-304',
      riskLevel: 'Medium',
      policyRule: 'POL-AI-02: Autonomous Network Failover Permitted Under 500ms SLA Breach',
      blastRadius: '9 Trading Endpoints',
      authStatus: 'Authorized via Autonomous Guardrail',
      approvalStatus: 'Approved',
      requestedAt: '2026-05-14 06:42 UTC',
      payloadJson: `{ "action": "BGP_ZTNA_TUNNEL_REROUTE_DE_FRA", "gateway": "DE-FRA-01" }`
    },
    {
      id: 'FW-REQ-9912',
      agentId: 'AGT-06',
      agentName: 'Evidence Collector Agent',
      actionCode: 'VAULT_PKI_ROTATE_LEAF_CERT',
      target: 'SRV-PROD-019 (SAP ERP Connector)',
      relatedIncident: 'INC-2026-8835',
      relatedRemediation: 'REM-2026-299',
      riskLevel: 'Medium',
      policyRule: 'POL-AI-07: ERP Keystore Write Requires Change Window',
      blastRadius: '1 Production ERP Connector',
      authStatus: 'Pending Change Window',
      approvalStatus: 'Pending',
      requestedAt: '2026-05-13 19:25 UTC',
      payloadJson: `{ "action": "VAULT_PKI_ROTATE_LEAF_CERT", "cn": "sap-bridge.apexglobal.io" }`
    }
  ],
  grcControls: [
    {
      id: 'SI-2',
      family: 'System and Information Integrity',
      name: 'Flaw Remediation (NIST SP 800-53 Rev 5)',
      frameworks: ['NIST 800-53', 'FedRAMP High', 'SOC 2 CC7.1', 'ISO 27001 A.8.8'],
      status: 'Gap Identified (Action Required)', // 'Compliant (Verified)' once remediated
      owner: 'helena.vance@apexglobal.io (GRC Director)',
      lastAssessed: '2026-05-14 08:15 UTC',
      linkedCve: 'CVE-2026-4109',
      linkedIncident: 'INC-2026-8842',
      linkedPoam: 'POAM-2026-112',
      description: 'The organization identifies, reports, and corrects information system flaws; tests software and firmware updates related to flaw remediation for effectiveness; and installs security-relevant updates within SLA.',
      evidenceRecords: [
        {
          id: 'EVD-2026-7710',
          title: 'Q1 Automated Fleet Patch Attestation Bundle',
          collector: 'AGT-06 (Evidence Collector Agent)',
          date: '2026-04-30',
          status: 'Verified',
          hash: 'sha256:441a9c...882e'
        }
      ]
    },
    {
      id: 'IR-4',
      family: 'Incident Response',
      name: 'Incident Handling & Automated Containment',
      frameworks: ['NIST 800-53', 'FedRAMP High', 'SOC 2 CC7.3', 'ISO 27001 A.5.24'],
      status: 'Active Monitoring',
      owner: 'Marcus Vance (SecOps Lead)',
      lastAssessed: '2026-05-14 08:16 UTC',
      linkedCve: 'CVE-2026-4109',
      linkedIncident: 'INC-2026-8842',
      linkedPoam: 'POAM-2026-112',
      description: 'The organization implements an incident handling capability for security incidents that includes preparation, detection and analysis, containment, eradication, and recovery.',
      evidenceRecords: [
        {
          id: 'EVD-2026-7739',
          title: 'INC-2026-8842 AI Triage & Containment Telemetry Log',
          collector: 'AGT-05 (Incident Response Agent)',
          date: '2026-05-14',
          status: 'Verified',
          hash: 'sha256:77b21e...190a'
        }
      ]
    },
    {
      id: 'SC-7',
      family: 'System and Communications Protection',
      name: 'Boundary Protection & Zero Trust Micro-Segmentation',
      frameworks: ['NIST 800-53', 'FedRAMP High', 'ISO 27001 A.8.20'],
      status: 'Compliant (Verified)',
      owner: 'NetSec Governance',
      lastAssessed: '2026-05-14 07:00 UTC',
      linkedCve: 'CVE-2026-3811',
      linkedIncident: 'INC-2026-8839',
      linkedPoam: 'POAM-2026-108',
      description: 'Monitor and control communications at the external interface to the system and at key internal boundaries.',
      evidenceRecords: [
        {
          id: 'EVD-2026-7738',
          title: 'ZTNA Mutual TLS Policy Enforcement Snapshot',
          collector: 'AGT-06 (Evidence Collector Agent)',
          date: '2026-05-14',
          status: 'Verified',
          hash: 'sha256:11c90f...442b'
        }
      ]
    },
    {
      id: 'AC-2',
      family: 'Access Control',
      name: 'Account Management & Least Privilege',
      frameworks: ['NIST 800-53', 'FedRAMP High', 'SOC 2 CC6.1', 'ISO 27001 A.5.15'],
      status: 'Compliant (Verified)',
      owner: 'IAM Governance Lead',
      lastAssessed: '2026-05-12 12:00 UTC',
      linkedCve: 'N/A',
      linkedIncident: 'N/A',
      linkedPoam: 'N/A',
      description: 'Define and enforce automated lifecycle provisioning, privileged access review, and zero standing privileges.',
      evidenceRecords: [
        {
          id: 'EVD-2026-7690',
          title: 'Continuous Okta/ActiveDirectory Entitlement Attestation',
          collector: 'AGT-07 (Compliance Analyst Agent)',
          date: '2026-05-12',
          status: 'Verified',
          hash: 'sha256:99a12d...331f'
        }
      ]
    }
  ],
  poamItems: [
    {
      id: 'POAM-2026-112',
      controlId: 'SI-2',
      title: 'Remediate Critical XNU Kernel Flaw CVE-2026-4109 Across Finance Fleet (END-FIN-094)',
      status: 'Open - Active Remediation',
      severity: 'Critical',
      dueDate: '2026-05-15',
      owner: 'Marcus Vance',
      milestone: 'Execute REM-2026-309 and collect cryptographic post-patch attestation EVD-2026-7741.'
    },
    {
      id: 'POAM-2026-108',
      controlId: 'SC-7',
      title: 'Upgrade ZTNA OpenSSL Client Libraries in EU Enclave',
      status: 'In Progress',
      severity: 'High',
      dueDate: '2026-05-18',
      owner: 'Dieter Klein',
      milestone: 'Complete rolling update across 9 Frankfurt endpoints.'
    }
  ],
  aiAgents: [
    {
      id: 'AGT-01',
      name: 'L1 Service Desk Agent',
      category: 'IT Service Management',
      assignedTask: 'Autonomous Ticket Triage, User Context Enrichment & Knowledge Deflection',
      status: 'Active',
      autonomyLevel: 'Level 4 (Autonomous Execution for Low-Risk)',
      lastActivity: '12 sec ago',
      actionsCount: 1428,
      permissions: ['Read ITSM Queue', 'Enrich Endpoint Telemetry', 'Auto-Assign P1/P2', 'Close L1 Password/DLP Alerts'],
      recentLog: 'Triaged INC-2026-8842 and linked Elena Rostova workstation END-FIN-094.'
    },
    {
      id: 'AGT-02',
      name: 'Self-Healing Agent',
      category: 'IT Operations & AIOps',
      assignedTask: 'Daemon Recovery, Memory Leak Mitigation & ZTNA Tunnel Rerouting',
      status: 'Active',
      autonomyLevel: 'Level 3 (Conditional Autonomy)',
      lastActivity: '34 sec ago',
      actionsCount: 892,
      permissions: ['Restart Non-Critical Services', 'Reroute ZTNA Gateways', 'Clear Temp Caches'],
      recentLog: 'Prepared EDR sensor recovery script for END-FIN-094.'
    },
    {
      id: 'AGT-03',
      name: 'Patch Remediation Agent',
      category: 'Endpoint & Exposure Management',
      assignedTask: 'Zero-Downtime Hotfix Staging, Pre-Flight Snapshots & Rollout Execution',
      status: 'Awaiting Firewall Approval',
      autonomyLevel: 'Level 2 (Human-in-the-Loop for Tier-1 Assets)',
      lastActivity: 'Just now',
      actionsCount: 614,
      permissions: ['Stage Kernel Packages', 'Create APFS/VSS Snapshots', 'Execute Approved Remediations'],
      recentLog: 'Submitted FW-REQ-9921 for REM-2026-309 on END-FIN-094.'
    },
    {
      id: 'AGT-04',
      name: 'Vulnerability Triage Agent',
      category: 'Exposure Management & SecOps',
      assignedTask: 'CVE-to-Endpoint Correlation, Exploitability Scoring & Blast Radius Mapping',
      status: 'Active',
      autonomyLevel: 'Level 4 (Full Analytical Autonomy)',
      lastActivity: '1 min ago',
      actionsCount: 2190,
      permissions: ['Continuous SBOM Scan', 'Correlate CISA KEV', 'Map CVE to NIST Controls'],
      recentLog: 'Mapped CVE-2026-4109 to 14 Finance endpoints and NIST SI-2.'
    },
    {
      id: 'AGT-05',
      name: 'Incident Response Agent',
      category: 'SecOps & Threat Containment',
      assignedTask: 'Forensic Snapshot Capture, Process Tree Isolation & SOC Playbook Execution',
      status: 'Active',
      autonomyLevel: 'Level 3 (Guardrailed Containment)',
      lastActivity: '2 mins ago',
      actionsCount: 319,
      permissions: ['Capture Kernel Dump', 'Block Malicious Hash', 'Request Host Isolation'],
      recentLog: 'Captured ring-0 syscall anomaly trace from END-FIN-094.'
    },
    {
      id: 'AGT-06',
      name: 'Evidence Collector Agent',
      category: 'Pr AiiA GRC',
      assignedTask: 'Cryptographic Attestation Generation & Automated Control Evidence Binding',
      status: 'Active',
      autonomyLevel: 'Level 4 (Autonomous Read/Attest)',
      lastActivity: '45 sec ago',
      actionsCount: 3812,
      permissions: ['Sign SHA-256 Telemetry Snapshots', 'Attach Artifacts to NIST/SOC2 Controls'],
      recentLog: 'Standing by to capture post-patch attestation EVD-2026-7741 for SI-2.'
    },
    {
      id: 'AGT-07',
      name: 'Compliance Analyst Agent',
      category: 'Pr AiiA GRC',
      assignedTask: 'Continuous Control Monitoring, POA&M Lifecycle & FedRAMP/NIST Gap Analysis',
      status: 'Active',
      autonomyLevel: 'Level 3 (Conditional Autonomy)',
      lastActivity: '3 mins ago',
      actionsCount: 945,
      permissions: ['Update Control Posture', 'Draft POA&M Milestones', 'Generate SSP Sections'],
      recentLog: 'Flagged Control SI-2 gap due to unpatched CVE-2026-4109 on END-FIN-094.'
    },
    {
      id: 'AGT-08',
      name: 'Agent Supervisor',
      category: 'AI Governance & Firewall',
      assignedTask: 'Policy Enforcement, Multi-Agent Orchestration & Blast-Radius Guardrails',
      status: 'Enforcing Guardrails',
      autonomyLevel: 'Level 5 (Constitutional Policy Enforcer)',
      lastActivity: '5 sec ago',
      actionsCount: 5410,
      permissions: ['Intercept High-Risk Actions', 'Enforce POL-AI Rules', 'Halt Rogue Loops'],
      recentLog: 'Intercepted AGT-03 kernel action on END-FIN-094; routed to AI Action Firewall FW-REQ-9921.'
    }
  ],
  executiveTimeline: [
    {
      id: 'EVT-1006',
      timestamp: '2026-11-04 08:16:06 UTC',
      actor: 'AGT-08 (Agent Supervisor)',
      actorType: 'AI FIREWALL',
      stage: 4,
      entityId: 'FW-REQ-9921',
      targetScreen: 'ai-firewall',
      status: 'ACTIVE',
      title: 'Intercepted Autonomous Kernel Patch on Tier-1 Executive Endpoint',
      detail: 'Evaluated Policy POL-AI-004 (Zero-Touch Tier-1 Restriction) & NIST CM-3. Halted autonomous rollout of REM-2026-309 and queued human CISO approval FW-REQ-9921.'
    },
    {
      id: 'EVT-1005',
      timestamp: '2026-11-04 08:15:48 UTC',
      actor: 'AGT-03 (Patch Remediation Agent)',
      actorType: 'AUTONOMOUS AGENT',
      stage: 5,
      entityId: 'REM-2026-309',
      targetScreen: 'remediation',
      status: 'COMPLETED',
      title: 'Staged Remediation Plan REM-2026-309 & Pre-Flight Snapshot',
      detail: 'Verified SHA-256 signature of PKG-MACOS-15.3.2-SEC1-HOTFIX (libwebp 1.3.2-p4 + XNU Mach IPC patch) and created APFS rollback snapshot on END-FIN-094.'
    },
    {
      id: 'EVT-1004',
      timestamp: '2026-11-04 08:15:31 UTC',
      actor: 'AGT-07 (Compliance Analyst Agent)',
      actorType: 'AUTONOMOUS AGENT',
      stage: 6,
      entityId: 'SI-2',
      targetScreen: 'grc-evidence',
      status: 'COMPLETED',
      title: 'Flagged NIST 800-53 Rev 5 SI-2 Control Gap & Opened POAM-2026-112',
      detail: 'Transitioned Control SI-2 (Flaw Remediation) to Non-Compliant pending verified remediation artifact EVD-2026-7741.'
    },
    {
      id: 'EVT-1003',
      timestamp: '2026-11-04 08:15:10 UTC',
      actor: 'AGT-04 (Vulnerability Triage Agent)',
      actorType: 'AUTONOMOUS AGENT',
      stage: 3,
      entityId: 'CVE-2026-4109',
      targetScreen: 'exposure',
      status: 'COMPLETED',
      title: 'Correlated Syscall Anomaly with Active Zero-Day CVE-2026-4109 (CVSS 9.6)',
      detail: 'Matched XNU kernel ring-0 trap and libwebp 1.3.1 heap corruption signature across END-FIN-094 and 13 Finance fleet peers.'
    },
    {
      id: 'EVT-1002',
      timestamp: '2026-11-04 08:14:38 UTC',
      actor: 'AGT-01 (L1 Service Desk Agent)',
      actorType: 'AUTONOMOUS AGENT',
      stage: 2,
      entityId: 'END-FIN-094',
      targetScreen: 'endpoint-detail',
      status: 'COMPLETED',
      title: 'Auto-Triaged P1 Incident & Linked Endpoint Telemetry END-FIN-094',
      detail: 'Bound incident INC-2026-8842 to workstation APEX-MBP16-094 (Health Score: 42/100, Sensor Degraded).'
    },
    {
      id: 'EVT-1001',
      timestamp: '2026-11-04 08:14:12 UTC',
      actor: 'Dr. Elena Rostova (VP Finance)',
      actorType: 'HUMAN OPERATOR',
      stage: 1,
      entityId: 'INC-2026-8842',
      targetScreen: 'incident-detail',
      status: 'COMPLETED',
      title: 'Reported Workstation Kernel Panic & Security Sensor Alert',
      detail: 'Submitted high-priority ticket INC-2026-8842 after opening treasury settlement bundle.'
    }
  ],
  approvalHistory: [
    {
      id: 'DEC-8802',
      requestId: 'FW-REQ-9921',
      timestamp: '2026-11-04 08:16:06 UTC',
      policy: 'POL-AI-004: Zero-Touch Tier-1 Executive Asset Restriction & NIST CM-3',
      blastRadius: '14 Finance Endpoints (Zero Server Downtime)',
      dualControl: 'Required (CISO / SecOps Lead)',
      decision: 'PENDING',
      approver: 'Awaiting Marcus Vance (CISO & VP Enterprise Operations)',
      justification: 'Automated pre-checks passed; awaiting human authorization to modify ring-0 kernel kext and libwebp 1.3.2-p4.',
      signatureHash: 'PENDING_HSM_COUNTERSIGN'
    },
    {
      id: 'DEC-8801',
      requestId: 'FW-REQ-9918',
      timestamp: '2026-11-04 06:42:11 UTC',
      policy: 'POL-AI-002: Autonomous Network Failover Under 500ms SLA Breach',
      blastRadius: '9 EU Trading Workstations',
      dualControl: 'Autonomous Guardrail Verified',
      decision: 'APPROVED',
      approver: 'AGT-08 Constitutional Enforcer + Dieter Klein',
      justification: ' Frankfurt ZTNA tunnel latency exceeded 450ms threshold; rerouted to DE-FRA-01.',
      signatureHash: 'sha256:7d91a04f...c83b12'
    }
  ],

  supplyChainPlans: [
    {
      id: 'SHP-88214',
      name: 'Ocean — Shanghai → Rotterdam',
      laneNode: 'NYK Line · 14 TEU',
      quantity: '412 units',
      eta: 'Oct 19',
      status: 'At Risk',
      agentTouched: true,
      submodule: 'Demand Planning',
      submoduleIdx: 0,
      carrier: 'NYK Line',
      origin: 'Shanghai Port (CNSHA)',
      destination: 'Rotterdam Port (NLRTM)',
      mode: 'Ocean Freight',
      riskReason: 'Port congestion delay at Suez chokepoint (+4 days buffer exceeded)',
      handlingAgent: 'Logistics Rerouter',
      policy: 'POL-SCM-014',
      firewallChecks: '8/8 checks passed',
      evidenceHash: 'b49f28c1192e4088',
      linkedIncident: 'INC-2026-8842',
      linkedDevice: 'END-FIN-094'
    },
    {
      id: 'SP-2026-W41',
      name: 'Weekly supply plan — EMEA',
      laneNode: 'Hamburg DC',
      quantity: '18,400 units',
      eta: 'Oct 12',
      status: 'Approved',
      agentTouched: true,
      submodule: 'Supply Planning',
      submoduleIdx: 1,
      carrier: 'Kuehne+Nagel',
      origin: 'Munich Manufacturing Plant',
      destination: 'Hamburg Regional DC',
      mode: 'Intermodal Logistics',
      riskReason: 'Capacity constrained; reallocated from Leipzig warehouse buffer',
      handlingAgent: 'Supply Planner',
      policy: 'POL-SCM-011',
      firewallChecks: '8/8 checks passed',
      evidenceHash: 'c71289df4091a104',
      linkedIncident: 'INC-2026-8842',
      linkedDevice: 'END-FIN-094'
    },
    {
      id: 'SHP-88231',
      name: 'Air — Penang → Dallas',
      laneNode: 'DHL Global',
      quantity: '220 units',
      eta: 'Oct 08',
      status: 'In Progress',
      agentTouched: true,
      submodule: 'Logistics',
      submoduleIdx: 2,
      carrier: 'DHL Global Forwarding',
      origin: 'Penang Chip Fab (MYPEN)',
      destination: 'Dallas Fort Worth Hub (USDFW)',
      mode: 'Air Cargo Express',
      riskReason: 'Expedited consignment for priority server hardware replacement',
      handlingAgent: 'Demand Sensing Agent',
      policy: 'POL-SCM-012',
      firewallChecks: '8/8 checks passed',
      evidenceHash: '984102bc4501fd88',
      linkedIncident: 'INC-2026-8842',
      linkedDevice: 'END-FIN-094'
    },
    {
      id: 'SP-2026-W42',
      name: 'Weekly supply plan — APAC',
      laneNode: 'Singapore DC',
      quantity: '22,900 units',
      eta: 'Oct 19',
      status: 'Draft',
      agentTouched: true,
      submodule: 'Inventory',
      submoduleIdx: 3,
      carrier: 'Maersk Logistics',
      origin: 'Shenzhen Hub',
      destination: 'Singapore Regional DC',
      mode: 'Ocean / Hub Transfer',
      riskReason: 'Quarterly inventory rebalance draft under review',
      handlingAgent: 'Supply Planner',
      policy: 'POL-SCM-015',
      firewallChecks: '8/8 checks passed',
      evidenceHash: 'ea4019280bf61290',
      linkedIncident: 'INC-2026-8842',
      linkedDevice: 'END-FIN-094'
    },
    {
      id: 'PRD-31008',
      name: 'Production order — Line 4',
      laneNode: 'Monterrey Plant',
      quantity: '6,500 units',
      eta: 'Oct 14',
      status: 'Scheduled',
      agentTouched: false,
      submodule: 'Demand Planning',
      submoduleIdx: 0,
      carrier: 'Internal Plant Operations',
      origin: 'Monterrey Assembly Line 4',
      destination: 'Austin Final Integration Center',
      mode: 'Plant Production',
      riskReason: 'Manual operator sign-off required for batch run 31',
      handlingAgent: 'Human team',
      policy: 'POL-SCM-016',
      firewallChecks: 'Manual approval required',
      evidenceHash: '194012948bbca100',
      linkedIncident: 'INC-2026-8842',
      linkedDevice: 'END-FIN-094'
    },
    {
      id: 'SHP-88240',
      name: 'Rail — Chicago → Toronto',
      laneNode: 'CN Rail',
      quantity: '88 pallets',
      eta: 'Oct 10',
      status: 'Delivered',
      agentTouched: false,
      submodule: 'Supply Planning',
      submoduleIdx: 1,
      carrier: 'Canadian National Railway',
      origin: 'Chicago Central Depot',
      destination: 'Toronto Intermodal Terminal',
      mode: 'Rail Freight',
      riskReason: 'On-schedule transborder transit completed',
      handlingAgent: 'Human team',
      policy: 'POL-SCM-013',
      firewallChecks: 'Completed',
      evidenceHash: 'ff84019a28c41890',
      linkedIncident: 'INC-2026-8842',
      linkedDevice: 'END-FIN-094'
    },
    {
      id: 'SHP-88252',
      name: 'Truck — Lyon → Milan',
      laneNode: 'DB Schenker',
      quantity: '36 pallets',
      eta: 'Oct 09',
      status: 'In Progress',
      agentTouched: false,
      submodule: 'Logistics',
      submoduleIdx: 2,
      carrier: 'DB Schenker Logistics',
      origin: 'Lyon Distribution Center',
      destination: 'Milan Industrial Park',
      mode: 'Road Transport',
      riskReason: 'Alpine tunnel transit cleared on schedule',
      handlingAgent: 'Human team',
      policy: 'POL-SCM-017',
      firewallChecks: 'Completed',
      evidenceHash: 'c0918a2871bc9940',
      linkedIncident: 'INC-2026-8842',
      linkedDevice: 'END-FIN-094'
    }
  ],
  supplyChainAgents: [
    {
      id: 'AGT-SCM-01',
      name: 'Demand Sensing Agent',
      role: 'Blends POS, weather, market indicators, and promotion signals to detect demand spikes and stockouts before ERP runs.',
      autonomyLevel: 'L3',
      autonomyLabel: 'Act with approval',
      status: 'Active',
      owner: 'C. Weber (VP Supply Operations)',
      actionsWeek: 2840,
      approvalRate: 98.4,
      recentAction: 'Auto-adjusted EMEA Q4 semiconductor demand buffer (+6.4%) based on automotive supply surge.',
      sparkValues: [40, 48, 55, 62, 70, 75, 82, 91]
    },
    {
      id: 'AGT-SCM-02',
      name: 'Supply Planner',
      role: 'Rebalances regional warehouse inventory, calculates safety stocks, and allocates constrained component capacity.',
      autonomyLevel: 'L3',
      autonomyLabel: 'Act with approval',
      status: 'Active',
      owner: 'J. Santos (Director SCM Planning)',
      actionsWeek: 1940,
      approvalRate: 97.2,
      recentAction: 'Generated Hamburg DC rebalance order SP-2026-W41; prevented stockout on 18,400 tier-1 units.',
      sparkValues: [30, 45, 42, 60, 68, 72, 85, 97]
    },
    {
      id: 'AGT-SCM-03',
      name: 'Logistics Rerouter',
      role: 'Monitors global shipping AIS telemetry, port bottlenecks, and carrier disruptions to dynamically reroute lanes.',
      autonomyLevel: 'L2',
      autonomyLabel: 'Draft for approval',
      status: 'Active',
      owner: 'H. Lindqvist (Global Logistics Head)',
      actionsWeek: 1120,
      approvalRate: 94.8,
      recentAction: 'Identified Red Sea / Suez transit delay for SHP-88214; prepared alternate Cape routing plan.',
      sparkValues: [50, 42, 58, 65, 60, 78, 88, 93]
    }
  ],
  auditLog: [
    { id: 'AUD-904', time: '08:16:06 UTC', actor: 'AGT-08 (Agent Supervisor)', action: 'Intercepted kernel hotfix on END-FIN-094; created FW-REQ-9921 for human approval.', status: 'Guardrail Enforced' },
    { id: 'AUD-903', time: '08:15:42 UTC', actor: 'AGT-07 (Compliance Analyst)', action: 'Updated NIST 800-53 SI-2 status to Gap Identified and opened POAM-2026-112.', status: 'Logged' },
    { id: 'AUD-902', time: '08:15:10 UTC', actor: 'AGT-04 (Vulnerability Triage)', action: 'Linked CVE-2026-4109 (CVSS 9.6) to INC-2026-8842 and END-FIN-094.', status: 'Logged' },
    { id: 'AUD-901', time: '08:14:19 UTC', actor: 'AGT-01 (L1 Service Desk)', action: 'Ingested INC-2026-8842 from Elena Rostova.', status: 'Logged' }
  ]
};

// ============================================================================
// MAIN APPLICATION COMPONENT
// ============================================================================

export default function App() {
  // Persistent state with LocalStorage fallback
  const [appState, setAppState] = useState(() => {
    try {
      const saved =
        localStorage.getItem('pr_aiia_enterprise_state_v4') ||
        localStorage.getItem('pr_aiia_enterprise_state_v3') ||
        localStorage.getItem('pr_aiia_enterprise_state_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...INITIAL_STATE,
          ...parsed,
          supplyChainPlans:
            Array.isArray(parsed.supplyChainPlans) && parsed.supplyChainPlans.length > 0
              ? parsed.supplyChainPlans
              : DEFAULT_SUPPLY_CHAIN_PLANS,
          supplyChainAgents:
            Array.isArray(parsed.supplyChainAgents) && parsed.supplyChainAgents.length > 0
              ? parsed.supplyChainAgents
              : DEFAULT_SUPPLY_CHAIN_AGENTS,
          crmRecords:
            Array.isArray(parsed.crmRecords) && parsed.crmRecords.length > 0
              ? parsed.crmRecords
              : DEFAULT_CRM_RECORDS,
          crmAgents:
            Array.isArray(parsed.crmAgents) && parsed.crmAgents.length > 0
              ? parsed.crmAgents
              : DEFAULT_CRM_AGENTS
        };
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_STATE;
  });

  useEffect(() => {
    try {
      localStorage.setItem('pr_aiia_enterprise_state_v4', JSON.stringify(appState));
    } catch (e) {
      console.error(e);
    }
  }, [appState]);

  // Navigation State
  const [activeScreen, setActiveScreen] = useState('command-center');
  const [selectedIncidentId, setSelectedIncidentId] = useState('INC-2026-8842');
  const [selectedEndpointId, setSelectedEndpointId] = useState('END-FIN-094');
  const [selectedCveId, setSelectedCveId] = useState('CVE-2026-4109');
  const [selectedRemediationId, setSelectedRemediationId] = useState('REM-2026-309');
  const [selectedControlId, setSelectedControlId] = useState('SI-2');
  const [selectedAgentId, setSelectedAgentId] = useState('AGT-03');
  const [selectedFirewallId, setSelectedFirewallId] = useState('FW-REQ-9921');
  const [selectedSupplyChainId, setSelectedSupplyChainId] = useState('SHP-88214');
  const [selectedCrmId, setSelectedCrmId] = useState('OPP-30871');

  // Sidebar Expand/Collapse State
  const [expandedSections, setExpandedSections] = useState({
    platform: true,
    grc: true,
    aiWorkforce: true
  });

  // UI Overlays & Modals
  const [globalSearch, setGlobalSearch] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState([
    {
      id: 'NOTIF-1',
      title: 'AI Firewall Sign-Off Needed (FW-REQ-9921)',
      desc: 'AGT-03 requests approval to deploy kernel hotfix on END-FIN-094.',
      tone: 'amber',
      screen: 'ai-firewall',
      recordId: 'FW-REQ-9921',
      read: false
    },
    {
      id: 'NOTIF-2',
      title: 'P1 Incident INC-2026-8842 Active',
      desc: 'Elena Rostova workstation kernel privilege escalation & CVE-2026-4109 match.',
      tone: 'red',
      screen: 'incident-detail',
      recordId: 'INC-2026-8842',
      read: false
    },
    {
      id: 'NOTIF-3',
      title: 'NIST 800-53 Control SI-2 Gap Flagged',
      desc: 'POA&M item POAM-2026-112 awaiting post-remediation attestation EVD-2026-7741.',
      tone: 'emerald',
      screen: 'grc-evidence',
      recordId: 'SI-2',
      read: false
    }
  ]);
  const [showCopilot, setShowCopilot] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showGoldenThreadBar, setShowGoldenThreadBar] = useState(true);
  const [toast, setToast] = useState(null);

  // Reusable Confirmation Dialog State for Sensitive Operations
  const [confirmDialog, setConfirmDialog] = useState(null);
  // { title, message, confirmLabel, tone: 'danger' | 'warning' | 'primary', requireReason: boolean, onConfirm: (reason) => void }
  const [confirmReason, setConfirmReason] = useState('');

  // Create Incident Modal State
  const [showCreateIncidentModal, setShowCreateIncidentModal] = useState(false);
  const [incidentFormError, setIncidentFormError] = useState('');
  const [newIncidentForm, setNewIncidentForm] = useState({
    title: '',
    requester: '',
    requesterEmail: '',
    priority: 'P2 - High',
    deviceId: 'END-FIN-094',
    description: ''
  });

  // Upload Evidence Modal State
  const [showEvidenceModal, setShowEvidenceModal] = useState(false);
  const [evidenceFormError, setEvidenceFormError] = useState('');
  const [newEvidenceForm, setNewEvidenceForm] = useState({
    controlId: 'SI-2',
    title: '',
    collector: 'AGT-06 (Evidence Collector Agent - SHA256 Attested)',
    notes: ''
  });

  // Copilot Chat State
  const [copilotMessages, setCopilotMessages] = useState([
    {
      sender: 'ai',
      time: '08:16 UTC',
      text: 'Welcome to Pr AiiA Copilot. I am tracking active P1 Incident INC-2026-8842 on Elena Rostova’s MacBook Pro (END-FIN-094) caused by CVE-2026-4109. AI Action Firewall request FW-REQ-9921 is ready for your review.'
    }
  ]);
  const [copilotInput, setCopilotInput] = useState('');

  // Helper to trigger temporary notification banner
  const notify = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 4500);
  };

  // Helper to open confirmation modal before sensitive operations
  const requestConfirmation = ({ title, message, confirmLabel = 'Confirm Action', tone = 'danger', requireReason = false, onConfirm }) => {
    setConfirmReason('');
    setConfirmDialog({ title, message, confirmLabel, tone, requireReason, onConfirm });
  };

  // Toggle sidebar sections
  const toggleSection = (key) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Navigate to a specific entity screen and set active record
  const navigateToRecord = (screen, recordId) => {
    if (screen === 'incident-detail' && recordId) setSelectedIncidentId(recordId);
    if (screen === 'endpoint-detail' && recordId) setSelectedEndpointId(recordId);
    if (screen === 'exposure' && recordId) setSelectedCveId(recordId);
    if (screen === 'remediation' && recordId) setSelectedRemediationId(recordId);
    if (screen === 'grc-evidence' && recordId) setSelectedControlId(recordId);
    if (screen === 'ai-workforce' && recordId) setSelectedAgentId(recordId);
    if (screen === 'ai-firewall' && recordId) setSelectedFirewallId(recordId);
    if ((screen === 'supply-chain' || screen === 'supply-chain-detail') && recordId) setSelectedSupplyChainId(recordId);
    if ((screen === 'crm' || screen === 'crm-detail') && recordId) setSelectedCrmId(recordId);
    setActiveScreen(screen);
    setShowSearchDropdown(false);
  };

  // ============================================================================
  // SYNCHRONIZED WORKFLOW MUTATIONS (THE GOLDEN THREAD ENGINE)
  // ============================================================================

  const getFormattedUtcNow = () => {
    const now = new Date();
    const hh = String(now.getUTCHours()).padStart(2, '0');
    const mm = String(now.getUTCMinutes()).padStart(2, '0');
    const ss = String(now.getUTCSeconds()).padStart(2, '0');
    return `2026-11-04 ${hh}:${mm}:${ss} UTC`;
  };

  // Step A: Request or Re-verify Approval
  const handleRequestApproval = (remId) => {
    const ts = getFormattedUtcNow();
    setAppState((prev) => ({
      ...prev,
      goldenThreadStep: 4,
      remediations: prev.remediations.map((r) =>
        r.id === remId
          ? {
              ...r,
              approvalStatus: 'Pending Approval',
              executionStatus: 'Staged',
              progress: 25,
              logs: [
                ...r.logs,
                `[${ts}] ${prev.currentUserRole}: Re-submitted ${r.firewallReqId} to AI Action Firewall for CISO authorization.`
              ]
            }
          : r
      ),
      firewallRequests: prev.firewallRequests.map((f) =>
        f.relatedRemediation === remId
          ? { ...f, approvalStatus: 'Pending', authStatus: 'Policy Check Passed — Awaiting Human Sign-Off' }
          : f
      ),
      approvalHistory: [
        {
          id: `DEC-${Math.floor(8803 + Math.random() * 900)}`,
          requestId: 'FW-REQ-9921',
          timestamp: ts,
          policy: 'POL-AI-004: Zero-Touch Tier-1 Executive Asset Restriction & NIST CM-3',
          blastRadius: '14 Finance Endpoints (Zero Server Downtime)',
          dualControl: 'Re-Queued for Human Sign-Off',
          decision: 'PENDING',
          approver: `Requested by ${prev.currentUserRole}`,
          justification: 'Re-submitted remediation plan REM-2026-309 after exception review; awaiting CISO authorization.',
          signatureHash: 'PENDING_HSM_COUNTERSIGN'
        },
        ...(prev.approvalHistory || [])
      ],
      executiveTimeline: [
        {
          id: `EVT-${Date.now().toString().slice(-4)}`,
          timestamp: ts,
          actor: prev.currentUserRole,
          actorType: 'HUMAN OPERATOR',
          stage: 4,
          entityId: 'FW-REQ-9921',
          targetScreen: 'ai-firewall',
          status: 'ACTIVE',
          title: 'Re-Submitted AI Action Firewall Request FW-REQ-9921 for Authorization',
          detail: `Cleared exception hold on REM-2026-309 and queued FW-REQ-9921 for immediate approval.`
        },
        ...(prev.executiveTimeline || [])
      ],
      auditLog: [
        {
          id: `AUD-${Date.now().toString().slice(-3)}`,
          time: ts,
          actor: prev.currentUserRole,
          action: `Escalated ${remId} to AI Action Firewall (FW-REQ-9921) for immediate CISO sign-off.`,
          status: 'Escalated'
        },
        ...prev.auditLog
      ]
    }));
    notify('Approval request queued in AI Action Firewall (FW-REQ-9921).', 'info');
  };

  // Step B: Approve AI Action in Firewall or Remediation View
  const handleApproveAction = (fwReqId = 'FW-REQ-9921') => {
    const ts = getFormattedUtcNow();
    const sigHash = `sha256:8f4e2b91c04d...${Math.random().toString(16).slice(2, 8)}`;
    setAppState((prev) => {
      const updatedFw = prev.firewallRequests.map((req) =>
        req.id === fwReqId
          ? {
              ...req,
              approvalStatus: 'Approved',
              authStatus: `Approved by ${prev.currentUserRole} (${ts})`
            }
          : req
      );

      const updatedRem = prev.remediations.map((rem) =>
        rem.firewallReqId === fwReqId
          ? {
              ...rem,
              approvalStatus: 'Approved',
              executionStatus: rem.executionStatus === 'Verified' ? 'Verified' : rem.executionStatus === 'Deployed' ? 'Deployed' : 'Staged',
              progress: Math.max(rem.progress, 50),
              logs: [
                ...rem.logs,
                `[${ts}] AI Action Firewall: ${fwReqId} APPROVED by ${prev.currentUserRole}. Cryptographic execution token (${sigHash}) issued to AGT-03.`
              ]
            }
          : rem
      );

      const updatedAgents = prev.aiAgents.map((ag) =>
        ag.id === 'AGT-03'
          ? {
              ...ag,
              status: 'Authorized — Ready to Deploy',
              actionsCount: ag.actionsCount + 1,
              recentLog: `Received cryptographic execution token (${sigHash}) from ${fwReqId}.`
            }
          : ag
      );

      return {
        ...prev,
        goldenThreadStep: Math.max(prev.goldenThreadStep, 5),
        firewallRequests: updatedFw,
        remediations: updatedRem,
        aiAgents: updatedAgents,
        approvalHistory: [
          {
            id: `DEC-${Math.floor(8810 + Math.random() * 900)}`,
            requestId: fwReqId,
            timestamp: ts,
            policy: 'POL-AI-004: Zero-Touch Tier-1 Executive Asset Restriction & NIST CM-3',
            blastRadius: '14 Finance Endpoints (Zero Server Downtime)',
            dualControl: 'Satisfied (Human-in-the-Loop + AGT-08)',
            decision: 'APPROVED',
            approver: `Marcus Vance (${prev.currentUserRole})`,
            justification: 'Authorized emergency ring-0 XNU hotfix 15.3.2-sec1 and libwebp 1.3.2-p4 deployment on END-FIN-094.',
            signatureHash: sigHash
          },
          ...(prev.approvalHistory || []).filter((d) => !(d.requestId === fwReqId && d.decision === 'PENDING'))
        ],
        executiveTimeline: [
          {
            id: `EVT-${Date.now().toString().slice(-4)}`,
            timestamp: ts,
            actor: `Marcus Vance (${prev.currentUserRole})`,
            actorType: 'HUMAN OPERATOR',
            stage: 4,
            entityId: fwReqId,
            targetScreen: 'ai-firewall',
            status: 'COMPLETED',
            title: `Approved AI Action Firewall Request ${fwReqId} & Issued Execution Token`,
            detail: `Counter-signed Policy POL-AI-004 & NIST CM-3 (${sigHash}). Authorized AGT-03 to execute REM-2026-309 on END-FIN-094.`
          },
          ...(prev.executiveTimeline || [])
        ],
        auditLog: [
          {
            id: `AUD-${Date.now().toString().slice(-3)}`,
            time: ts,
            actor: prev.currentUserRole,
            action: `Approved AI Action Firewall Request ${fwReqId} for kernel remediation on END-FIN-094 (${sigHash}).`,
            status: 'Approved'
          },
          ...prev.auditLog
        ]
      };
    });
    notify(`AI Action ${fwReqId} approved! Agent AGT-03 is now authorized to execute REM-2026-309.`, 'success');
  };

  // Step C: Reject AI Action (Protected by Confirmation Dialog)
  const handleRejectAction = (fwReqId = 'FW-REQ-9921') => {
    requestConfirmation({
      title: `Reject Autonomous Action (${fwReqId})`,
      message: `Are you sure you want to reject ${fwReqId}? This will transition the Golden Thread stage to FAILED / REJECTED, halt autonomous patch deployment on END-FIN-094, and log an exception in the GRC ledger.`,
      confirmLabel: 'Reject AI Action',
      tone: 'danger',
      requireReason: true,
      onConfirm: (reason) => {
        const ts = getFormattedUtcNow();
        const rejectReason = reason?.trim() || 'Executive Freeze Window — Manual Change Board Review Required';
        setAppState((prev) => ({
          ...prev,
          firewallRequests: prev.firewallRequests.map((req) =>
            req.id === fwReqId
              ? {
                  ...req,
                  approvalStatus: 'Rejected',
                  authStatus: `Rejected by ${prev.currentUserRole} (${rejectReason})`
                }
              : req
          ),
          remediations: prev.remediations.map((rem) =>
            rem.firewallReqId === fwReqId
              ? {
                  ...rem,
                  approvalStatus: 'Rejected',
                  executionStatus: 'Halted (Firewall Rejected)',
                  logs: [
                    ...rem.logs,
                    `[${ts}] AI Action Firewall: ${fwReqId} REJECTED by ${prev.currentUserRole}. Reason: ${rejectReason}.`
                  ]
                }
              : rem
          ),
          aiAgents: prev.aiAgents.map((ag) =>
            ag.id === 'AGT-03'
              ? {
                  ...ag,
                  status: 'Halted by AI Firewall',
                  recentLog: `Execution blocked on ${fwReqId}: ${rejectReason}`
                }
              : ag
          ),
          approvalHistory: [
            {
              id: `DEC-${Math.floor(8810 + Math.random() * 900)}`,
              requestId: fwReqId,
              timestamp: ts,
              policy: 'POL-AI-004: Zero-Touch Tier-1 Executive Asset Restriction & NIST CM-3',
              blastRadius: '14 Finance Endpoints (Blocked)',
              dualControl: 'Blocked by Human Operator',
              decision: 'REJECTED',
              approver: `Marcus Vance (${prev.currentUserRole})`,
              justification: rejectReason,
              signatureHash: 'sha256:fb0091e4...halt99'
            },
            ...(prev.approvalHistory || [])
          ],
          executiveTimeline: [
            {
              id: `EVT-${Date.now().toString().slice(-4)}`,
              timestamp: ts,
              actor: `Marcus Vance (${prev.currentUserRole})`,
              actorType: 'AI FIREWALL',
              stage: 4,
              entityId: fwReqId,
              targetScreen: 'ai-firewall',
              status: 'FAILED',
              title: `Rejected AI Action Firewall Request ${fwReqId} — Autonomous Rollout Halted`,
              detail: `Reason logged: "${rejectReason}". AGT-03 execution token revoked; endpoint END-FIN-094 remains under containment.`
            },
            ...(prev.executiveTimeline || [])
          ],
          auditLog: [
            {
              id: `AUD-${Date.now().toString().slice(-3)}`,
              time: ts,
              actor: prev.currentUserRole,
              action: `Rejected AI Action Firewall Request ${fwReqId} (${rejectReason}).`,
              status: 'Rejected'
            },
            ...prev.auditLog
          ]
        }));
        notify(`AI Action ${fwReqId} rejected. Stage marked FAILED / REJECTED in Golden Thread.`, 'warning');
      }
    });
  };

  // Step D: Execute Remediation & Simulate Live Deployment
  const handleExecuteRemediation = (remId = 'REM-2026-309') => {
    const targetRem = appState.remediations.find((r) => r.id === remId);
    if (targetRem && targetRem.approvalStatus !== 'Approved') {
      notify('Governance Guardrail: You must approve FW-REQ-9921 before executing this remediation.', 'warning');
      return;
    }

    const ts = getFormattedUtcNow();
    setAppState((prev) => ({
      ...prev,
      goldenThreadStep: Math.max(prev.goldenThreadStep, 5),
      remediations: prev.remediations.map((rem) =>
        rem.id === remId
          ? {
              ...rem,
              executionStatus: 'Deployed',
              progress: 85,
              logs: [
                ...rem.logs,
                `[${ts}] AGT-03: Deploying PKG-MACOS-15.3.2-SEC1-HOTFIX & libwebp 1.3.2-p4 to END-FIN-094 and 13 Finance peers...`,
                `[${ts}] AGT-02: Restarted Pr-Sensor ring-0 telemetry daemon. Heartbeat latency 11ms (100% healthy).`,
                `[${ts}] AGT-03: Kernel patched to 15.3.2-sec1 without reboot. Ready for post-patch verification.`
              ]
            }
          : rem
      ),
      endpoints: prev.endpoints.map((ep) =>
        ep.id === 'END-FIN-094'
          ? {
              ...ep,
              os: 'macOS 15.3.2-sec1 (Patched)',
              healthScore: 94,
              healthStatus: 'Healthy',
              securityPosture: 'Remediated — Pending Verification',
              patchStatus: 'Hotfix 15.3.2-sec1 Installed',
              edrStatus: 'Active & Healthy (Telemetry Restored)',
              cpuLoad: '18%'
            }
          : ep
      ),
      aiAgents: prev.aiAgents.map((ag) =>
        ag.id === 'AGT-03'
          ? {
              ...ag,
              status: 'Active — Deployed Hotfix',
              actionsCount: ag.actionsCount + 14,
              lastActivity: 'Just now',
              recentLog: `Deployed REM-2026-309 across END-FIN-094 & 13 Finance endpoints.`
            }
          : ag
      ),
      executiveTimeline: [
        {
          id: `EVT-${Date.now().toString().slice(-4)}`,
          timestamp: ts,
          actor: 'AGT-03 (Patch Remediation Agent)',
          actorType: 'AUTONOMOUS AGENT',
          stage: 5,
          entityId: remId,
          targetScreen: 'remediation',
          status: 'ACTIVE',
          title: 'Executed Zero-Downtime Kernel & Library Hotfix REM-2026-309 on END-FIN-094',
          detail: 'Upgraded XNU kernel to 15.3.2-sec1 and libwebp 1.3.1 → 1.3.2-p4 across 14 Finance endpoints; AGT-02 restored EDR heartbeat (11ms).'
        },
        ...(prev.executiveTimeline || [])
      ],
      auditLog: [
        {
          id: `AUD-${Date.now().toString().slice(-3)}`,
          time: ts,
          actor: 'AGT-03 (Patch Remediation Agent)',
          action: `Executed ${remId} across END-FIN-094 and 13 Finance fleet devices (Simulated).`,
          status: 'Deployed'
        },
        ...prev.auditLog
      ]
    }));
    notify('Simulated Kernel Hotfix 15.3.2-sec1 deployed to END-FIN-094! Click "Verify & Attest GRC" to complete the Golden Thread.', 'success');
  };

  // Step E: Verify Remediation & Auto-Generate GRC Evidence + Close POA&M + Resolve Incident
  const handleVerifyAndAttest = (remId = 'REM-2026-309') => {
    const targetRem = appState.remediations.find((r) => r.id === remId);
    if (targetRem && targetRem.executionStatus !== 'Deployed' && targetRem.executionStatus !== 'Verified') {
      notify('Please click "Execute Remediation" first before verifying post-patch telemetry.', 'warning');
      return;
    }

    const ts = getFormattedUtcNow();
    setAppState((prev) => {
      const newEvidence = {
        id: 'EVD-2026-7741',
        title: 'Cryptographic Post-Patch Attestation: END-FIN-094 & Finance Fleet (CVE-2026-4109 / REM-2026-309)',
        collector: 'AGT-06 (Evidence Collector Agent)',
        date: ts,
        status: 'Verified',
        hash: 'sha256:e901f44b82c19d004a12994f7a8b3c10'
      };

      return {
        ...prev,
        goldenThreadStep: 6,
        remediations: prev.remediations.map((rem) =>
          rem.id === remId
            ? {
                ...rem,
                executionStatus: 'Verified',
                progress: 100,
                logs: [
                  ...rem.logs,
                  `[${ts}] AGT-04: Post-patch vulnerability & memory canary scan complete on END-FIN-094. CVE-2026-4109 no longer detected.`,
                  `[${ts}] AGT-06: Generated cryptographic compliance evidence EVD-2026-7741 and bound to NIST Control SI-2.`,
                  `[${ts}] AGT-07: Closed POA&M item POAM-2026-112 and resolved Incident INC-2026-8842.`
                ]
              }
            : rem
        ),
        incidents: prev.incidents.map((inc) =>
          inc.id === 'INC-2026-8842'
            ? {
                ...inc,
                status: 'Resolved',
                timeline: [
                  ...inc.timeline,
                  {
                    time: ts,
                    actor: 'AGT-03 & AGT-06',
                    type: 'ai',
                    text: 'Remediation REM-2026-309 verified. Kernel 15.3.2-sec1 & libwebp 1.3.2-p4 active on END-FIN-094. GRC Evidence EVD-2026-7741 attached to NIST Control SI-2. Incident auto-resolved.'
                  }
                ]
              }
            : inc
        ),
        endpoints: prev.endpoints.map((ep) =>
          ep.id === 'END-FIN-094'
            ? {
                ...ep,
                os: 'macOS 15.3.2-sec1 (Sequoia)',
                healthScore: 99,
                healthStatus: 'Healthy',
                securityPosture: 'Secured & Verified',
                patchStatus: 'Up to Date (15.3.2-sec1)',
                complianceStatus: 'Compliant (SI-2 Verified)',
                installedSoftware: ep.installedSoftware.map((sw) =>
                  sw.name.includes('Kernel')
                    ? { ...sw, version: '15.3.2-sec1', status: 'Patched & Verified' }
                    : { ...sw, status: 'Healthy' }
                ),
                patchHistory: [
                  { date: '2026-11-04', kb: 'PKG-MACOS-15.3.2-SEC1-HOTFIX', status: 'Verified (EVD-2026-7741)' },
                  ...ep.patchHistory.filter((ph) => ph.kb !== 'PKG-MACOS-15.3.2-SEC1-HOTFIX')
                ]
              }
            : ep
        ),
        vulnerabilities: prev.vulnerabilities.map((v) =>
          v.id === 'CVE-2026-4109'
            ? { ...v, affectedCount: 0, status: 'Remediated & Verified', affectedDevices: [] }
            : v
        ),
        grcControls: prev.grcControls.map((ctrl) =>
          ctrl.id === 'SI-2' || ctrl.id === 'IR-4'
            ? {
                ...ctrl,
                status: 'Compliant (Verified)',
                lastAssessed: `${ts} (Automated Attestation)`,
                evidenceRecords: [
                  newEvidence,
                  ...ctrl.evidenceRecords.filter((e) => e.id !== 'EVD-2026-7741')
                ]
              }
            : ctrl
        ),
        poamItems: prev.poamItems.map((p) =>
          p.id === 'POAM-2026-112'
            ? { ...p, status: 'Completed & Closed (EVD-2026-7741)' }
            : p
        ),
        executiveTimeline: [
          {
            id: `EVT-${Date.now().toString().slice(-4)}-B`,
            timestamp: ts,
            actor: 'AGT-06 (Evidence Collector Agent)',
            actorType: 'AUTONOMOUS AGENT',
            stage: 6,
            entityId: 'EVD-2026-7741',
            targetScreen: 'grc-evidence',
            status: 'COMPLETED',
            title: 'Generated Cryptographic Attestation EVD-2026-7741 & Closed POAM-2026-112',
            detail: 'Bound SHA-256 signed verification bundle to NIST SP 800-53 Rev 5 Control SI-2 (Non-Compliant → Compliant) and auto-resolved INC-2026-8842.'
          },
          {
            id: `EVT-${Date.now().toString().slice(-4)}-A`,
            timestamp: ts,
            actor: 'AGT-04 (Vulnerability Triage Agent)',
            actorType: 'AUTONOMOUS AGENT',
            stage: 5,
            entityId: 'REM-2026-309',
            targetScreen: 'remediation',
            status: 'COMPLETED',
            title: 'Verified Post-Patch Telemetry & 5/5 Synthetic Smoke Assertions on END-FIN-094',
            detail: 'Confirmed XNU 15.3.2-sec1 symbol integrity, libwebp 1.3.2-p4 heap canary protection, and 0 remaining exposures for CVE-2026-4109.'
          },
          ...(prev.executiveTimeline || [])
        ],
        auditLog: [
          {
            id: `AUD-${Date.now().toString().slice(-3)}`,
            time: ts,
            actor: 'AGT-06 (Evidence Collector Agent)',
            action: 'Verified REM-2026-309, attested EVD-2026-7741 to NIST SI-2, closed POAM-2026-112, and resolved INC-2026-8842.',
            status: 'Attested'
          },
          ...prev.auditLog
        ]
      };
    });
    notify('Golden Thread Complete! Endpoint verified, CVE-2026-4109 closed, Evidence EVD-2026-7741 bound to NIST SI-2, and POA&M closed.', 'success');
  };

  // Guided "Advance Next Golden Thread Step" Helper
  const handleAdvanceGoldenThread = () => {
    const fw = appState.firewallRequests.find((f) => f.id === 'FW-REQ-9921');
    const rem = appState.remediations.find((r) => r.id === 'REM-2026-309');
    if (activeScreen === 'command-center') {
      navigateToRecord('incident-detail', 'INC-2026-8842');
      notify('Step 1/6: Inspecting P1 ITSM Incident INC-2026-8842.', 'info');
    } else if (activeScreen === 'incident-detail') {
      navigateToRecord('endpoint-detail', 'END-FIN-094');
      notify('Step 2/6: Inspecting affected endpoint END-FIN-094 (APEX-MBP16-094).', 'info');
    } else if (activeScreen === 'endpoint-detail') {
      navigateToRecord('exposure', 'CVE-2026-4109');
      notify('Step 3/6: Reviewing active vulnerability CVE-2026-4109.', 'info');
    } else if (activeScreen === 'exposure') {
      navigateToRecord('ai-firewall', 'FW-REQ-9921');
      notify('Step 4/6: Reviewing AI Action Firewall request FW-REQ-9921.', 'info');
    } else if (activeScreen === 'ai-firewall') {
      if (fw?.approvalStatus !== 'Approved') {
        handleApproveAction('FW-REQ-9921');
      }
      navigateToRecord('remediation', 'REM-2026-309');
    } else if (activeScreen === 'remediation') {
      if (fw?.approvalStatus !== 'Approved') {
        handleApproveAction('FW-REQ-9921');
      } else if (rem?.executionStatus === 'Staged') {
        handleExecuteRemediation('REM-2026-309');
      } else if (rem?.executionStatus === 'Deployed') {
        handleVerifyAndAttest('REM-2026-309');
      } else {
        navigateToRecord('grc-evidence', 'SI-2');
      }
    } else {
      navigateToRecord('grc-evidence', 'SI-2');
      notify('Step 6/6: Reviewing NIST 800-53 Control SI-2, Evidence EVD-2026-7741, and POA&M POAM-2026-112.', 'info');
    }
  };

  // Reset Demo State (with confirmation dialog)
  const handleResetDemo = () => {
    requestConfirmation({
      title: 'Reset Prototype Demo State',
      message: 'This will restore all incidents, endpoints, CVEs, AI Firewall approvals, remediations, and GRC evidence back to the initial Golden Thread scenario.',
      confirmLabel: 'Reset Demo Data',
      tone: 'warning',
      onConfirm: () => {
        localStorage.removeItem('pr_aiia_enterprise_state_v4');
        localStorage.removeItem('pr_aiia_enterprise_state_v3');
        localStorage.removeItem('pr_aiia_enterprise_state_v2');
        setAppState(INITIAL_STATE);
        setSelectedIncidentId('INC-2026-8842');
        setSelectedEndpointId('END-FIN-094');
        setSelectedCveId('CVE-2026-4109');
        setSelectedRemediationId('REM-2026-309');
        setSelectedControlId('SI-2');
        setSelectedFirewallId('FW-REQ-9921');
        setSelectedSupplyChainId('SHP-88214');
        setSelectedCrmId('OPP-30871');
        setActiveScreen('command-center');
        notify('Prototype state reset to initial Golden Thread scenario.', 'info');
      }
    });
  };

  // Derived Executive KPIs for Command Center
  const metrics = useMemo(() => {
    const openIncidents = appState.incidents.filter((i) => i.status !== 'Resolved').length;
    const criticalVulns = appState.vulnerabilities.filter(
      (v) => v.severity === 'Critical' && v.status !== 'Remediated & Verified'
    ).length;
    const pendingApprovals = appState.firewallRequests.filter((f) => f.approvalStatus === 'Pending').length;
    const compliantControls = appState.grcControls.filter((c) => c.status.includes('Compliant')).length;
    const complianceScore = Math.round((compliantControls / appState.grcControls.length) * 100);
    return {
      openIncidents,
      managedEndpoints: 4820 + (appState.endpoints.length - 4),
      criticalVulns,
      pendingApprovals,
      complianceScore: complianceScore === 100 ? 98 : 89
    };
  }, [appState]);

  // Global Search Results across all entity types
  const searchResults = useMemo(() => {
    const q = globalSearch.trim().toLowerCase();
    if (!q) return [];
    const results = [];
    appState.incidents.forEach((i) => {
      if (i.id.toLowerCase().includes(q) || i.title.toLowerCase().includes(q) || i.requester.toLowerCase().includes(q)) {
        results.push({ type: 'Incident', id: i.id, label: i.title, screen: 'incident-detail' });
      }
    });
    appState.endpoints.forEach((e) => {
      if (e.id.toLowerCase().includes(q) || e.name.toLowerCase().includes(q) || e.owner.toLowerCase().includes(q)) {
        results.push({ type: 'Endpoint', id: e.id, label: `${e.name} (${e.owner})`, screen: 'endpoint-detail' });
      }
    });
    appState.vulnerabilities.forEach((v) => {
      if (v.id.toLowerCase().includes(q) || v.name.toLowerCase().includes(q)) {
        results.push({ type: 'Vulnerability', id: v.id, label: v.name, screen: 'exposure' });
      }
    });
    appState.remediations.forEach((r) => {
      if (r.id.toLowerCase().includes(q) || r.title.toLowerCase().includes(q)) {
        results.push({ type: 'Remediation', id: r.id, label: r.title, screen: 'remediation' });
      }
    });
    appState.firewallRequests.forEach((fw) => {
      if (fw.id.toLowerCase().includes(q) || fw.actionCode.toLowerCase().includes(q)) {
        results.push({ type: 'AI Firewall', id: fw.id, label: `${fw.actionCode} (${fw.target})`, screen: 'ai-firewall' });
      }
    });
    appState.grcControls.forEach((c) => {
      if (c.id.toLowerCase().includes(q) || c.name.toLowerCase().includes(q)) {
        results.push({ type: 'GRC Control', id: c.id, label: c.name, screen: 'grc-evidence' });
      }
    });
    appState.aiAgents.forEach((a) => {
      if (a.id.toLowerCase().includes(q) || a.name.toLowerCase().includes(q)) {
        results.push({ type: 'AI Agent', id: a.id, label: a.name, screen: 'ai-workforce' });
      }
    });
    (appState.supplyChainPlans || []).forEach((p) => {
      if (p.id.toLowerCase().includes(q) || p.name.toLowerCase().includes(q) || p.laneNode.toLowerCase().includes(q) || p.carrier.toLowerCase().includes(q)) {
        results.push({ type: 'Supply Plan', id: p.id, label: `${p.name} (${p.laneNode})`, screen: 'supply-chain-detail' });
      }
    });
    (appState.crmRecords || []).forEach((c) => {
      if (
        c.id.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q) ||
        c.account.toLowerCase().includes(q) ||
        (c.contactName && c.contactName.toLowerCase().includes(q))
      ) {
        results.push({
          type: 'CRM Deal',
          id: c.id,
          label: `${c.account} — ${c.name} (${c.amount})`,
          screen: 'crm-detail'
        });
      }
    });
    return results.slice(0, 10);
  }, [globalSearch, appState]);

  // Create Incident Handler with validation
  const handleCreateIncidentSubmit = (e) => {
    e.preventDefault();
    if (!newIncidentForm.title.trim() || !newIncidentForm.requester.trim()) {
      setIncidentFormError('Validation Error: Both Incident Summary and Requester Name are required.');
      return;
    }
    setIncidentFormError('');
    const newId = `INC-2026-${Math.floor(8843 + Math.random() * 100)}`;
    const ep = appState.endpoints.find((d) => d.id === newIncidentForm.deviceId) || appState.endpoints[0];
    const created = {
      id: newId,
      title: newIncidentForm.title.trim(),
      priority: newIncidentForm.priority,
      status: 'Open',
      requester: newIncidentForm.requester.trim(),
      requesterEmail: newIncidentForm.requesterEmail.trim() || 'user@apexglobal.io',
      requesterDept: ep.department,
      assignedTo: 'AGT-01 (L1 Service Desk Agent)',
      deviceId: ep.id,
      deviceName: ep.name,
      cveId: 'CVE-2026-4109',
      remediationId: 'REM-2026-309',
      firewallReqId: 'FW-REQ-9921',
      controlId: 'SI-2',
      poamId: 'POAM-2026-112',
      createdAt: 'Just now',
      description: newIncidentForm.description.trim() || 'User reported anomalous endpoint behavior requiring autonomous triage.',
      aiDiagnosis: 'AGT-01 & AGT-04 initial telemetry scan completed. Linked to endpoint profile and continuous compliance posture.',
      recommendedResolution: 'Inspect endpoint health and apply recommended remediation package.',
      timeline: [
        { time: 'Just now', actor: newIncidentForm.requester.trim(), type: 'user', text: 'Created incident via Pr AiiA Console.' },
        { time: 'Just now', actor: 'AGT-01', type: 'ai', text: 'Auto-correlated with endpoint telemetry.' }
      ]
    };
    setAppState((prev) => ({
      ...prev,
      incidents: [created, ...prev.incidents],
      auditLog: [
        {
          id: `AUD-${Date.now().toString().slice(-3)}`,
          time: 'Just now',
          actor: prev.currentUserRole,
          action: `Created ITSM Incident ${newId} linked to ${ep.id}.`,
          status: 'Logged'
        },
        ...prev.auditLog
      ]
    }));
    setShowCreateIncidentModal(false);
    setNewIncidentForm({ title: '', requester: '', requesterEmail: '', priority: 'P2 - High', deviceId: 'END-FIN-094', description: '' });
    setSelectedIncidentId(newId);
    setActiveScreen('incident-detail');
    notify(`Incident ${newId} created and triaged by AGT-01.`, 'success');
  };

  // Add Evidence Handler with validation
  const handleAddEvidenceSubmit = (e) => {
    e.preventDefault();
    if (!newEvidenceForm.title.trim()) {
      setEvidenceFormError('Validation Error: Please enter a descriptive Evidence Artifact Title.');
      return;
    }
    setEvidenceFormError('');
    const evdId = `EVD-2026-${Math.floor(7742 + Math.random() * 200)}`;
    const artifact = {
      id: evdId,
      title: newEvidenceForm.title.trim(),
      collector: newEvidenceForm.collector,
      date: '2026-05-14 (Verified)',
      status: 'Verified',
      hash: `sha256:${Math.random().toString(16).substring(2, 10)}...99a1`
    };
    setAppState((prev) => ({
      ...prev,
      grcControls: prev.grcControls.map((c) =>
        c.id === newEvidenceForm.controlId
          ? {
              ...c,
              status: 'Compliant (Verified)',
              lastAssessed: 'Just now',
              evidenceRecords: [artifact, ...c.evidenceRecords]
            }
          : c
      ),
      auditLog: [
        {
          id: `AUD-${Date.now().toString().slice(-3)}`,
          time: 'Just now',
          actor: prev.currentUserRole,
          action: `Uploaded and signed compliance artifact ${evdId} for NIST Control ${newEvidenceForm.controlId}.`,
          status: 'Attested'
        },
        ...prev.auditLog
      ]
    }));
    setShowEvidenceModal(false);
    setNewEvidenceForm({ controlId: 'SI-2', title: '', collector: 'AGT-06 (Evidence Collector Agent - SHA256 Attested)', notes: '' });
    notify(`Evidence record ${evdId} cryptographically signed and attached to ${newEvidenceForm.controlId}.`, 'success');
  };

  // Context-Aware Copilot Prompt Handler
  const handleSendCopilot = (promptText = '') => {
    const query = promptText || copilotInput;
    if (!query.trim()) return;
    const userMsg = { sender: 'user', time: 'Just now', text: query };
    const fw = appState.firewallRequests.find((f) => f.id === 'FW-REQ-9921');
    const rem = appState.remediations.find((r) => r.id === 'REM-2026-309');
    const ctrl = appState.grcControls.find((c) => c.id === 'SI-2');
    let replyText = '';
    const qLower = query.toLowerCase();

    if (qLower.includes('8842') || qLower.includes('elena') || qLower.includes('incident')) {
      replyText = `[Context: ${activeScreen.toUpperCase()}] Incident INC-2026-8842 affects Elena Rostova's laptop (END-FIN-094). Root cause is CVE-2026-4109 (XNU Kernel Zero-Day). Patch Remediation Agent (AGT-03) staged hotfix REM-2026-309 (Current status: ${rem?.executionStatus}, Approval: ${fw?.approvalStatus}).`;
    } else if (qLower.includes('approve') || qLower.includes('firewall') || qLower.includes('9921')) {
      handleApproveAction('FW-REQ-9921');
      replyText = `I have executed your CISO sign-off on FW-REQ-9921. Agent AGT-03 is now authorized to deploy hotfix REM-2026-309 on END-FIN-094.`;
    } else if (qLower.includes('execute') || qLower.includes('deploy') || qLower.includes('309')) {
      if (fw?.approvalStatus !== 'Approved') {
        handleApproveAction('FW-REQ-9921');
      }
      handleExecuteRemediation('REM-2026-309');
      replyText = `Simulated deployment of PKG-MACOS-15.3.2-SEC1-HOTFIX (REM-2026-309) is now complete on END-FIN-094. Ask me to "Verify & Attest GRC" to close NIST SI-2 and POAM-2026-112.`;
    } else if (qLower.includes('verify') || qLower.includes('attest') || qLower.includes('7741')) {
      handleVerifyAndAttest('REM-2026-309');
      replyText = `Verification complete! Evidence EVD-2026-7741 has been cryptographically bound to NIST Control SI-2, POAM-2026-112 is closed, and INC-2026-8842 is marked Resolved.`;
    } else if (qLower.includes('grc') || qLower.includes('si-2') || qLower.includes('nist')) {
      replyText = `NIST 800-53 Control SI-2 (Flaw Remediation) is currently "${ctrl?.status}" with ${ctrl?.evidenceRecords.length} verified evidence artifact(s) attached. Linked POA&M: POAM-2026-112.`;
    } else {
      replyText = `Live Pr AiiA Synthesis (Screen: ${activeScreen}): ${metrics.openIncidents} active incident(s), ${metrics.criticalVulns} critical CVE(s), ${metrics.pendingApprovals} pending AI Firewall approval(s), and ${metrics.complianceScore}% continuous GRC score.`;
    }
    setCopilotMessages((prev) => [...prev, userMsg, { sender: 'ai', time: 'Just now', text: replyText }]);
    setCopilotInput('');
  };

  // Golden Thread Steps Bar Definition with Explicit Stage States: COMPLETED | ACTIVE | PENDING | FAILED
  const goldenThreadSteps = useMemo(() => {
    const fw = appState.firewallRequests.find((f) => f.id === 'FW-REQ-9921');
    const rem = appState.remediations.find((r) => r.id === 'REM-2026-309');
    const ep = appState.endpoints.find((e) => e.id === 'END-FIN-094');

    const isRejected = fw?.approvalStatus === 'Rejected' || rem?.approvalStatus === 'Rejected';
    const isApproved = fw?.approvalStatus === 'Approved';
    const isDeployed = rem?.executionStatus === 'Deployed' || rem?.executionStatus === 'Verified';
    const isVerified = rem?.executionStatus === 'Verified';
    const isIsolated = ep?.securityPosture?.includes('Isolated');

    return [
      {
        step: 1,
        label: '1. ITSM Ticket',
        sub: 'INC-2026-8842',
        screen: 'incident-detail',
        id: 'INC-2026-8842',
        state: 'COMPLETED',
        meta: isVerified ? 'Resolved' : 'P1 Triaged'
      },
      {
        step: 2,
        label: '2. Affected Device',
        sub: 'END-FIN-094',
        screen: 'endpoint-detail',
        id: 'END-FIN-094',
        state: isIsolated ? 'FAILED' : 'COMPLETED',
        meta: isIsolated ? 'Isolated' : `${ep?.healthScore || 42}/100 Health`
      },
      {
        step: 3,
        label: '3. Security Exposure',
        sub: 'CVE-2026-4109',
        screen: 'exposure',
        id: 'CVE-2026-4109',
        state: 'COMPLETED',
        meta: isVerified ? '0 Exposed' : 'CVSS 9.6 KEV'
      },
      {
        step: 4,
        label: '4. AI Firewall Auth',
        sub: 'FW-REQ-9921',
        screen: 'ai-firewall',
        id: 'FW-REQ-9921',
        state: isRejected ? 'FAILED' : isApproved ? 'COMPLETED' : 'ACTIVE',
        meta: isRejected ? 'Rejected' : isApproved ? 'Token Issued' : 'Awaiting Sign-Off'
      },
      {
        step: 5,
        label: '5. Remediation & Verify',
        sub: 'REM-2026-309',
        screen: 'remediation',
        id: 'REM-2026-309',
        state: isRejected
          ? 'FAILED'
          : isVerified
          ? 'COMPLETED'
          : isApproved || isDeployed
          ? 'ACTIVE'
          : 'PENDING',
        meta: isRejected
          ? 'Halted'
          : isVerified
          ? '100% Verified'
          : isDeployed
          ? '85% Deployed'
          : 'Staged (15%)'
      },
      {
        step: 6,
        label: '6. GRC Evidence & POA&M',
        sub: 'SI-2 / EVD-7741',
        screen: 'grc-evidence',
        id: 'SI-2',
        state: isVerified ? 'COMPLETED' : isDeployed ? 'ACTIVE' : 'PENDING',
        meta: isVerified ? 'SI-2 Compliant' : 'Gap Open'
      }
    ];
  }, [appState]);

  // Navigation structure for Sidebar
  const navStructure = {
    platform: [
      { id: 'itsm', label: 'IT Service Management', icon: MessageSquare, badge: metrics.openIncidents },
      { id: 'aiops', label: 'IT Operations & Self-Healing', icon: Activity },
      { id: 'endpoints', label: 'Autonomous Endpoint Mgmt', icon: Laptop },
      { id: 'exposure', label: 'Exposure Mgmt & SecOps', icon: ShieldAlert, badge: metrics.criticalVulns > 0 ? metrics.criticalVulns : null, badgeColor: 'bg-red-500/20 text-red-300' },
      { id: 'remediation', label: 'Remediation & Approvals', icon: Zap },
      { id: 'assets', label: 'Asset & Spend Management', icon: HardDrive },
      { id: 'supply-chain', label: 'Supply Chain (SCM)', icon: Truck, badge: 'Live SCM', badgeColor: 'bg-indigo-500/20 text-indigo-300' },
      { id: 'crm', label: 'CRM & Customer Pipeline', icon: Users, badge: 'Live Pipeline', badgeColor: 'bg-blue-500/20 text-blue-300' },
      { id: 'zero-trust', label: 'Secure Access (Zero Trust)', icon: Key },
      { id: 'esm', label: 'Enterprise & Customer Service', icon: Briefcase },
      { id: 'portfolio', label: 'Portfolio Management', icon: Layers },
      { id: 'build-extend', label: 'Build & Extend (Low-Code)', icon: GitBranch }
    ],
    grc: [
      { id: 'grc-evidence', label: 'Evidence & Control Library', icon: FileCheck, badge: `${metrics.complianceScore}%`, badgeColor: 'bg-emerald-500/20 text-emerald-300' },
      { id: 'fed-nist', label: 'Federal Auth & NIST (RMF)', icon: Award },
      { id: 'policy-reg', label: 'Compliance, Policy & Reg Change', icon: BookOpen },
      { id: 'risk-mgmt', label: 'Enterprise Risk Management', icon: AlertTriangle },
      { id: 'third-party', label: 'Third-Party, Audit & Resilience', icon: Globe },
      { id: 'ethics', label: 'Ethics, Conduct & Training', icon: Users },
      { id: 'privacy', label: 'Privacy & Regulated Data', icon: Lock },
      { id: 'ai-gov', label: 'AI Governance & EU AI Act', icon: Cpu },
      { id: 'grc-reporting', label: 'GRC Assistant & Reporting', icon: BarChart3 }
    ],
    aiWorkforce: [
      { id: 'ai-workforce', label: 'AI Workforce Directory', icon: Sparkles, badge: '8 Agents' },
      { id: 'ai-firewall', label: 'AI Action Firewall', icon: Shield, badge: metrics.pendingApprovals > 0 ? `${metrics.pendingApprovals} Req` : 'Clear', badgeColor: metrics.pendingApprovals > 0 ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300' }
    ]
  };

  return (
    <div className="flex h-screen w-full bg-slate-50 text-slate-900 font-sans overflow-hidden select-none">
      {/* ====================================================================
          LEFT SIDEBAR NAVIGATION (#0F172A Deep Navy)
      ==================================================================== */}
      <aside className="w-68 bg-[#0F172A] text-slate-300 flex flex-col border-r border-slate-800 shrink-0">
        {/* Brand Header */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-slate-800/80 bg-[#0B1120]">
          <button
            onClick={() => setActiveScreen('command-center')}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-inner shadow-blue-400/30 group-hover:bg-blue-500 transition">
              Pr
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-white tracking-tight text-base">Pr AiiA</span>
                <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 font-semibold border border-blue-500/30">
                  Enterprise
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-none mt-0.5">Autonomous IT, SecOps & GRC</p>
            </div>
          </button>
        </div>

        {/* Scrollable Navigation List */}
        <div className="flex-1 overflow-y-auto py-3 px-2.5 space-y-4 custom-scrollbar">
          {/* Command Center */}
          <div>
            <button
              onClick={() => setActiveScreen('command-center')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition ${
                activeScreen === 'command-center'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Compass className="w-4 h-4 shrink-0" />
                <span>Command Center</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-white">Live</span>
            </button>
          </div>

          {/* PRODUCT A: Pr AiiA PLATFORM */}
          <div>
            <button
              onClick={() => toggleSection('platform')}
              className="w-full flex items-center justify-between px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-blue-400 hover:text-blue-300"
            >
              <span>Pr AiiA Platform</span>
              {expandedSections.platform ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            </button>
            {expandedSections.platform && (
              <div className="mt-1 space-y-0.5">
                {navStructure.platform.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    activeScreen === item.id ||
                    (item.id === 'itsm' && activeScreen === 'incident-detail') ||
                    (item.id === 'endpoints' && activeScreen === 'endpoint-detail') ||
                    (item.id === 'supply-chain' && activeScreen === 'supply-chain-detail') ||
                    (item.id === 'crm' && activeScreen === 'crm-detail');
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveScreen(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs transition ${
                        isActive
                          ? 'bg-slate-800 text-white font-medium border-l-2 border-blue-500'
                          : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
                        <span className="truncate">{item.label}</span>
                      </div>
                      {item.badge !== undefined && item.badge !== null && (
                        <span
                          className={`text-[10px] px-1.5 py-0.2 rounded-full font-medium ${
                            item.badgeColor || 'bg-slate-700 text-slate-200'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* PRODUCT B: Pr AiiA GRC */}
          <div>
            <button
              onClick={() => toggleSection('grc')}
              className="w-full flex items-center justify-between px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-emerald-400 hover:text-emerald-300"
            >
              <span>Pr AiiA GRC</span>
              {expandedSections.grc ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            </button>
            {expandedSections.grc && (
              <div className="mt-1 space-y-0.5">
                {navStructure.grc.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeScreen === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveScreen(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs transition ${
                        isActive
                          ? 'bg-slate-800 text-white font-medium border-l-2 border-emerald-500'
                          : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                        <span className="truncate">{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-medium ${item.badgeColor}`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* AI WORKFORCE & FIREWALL */}
          <div>
            <button
              onClick={() => toggleSection('aiWorkforce')}
              className="w-full flex items-center justify-between px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-purple-400 hover:text-purple-300"
            >
              <span>AI Workforce & Control</span>
              {expandedSections.aiWorkforce ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            </button>
            {expandedSections.aiWorkforce && (
              <div className="mt-1 space-y-0.5">
                {navStructure.aiWorkforce.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeScreen === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveScreen(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs transition ${
                        isActive
                          ? 'bg-slate-800 text-white font-medium border-l-2 border-purple-500'
                          : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-purple-400' : 'text-slate-400'}`} />
                        <span className="truncate">{item.label}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={`text-[10px] px-1.5 py-0.2 rounded-full font-medium ${
                            item.badgeColor || 'bg-purple-500/20 text-purple-300'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* SYSTEM & ANALYTICS */}
          <div className="pt-2 border-t border-slate-800/80 space-y-0.5">
            <button
              onClick={() => setActiveScreen('reports')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-xs transition ${
                activeScreen === 'reports' ? 'bg-slate-800 text-white font-medium' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Reports & Executive Analytics</span>
            </button>
            <button
              onClick={() => setActiveScreen('administration')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-xs transition ${
                activeScreen === 'administration' ? 'bg-slate-800 text-white font-medium' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Administration & Guardrails</span>
            </button>
            <button
              onClick={() => setActiveScreen('settings')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-xs transition ${
                activeScreen === 'settings' ? 'bg-slate-800 text-white font-medium' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Platform Settings</span>
            </button>
          </div>
        </div>

        {/* Sidebar Footer Status */}
        <div className="p-3 border-t border-slate-800 bg-[#0B1120] text-[11px] text-slate-400 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Neural Mesh v4.18 Online</span>
          </div>
          <button
            onClick={handleResetDemo}
            title="Reset demo state to beginning of scenario"
            className="text-slate-400 hover:text-white underline text-[11px]"
          >
            Reset Demo
          </button>
        </div>
      </aside>

      {/* ====================================================================
          MAIN APPLICATION SHELL (TOPBAR + GOLDEN THREAD + WORKSPACE)
      ==================================================================== */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navigation Header */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0 z-20">
          {/* Global Search */}
          <div className="relative w-96">
            <div className="flex items-center bg-slate-100 border border-slate-200 rounded-lg px-3 py-1.5 focus-within:border-blue-500 focus-within:bg-white transition">
              <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
              <input
                type="text"
                value={globalSearch}
                onFocus={() => setShowSearchDropdown(true)}
                onChange={(e) => {
                  setGlobalSearch(e.target.value);
                  setShowSearchDropdown(true);
                }}
                placeholder="Search INC-2026-8842, END-FIN-094, CVE-2026-4109, SI-2..."
                className="bg-transparent text-xs text-slate-800 placeholder-slate-400 focus:outline-none w-full"
              />
              {globalSearch && (
                <button onClick={() => setGlobalSearch('')} className="text-slate-400 hover:text-slate-600">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Instant Cross-Entity Search Dropdown */}
            {showSearchDropdown && globalSearch.trim() !== '' && (
              <div className="absolute left-0 right-0 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50 max-h-80 overflow-y-auto">
                <div className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400 flex justify-between">
                  <span>Cross-Platform Entities</span>
                  <button onClick={() => setShowSearchDropdown(false)} className="text-slate-400 hover:text-slate-600">Close</button>
                </div>
                {searchResults.length === 0 ? (
                  <div className="px-3 py-4 text-xs text-slate-500 text-center">No matching records found.</div>
                ) : (
                  searchResults.map((res) => (
                    <button
                      key={`${res.type}-${res.id}`}
                      onClick={() => navigateToRecord(res.screen, res.id)}
                      className="w-full px-3 py-2 text-left hover:bg-slate-50 flex items-center justify-between text-xs border-b border-slate-100 last:border-none"
                    >
                      <div className="truncate pr-2">
                        <span className="font-semibold text-blue-600 mr-2">{res.id}</span>
                        <span className="text-slate-700">{res.label}</span>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 shrink-0">{res.type}</span>
                    </button>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-3">
            {/* Organization Selector */}
            <div className="hidden md:flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700">
              <Globe className="w-3.5 h-3.5 text-blue-600" />
              <select
                value={appState.organization}
                onChange={(e) => {
                  setAppState((prev) => ({ ...prev, organization: e.target.value }));
                  notify(`Switched tenant context to ${e.target.value}`, 'info');
                }}
                className="bg-transparent font-medium focus:outline-none cursor-pointer"
              >
                <option value="Apex Global Financial — Prod">Apex Global Financial — Prod</option>
                <option value="Apex Federal Enclave (FedRAMP High)">Apex Federal Enclave (FedRAMP High)</option>
                <option value="Apex EU Sovereign Cloud (Frankfurt)">Apex EU Sovereign Cloud (Frankfurt)</option>
              </select>
            </div>

            {/* Toggle Golden Thread Bar */}
            <button
              onClick={() => setShowGoldenThreadBar((v) => !v)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition ${
                showGoldenThreadBar
                  ? 'bg-blue-50 border-blue-200 text-blue-700'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-blue-600" />
              <span className="hidden lg:inline">Golden Thread Flow</span>
            </button>

            {/* AI Copilot Button */}
            <button
              onClick={() => setShowCopilot((v) => !v)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 text-white hover:bg-slate-800 flex items-center gap-1.5 shadow-sm transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Pr AiiA Copilot</span>
            </button>

            {/* Notifications Button */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications((v) => !v)}
                className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 relative"
              >
                <Bell className="w-4 h-4" />
                {unreadNotifications.some((n) => !n.read) && (
                  <span className="w-2 h-2 rounded-full bg-red-500 absolute top-1.5 right-1.5" />
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-84 bg-white border border-slate-200 rounded-xl shadow-xl z-50 p-3 space-y-2">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-xs font-semibold text-slate-800">Enterprise Alert Stream</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setUnreadNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
                          notify('All notifications marked as read.', 'info');
                        }}
                        className="text-[11px] text-blue-600 hover:underline"
                      >
                        Mark all read
                      </button>
                      <button onClick={() => setShowNotifications(false)} className="text-xs text-slate-400 hover:text-slate-600">
                        Close
                      </button>
                    </div>
                  </div>
                  {unreadNotifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => {
                        setUnreadNotifications((prev) => prev.map((item) => (item.id === n.id ? { ...item, read: true } : item)));
                        setShowNotifications(false);
                        navigateToRecord(n.screen, n.recordId);
                      }}
                      className={`p-2.5 rounded-lg border cursor-pointer transition ${
                        n.tone === 'amber'
                          ? 'bg-amber-50 border-amber-200 hover:bg-amber-100/70'
                          : n.tone === 'red'
                          ? 'bg-red-50 border-red-200 hover:bg-red-100/70'
                          : 'bg-emerald-50 border-emerald-200 hover:bg-emerald-100/70'
                      } ${n.read ? 'opacity-65' : ''}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-semibold text-slate-900">{n.title}</span>
                        {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
                      </div>
                      <p className="text-[11px] text-slate-700 mt-0.5">{n.desc}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Help Button */}
            <button
              onClick={() => setShowHelpModal(true)}
              className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
              title="Architecture & Guide"
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            {/* User Profile & Role Switcher */}
            <div className="relative">
              <button
                onClick={() => setShowRoleMenu((v) => !v)}
                className="flex items-center gap-2 pl-2 pr-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 text-left"
              >
                <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-semibold">
                  MV
                </div>
                <div className="hidden xl:block">
                  <div className="text-xs font-semibold text-slate-800 leading-none">Marcus Vance</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{appState.currentUserRole}</div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {showRoleMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-xl z-50 p-2 space-y-1">
                  <div className="px-2 py-1 text-[10px] font-semibold uppercase text-slate-400">Switch Executive Role View</div>
                  {[
                    'CISO & VP Enterprise Operations',
                    'VP of IT Service & Infrastructure',
                    'Director of Federal GRC & Audit',
                    'Principal SecOps Architect'
                  ].map((role) => (
                    <button
                      key={role}
                      onClick={() => {
                        setAppState((prev) => ({ ...prev, currentUserRole: role }));
                        setShowRoleMenu(false);
                        notify(`Active governance persona switched to: ${role}`, 'info');
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between ${
                        appState.currentUserRole === role ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>{role}</span>
                      {appState.currentUserRole === role && <Check className="w-3.5 h-3.5 text-blue-600" />}
                    </button>
                  ))}
                  <div className="border-t border-slate-100 pt-1 mt-1">
                    <button
                      onClick={() => {
                        setShowRoleMenu(false);
                        handleResetDemo();
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-red-600 hover:bg-red-50 flex items-center gap-1.5"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Reset Prototype Demo State</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* ==================================================================
            INTERACTIVE GOLDEN THREAD WALKTHROUGH BAR
        ================================================================== */}
        {showGoldenThreadBar && (
          <div className="bg-slate-900 text-white px-6 py-2.5 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2 shrink-0">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-blue-500/20 border border-blue-400/30 text-blue-300 text-[10px] font-semibold uppercase tracking-wider">
                Connected Golden Thread
              </span>
              <div className="hidden 2xl:flex items-center gap-2 text-[10px] text-slate-400">
                <span className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400" />Completed</span>
                <span className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />Active</span>
                <span className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-slate-500" />Pending</span>
                <span className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-500" />Failed/Halted</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
              {goldenThreadSteps.map((st, idx) => {
                const isCurrentScreen = activeScreen === st.screen;
                const badgeTone =
                  st.state === 'COMPLETED'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : st.state === 'ACTIVE'
                    ? 'bg-blue-500/25 text-blue-200 border-blue-400/50'
                    : st.state === 'FAILED'
                    ? 'bg-rose-500/25 text-rose-200 border-rose-400/50'
                    : 'bg-slate-700/70 text-slate-400 border-slate-600';

                return (
                  <React.Fragment key={st.step}>
                    <button
                      onClick={() => navigateToRecord(st.screen, st.id)}
                      className={`px-2.5 py-1.5 rounded-lg text-left transition flex items-center gap-2 border ${
                        isCurrentScreen
                          ? 'bg-blue-600/30 border-blue-400 text-white ring-1 ring-blue-400/50 shadow-sm'
                          : st.state === 'FAILED'
                          ? 'bg-rose-950/60 border-rose-500/60 text-rose-100 hover:bg-rose-900/50'
                          : st.state === 'ACTIVE'
                          ? 'bg-slate-800 border-blue-400/60 text-white hover:bg-slate-800/80'
                          : st.state === 'COMPLETED'
                          ? 'bg-slate-800/90 border-emerald-500/40 text-slate-200 hover:bg-slate-800'
                          : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <div>
                        <div className="text-[11px] font-semibold leading-none flex items-center gap-1.5">
                          <span>{st.label}</span>
                          {st.state === 'COMPLETED' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                          {st.state === 'ACTIVE' && <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse shrink-0" />}
                          {st.state === 'PENDING' && <Clock className="w-3 h-3 text-slate-400 shrink-0" />}
                          {st.state === 'FAILED' && <AlertOctagon className="w-3.5 h-3.5 text-rose-400 shrink-0" />}
                        </div>
                        <div className="flex items-center gap-1.5 mt-1">
                          <span className="text-[10px] text-blue-200 font-mono">{st.sub}</span>
                          <span className={`text-[9px] px-1.5 py-0.2 rounded border font-semibold uppercase ${badgeTone}`}>
                            {st.state}
                          </span>
                        </div>
                      </div>
                    </button>
                    {idx < goldenThreadSteps.length - 1 && (
                      <ChevronRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    )}
                  </React.Fragment>
                );
              })}
              <button
                onClick={handleAdvanceGoldenThread}
                className="ml-2 px-3 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-semibold flex items-center gap-1 shrink-0 shadow-xs transition"
              >
                <Play className="w-3 h-3" />
                <span>Advance Next Step</span>
              </button>
            </div>
          </div>
        )}

        {/* Toast Banner */}
        {toast && (
          <div
            className={`px-6 py-2 text-xs font-medium flex items-center justify-between border-b shrink-0 ${
              toast.type === 'success'
                ? 'bg-emerald-600 text-white border-emerald-700'
                : toast.type === 'warning'
                ? 'bg-amber-500 text-slate-950 border-amber-600'
                : 'bg-blue-600 text-white border-blue-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>{toast.message}</span>
            </div>
            <button onClick={() => setToast(null)} className="opacity-80 hover:opacity-100">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ==================================================================
            MAIN SCROLLABLE CONTENT AREA
        ================================================================== */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeScreen === 'command-center' && (
            <CommandCenterScreen
              appState={appState}
              metrics={metrics}
              goldenThreadSteps={goldenThreadSteps}
              navigateToRecord={navigateToRecord}
              setActiveScreen={setActiveScreen}
              onApproveFirewall={() => handleApproveAction('FW-REQ-9921')}
              onRejectFirewall={() => handleRejectAction('FW-REQ-9921')}
              onReRequestFirewall={() => handleRequestApproval('REM-2026-309')}
              onExecuteRemediation={() => handleExecuteRemediation('REM-2026-309')}
              onVerifyRemediation={() => handleVerifyAndAttest('REM-2026-309')}
              onResetDemo={handleResetDemo}
              notify={notify}
            />
          )}

          {activeScreen === 'itsm' && (
            <ITSMScreen
              incidents={appState.incidents}
              onOpenIncident={(id) => navigateToRecord('incident-detail', id)}
              onOpenCreateModal={() => {
                setIncidentFormError('');
                setShowCreateIncidentModal(true);
              }}
            />
          )}

          {activeScreen === 'incident-detail' && (
            <IncidentDetailScreen
              incident={appState.incidents.find((i) => i.id === selectedIncidentId) || appState.incidents[0]}
              appState={appState}
              setAppState={setAppState}
              navigateToRecord={navigateToRecord}
              setActiveScreen={setActiveScreen}
              notify={notify}
              requestConfirmation={requestConfirmation}
            />
          )}

          {activeScreen === 'endpoints' && (
            <EndpointManagementScreen
              endpoints={appState.endpoints}
              onSelectEndpoint={(id) => navigateToRecord('endpoint-detail', id)}
              setAppState={setAppState}
              notify={notify}
            />
          )}

          {activeScreen === 'endpoint-detail' && (
            <EndpointDetailScreen
              endpoint={appState.endpoints.find((e) => e.id === selectedEndpointId) || appState.endpoints[0]}
              appState={appState}
              setAppState={setAppState}
              navigateToRecord={navigateToRecord}
              setActiveScreen={setActiveScreen}
              onTriggerRemediation={() => navigateToRecord('remediation', 'REM-2026-309')}
              notify={notify}
              requestConfirmation={requestConfirmation}
            />
          )}

          {activeScreen === 'exposure' && (
            <ExposureManagementScreen
              vulnerabilities={appState.vulnerabilities}
              selectedCveId={selectedCveId}
              setSelectedCveId={setSelectedCveId}
              navigateToRecord={navigateToRecord}
              setAppState={setAppState}
              notify={notify}
            />
          )}

          {activeScreen === 'remediation' && (
            <RemediationScreen
              remediations={appState.remediations}
              selectedRemediationId={selectedRemediationId}
              setSelectedRemediationId={setSelectedRemediationId}
              onRequestApproval={handleRequestApproval}
              onApprove={() => handleApproveAction('FW-REQ-9921')}
              onReject={() => handleRejectAction('FW-REQ-9921')}
              onExecute={() => handleExecuteRemediation('REM-2026-309')}
              onVerify={() => handleVerifyAndAttest('REM-2026-309')}
              navigateToRecord={navigateToRecord}
              setAppState={setAppState}
              notify={notify}
            />
          )}

          {activeScreen === 'grc-evidence' && (
            <GRCEvidenceScreen
              controls={appState.grcControls}
              poamItems={appState.poamItems}
              auditLog={appState.auditLog}
              selectedControlId={selectedControlId}
              setSelectedControlId={setSelectedControlId}
              onOpenUploadModal={(ctrlId) => {
                setEvidenceFormError('');
                setNewEvidenceForm((prev) => ({ ...prev, controlId: ctrlId }));
                setShowEvidenceModal(true);
              }}
              navigateToRecord={navigateToRecord}
              setAppState={setAppState}
              notify={notify}
            />
          )}

          {activeScreen === 'ai-workforce' && (
            <AIWorkforceScreen
              agents={appState.aiAgents}
              selectedAgentId={selectedAgentId}
              setSelectedAgentId={setSelectedAgentId}
              setAppState={setAppState}
              notify={notify}
              navigateToRecord={navigateToRecord}
            />
          )}

          
          {activeScreen === 'supply-chain' && (
            <SupplyChainScreen
              plans={appState.supplyChainPlans || []}
              agents={appState.supplyChainAgents || []}
              onOpenPlan={(id) => navigateToRecord('supply-chain-detail', id)}
              navigateToRecord={navigateToRecord}
              setAppState={setAppState}
              notify={notify}
              requestConfirmation={requestConfirmation}
            />
          )}

          {activeScreen === 'supply-chain-detail' && (
            <SupplyChainDetailScreen
              plan={(appState.supplyChainPlans || []).find((p) => p.id === selectedSupplyChainId) || (appState.supplyChainPlans || [])[0]}
              plans={appState.supplyChainPlans || []}
              agents={appState.supplyChainAgents || []}
              onBack={() => setActiveScreen('supply-chain')}
              navigateToRecord={navigateToRecord}
              setAppState={setAppState}
              notify={notify}
              requestConfirmation={requestConfirmation}
            />
          )}

          {activeScreen === 'crm' && (
            <CRMScreen
              records={appState.crmRecords || []}
              agents={appState.crmAgents || []}
              onOpenRecord={(id) => navigateToRecord('crm-detail', id)}
              navigateToRecord={navigateToRecord}
              setAppState={setAppState}
              notify={notify}
              requestConfirmation={requestConfirmation}
            />
          )}

          {activeScreen === 'crm-detail' && (
            <CRMDetailScreen
              record={(appState.crmRecords || []).find((r) => r.id === selectedCrmId) || (appState.crmRecords || [])[0]}
              records={appState.crmRecords || []}
              agents={appState.crmAgents || []}
              onBack={() => setActiveScreen('crm')}
              navigateToRecord={navigateToRecord}
              setAppState={setAppState}
              notify={notify}
              requestConfirmation={requestConfirmation}
            />
          )}

          {activeScreen === 'ai-firewall' && (
            <AIFirewallScreen
              requests={appState.firewallRequests}
              auditLog={appState.auditLog}
              selectedFirewallId={selectedFirewallId}
              setSelectedFirewallId={setSelectedFirewallId}
              onApprove={handleApproveAction}
              onReject={handleRejectAction}
              navigateToRecord={navigateToRecord}
            />
          )}

          {/* Connected Domain Views for Remaining Platform & GRC Modules */}
          {[
            'aiops', 'assets', 'zero-trust', 'esm', 'portfolio', 'build-extend',
            'fed-nist', 'policy-reg', 'risk-mgmt', 'third-party', 'ethics', 'privacy',
            'ai-gov', 'grc-reporting', 'reports', 'administration', 'settings'
          ].includes(activeScreen) && (
            <ConnectedModuleScreen
              moduleKey={activeScreen}
              appState={appState}
              setAppState={setAppState}
              navigateToRecord={navigateToRecord}
              notify={notify}
              requestConfirmation={requestConfirmation}
              onResetDemo={handleResetDemo}
            />
          )}
        </main>
      </div>

      {/* ====================================================================
          SLIDE-OVER AI COPILOT DRAWER
      ==================================================================== */}
      {showCopilot && (
        <div className="w-96 bg-white border-l border-slate-200 flex flex-col shadow-2xl z-30 shrink-0">
          <div className="h-16 px-4 bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <div>
                <div className="text-xs font-semibold">Pr AiiA Neural Copilot</div>
                <div className="text-[10px] text-slate-400">Context: {activeScreen.toUpperCase()} • Governed</div>
              </div>
            </div>
            <button onClick={() => setShowCopilot(false)} className="text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-3 bg-slate-50 border-b border-slate-200 space-y-1.5">
            <div className="text-[10px] font-semibold uppercase text-slate-500">Contextual Action Prompts</div>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => handleSendCopilot('Summarize P1 Incident INC-2026-8842 & blast radius')}
                className="text-[11px] bg-white border border-slate-200 hover:border-blue-400 text-slate-700 px-2 py-1 rounded-md transition"
              >
                Summarize INC-2026-8842
              </button>
              <button
                onClick={() => handleSendCopilot('Approve AI Firewall FW-REQ-9921 now')}
                className="text-[11px] bg-amber-50 border border-amber-200 hover:bg-amber-100 text-amber-800 px-2 py-1 rounded-md font-medium transition"
              >
                1. Approve FW-REQ-9921
              </button>
              <button
                onClick={() => handleSendCopilot('Execute remediation REM-2026-309 on END-FIN-094')}
                className="text-[11px] bg-blue-50 border border-blue-200 hover:bg-blue-100 text-blue-700 px-2 py-1 rounded-md font-medium transition"
              >
                2. Execute REM-2026-309
              </button>
              <button
                onClick={() => handleSendCopilot('Verify & Attest GRC Evidence EVD-2026-7741')}
                className="text-[11px] bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 text-emerald-700 px-2 py-1 rounded-md font-medium transition"
              >
                3. Verify & Attest SI-2
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {copilotMessages.map((m, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl text-xs leading-relaxed ${
                  m.sender === 'ai'
                    ? 'bg-slate-100 text-slate-800 border border-slate-200'
                    : 'bg-blue-600 text-white ml-6'
                }`}
              >
                <div className="text-[10px] opacity-70 mb-1 font-medium">
                  {m.sender === 'ai' ? 'Pr AiiA Copilot' : 'You'} • {m.time}
                </div>
                <div>{m.text}</div>
              </div>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendCopilot();
            }}
            className="p-3 border-t border-slate-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={copilotInput}
              onChange={(e) => setCopilotInput(e.target.value)}
              placeholder="Ask Copilot across ITSM, SecOps, or GRC..."
              className="flex-1 text-xs border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}

      {/* ====================================================================
          MODAL: CREATE INCIDENT
      ==================================================================== */}
      {showCreateIncidentModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <h3 className="text-sm font-semibold">Create New ITSM Incident</h3>
              <button onClick={() => setShowCreateIncidentModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleCreateIncidentSubmit} noValidate className="p-6 space-y-4 text-xs">
              {incidentFormError && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 font-medium">
                  {incidentFormError}
                </div>
              )}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Incident Summary / Title *</label>
                <input
                  type="text"
                  value={newIncidentForm.title}
                  onChange={(e) => setNewIncidentForm({ ...newIncidentForm, title: e.target.value })}
                  placeholder="e.g., Suspicious Kernel Process & Telemetry Alert on Workstation"
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-600"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Requester Name *</label>
                  <input
                    type="text"
                    value={newIncidentForm.requester}
                    onChange={(e) => setNewIncidentForm({ ...newIncidentForm, requester: e.target.value })}
                    placeholder="Elena Rostova"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Requester Email</label>
                  <input
                    type="email"
                    value={newIncidentForm.requesterEmail}
                    onChange={(e) => setNewIncidentForm({ ...newIncidentForm, requesterEmail: e.target.value })}
                    placeholder="elena.rostova@apexglobal.io"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Priority</label>
                  <select
                    value={newIncidentForm.priority}
                    onChange={(e) => setNewIncidentForm({ ...newIncidentForm, priority: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 bg-white"
                  >
                    <option>P1 - Critical</option>
                    <option>P2 - High</option>
                    <option>P3 - Medium</option>
                    <option>P4 - Low</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Affected Endpoint</label>
                  <select
                    value={newIncidentForm.deviceId}
                    onChange={(e) => setNewIncidentForm({ ...newIncidentForm, deviceId: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 bg-white"
                  >
                    {appState.endpoints.map((ep) => (
                      <option key={ep.id} value={ep.id}>
                        {ep.id} ({ep.name})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Detailed Symptoms / Telemetry Context</label>
                <textarea
                  rows={3}
                  value={newIncidentForm.description}
                  onChange={(e) => setNewIncidentForm({ ...newIncidentForm, description: e.target.value })}
                  placeholder="Describe symptoms..."
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-600"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowCreateIncidentModal(false)}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700"
                >
                  Create & Auto-Triage with AI
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ====================================================================
          MODAL: UPLOAD / SIMULATE GRC EVIDENCE
      ==================================================================== */}
      {showEvidenceModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xl max-w-md w-full overflow-hidden">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <h3 className="text-sm font-semibold">Attach Compliance Evidence Artifact</h3>
              <button onClick={() => setShowEvidenceModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleAddEvidenceSubmit} noValidate className="p-6 space-y-4 text-xs">
              {evidenceFormError && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 font-medium">
                  {evidenceFormError}
                </div>
              )}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Target NIST / GRC Control</label>
                <select
                  value={newEvidenceForm.controlId}
                  onChange={(e) => setNewEvidenceForm({ ...newEvidenceForm, controlId: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 bg-white"
                >
                  {appState.grcControls.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.id} — {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Evidence Artifact Title *</label>
                <input
                  type="text"
                  value={newEvidenceForm.title}
                  onChange={(e) => setNewEvidenceForm({ ...newEvidenceForm, title: e.target.value })}
                  placeholder="e.g., Post-Remediation Kernel Attestation Bundle"
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-600"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Collection Method</label>
                <select
                  value={newEvidenceForm.collector}
                  onChange={(e) => setNewEvidenceForm({ ...newEvidenceForm, collector: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 bg-white"
                >
                  <option>AGT-06 (Evidence Collector Agent - SHA256 Attested)</option>
                  <option>Manual GRC Auditor Upload</option>
                  <option>Continuous FedRAMP Telemetry Connector</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowEvidenceModal(false)}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700"
                >
                  Sign & Bind Evidence
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ====================================================================
          REUSABLE CONFIRMATION DIALOG FOR SENSITIVE ENTERPRISE ACTIONS
      ==================================================================== */}
      {confirmDialog && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xl max-w-md w-full overflow-hidden">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-semibold">{confirmDialog.title}</h3>
              </div>
              <button onClick={() => setConfirmDialog(null)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 space-y-4 text-xs text-slate-700">
              <p className="leading-relaxed">{confirmDialog.message}</p>
              {confirmDialog.requireReason && (
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Governance Audit Justification / Reason</label>
                  <input
                    type="text"
                    value={confirmReason}
                    onChange={(e) => setConfirmReason(e.target.value)}
                    placeholder="Enter reason for immutable audit log..."
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-600"
                  />
                </div>
              )}
              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  onClick={() => setConfirmDialog(null)}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    const cb = confirmDialog.onConfirm;
                    const r = confirmReason;
                    setConfirmDialog(null);
                    if (cb) cb(r);
                  }}
                  className={`px-4 py-2 rounded-lg text-white font-semibold ${
                    confirmDialog.tone === 'danger'
                      ? 'bg-red-600 hover:bg-red-700'
                      : 'bg-amber-600 hover:bg-amber-700'
                  }`}
                >
                  {confirmDialog.confirmLabel}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          MODAL: HELP & EXECUTIVE WALKTHROUGH GUIDE
      ==================================================================== */}
      {showHelpModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xl max-w-xl w-full overflow-hidden">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-blue-400" />
                <h3 className="text-sm font-semibold">Pr AiiA Executive Stakeholder Guide</h3>
              </div>
              <button onClick={() => setShowHelpModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 space-y-3 text-xs text-slate-700 leading-relaxed">
              <p className="font-semibold text-slate-900">
                How to demonstrate the connected Pr AiiA Platform + GRC Golden Thread:
              </p>
              <ol className="list-decimal pl-5 space-y-1.5">
                <li>
                  <strong>ITSM Ticket (`INC-2026-8842`):</strong> Inspect Elena Rostova’s P1 workstation incident and AI diagnosis.
                </li>
                <li>
                  <strong>Affected Device (`END-FIN-094`):</strong> Click the linked MacBook Pro to view its degraded ring-0 sensor and missing kernel patch.
                </li>
                <li>
                  <strong>Security Exposure (`CVE-2026-4109`):</strong> Review the CVSS 9.6 XNU Kernel Zero-Day and affected Finance fleet.
                </li>
                <li>
                  <strong>AI Action Firewall (`FW-REQ-9921`):</strong> See how `AGT-03` is governed by Policy `POL-AI-04` and click <strong>Approve</strong> to issue a cryptographic execution token.
                </li>
                <li>
                  <strong>Remediation & Verification (`REM-2026-309`):</strong> Click <strong>Execute Remediation</strong> and then <strong>Verify & Attest GRC</strong>.
                </li>
                <li>
                  <strong>Continuous GRC (`SI-2` & `EVD-2026-7741`):</strong> Observe how NIST 800-53 Control `SI-2` automatically receives cryptographic evidence `EVD-2026-7741` and closes `POAM-2026-112`.
                </li>
              </ol>
              <div className="pt-3 flex justify-end">
                <button
                  onClick={() => setShowHelpModal(false)}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700"
                >
                  Got It
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
// SCREEN 1: COMMAND CENTER DASHBOARD
// ============================================================================

function CommandCenterScreen({
  appState,
  metrics,
  goldenThreadSteps,
  navigateToRecord,
  setActiveScreen,
  onApproveFirewall,
  onRejectFirewall,
  onReRequestFirewall,
  onExecuteRemediation,
  onVerifyRemediation,
  onResetDemo,
  notify
}) {
  const mainRem = appState.remediations.find((r) => r.id === 'REM-2026-309');
  const mainFw = appState.firewallRequests.find((f) => f.id === 'FW-REQ-9921');
  const mainEp = appState.endpoints.find((e) => e.id === 'END-FIN-094');
  const mainCtrl = appState.grcControls.find((c) => c.id === 'SI-2');
  const mainPoam = appState.poamItems.find((p) => p.id === 'POAM-2026-112');

  const [timelineFilter, setTimelineFilter] = useState('ALL'); // 'ALL' | 'HUMAN OPERATOR' | 'AUTONOMOUS AGENT' | 'AI FIREWALL'
  const [timelineSearch, setTimelineSearch] = useState('');
  const [showEvidenceJsonModal, setShowEvidenceJsonModal] = useState(false);

  const isRejected = mainFw?.approvalStatus === 'Rejected' || mainRem?.approvalStatus === 'Rejected';
  const isApproved = mainFw?.approvalStatus === 'Approved';
  const isDeployed = mainRem?.executionStatus === 'Deployed' || mainRem?.executionStatus === 'Verified';
  const isVerified = mainRem?.executionStatus === 'Verified';

  const filteredTimeline = (appState.executiveTimeline || []).filter((evt) => {
    const matchesActor = timelineFilter === 'ALL' || evt.actorType === timelineFilter;
    const q = timelineSearch.trim().toLowerCase();
    const matchesQuery =
      !q ||
      evt.title.toLowerCase().includes(q) ||
      evt.detail.toLowerCase().includes(q) ||
      evt.actor.toLowerCase().includes(q) ||
      evt.entityId.toLowerCase().includes(q);
    return matchesActor && matchesQuery;
  });

  // Verification telemetry assertions for REM-2026-309 on END-FIN-094
  const verificationChecks = [
    {
      check: 'Codec & Image Library Heap Boundary (libwebp)',
      prePatch: 'libwebp 1.3.1 (Heap Overflow Vulnerable)',
      postPatch: isDeployed ? 'libwebp 1.3.2-p4 (Bounds Enforced)' : 'Staged: libwebp 1.3.2-p4',
      status: isVerified ? 'VERIFIED' : isDeployed ? 'DEPLOYED' : isRejected ? 'FAILED' : 'PENDING'
    },
    {
      check: 'macOS XNU Kernel Mach IPC Voucher Table',
      prePatch: '15.3.1-xnu-11215 (CVE-2026-4109 Exposed)',
      postPatch: isDeployed ? '15.3.2-sec1 (Ring-0 Kext Patched)' : 'Staged: 15.3.2-sec1',
      status: isVerified ? 'VERIFIED' : isDeployed ? 'DEPLOYED' : isRejected ? 'FAILED' : 'PENDING'
    },
    {
      check: 'Kernel Symbol Table & Heap Canary Integrity',
      prePatch: 'Ring-0 Syscall Trap Anomaly Detected',
      postPatch: isVerified ? '0 Violations • Canaries Intact' : isDeployed ? 'Scanning Symbols...' : 'Awaiting Patch',
      status: isVerified ? 'VERIFIED' : isDeployed ? 'DEPLOYED' : isRejected ? 'FAILED' : 'PENDING'
    },
    {
      check: 'Pr-Sensor EDR Daemon Heartbeat Latency',
      prePatch: 'Degraded / Telemetry Drop (Timeout)',
      postPatch: isDeployed ? '11 ms P99 Heartbeat (100% Healthy)' : 'Awaiting Daemon Restart',
      status: isVerified ? 'VERIFIED' : isDeployed ? 'DEPLOYED' : isRejected ? 'FAILED' : 'PENDING'
    },
    {
      check: 'Synthetic Treasury Settlement Smoke Test',
      prePatch: 'Blocked by Sandbox Escape Guard',
      postPatch: isVerified ? '5/5 Assertions Passed (0 Downtime)' : isDeployed ? 'Ready for Verification' : 'Pending Execution',
      status: isVerified ? 'VERIFIED' : isDeployed ? 'DEPLOYED' : isRejected ? 'FAILED' : 'PENDING'
    }
  ];

  const attestationJsonPayload = `{
  "evidence_id": "EVD-2026-7741",
  "framework_mappings": [
    "NIST-SP-800-53-Rev5:SI-2 (Flaw Remediation)",
    "NIST-SP-800-53-Rev5:CM-3 (Configuration Change Control)",
    "FedRAMP-High:POAM-2026-112"
  ],
  "incident_ref": "INC-2026-8842",
  "endpoint_ref": "END-FIN-094 (APEX-MBP16-094)",
  "vulnerability_remediated": "CVE-2026-4109 (CVSS 9.6)",
  "ai_firewall_authorization": {
    "request_id": "FW-REQ-9921",
    "policy_evaluated": "POL-AI-004: Zero-Touch Tier-1 Restriction",
    "approval_status": "${mainFw?.approvalStatus || 'Pending'}",
    "approver": "Marcus Vance (${appState.currentUserRole})"
  },
  "verification_telemetry": {
    "xnu_kernel_version": "${isDeployed ? '15.3.2-sec1' : '15.3.1-xnu-11215'}",
    "libwebp_version": "${isDeployed ? '1.3.2-p4' : '1.3.1'}",
    "heap_canary_check": "${isVerified ? 'PASSED' : 'PENDING'}",
    "sensor_heartbeat_ms": ${isDeployed ? 11 : 480},
    "smoke_assertions_passed": "${isVerified ? '5/5' : '0/5'}"
  },
  "control_posture_transition": "${isVerified ? 'Non-Compliant -> Compliant (Verified)' : 'Gap Identified (Action Required)'}",
  "sha256_artifact_hash": "e901f44b82c19d004a12994f7a8b3c10",
  "continuous_monitoring_timestamp": "${isVerified ? '2026-11-04 08:21:14 UTC' : 'AWAITING_VERIFICATION'}"
}`;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs text-slate-500 font-medium">Pr AiiA Enterprise • Unified Command Center</div>
          <h1 className="text-xl font-bold text-slate-900 mt-0.5">Executive Operations, SecOps & Continuous GRC Posture</h1>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] px-2.5 py-1 rounded-md bg-slate-200/80 text-slate-700 font-mono">
            Simulated Enterprise Demo Environment
          </span>
          <button
            onClick={() => navigateToRecord('incident-detail', 'INC-2026-8842')}
            className="px-3.5 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 flex items-center gap-1.5 shadow-xs"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Inspect Live P1 Golden Thread (INC-2026-8842)</span>
          </button>
        </div>
      </div>

      {/* 5 Interactive Executive KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div
          onClick={() => setActiveScreen('itsm')}
          className="bg-white p-4 rounded-xl border border-slate-200 hover:border-blue-500 cursor-pointer transition shadow-2xs group"
        >
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Open IT Incidents</span>
            <MessageSquare className="w-4 h-4 text-blue-600 group-hover:scale-110 transition" />
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2">{metrics.openIncidents}</div>
          <div className="text-[11px] text-slate-500 mt-1 flex items-center justify-between">
            <span>{isVerified ? 'P1 Auto-Resolved' : '1 Critical P1 Active'}</span>
            <span className="text-blue-600 font-medium">Open ITSM →</span>
          </div>
        </div>

        <div
          onClick={() => setActiveScreen('endpoints')}
          className="bg-white p-4 rounded-xl border border-slate-200 hover:border-blue-500 cursor-pointer transition shadow-2xs group"
        >
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Managed Endpoints</span>
            <Laptop className="w-4 h-4 text-indigo-600 group-hover:scale-110 transition" />
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2">{metrics.managedEndpoints.toLocaleString()}</div>
          <div className="text-[11px] text-slate-500 mt-1 flex items-center justify-between">
            <span>END-FIN-094: {mainEp?.healthScore}/100</span>
            <span className="text-blue-600 font-medium">Inventory →</span>
          </div>
        </div>

        <div
          onClick={() => setActiveScreen('exposure')}
          className="bg-white p-4 rounded-xl border border-slate-200 hover:border-red-400 cursor-pointer transition shadow-2xs group"
        >
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Critical Vulnerabilities</span>
            <ShieldAlert className="w-4 h-4 text-red-600 group-hover:scale-110 transition" />
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2">{metrics.criticalVulns}</div>
          <div className="text-[11px] text-slate-500 mt-1 flex items-center justify-between">
            <span>{metrics.criticalVulns > 0 ? 'CVE-2026-4109 (KEV)' : 'Zero Active KEVs'}</span>
            <span className="text-red-600 font-medium">SecOps →</span>
          </div>
        </div>

        <div
          onClick={() => setActiveScreen('ai-firewall')}
          className="bg-white p-4 rounded-xl border border-slate-200 hover:border-amber-400 cursor-pointer transition shadow-2xs group"
        >
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Pending AI Approvals</span>
            <Shield className="w-4 h-4 text-amber-600 group-hover:scale-110 transition" />
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2">{metrics.pendingApprovals}</div>
          <div className="text-[11px] text-slate-500 mt-1 flex items-center justify-between">
            <span>FW-REQ-9921: {mainFw?.approvalStatus}</span>
            <span className="text-amber-600 font-medium">Review →</span>
          </div>
        </div>

        <div
          onClick={() => setActiveScreen('grc-evidence')}
          className="bg-white p-4 rounded-xl border border-slate-200 hover:border-emerald-500 cursor-pointer transition shadow-2xs group"
        >
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Continuous GRC Score</span>
            <FileCheck className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition" />
          </div>
          <div className="text-2xl font-bold text-emerald-700 mt-2">{metrics.complianceScore}%</div>
          <div className="text-[11px] text-slate-500 mt-1 flex items-center justify-between">
            <span>SI-2: {isVerified ? 'Compliant' : 'Gap Open'}</span>
            <span className="text-emerald-600 font-medium">Controls →</span>
          </div>
        </div>
      </div>

      {/* ====================================================================
          EXECUTIVE GOLDEN THREAD VISUAL STAGE PIPELINE & ORCHESTRATOR
      ==================================================================== */}
      <div className="bg-white rounded-xl border border-blue-200 shadow-xs overflow-hidden">
        <div className="px-5 py-3.5 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-semibold">
              Executive Golden Thread Pipeline: IT Ticket → Affected Device → Exposure → AI Firewall → Remediation → GRC Evidence
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`text-[11px] px-2.5 py-0.5 rounded-full font-semibold border ${
                isRejected
                  ? 'bg-rose-500/20 text-rose-300 border-rose-400/40'
                  : isVerified
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40'
                  : 'bg-blue-500/20 text-blue-300 border-blue-400/30'
              }`}
            >
              Pipeline Status: {isRejected ? 'HALTED / REJECTED AT FIREWALL' : `${mainRem?.progress}% (${mainRem?.executionStatus})`}
            </span>
          </div>
        </div>

        {/* 6 Visual Stage Cards Communicating COMPLETED, ACTIVE, PENDING, FAILED */}
        <div className="p-5 bg-slate-50/70 border-b border-slate-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
            {goldenThreadSteps.map((st) => {
              const isCompleted = st.state === 'COMPLETED';
              const isActive = st.state === 'ACTIVE';
              const isFailed = st.state === 'FAILED';

              return (
                <div
                  key={st.step}
                  onClick={() => navigateToRecord(st.screen, st.id)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition flex flex-col justify-between ${
                    isFailed
                      ? 'bg-rose-50/90 border-rose-300 hover:border-rose-500 ring-1 ring-rose-400/30'
                      : isActive
                      ? 'bg-blue-50/90 border-blue-400 hover:border-blue-600 ring-2 ring-blue-500/20 shadow-xs'
                      : isCompleted
                      ? 'bg-white border-emerald-300 hover:border-emerald-500'
                      : 'bg-white/80 border-slate-200 hover:border-slate-400 opacity-85'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-1">
                      <span
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border inline-flex items-center gap-1 ${
                          isFailed
                            ? 'bg-rose-100 text-rose-800 border-rose-300'
                            : isActive
                            ? 'bg-blue-100 text-blue-800 border-blue-300'
                            : isCompleted
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                            : 'bg-slate-100 text-slate-600 border-slate-300'
                        }`}
                      >
                        {isCompleted && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                        {isActive && <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />}
                        {isFailed && <AlertOctagon className="w-3 h-3 text-rose-600" />}
                        {st.state === 'PENDING' && <Clock className="w-3 h-3 text-slate-500" />}
                        <span>{st.state}</span>
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">Stage {st.step}/6</span>
                    </div>
                    <div className="text-xs font-bold text-slate-900 mt-2">{st.label.replace(/^\d+\.\s*/, '')}</div>
                    <div className="text-[11px] font-mono font-semibold text-blue-600 mt-0.5">{st.sub}</div>
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-slate-200/70 flex items-center justify-between text-[11px]">
                    <span className="font-medium text-slate-600">{st.meta}</span>
                    <span className="text-blue-600 font-semibold">Inspect →</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Executive Interactive Controls & Exception Recovery Bar */}
        <div className="p-5 grid grid-cols-1 lg:grid-cols-3 gap-5 items-center">
          <div className="lg:col-span-2 space-y-2">
            <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
              <span>Live Scenario Summary:</span>
              <span className="font-mono text-blue-600">INC-2026-8842</span>
              <span>→</span>
              <span className="font-mono text-indigo-600">END-FIN-094</span>
              <span>→</span>
              <span className="font-mono text-red-600">CVE-2026-4109</span>
              <span>→</span>
              <span className="font-mono text-amber-600">FW-REQ-9921</span>
              <span>→</span>
              <span className="font-mono text-emerald-600">EVD-2026-7741</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Dr. Elena Rostova’s Finance workstation (<strong className="font-mono">APEX-MBP16-094</strong>) experienced a ring-0 syscall trap caused by{' '}
              <strong>CVE-2026-4109</strong> (XNU Kernel + <code className="font-mono">libwebp 1.3.1</code>). Agent <strong>AGT-03</strong> staged zero-downtime hotfix{' '}
              <strong>REM-2026-309</strong>, intercepted by <strong>Agent Supervisor AGT-08</strong> under Policy <strong className="font-mono">POL-AI-004</strong>.
            </p>
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  isRejected ? 'bg-rose-600' : isVerified ? 'bg-emerald-600' : 'bg-blue-600'
                }`}
                style={{ width: `${isRejected ? 45 : mainRem?.progress || 15}%` }}
              />
            </div>
          </div>

          {/* Direct Executive Demo Action Controls (Happy Path + Exception Path) */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
                Executive Demo Controls
              </span>
              <button
                onClick={onResetDemo}
                className="text-[11px] text-blue-600 hover:underline font-medium"
              >
                Reset Flow
              </button>
            </div>

            {mainFw?.approvalStatus === 'Pending' && (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={onApproveFirewall}
                  className="py-2 px-3 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold text-xs flex items-center justify-center gap-1.5 transition shadow-2xs"
                >
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>1. Approve FW-9921</span>
                </button>
                <button
                  onClick={onRejectFirewall}
                  className="py-2 px-3 rounded-lg border border-rose-300 bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold text-xs flex items-center justify-center gap-1 transition"
                >
                  <X className="w-3.5 h-3.5 shrink-0" />
                  <span>Simulate Reject</span>
                </button>
              </div>
            )}

            {isRejected && (
              <div className="space-y-2">
                <div className="p-2 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-[11px] font-medium">
                  Exception Active: FW-REQ-9921 rejected. Autonomous execution halted by AI Firewall.
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={onReRequestFirewall}
                    className="py-2 px-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs"
                  >
                    Re-Queue Request
                  </button>
                  <button
                    onClick={onApproveFirewall}
                    className="py-2 px-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs"
                  >
                    Override & Approve
                  </button>
                </div>
              </div>
            )}

            {isApproved && mainRem?.executionStatus === 'Staged' && (
              <button
                onClick={onExecuteRemediation}
                className="w-full py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition"
              >
                <Play className="w-4 h-4" />
                <span>2. Execute Kernel Hotfix (REM-2026-309)</span>
              </button>
            )}

            {mainRem?.executionStatus === 'Deployed' && (
              <button
                onClick={onVerifyRemediation}
                className="w-full py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>3. Verify & Attest GRC Evidence (SI-2)</span>
              </button>
            )}

            {isVerified && (
              <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-medium flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>All 6 Golden Thread Stages Verified!</span>
                </div>
                <button
                  onClick={() => setShowEvidenceJsonModal(true)}
                  className="text-[11px] font-bold text-emerald-700 underline shrink-0"
                >
                  View JSON
                </button>
              </div>
            )}

            <button
              onClick={() => navigateToRecord('remediation', 'REM-2026-309')}
              className="w-full py-1.5 px-3 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium"
            >
              Open Full Remediation & Approval Console →
            </button>
          </div>
        </div>
      </div>

      {/* ====================================================================
          EXECUTIVE DEEP-DIVE ROW 1:
          LEFT: CHRONOLOGICAL ACTIVITY & TELEMETRY TIMELINE (USERS + AI AGENTS)
          RIGHT: APPROVAL HISTORY & AUTHORIZATION DECISIONS LEDGER
      ==================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Detailed Activity Timeline (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 shadow-2xs flex flex-col overflow-hidden">
          <div className="px-5 py-3.5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Activity className="w-4 h-4 text-blue-600" />
                <span>Detailed Golden Thread Activity & Telemetry Timeline</span>
              </h2>
              <p className="text-[11px] text-slate-500">
                Chronological audit stream of human operators, autonomous AI agents, and AI Firewall decisions with UTC timestamps
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              {['ALL', 'HUMAN OPERATOR', 'AUTONOMOUS AGENT', 'AI FIREWALL'].map((flt) => (
                <button
                  key={flt}
                  onClick={() => setTimelineFilter(flt)}
                  className={`px-2 py-1 rounded text-[10px] font-semibold transition ${
                    timelineFilter === flt
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {flt === 'ALL' ? 'All Actors' : flt}
                </button>
              ))}
            </div>
          </div>

          <div className="px-5 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-2">
            <div className="flex items-center bg-white border border-slate-200 rounded-lg px-2.5 py-1 flex-1">
              <Search className="w-3.5 h-3.5 text-slate-400 mr-1.5" />
              <input
                type="text"
                value={timelineSearch}
                onChange={(e) => setTimelineSearch(e.target.value)}
                placeholder="Search timeline by actor, timestamp, CVE-2026-4109, FW-REQ-9921, EVD-2026-7741..."
                className="bg-transparent text-xs focus:outline-none w-full"
              />
            </div>
            <span className="text-[11px] text-slate-500 font-medium shrink-0">
              {filteredTimeline.length} Events Logged
            </span>
          </div>

          <div className="p-5 space-y-3 max-h-96 overflow-y-auto divide-y divide-slate-100">
            {filteredTimeline.map((evt) => {
              const actorBadge =
                evt.actorType === 'HUMAN OPERATOR'
                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                  : evt.actorType === 'AI FIREWALL'
                  ? 'bg-amber-50 text-amber-800 border-amber-200'
                  : 'bg-purple-50 text-purple-700 border-purple-200';

              const stateBadge =
                evt.status === 'FAILED'
                  ? 'bg-rose-100 text-rose-800 border-rose-300'
                  : evt.status === 'ACTIVE'
                  ? 'bg-blue-100 text-blue-800 border-blue-300'
                  : 'bg-emerald-50 text-emerald-700 border-emerald-200';

              return (
                <div key={evt.id} className="pt-3 first:pt-0 flex items-start justify-between gap-3 text-xs">
                  <div className="space-y-1 flex-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="font-mono text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {evt.timestamp}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${actorBadge}`}>
                        {evt.actorType}
                      </span>
                      <span className="font-bold text-slate-900">{evt.actor}</span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded border ${stateBadge}`}>
                        {evt.status}
                      </span>
                    </div>
                    <div className="font-semibold text-slate-900">{evt.title}</div>
                    <p className="text-slate-600 leading-relaxed">{evt.detail}</p>
                  </div>
                  <button
                    onClick={() => navigateToRecord(evt.targetScreen, evt.entityId)}
                    className="px-2.5 py-1 rounded-md border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-300 font-mono text-[11px] font-semibold text-blue-600 shrink-0"
                  >
                    {evt.entityId} →
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Approval History & Authorization Decisions Panel (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 shadow-2xs flex flex-col overflow-hidden">
          <div className="px-5 py-3.5 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Shield className="w-4 h-4 text-amber-600" />
                <span>Approval History & Authorization Ledger</span>
              </h2>
              <p className="text-[11px] text-slate-500">
                Constitutional AI Action Firewall policy checks & human sign-offs
              </p>
            </div>
            <button
              onClick={() => navigateToRecord('ai-firewall', 'FW-REQ-9921')}
              className="text-xs text-blue-600 hover:underline font-semibold"
            >
              Firewall Console →
            </button>
          </div>

          <div className="p-5 space-y-3 max-h-96 overflow-y-auto text-xs">
            {(appState.approvalHistory || []).map((dec) => {
              const isDecApproved = dec.decision === 'APPROVED';
              const isDecRejected = dec.decision === 'REJECTED';
              return (
                <div
                  key={dec.id}
                  className={`p-3.5 rounded-xl border space-y-2 ${
                    isDecRejected
                      ? 'bg-rose-50/60 border-rose-200'
                      : isDecApproved
                      ? 'bg-emerald-50/40 border-emerald-200'
                      : 'bg-amber-50/50 border-amber-200'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => navigateToRecord('ai-firewall', dec.requestId)}
                        className="font-mono font-bold text-blue-600 hover:underline"
                      >
                        {dec.requestId}
                      </button>
                      <span className="font-mono text-[10px] text-slate-500">{dec.timestamp}</span>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                        isDecRejected
                          ? 'bg-rose-100 text-rose-800 border-rose-300'
                          : isDecApproved
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : 'bg-amber-100 text-amber-900 border-amber-300'
                      }`}
                    >
                      {dec.decision}
                    </span>
                  </div>

                  <div className="text-[11px] font-semibold text-slate-800">{dec.policy}</div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] bg-white/80 p-2 rounded-lg border border-slate-200/70">
                    <div>
                      <span className="text-slate-400 block">Blast Radius:</span>
                      <span className="font-medium text-slate-800">{dec.blastRadius}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Dual-Control:</span>
                      <span className="font-medium text-slate-800">{dec.dualControl}</span>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-700">
                    <strong>Approver / Actor:</strong> {dec.approver}
                  </div>
                  <div className="text-[11px] text-slate-600 italic">"{dec.justification}"</div>

                  <div className="pt-1 flex items-center justify-between text-[10px] font-mono text-slate-500 border-t border-slate-200/60">
                    <span>HSM Sig: {dec.signatureHash}</span>
                    {dec.requestId === 'FW-REQ-9921' && dec.decision === 'PENDING' && (
                      <div className="flex items-center gap-1.5 font-sans">
                        <button
                          onClick={onApproveFirewall}
                          className="px-2 py-0.5 rounded bg-emerald-600 text-white font-semibold hover:bg-emerald-700"
                        >
                          Approve Now
                        </button>
                        <button
                          onClick={onRejectFirewall}
                          className="px-2 py-0.5 rounded bg-rose-600 text-white font-semibold hover:bg-rose-700"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ====================================================================
          EXECUTIVE DEEP-DIVE ROW 2:
          LEFT: REMEDIATION VERIFICATION RESULTS PANEL (REM-2026-309 on END-FIN-094)
          RIGHT: COMPLIANCE EVIDENCE & ATTESTATION ARTIFACT PREVIEW (EVD-2026-7741 / SI-2)
      ==================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Remediation Verification Results Panel (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden flex flex-col justify-between">
          <div>
            <div className="px-5 py-3.5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <CheckSquare className="w-4 h-4 text-blue-600" />
                  <span>Post-Deployment Remediation Verification Results (REM-2026-309)</span>
                </h2>
                <p className="text-[11px] text-slate-500">
                  Live pre-patch vs. post-patch telemetry assertions on <span className="font-mono font-semibold">END-FIN-094 (APEX-MBP16-094)</span>
                </p>
              </div>
              <button
                onClick={() => navigateToRecord('remediation', 'REM-2026-309')}
                className="text-xs text-blue-600 hover:underline font-semibold"
              >
                Open REM-2026-309 →
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-semibold uppercase text-slate-500">
                    <th className="py-2.5 px-4">Telemetry Assertion / Subsystem</th>
                    <th className="py-2.5 px-4">Pre-Patch Baseline</th>
                    <th className="py-2.5 px-4">Post-Patch State</th>
                    <th className="py-2.5 px-4">Result</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {verificationChecks.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-semibold text-slate-900">{row.check}</td>
                      <td className="py-3 px-4 font-mono text-[11px] text-rose-700">{row.prePatch}</td>
                      <td className="py-3 px-4 font-mono text-[11px] text-emerald-700 font-semibold">{row.postPatch}</td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                            row.status === 'VERIFIED'
                              ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                              : row.status === 'DEPLOYED'
                              ? 'bg-blue-100 text-blue-800 border-blue-300'
                              : row.status === 'FAILED'
                              ? 'bg-rose-100 text-rose-800 border-rose-300'
                              : 'bg-slate-100 text-slate-600 border-slate-300'
                          }`}
                        >
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="text-slate-600">
              Endpoint Health Score:{' '}
              <strong className={mainEp?.healthScore >= 90 ? 'text-emerald-700' : 'text-amber-700'}>
                {mainEp?.healthScore}/100 ({mainEp?.healthStatus})
              </strong>{' '}
              • Sensor: <strong>{mainEp?.edrStatus}</strong>
            </div>
            <div className="flex items-center gap-2">
              {!isDeployed && isApproved && (
                <button
                  onClick={onExecuteRemediation}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs"
                >
                  Deploy Hotfix Now
                </button>
              )}
              {isDeployed && !isVerified && (
                <button
                  onClick={onVerifyRemediation}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs"
                >
                  Run Verification & Attest GRC
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Compliance Evidence & Continuous GRC Attestation Card (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 shadow-2xs flex flex-col justify-between overflow-hidden">
          <div>
            <div className="px-5 py-3.5 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-emerald-600" />
                  <span>Generated Compliance Evidence & POA&M Closure</span>
                </h2>
                <p className="text-[11px] text-slate-500">
                  Autonomous cryptographic evidence binding by <span className="font-semibold">AGT-06</span>
                </p>
              </div>
              <button
                onClick={() => navigateToRecord('grc-evidence', 'SI-2')}
                className="text-xs text-emerald-700 hover:underline font-semibold"
              >
                Open GRC SI-2 →
              </button>
            </div>

            <div className="p-5 space-y-3.5 text-xs">
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-emerald-700 text-sm">EVD-2026-7741</span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                      isVerified
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                        : 'bg-amber-100 text-amber-800 border-amber-300'
                    }`}
                  >
                    {isVerified ? 'ATTESTED & BOUND TO SI-2' : 'STAGED — AWAITING VERIFICATION'}
                  </span>
                </div>
                <div className="font-semibold text-slate-900">
                  Cryptographic Post-Patch Attestation: END-FIN-094 & Finance Fleet (CVE-2026-4109 / REM-2026-309)
                </div>
                <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
                  <div>
                    <span className="text-slate-400 block">NIST 800-53 Rev 5 Control:</span>
                    <span className="font-semibold text-slate-800">SI-2 (Flaw Remediation)</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Control Status Transition:</span>
                    <span className={`font-bold ${isVerified ? 'text-emerald-700' : 'text-amber-700'}`}>
                      {isVerified ? 'Non-Compliant → Compliant' : 'Gap Identified (Open)'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Linked FedRAMP POA&M:</span>
                    <span className="font-mono font-semibold text-slate-800">
                      POAM-2026-112 ({mainPoam?.status?.split(' ')[0]})
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">SHA-256 Artifact Hash:</span>
                    <span className="font-mono text-slate-700">sha256:e901f44b...3c10</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-semibold text-slate-700">Machine-Readable OSCAL / JSON Attestation Preview:</span>
                  <button
                    onClick={() => setShowEvidenceJsonModal(true)}
                    className="text-[11px] text-blue-600 hover:underline font-semibold"
                  >
                    Expand Full JSON
                  </button>
                </div>
                <pre className="p-3 rounded-lg bg-slate-900 text-emerald-400 font-mono text-[10px] overflow-x-auto max-h-36">
                  {attestationJsonPayload}
                </pre>
              </div>
            </div>
          </div>

          <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
            <span className="text-slate-500">
              Collector: <strong>AGT-06 (Evidence Collector)</strong>
            </span>
            <button
              onClick={() => setShowEvidenceJsonModal(true)}
              className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 font-semibold text-xs"
            >
              Inspect Cryptographic Bundle
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Recent Incidents, Security Alerts, AI Workforce Activity, Compliance Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Incidents */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="px-5 py-3.5 border-b border-slate-200 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-800">Recent IT & Security Incidents</h2>
            <button onClick={() => setActiveScreen('itsm')} className="text-xs text-blue-600 hover:underline font-medium">
              View All Incidents →
            </button>
          </div>
          <div className="divide-y divide-slate-100">
            {appState.incidents.map((inc) => (
              <div
                key={inc.id}
                onClick={() => navigateToRecord('incident-detail', inc.id)}
                className="px-5 py-3 hover:bg-slate-50 cursor-pointer flex items-center justify-between gap-4 transition"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold text-blue-600">{inc.id}</span>
                    <PriorityBadge priority={inc.priority} />
                    <StatusBadge status={inc.status} />
                  </div>
                  <div className="text-xs font-medium text-slate-800 truncate mt-1">{inc.title}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Requester: {inc.requester} • Device: <span className="font-mono">{inc.deviceId}</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
              </div>
            ))}
          </div>
        </div>

        {/* AI Workforce Live Activity Stream */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="px-5 py-3.5 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <h2 className="text-sm font-semibold text-slate-800">Autonomous AI Workforce Telemetry</h2>
            </div>
            <button onClick={() => setActiveScreen('ai-workforce')} className="text-xs text-blue-600 hover:underline font-medium">
              Manage 8 Agents →
            </button>
          </div>
          <div className="divide-y divide-slate-100">
            {appState.aiAgents.slice(0, 5).map((ag) => (
              <div
                key={ag.id}
                onClick={() => navigateToRecord('ai-workforce', ag.id)}
                className="px-5 py-2.5 hover:bg-slate-50 cursor-pointer flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-900">{ag.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200 font-medium">
                      {ag.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 truncate mt-0.5">{ag.recentLog}</p>
                </div>
                <span className="text-[10px] text-slate-400 shrink-0">{ag.lastActivity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Exposure Management & Security Alerts */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="px-5 py-3.5 border-b border-slate-200 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-800">Critical Security Exposures & SecOps Alerts</h2>
            <button onClick={() => setActiveScreen('exposure')} className="text-xs text-blue-600 hover:underline font-medium">
              Open Exposure Mgmt →
            </button>
          </div>
          <div className="divide-y divide-slate-100">
            {appState.vulnerabilities.map((v) => (
              <div
                key={v.id}
                onClick={() => navigateToRecord('exposure', v.id)}
                className="px-5 py-3 hover:bg-slate-50 cursor-pointer flex items-center justify-between gap-4"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-red-600">{v.id}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-red-50 text-red-700 font-semibold border border-red-200">
                      CVSS {v.cvss} ({v.severity})
                    </span>
                    <StatusBadge status={v.status} />
                  </div>
                  <div className="text-xs font-medium text-slate-800 truncate mt-1">{v.name}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Affected Endpoints: {v.affectedCount} • Exploit Status: {v.exploitStatus}
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
              </div>
            ))}
          </div>
        </div>

        {/* Continuous GRC Framework Readiness */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="px-5 py-3.5 border-b border-slate-200 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-800">Pr AiiA GRC Continuous Authorization Status</h2>
            <button onClick={() => setActiveScreen('grc-evidence')} className="text-xs text-blue-600 hover:underline font-medium">
              Control Library →
            </button>
          </div>
          <div className="p-5 space-y-3">
            {[
              { name: 'NIST SP 800-53 Rev 5 (High Baseline)', score: metrics.complianceScore, controls: '318 / 324 Controls Verified' },
              { name: 'FedRAMP High Continuous ATO', score: metrics.complianceScore === 98 ? 99 : 91, controls: 'POA&M POAM-2026-112 Linked' },
              { name: 'SOC 2 Type II (Trust Services Criteria)', score: 97, controls: '100% Automated Evidence Collection' },
              { name: 'ISO/IEC 27001:2022 & ISO 42001 (AI)', score: 96, controls: 'AI Action Firewall Guardrails Attested' }
            ].map((fw) => (
              <div
                key={fw.name}
                onClick={() => setActiveScreen('grc-evidence')}
                className="p-3 rounded-lg border border-slate-200 hover:border-emerald-500 cursor-pointer transition"
              >
                <div className="flex items-center justify-between text-xs font-semibold text-slate-800">
                  <span>{fw.name}</span>
                  <span className="text-emerald-700">{fw.score}%</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full mt-1.5 overflow-hidden">
                  <div className="bg-emerald-600 h-full transition-all duration-500" style={{ width: `${fw.score}%` }} />
                </div>
                <div className="text-[11px] text-slate-500 mt-1">{fw.controls}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal: Full Compliance Evidence JSON Attestation Inspector */}
      {showEvidenceJsonModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xl max-w-2xl w-full overflow-hidden text-xs">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-semibold">
                  Cryptographic Compliance Evidence Artifact — EVD-2026-7741 (NIST 800-53 SI-2)
                </h3>
              </div>
              <button onClick={() => setShowEvidenceJsonModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-50 p-3 rounded-lg border border-slate-200">
                <div>
                  <div className="text-[11px] text-slate-500">SHA-256 Immutable Signature</div>
                  <div className="font-mono font-bold text-slate-900">
                    sha256:e901f44b82c19d004a12994f7a8b3c108842a19c
                  </div>
                </div>
                <StatusBadge status={isVerified ? 'Verified & Attested' : 'Staged Preview'} />
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-emerald-400 font-mono text-[11px] overflow-x-auto max-h-80 leading-relaxed">
                {attestationJsonPayload}
              </pre>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => {
                    notify('Copied OSCAL JSON attestation payload EVD-2026-7741 to clipboard.', 'success');
                  }}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold"
                >
                  Copy OSCAL JSON
                </button>
                <button
                  onClick={() => {
                    setShowEvidenceJsonModal(false);
                    navigateToRecord('grc-evidence', 'SI-2');
                  }}
                  className="px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 font-semibold"
                >
                  Open in GRC Evidence Library →
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
// SCREEN 2: IT SERVICE MANAGEMENT (ITSM) INCIDENT LIST
// ============================================================================

function ITSMScreen({ incidents, onOpenIncident, onOpenCreateModal }) {
  const [search, setSearch] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortField, setSortField] = useState('id');
  const [sortAsc, setSortAsc] = useState(false);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const filtered = incidents
    .filter((inc) => {
      const matchesSearch =
        inc.id.toLowerCase().includes(search.toLowerCase()) ||
        inc.title.toLowerCase().includes(search.toLowerCase()) ||
        inc.requester.toLowerCase().includes(search.toLowerCase()) ||
        inc.deviceId.toLowerCase().includes(search.toLowerCase());
      const matchesPriority = priorityFilter === 'All' || inc.priority === priorityFilter;
      const matchesStatus = statusFilter === 'All' || inc.status === statusFilter;
      return matchesSearch && matchesPriority && matchesStatus;
    })
    .sort((a, b) => {
      const valA = String(a[sortField] || '');
      const valB = String(b[sortField] || '');
      return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
    });

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs text-slate-500 font-medium">Pr AiiA Platform • IT Service Management (ITSM)</div>
          <h1 className="text-xl font-bold text-slate-900 mt-0.5">Autonomous Incident & Service Desk Console</h1>
        </div>
        <button
          onClick={onOpenCreateModal}
          className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Create Incident</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 mr-2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter by ID, title, requester, device..."
            className="bg-transparent text-xs focus:outline-none w-full"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-500 font-medium">Priority:</span>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="border border-slate-200 rounded-lg px-2.5 py-1.5 bg-white"
          >
            <option value="All">All Priorities</option>
            <option value="P1 - Critical">P1 - Critical</option>
            <option value="P2 - High">P2 - High</option>
            <option value="P3 - Medium">P3 - Medium</option>
            <option value="P4 - Low">P4 - Low</option>
          </select>

          <span className="text-slate-500 font-medium ml-2">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-slate-200 rounded-lg px-2.5 py-1.5 bg-white"
          >
            <option value="All">All Statuses</option>
            <option value="Investigating">Investigating</option>
            <option value="In Progress">In Progress</option>
            <option value="Open">Open</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>
      </div>

      {/* Incidents Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-semibold uppercase text-slate-500">
              <th onClick={() => handleSort('id')} className="py-3 px-4 cursor-pointer hover:text-slate-900">
                Incident ID {sortField === 'id' && (sortAsc ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('title')} className="py-3 px-4 cursor-pointer hover:text-slate-900">
                Summary {sortField === 'title' && (sortAsc ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('priority')} className="py-3 px-4 cursor-pointer hover:text-slate-900">
                Priority {sortField === 'priority' && (sortAsc ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('status')} className="py-3 px-4 cursor-pointer hover:text-slate-900">
                Status {sortField === 'status' && (sortAsc ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('requester')} className="py-3 px-4 cursor-pointer hover:text-slate-900">
                Requester {sortField === 'requester' && (sortAsc ? '↑' : '↓')}
              </th>
              <th className="py-3 px-4">Assigned Technician / Agent</th>
              <th className="py-3 px-4">Affected Device</th>
              <th className="py-3 px-4">Created</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {filtered.map((inc) => (
              <tr
                key={inc.id}
                onClick={() => onOpenIncident(inc.id)}
                className="hover:bg-blue-50/50 cursor-pointer transition"
              >
                <td className="py-3.5 px-4 font-mono font-semibold text-blue-600 whitespace-nowrap">{inc.id}</td>
                <td className="py-3.5 px-4 font-medium text-slate-900 max-w-xs truncate">{inc.title}</td>
                <td className="py-3.5 px-4 whitespace-nowrap">
                  <PriorityBadge priority={inc.priority} />
                </td>
                <td className="py-3.5 px-4 whitespace-nowrap">
                  <StatusBadge status={inc.status} />
                </td>
                <td className="py-3.5 px-4 whitespace-nowrap text-slate-700">{inc.requester}</td>
                <td className="py-3.5 px-4 whitespace-nowrap text-slate-700">{inc.assignedTo}</td>
                <td className="py-3.5 px-4 font-mono text-indigo-600 font-medium whitespace-nowrap">{inc.deviceId}</td>
                <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">{inc.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ============================================================================
// SCREEN 3: INCIDENT DETAILS
// ============================================================================

function IncidentDetailScreen({ incident, appState, setAppState, navigateToRecord, setActiveScreen, notify, requestConfirmation }) {
  const [commentText, setCommentText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [detailTab, setDetailTab] = useState('overview'); // 'overview' | 'timeline' | 'linked'
  const [editAssignee, setEditAssignee] = useState(incident.assignedTo);
  const [editStatus, setEditStatus] = useState(incident.status);
  const [editPriority, setEditPriority] = useState(incident.priority);

  useEffect(() => {
    setEditAssignee(incident.assignedTo);
    setEditStatus(incident.status);
    setEditPriority(incident.priority);
  }, [incident]);

  const handleSaveChanges = () => {
    setAppState((prev) => ({
      ...prev,
      incidents: prev.incidents.map((i) =>
        i.id === incident.id
          ? {
              ...i,
              assignedTo: editAssignee,
              status: editStatus,
              priority: editPriority,
              timeline: [
                ...i.timeline,
                {
                  time: 'Just now',
                  actor: prev.currentUserRole,
                  type: 'user',
                  text: `Updated Incident: Status=${editStatus}, Priority=${editPriority}, Assignee=${editAssignee}.`
                }
              ]
            }
          : i
      )
    }));
    setIsEditing(false);
    notify(`Saved updates to ${incident.id}.`, 'success');
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setAppState((prev) => ({
      ...prev,
      incidents: prev.incidents.map((i) =>
        i.id === incident.id
          ? {
              ...i,
              timeline: [
                ...i.timeline,
                { time: 'Just now', actor: prev.currentUserRole, type: 'user', text: commentText }
              ]
            }
          : i
      )
    }));
    setCommentText('');
    notify('Work note added to incident timeline.', 'info');
  };

  const handleResolveQuick = () => {
    setAppState((prev) => ({
      ...prev,
      incidents: prev.incidents.map((i) =>
        i.id === incident.id
          ? {
              ...i,
              status: 'Resolved',
              timeline: [
                ...i.timeline,
                { time: 'Just now', actor: prev.currentUserRole, type: 'user', text: 'Marked Incident as Resolved.' }
              ]
            }
          : i
      )
    }));
    notify(`Incident ${incident.id} marked as Resolved.`, 'success');
  };

  const handleDeleteIncident = () => {
    if (incident.id === 'INC-2026-8842') {
      notify('Governance Protection: Primary Golden Thread scenario incident INC-2026-8842 cannot be deleted.', 'warning');
      return;
    }
    requestConfirmation({
      title: `Delete Incident ${incident.id}`,
      message: `Are you sure you want to permanently remove ${incident.id} from the ITSM queue?`,
      confirmLabel: 'Delete Incident',
      tone: 'danger',
      onConfirm: () => {
        setAppState((prev) => ({
          ...prev,
          incidents: prev.incidents.filter((i) => i.id !== incident.id)
        }));
        setActiveScreen('itsm');
        notify(`Deleted incident ${incident.id}.`, 'info');
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb & Top Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveScreen('itsm')}
            className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>IT Service Management</span>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="font-mono font-semibold text-blue-600">{incident.id}</span>
            </div>
            <h1 className="text-lg font-bold text-slate-900 mt-0.5">{incident.title}</h1>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setIsEditing((v) => !v)}
            className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs font-medium text-slate-700 flex items-center gap-1.5"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isEditing ? 'Cancel Edit' : 'Edit / Assign'}</span>
          </button>
          <button
            onClick={handleResolveQuick}
            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Resolve Incident</span>
          </button>
          <button
            onClick={handleDeleteIncident}
            className="px-3 py-1.5 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-medium flex items-center gap-1"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete</span>
          </button>
          <button
            onClick={() => navigateToRecord('endpoint-detail', incident.deviceId)}
            className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5"
          >
            <Laptop className="w-3.5 h-3.5" />
            <span>Inspect Endpoint ({incident.deviceId}) →</span>
          </button>
        </div>
      </div>

      {/* Sub-navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-xs">
        {[
          { id: 'overview', label: 'Overview & AI Root-Cause Diagnosis' },
          { id: 'timeline', label: `Activity Timeline & Work Notes (${incident.timeline.length})` },
          { id: 'linked', label: 'Linked Exposure, Firewall & GRC Evidence' }
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setDetailTab(t.id)}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              detailTab === t.id ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Edit Drawer if active */}
      {isEditing && (
        <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4 flex flex-wrap items-end gap-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Assigned Technician / AI Agent</label>
            <select
              value={editAssignee}
              onChange={(e) => setEditAssignee(e.target.value)}
              className="border border-slate-300 rounded-lg px-3 py-1.5 bg-white"
            >
              <option>Marcus Vance (SecOps Lead)</option>
              <option>AGT-01 (L1 Service Desk Agent)</option>
              <option>AGT-02 (Self-Healing Agent)</option>
              <option>AGT-03 (Patch Remediation Agent)</option>
              <option>Sarah Jenkins (IT Ops Engineer)</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Priority</label>
            <select
              value={editPriority}
              onChange={(e) => setEditPriority(e.target.value)}
              className="border border-slate-300 rounded-lg px-3 py-1.5 bg-white"
            >
              <option>P1 - Critical</option>
              <option>P2 - High</option>
              <option>P3 - Medium</option>
              <option>P4 - Low</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Status</label>
            <select
              value={editStatus}
              onChange={(e) => setEditStatus(e.target.value)}
              className="border border-slate-300 rounded-lg px-3 py-1.5 bg-white"
            >
              <option>Investigating</option>
              <option>In Progress</option>
              <option>Open</option>
              <option>Resolved</option>
            </select>
          </div>
          <button
            onClick={handleSaveChanges}
            className="px-4 py-1.5 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      )}

      {/* Main 3-Column Detail Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Description, AI Diagnosis, Activity Timeline */}
        <div className="lg:col-span-2 space-y-6">
          {(detailTab === 'overview' || detailTab === 'linked') && (
            <>
              {/* Issue Description */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3">
                <h2 className="text-sm font-semibold text-slate-900">Reported Issue Description</h2>
                <p className="text-xs text-slate-700 leading-relaxed">{incident.description}</p>
              </div>

              {/* AI Diagnosis & Recommended Resolution */}
              <div className="bg-slate-900 text-white p-5 rounded-xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-blue-400" />
                    <h2 className="text-sm font-semibold">Pr AiiA Neural Root-Cause Diagnosis & Recommended Resolution</h2>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30">
                    AGT-04 Correlated
                  </span>
                </div>
                <div className="p-3.5 rounded-lg bg-slate-800/90 border border-slate-700 text-xs text-slate-200 leading-relaxed">
                  <div className="font-semibold text-blue-300 mb-1">Automated Root Cause Analysis:</div>
                  {incident.aiDiagnosis}
                </div>
                <div className="p-3.5 rounded-lg bg-blue-950/60 border border-blue-800/70 text-xs text-blue-100 leading-relaxed flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="font-semibold text-blue-300 mb-0.5">Recommended Autonomous Action:</div>
                    {incident.recommendedResolution}
                  </div>
                  <button
                    onClick={() => navigateToRecord('remediation', incident.remediationId)}
                    className="px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shrink-0"
                  >
                    Open {incident.remediationId} →
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Activity Timeline & Comment Input */}
          {(detailTab === 'overview' || detailTab === 'timeline') && (
            <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-4">
              <h2 className="text-sm font-semibold text-slate-900">Activity & AI Telemetry Timeline</h2>
              <div className="space-y-3">
                {incident.timeline.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 text-xs border-l-2 border-blue-500 pl-3 py-1">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-900">{item.actor}</span>
                        <span className="text-[10px] text-slate-400">{item.time}</span>
                      </div>
                      <p className="text-slate-600 mt-0.5">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleAddComment} className="pt-3 border-t border-slate-100 flex gap-2">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Add technician work note or audit comment..."
                  className="flex-1 text-xs border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-600"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800"
                >
                  Add Comment
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Right Column: Connected Records (Endpoint, Exposure, Firewall, GRC) */}
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3 text-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Incident Metadata</h3>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Priority</span>
              <PriorityBadge priority={incident.priority} />
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Status</span>
              <StatusBadge status={incident.status} />
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Requester</span>
              <span className="font-medium text-slate-800">{incident.requester}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Department</span>
              <span className="text-slate-700">{incident.requesterDept}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Assigned To</span>
              <span className="font-medium text-slate-800">{incident.assignedTo}</span>
            </div>
          </div>

          {/* Connected Golden Thread Entities */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3 text-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Connected Platform & GRC Records
            </h3>

            <div
              onClick={() => navigateToRecord('endpoint-detail', incident.deviceId)}
              className="p-3 rounded-lg border border-slate-200 hover:border-blue-500 cursor-pointer transition bg-slate-50/60"
            >
              <div className="text-[10px] font-semibold uppercase text-indigo-600">Linked Endpoint</div>
              <div className="font-semibold text-slate-900 mt-0.5">
                {incident.deviceId} ({incident.deviceName})
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">Click to inspect hardware & sensor telemetry →</div>
            </div>

            <div
              onClick={() => navigateToRecord('exposure', incident.cveId)}
              className="p-3 rounded-lg border border-slate-200 hover:border-red-500 cursor-pointer transition bg-slate-50/60"
            >
              <div className="text-[10px] font-semibold uppercase text-red-600">Related Security Exposure</div>
              <div className="font-semibold text-slate-900 mt-0.5">{incident.cveId} (CVSS 9.6 Critical)</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Click to view affected fleet & exploit status →</div>
            </div>

            <div
              onClick={() => navigateToRecord('ai-firewall', incident.firewallReqId)}
              className="p-3 rounded-lg border border-slate-200 hover:border-amber-500 cursor-pointer transition bg-slate-50/60"
            >
              <div className="text-[10px] font-semibold uppercase text-amber-600">AI Action Firewall Governance</div>
              <div className="font-semibold text-slate-900 mt-0.5">{incident.firewallReqId} (Policy POL-AI-04)</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Click to authorize kernel hotfix →</div>
            </div>

            <div
              onClick={() => navigateToRecord('grc-evidence', incident.controlId)}
              className="p-3 rounded-lg border border-slate-200 hover:border-emerald-500 cursor-pointer transition bg-slate-50/60"
            >
              <div className="text-[10px] font-semibold uppercase text-emerald-600">Related GRC Control & POA&M</div>
              <div className="font-semibold text-slate-900 mt-0.5">
                NIST 800-53 {incident.controlId} • {incident.poamId}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">Click to view compliance evidence & POA&M →</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// SCREEN 4: ENDPOINT MANAGEMENT & DEVICE PROFILE
// ============================================================================

function EndpointManagementScreen({ endpoints, onSelectEndpoint, setAppState, notify }) {
  const [search, setSearch] = useState('');
  const [healthFilter, setHealthFilter] = useState('All');
  const [selectedIds, setSelectedIds] = useState([]);
  const [sortBy, setSortBy] = useState('healthScore');
  const [sortAsc, setSortAsc] = useState(true);

  const toggleSort = (field) => {
    if (sortBy === field) setSortAsc(!sortAsc);
    else {
      setSortBy(field);
      setSortAsc(true);
    }
  };

  const filtered = endpoints
    .filter((ep) => {
      const mSearch =
        ep.name.toLowerCase().includes(search.toLowerCase()) ||
        ep.id.toLowerCase().includes(search.toLowerCase()) ||
        ep.owner.toLowerCase().includes(search.toLowerCase()) ||
        ep.os.toLowerCase().includes(search.toLowerCase());
      const mHealth = healthFilter === 'All' || ep.healthStatus === healthFilter;
      return mSearch && mHealth;
    })
    .sort((a, b) => {
      if (sortBy === 'healthScore') {
        return sortAsc ? a.healthScore - b.healthScore : b.healthScore - a.healthScore;
      }
      return sortAsc
        ? String(a[sortBy]).localeCompare(String(b[sortBy]))
        : String(b[sortBy]).localeCompare(String(a[sortBy]));
    });

  const toggleSelect = (id, e) => {
    e.stopPropagation();
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs text-slate-500 font-medium">Pr AiiA Platform • Autonomous Endpoint Management</div>
          <h1 className="text-xl font-bold text-slate-900 mt-0.5">Real-Time Fleet Inventory, Posture & Telemetry</h1>
        </div>
        <div className="flex items-center gap-2">
          {selectedIds.length > 0 && (
            <button
              onClick={() => {
                setAppState((prev) => ({
                  ...prev,
                  endpoints: prev.endpoints.map((e) =>
                    selectedIds.includes(e.id) ? { ...e, lastCheckIn: 'Just now (Policy Synced)' } : e
                  )
                }));
                notify(`Triggered live Pr-Sensor policy sync across ${selectedIds.length} selected endpoint(s).`, 'success');
                setSelectedIds([]);
              }}
              className="px-3.5 py-2 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700"
            >
              Sync Policy on Selected ({selectedIds.length})
            </button>
          )}
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 mr-2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search device name, ID, employee, OS..."
            className="bg-transparent text-xs focus:outline-none w-full"
          />
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500 font-medium">Device Health:</span>
          <select
            value={healthFilter}
            onChange={(e) => setHealthFilter(e.target.value)}
            className="border border-slate-200 rounded-lg px-2.5 py-1.5 bg-white"
          >
            <option value="All">All Health States</option>
            <option value="Critical">Critical</option>
            <option value="Warning">Warning</option>
            <option value="Healthy">Healthy</option>
          </select>
        </div>
      </div>

      {/* Endpoints Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-semibold uppercase text-slate-500">
              <th className="py-3 px-4 w-8">Select</th>
              <th onClick={() => toggleSort('id')} className="py-3 px-4 cursor-pointer hover:text-slate-900">
                Device ID & Name {sortBy === 'id' && (sortAsc ? '↑' : '↓')}
              </th>
              <th onClick={() => toggleSort('owner')} className="py-3 px-4 cursor-pointer hover:text-slate-900">
                Assigned Employee {sortBy === 'owner' && (sortAsc ? '↑' : '↓')}
              </th>
              <th className="py-3 px-4">Operating System</th>
              <th onClick={() => toggleSort('healthScore')} className="py-3 px-4 cursor-pointer hover:text-slate-900">
                Device Health {sortBy === 'healthScore' && (sortAsc ? '↑' : '↓')}
              </th>
              <th className="py-3 px-4">Security Posture</th>
              <th className="py-3 px-4">Patch Status</th>
              <th className="py-3 px-4">Compliance</th>
              <th className="py-3 px-4">Last Check-In</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {filtered.map((ep) => (
              <tr
                key={ep.id}
                onClick={() => onSelectEndpoint(ep.id)}
                className="hover:bg-blue-50/50 cursor-pointer transition"
              >
                <td className="py-3.5 px-4" onClick={(e) => toggleSelect(ep.id, e)}>
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(ep.id)}
                    onChange={() => {}}
                    className="rounded border-slate-300"
                  />
                </td>
                <td className="py-3.5 px-4 whitespace-nowrap">
                  <div className="font-mono font-semibold text-blue-600">{ep.id}</div>
                  <div className="text-slate-800 font-medium">{ep.name}</div>
                </td>
                <td className="py-3.5 px-4 whitespace-nowrap text-slate-700">{ep.owner}</td>
                <td className="py-3.5 px-4 whitespace-nowrap text-slate-600">{ep.os}</td>
                <td className="py-3.5 px-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                      ep.healthStatus === 'Critical'
                        ? 'bg-red-50 text-red-700 border border-red-200'
                        : ep.healthStatus === 'Warning'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}
                  >
                    {ep.healthScore}/100 ({ep.healthStatus})
                  </span>
                </td>
                <td className="py-3.5 px-4 whitespace-nowrap font-medium text-slate-800">{ep.securityPosture}</td>
                <td className="py-3.5 px-4 whitespace-nowrap text-slate-600">{ep.patchStatus}</td>
                <td className="py-3.5 px-4 whitespace-nowrap">
                  <StatusBadge status={ep.complianceStatus} />
                </td>
                <td className="py-3.5 px-4 whitespace-nowrap text-slate-400">{ep.lastCheckIn}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ============================================================================
// SCREEN 4B: ENDPOINT DETAILED PROFILE
// ============================================================================

function EndpointDetailScreen({
  endpoint,
  appState,
  setAppState,
  navigateToRecord,
  setActiveScreen,
  onTriggerRemediation,
  notify,
  requestConfirmation
}) {
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'software' | 'vulns' | 'history'
  const relatedIncidents = appState.incidents.filter((i) => i.deviceId === endpoint.id);
  const relatedVulns = appState.vulnerabilities.filter(
    (v) => v.affectedDevices.includes(endpoint.id) || (endpoint.id === 'END-FIN-094' && v.id === 'CVE-2026-4109')
  );

  const handleIsolateToggle = () => {
    const isIsolated = endpoint.securityPosture.includes('Isolated');
    requestConfirmation({
      title: isIsolated ? `Release Network Isolation (${endpoint.id})` : `Network Isolate Endpoint (${endpoint.id})`,
      message: isIsolated
        ? `Restore normal Zero Trust tunnel traffic on ${endpoint.name}?`
        : `Isolate ${endpoint.name} (${endpoint.ip}) from corporate VLANs while preserving Pr-Sensor management channel?`,
      confirmLabel: isIsolated ? 'Release Isolation' : 'Isolate Endpoint Now',
      tone: isIsolated ? 'warning' : 'danger',
      onConfirm: () => {
        setAppState((prev) => ({
          ...prev,
          endpoints: prev.endpoints.map((ep) =>
            ep.id === endpoint.id
              ? {
                  ...ep,
                  securityPosture: isIsolated ? 'Monitored — Isolation Lifted' : 'Network Isolated (Mgmt Only)'
                }
              : ep
          )
        }));
        notify(
          isIsolated ? `Network isolation lifted on ${endpoint.id}.` : `Endpoint ${endpoint.id} placed in Zero Trust containment.`,
          'info'
        );
      }
    });
  };

  const handleRunDiagnostic = () => {
    setAppState((prev) => ({
      ...prev,
      endpoints: prev.endpoints.map((ep) =>
        ep.id === endpoint.id ? { ...ep, lastCheckIn: 'Just now (Deep Telemetry Scanned)' } : ep
      )
    }));
    notify(`Completed live ring-0 SBOM & kernel telemetry scan on ${endpoint.id}.`, 'success');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveScreen('endpoints')}
            className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>Autonomous Endpoint Management</span>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="font-mono font-semibold text-blue-600">{endpoint.id}</span>
            </div>
            <h1 className="text-lg font-bold text-slate-900 mt-0.5">
              {endpoint.name} — {endpoint.owner}
            </h1>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleRunDiagnostic}
            className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium"
          >
            Run Diagnostic Scan
          </button>
          <button
            onClick={handleIsolateToggle}
            className="px-3 py-1.5 rounded-lg border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-semibold"
          >
            {endpoint.securityPosture.includes('Isolated') ? 'Release Isolation' : 'Isolate Endpoint'}
          </button>
          <button
            onClick={() => navigateToRecord('exposure', 'CVE-2026-4109')}
            className="px-3 py-1.5 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold"
          >
            Inspect CVE-2026-4109 Exposure →
          </button>
          <button
            onClick={onTriggerRemediation}
            className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold"
          >
            Open Remediation Plan (REM-2026-309) →
          </button>
        </div>
      </div>

      {/* Telemetry Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <div className="text-slate-500">Health & Posture</div>
          <div className="text-lg font-bold text-slate-900 mt-1">
            {endpoint.healthScore}/100 ({endpoint.healthStatus})
          </div>
          <div className="text-slate-600 mt-1">{endpoint.securityPosture}</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <div className="text-slate-500">OS & Kernel Build</div>
          <div className="text-sm font-bold text-slate-900 mt-1">{endpoint.os}</div>
          <div className="text-slate-600 mt-1">IP: {endpoint.ip} • S/N: {endpoint.serial}</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <div className="text-slate-500">Pr-Sensor & Encryption</div>
          <div className="text-sm font-bold text-slate-900 mt-1">{endpoint.edrStatus}</div>
          <div className="text-slate-600 mt-1">{endpoint.diskEncrypted}</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <div className="text-slate-500">Resource Telemetry</div>
          <div className="text-sm font-bold text-slate-900 mt-1">CPU: {endpoint.cpuLoad}</div>
          <div className="text-slate-600 mt-1">RAM: {endpoint.memoryUsage}</div>
        </div>
      </div>

      {/* Profile Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-xs">
        {[
          { id: 'all', label: 'Complete Device Profile' },
          { id: 'software', label: `Installed Software (${endpoint.installedSoftware.length})` },
          { id: 'vulns', label: `Vulnerabilities (${relatedVulns.length})` },
          { id: 'history', label: `Patch History & Linked Incidents` }
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              activeTab === t.id ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Installed Software & Kernel Modules */}
        {(activeTab === 'all' || activeTab === 'software') && (
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="px-5 py-3.5 border-b border-slate-200 font-semibold text-sm text-slate-800">
              Installed Software & Kernel Telemetry
            </div>
            <div className="divide-y divide-slate-100 text-xs">
              {endpoint.installedSoftware.map((sw, idx) => (
                <div key={idx} className="px-5 py-3 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-slate-900">{sw.name}</div>
                    <div className="font-mono text-slate-500 text-[11px]">Version: {sw.version}</div>
                  </div>
                  <StatusBadge status={sw.status} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Active Vulnerabilities & Related Incidents */}
        <div className="space-y-6">
          {(activeTab === 'all' || activeTab === 'vulns') && (
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="px-5 py-3.5 border-b border-slate-200 font-semibold text-sm text-slate-800">
                Detected Vulnerabilities on Device
              </div>
              <div className="divide-y divide-slate-100 text-xs">
                {relatedVulns.map((v) => (
                  <div
                    key={v.id}
                    onClick={() => navigateToRecord('exposure', v.id)}
                    className="px-5 py-3 hover:bg-slate-50 cursor-pointer flex items-center justify-between"
                  >
                    <div>
                      <div className="font-mono font-bold text-red-600">
                        {v.id} • CVSS {v.cvss}
                      </div>
                      <div className="text-slate-800 font-medium mt-0.5">{v.name}</div>
                    </div>
                    <StatusBadge status={v.status} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {(activeTab === 'all' || activeTab === 'history') && (
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="px-5 py-3.5 border-b border-slate-200 font-semibold text-sm text-slate-800">
                Linked ITSM Incidents & Patch History
              </div>
              <div className="divide-y divide-slate-100 text-xs">
                {relatedIncidents.map((inc) => (
                  <div
                    key={inc.id}
                    onClick={() => navigateToRecord('incident-detail', inc.id)}
                    className="px-5 py-3 hover:bg-slate-50 cursor-pointer flex items-center justify-between"
                  >
                    <div>
                      <span className="font-mono font-semibold text-blue-600 mr-2">{inc.id}</span>
                      <span className="text-slate-800 font-medium">{inc.title}</span>
                    </div>
                    <StatusBadge status={inc.status} />
                  </div>
                ))}
                {endpoint.patchHistory.map((ph, i) => (
                  <div key={i} className="px-5 py-2.5 flex items-center justify-between text-slate-600 bg-slate-50/40">
                    <span className="font-mono">{ph.kb}</span>
                    <span>
                      {ph.date} • <strong>{ph.status}</strong>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// SCREEN 5: EXPOSURE MANAGEMENT & SECOPS
// ============================================================================

function ExposureManagementScreen({ vulnerabilities, selectedCveId, setSelectedCveId, navigateToRecord, setAppState, notify }) {
  const [search, setSearch] = useState('');
  const [severityFilter, setSeverityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const filtered = vulnerabilities.filter((v) => {
    const mSearch =
      v.id.toLowerCase().includes(search.toLowerCase()) ||
      v.name.toLowerCase().includes(search.toLowerCase());
    const mSev = severityFilter === 'All' || v.severity === severityFilter;
    const mStat = statusFilter === 'All' || v.status === statusFilter;
    return mSearch && mSev && mStat;
  });

  const activeCve = vulnerabilities.find((v) => v.id === selectedCveId) || vulnerabilities[0];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs text-slate-500 font-medium">Pr AiiA Platform • Exposure Management & SecOps</div>
          <h1 className="text-xl font-bold text-slate-900 mt-0.5">Continuous Vulnerability Intelligence & CISA KEV Triage</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => notify('Refreshed live CISA Known Exploited Vulnerabilities (KEV) & SBOM feed.', 'info')}
            className="px-3 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs font-medium text-slate-700"
          >
            Sync CISA KEV Feed
          </button>
          <button
            onClick={() => navigateToRecord('remediation', activeCve.remediationPlanId)}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5"
          >
            <Zap className="w-4 h-4" />
            <span>Launch Remediation ({activeCve.remediationPlanId}) →</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 mr-2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search CVE ID or description..."
            className="bg-transparent text-xs focus:outline-none w-full"
          />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-semibold text-slate-600">Filter by Severity:</span>
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="border border-slate-200 rounded-lg px-3 py-1.5 bg-white"
          >
            <option value="All">All Severities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
          </select>

          <span className="font-semibold text-slate-600">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-slate-200 rounded-lg px-3 py-1.5 bg-white"
          >
            <option value="All">All Statuses</option>
            <option value="Remediation Staged">Remediation Staged</option>
            <option value="In Progress">In Progress</option>
            <option value="Open">Open</option>
            <option value="Remediated & Verified">Remediated & Verified</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* CVE Table */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-semibold uppercase text-slate-500">
                <th className="py-3 px-4">CVE ID</th>
                <th className="py-3 px-4">Vulnerability Name</th>
                <th className="py-3 px-4">Severity / CVSS</th>
                <th className="py-3 px-4">Affected</th>
                <th className="py-3 px-4">Exploit Status</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filtered.map((v) => (
                <tr
                  key={v.id}
                  onClick={() => setSelectedCveId(v.id)}
                  className={`cursor-pointer transition ${
                    activeCve.id === v.id ? 'bg-blue-50/70' : 'hover:bg-slate-50'
                  }`}
                >
                  <td className="py-3.5 px-4 font-mono font-bold text-red-600 whitespace-nowrap">{v.id}</td>
                  <td className="py-3.5 px-4 font-medium text-slate-900">{v.name}</td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-0.5 rounded font-semibold text-[11px] ${
                        v.severity === 'Critical'
                          ? 'bg-red-50 text-red-700 border border-red-200'
                          : v.severity === 'High'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-blue-50 text-blue-700 border border-blue-200'
                      }`}
                    >
                      {v.severity} ({v.cvss})
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">{v.affectedCount} devices</td>
                  <td className="py-3.5 px-4 text-slate-600">{v.exploitStatus}</td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <StatusBadge status={v.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Selected Vulnerability Detail Card */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-4 text-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="font-mono font-bold text-red-600 text-sm">{activeCve.id}</span>
              <h3 className="font-bold text-slate-900 text-sm mt-0.5">{activeCve.name}</h3>
            </div>
            <span className="px-2.5 py-1 rounded-lg bg-red-600 text-white font-bold">CVSS {activeCve.cvss}</span>
          </div>

          <p className="text-slate-600 leading-relaxed">{activeCve.description}</p>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
            <div className="flex justify-between">
              <span className="text-slate-500">Exploitability:</span>
              <span className="font-semibold text-red-600">{activeCve.exploitStatus}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Assigned Owner:</span>
              <span className="font-medium text-slate-800">{activeCve.owner}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Mapped NIST Control:</span>
              <button
                onClick={() => navigateToRecord('grc-evidence', activeCve.controlId)}
                className="font-mono font-semibold text-emerald-600 hover:underline"
              >
                NIST 800-53 {activeCve.controlId} →
              </button>
            </div>
          </div>

          <div>
            <div className="font-semibold text-slate-800 mb-1.5">Affected Endpoints (Click to Inspect):</div>
            {activeCve.affectedDevices.length === 0 ? (
              <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium">
                0 Affected Endpoints — All fleet devices patched and verified!
              </div>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {activeCve.affectedDevices.map((devId) => (
                  <button
                    key={devId}
                    onClick={() => navigateToRecord('endpoint-detail', 'END-FIN-094')}
                    className="px-2.5 py-1 rounded-md bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 font-mono font-semibold"
                  >
                    {devId}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="pt-2 space-y-2">
            <button
              onClick={() => navigateToRecord('ai-firewall', 'FW-REQ-9921')}
              className="w-full py-2 px-3 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold"
            >
              Review AI Action Firewall (FW-REQ-9921) →
            </button>
            <button
              onClick={() => navigateToRecord('remediation', activeCve.remediationPlanId)}
              className="w-full py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold"
            >
              Open Remediation Workflow ({activeCve.remediationPlanId}) →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// SCREEN 6: REMEDIATION & APPROVALS WORKFLOW
// ============================================================================

function RemediationScreen({
  remediations,
  selectedRemediationId,
  setSelectedRemediationId,
  onRequestApproval,
  onApprove,
  onReject,
  onExecute,
  onVerify,
  navigateToRecord,
  setAppState,
  notify
}) {
  const activeRem = remediations.find((r) => r.id === selectedRemediationId) || remediations[0];
  const [scheduleModal, setScheduleModal] = useState(false);
  const [historyModal, setHistoryModal] = useState(false);
  const [scheduleInput, setScheduleInput] = useState('2026-05-14 12:00 UTC');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs text-slate-500 font-medium">Pr AiiA Platform • Autonomous Remediation & Approvals</div>
          <h1 className="text-xl font-bold text-slate-900 mt-0.5">Governed Patch Deployment & Post-Remediation Verification</h1>
        </div>
        <div className="flex items-center gap-2">
          {remediations.map((r) => (
            <button
              key={r.id}
              onClick={() => setSelectedRemediationId(r.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold border ${
                activeRem.id === r.id
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {r.id}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Action Bar (All 7 Required Workflow Buttons) */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-bold text-blue-600">{activeRem.id}</span>
              <StatusBadge status={activeRem.approvalStatus} />
              <StatusBadge status={activeRem.executionStatus} />
            </div>
            <h2 className="text-base font-bold text-slate-900 mt-1">{activeRem.title}</h2>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <button
              onClick={() => onRequestApproval(activeRem.id)}
              className="px-3 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 font-medium text-slate-700"
            >
              Request Approval
            </button>
            <button
              onClick={onApprove}
              className="px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold"
            >
              Approve ({activeRem.firewallReqId})
            </button>
            <button
              onClick={onReject}
              className="px-3 py-2 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 font-medium"
            >
              Reject
            </button>
            <button
              onClick={() => setScheduleModal(true)}
              className="px-3 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 font-medium text-slate-700"
            >
              Schedule Patch
            </button>
            <button
              onClick={onExecute}
              className="px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-1"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Execute Remediation</span>
            </button>
            <button
              onClick={onVerify}
              className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold flex items-center gap-1"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Verify & Attest GRC</span>
            </button>
            <button
              onClick={() => setHistoryModal(true)}
              className="px-3 py-2 rounded-lg border border-slate-300 bg-slate-50 hover:bg-slate-100 font-medium text-slate-700"
            >
              View History
            </button>
          </div>
        </div>

        {/* Deployment Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-medium text-slate-600">
            <span>Autonomous Rollout & Telemetry Verification Progress</span>
            <span className="font-bold text-blue-600">{activeRem.progress}%</span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-500"
              style={{ width: `${activeRem.progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Plan Details & Live Agent Execution Console */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3 text-xs">
          <h3 className="text-sm font-bold text-slate-900">Remediation Plan & Governance Metadata</h3>
          <div className="grid grid-cols-2 gap-3 py-2 border-b border-slate-100">
            <div>
              <div className="text-slate-400">Target Vulnerability</div>
              <button
                onClick={() => navigateToRecord('exposure', activeRem.cveId)}
                className="font-mono font-bold text-red-600 hover:underline mt-0.5"
              >
                {activeRem.cveId}
              </button>
            </div>
            <div>
              <div className="text-slate-400">Linked ITSM Incident</div>
              <button
                onClick={() => navigateToRecord('incident-detail', activeRem.incidentId)}
                className="font-mono font-bold text-blue-600 hover:underline mt-0.5"
              >
                {activeRem.incidentId}
              </button>
            </div>
          </div>

          <div className="py-1 border-b border-slate-100">
            <div className="text-slate-400">Affected Target Endpoints</div>
            <div className="font-semibold text-slate-800 mt-0.5">{activeRem.targetPrimary}</div>
          </div>

          <div className="py-1 border-b border-slate-100">
            <div className="text-slate-400">Recommended Patch Package</div>
            <div className="font-mono text-slate-800 mt-0.5">{activeRem.patchPackage}</div>
          </div>

          <div className="py-1 border-b border-slate-100">
            <div className="text-slate-400">Risk & Blast Radius Assessment</div>
            <div className="text-slate-700 mt-0.5">{activeRem.riskAssessment}</div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div>
              <div className="text-slate-400">Assigned AI Agent</div>
              <button
                onClick={() => navigateToRecord('ai-workforce', 'AGT-03')}
                className="font-semibold text-purple-700 hover:underline mt-0.5"
              >
                {activeRem.assignedAgent}
              </button>
            </div>
            <div>
              <div className="text-slate-400">Scheduled Window</div>
              <div className="font-medium text-slate-800 mt-0.5">{activeRem.scheduleTime}</div>
            </div>
          </div>
        </div>

        {/* Simulated Execution Terminal */}
        <div className="bg-slate-900 text-slate-100 p-5 rounded-xl border border-slate-800 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-semibold">Simulated Agent Execution & Verification Stream</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
              SANDBOXED SIMULATION
            </span>
          </div>

          <div className="font-mono text-xs space-y-2 max-h-60 overflow-y-auto text-slate-300">
            {activeRem.logs.map((log, i) => (
              <div key={i} className="leading-relaxed">
                {log}
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">
               Target GRC Evidence: <strong className="text-emerald-400">{activeRem.evidenceId}</strong> ({activeRem.controlId})
            </span>
            <button
              onClick={() => navigateToRecord('grc-evidence', activeRem.controlId)}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold"
            >
              Inspect GRC Control ({activeRem.controlId}) →
            </button>
          </div>
        </div>
      </div>

      {/* Schedule Modal */}
      {scheduleModal && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl border border-slate-200 p-6 max-w-sm w-full space-y-4 text-xs">
            <h3 className="text-sm font-bold text-slate-900">Schedule Maintenance Deployment Window</h3>
            <input
              type="text"
              value={scheduleInput}
              onChange={(e) => setScheduleInput(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-3 py-2"
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setScheduleModal(false)} className="px-3 py-1.5 rounded-lg border border-slate-300">
                Cancel
              </button>
              <button
                onClick={() => {
                  setAppState((prev) => ({
                    ...prev,
                    remediations: prev.remediations.map((r) =>
                      r.id === activeRem.id
                        ? {
                            ...r,
                            scheduleTime: scheduleInput,
                            logs: [...r.logs, `[Now] Scheduled execution window updated to ${scheduleInput}.`]
                          }
                        : r
                    )
                  }));
                  setScheduleModal(false);
                  notify(`Scheduled ${activeRem.id} for window: ${scheduleInput}`, 'info');
                }}
                className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-semibold"
              >
                Confirm Schedule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Remediation History Modal */}
      {historyModal && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl border border-slate-200 max-w-lg w-full overflow-hidden text-xs">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <h3 className="text-sm font-semibold">Remediation Audit & Execution History ({activeRem.id})</h3>
              <button onClick={() => setHistoryModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 space-y-2 max-h-80 overflow-y-auto font-mono text-[11px] bg-slate-950 text-slate-200">
              {activeRem.logs.map((l, idx) => (
                <div key={idx} className="border-b border-slate-800 pb-1.5">
                  {l}
                </div>
              ))}
            </div>
            <div className="p-4 bg-white flex justify-end">
              <button
                onClick={() => setHistoryModal(false)}
                className="px-4 py-1.5 rounded-lg bg-slate-900 text-white font-semibold"
              >
                Close History
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// SCREEN 7: GRC EVIDENCE & CONTROL LIBRARY
// ============================================================================

function GRCEvidenceScreen({
  controls,
  poamItems,
  auditLog,
  selectedControlId,
  setSelectedControlId,
  onOpenUploadModal,
  navigateToRecord,
  setAppState,
  notify
}) {
  const activeControl = controls.find((c) => c.id === selectedControlId) || controls[0];
  const [frameworkFilter, setFrameworkFilter] = useState('All');

  const filteredControls = controls.filter(
    (c) => frameworkFilter === 'All' || c.frameworks.some((f) => f.includes(frameworkFilter))
  );

  const handleStatusChange = (newStatus) => {
    setAppState((prev) => ({
      ...prev,
      grcControls: prev.grcControls.map((c) =>
        c.id === activeControl.id ? { ...c, status: newStatus, lastAssessed: 'Just now' } : c
      )
    }));
    notify(`Updated NIST Control ${activeControl.id} status to "${newStatus}".`, 'success');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs text-emerald-700 font-semibold">Pr AiiA GRC • Evidence & Control Library</div>
          <h1 className="text-xl font-bold text-slate-900 mt-0.5">
            Continuous NIST SP 800-53, FedRAMP High & SOC 2 Evidence Binding
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={frameworkFilter}
            onChange={(e) => setFrameworkFilter(e.target.value)}
            className="border border-slate-300 rounded-lg px-3 py-2 text-xs bg-white font-medium"
          >
            <option value="All">All Compliance Frameworks</option>
            <option value="NIST 800-53">NIST SP 800-53 Rev 5</option>
            <option value="FedRAMP High">FedRAMP High</option>
            <option value="SOC 2">SOC 2 Type II</option>
            <option value="ISO 27001">ISO/IEC 27001:2022</option>
          </select>
          <button
            onClick={() => onOpenUploadModal(activeControl.id)}
            className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Add / Simulate Evidence</span>
          </button>
        </div>
      </div>

      {/* Controls + Active Control Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* NIST Control Library List */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 text-xs font-bold uppercase text-slate-500">
            NIST Control Library ({filteredControls.length})
          </div>
          <div className="divide-y divide-slate-100">
            {filteredControls.map((ctrl) => (
              <div
                key={ctrl.id}
                onClick={() => setSelectedControlId(ctrl.id)}
                className={`p-4 cursor-pointer transition ${
                  activeControl.id === ctrl.id ? 'bg-emerald-50/70 border-l-4 border-emerald-600' : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm font-bold text-emerald-700">{ctrl.id}</span>
                  <StatusBadge status={ctrl.status} />
                </div>
                <div className="text-xs font-semibold text-slate-900 mt-1">{ctrl.name}</div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Evidence Artifacts: {ctrl.evidenceRecords.length} • Owner: {ctrl.owner}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Control Detail & Evidence Records */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-4 text-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-base font-bold text-emerald-700">{activeControl.id}</span>
                  <span className="text-slate-400">•</span>
                  <span className="font-semibold text-slate-600">{activeControl.family}</span>
                </div>
                <h2 className="text-base font-bold text-slate-900 mt-0.5">{activeControl.name}</h2>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={activeControl.status}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  className="border border-slate-300 rounded-lg px-2.5 py-1.5 bg-white font-semibold text-slate-700"
                >
                  <option value="Compliant (Verified)">Compliant (Verified)</option>
                  <option value="Gap Identified (Action Required)">Gap Identified (Action Required)</option>
                  <option value="Active Monitoring">Active Monitoring</option>
                </select>
              </div>
            </div>

            <p className="text-slate-600 leading-relaxed">{activeControl.description}</p>

            <div className="flex flex-wrap gap-2">
              {activeControl.frameworks.map((fw) => (
                <span
                  key={fw}
                  className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-medium text-[11px]"
                >
                  {fw}
                </span>
              ))}
            </div>

            {/* Cryptographic Evidence Records Table */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-slate-800">Cryptographic Evidence Records ({activeControl.evidenceRecords.length})</h3>
                <button
                  onClick={() => onOpenUploadModal(activeControl.id)}
                  className="text-emerald-600 font-semibold hover:underline"
                >
                  + Attach New Evidence Artifact
                </button>
              </div>
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-semibold uppercase text-slate-500">
                      <th className="py-2.5 px-3">Evidence ID</th>
                      <th className="py-2.5 px-3">Artifact Title</th>
                      <th className="py-2.5 px-3">Collector / Source</th>
                      <th className="py-2.5 px-3">SHA-256 Hash</th>
                      <th className="py-2.5 px-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {activeControl.evidenceRecords.map((ev) => (
                      <tr key={ev.id} className="hover:bg-slate-50">
                        <td className="py-2.5 px-3 font-mono font-bold text-emerald-700">{ev.id}</td>
                        <td className="py-2.5 px-3 font-medium text-slate-900">{ev.title}</td>
                        <td className="py-2.5 px-3 text-slate-600">{ev.collector}</td>
                        <td className="py-2.5 px-3 font-mono text-[11px] text-slate-500">{ev.hash}</td>
                        <td className="py-2.5 px-3">
                          <StatusBadge status={ev.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Plan of Action & Milestones (POA&M) Tracker */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3 text-xs">
            <h3 className="text-sm font-bold text-slate-900">Plan of Action & Milestones (POA&M) & Open Compliance Gaps</h3>
            <div className="divide-y divide-slate-100">
              {poamItems.map((poam) => (
                <div key={poam.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-blue-600">{poam.id}</span>
                      <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        Control {poam.controlId}
                      </span>
                      <StatusBadge status={poam.status} />
                    </div>
                    <div className="font-semibold text-slate-900 mt-1">{poam.title}</div>
                    <div className="text-slate-500 mt-0.5">Milestone: {poam.milestone}</div>
                  </div>
                  <button
                    onClick={() => navigateToRecord('remediation', 'REM-2026-309')}
                    className="px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium shrink-0"
                  >
                    Inspect Linked Remediation →
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// SCREEN 8: AI WORKFORCE DIRECTORY & AGENT PROFILES
// ============================================================================

function AIWorkforceScreen({ agents, selectedAgentId, setSelectedAgentId, setAppState, notify, navigateToRecord }) {
  const activeAgent = agents.find((a) => a.id === selectedAgentId) || agents[0];

  const handleToggleAgentState = () => {
    const isPaused = activeAgent.status.includes('Paused');
    const nextStatus = isPaused ? 'Active' : 'Paused by CISO';
    setAppState((prev) => ({
      ...prev,
      aiAgents: prev.aiAgents.map((a) =>
        a.id === activeAgent.id
          ? {
              ...a,
              status: nextStatus,
              lastActivity: 'Just now',
              recentLog: `Agent state updated to "${nextStatus}" by ${prev.currentUserRole}.`
            }
          : a
      )
    }));
    notify(`${activeAgent.name} status set to: ${nextStatus}.`, 'info');
  };

  const handleSimulateTask = () => {
    setAppState((prev) => ({
      ...prev,
      aiAgents: prev.aiAgents.map((a) =>
        a.id === activeAgent.id
          ? {
              ...a,
              actionsCount: a.actionsCount + 1,
              lastActivity: 'Just now',
              recentLog: `Completed on-demand diagnostic sweep across Golden Thread entities (INC-2026-8842 / END-FIN-094).`
            }
          : a
      )
    }));
    notify(`${activeAgent.name} executed simulated diagnostic sweep.`, 'success');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs text-purple-700 font-semibold">Pr AiiA AI Workforce • Autonomous Agent Mesh</div>
          <h1 className="text-xl font-bold text-slate-900 mt-0.5">Governed Enterprise AI Agents, Autonomy Levels & Permissions</h1>
        </div>
        <button
          onClick={() => navigateToRecord('ai-firewall', 'FW-REQ-9921')}
          className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1.5"
        >
          <Shield className="w-4 h-4 text-amber-400" />
          <span>Open AI Action Firewall →</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Agent Cards List */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {agents.map((ag) => (
            <div
              key={ag.id}
              onClick={() => setSelectedAgentId(ag.id)}
              className={`p-4 rounded-xl border cursor-pointer transition bg-white ${
                activeAgent.id === ag.id
                  ? 'border-purple-600 ring-2 ring-purple-500/20'
                  : 'border-slate-200 hover:border-purple-400'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-purple-700">{ag.id}</span>
                <StatusBadge status={ag.status} />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mt-1">{ag.name}</h3>
              <div className="text-[11px] text-slate-500">{ag.category}</div>
              <p className="text-xs text-slate-600 mt-2 line-clamp-2">{ag.assignedTask}</p>
              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>{ag.autonomyLevel.split(' ')[0]} {ag.autonomyLevel.split(' ')[1]}</span>
                <span className="font-semibold text-slate-800">{ag.actionsCount.toLocaleString()} actions</span>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Agent Profile Drawer */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-4 text-xs">
          <div className="border-b border-slate-100 pb-3 flex items-start justify-between">
            <div>
              <span className="font-mono font-bold text-purple-700">{activeAgent.id}</span>
              <h2 className="text-base font-bold text-slate-900 mt-0.5">{activeAgent.name}</h2>
              <p className="text-slate-500 mt-0.5">{activeAgent.category}</p>
            </div>
            <StatusBadge status={activeAgent.status} />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Configured Autonomy Level</label>
            <select
              value={activeAgent.autonomyLevel}
              onChange={(e) => {
                const val = e.target.value;
                setAppState((prev) => ({
                  ...prev,
                  aiAgents: prev.aiAgents.map((a) => (a.id === activeAgent.id ? { ...a, autonomyLevel: val } : a))
                }));
                notify(`Updated ${activeAgent.name} autonomy guardrail to: ${val}`, 'info');
              }}
              className="w-full border border-slate-300 rounded-lg px-2.5 py-1.5 bg-white font-medium"
            >
              <option>Level 1 (Advisory Only)</option>
              <option>Level 2 (Human-in-the-Loop for Tier-1 Assets)</option>
              <option>Level 3 (Conditional Autonomy)</option>
              <option>Level 4 (Autonomous Execution for Low-Risk)</option>
              <option>Level 5 (Constitutional Policy Enforcer)</option>
            </select>
          </div>

          <div>
            <div className="font-semibold text-slate-700 mb-1.5">Scoped RBAC Permissions & Guardrails</div>
            <div className="flex flex-wrap gap-1.5">
              {activeAgent.permissions.map((perm) => (
                <span
                  key={perm}
                  className="px-2 py-1 rounded-md bg-purple-50 text-purple-800 border border-purple-200 text-[11px] font-medium"
                >
                  {perm}
                </span>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-lg bg-slate-900 text-slate-200 space-y-1">
            <div className="text-[10px] uppercase text-purple-400 font-semibold">Latest Telemetry Activity</div>
            <p className="text-xs">{activeAgent.recentLog}</p>
            <div className="text-[10px] text-slate-400">Last heartbeat: {activeAgent.lastActivity}</div>
          </div>

          <div className="pt-2 flex gap-2">
            <button
              onClick={handleSimulateTask}
              className="flex-1 py-2 px-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold"
            >
              Run Agent Task
            </button>
            <button
              onClick={handleToggleAgentState}
              className="py-2 px-3 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium"
            >
              {activeAgent.status.includes('Paused') ? 'Resume Agent' : 'Pause Agent'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// SCREEN 9: AI ACTION FIREWALL
// ============================================================================

function AIFirewallScreen({
  requests,
  auditLog,
  selectedFirewallId,
  setSelectedFirewallId,
  onApprove,
  onReject,
  navigateToRecord
}) {
  const activeReq = requests.find((r) => r.id === selectedFirewallId) || requests[0];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs text-amber-600 font-semibold">Pr AiiA AI Governance • Constitutional AI Action Firewall</div>
          <h1 className="text-xl font-bold text-slate-900 mt-0.5">
            Real-Time Interception, Blast-Radius Policy Evaluation & Human-in-the-Loop Sign-Off
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending & Historical Requests Table */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-semibold uppercase text-slate-500">
                <th className="py-3 px-4">Request ID</th>
                <th className="py-3 px-4">Requesting Agent</th>
                <th className="py-3 px-4">Action & Target System</th>
                <th className="py-3 px-4">Risk Level</th>
                <th className="py-3 px-4">Approval Status</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {requests.map((req) => (
                <tr
                  key={req.id}
                  onClick={() => setSelectedFirewallId(req.id)}
                  className={`cursor-pointer transition ${
                    activeReq.id === req.id ? 'bg-amber-50/70' : 'hover:bg-slate-50'
                  }`}
                >
                  <td className="py-3.5 px-4 font-mono font-bold text-blue-600 whitespace-nowrap">{req.id}</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-900 whitespace-nowrap">
                    {req.agentId} ({req.agentName})
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-mono font-semibold text-slate-800">{req.actionCode}</div>
                    <div className="text-[11px] text-slate-500">{req.target}</div>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 font-semibold">
                      {req.riskLevel.split(' ')[0]}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <StatusBadge status={req.approvalStatus} />
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onApprove(req.id)}
                        className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-[11px]"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => onReject(req.id)}
                        className="px-2.5 py-1 rounded border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 font-medium text-[11px]"
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Selected Firewall Request Inspection Panel */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-4 text-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="font-mono font-bold text-blue-600 text-sm">{activeReq.id}</span>
              <h3 className="font-bold text-slate-900 text-sm mt-0.5">{activeReq.actionCode}</h3>
            </div>
            <StatusBadge status={activeReq.approvalStatus} />
          </div>

          <div className="space-y-2">
            <div>
              <span className="text-slate-500">Requesting Agent:</span>{' '}
              <strong className="text-slate-900">
                {activeReq.agentId} ({activeReq.agentName})
              </strong>
            </div>
            <div>
              <span className="text-slate-500">Target System:</span>{' '}
              <strong className="text-slate-900">{activeReq.target}</strong>
            </div>
            <div>
              <span className="text-slate-500">Blast Radius:</span>{' '}
              <strong className="text-slate-900">{activeReq.blastRadius}</strong>
            </div>
            <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-900">
              <strong>Policy Triggered:</strong> {activeReq.policyRule}
            </div>
          </div>

          <div>
            <div className="font-semibold text-slate-700 mb-1">Cryptographic Action Payload Preview:</div>
            <pre className="p-3 rounded-lg bg-slate-900 text-emerald-400 font-mono text-[11px] overflow-x-auto">
              {activeReq.payloadJson}
            </pre>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              onClick={() => onApprove(activeReq.id)}
              className="flex-1 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
            >
              Approve & Issue Token
            </button>
            <button
              onClick={() => onReject(activeReq.id)}
              className="py-2 px-3 rounded-lg border border-red-300 text-red-700 hover:bg-red-50 font-semibold"
            >
              Reject
            </button>
          </div>

          <button
            onClick={() => navigateToRecord('remediation', activeReq.relatedRemediation)}
            className="w-full py-2 px-3 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium"
          >
            Proceed to Remediation Console ({activeReq.relatedRemediation}) →
          </button>
        </div>
      </div>

      {/* Immutable AI Action Firewall Audit Log */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-200 font-semibold text-sm text-slate-800">
          Immutable AI Governance & Firewall Audit Log
        </div>
        <div className="divide-y divide-slate-100 text-xs">
          {auditLog.map((entry) => (
            <div key={entry.id} className="px-5 py-3 flex items-center justify-between">
              <div>
                <span className="font-mono font-semibold text-slate-500 mr-2">{entry.id}</span>
                <span className="font-semibold text-slate-900 mr-2">{entry.actor}:</span>
                <span className="text-slate-700">{entry.action}</span>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <StatusBadge status={entry.status} />
                <span className="text-slate-400 text-[11px]">{entry.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// SupplyChainScreen and SupplyChainDetailScreen components

function SupplyChainScreen({
  plans,
  agents,
  onOpenPlan,
  navigateToRecord,
  setAppState,
  notify,
  requestConfirmation
}) {
  const activePlans = Array.isArray(plans) && plans.length > 0 ? plans : DEFAULT_SUPPLY_CHAIN_PLANS;
  const activeAgents = Array.isArray(agents) && agents.length > 0 ? agents : DEFAULT_SUPPLY_CHAIN_AGENTS;

  const [activeSubTab, setActiveSubTab] = useState('All');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortField, setSortField] = useState('id');
  const [sortAsc, setSortAsc] = useState(false);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [selectedDrawerPlan, setSelectedDrawerPlan] = useState(null);
  const [inspectingAgent, setInspectingAgent] = useState(null);
  const [showNewModal, setShowNewModal] = useState(false);
  const [formError, setFormError] = useState('');

  // Replay simulation state
  const [isReplaying, setIsReplaying] = useState(false);
  const [simulationStep, setSimulationStep] = useState(-1);

  // New plan form state
  const [newPlan, setNewPlan] = useState({
    name: '',
    laneNode: '',
    quantity: '',
    eta: 'Nov 05',
    submodule: 'Demand Planning',
    carrier: 'DHL Global',
    assignedAgent: 'Demand Sensing Agent'
  });

  const submodules = ['All', 'Demand Planning', 'Supply Planning', 'Logistics', 'Inventory'];
  const workflowSteps = [
    { num: '01', title: 'Demand signal', desc: 'POS anomalies & channel spikes detected across 42 retail partners' },
    { num: '02', title: 'Forecast update', desc: 'Neural Forecaster recalculates safety stock buffers (+2.4 pts gain)' },
    { num: '03', title: 'Supply plan', desc: 'Multi-echelon rebalancing formulated across Hamburg & Singapore DCs' },
    { num: '04', title: 'Purchase orders', desc: 'AI Action Firewall pre-authorizes tier-1 supplier component releases' },
    { num: '05', title: 'Production orders', desc: 'Monterrey plant batch schedules and carrier bookings synchronized' }
  ];

  const handleReplaySimulation = () => {
    if (isReplaying) return;
    setIsReplaying(true);
    setSimulationStep(0);

    const stepInterval = (step) => {
      if (step < 5) {
        setSimulationStep(step);
        setTimeout(() => stepInterval(step + 1), 600);
      } else {
        setTimeout(() => {
          setIsReplaying(false);
          setSimulationStep(-1);
          notify('Signature workflow simulation completed. All 5 pipeline stages verified.', 'success');
        }, 800);
      }
    };
    stepInterval(0);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  // Filter and sort plans
  const filteredPlans = activePlans
    .filter((p) => {
      const matchesSub = activeSubTab === 'All' || p.submodule === activeSubTab;
      const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        p.id.toLowerCase().includes(q) ||
        p.name.toLowerCase().includes(q) ||
        p.laneNode.toLowerCase().includes(q) ||
        p.carrier.toLowerCase().includes(q) ||
        (p.handlingAgent && p.handlingAgent.toLowerCase().includes(q));
      return matchesSub && matchesStatus && matchesSearch;
    })
    .sort((a, b) => {
      const valA = String(a[sortField] || '');
      const valB = String(b[sortField] || '');
      return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
    });

  // Select all handler
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(new Set(filteredPlans.map((p) => p.id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const handleToggleRow = (id, e) => {
    e.stopPropagation();
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  // Bulk actions
  const handleBulkApprove = () => {
    if (selectedIds.size === 0) return;
    setAppState((prev) => {
      const currentList = Array.isArray(prev.supplyChainPlans) && prev.supplyChainPlans.length > 0
        ? prev.supplyChainPlans
        : activePlans;
      return {
        ...prev,
        supplyChainPlans: currentList.map((p) =>
          selectedIds.has(p.id) ? { ...p, status: 'Approved' } : p
        ),
        auditLog: [
          {
            id: `AUD-SCM-${Math.floor(1000 + Math.random() * 9000)}`,
            actor: 'CISO & VP Enterprise Operations',
            action: `Bulk approved ${selectedIds.size} supply plans under Policy POL-SCM-014.`,
            time: 'Just now',
            status: 'Authorized'
          },
          ...(prev.auditLog || [])
        ]
      };
    });
    notify(`Approved ${selectedIds.size} supply plans — logged to Chain of Evidence.`, 'success');
    setSelectedIds(new Set());
  };

  const handleBulkExport = () => {
    const count = selectedIds.size > 0 ? selectedIds.size : filteredPlans.length;
    notify(`Export generated: ${count} supply plans downloaded as SCM_Report_${new Date().toISOString().slice(0, 10)}.csv`, 'success');
  };

  // Create new plan
  const handleCreatePlan = (e) => {
    e.preventDefault();
    if (!newPlan.name.trim() || !newPlan.laneNode.trim()) {
      setFormError('Please enter a descriptive plan name and fulfillment lane/node.');
      return;
    }
    setFormError('');

    const newId = `SP-2026-W${Math.floor(43 + Math.random() * 10)}`;
    const createdItem = {
      id: newId,
      name: newPlan.name.trim(),
      laneNode: newPlan.laneNode.trim(),
      quantity: newPlan.quantity.trim() || '5,000 units',
      eta: newPlan.eta.trim() || 'Nov 15',
      status: 'Draft',
      agentTouched: newPlan.assignedAgent !== 'Human team',
      submodule: newPlan.submodule,
      submoduleIdx: submodules.indexOf(newPlan.submodule) > 0 ? submodules.indexOf(newPlan.submodule) - 1 : 0,
      carrier: newPlan.carrier || 'Kuehne+Nagel',
      origin: 'Regional Assembly Hub',
      destination: newPlan.laneNode.trim(),
      mode: newPlan.laneNode.includes('Air') ? 'Air Cargo' : newPlan.laneNode.includes('Ocean') ? 'Ocean Freight' : 'Intermodal Transport',
      riskReason: 'Newly created supply plan; awaiting AI demand curve reconciliation',
      handlingAgent: newPlan.assignedAgent,
      policy: 'POL-SCM-019',
      firewallChecks: '8/8 checks passed',
      evidenceHash: `evd-${Math.random().toString(36).substring(2, 10)}`,
      linkedIncident: 'INC-2026-8842',
      linkedDevice: 'END-FIN-094'
    };

    setAppState((prev) => {
      const currentList = Array.isArray(prev.supplyChainPlans) && prev.supplyChainPlans.length > 0
        ? prev.supplyChainPlans
        : activePlans;
      return {
        ...prev,
        supplyChainPlans: [createdItem, ...currentList],
        auditLog: [
          {
            id: `AUD-SCM-${Math.floor(1000 + Math.random() * 9000)}`,
            actor: 'VP Enterprise Operations',
            action: `Created new supply plan ${newId} (${createdItem.name}) assigned to ${createdItem.handlingAgent}.`,
            time: 'Just now',
            status: 'Created'
          },
          ...(prev.auditLog || [])
        ]
      };
    });

    setShowNewModal(false);
    setNewPlan({
      name: '',
      laneNode: '',
      quantity: '',
      eta: 'Nov 05',
      submodule: 'Demand Planning',
      carrier: 'DHL Global',
      assignedAgent: 'Demand Sensing Agent'
    });
    notify(`Created supply plan ${newId} — tracking initiated in SCM.`, 'success');
  };

  // Toggle agent status
  const handleToggleAgentStatus = (agentName) => {
    setAppState((prev) => {
      const currentAgents = Array.isArray(prev.supplyChainAgents) && prev.supplyChainAgents.length > 0
        ? prev.supplyChainAgents
        : activeAgents;
      const nextAgents = currentAgents.map((a) => {
        if (a.name === agentName) {
          const nextStatus = a.status === 'Active' ? 'Paused' : 'Active';
          return { ...a, status: nextStatus };
        }
        return a;
      });
      return {
        ...prev,
        supplyChainAgents: nextAgents,
        auditLog: [
          {
            id: `AUD-AGT-${Math.floor(1000 + Math.random() * 9000)}`,
            actor: 'Security Operations & AI Governor',
            action: `Toggled state of ${agentName} to ${nextAgents.find((x) => x.name === agentName)?.status}.`,
            time: 'Just now',
            status: 'Governance Change'
          },
          ...(prev.auditLog || [])
        ]
      };
    });

    const curr = activeAgents.find((a) => a.name === agentName);
    const willBe = curr?.status === 'Active' ? 'Paused' : 'Active';
    notify(`${agentName} is now ${willBe}. Action Firewall rules updated.`, willBe === 'Active' ? 'success' : 'info');
    if (inspectingAgent) {
      setInspectingAgent((prev) => prev ? { ...prev, status: willBe } : null);
    }
  };

  // Quick reroute for at-risk shipment
  const handleAuthorizeReroute = (planId) => {
    setAppState((prev) => {
      const currentPlans = Array.isArray(prev.supplyChainPlans) && prev.supplyChainPlans.length > 0
        ? prev.supplyChainPlans
        : activePlans;
      
      const updatedPlans = currentPlans.map((p) =>
        p.id === planId
          ? {
              ...p,
              status: 'Approved',
              laneNode: 'NYK Line · Cape of Good Hope Contingency',
              eta: 'Oct 23',
              riskReason: 'Rerouted via Cape of Good Hope to avoid Suez chokepoint (+4d delay mitigated)'
            }
          : p
      );

      return {
        ...prev,
        supplyChainPlans: updatedPlans,
        auditLog: [
          {
            id: `AUD-REROUTE-${Math.floor(1000 + Math.random() * 9000)}`,
            actor: 'Logistics Rerouter (AGT-SCM-03)',
            action: `Authorized automated maritime lane reroute for ${planId} around Suez bottleneck.`,
            time: 'Just now',
            status: 'Auto-Rerouted'
          },
          ...(prev.auditLog || [])
        ]
      };
    });

    if (selectedDrawerPlan && selectedDrawerPlan.id === planId) {
      setSelectedDrawerPlan((prev) =>
        prev
          ? {
              ...prev,
              status: 'Approved',
              laneNode: 'NYK Line · Cape of Good Hope Contingency',
              eta: 'Oct 23',
              riskReason: 'Rerouted via Cape of Good Hope to avoid Suez chokepoint (+4d delay mitigated)'
            }
          : null
      );
    }

    notify(`Maritime reroute authorized for ${planId}. Contingency lane synchronized with Rotterdam Port Authority.`, 'success');
  };

  const atRiskPlan = activePlans.find((p) => p.id === 'SHP-88214') || activePlans[0];
  const isRerouted = atRiskPlan?.status === 'Approved' || atRiskPlan?.laneNode?.includes('Cape');

  return (
    <div className="space-y-6">
      {/* 1. Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
              Pr AiiA Platform • Business Applications (SCM)
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded font-mono font-semibold bg-indigo-500/10 text-indigo-700 border border-indigo-200">
              SCM Engine v2.2
            </span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 mt-0.5">Supply Chain & Autonomous Logistics</h1>
          <p className="text-xs text-slate-600 mt-1 max-w-3xl">
            Demand sensing and supply planning that re-plans itself when the enterprise digital twin detects a disruption.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={handleBulkExport}
            className="px-3.5 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 shadow-xs transition"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export</span>
          </button>
          <button
            onClick={() => {
              setFormError('');
              setShowNewModal(true);
            }}
            className="px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition"
          >
            <Plus className="w-4 h-4" />
            <span>New supply plan</span>
          </button>
        </div>
      </div>

      {/* 2. Top KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs border-l-4 border-l-indigo-600">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Forecast Accuracy</span>
            <span className="font-mono text-slate-400">···</span>
          </div>
          <div className="text-3xl font-bold text-slate-900 mt-2 font-mono tracking-tight">91.3%</div>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 text-xs">
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
              ↑ +2.4 pts
            </span>
            <span className="text-[11px] text-slate-400">Blended POS & weather model</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs border-l-4 border-l-blue-600">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Fill Rate</span>
            <span className="font-mono text-slate-400">···</span>
          </div>
          <div className="text-3xl font-bold text-slate-900 mt-2 font-mono tracking-tight">97.1%</div>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 text-xs">
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
              ↑ +0.6 pts
            </span>
            <span className="text-[11px] text-slate-400">EMEA & APAC DCs</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs border-l-4 border-l-emerald-600">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Perfect Order Rate</span>
            <span className="font-mono text-slate-400">···</span>
          </div>
          <div className="text-3xl font-bold text-slate-900 mt-2 font-mono tracking-tight">93.8%</div>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 text-xs">
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
              ↑ +1.2 pts
            </span>
            <span className="text-[11px] text-slate-400">OTIF target: &gt;92.5%</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs border-l-4 border-l-amber-500">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Disrupted Lanes</span>
            <span className="font-mono text-slate-400">···</span>
          </div>
          <div className="text-3xl font-bold text-slate-900 mt-2 font-mono tracking-tight">
            {isRerouted ? '0 Active Disruption' : '1 At Risk'}
          </div>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 text-xs">
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
              {isRerouted ? '15 Auto-Rerouted' : '14 Auto-Rerouted'}
            </span>
            <span className="text-[11px] text-slate-400">Zero human lag</span>
          </div>
        </div>
      </div>

      {/* 3. Signature Workflow Box with Replay Simulation */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <h3 className="text-sm font-bold text-slate-900">Signature workflow • Autonomous Disruption Mitigation</h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Live path of a typical supply plan through SCM, digital twin dependency mapping, and Action Firewall
            </p>
          </div>
          <button
            onClick={handleReplaySimulation}
            disabled={isReplaying}
            className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition ${
              isReplaying
                ? 'bg-blue-50 text-blue-700 border-blue-200 cursor-wait'
                : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300'
            }`}
          >
            <Play className={`w-3.5 h-3.5 text-blue-600 ${isReplaying ? 'animate-spin' : ''}`} />
            <span>{isReplaying ? 'Simulating Workflow...' : 'Replay'}</span>
          </button>
        </div>

        {/* 5-Step Chevron Flow */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 pt-1">
          {workflowSteps.map((s, idx) => {
            const isCur = simulationStep === idx;
            const isPassed = simulationStep > idx || simulationStep === -1;
            return (
              <div
                key={s.num}
                className={`p-3 rounded-lg border text-xs transition duration-300 relative overflow-hidden ${
                  isCur
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md ring-2 ring-blue-400/50 scale-[1.02]'
                    : isPassed
                    ? 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                    : 'bg-white text-slate-400 border-slate-200 opacity-60'
                }`}
              >
                <div className={`font-mono text-[10px] font-bold ${isCur ? 'text-blue-100' : 'text-slate-400'}`}>
                  {s.num}
                </div>
                <div className={`font-semibold text-xs mt-0.5 ${isCur ? 'text-white' : 'text-slate-800'}`}>
                  {s.title}
                </div>
                <div className={`text-[10px] mt-1 line-clamp-2 leading-tight ${isCur ? 'text-blue-100' : 'text-slate-500'}`}>
                  {s.desc}
                </div>
              </div>
            );
          })}
        </div>

        {isReplaying && simulationStep >= 0 && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-900 flex items-center gap-2 animate-fade-in">
            <Activity className="w-4 h-4 text-blue-600 shrink-0 animate-pulse" />
            <div className="font-medium">
              <span className="font-bold">Active Engine State: </span>
              {workflowSteps[simulationStep]?.desc}
            </div>
          </div>
        )}
      </div>

      {/* 4. Split 2-Column Main Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (8 cols): Table with Tabs and Controls */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            {/* Sub-module Navigation Tabs */}
            <div className="flex border-b border-slate-200 bg-slate-50/50 px-3 pt-2 overflow-x-auto gap-1">
              {submodules.map((tab) => {
                const count = tab === 'All' ? activePlans.length : activePlans.filter((p) => p.submodule === tab).length;
                const isActive = activeSubTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveSubTab(tab)}
                    className={`px-3 py-2 text-xs font-semibold border-b-2 transition flex items-center gap-1.5 whitespace-nowrap ${
                      isActive
                        ? 'border-blue-600 text-blue-700 bg-white rounded-t-lg'
                        : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <span>{tab}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                        isActive ? 'bg-blue-100 text-blue-800 font-bold' : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Toolbar: Search & Status Filter */}
            <div className="p-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 bg-white">
              <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 w-full sm:w-80 focus-within:border-blue-500 focus-within:bg-white transition">
                <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Filter supply plans by ID, lane, carrier..."
                  className="bg-transparent text-xs text-slate-800 placeholder-slate-400 focus:outline-none w-full"
                />
                {search && (
                  <button onClick={() => setSearch('')} className="text-slate-400 hover:text-slate-600 text-xs">
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-500 font-medium">Status:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border border-slate-200 rounded-lg px-2.5 py-1.5 bg-white text-xs font-medium text-slate-700 focus:outline-none focus:border-blue-500"
                >
                  <option value="All">All Statuses</option>
                  <option value="At Risk">At Risk</option>
                  <option value="Approved">Approved</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Draft">Draft</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>

            {/* Bulk Action Bar (when records are selected) */}
            {selectedIds.size > 0 && (
              <div className="bg-slate-900 text-white px-4 py-2.5 flex items-center justify-between gap-3 text-xs animate-fade-in">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                  <span className="font-semibold">{selectedIds.size} supply plan{selectedIds.size > 1 ? 's' : ''} selected</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleBulkApprove}
                    className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-medium transition"
                  >
                    Approve
                  </button>
                  <button
                    onClick={handleBulkExport}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded font-medium border border-slate-700 transition"
                  >
                    Export
                  </button>
                  <button
                    onClick={() => setSelectedIds(new Set())}
                    className="px-2 py-1 text-slate-400 hover:text-white transition"
                  >
                    Clear
                  </button>
                </div>
              </div>
            )}

            {/* Plans Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-semibold uppercase text-slate-500 tracking-wider">
                    <th className="py-3 px-3 w-10 text-center">
                      <input
                        type="checkbox"
                        checked={filteredPlans.length > 0 && selectedIds.size === filteredPlans.length}
                        onChange={handleSelectAll}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        aria-label="Select all"
                      />
                    </th>
                    <th
                      onClick={() => handleSort('name')}
                      className="py-3 px-4 cursor-pointer hover:text-slate-800"
                    >
                      Record {sortField === 'name' && (sortAsc ? '↑' : '↓')}
                    </th>
                    <th
                      onClick={() => handleSort('laneNode')}
                      className="py-3 px-4 cursor-pointer hover:text-slate-800"
                    >
                      Lane / Node {sortField === 'laneNode' && (sortAsc ? '↑' : '↓')}
                    </th>
                    <th
                      onClick={() => handleSort('quantity')}
                      className="py-3 px-3 cursor-pointer hover:text-slate-800"
                    >
                      Quantity {sortField === 'quantity' && (sortAsc ? '↑' : '↓')}
                    </th>
                    <th
                      onClick={() => handleSort('eta')}
                      className="py-3 px-3 cursor-pointer hover:text-slate-800"
                    >
                      ETA {sortField === 'eta' && (sortAsc ? '↑' : '↓')}
                    </th>
                    <th
                      onClick={() => handleSort('status')}
                      className="py-3 px-3 cursor-pointer hover:text-slate-800"
                    >
                      Status {sortField === 'status' && (sortAsc ? '↑' : '↓')}
                    </th>
                    <th className="py-3 px-3">Evidence</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredPlans.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-12 text-center text-slate-400">
                        <Truck className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                        <p className="text-sm font-medium text-slate-600">No supply chain records match filter criteria</p>
                        <p className="text-xs text-slate-400 mt-1">Try resetting search or status filters.</p>
                      </td>
                    </tr>
                  ) : (
                    filteredPlans.map((p) => {
                      const isSelected = selectedIds.has(p.id);
                      const initials = p.name
                        .replace(/[^A-Za-z0-9 ]/g, '')
                        .split(' ')
                        .filter(Boolean)
                        .slice(0, 2)
                        .map((w) => w[0])
                        .join('')
                        .toUpperCase();

                      return (
                        <tr
                          key={p.id}
                          onClick={() => setSelectedDrawerPlan(p)}
                          className={`hover:bg-slate-50/80 cursor-pointer transition ${
                            isSelected ? 'bg-blue-50/50' : ''
                          }`}
                        >
                          <td className="py-3 px-3 text-center" onClick={(e) => handleToggleRow(p.id, e)}>
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => {}}
                              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                            />
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2.5">
                              <span className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold text-[10px] flex items-center justify-center shrink-0">
                                {initials || 'SP'}
                              </span>
                              <div>
                                <div className="font-semibold text-slate-900 text-xs hover:text-blue-600 transition">
                                  {p.name}
                                </div>
                                <div className="font-mono text-[10px] text-slate-400">{p.id}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-medium text-slate-800">{p.laneNode}</div>
                            <div className="text-[11px] text-slate-400">{p.carrier}</div>
                          </td>
                          <td className="py-3 px-3 font-mono font-medium text-slate-700 whitespace-nowrap">
                            {p.quantity}
                          </td>
                          <td className="py-3 px-3 font-medium text-slate-600 whitespace-nowrap">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-slate-400" />
                              <span>{p.eta}</span>
                            </div>
                          </td>
                          <td className="py-3 px-3 whitespace-nowrap">
                            <StatusBadge status={p.status} />
                          </td>
                          <td className="py-3 px-3 whitespace-nowrap">
                            {p.agentTouched ? (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedDrawerPlan(p);
                                }}
                                title="Chain of Evidence: Agent → Model → Data → Policy → Approval → Outcome"
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-[10px] font-semibold border border-indigo-200 transition"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                                <span>COE ✓</span>
                              </button>
                            ) : (
                              <span className="text-slate-400 text-[11px]">Human</span>
                            )}
                          </td>
                          <td className="py-3 px-3 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-end gap-1">
                              <button
                                onClick={() => onOpenPlan(p.id)}
                                className="p-1.5 rounded hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition"
                                title="Open full record"
                              >
                                <ChevronRight className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="px-4 py-3 bg-slate-50/50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <span>
                Showing 1–{filteredPlans.length} of {activePlans.length} supply plans
              </span>
              <div className="flex items-center gap-1">
                <button
                  disabled
                  className="px-2.5 py-1 rounded border border-slate-200 bg-white text-slate-300 text-xs"
                >
                  ‹ Prev
                </button>
                <button className="px-2.5 py-1 rounded bg-blue-600 text-white font-semibold text-xs shadow-xs">
                  1
                </button>
                <button
                  disabled
                  className="px-2.5 py-1 rounded border border-slate-200 bg-white text-slate-300 text-xs"
                >
                  Next ›
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Embedded Agents & Disruption Sentinel */}
        <div className="lg:col-span-4 space-y-4">
          {/* Active Disruption Sentinel */}
          <div
            className={`border rounded-xl p-4 shadow-xs space-y-3 transition ${
              isRerouted
                ? 'bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-300'
                : 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200/80'
            }`}
          >
            <div className="flex items-start gap-2.5">
              <div
                className={`p-2 rounded-lg text-white shrink-0 mt-0.5 ${
                  isRerouted ? 'bg-emerald-600' : 'bg-amber-500'
                }`}
              >
                {isRerouted ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
              </div>
              <div>
                <h4
                  className={`text-xs font-bold uppercase tracking-wider ${
                    isRerouted ? 'text-emerald-950' : 'text-amber-950'
                  }`}
                >
                  {isRerouted ? 'Chokepoint Disruption Resolved' : 'Chokepoint Disruption Sentinel'}
                </h4>
                <p className={`text-xs mt-1 leading-relaxed ${isRerouted ? 'text-emerald-800' : 'text-amber-800'}`}>
                  {isRerouted ? (
                    <span>
                      <span className="font-semibold text-emerald-950">SHP-88214</span> successfully rerouted via Cape of Good Hope. Suez delay bypassed.
                    </span>
                  ) : (
                    <span>
                      <span className="font-semibold text-amber-950">SHP-88214 (Ocean Shanghai → Rotterdam)</span> delayed +4 days due to Suez congestion.
                    </span>
                  )}
                </p>
              </div>
            </div>
            <div
              className={`p-2.5 rounded-lg border text-xs space-y-1 ${
                isRerouted ? 'bg-white/90 border-emerald-200 text-slate-800' : 'bg-white/80 border-amber-200 text-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-slate-500">Handling Agent:</span>
                <span className="font-semibold text-indigo-700">Logistics Rerouter (AGT-SCM-03)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-slate-500">Routing Status:</span>
                <span className={`font-mono text-[11px] font-semibold ${isRerouted ? 'text-emerald-700' : 'text-slate-800'}`}>
                  {isRerouted ? 'Cape of Good Hope Route (Active)' : 'Cape Contingency Plan Prepared'}
                </span>
              </div>
            </div>
            <button
              onClick={() => handleAuthorizeReroute('SHP-88214')}
              className={`w-full py-2 px-3 rounded-lg text-white text-xs font-semibold shadow-xs flex items-center justify-center gap-1.5 transition ${
                isRerouted
                  ? 'bg-emerald-600 hover:bg-emerald-700'
                  : 'bg-amber-600 hover:bg-amber-700'
              }`}
            >
              {isRerouted ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Reroute Authorized & Synchronized</span>
                </>
              ) : (
                <>
                  <Zap className="w-3.5 h-3.5" />
                  <span>Authorize Cape Contingency Reroute</span>
                </>
              )}
            </button>
          </div>

          {/* Embedded Agents Card */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Embedded SCM Agents</h3>
                <p className="text-[11px] text-slate-500 mt-0.5">{activeAgents.length} active digital workers</p>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
                Autonomous SCM
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
                    <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">{ag.role}</p>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-100">
                      <span>{ag.status} • {ag.owner}</span>
                      <span className="font-mono text-slate-600">{ag.actionsWeek} ops/wk</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 5. Quick Drawer for Record Inspection */}
      {selectedDrawerPlan && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={() => setSelectedDrawerPlan(null)}
          />
          <div className="relative w-full max-w-lg bg-white shadow-2xl h-full flex flex-col z-10 animate-slide-left">
            {/* Drawer Header */}
            <div className="p-5 border-b border-slate-200 flex items-start justify-between bg-slate-50/50">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-semibold text-xs text-blue-600">{selectedDrawerPlan.id}</span>
                  <StatusBadge status={selectedDrawerPlan.status} />
                </div>
                <h3 className="text-base font-bold text-slate-900 mt-1">{selectedDrawerPlan.name}</h3>
                <p className="text-xs text-slate-500 mt-0.5">Sub-module: {selectedDrawerPlan.submodule}</p>
              </div>
              <button
                onClick={() => setSelectedDrawerPlan(null)}
                className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5 text-xs">
              {/* Core Attributes List */}
              <div className="space-y-2">
                <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Fulfillment & Route</h4>
                <div className="bg-slate-50 rounded-lg p-3 space-y-2 border border-slate-200">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Lane / Node:</span>
                    <span className="font-semibold text-slate-800">{selectedDrawerPlan.laneNode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Quantity:</span>
                    <span className="font-mono font-semibold text-slate-800">{selectedDrawerPlan.quantity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Carrier:</span>
                    <span className="font-medium text-slate-800">{selectedDrawerPlan.carrier}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">ETA:</span>
                    <span className="font-semibold text-slate-800">{selectedDrawerPlan.eta}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Handled by:</span>
                    <span className="font-medium text-indigo-700">
                      {selectedDrawerPlan.agentTouched ? `${selectedDrawerPlan.handlingAgent} (Digital Worker)` : 'Human team'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Chain of Evidence Pipeline Box */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Chain of Evidence</h4>
                  <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200 font-semibold">
                    Hash Verified
                  </span>
                </div>

                {selectedDrawerPlan.agentTouched ? (
                  <div className="bg-slate-900 text-slate-200 rounded-xl p-4 space-y-3 font-mono text-[11px]">
                    <div className="grid grid-cols-6 gap-1 text-center pb-2 border-b border-slate-800 text-[10px]">
                      <div>
                        <div className="font-bold text-blue-400">Agent</div>
                        <div className="text-slate-400 text-[9px] truncate">{selectedDrawerPlan.handlingAgent}</div>
                      </div>
                      <div>
                        <div className="font-bold text-purple-400">Model</div>
                        <div className="text-slate-400 text-[9px]">nexora-3.2</div>
                      </div>
                      <div>
                        <div className="font-bold text-indigo-400">Data</div>
                        <div className="text-slate-400 text-[9px]">AIS Telemetry</div>
                      </div>
                      <div>
                        <div className="font-bold text-amber-400">Policy</div>
                        <div className="text-slate-400 text-[9px]">POL-SCM-14</div>
                      </div>
                      <div>
                        <div className="font-bold text-emerald-400">Approval</div>
                        <div className="text-slate-400 text-[9px]">FW 8/8</div>
                      </div>
                      <div>
                        <div className="font-bold text-cyan-400">Outcome</div>
                        <div className="text-slate-400 text-[9px]">{selectedDrawerPlan.status}</div>
                      </div>
                    </div>

                    <div className="space-y-1.5 text-xs font-sans">
                      <div className="flex justify-between text-slate-400">
                        <span>Evidence Hash:</span>
                        <span className="font-mono text-[11px] text-slate-300">{selectedDrawerPlan.evidenceHash}</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>Action Firewall:</span>
                        <span className="text-emerald-400 font-semibold">8/8 checks passed</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>Decision Note:</span>
                        <span className="text-slate-300">Auto-approved within L3 autonomy guardrails</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center text-slate-500">
                    <p className="font-semibold text-slate-700">Handled by Human Operators</p>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Assign an embedded SCM agent to initiate automatic Chain of Evidence telemetry capture.
                    </p>
                  </div>
                )}
              </div>

              {/* Anomaly & Risk Analysis */}
              {selectedDrawerPlan.riskReason && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg space-y-1">
                  <div className="font-bold text-amber-900 text-xs">SCM Twin Risk Telemetry</div>
                  <p className="text-amber-800 text-[11px]">{selectedDrawerPlan.riskReason}</p>
                </div>
              )}
            </div>

            {/* Drawer Footer Actions */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-2">
              <button
                onClick={() => {
                  setSelectedDrawerPlan(null);
                  onOpenPlan(selectedDrawerPlan.id);
                }}
                className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs transition"
              >
                <span>Open Full Record</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    handleAuthorizeReroute(selectedDrawerPlan.id);
                  }}
                  className="px-3 py-2 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg text-slate-700 text-xs font-medium"
                >
                  Approve / Reroute
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. Agent Governance Inspector Modal */}
      {inspectingAgent && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl border border-slate-200 p-6 max-w-md w-full space-y-4 text-xs animate-scale-up shadow-2xl">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700 font-bold">
                  {inspectingAgent.name.slice(0, 2)}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{inspectingAgent.name}</h3>
                  <p className="text-[11px] text-slate-500 font-mono">{inspectingAgent.id} • {inspectingAgent.autonomyLevel}</p>
                </div>
              </div>
              <button
                onClick={() => setInspectingAgent(null)}
                className="p-1 rounded hover:bg-slate-100 text-slate-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-slate-600 text-xs leading-relaxed">{inspectingAgent.role}</p>

            <div className="bg-slate-50 rounded-lg p-3 space-y-2 border border-slate-200">
              <div className="flex justify-between">
                <span className="text-slate-500">Accountable Human Owner:</span>
                <span className="font-semibold text-slate-800">{inspectingAgent.owner}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Autonomy Tier:</span>
                <span className="font-medium text-slate-800">{inspectingAgent.autonomyLabel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Weekly Throughput:</span>
                <span className="font-mono font-semibold text-slate-800">{inspectingAgent.actionsWeek} actions</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Human Approval Rate:</span>
                <span className="font-mono font-semibold text-emerald-700">{inspectingAgent.approvalRate}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Firewall Sentinel Status:</span>
                <span className={`font-semibold ${inspectingAgent.status === 'Active' ? 'text-emerald-700' : 'text-amber-700'}`}>
                  {inspectingAgent.status === 'Active' ? 'Active within Guardrails' : 'Paused by Operator'}
                </span>
              </div>
            </div>

            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-slate-700 space-y-1">
              <div className="font-semibold text-blue-900 text-[11px]">Latest Verified Action:</div>
              <div className="text-[11px] text-blue-800">{inspectingAgent.recentAction}</div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => {
                  setInspectingAgent(null);
                  navigateToRecord('ai-workforce', inspectingAgent.id);
                }}
                className="px-3 py-1.5 text-blue-600 hover:underline font-semibold"
              >
                View in AI Workforce Directory →
              </button>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setInspectingAgent(null)}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-50"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => handleToggleAgentStatus(inspectingAgent.name)}
                  className={`px-4 py-1.5 rounded-lg font-semibold text-white shadow-xs ${
                    inspectingAgent.status === 'Active' ? 'bg-amber-600 hover:bg-amber-700' : 'bg-emerald-600 hover:bg-emerald-700'
                  }`}
                >
                  {inspectingAgent.status === 'Active' ? 'Pause Agent' : 'Resume Agent'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 7. New Supply Plan Modal */}
      {showNewModal && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl border border-slate-200 p-6 max-w-lg w-full space-y-4 text-xs shadow-2xl animate-scale-up">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Create New Supply Plan</h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Created supply chain records are registered in the Digital Twin and tracked through Action Firewall.
                </p>
              </div>
              <button onClick={() => setShowNewModal(false)} className="p-1 rounded text-slate-400 hover:bg-slate-100">
                <X className="w-4 h-4" />
              </button>
            </div>

            {formError && (
              <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 font-medium">
                {formError}
              </div>
            )}

            <form onSubmit={handleCreatePlan} noValidate className="space-y-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Plan / Shipment Title *</label>
                <input
                  type="text"
                  value={newPlan.name}
                  onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
                  placeholder="e.g. Weekly supply plan — Americas or Air — Penang → Dallas"
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Lane / Fulfillment Node *</label>
                  <input
                    type="text"
                    value={newPlan.laneNode}
                    onChange={(e) => setNewPlan({ ...newPlan, laneNode: e.target.value })}
                    placeholder="e.g. Dallas Fort Worth DC · 12 TEU"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Quantity</label>
                  <input
                    type="text"
                    value={newPlan.quantity}
                    onChange={(e) => setNewPlan({ ...newPlan, quantity: e.target.value })}
                    placeholder="e.g. 14,200 units"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Sub-module</label>
                  <select
                    value={newPlan.submodule}
                    onChange={(e) => setNewPlan({ ...newPlan, submodule: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 bg-white text-xs focus:outline-none focus:border-blue-500"
                  >
                    <option value="Demand Planning">Demand Planning</option>
                    <option value="Supply Planning">Supply Planning</option>
                    <option value="Logistics">Logistics</option>
                    <option value="Inventory">Inventory</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Estimated ETA</label>
                  <input
                    type="text"
                    value={newPlan.eta}
                    onChange={(e) => setNewPlan({ ...newPlan, eta: e.target.value })}
                    placeholder="e.g. Nov 14"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Logistics Carrier</label>
                  <input
                    type="text"
                    value={newPlan.carrier}
                    onChange={(e) => setNewPlan({ ...newPlan, carrier: e.target.value })}
                    placeholder="e.g. Kuehne+Nagel or DHL"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Assign to Agent</label>
                  <select
                    value={newPlan.assignedAgent}
                    onChange={(e) => setNewPlan({ ...newPlan, assignedAgent: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 bg-white text-xs focus:outline-none focus:border-blue-500"
                  >
                    {activeAgents.map((a) => (
                      <option key={a.id} value={a.name}>
                        {a.name} ({a.autonomyLevel})
                      </option>
                    ))}
                    <option value="Human team">Human team</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-xs"
                >
                  Create supply plan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function SupplyChainDetailScreen({
  plan,
  plans,
  agents,
  onBack,
  navigateToRecord,
  setAppState,
  notify,
  requestConfirmation
}) {
  if (!plan) {
    return (
      <div className="bg-white p-8 rounded-xl border border-slate-200 text-center space-y-3">
        <p className="text-slate-600 text-sm font-semibold">Supply chain record not found.</p>
        <button onClick={onBack} className="px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold">
          Return to Supply Chain
        </button>
      </div>
    );
  }

  const assignedAgentObj = agents.find((a) => a.name === plan.handlingAgent);
  const relatedPlans = plans.filter((p) => p.id !== plan.id).slice(0, 3);

  const handleApprove = () => {
    setAppState((prev) => {
      const base = Array.isArray(prev.supplyChainPlans) && prev.supplyChainPlans.length > 0
        ? prev.supplyChainPlans
        : (plans || DEFAULT_SUPPLY_CHAIN_PLANS);
      return {
        ...prev,
        supplyChainPlans: base.map((p) =>
          p.id === plan.id ? { ...p, status: 'Approved' } : p
        ),
        auditLog: [
          {
            id: `AUD-APP-${Math.floor(1000 + Math.random() * 9000)}`,
            actor: 'CISO & VP Enterprise Operations',
            action: `Approved SCM Plan ${plan.id} (${plan.name}) via Action Firewall.`,
            time: 'Just now',
            status: 'Authorized'
          },
          ...(prev.auditLog || [])
        ]
      };
    });
    notify(`Approved ${plan.id} — logged to Chain of Evidence and Digital Twin.`, 'success');
  };

  const handleEscalate = () => {
    setAppState((prev) => {
      const base = Array.isArray(prev.supplyChainPlans) && prev.supplyChainPlans.length > 0
        ? prev.supplyChainPlans
        : (plans || DEFAULT_SUPPLY_CHAIN_PLANS);
      return {
        ...prev,
        supplyChainPlans: base.map((p) =>
          p.id === plan.id ? { ...p, status: 'At Risk' } : p
        ),
        auditLog: [
          {
            id: `AUD-ESC-${Math.floor(1000 + Math.random() * 9000)}`,
            actor: 'Operations Control Tower',
            action: `Escalated ${plan.id} to SCM Director queue for human intervention.`,
            time: 'Just now',
            status: 'Escalated'
          },
          ...(prev.auditLog || [])
        ]
      };
    });
    notify(`Escalated ${plan.id} to VP Supply Chain & Director of Logistics.`, 'info');
  };

  const workflowSteps = ['01 Demand signal', '02 Forecast update', '03 Supply plan', '04 Purchase orders', '05 Production orders'];
  const curStep = plan.status === 'Approved' ? 3 : plan.status === 'Delivered' ? 4 : plan.status === 'In Progress' ? 2 : 1;

  return (
    <div className="space-y-6">
      {/* 1. Breadcrumbs & Top Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <button onClick={onBack} className="hover:underline text-blue-600 font-medium">
                Supply Chain
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span>{plan.submodule}</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-mono font-semibold text-slate-700">{plan.id}</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 mt-0.5">{plan.name}</h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <StatusBadge status={plan.status} />
          <button
            onClick={handleEscalate}
            className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium"
          >
            Escalate
          </button>
          {plan.status !== 'Approved' && (
            <button
              onClick={handleApprove}
              className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs"
            >
              Approve Plan
            </button>
          )}
        </div>
      </div>

      {/* 2. Signature Workflow Position Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-2">
        <div className="text-xs font-semibold text-slate-700">Signature Workflow Lifecycle Position</div>
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
        {/* Left Column (8 cols): Specs, Evidence & Timeline */}
        <div className="lg:col-span-8 space-y-6">
          {/* Specifications Card */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="px-5 py-3.5 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Fulfillment Node & Logistics Specifications
              </span>
              <span className="font-mono text-xs text-slate-500">{plan.id}</span>
            </div>
            <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-slate-400 text-[11px]">Lane / Destination Node:</span>
                <p className="font-semibold text-slate-900">{plan.laneNode}</p>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 text-[11px]">Consignment Quantity:</span>
                <p className="font-mono font-semibold text-slate-900">{plan.quantity}</p>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 text-[11px]">Logistics Carrier & Partner:</span>
                <p className="font-medium text-slate-800">{plan.carrier}</p>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 text-[11px]">Estimated Time of Arrival (ETA):</span>
                <p className="font-semibold text-slate-800">{plan.eta}</p>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 text-[11px]">Transport Mode:</span>
                <p className="font-medium text-slate-800">{plan.mode}</p>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 text-[11px]">Sub-module:</span>
                <p className="font-medium text-slate-800">{plan.submodule}</p>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 text-[11px]">Tenant Domain:</span>
                <p className="font-medium text-slate-800">Apex Global Financial — SCM Enclave</p>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 text-[11px]">Governance Policy Binding:</span>
                <p className="font-mono font-medium text-indigo-700">{plan.policy}</p>
              </div>
            </div>

            {/* Cross-Module Golden Thread Linkage */}
            <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2 text-slate-600">
                <Compass className="w-3.5 h-3.5 text-blue-600" />
                <span>Connected Golden Thread Entity:</span>
                <button
                  onClick={() => navigateToRecord('incident-detail', plan.linkedIncident)}
                  className="font-mono font-semibold text-blue-600 hover:underline"
                >
                  {plan.linkedIncident}
                </button>
                <span className="text-slate-400">•</span>
                <button
                  onClick={() => navigateToRecord('endpoint-detail', plan.linkedDevice)}
                  className="font-mono font-semibold text-blue-600 hover:underline"
                >
                  {plan.linkedDevice}
                </button>
              </div>
              <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Digital Twin Synced
              </span>
            </div>
          </div>

          {/* Chain of Evidence Card */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Cryptographic Chain of Evidence
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  End-to-end immutability record registered with the Action Firewall
                </p>
              </div>
              <span className="font-mono text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-semibold">
                Evidence ID: {plan.evidenceHash}
              </span>
            </div>

            <div className="bg-slate-900 text-slate-200 rounded-xl p-4 space-y-3 font-mono text-xs">
              <div className="grid grid-cols-6 gap-2 text-center pb-3 border-b border-slate-800 text-[11px]">
                <div>
                  <div className="font-bold text-blue-400">Agent</div>
                  <div className="text-slate-400 text-[10px] truncate">{plan.handlingAgent}</div>
                </div>
                <div>
                  <div className="font-bold text-purple-400">Model</div>
                  <div className="text-slate-400 text-[10px]">nexora-3.2</div>
                </div>
                <div>
                  <div className="font-bold text-indigo-400">Context</div>
                  <div className="text-slate-400 text-[10px]">4 Twin Nodes</div>
                </div>
                <div>
                  <div className="font-bold text-amber-400">Policy</div>
                  <div className="text-slate-400 text-[10px]">{plan.policy}</div>
                </div>
                <div>
                  <div className="font-bold text-emerald-400">Firewall</div>
                  <div className="text-slate-400 text-[10px]">8/8 Checked</div>
                </div>
                <div>
                  <div className="font-bold text-cyan-400">Outcome</div>
                  <div className="text-slate-400 text-[10px]">{plan.status}</div>
                </div>
              </div>

              <div className="space-y-1 font-sans text-xs text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Pre-execution Impact Assessment:</span>
                  <span className="font-semibold text-emerald-400">Zero Critical Chokepoint Risk</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Action Firewall Nonce:</span>
                  <span className="font-mono text-[11px] text-slate-400">0x8f2a994c1002bba4</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Audit Status:</span>
                  <span className="text-emerald-400 font-semibold">Live Ingestion to GRC Evidence Library</span>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline of Sensor & Plan Events */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Real-Time Supply Chain Activity & Telemetry Log
            </h3>
            <div className="space-y-3 text-xs">
              <div className="flex gap-3 items-start">
                <div className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                <div className="flex-1">
                  <div className="font-semibold text-slate-900">Supply Plan {plan.id} registered in Digital Twin</div>
                  <div className="text-slate-500 text-[11px]">09:12:04 UTC • System Orchestrator</div>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <div className="w-2 h-2 rounded-full bg-indigo-600 mt-1.5 shrink-0" />
                <div className="flex-1">
                  <div className="font-semibold text-slate-900">
                    {plan.handlingAgent} enriched plan with AIS maritime & hub queue telemetry
                  </div>
                  <div className="text-slate-500 text-[11px]">09:12:06 UTC • Autonomous Agent</div>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <div className="w-2 h-2 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                <div className="flex-1">
                  <div className="font-semibold text-slate-900">
                    Action Firewall 8/8 checks passed under Policy {plan.policy}
                  </div>
                  <div className="text-slate-500 text-[11px]">09:12:09 UTC • AI Action Firewall</div>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <div className="w-2 h-2 rounded-full bg-cyan-600 mt-1.5 shrink-0" />
                <div className="flex-1">
                  <div className="font-semibold text-slate-900">Status marked {plan.status}</div>
                  <div className="text-slate-500 text-[11px]">09:14:31 UTC • SCM Control Plane</div>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <div className="w-2 h-2 rounded-full bg-purple-600 mt-1.5 shrink-0" />
                <div className="flex-1">
                  <div className="font-semibold text-slate-900">Evidence recorded in Immutable Ledger (EV-{plan.evidenceHash.slice(0, 6)})</div>
                  <div className="text-slate-500 text-[11px]">09:14:32 UTC • GRC Evidence Service</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Assigned Agent & Related Records */}
        <div className="lg:col-span-4 space-y-5">
          {/* Assigned Digital Worker */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4 space-y-3">
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">Handling Digital Worker</div>
            {assignedAgentObj ? (
              <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{assignedAgentObj.name}</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-700 font-bold">
                    {assignedAgentObj.autonomyLevel}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">{assignedAgentObj.role}</p>
                <div className="pt-2 border-t border-slate-200 text-[11px] space-y-1 text-slate-600">
                  <div className="flex justify-between">
                    <span>Owner:</span>
                    <span className="font-semibold text-slate-800">{assignedAgentObj.owner}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Approval Rate:</span>
                    <span className="font-mono text-emerald-700 font-semibold">{assignedAgentObj.approvalRate}%</span>
                  </div>
                </div>
                <button
                  onClick={() => navigateToRecord('ai-workforce', assignedAgentObj.id)}
                  className="w-full mt-2 py-1.5 rounded border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium"
                >
                  Inspect in AI Workforce →
                </button>
              </div>
            ) : (
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-500">
                Handled by human logistics specialists.
              </div>
            )}
          </div>

          {/* Related Records */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4 space-y-3">
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">Related Supply Plans</div>
            <div className="space-y-2">
              {relatedPlans.map((r) => (
                <button
                  key={r.id}
                  onClick={() => navigateToRecord('supply-chain-detail', r.id)}
                  className="w-full text-left p-2.5 rounded-lg border border-slate-100 hover:border-slate-300 hover:bg-slate-50 transition text-xs block"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-800 truncate">{r.name}</span>
                    <StatusBadge status={r.status} />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
                    <span>{r.laneNode}</span>
                    <span className="font-mono">{r.quantity}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


// ============================================================================
// CONNECTED DOMAIN VIEWS FOR REMAINING PLATFORM & GRC MODULES
// ============================================================================

const MODULE_CONFIGS = {
  aiops: {
    category: 'Pr AiiA Platform',
    title: 'IT Operations & Self-Healing (AIOps)',
    desc: 'Autonomous service dependency mapping, predictive anomaly detection, and ring-0 sensor self-healing playbooks.',
    kpi1: ['99.98%', 'Core Service Availability'],
    kpi2: ['1,420', 'Self-Healing Executions (30d)'],
    kpi3: ['18 sec', 'Mean Time to Detect (MTTD)'],
    records: [
      { id: 'HEAL-901', name: 'Pr-Sensor Ring-0 Daemon Watchdog & Auto-Restart', target: 'END-FIN-094', status: 'Linked to REM-2026-309', owner: 'AGT-02 (Self-Healing Agent)' },
      { id: 'HEAL-884', name: 'Frankfurt ZTNA Edge Gateway BGP Failover', target: 'END-EU-412', status: 'Active & Healthy', owner: 'AGT-02 (Self-Healing Agent)' },
      { id: 'HEAL-871', name: 'Kubernetes Ingress Memory Pressure Auto-Scale', target: 'EKS-PROD-US01', status: 'Verified', owner: 'AGT-02 (Self-Healing Agent)' }
    ]
  },
  assets: {
    category: 'Pr AiiA Platform',
    title: 'Hardware, Software Asset & Cloud Spend Management',
    desc: 'Unified CMDB, autonomous software license harvesting, FinOps cloud optimization, and hardware lifecycle tracking.',
    kpi1: ['$4.2M', 'Annualized SaaS & Cloud Savings'],
    kpi2: ['100%', 'CMDB to Endpoint Reconciliation'],
    kpi3: ['342', 'Unused Licenses Reclaimed'],
    records: [
      { id: 'AST-FIN-094', name: 'Apple MacBook Pro 16" M3 Max (Tier-1 Executive Asset)', target: 'END-FIN-094', status: 'Assigned: Elena Rostova', owner: 'Global Finance IT' },
      { id: 'LIC-BLOOM-26', name: 'Bloomberg Terminal Enterprise Seat Subscription', target: 'END-FIN-094', status: 'Active & Compliant', owner: 'Treasury Procurement' },
      { id: 'AST-ERP-019', name: 'AWS i4i.4xlarge Production SAP HANA Node', target: 'SRV-PROD-019', status: 'Reserved Instance (Optimal)', owner: 'FinOps Governance' }
    ]
  },
  'zero-trust': {
    category: 'Pr AiiA Platform',
    title: 'Secure Access & Zero Trust Network Architecture (ZTNA)',
    desc: 'Continuous posture-based conditional access, micro-segmentation, and device-health-gated application tunnels.',
    kpi1: ['4,820', 'Active Mutual-TLS Tunnels'],
    kpi2: ['Conditional', 'Posture-Gated Access Policy'],
    kpi3: ['0', 'Lateral Movement Breaches'],
    records: [
      { id: 'ZTP-FIN-01', name: 'Treasury Settlement Enclave Conditional Access Gate', target: 'END-FIN-094', status: 'Requires Kernel 15.3.2-sec1', owner: 'NetSec Zero Trust' },
      { id: 'ZTP-EU-04', name: 'Frankfurt Fixed Income Low-Latency mTLS Mesh', target: 'END-EU-412', status: 'Rerouted via DE-FRA-01', owner: 'AGT-02' }
    ]
  },
  esm: {
    category: 'Pr AiiA Platform',
    title: 'Enterprise & Customer Service Management (ESM)',
    desc: 'Cross-departmental HR, Legal, Facilities, Treasury, and Executive concierge workflows powered by L1 AI agents.',
    kpi1: ['84%', 'Autonomous L1 Deflection Rate'],
    kpi2: ['4.9 / 5.0', 'Employee CSAT Score'],
    kpi3: ['< 45 sec', 'Executive VIP Response SLA'],
    records: [
      { id: 'VIP-REQ-402', name: 'Executive Finance Workstation Continuity & Loaner Standby', target: 'INC-2026-8842', status: 'Coordinated by AGT-01', owner: 'VIP Concierge Desk' },
      { id: 'HR-ONB-918', name: 'Zero-Touch Quantitative Analyst Onboarding Bundle', target: 'END-CORP-208', status: 'Completed', owner: 'PeopleOps Automation' }
    ]
  },
  portfolio: {
    category: 'Pr AiiA Platform',
    title: 'Strategic Portfolio & Transformation Management',
    desc: 'Align enterprise IT, SecOps, and compliance initiatives with board-level OKRs, capital budgets, and risk reduction.',
    kpi1: ['14 Active', 'Strategic Security & AI Programs'],
    kpi2: ['96%', 'On-Schedule Milestone Delivery'],
    kpi3: ['3.8x', 'Verified Automation ROI'],
    records: [
      { id: 'PRG-2026-01', name: 'Zero-Downtime Autonomous Kernel Patching Initiative', target: 'REM-2026-309', status: 'On Track', owner: 'Marcus Vance (CISO)' },
      { id: 'PRG-2026-04', name: 'Continuous FedRAMP High & NIST Rev 5 Automation', target: 'SI-2 / IR-4', status: '98% Complete', owner: 'Helena Vance (GRC)' }
    ]
  },
  'build-extend': {
    category: 'Pr AiiA Platform',
    title: 'Build & Extend (Low-Code Workflow & Agent Studio)',
    desc: 'Design custom multi-agent playbooks, webhook integrations, and constitutional AI Action Firewall policies.',
    kpi1: ['48', 'Custom Enterprise Playbooks'],
    kpi2: ['100%', 'Sandboxed Policy Validation'],
    kpi3: ['24 Connectors', 'CrowdStrike, Vault, SAP, Okta'],
    records: [
      { id: 'FLW-GOLDEN-01', name: 'IT Ticket → Endpoint → CVE → AI Firewall → Remediation → GRC Attest', target: 'INC-2026-8842', status: 'Active Production Flow', owner: 'Platform Architecture' },
      { id: 'POL-AI-04', name: 'Tier-1 Executive Asset Human-in-the-Loop Firewall Rule', target: 'FW-REQ-9921', status: 'Enforcing', owner: 'AGT-08 (Supervisor)' }
    ]
  },
  'fed-nist': {
    category: 'Pr AiiA GRC',
    title: 'Federal Authorization, NIST RMF & Continuous ATO (cATO)',
    desc: 'Automated System Security Plan (SSP) generation, OSCAL export, and real-time Plan of Action & Milestones (POA&M).',
    kpi1: ['FedRAMP High', 'Authorization Baseline'],
    kpi2: ['OSCAL 1.1', 'Machine-Readable Package Ready'],
    kpi3: ['Real-Time', 'ConMon Telemetry Feed'],
    records: [
      { id: 'POAM-2026-112', name: 'NIST SP 800-53 SI-2 Flaw Remediation on END-FIN-094', target: 'CVE-2026-4109', status: 'Linked to EVD-2026-7741', owner: 'Helena Vance (AO)' },
      { id: 'SSP-NIST-2026', name: 'Apex Global System Security Plan (OSCAL JSON)', target: 'SI-2 / IR-4 / SC-7', status: 'Auto-Updated Today', owner: 'AGT-07 (Compliance Analyst)' }
    ]
  },
  'policy-reg': {
    category: 'Pr AiiA GRC',
    title: 'Compliance, Corporate Policy & Regulatory Change Management',
    desc: 'Horizon scanning for SEC, DORA, NIS2, and CISA directives with automated mapping to internal controls.',
    kpi1: ['100%', 'SEC & DORA Directive Coverage'],
    kpi2: ['19 Policies', 'Cryptographically Enforced'],
    kpi3: ['0', 'Unmapped Regulatory Mandates'],
    records: [
      { id: 'POL-AI-04', name: 'Autonomous AI Execution & Human Sign-Off Policy', target: 'FW-REQ-9921', status: 'Active & Enforced', owner: 'CISO & General Counsel' },
      { id: 'REG-CISA-KEV', name: '24-Hour Critical Zero-Day Remediation Mandate', target: 'CVE-2026-4109', status: 'Tracked via REM-2026-309', owner: 'SecOps Governance' }
    ]
  },
  'risk-mgmt': {
    category: 'Pr AiiA GRC',
    title: 'Enterprise & Cyber Risk Quantification (FAIR / Monte Carlo)',
    desc: 'Live risk register dynamically scored from real-time endpoint vulnerabilities, threat telemetry, and control posture.',
    kpi1: ['Low-Mod', 'Residual Cyber Risk Appetite'],
    kpi2: ['$8.4M', 'Avoided Loss via Auto-Patching'],
    kpi3: ['12 Tracked', 'Board-Level Risk Scenarios'],
    records: [
      { id: 'RSK-2026-09', name: 'Zero-Day Kernel Compromise on Executive Treasury Endpoints', target: 'CVE-2026-4109 / END-FIN-094', status: 'Mitigating via REM-2026-309', owner: 'Marcus Vance (CISO)' },
      { id: 'RSK-2026-14', name: 'Autonomous AI Agent Unintended Production Modification', target: 'POL-AI-04 / FW-REQ-9921', status: 'Controlled by AI Firewall', owner: 'AI Risk Committee' }
    ]
  },
  'third-party': {
    category: 'Pr AiiA GRC',
    title: 'Third-Party Risk (TPRM), Audit Readiness & Operational Resilience',
    desc: 'Continuous vendor SBOM monitoring, SIG/SOC2 ingestion, and fourth-party supply chain blast-radius mapping.',
    kpi1: ['214', 'Monitored Critical Vendors'],
    kpi2: ['100%', 'Tier-1 Vendors SOC 2 Verified'],
    kpi3: ['< 15 mins', 'Supply Chain CVE Correlation'],
    records: [
      { id: 'VND-APPLE-01', name: 'Apple Enterprise OS & XNU Security Advisory Feed', target: 'CVE-2026-4109', status: 'Hotfix Verified', owner: 'Supply Chain SecOps' },
      { id: 'VND-BLOOM-02', name: 'Bloomberg L.P. Treasury Workstation Enclave', target: 'END-FIN-094', status: 'Compliant', owner: 'TPRM Lead' }
    ]
  },
  ethics: {
    category: 'Pr AiiA GRC',
    title: 'Ethics, Code of Conduct & Role-Based Security Training',
    desc: 'Targeted micro-simulations triggered by real endpoint telemetry, executive phishing defense, and COI disclosures.',
    kpi1: ['99.2%', 'Annual Conduct Completion'],
    kpi2: ['1.1%', 'Phishing Simulation Click Rate'],
    kpi3: ['Automated', 'Contextual Security Coaching'],
    records: [
      { id: 'TRN-FIN-2026', name: 'Executive Treasury Macro & Signed Bundle Verification Briefing', target: 'Elena Rostova & Finance Peers', status: 'Assigned Post-INC-2026-8842', owner: 'Security Awareness' }
    ]
  },
  privacy: {
    category: 'Pr AiiA GRC',
    title: 'Privacy, GDPR/CCPA & Regulated Financial Data Governance',
    desc: 'Automated PII/PCI data discovery, RoPA maintenance, DSAR fulfillment, and cross-border sovereignty guardrails.',
    kpi1: ['Zero', 'Unencrypted Regulated Stores'],
    kpi2: ['100%', 'FileVault / BitLocker Enforcement'],
    kpi3: ['Sovereign', 'EU & Federal Data Residency'],
    records: [
      { id: 'PRV-DPIA-44', name: 'Endpoint Forensic Telemetry PII Redaction Guardrail', target: 'END-FIN-094 Kernel Dump', status: 'Enforced by AGT-05', owner: 'Data Protection Officer' }
    ]
  },
  'ai-gov': {
    category: 'Pr AiiA GRC',
    title: 'AI Governance, NIST AI RMF & EU AI Act Compliance',
    desc: 'Model inventory, hallucination & bias guardrails, constitutional policy enforcement, and human-in-the-loop auditability.',
    kpi1: ['100%', 'NIST AI RMF 1.0 Mapped'],
    kpi2: ['8 Agents', 'Governed by Action Firewall'],
    kpi3: ['Immutable', 'Cryptographic Decision Logs'],
    records: [
      { id: 'AIG-MOD-01', name: 'Pr AiiA Neural Correlator & Patch Agent Governance Charter', target: 'AGT-03 / FW-REQ-9921', status: 'Compliant (ISO 42001)', owner: 'Chief AI Officer' }
    ]
  },
  'grc-reporting': {
    category: 'Pr AiiA GRC',
    title: 'GRC Assistant & Board / Auditor Executive Reporting',
    desc: 'One-click CISO board decks, external auditor read-only rooms, and natural-language compliance Q&A.',
    kpi1: ['Instant', 'Audit Binder Generation'],
    kpi2: ['98%', 'Automated Evidence Coverage'],
    kpi3: ['Ready', 'Q2 Board Cyber & GRC Deck'],
    records: [
      { id: 'RPT-2026-Q2', name: 'Executive Golden Thread Traceability Report (INC-2026-8842 → SI-2)', target: 'Board Audit Committee', status: 'Ready for Export', owner: 'AGT-07' }
    ]
  },
  reports: {
    category: 'Enterprise Intelligence',
    title: 'Cross-Platform Reports & Executive Analytics',
    desc: 'Unified MTTR, autonomous resolution rates, vulnerability burn-down velocity, and GRC posture trends.',
    kpi1: ['74%', 'MTTR Reduction via AI Agents'],
    kpi2: ['11 mins', 'Critical CVE To Staged Patch'],
    kpi3: ['100%', 'Cross-Module Traceability'],
    records: [
      { id: 'ANL-01', name: 'End-to-End Incident-to-Compliance Velocity Benchmark', target: 'INC-2026-8842', status: 'Live Telemetry', owner: 'Enterprise BI' }
    ]
  },
  administration: {
    category: 'System Administration',
    title: 'Tenant Administration, RBAC & Constitutional AI Guardrails',
    desc: 'Configure SSO/SCIM, role-based access control, and AI Action Firewall blast-radius thresholds.',
    kpi1: ['SAML 2.0 / OIDC', 'Hardware MFA Enforced'],
    kpi2: ['POL-AI-04', 'Tier-1 Human Sign-Off Active'],
    kpi3: ['FIPS 140-3', 'Cryptographic Signing'],
    records: [
      { id: 'ADM-POL-04', name: 'Require CISO / SecOps Approval for Tier-1 Finance Kernel Changes', target: 'FW-REQ-9921', status: 'Active Guardrail', owner: 'Platform Admin' }
    ]
  },
  settings: {
    category: 'System Configuration',
    title: 'Platform Settings, Notification Webhooks & Persistence',
    desc: 'Manage workspace preferences, SIEM/SOAR webhooks, and prototype state controls.',
    kpi1: ['Connected', 'Local State Persistence'],
    kpi2: ['Active', 'Neural Mesh v4.18'],
    kpi3: ['Synced', 'Cross-Module IDs'],
    records: [
      { id: 'CFG-01', name: 'Golden Thread Real-Time Cross-Module Synchronization', target: 'All 9 Core Screens', status: 'Enabled', owner: 'System' }
    ]
  }
};

function ConnectedModuleScreen({ moduleKey, appState, setAppState, navigateToRecord, notify, requestConfirmation, onResetDemo }) {
  const cfg = MODULE_CONFIGS[moduleKey] || MODULE_CONFIGS.aiops;
  const [customRecords, setCustomRecords] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newRecordName, setNewRecordName] = useState('');
  const [newRecordTarget, setNewRecordTarget] = useState('INC-2026-8842');
  const [formError, setFormError] = useState('');
  const [searchFilter, setSearchFilter] = useState('');

  const allRecords = [...customRecords, ...cfg.records].filter(
    (r) =>
      r.id.toLowerCase().includes(searchFilter.toLowerCase()) ||
      r.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      r.target.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const handleAddRecord = (e) => {
    e.preventDefault();
    if (!newRecordName.trim()) {
      setFormError('Validation Error: Please enter a policy or record title.');
      return;
    }
    setFormError('');
    const item = {
      id: `REC-${Math.floor(100 + Math.random() * 899)}`,
      name: newRecordName.trim(),
      target: newRecordTarget,
      status: 'Active & Linked',
      owner: appState.currentUserRole
    };
    setCustomRecords((prev) => [item, ...prev]);
    setNewRecordName('');
    setShowAddModal(false);
    notify(`Created and linked ${item.id} in ${cfg.title}.`, 'success');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs text-blue-600 font-semibold">{cfg.category}</div>
          <h1 className="text-xl font-bold text-slate-900 mt-0.5">{cfg.title}</h1>
          <p className="text-xs text-slate-600 mt-1">{cfg.desc}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {moduleKey === 'settings' && (
            <button
              onClick={onResetDemo}
              className="px-3.5 py-2 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold"
            >
              Reset Demo State
            </button>
          )}
          <button
            onClick={() => {
              setFormError('');
              setShowAddModal(true);
            }}
            className="px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Create Module Policy / Record</span>
          </button>
          <button
            onClick={() => navigateToRecord('incident-detail', 'INC-2026-8842')}
            className="px-3.5 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium"
          >
            Inspect Golden Thread (INC-2026-8842) →
          </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[cfg.kpi1, cfg.kpi2, cfg.kpi3].map(([val, label], i) => (
          <div key={i} className="bg-white p-4 rounded-xl border border-slate-200">
            <div className="text-2xl font-bold text-slate-900">{val}</div>
            <div className="text-xs text-slate-500 mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* Connected Records Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
          <span className="text-sm font-semibold text-slate-800">
            Active Module Policies, Playbooks & Connected Golden Thread Entities
          </span>
          <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 mr-1.5" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search module records..."
              className="bg-transparent text-xs focus:outline-none w-full"
            />
          </div>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-semibold uppercase text-slate-500">
              <th className="py-3 px-4">Record ID</th>
              <th className="py-3 px-4">Policy / Control / Playbook Name</th>
              <th className="py-3 px-4">Connected Entity</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Owner</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {allRecords.map((r) => (
              <tr key={r.id} className="hover:bg-slate-50">
                <td className="py-3.5 px-4 font-mono font-bold text-blue-600">{r.id}</td>
                <td className="py-3.5 px-4 font-medium text-slate-900">{r.name}</td>
                <td className="py-3.5 px-4 font-mono text-indigo-600 font-semibold">{r.target}</td>
                <td className="py-3.5 px-4">
                  <StatusBadge status={r.status} />
                </td>
                <td className="py-3.5 px-4 text-slate-600">{r.owner}</td>
                <td className="py-3.5 px-4">
                  <button
                    onClick={() => {
                      if (r.target.includes('END-FIN-094')) navigateToRecord('endpoint-detail', 'END-FIN-094');
                      else if (r.target.includes('CVE-2026-4109')) navigateToRecord('exposure', 'CVE-2026-4109');
                      else if (r.target.includes('FW-REQ-9921')) navigateToRecord('ai-firewall', 'FW-REQ-9921');
                      else if (r.target.includes('REM-2026-309')) navigateToRecord('remediation', 'REM-2026-309');
                      else if (r.target.includes('SI-2')) navigateToRecord('grc-evidence', 'SI-2');
                      else navigateToRecord('incident-detail', 'INC-2026-8842');
                    }}
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    Open Linked Record →
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl border border-slate-200 p-6 max-w-md w-full space-y-4 text-xs">
            <h3 className="text-sm font-bold text-slate-900">Create New Record in {cfg.title}</h3>
            {formError && (
              <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 font-medium">
                {formError}
              </div>
            )}
            <form onSubmit={handleAddRecord} noValidate className="space-y-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Policy / Playbook / Artifact Name *</label>
                <input
                  type="text"
                  value={newRecordName}
                  onChange={(e) => setNewRecordName(e.target.value)}
                  placeholder="Enter descriptive name..."
                  className="w-full border border-slate-300 rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Link to Golden Thread Entity</label>
                <select
                  value={newRecordTarget}
                  onChange={(e) => setNewRecordTarget(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 bg-white"
                >
                  <option value="INC-2026-8842">INC-2026-8842 (P1 Incident)</option>
                  <option value="END-FIN-094">END-FIN-094 (Elena Rostova MacBook Pro)</option>
                  <option value="CVE-2026-4109">CVE-2026-4109 (XNU Kernel Zero-Day)</option>
                  <option value="FW-REQ-9921">FW-REQ-9921 (AI Firewall Request)</option>
                  <option value="REM-2026-309">REM-2026-309 (Kernel Hotfix Plan)</option>
                  <option value="SI-2 / EVD-2026-7741">NIST 800-53 SI-2 (GRC Control)</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 rounded-lg border border-slate-300"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-1.5 rounded-lg bg-blue-600 text-white font-semibold">
                  Save & Link
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
// SHARED UI BADGE COMPONENTS
// ============================================================================

function PriorityBadge({ priority }) {
  const isP1 = priority?.includes('P1');
  const isP2 = priority?.includes('P2');
  return (
    <span
      className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
        isP1
          ? 'bg-red-50 text-red-700 border border-red-200'
          : isP2
          ? 'bg-amber-50 text-amber-800 border border-amber-200'
          : 'bg-blue-50 text-blue-700 border border-blue-200'
      }`}
    >
      {priority}
    </span>
  );
}

function StatusBadge({ status }) {
  const s = (status || '').toLowerCase();
  let style = 'bg-slate-100 text-slate-700 border-slate-200';
  if (
    s.includes('resolved') ||
    s.includes('verified') ||
    s.includes('compliant') ||
    s.includes('approved') ||
    s.includes('healthy') ||
    s.includes('active') ||
    s.includes('attested') ||
    s.includes('completed')
  ) {
    style = 'bg-emerald-50 text-emerald-700 border-emerald-200';
  } else if (
    s.includes('investigating') ||
    s.includes('critical') ||
    s.includes('vulnerable') ||
    s.includes('gap') ||
    s.includes('rejected') ||
    s.includes('non-compliant')
  ) {
    style = 'bg-red-50 text-red-700 border-red-200';
  } else if (
    s.includes('pending') ||
    s.includes('staged') ||
    s.includes('awaiting') ||
    s.includes('progress') ||
    s.includes('warning') ||
    s.includes('degraded') ||
    s.includes('deployed')
  ) {
    style = 'bg-amber-50 text-amber-800 border-amber-200';
  }
  return <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border ${style}`}>{status}</span>;
}