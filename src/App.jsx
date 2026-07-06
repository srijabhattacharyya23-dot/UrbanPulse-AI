import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard, ShieldAlert, Users2, Activity,
  AlertOctagon, CheckCircle2, ChevronRight,
  TrendingUp, Trash2, Droplet, Lightbulb, MapPin,
  Wrench, Send, Landmark, HelpCircle, AlertTriangle, FileText
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

  // Raw Indian-context Complaints
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
      description: 'Entire street is in complete darkness since 6:30 PM. Safety risk for women and elderly returning from local temples. Active risk of vehicle accidents.'
    }
  ]);

  // Selected complaint tracker
  const selectedComplaint = complaints.find(c => c.id === selectedComplaintId) || complaints[0];

  // Citizen Response Generator logic
  const getCitizenResponse = (c) => {
    return `Dear Resident, we acknowledge your complaint regarding the ${c.category.toLowerCase()} issue: "${c.subcategory}" at ${c.location.split(',')[0]}. The ${c.department.split(' (')[0]} has deployed emergency crews to isolate the root cause. Target resolution time is ${c.resolutionTime}. We are tracking this under Ref ID: UP-${c.id}. Thank you for helping us keep Greenfield clean and safe.`;
  };

  // Top 5 Commissioner Decisions
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

  // Handle Decision Approvals
  const approveDecision = (id) => {
    if (approvedDecisions[id]) return;
    setApprovedDecisions(prev => ({ ...prev, [id]: true }));
    setHealthScore(prev => Math.min(prev + 8, 100));
  };

  // Resource optimization simulator
  const handleResourceSim = () => {
    // Total workers available is 30
    const totalAllocated = Object.values(allocatedWorkers).reduce((a, b) => a + Number(b), 0);
    if (totalAllocated > 30) {
      alert(`Resource allocation exceeds available capacity! You allocated ${totalAllocated} workers, but only 30 are available.`);
      return;
    }

    setSimulationRun(true);
    // Dynamic results based on allocation
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

    // Boost overall health score based on optimization efficiency
    setHealthScore(prev => Math.min(42 + Math.floor(efficiencyScore / 2), 100));
  };

  // AI recommendations array (10 items)
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

  // Budget data
  const budgetAllocations = [
    { dept: 'Greenfield Jal Board (Water & Sewer)', percentage: 50, priority: 'Critical', roi: '145% (Health cost avoidance & clean water restoration)' },
    { dept: 'PWD (Roads & Bridges Division)', percentage: 30, priority: 'High', roi: '110% (Transit corridor restoration & safety liability reduction)' },
    { dept: 'Swachh Bharat Division (Solid Waste)', percentage: 10, priority: 'Medium', roi: '90% (Prevent disease vectors & restore commercial trade)' },
    { dept: 'DISCOM (Electricity & Lighting Department)', percentage: 10, priority: 'Medium', roi: '85% (Reduce night road accidents and crime risk indices)' }
  ];

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
          <div className="logo-icon">
            <Activity size={24} />
          </div>
          <div className="logo-text">
            <h1>UrbanPulse AI</h1>
            <span>Ward 144 Control</span>
          </div>
        </div>

        <nav className="nav-menu">
          <div className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
            <LayoutDashboard size={18} />
            Executive Dashboard
          </div>
          <div className={`nav-item ${activeTab === 'resource' ? 'active' : ''}`} onClick={() => setActiveTab('resource')}>
            <Wrench size={18} />
            Resource Allocator
          </div>
          <div className={`nav-item ${activeTab === 'decisions' ? 'active' : ''}`} onClick={() => setActiveTab('decisions')}>
            <Landmark size={18} />
            Commissioner Actions
          </div>
          <div className={`nav-item ${activeTab === 'predictive' ? 'active' : ''}`} onClick={() => setActiveTab('predictive')}>
            <TrendingUp size={18} />
            Predictive Analytics
          </div>
          <div className={`nav-item ${activeTab === 'recommendations' ? 'active' : ''}`} onClick={() => setActiveTab('recommendations')}>
            <Lightbulb size={18} />
            AI Recommendations
          </div>
        </nav>

        <div className="sidebar-footer">
          <div className="officer-profile">
            <div className="profile-avatar">S</div>
            <div className="profile-info">
              <h4>Commissioner</h4>
              <p>Greenfield Smart City</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Panel */}
      <main className="main-content">
        <header className="header-actions">
          <div className="welcome-section">
            <p>Urban Decision Intelligence System</p>
            <h2>Mahanagar Control Dashboard</h2>
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <span className="badge-live">Live Ingestion Active</span>
            <div className="clock-panel">
              <MapPin size={16} className="text-saffron" style={{ color: 'var(--accent-saffron)' }} />
              <span>Greenfield Sector 3 | 2026-07-06</span>
            </div>
          </div>
        </header>

        {/* Quick Metrics Grid */}
        <section className="metrics-grid">
          <div className="glass-panel metric-card" style={{ borderLeft: '4px solid var(--accent-saffron)' }}>
            <div className="metric-header">
              <span>Overall Ward Health</span>
              <Activity size={18} style={{ color: 'var(--accent-saffron)' }} />
            </div>
            <div className="metric-value" style={{ color: healthScore < 50 ? 'var(--accent-crimson)' : healthScore < 85 ? 'var(--accent-yellow)' : 'var(--accent-emerald)' }}>
              {healthScore} / 100
            </div>
            <div className="metric-trend trend-down">
              <span>Severe Cascading Pipeline Breaches</span>
            </div>
          </div>

          <div className="glass-panel metric-card" style={{ borderLeft: '4px solid var(--accent-navy)' }}>
            <div className="metric-header">
              <span>Active Complaints</span>
              <ShieldAlert size={18} style={{ color: 'var(--accent-navy)' }} />
            </div>
            <div className="metric-value">6</div>
            <div className="metric-trend text-secondary">
              <span>5 Unique Cases | 1 Duplicate</span>
            </div>
          </div>

          <div className="glass-panel metric-card" style={{ borderLeft: '4px solid var(--accent-emerald)' }}>
            <div className="metric-header">
              <span>Emergency Staff</span>
              <Users2 size={18} style={{ color: 'var(--accent-emerald)' }} />
            </div>
            <div className="metric-value">30 Workers</div>
            <div className="metric-trend trend-up">
              <span>100% On-Site Deployment</span>
            </div>
          </div>

          <div className="glass-panel metric-card" style={{ borderLeft: '4px solid var(--accent-crimson)' }}>
            <div className="metric-header">
              <span>Hotspot Risk Level</span>
              <AlertOctagon size={18} style={{ color: 'var(--accent-crimson)' }} />
            </div>
            <div className="metric-value text-red" style={{ color: 'var(--accent-crimson)' }}>Critical</div>
            <div className="metric-trend trend-down">
              <span>Sector 3 Metro corridor unstable</span>
            </div>
          </div>
        </section>

        {/* Tab View Conditional Rendering */}
        {activeTab === 'dashboard' && (
          <div className="dashboard-grid">
            {/* Left Column: Complaints Feed & Hotspots */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              <div className="glass-panel" style={{ padding: '24px' }}>
                <h3 className="section-title">
                  <FileText size={20} style={{ color: 'var(--accent-saffron)' }} />
                  Citizen Ingested Complaints
                </h3>
                <div className="table-container">
                  <table className="complaints-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Issue Summary</th>
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
                          style={{ background: selectedComplaintId === c.id ? 'rgba(255, 255, 255, 0.04)' : '' }}
                        >
                          <td style={{ fontWeight: 'bold', color: 'var(--accent-saffron)' }}>{c.id}</td>
                          <td style={{ maxWidth: '280px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                            {c.title}
                          </td>
                          <td><span className="department-chip">{c.category}</span></td>
                          <td>
                            <span className={`badge-pill severity-${c.severity.toLowerCase()}`}>
                              {c.severity}
                            </span>
                          </td>
                          <td><span className="score-badge">{c.priority}</span></td>
                          <td>
                            <span style={{ 
                              color: c.status === 'Duplicate' ? 'var(--text-muted)' : 
                                     c.status === 'In Progress' ? 'var(--accent-yellow)' : 'var(--accent-crimson)'
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

              {/* Duplicate Detection Alert & Verification */}
              <div className="glass-panel duplicate-panel">
                <div className="dup-header">
                  <div>
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.05rem', fontWeight: 700 }}>
                      <AlertOctagon size={18} style={{ color: 'var(--accent-saffron)' }} />
                      Smart Duplicate Engine Active
                    </h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      Analyzing incoming reports for spatial and semantic overlaps.
                    </p>
                  </div>
                  <div className="similarity-gauge">94%</div>
                </div>

                <div className="merge-box">
                  <strong>Semantic Overlap Flagged:</strong> Complaint <strong>CP-2026-003</strong> ("Deep road crater next to Metro Station exit...") matches <strong>CP-2026-001</strong> ("Major road collapse/sinkhole...") with 94% similarity.
                  <br /><br />
                  <strong>Recommendation:</strong> Merge and redirect crews. Set CP-2026-003 to <em>Duplicate - Closed</em>.
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button className="btn-primary" onClick={() => {
                    setComplaints(prev => prev.map(c => c.id === 'CP-2026-003' ? { ...c, status: 'Duplicate' } : c));
                    alert('CP-2026-003 has been successfully merged into parent ticket CP-2026-001.');
                  }}>
                    Merge & Close Duplicate
                  </button>
                </div>
              </div>

              {/* Budget Allocation Panel */}
              <div className="glass-panel" style={{ padding: '24px' }}>
                <h3 className="section-title">
                  <Landmark size={20} style={{ color: 'var(--accent-saffron)' }} />
                  Emergency Budget Recommendations
                </h3>
                <div className="budget-list">
                  {budgetAllocations.map((b, idx) => (
                    <div className="budget-item" key={idx}>
                      <div className="budget-info">
                        <span style={{ fontWeight: '600' }}>{b.dept}</span>
                        <span style={{ color: 'var(--accent-saffron)', fontWeight: 'bold' }}>{b.percentage}% Allocation</span>
                      </div>
                      <div className="budget-bar-bg">
                        <div 
                          className="budget-bar-fg" 
                          style={{ 
                            width: `${b.percentage}%`,
                            background: idx === 0 ? 'var(--accent-crimson)' : idx === 1 ? 'var(--accent-saffron)' : 'var(--accent-navy)'
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

            {/* Right Column: Detailed Complaint view, Visual Intel, and Citizen Reply */}
            <div className="side-panel">
              {/* Detailed Complaint Inspection Card */}
              <div className="glass-panel detail-card" style={{ borderTop: '4px solid var(--accent-saffron)' }}>
                <div className="detail-header">
                  <div>
                    <span className="badge-pill severity-critical" style={{ marginBottom: '8px' }}>
                      {selectedComplaint.urgency}
                    </span>
                    <h3>{selectedComplaint.id}: Complaint Analysis</h3>
                  </div>
                  <span className="score-badge" style={{ fontSize: '1rem', padding: '6px 12px' }}>
                    Priority: {selectedComplaint.priority}
                  </span>
                </div>

                <div className="detail-grid">
                  <div className="detail-item">
                    <label>Ward & Location</label>
                    <span>{selectedComplaint.location}</span>
                  </div>
                  <div className="detail-item">
                    <label>Responsible Department</label>
                    <span>{selectedComplaint.department}</span>
                  </div>
                  <div className="detail-item">
                    <label>Estimated Citizens Impacted</label>
                    <span style={{ color: 'var(--accent-saffron)' }}>{selectedComplaint.citizensAffected.toLocaleString()}</span>
                  </div>
                  <div className="detail-item">
                    <label>Target Resolution Time</label>
                    <span>{selectedComplaint.resolutionTime}</span>
                  </div>
                </div>

                <div className="desc-box">
                  <strong>Citizen Report Description:</strong><br />
                  "{selectedComplaint.description}"
                </div>

                <div style={{ fontSize: '0.85rem', marginBottom: '20px' }}>
                  <span style={{ color: 'var(--text-secondary)', display: 'block', fontSize: '0.75rem', marginBottom: '4px' }}>Root Cause Analysis</span>
                  <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{selectedComplaint.rootCause}</span>
                </div>

                {/* If selected has image, show Image Intelligence */}
                {selectedComplaint.image && (
                  <div className="image-assessment-container">
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>Visual Analysis Platform (AI Vision Intel)</span>
                    <div className="image-preview-frame" style={{ backgroundImage: `url('/sinkhole.jpg')`, backgroundColor: '#1e293b' }}>
                      <div className="scanner-line"></div>
                      <div className="overlay-ai">
                        <div>
                          <strong>VISIBLE DAMAGE:</strong> Asphalt Shear Structural Void Exposing Utility conduits.
                        </div>
                        <div style={{ color: 'var(--accent-saffron)', fontWeight: 'bold' }}>
                          CONFIDENCE: 95%
                        </div>
                      </div>
                    </div>
                    <div style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '8px' }}>
                      <strong style={{ color: 'var(--accent-saffron)' }}>Immediate Corrective Action:</strong> Isolation of Valve V-102 to halt soil erosion, direct concrete flowable backfill compaction.
                      <br /><br />
                      <strong>Long-term:</strong> HDPE pipeline sleeve relining along subway corridor lines.
                    </div>
                  </div>
                )}
              </div>

              {/* Citizen Response Generator */}
              <div className="glass-panel response-container">
                <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem', fontWeight: 700 }}>
                  <Send size={18} style={{ color: 'var(--accent-saffron)' }} />
                  Citizen Response Output
                </h4>
                <div className="response-bubble">
                  {getCitizenResponse(selectedComplaint)}
                </div>
                <div className="word-count-badge">
                  {getCitizenResponse(selectedComplaint).split(' ').length} Words (Target: Max 80 words)
                </div>
                <button className="btn-primary" onClick={() => alert('Response dispatched to complainant and posted on citizen portal.')}>
                  Dispatch Response to Complainant
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'resource' && (
          <div className="glass-panel resource-allocator">
            <h3 className="section-title">
              <Wrench size={20} style={{ color: 'var(--accent-saffron)' }} />
              Interactive Tactical Resource Allocator
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '-12px', marginBottom: '8px' }}>
              Assign your emergency municipal staff to resolve the crisis. Total emergency workers available: **30**.
            </p>

            <div className="pool-container">
              <div className="pool-item">
                Total Personnel: <span className="pool-count">30 Workers</span>
              </div>
              <div className="pool-item">
                Garbage Trucks: <span className="pool-count">6 Units</span>
              </div>
              <div className="pool-item">
                PWD Paving Teams: <span className="pool-count">4 Teams</span>
              </div>
              <div className="pool-item">
                Jal Board Water Crews: <span className="pool-count">3 Teams</span>
              </div>
              <div className="pool-item">
                Emergency/Disaster Squads: <span className="pool-count">2 Teams</span>
              </div>
            </div>

            <div className="simulator-controls">
              <div className="sim-row">
                <div className="sim-label">1. Grand Trunk Avenue Sinkhole (Critical)</div>
                <div>
                  <input 
                    type="number" 
                    className="sim-input" 
                    value={allocatedWorkers.sinkhole} 
                    onChange={(e) => setAllocatedWorkers({...allocatedWorkers, sinkhole: Number(e.target.value)})}
                  />
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Allocated Workers</span>
                </div>
                <div style={{ color: 'var(--accent-saffron)' }}>Priority Level: Emergency</div>
              </div>

              <div className="sim-row">
                <div className="sim-label">2. Tap Water Contamination flushing (Critical)</div>
                <div>
                  <input 
                    type="number" 
                    className="sim-input" 
                    value={allocatedWorkers.water} 
                    onChange={(e) => setAllocatedWorkers({...allocatedWorkers, water: Number(e.target.value)})}
                  />
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Allocated Workers</span>
                </div>
                <div style={{ color: 'var(--accent-saffron)' }}>Priority Level: Emergency</div>
              </div>

              <div className="sim-row">
                <div className="sim-label">3. Sector 3 Market Waste backlog clearing (High)</div>
                <div>
                  <input 
                    type="number" 
                    className="sim-input" 
                    value={allocatedWorkers.garbage} 
                    onChange={(e) => setAllocatedWorkers({...allocatedWorkers, garbage: Number(e.target.value)})}
                  />
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Allocated Workers</span>
                </div>
                <div style={{ color: 'var(--accent-yellow)' }}>Priority Level: High</div>
              </div>

              <div className="sim-row">
                <div className="sim-label">4. Sewage Manhole drainage bypass (High)</div>
                <div>
                  <input 
                    type="number" 
                    className="sim-input" 
                    value={allocatedWorkers.sewage} 
                    onChange={(e) => setAllocatedWorkers({...allocatedWorkers, sewage: Number(e.target.value)})}
                  />
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Allocated Workers</span>
                </div>
                <div style={{ color: 'var(--accent-yellow)' }}>Priority Level: Critical</div>
              </div>

              <div className="sim-row">
                <div className="sim-label">5. Streetlight outage grid repair (Medium)</div>
                <div>
                  <input 
                    type="number" 
                    className="sim-input" 
                    value={allocatedWorkers.streetlights} 
                    onChange={(e) => setAllocatedWorkers({...allocatedWorkers, streetlights: Number(e.target.value)})}
                  />
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Allocated Workers</span>
                </div>
                <div style={{ color: 'var(--accent-navy)' }}>Priority Level: Medium</div>
              </div>

              <div style={{ marginTop: '20px' }}>
                <button className="btn-primary" onClick={handleResourceSim}>
                  Run Allocation Simulator & Deploy Crews
                </button>
              </div>
            </div>

            {simulationRun && simulationResult && (
              <div style={{ marginTop: '28px', borderTop: '1px solid var(--card-border)', paddingTop: '24px' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '16px', color: 'var(--accent-emerald)' }}>
                  Simulation Output & Expected Improvements
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', marginBottom: '24px' }}>
                  <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Sinkhole Repair</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--accent-saffron)', fontFamily: 'var(--font-title)' }}>
                      {simulationResult.sinkholeTime} Hours
                    </div>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Water Purify</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--accent-saffron)', fontFamily: 'var(--font-title)' }}>
                      {simulationResult.waterTime} Hours
                    </div>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Market waste</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--accent-saffron)', fontFamily: 'var(--font-title)' }}>
                      {simulationResult.garbageTime} Hours
                    </div>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Sewage Bypass</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--accent-saffron)', fontFamily: 'var(--font-title)' }}>
                      {simulationResult.sewageTime} Hours
                    </div>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Lights Restoration</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--accent-saffron)', fontFamily: 'var(--font-title)' }}>
                      {simulationResult.lightsTime} Hours
                    </div>
                  </div>
                </div>

                <div className="glass-panel" style={{ padding: '20px', background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                  <strong>Operational Efficiency Rating: {simulationResult.efficiency}%</strong>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    Deployment configuration matches standard safety ratios. Community Health Score boosted to **{healthScore}/100**!
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'decisions' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="glass-panel" style={{ padding: '24px' }}>
              <h3 className="section-title">
                <Landmark size={20} style={{ color: 'var(--accent-saffron)' }} />
                Commissioner Executive Policy Mandates
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '-12px', marginBottom: '20px' }}>
                Review and approve the top five administrative directives to manage the Ward 144 infrastructure crisis.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {commissionerDecisions.map((d) => (
                  <div className="decision-card-item" key={d.id}>
                    <div className="decision-top">
                      <span className="decision-badge">{d.id}: Emergency Directive</span>
                      <span className="decision-impact">Impact Boost: +8 Health Score Points</span>
                    </div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: '700' }}>{d.title}</h4>
                    <p style={{ fontSize: '0.85rem', lineHeight: '1.4' }}>
                      <strong>The Problem:</strong> {d.problem}
                    </p>
                    <p style={{ fontSize: '0.85rem', lineHeight: '1.4' }}>
                      <strong>Directive:</strong> {d.decision}
                    </p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      <strong>Rationale:</strong> {d.why}
                    </p>
                    <div className="decision-meta">
                      <span>Resources: <strong>{d.resources}</strong></span>
                      <span>Target Implementation: <strong>{d.timeline}</strong></span>
                    </div>
                    <div style={{ alignSelf: 'flex-end', marginTop: '10px' }}>
                      {approvedDecisions[d.id] ? (
                        <div className="approved-state">
                          <CheckCircle2 size={16} /> Approved & Active
                        </div>
                      ) : (
                        <button className="btn-primary" onClick={() => approveDecision(d.id)}>
                          Approve and Execute
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
            <div className="glass-panel" style={{ padding: '24px' }}>
              <h3 className="section-title">
                <TrendingUp size={20} style={{ color: 'var(--accent-saffron)' }} />
                AI Spatial & Health Risk Predictions (72H - 1W Outlook)
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="hotspot-item">
                  <div className="hotspot-badge">
                    <AlertTriangle size={20} />
                  </div>
                  <div className="hotspot-info">
                    <h4>Secondary Soil Collapses on Grand Trunk Corridor</h4>
                    <p>
                      Soil water saturation index has reached **85%** at metro exit area. Continuous vibration from passing elevated metro coaches could trigger a secondary sub-base collapse if lanes are not locked. Estimated probability: **68%** in the next 48 hours.
                    </p>
                  </div>
                </div>

                <div className="hotspot-item">
                  <div className="hotspot-badge">
                    <AlertTriangle size={20} />
                  </div>
                  <div className="hotspot-info">
                    <h4>Localized Gastroenteritis/Cholera Outbreak</h4>
                    <p>
                      Due to the drinking water line breach, residential Blocks C and D are exposed to fecal matter and turbidity peaks of **18.2 NTU**. Models predict a localized spike in clinical visits for gastrointestinal illness within 5 days if flushing is delayed.
                    </p>
                  </div>
                </div>

                <div className="hotspot-item" style={{ borderColor: 'rgba(37,99,235,0.15)', background: 'rgba(37,99,235,0.03)' }}>
                  <div className="hotspot-badge" style={{ background: 'var(--accent-navy-light)', color: 'var(--accent-navy)' }}>
                    <Users2 size={20} />
                  </div>
                  <div className="hotspot-info">
                    <h4>Jal Board Resource Saturation Alert</h4>
                    <p>
                      Water board maintenance crews are currently operating at **100% capacity**. Any additional sewerage or pipeline blockages in the neighborhood will lead to resolution delays exceeding **72 hours** due to staff shortages.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '24px' }}>
              <h3 className="section-title">
                <MapPin size={20} style={{ color: 'var(--accent-saffron)' }} />
                Identified Infrastructure Hotspots (Zone 3 Area Map List)
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '8px' }}>
                  <strong>Sector 3 Metro Elevated Footing Area</strong>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '6px' }}>
                    High-stress transit loading zone. Subsurface soil erosion voids present. Proximity to pillar 128 is critical.
                  </p>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '8px' }}>
                  <strong>Block B Commercial Market Square</strong>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '6px' }}>
                    Intersecting sewer main pressure zones. Blockages are causing backflow into low-lying sidewalk outlets.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'recommendations' && (
          <div className="glass-panel" style={{ padding: '24px' }}>
            <h3 className="section-title">
              <Lightbulb size={20} style={{ color: 'var(--accent-saffron)' }} />
              AI Actionable Recommendations Ranked by Strategic Impact
            </h3>
            <div className="table-container">
              <table className="complaints-table">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Actionable Recommendation</th>
                    <th>Expected Benefit</th>
                    <th>Difficulty</th>
                    <th>Est. Lead Time</th>
                  </tr>
                </thead>
                <tbody>
                  {recommendations.map(r => (
                    <tr key={r.priority}>
                      <td style={{ fontWeight: 'bold', color: 'var(--accent-saffron)' }}>#{r.priority}</td>
                      <td><strong>{r.title}</strong></td>
                      <td>{r.benefit}</td>
                      <td>
                        <span className={`badge-pill severity-${r.difficulty === 'High' ? 'critical' : r.difficulty === 'Medium' ? 'high' : 'low'}`}>
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

        <footer style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '40px', borderTop: '1px solid var(--card-border)', paddingTop: '20px' }}>
          <strong>UrbanPulse AI Platform v2.4 (National Smart Cities Mission Support)</strong>
          <p style={{ marginTop: '4px' }}>Developed for City Commissioners, Municipal Corporations, and Disaster Response Command Centers.</p>
        </footer>
      </main>
    </div>
  );
}
