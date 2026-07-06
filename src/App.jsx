import React, { useState, useEffect, useRef } from 'react';
import {
  LayoutDashboard, ShieldAlert, Users2, Activity,
  AlertOctagon, CheckCircle2, ChevronRight,
  TrendingUp, Trash2, Droplet, Lightbulb, MapPin,
  Wrench, Send, Landmark, HelpCircle, AlertTriangle, FileText,
  Clock, Shield, BarChart3, Database, ShieldCheck
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedComplaintId, setSelectedComplaintId] = useState('CP-2026-001');
  const [healthScore, setHealthScore] = useState(42);
  const [approvedDecisions, setApprovedDecisions] = useState({});
  const [allocatedWorkers, setAllocatedWorkers] = useState({
    sinkhole: 12,
    water: 6,
    garbage: 6,
    sewage: 4,
    streetlights: 2
  });
  const [simulationRun, setSimulationRun] = useState(false);
  const [simulationResult, setSimulationResult] = useState(null);
  const [consoleLogs, setConsoleLogs] = useState([
    '[SYSTEM] Ingesting telemetric updates...',
    '[SENSOR] Jal Board Flow Sensor Node W-32: Pressure dropped (0.8 Bar)',
    '[SENSOR] Turbidity sensor TB-308: 18.2 NTU (CRITICAL SPIKE)',
    '[SYSTEM] 6 Citizen complaints synchronized from Ward 144 portal.',
    '[AI AGENT] Running spatial duplicate check: CP-2026-003 flagged as 94% duplicate.'
  ]);

  const consoleEndRef = useRef(null);

  // Periodic scrolling console simulator
  useEffect(() => {
    const alerts = [
      '[SENSOR] Solid Waste bin SW-308 (Commercial Market) capacity reached 142%.',
      '[AI PROJECTOR] High risk of secondary sub-base collapse near Metro Exit.',
      '[JAL BOARD] Flow bypass activated at downstream valve block V-105.',
      '[DISCOM] Streetlight grid load warning: Voltage drop detected on Sector 3 circuit.',
      '[HEALTH] Municipal clinics in Sector 3 reporting 4 gastroenteritis admissions.',
      '[SYSTEM] Commuter bypass delays rising by 12 mins on Indiranagar bypass route.',
      '[SENSOR] Pipeline residual chlorine dropped below 0.05 mg/L threshold.',
      '[AI OPTIMIZER] PWD pavement crew standby time is 18 mins. Staging concrete fills.'
    ];

    const interval = setInterval(() => {
      const randomAlert = alerts[Math.floor(Math.random() * alerts.length)];
      const timestamp = new Date().toLocaleTimeString();
      setConsoleLogs(prev => [...prev.slice(-30), `[${timestamp}] ${randomAlert}`]);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  // Scroll to bottom of terminal console
  useEffect(() => {
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [consoleLogs]);

  // Complaints
  const [complaints, setComplaints] = useState([
    {
      id: 'CP-2026-001',
      title: 'Major road collapse/sinkhole on Grand Trunk Avenue near Sector 3 Metro exit',
      category: 'Infrastructure',
      subcategory: 'Road Collapse (PWD)',
      severity: 'Critical',
      priority: 98,
      urgency: 'Emergency',
      citizensAffected: 12000,
      department: 'PWD (Public Works Department) / Jal Board',
      rootCause: 'Ruptured 300mm underground water main eroding sandy-clay subgrade soil.',
      resolutionTime: '48 Hours',
      status: 'In Progress',
      image: '/indian_road_sinkhole.png',
      location: 'Grand Trunk Avenue, near Sector 3 Metro exit, Ward 144',
      date: '2026-07-06T08:12',
      mapX: '28%',
      mapY: '42%',
      colorClass: 'glow-crimson',
      description: 'A massive crater/sinkhole (~2.5m wide) has formed right outside the metro station stairs. Subsurface water pipe is fractured and actively washing away soil. Impeding 2 lanes of heavy traffic.'
    },
    {
      id: 'CP-2026-002',
      title: 'Contaminated brown, muddy drinking water in Blocks C & D residential taps',
      category: 'Water & Sanitation',
      subcategory: 'Water Quality (Jal Board)',
      severity: 'Critical',
      priority: 94,
      urgency: 'Emergency',
      citizensAffected: 8500,
      department: 'Greenfield Jal Board (Water Board)',
      rootCause: 'Cross-contamination from broken sewer line adjacent to ruptured water main.',
      resolutionTime: '36 Hours',
      status: 'Open',
      image: null,
      location: 'Ward 144, Blocks C & D Residential Society',
      date: '2026-07-06T09:30',
      mapX: '75%',
      mapY: '25%',
      colorClass: 'glow-saffron',
      description: 'Water running from taps is highly turbid, muddy, and smelling of drainage since yesterday morning. High hazard of waterborne diseases. Sensors show turbidity at 18.2 NTU.'
    },
    {
      id: 'CP-2026-003',
      title: 'Deep road crater next to Metro Station exit on Grand Trunk Avenue',
      category: 'Infrastructure',
      subcategory: 'Road Damage (PWD)',
      severity: 'Critical',
      priority: 98,
      urgency: 'Emergency',
      citizensAffected: 12000,
      department: 'PWD (Public Works Department)',
      rootCause: 'Underground soil washout from pipeline burst.',
      resolutionTime: 'Merged',
      status: 'Duplicate',
      image: '/indian_road_sinkhole.png',
      location: 'Grand Trunk Avenue, opposite metro pillar 128',
      date: '2026-07-06T11:05',
      mapX: '30%',
      mapY: '44%',
      colorClass: 'glow-crimson',
      description: 'Large hollow crater in the road. Traffic has slowed to a crawl. Heavy security risk.'
    },
    {
      id: 'CP-2026-004',
      title: 'Overflowing garbage heap and 5-day uncollected waste at Sector 3 Commercial Market',
      category: 'Solid Waste',
      subcategory: 'Garbage Backlog (Swachh Bharat)',
      severity: 'High',
      priority: 64,
      urgency: 'High',
      citizensAffected: 3000,
      department: 'Municipal Corporation (Swachh Bharat Division)',
      rootCause: 'Collection compactors delayed due to vehicle route blockages.',
      resolutionTime: '12 Hours',
      status: 'Open',
      image: null,
      location: 'Sector 3 Commercial Market Square',
      date: '2026-07-06T12:00',
      mapX: '60%',
      mapY: '65%',
      colorClass: 'glow-yellow',
      description: 'Garbage has not been collected for 5 days. High odor, stray cattle gathering, blocking secondary market roads.'
    },
    {
      id: 'CP-2026-005',
      title: 'Sidewalk sewer overflow and manhole discharge near Block B market corridor',
      category: 'Water & Sanitation',
      subcategory: 'Sewer Overflow (Jal Board)',
      severity: 'High',
      priority: 76,
      urgency: 'Critical',
      citizensAffected: 5000,
      department: 'Greenfield Jal Board',
      rootCause: 'Sanitary sewer line compression/collapse due to ground shift near sinkhole.',
      resolutionTime: '24 Hours',
      status: 'Open',
      image: null,
      location: 'Sector 3 Market Road (outside Block B retail shops)',
      date: '2026-07-06T14:15',
      mapX: '55%',
      mapY: '52%',
      colorClass: 'glow-blue',
      description: 'Black sewer water overflowing from circular manhole directly onto footpaths. Retail shops reporting drop in customers due to foul smell.'
    },
    {
      id: 'CP-2026-006',
      title: 'Total streetlight blackout on 4th Main Road, Sector 3 residential zone',
      category: 'Public Safety',
      subcategory: 'Grid Failure (Electricity Dept)',
      severity: 'Medium',
      priority: 50,
      urgency: 'Medium',
      citizensAffected: 1500,
      department: 'State Electricity Distribution Co. (DISCOM)',
      rootCause: 'Water ingress into underground electrical junction box.',
      resolutionTime: '24 Hours',
      status: 'Open',
      image: null,
      location: '4th Main Road, Sector 3',
      date: '2026-07-06T18:45',
      mapX: '15%',
      mapY: '75%',
      colorClass: 'glow-yellow',
      description: 'Entire street is in complete darkness since 6:30 PM. Safety risk for women and elderly returning from local temples. Active risk of vehicle accidents.'
    }
  ]);

  const selectedComplaint = complaints.find(c => c.id === selectedComplaintId) || complaints[0];

  const getCitizenResponse = (c) => {
    return `Dear Resident, we acknowledge your complaint regarding the ${c.category.toLowerCase()} issue: "${c.subcategory}" at ${c.location.split(',')[0]}. The ${c.department.split(' (')[0]} has deployed emergency crews to isolate the root cause. Target resolution time is ${c.resolutionTime}. We are tracking this under Ref ID: UP-${c.id}. Thank you for helping us keep Greenfield clean and safe.`;
  };

  const commissionerDecisions = [
    {
      id: 'D1',
      title: 'Declare Sector 3 Infrastructure Emergency',
      problem: 'Road collapse, sewer spill, and contaminated drinking water threatening 20,000+ residents.',
      decision: 'Invoke Section 14 emergency procurement powers to hire private water tankers and buy rapid-set flowable concrete.',
      why: 'Bypasses standard 14-day government tender times to initiate on-site repairs in under 2 hours.',
      impact: 'Immediate safety barricades and clean water distribution within 4 hours.',
      resources: 'INR 3.5 Lakhs emergency emergency fund authorization.',
      timeline: 'Instant'
    },
    {
      id: 'D2',
      title: 'Form Joint PWD - Jal Board Task Force',
      problem: 'Lack of coordination: PWD cannot backfill sinkhole until Jal Board seals water pipes.',
      decision: 'Enforce a unified joint on-site command under a senior municipal engineer.',
      why: 'Prevents inter-departmental delays and synchronizes pipe welding with structural repaving.',
      impact: 'Speeds up road reopening timeline by 18 hours.',
      resources: 'PWD & Jal Board regional engineering staff.',
      timeline: '6 Hours'
    },
    {
      id: 'D3',
      title: 'Deploy Safe Water Tanker Fleet to Blocks C & D',
      problem: '8,500 residents exposed to highly contaminated tap water (turbidity 18.2 NTU).',
      decision: 'Hire 12 private safe-water tankers and establish a distribution route.',
      why: 'Ensures potable water access, mitigating outbreak risk while pipelines are flushed.',
      impact: '95% reduction in public health risk and waterborne illnesses.',
      resources: '12 Water tankers (6 municipal + 6 hired).',
      timeline: '4 Hours'
    },
    {
      id: 'D4',
      title: 'Launch Ward-Wide Subsurface GPR Survey',
      problem: 'Undetected pipeline leaks can cause secondary sinkholes along Metro corridors.',
      decision: 'Deploy Ground-Penetrating Radar (GPR) to scan all high-traffic road channels.',
      why: 'Finds subsurface air voids and washouts before they collapse under traffic.',
      impact: 'Proactively prevents catastrophic collapses along transit lines.',
      resources: 'Contractor hiring, INR 6 Lakhs.',
      timeline: '72 Hours'
    },
    {
      id: 'D5',
      title: 'Execute Swachh Bharat Cleanliness Blitz',
      problem: '5-day garbage backlog at Sector 3 Market breeding disease and blocking trade.',
      decision: 'Deploy 4 garbage trucks and 12 sanitation workers on emergency shifts.',
      why: 'Clears public health hazard, restores commercial trade indices.',
      impact: 'Restores market sanitization and business customer count by tomorrow.',
      resources: '4 Trucks, 12 staff, bleaching powder disinfectants.',
      timeline: '12 Hours'
    }
  ];

  const approveDecision = (id) => {
    if (approvedDecisions[id]) return;
    setApprovedDecisions(prev => ({ ...prev, [id]: true }));
    setHealthScore(prev => Math.min(prev + 8, 100));
    setConsoleLogs(prev => [...prev, `[COMMAND] Commissioner approved Directive ${id}. Operations dispatched.`]);
  };

  const handleResourceSim = () => {
    const totalAllocated = Object.values(allocatedWorkers).reduce((a, b) => a + Number(b), 0);
    if (totalAllocated > 30) {
      alert(`Resource allocation exceeds available capacity! You allocated ${totalAllocated} workers, but only 30 are available.`);
      return;
    }

    setSimulationRun(true);
    const timeToFixGrandAve = Math.ceil(72 / (allocatedWorkers.sinkhole || 1));
    const timeToFixWater = Math.ceil(48 / (allocatedWorkers.water || 1));
    const timeToFixGarbage = Math.ceil(24 / (allocatedWorkers.garbage || 1));
    const timeToFixSewage = Math.ceil(36 / (allocatedWorkers.sewage || 1));
    const timeToFixStreetlights = Math.ceil(24 / (allocatedWorkers.streetlights || 1));

    const efficiencyScore = Math.min(
      100,
      Math.floor(
        ((allocatedWorkers.sinkhole * 2.5) +
        (allocatedWorkers.water * 2.5) +
        (allocatedWorkers.garbage * 1.5) +
        (allocatedWorkers.sewage * 2.0) +
        (allocatedWorkers.streetlights * 1.5)) * 1.2
      )
    );

    setSimulationResult({
      sinkholeTime: timeToFixGrandAve,
      waterTime: timeToFixWater,
      garbageTime: timeToFixGarbage,
      sewageTime: timeToFixSewage,
      lightsTime: timeToFixStreetlights,
      efficiency: efficiencyScore
    });

    setHealthScore(prev => Math.min(42 + Math.floor(efficiencyScore / 2), 100));
    setConsoleLogs(prev => [...prev, `[SIMULATOR] Resource configuration deployed. Target efficiency: ${efficiencyScore}%.`]);
  };

  const recommendations = [
    { priority: 1, title: 'Shut down Main Valve V-102', benefit: 'Prevents further subgrade soil erosion', difficulty: 'Low', time: '30 Mins' },
    { priority: 2, title: 'Cordon Sector 3 Metro exit with Jersey Barriers', benefit: 'Eliminates accident/fall risks', difficulty: 'Low', time: '1 Hour' },
    { priority: 3, title: 'Mobilize 12 Water Tankers to Blocks C & D', benefit: 'Protects 8,500 citizens from drinking contaminated water', difficulty: 'Medium', time: '4 Hours' },
    { priority: 4, title: 'Flush residential distribution mains with Chlorine', benefit: 'Neutralizes pathogens in supply pipes', difficulty: 'Medium', time: '12 Hours' },
    { priority: 5, title: 'Stabilize collapsed base with flowable concrete fill', benefit: 'Fast road-base repair in 18 hours', difficulty: 'Medium', time: '18 Hours' },
    { priority: 6, title: 'Begin GPR subsurface void detection scans', benefit: 'Identifies underground cavities early', difficulty: 'High', time: '48 Hours' },
    { priority: 7, title: 'Run Swachh Bharat waste collection blitz at Market', benefit: 'Removes organic hazard, stops vector breeding', difficulty: 'Low', time: '6 Hours' },
    { priority: 8, title: 'Replace wet wiring inside Junction Cabinet JB-14', benefit: 'Restores lighting on 4th Main Road', difficulty: 'Medium', time: '12 Hours' },
    { priority: 9, title: 'Reroute bus lines and heavy trucks off Sector 3', benefit: 'Prevents secondary collapse near weakened soil', difficulty: 'Low', time: '2 Hours' },
    { priority: 10, title: 'Install inline IoT turbidity & chlorine sensors', benefit: 'Real-time contamination alerts', difficulty: 'High', time: '7 Days' }
  ];

  const budgetAllocations = [
    { dept: 'Greenfield Jal Board (Water & Sewer)', percentage: 50, priority: 'Critical', roi: '145% (Health cost avoidance)' },
    { dept: 'PWD (Roads & Bridges Division)', percentage: 30, priority: 'High', roi: '110% (Transit corridor restoration)' },
    { dept: 'Swachh Bharat Division (Solid Waste)', percentage: 10, priority: 'Medium', roi: '90% (Prevent disease vectors)' },
    { dept: 'DISCOM (Electricity & Lighting Department)', percentage: 10, priority: 'Medium', roi: '85% (Reduce nighttime safety risks)' }
  ];

  // SVG Gauge calculations
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (healthScore / 100) * circumference;

  return (
    <div className="app-container">
      {/* Indian tricolour header strip */}
      <div className="tricolour-strip">
        <div className="strip-saffron"></div>
        <div className="strip-white"></div>
        <div className="strip-green"></div>
      </div>

      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="logo-box">UP</div>
          <div className="logo-text">
            <h1>UrbanPulse AI</h1>
            <span>Mahanagar Command</span>
          </div>
        </div>

        <nav className="nav-menu">
          <div className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
            <LayoutDashboard size={18} />
            Command Dashboard
          </div>
          <div className={`nav-item ${activeTab === 'resource' ? 'active' : ''}`} onClick={() => setActiveTab('resource')}>
            <Wrench size={18} />
            Tactical Allocator
          </div>
          <div className={`nav-item ${activeTab === 'decisions' ? 'active' : ''}`} onClick={() => setActiveTab('decisions')}>
            <Landmark size={18} />
            Executive Mandates
          </div>
          <div className={`nav-item ${activeTab === 'predictive' ? 'active' : ''}`} onClick={() => setActiveTab('predictive')}>
            <TrendingUp size={18} />
            Spatial Predictions
          </div>
          <div className={`nav-item ${activeTab === 'recommendations' ? 'active' : ''}`} onClick={() => setActiveTab('recommendations')}>
            <Lightbulb size={18} />
            AI Advice
          </div>
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="profile-pic">CM</div>
            <div className="profile-desc">
              <h4>Commissioner</h4>
              <p>Ward 144, Sector 3</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Panel */}
      <main className="main-content">
        <header className="top-header">
          <div className="header-title">
            <h2>Mahanagar Control Dashboard</h2>
            <p>Urban Pulse AI decision system for smart governance</p>
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <span className="status-indicator">
              <span className="status-dot"></span>
              Live Telemetry Linked
            </span>
            <div className="clock-panel" style={{ background: 'rgba(255,255,255,0.02)', padding: '10px 18px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={16} style={{ color: 'var(--saffron)' }} />
              <span>Greenfield Local Time</span>
            </div>
          </div>
        </header>

        {/* High-Impact Metrics Grid */}
        <section className="metrics-row">
          {/* Health Score Circular Dial */}
          <div className="glowing-card metric-node" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span className="metric-desc">Community Health</span>
              <span className="metric-num" style={{ 
                color: healthScore < 50 ? 'var(--crimson)' : healthScore < 80 ? 'var(--yellow)' : 'var(--green)'
              }}>
                {healthScore}%
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Status: {healthScore < 50 ? 'Critical Alert' : 'Stabilizing'}</span>
            </div>
            <div style={{ width: '80px', height: '80px', position: 'relative' }}>
              <svg width="80" height="80" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r={radius} fill="transparent" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="6" />
                <circle 
                  cx="40" 
                  cy="40" 
                  r={radius} 
                  fill="transparent" 
                  stroke={healthScore < 50 ? 'var(--crimson)' : 'var(--saffron)'} 
                  strokeWidth="6" 
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  transform="rotate(-90 40 40)"
                  style={{ transition: 'stroke-dashoffset 0.8s ease-in-out' }}
                />
              </svg>
            </div>
          </div>

          <div className="glowing-card metric-node">
            <div className="metric-meta">
              <span>Active Reports</span>
              <div className="metric-icon-box"><ShieldAlert size={16} style={{ color: 'var(--blue)' }} /></div>
            </div>
            <div className="metric-main">
              <div>
                <span className="metric-num">6</span>
                <span className="metric-desc">5 unique | 1 duplicate</span>
              </div>
            </div>
          </div>

          <div className="glowing-card metric-node">
            <div className="metric-meta">
              <span>Emergency Staff</span>
              <div className="metric-icon-box"><Users2 size={16} style={{ color: 'var(--green)' }} /></div>
            </div>
            <div className="metric-main">
              <div>
                <span className="metric-num">30</span>
                <span className="metric-desc">Workers deployed on-site</span>
              </div>
            </div>
          </div>

          <div className="glowing-card metric-node">
            <div className="metric-meta">
              <span>Hotspot Level</span>
              <div className="metric-icon-box"><AlertOctagon size={16} style={{ color: 'var(--crimson)' }} /></div>
            </div>
            <div className="metric-main">
              <div>
                <span className="metric-num" style={{ color: 'var(--crimson)' }}>High</span>
                <span className="metric-desc">Soil saturation at 85%</span>
              </div>
            </div>
          </div>
        </section>

        {activeTab === 'dashboard' && (
          <div className="split-grid">
            {/* Left Hand: Ingested Complaints Table & Map */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div className="glowing-card">
                <h3 className="section-title">
                  <FileText size={18} style={{ color: 'var(--saffron)' }} />
                  Ingested Citizen Reports
                </h3>
                <div className="custom-table-container">
                  <table className="pulse-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Summary</th>
                        <th>Category</th>
                        <th>Severity</th>
                        <th>Priority</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {complaints.map(c => (
                        <tr 
                          key={c.id} 
                          onClick={() => setSelectedComplaintId(c.id)}
                          style={{ background: selectedComplaintId === c.id ? 'rgba(255, 255, 255, 0.03)' : '' }}
                        >
                          <td style={{ fontWeight: 'bold', color: 'var(--saffron)' }}>{c.id}</td>
                          <td style={{ maxWidth: '240px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                            {c.title}
                          </td>
                          <td><span className="department-chip">{c.category}</span></td>
                          <td>
                            <span className={`badge-status ${c.severity === 'Critical' ? 'crit' : c.severity === 'High' ? 'hi' : 'med'}`}>
                              {c.severity}
                            </span>
                          </td>
                          <td><span className="glow-num">{c.priority}</span></td>
                          <td>
                            <span style={{ 
                              fontWeight: '600',
                              color: c.status === 'Duplicate' ? 'var(--text-muted)' : 
                                     c.status === 'In Progress' ? 'var(--yellow)' : 'var(--crimson)'
                            }}>
                              {c.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Duplicate Check panel */}
              <div className="glowing-card dup-card">
                <div className="dup-main-info">
                  <div>
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem', fontWeight: 'bold' }}>
                      <AlertOctagon size={18} style={{ color: 'var(--saffron)' }} />
                      Automated Duplicate Flag
                    </h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      Identifying duplicate citizen uploads in real time.
                    </p>
                  </div>
                  <div className="similarity-badge-circular">94%</div>
                </div>
                <div className="dup-warning-text">
                  <strong>Semantic Clustered Match:</strong> Ticket <strong>CP-2026-003</strong> ("Deep road crater next to Metro Station exit...") maps to active primary incident <strong>CP-2026-001</strong> with 94% confidence.
                </div>
                <div>
                  <button className="cyber-btn-primary" onClick={() => {
                    setComplaints(prev => prev.map(c => c.id === 'CP-2026-003' ? { ...c, status: 'Duplicate' } : c));
                    alert('Duplicate record CP-2026-003 has been successfully merged into parent event.');
                  }}>
                    Merge & Clear Duplicate
                  </button>
                </div>
              </div>

              {/* Interactive Ward Grid Map */}
              <div className="glowing-card">
                <h3 className="section-title">
                  <MapPin size={18} style={{ color: 'var(--saffron)' }} />
                  Sector 3 Spatial Telemetry Map
                </h3>
                <div className="map-canvas-container">
                  <div className="map-grid-overlay"></div>
                  <div className="map-road road-main"></div>
                  <div className="map-road road-cross"></div>
                  
                  {/* Blinking Nodes */}
                  {complaints.filter(c => c.status !== 'Duplicate').map(c => (
                    <div 
                      key={c.id} 
                      className={`map-node-pulse ${c.colorClass} ${selectedComplaintId === c.id ? 'pulse-active-saffron' : ''}`}
                      style={{ left: c.mapX, top: c.mapY, width: selectedComplaintId === c.id ? '16px' : '10px', height: selectedComplaintId === c.id ? '16px' : '10px' }}
                      onClick={() => setSelectedComplaintId(c.id)}
                      title={c.title}
                    />
                  ))}
                  
                  <div style={{ position: 'absolute', bottom: '12px', left: '16px', background: 'rgba(0,0,0,0.6)', padding: '6px 12px', borderRadius: '6px', fontSize: '0.7rem', display: 'flex', gap: '10px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--crimson)' }}></span> Road Collapse</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--saffron)' }}></span> Tap Quality</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--blue)' }}></span> Sewers</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Hand: Inspection details, visual scan and SMS replies */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div className="glowing-card inspector-card">
                <div className="inspector-header">
                  <div>
                    <span className="badge-status crit" style={{ marginBottom: '8px' }}>{selectedComplaint.urgency}</span>
                    <h3>{selectedComplaint.id} Report Analysis</h3>
                  </div>
                  <span className="glow-num" style={{ fontSize: '1rem', padding: '6px 12px' }}>
                    Priority: {selectedComplaint.priority}
                  </span>
                </div>

                <div className="inspector-grid">
                  <div className="inspector-item">
                    <label>Ward & Location</label>
                    <span>{selectedComplaint.location}</span>
                  </div>
                  <div className="inspector-item">
                    <label>Assigned Department</label>
                    <span>{selectedComplaint.department}</span>
                  </div>
                  <div className="inspector-item">
                    <label>Impacted Residents</label>
                    <span style={{ color: 'var(--saffron)' }}>{selectedComplaint.citizensAffected.toLocaleString()}</span>
                  </div>
                  <div className="inspector-item">
                    <label>Target SLA</label>
                    <span>{selectedComplaint.resolutionTime}</span>
                  </div>
                </div>

                <div className="inspector-description">
                  <strong>Citizen Text Ingestion:</strong><br />
                  "{selectedComplaint.description}"
                </div>

                <div style={{ fontSize: '0.88rem', marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-display)', marginBottom: '6px' }}>AI Identified Root Cause</label>
                  <span style={{ fontWeight: '600' }}>{selectedComplaint.rootCause}</span>
                </div>

                {selectedComplaint.image && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-display)' }}>Visual Scan (Active Core)</label>
                    <div className="scanner-frame" style={{ backgroundImage: `url('/sinkhole.jpg')`, backgroundColor: '#0b0f19' }}>
                      <div className="scanner-ray"></div>
                      <div className="scanner-overlay-details">
                        <span>SCAN STATE: ACTIVE ROAD SEPARATION</span>
                        <span style={{ color: 'var(--saffron)', fontWeight: 'bold' }}>AI CONFIDENCE: 95%</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Citizen Response Generator */}
              <div className="glowing-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem', fontFamily: 'var(--font-display)' }}>
                  <Send size={16} style={{ color: 'var(--saffron)' }} />
                  Automated Citizen Communication
                </h4>
                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '10px', fontSize: '0.85rem', lineHeight: '1.5', border: '1px solid rgba(255,255,255,0.03)' }}>
                  {getCitizenResponse(selectedComplaint)}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    Word count: {getCitizenResponse(selectedComplaint).split(' ').length} (Target: &lt;80 words)
                  </span>
                  <button className="cyber-btn-primary" style={{ padding: '8px 16px', fontSize: '0.8rem' }} onClick={() => alert('SMS and Push dispatch complete.')}>
                    Dispatch SMS
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'resource' && (
          <div className="glowing-card resource-box">
            <h3 className="section-title">
              <Wrench size={18} style={{ color: 'var(--saffron)' }} />
              Command Staff Optimizer Simulator
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '-12px' }}>
              Drag and allocate the municipal workforce across active tasks. Available capacity: **30 Workers**.
            </p>

            <div className="pool-tags">
              <div className="pool-tag">Personnel: <span className="tag-badge">30 / 30</span></div>
              <div className="pool-tag">Compactors: <span className="tag-badge">6 Trucks</span></div>
              <div className="pool-tag">PWD Paving: <span className="tag-badge">4 Teams</span></div>
              <div className="pool-tag">Jal Board: <span className="tag-badge">3 Teams</span></div>
            </div>

            <div className="slider-group">
              <div className="slider-row">
                <span className="slider-label">1. Grand Trunk Avenue Sinkhole (PWD)</span>
                <input 
                  type="range" 
                  min="0" 
                  max="30" 
                  className="custom-range-input" 
                  value={allocatedWorkers.sinkhole} 
                  onChange={(e) => setAllocatedWorkers({...allocatedWorkers, sinkhole: Number(e.target.value)})}
                />
                <span className="glow-num" style={{ textAlign: 'center' }}>{allocatedWorkers.sinkhole} Workers</span>
              </div>

              <div className="slider-row">
                <span className="slider-label">2. Tap Water Contamination flushing (Jal Board)</span>
                <input 
                  type="range" 
                  min="0" 
                  max="30" 
                  className="custom-range-input" 
                  value={allocatedWorkers.water} 
                  onChange={(e) => setAllocatedWorkers({...allocatedWorkers, water: Number(e.target.value)})}
                />
                <span className="glow-num" style={{ textAlign: 'center' }}>{allocatedWorkers.water} Workers</span>
              </div>

              <div className="slider-row">
                <span className="slider-label">3. Sector 3 Market garbage backlog (Swachh Bharat)</span>
                <input 
                  type="range" 
                  min="0" 
                  max="30" 
                  className="custom-range-input" 
                  value={allocatedWorkers.garbage} 
                  onChange={(e) => setAllocatedWorkers({...allocatedWorkers, garbage: Number(e.target.value)})}
                />
                <span className="glow-num" style={{ textAlign: 'center' }}>{allocatedWorkers.garbage} Workers</span>
              </div>

              <div className="slider-row">
                <span className="slider-label">4. Sewer manhole overflow clearance (Jal Board)</span>
                <input 
                  type="range" 
                  min="0" 
                  max="30" 
                  className="custom-range-input" 
                  value={allocatedWorkers.sewage} 
                  onChange={(e) => setAllocatedWorkers({...allocatedWorkers, sewage: Number(e.target.value)})}
                />
                <span className="glow-num" style={{ textAlign: 'center' }}>{allocatedWorkers.sewage} Workers</span>
              </div>

              <div className="slider-row">
                <span className="slider-label">5. Streetlight circuit grid (DISCOM)</span>
                <input 
                  type="range" 
                  min="0" 
                  max="30" 
                  className="custom-range-input" 
                  value={allocatedWorkers.streetlights} 
                  onChange={(e) => setAllocatedWorkers({...allocatedWorkers, streetlights: Number(e.target.value)})}
                />
                <span className="glow-num" style={{ textAlign: 'center' }}>{allocatedWorkers.streetlights} Workers</span>
              </div>
            </div>

            <div>
              <button className="cyber-btn-primary" onClick={handleResourceSim}>
                Run Simulator & Deploy Crews
              </button>
            </div>

            {simulationRun && simulationResult && (
              <div style={{ marginTop: '16px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '20px' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 'bold', color: 'var(--green)', marginBottom: '16px' }}>Target Resolution Timelines</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', marginBottom: '20px' }}>
                  <div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Sinkhole</span>
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold', fontFamily: 'var(--font-display)', color: 'var(--saffron)' }}>{simulationResult.sinkholeTime}h</div>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Water</span>
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold', fontFamily: 'var(--font-display)', color: 'var(--saffron)' }}>{simulationResult.waterTime}h</div>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Garbage</span>
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold', fontFamily: 'var(--font-display)', color: 'var(--saffron)' }}>{simulationResult.garbageTime}h</div>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Sewage</span>
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold', fontFamily: 'var(--font-display)', color: 'var(--saffron)' }}>{simulationResult.sewageTime}h</div>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Lighting</span>
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold', fontFamily: 'var(--font-display)', color: 'var(--saffron)' }}>{simulationResult.lightsTime}h</div>
                  </div>
                </div>

                <div style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16,185,129,0.15)', padding: '16px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong>Configuration Efficiency: {simulationResult.efficiency}%</strong>
                    <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>Resource deployment ratios have been successfully matched. Overall Ward health increased.</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'decisions' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="glowing-card">
              <h3 className="section-title">
                <Landmark size={18} style={{ color: 'var(--saffron)' }} />
                Administrative Crisis Directives
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '-12px', marginBottom: '24px' }}>
                Deploy policy actions to bypass departmental delays and allocate emergency city resources.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {commissionerDecisions.map((d) => (
                  <div className="directive-node" key={d.id}>
                    <div className="directive-meta">
                      <span className="directive-label">{d.id}: Emergency Mandate</span>
                      <span className="directive-boost">Health Index Boost: +8%</span>
                    </div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{d.title}</h4>
                    <p style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>
                      <strong>Crisis Trigger:</strong> {d.problem}
                    </p>
                    <p style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>
                      <strong>Directive:</strong> {d.decision}
                    </p>
                    <div className="directive-grid">
                      <span>Fund Commitment: <strong>{d.resources}</strong></span>
                      <span>Execution Speed: <strong>{d.timeline}</strong></span>
                    </div>
                    <div style={{ alignSelf: 'flex-end', marginTop: '10px' }}>
                      {approvedDecisions[d.id] ? (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--green)', fontWeight: 'bold' }}>
                          <CheckCircle2 size={16} /> Active & Enforced
                        </span>
                      ) : (
                        <button className="cyber-btn-primary" onClick={() => approveDecision(d.id)}>
                          Enforce Mandate
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'predictive' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="glowing-card">
              <h3 className="section-title">
                <TrendingUp size={18} style={{ color: 'var(--saffron)' }} />
                AI Spatial & Outbreak Predictions
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="hotspot-item">
                  <div className="hotspot-badge" style={{ background: 'rgba(239, 68, 68, 0.08)' }}><AlertTriangle size={18} /></div>
                  <div className="hotspot-info">
                    <h4>Waterborne Contamination Plume (Zone C & D)</h4>
                    <p>
                      Turbidity levels remain at **18.2 NTU** at residential inflow valves. Models indicate a 74% probability of localized gastroenteritis spikes if gravity line sterilization is not finished in 24 hours.
                    </p>
                  </div>
                </div>

                <div className="hotspot-item">
                  <div className="hotspot-badge" style={{ background: 'rgba(249, 115, 22, 0.08)', color: 'var(--saffron)' }}><AlertTriangle size={18} /></div>
                  <div className="hotspot-info">
                    <h4>Metro elevated staircase subsidence warning</h4>
                    <p>
                      Subgrade void erosion is expanding at **0.15m/hr** under the current water line burst. Subsurface soil collapse may expand to the Metro structural footings if flowable concrete backfill is delayed.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glowing-card" style={{ padding: '24px' }}>
              <h3 className="section-title">
                <Landmark size={20} style={{ color: 'var(--saffron)' }} />
                Emergency Budget Recommendations
              </h3>
              <div className="meter-list">
                {budgetAllocations.map((b, idx) => (
                  <div className="meter-item" key={idx}>
                    <div className="meter-meta">
                      <span style={{ fontWeight: '600' }}>{b.dept}</span>
                      <span style={{ color: 'var(--saffron)', fontWeight: 'bold' }}>{b.percentage}% Allocation</span>
                    </div>
                    <div className="meter-track">
                      <div 
                        className="meter-fill" 
                        style={{ 
                          width: `${b.percentage}%`,
                          background: idx === 0 ? 'var(--crimson)' : idx === 1 ? 'var(--saffron)' : 'var(--blue)'
                        }}
                      ></div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      <span>Priority: <strong>{b.priority}</strong></span>
                      <span>Expected ROI: <strong>{b.roi}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'recommendations' && (
          <div className="glowing-card">
            <h3 className="section-title">
              <Lightbulb size={18} style={{ color: 'var(--saffron)' }} />
              AI Strategic Recommendations Ranked by Impact
            </h3>
            <div className="custom-table-container">
              <table className="pulse-table">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Recommendation</th>
                    <th>Expected Benefit</th>
                    <th>Difficulty</th>
                    <th>Lead Time</th>
                  </tr>
                </thead>
                <tbody>
                  {recommendations.map(r => (
                    <tr key={r.priority}>
                      <td style={{ fontWeight: 'bold', color: 'var(--saffron)' }}>#{r.priority}</td>
                      <td><strong>{r.title}</strong></td>
                      <td>{r.benefit}</td>
                      <td>
                        <span className={`badge-status ${r.difficulty === 'High' ? 'crit' : r.difficulty === 'Medium' ? 'hi' : 'lo'}`}>
                          {r.difficulty}
                        </span>
                      </td>
                      <td>{r.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Real-time Telemetry Terminal Console */}
        <section className="glowing-card" style={{ padding: '20px', background: '#020617', border: '1px solid rgba(255,255,255,0.04)' }}>
          <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontFamily: 'var(--font-display)', marginBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '8px' }}>
            <Database size={14} style={{ color: 'var(--saffron)' }} />
            Ward 144 Real-time Ingestion Terminal
          </h4>
          <div style={{ height: '80px', overflowY: 'auto', fontFamily: 'monospace', fontSize: '0.75rem', color: '#10b981', display: 'flex', flexDirection: 'column', gap: '4px', lineHeight: '1.4' }}>
            {consoleLogs.map((log, index) => (
              <div key={index}>{log}</div>
            ))}
            <div ref={consoleEndRef} />
          </div>
        </section>

        <footer style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '20px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px' }}>
          <strong>UrbanPulse AI Dashboard (National Smart Cities Mission Support)</strong>
          <p style={{ marginTop: '2px' }}>Supported by Ministry of Housing and Urban Affairs, Government of India.</p>
        </footer>
      </main>
    </div>
  );
}
