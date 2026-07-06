import React, { useState, useEffect, useRef } from 'react';
import {
  LayoutDashboard, ShieldAlert, Users2, Activity,
  AlertOctagon, CheckCircle2, ChevronRight,
  TrendingUp, Trash2, Droplet, Lightbulb, MapPin,
  Wrench, Send, Landmark, HelpCircle, AlertTriangle, FileText,
  Clock, Shield, BarChart3, Database, ShieldCheck, Plus, Check, PenTool
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

  // New Incident Form States
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Infrastructure');
  const [newSubcategory, setNewSubcategory] = useState('Road Damage (PWD)');
  const [newSeverity, setNewSeverity] = useState('High');
  const [newUrgency, setNewUrgency] = useState('High');
  const [newLocation, setNewLocation] = useState('Sector 3 Main Bypass');
  const [newCitizens, setNewCitizens] = useState(2500);
  const [newDescription, setNewDescription] = useState('');

  // Emergency Reserve Budget State (INR Lakhs)
  const [reserveFunds, setReserveFunds] = useState(50.0); // INR 50 Lakhs

  // Subsurface GPR Scanner States
  const [scanActive, setScanActive] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanResult, setScanResult] = useState(null);

  // AI Advice Tab States
  const [copilotObjective, setCopilotObjective] = useState('safety');
  const [copilotPrompt, setCopilotPrompt] = useState('');
  const [copilotReply, setCopilotReply] = useState('');
  const [copilotLoading, setCopilotLoading] = useState(false);

  // Active Field Squads State
  const [squads, setSquads] = useState([
    { id: 'SQ-PWD-1', name: 'PWD Rapid Pavement Unit 1', dept: 'PWD', status: 'REPAIRING', assignment: 'CP-2026-001' },
    { id: 'SQ-JAL-1', name: 'Jal Board Emergency Pipe Crew 3', dept: 'Jal Board', status: 'REPAIRING', assignment: 'CP-2026-002' },
    { id: 'SQ-SBM-1', name: 'Swachh Bharat Waste Compactor 8', dept: 'Swachh Bharat', status: 'IDLE', assignment: 'None' },
    { id: 'SQ-JAL-2', name: 'Jal Board Sewer Flush Squad 2', dept: 'Jal Board', status: 'REPAIRING', assignment: 'CP-2026-005' },
    { id: 'SQ-ELE-1', name: 'DISCOM Streetlight Grid Squad', dept: 'DISCOM', status: 'IDLE', assignment: 'None' }
  ]);

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
      resources: 'INR 3.5 Lakhs emergency fund authorization.',
      cost: 3.5,
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
      cost: 1.0,
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
      cost: 2.2,
      timeline: '4 Hours'
    },
    {
      id: 'D4',
      title: 'Launch Ward-Wide Subsurface GPR Survey',
      problem: 'Undetected pipeline leaks can cause secondary sinkholes along Metro corridors.',
      decision: 'Deploy Ground-Penetrating Radar (GPR) to scan all high-traffic road channels.',
      why: 'Finds subsurface air voids and washouts before they collapse under traffic.',
      impact: 'Proactively prevents catastrophic collapses along transit lines.',
      resources: 'Contractor hiring, INR 6.0 Lakhs.',
      cost: 6.0,
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
      cost: 1.5,
      timeline: '12 Hours'
    }
  ];

  // Submit New Complaint Form Action
  const handleAddIncident = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDescription.trim()) {
      alert('Please fill in the incident title and details!');
      return;
    }

    const newId = `CP-2026-00${complaints.length + 1}`;
    const colors = {
      'Infrastructure': 'glow-crimson',
      'Water & Sanitation': 'glow-saffron',
      'Solid Waste': 'glow-yellow',
      'Public Safety': 'glow-blue'
    };

    const newTicket = {
      id: newId,
      title: newTitle,
      category: newCategory,
      subcategory: newSubcategory,
      severity: newSeverity,
      priority: Math.floor(Math.random() * 40) + 50,
      urgency: newUrgency,
      citizensAffected: Number(newCitizens) || 1500,
      department: newCategory === 'Infrastructure' ? 'PWD (Public Works Department)' :
                  newCategory === 'Water & Sanitation' ? 'Greenfield Jal Board' :
                  newCategory === 'Solid Waste' ? 'Swachh Bharat Division' : 'DISCOM (Electricity)',
      rootCause: 'Under investigation by AI Diagnostics.',
      resolutionTime: '24 Hours',
      status: 'Open',
      image: null,
      location: newLocation,
      date: new Date().toISOString().substring(0, 16),
      mapX: `${Math.floor(Math.random() * 60) + 20}%`,
      mapY: `${Math.floor(Math.random() * 60) + 20}%`,
      colorClass: colors[newCategory] || 'glow-yellow',
      description: newDescription
    };

    setComplaints(prev => [...prev, newTicket]);
    setSelectedComplaintId(newId);
    setHealthScore(prev => Math.max(prev - 5, 10)); // Deduct health temporarily on new incident

    // Push console logs
    const timestamp = new Date().toLocaleTimeString();
    setConsoleLogs(prev => [
      ...prev,
      `[CITIZEN INGESTION] Logged ticket ${newId}: "${newTitle}"`,
      `[AI DIAGNOSTICS] Registered coordinate pin at map grids.`
    ]);

    // Reset Form
    setNewTitle('');
    setNewDescription('');
    alert(`Incident ${newId} logged successfully onto Mahanagar portal!`);
  };

  // Digital Mandate Signatures
  const approveDecision = (id, cost) => {
    if (approvedDecisions[id]) return;
    if (reserveFunds < cost) {
      alert('Insufficient emergency reserve funds to execute this directive!');
      return;
    }

    setApprovedDecisions(prev => ({ ...prev, [id]: 'Signing...' }));

    setTimeout(() => {
      setApprovedDecisions(prev => ({ ...prev, [id]: 'Authorized' }));
      setReserveFunds(prev => Number((prev - cost).toFixed(2)));
      setHealthScore(prev => Math.min(prev + 10, 100));
      setConsoleLogs(prev => [...prev, `[COMMAND] Commissioner authorized Directive ${id}. Reserve budget committed: -INR ${cost} Lakhs.`]);
    }, 1200);
  };

  // Subsurface GPR Scanner simulator trigger
  const runSubsurfaceScan = () => {
    if (scanActive) return;
    setScanActive(true);
    setScanProgress(0);
    setScanResult(null);

    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setScanActive(false);
          setScanResult({
            anomaliesFound: 3,
            maxDepth: '3.4 meters',
            voidProbability: '89%',
            status: 'High Soil Saturation detected under Metro Pillar 128 foundation.'
          });
          setConsoleLogs(prevLogs => [
            ...prevLogs,
            `[GPR SCANNER] Subsurface scanning completed. 3 void cavities found.`,
            `[AI PREDICTOR] Soil structural safety ratio dropped to 0.42 near GT Avenue.`
          ]);
          return 100;
        }
        return prev + 10;
      });
    }, 250);
  };

  // AI Recommender Engine strategy picker
  const handleStrategyChange = (strategy) => {
    setCopilotObjective(strategy);
    setConsoleLogs(prev => [...prev, `[AI COPILOT] Active operational strategy changed to: ${strategy.toUpperCase()}`]);
  };

  // Interactive AI Advice Prompt Box handler
  const handleCopilotQuery = (e) => {
    e.preventDefault();
    if (!copilotPrompt.trim()) return;

    setCopilotLoading(true);
    setConsoleLogs(prev => [...prev, `[USER COMMAND] Query sent to AI Copilot: "${copilotPrompt}"`]);

    setTimeout(() => {
      let replyText = '';
      const query = copilotPrompt.toLowerCase();

      if (query.includes('sinkhole') || query.includes('road')) {
        replyText = `Tactical Strategy Plan for Road Collapse (GT Road):\n1. Authorize Section 14 Emergency Procurement immediately to deploy rapid-set concrete.\n2. Force close flow valve V-102 (downstream from Jal Board) to stop pipeline water flushing soil.\n3. Assign PWD Pavement Unit 1 (SQ-PWD-1) directly to site forJersey Barriers staging.`;
      } else if (query.includes('water') || query.includes('turbidity') || query.includes('dirty')) {
        replyText = `Tactical Strategy Plan for Tap Water Contamination:\n1. Commit INR 2.2 Lakhs to mobilize 12 water tankers to Blocks C & D immediately.\n2. Instruct Jal Board Crew 3 (SQ-JAL-1) to start pipeline hyper-chlorination flushing.\n3. Keep the public informed via SMS push reminders to boil water before drinking.`;
      } else if (query.includes('sewer') || query.includes('market')) {
        replyText = `Tactical Strategy Plan for Sewer Overflow near Market:\n1. Direct Jal Board Crew (SQ-JAL-2) to initiate hydro-jetting blockage extraction.\n2. Co-ordinate with Swachh Bharat compactors to wash down retail sidewalks.\n3. Expected time to extract blockage and dry sidewalk: 6 hours.`;
      } else {
        replyText = `Tactical Command recommendation for Greenfield Ward 144:\n- Your overall community health score is currently at ${healthScore}%.\n- High priority items: Grand Trunk Avenue Road Collapse (CP-2026-001) and Water Quality (CP-2026-002).\n- Recommended actions: Approve direct emergency mandates D1 and D3 in your Executive panel to bypass department delays.`;
      }

      setCopilotReply(replyText);
      setCopilotLoading(false);
      setConsoleLogs(prev => [...prev, `[AI COPILOT] Strategic instructions compiled successfully.`]);
    }, 1500);
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

  // Squad Assigner dropdown action
  const handleAssignSquad = (squadId, complaintId) => {
    setSquads(prev => prev.map(s => {
      if (s.id === squadId) {
        const timestamp = new Date().toLocaleTimeString();
        setConsoleLogs(prevLogs => [...prevLogs, `[DISPATCH] Reassigned squad ${s.name} to ticket ${complaintId}`]);
        return { 
          ...s, 
          assignment: complaintId, 
          status: complaintId === 'None' ? 'IDLE' : 'REPAIRING' 
        };
      }
      return s;
    }));
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

  // Disease Outbreak Risk calculation based on Water Staff Allocation
  const waterWorkers = allocatedWorkers.water;
  const diseaseRiskVal = Math.max(10, Math.floor(82 - (waterWorkers * 8)));

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
            <LayoutDashboard size={16} />
            Command Dashboard
          </div>
          <div className={`nav-item ${activeTab === 'resource' ? 'active' : ''}`} onClick={() => setActiveTab('resource')}>
            <Wrench size={16} />
            Tactical Allocator
          </div>
          <div className={`nav-item ${activeTab === 'decisions' ? 'active' : ''}`} onClick={() => setActiveTab('decisions')}>
            <Landmark size={16} />
            Executive Mandates
          </div>
          <div className={`nav-item ${activeTab === 'predictive' ? 'active' : ''}`} onClick={() => setActiveTab('predictive')}>
            <TrendingUp size={16} />
            Spatial Predictions
          </div>
          <div className={`nav-item ${activeTab === 'recommendations' ? 'active' : ''}`} onClick={() => setActiveTab('recommendations')}>
            <Lightbulb size={16} />
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
            <div className="clock-panel" style={{ background: 'rgba(255,255,255,0.02)', padding: '8px 14px', borderRadius: '8px', border: '1px solid var(--card-border)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={14} style={{ color: 'var(--saffron)' }} />
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
            <div style={{ width: '64px', height: '64px', position: 'relative' }}>
              <svg width="64" height="64" viewBox="0 0 80 80">
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
                <span className="metric-num">{complaints.length}</span>
                <span className="metric-desc">{complaints.filter(c=>c.status!=='Duplicate').length} unique | {complaints.filter(c=>c.status==='Duplicate').length} duplicate</span>
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
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
                          <td style={{ maxWidth: '180px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
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

              {/* Log a New Incident Form (Feature Addition) */}
              <div className="glowing-card">
                <h3 className="section-title" style={{ color: 'var(--saffron)' }}>
                  <Plus size={18} />
                  Log Emergency Incident (Direct Ingestion)
                </h3>
                <form onSubmit={handleAddIncident} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Incident Title / Core Summary</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Broken sewer cover causing roadway blockages"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      style={{ background: '#090d16', border: '1px solid var(--card-border)', borderRadius: '6px', padding: '10px', color: 'white', outline: 'none' }}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Category</label>
                    <select 
                      value={newCategory} 
                      onChange={(e) => setNewCategory(e.target.value)}
                      style={{ background: '#090d16', border: '1px solid var(--card-border)', borderRadius: '6px', padding: '10px', color: 'white' }}
                    >
                      <option value="Infrastructure">Infrastructure</option>
                      <option value="Water & Sanitation">Water & Sanitation</option>
                      <option value="Solid Waste">Solid Waste</option>
                      <option value="Public Safety">Public Safety</option>
                    </select>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Location Area</label>
                    <input 
                      type="text" 
                      value={newLocation}
                      onChange={(e) => setNewLocation(e.target.value)}
                      style={{ background: '#090d16', border: '1px solid var(--card-border)', borderRadius: '6px', padding: '10px', color: 'white', outline: 'none' }}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Severity</label>
                    <select 
                      value={newSeverity} 
                      onChange={(e) => setNewSeverity(e.target.value)}
                      style={{ background: '#090d16', border: '1px solid var(--card-border)', borderRadius: '6px', padding: '10px', color: 'white' }}
                    >
                      <option value="Critical">Critical</option>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                    </select>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Impacted Residents count</label>
                    <input 
                      type="number" 
                      value={newCitizens}
                      onChange={(e) => setNewCitizens(e.target.value)}
                      style={{ background: '#090d16', border: '1px solid var(--card-border)', borderRadius: '6px', padding: '10px', color: 'white', outline: 'none' }}
                    />
                  </div>
                  <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Citizen Text Message / Ingested Complaint Details</label>
                    <textarea 
                      placeholder="Enter the raw citizen report details..."
                      rows="2"
                      value={newDescription}
                      onChange={(e) => setNewDescription(e.target.value)}
                      style={{ background: '#090d16', border: '1px solid var(--card-border)', borderRadius: '6px', padding: '10px', color: 'white', outline: 'none', resize: 'none' }}
                    />
                  </div>
                  <div style={{ gridColumn: 'span 2', textAlign: 'right' }}>
                    <button type="submit" className="cyber-btn-primary" style={{ width: '100%' }}>
                      Log Incident into Command Matrix
                    </button>
                  </div>
                </form>
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

              {/* Interactive Map Grid */}
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
                      style={{ left: c.mapX, top: c.mapY, width: selectedComplaintId === c.id ? '14px' : '9px', height: selectedComplaintId === c.id ? '14px' : '9px' }}
                      onClick={() => setSelectedComplaintId(c.id)}
                      title={c.title}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Hand: Inspection details, visual scan and SMS replies */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
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

                <div style={{ fontSize: '0.88rem', marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-display)', marginBottom: '6px' }}>AI Identified Root Cause</label>
                  <span style={{ fontWeight: '600' }}>{selectedComplaint.rootCause}</span>
                </div>

                {selectedComplaint.image && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-display)' }}>Visual Scan (Active Core)</label>
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
                <div style={{ background: 'rgba(0, 0, 0, 0.15)', padding: '16px', borderRadius: '8px', fontSize: '0.85rem', lineHeight: '1.5', border: '1px solid var(--card-border)' }}>
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
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1.6fr', gap: '24px' }}>
            <div className="glowing-card resource-box">
              <h3 className="section-title">
                <Wrench size={18} style={{ color: 'var(--saffron)' }} />
                Tactical Allocator Simulator
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
                  <span className="slider-label">Road Collapse</span>
                  <input 
                    type="range" 
                    min="0" 
                    max="30" 
                    className="custom-range-input" 
                    value={allocatedWorkers.sinkhole} 
                    onChange={(e) => setAllocatedWorkers({...allocatedWorkers, sinkhole: Number(e.target.value)})}
                  />
                  <span className="glow-num" style={{ textAlign: 'center' }}>{allocatedWorkers.sinkhole}</span>
                </div>

                <div className="slider-row">
                  <span className="slider-label">Water Contamination</span>
                  <input 
                    type="range" 
                    min="0" 
                    max="30" 
                    className="custom-range-input" 
                    value={allocatedWorkers.water} 
                    onChange={(e) => setAllocatedWorkers({...allocatedWorkers, water: Number(e.target.value)})}
                  />
                  <span className="glow-num" style={{ textAlign: 'center' }}>{allocatedWorkers.water}</span>
                </div>

                <div className="slider-row">
                  <span className="slider-label">Garbage Backlog</span>
                  <input 
                    type="range" 
                    min="0" 
                    max="30" 
                    className="custom-range-input" 
                    value={allocatedWorkers.garbage} 
                    onChange={(e) => setAllocatedWorkers({...allocatedWorkers, garbage: Number(e.target.value)})}
                  />
                  <span className="glow-num" style={{ textAlign: 'center' }}>{allocatedWorkers.garbage}</span>
                </div>

                <div className="slider-row">
                  <span className="slider-label">Sewer Overflow</span>
                  <input 
                    type="range" 
                    min="0" 
                    max="30" 
                    className="custom-range-input" 
                    value={allocatedWorkers.sewage} 
                    onChange={(e) => setAllocatedWorkers({...allocatedWorkers, sewage: Number(e.target.value)})}
                  />
                  <span className="glow-num" style={{ textAlign: 'center' }}>{allocatedWorkers.sewage}</span>
                </div>

                <div className="slider-row">
                  <span className="slider-label">Streetlights grid</span>
                  <input 
                    type="range" 
                    min="0" 
                    max="30" 
                    className="custom-range-input" 
                    value={allocatedWorkers.streetlights} 
                    onChange={(e) => setAllocatedWorkers({...allocatedWorkers, streetlights: Number(e.target.value)})}
                  />
                  <span className="glow-num" style={{ textAlign: 'center' }}>{allocatedWorkers.streetlights}</span>
                </div>
              </div>

              <div>
                <button className="cyber-btn-primary" onClick={handleResourceSim} style={{ width: '100%' }}>
                  Run Simulator & Deploy Crews
                </button>
              </div>

              {simulationRun && simulationResult && (
                <div style={{ marginTop: '16px', borderTop: '1px solid var(--card-border)', paddingTop: '20px' }}>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 'bold', color: 'var(--green)', marginBottom: '12px' }}>Resolution Timelines</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px', marginBottom: '16px' }}>
                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '8px', borderRadius: '6px', textAlign: 'center' }}>
                      <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Road</span>
                      <div style={{ fontSize: '1rem', fontWeight: 'bold', color: 'var(--saffron)' }}>{simulationResult.sinkholeTime}h</div>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '8px', borderRadius: '6px', textAlign: 'center' }}>
                      <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Water</span>
                      <div style={{ fontSize: '1rem', fontWeight: 'bold', color: 'var(--saffron)' }}>{simulationResult.waterTime}h</div>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '8px', borderRadius: '6px', textAlign: 'center' }}>
                      <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Trash</span>
                      <div style={{ fontSize: '1rem', fontWeight: 'bold', color: 'var(--saffron)' }}>{simulationResult.garbageTime}h</div>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '8px', borderRadius: '6px', textAlign: 'center' }}>
                      <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Sewer</span>
                      <div style={{ fontSize: '1rem', fontWeight: 'bold', color: 'var(--saffron)' }}>{simulationResult.sewageTime}h</div>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '8px', borderRadius: '6px', textAlign: 'center' }}>
                      <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Grid</span>
                      <div style={{ fontSize: '1rem', fontWeight: 'bold', color: 'var(--saffron)' }}>{simulationResult.lightsTime}h</div>
                    </div>
                  </div>

                  <div style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16,185,129,0.15)', padding: '12px', borderRadius: '8px', fontSize: '0.85rem' }}>
                    <strong>Configuration Efficiency: {simulationResult.efficiency}%</strong>
                  </div>
                </div>
              )}
            </div>

            {/* Tactical Staffing Ratio Charts & Coordinator (Feature Addition) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div className="glowing-card">
                <h3 className="section-title">
                  <BarChart3 size={18} style={{ color: 'var(--saffron)' }} />
                  Live Staffing Allocations
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {Object.entries(allocatedWorkers).map(([key, val]) => {
                    const pct = Math.max(5, Math.min(100, Math.floor((val / 30) * 100)));
                    const label = key === 'sinkhole' ? 'GT Road Sinkhole' :
                                  key === 'water' ? 'Water Purification' :
                                  key === 'garbage' ? 'Market Backlog' :
                                  key === 'sewage' ? 'Sewer Overflow' : 'Streetlights';
                    return (
                      <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                          <span>{label}</span>
                          <span style={{ fontWeight: 'bold' }}>{val} Workers ({pct}%)</span>
                        </div>
                        <div style={{ height: '8px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--card-border)', borderRadius: '4px', overflow: 'hidden' }}>
                          <div style={{ width: `${pct}%`, height: '100%', background: 'var(--saffron)' }}></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Squad Assigner Panel */}
              <div className="glowing-card">
                <h3 className="section-title">
                  <Users2 size={18} style={{ color: 'var(--saffron)' }} />
                  Squad Field Coordinator
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {squads.map(s => (
                    <div key={s.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.15)', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--card-border)', fontSize: '0.8rem' }}>
                      <div>
                        <strong style={{ color: 'white' }}>{s.name}</strong>
                        <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)' }}>Status: <span style={{ color: s.status === 'IDLE' ? 'var(--green)' : 'var(--yellow)' }}>{s.status}</span> | Assignment: {s.assignment}</span>
                      </div>
                      <div>
                        <select 
                          value={s.assignment}
                          onChange={(e) => handleAssignSquad(s.id, e.target.value)}
                          style={{ background: '#090d16', border: '1px solid var(--card-border)', borderRadius: '4px', padding: '4px 8px', color: 'white', fontSize: '0.75rem' }}
                        >
                          <option value="None">None (Standby)</option>
                          {complaints.filter(c => c.status !== 'Duplicate').map(c => (
                            <option key={c.id} value={c.id}>{c.id}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'decisions' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1.3fr', gap: '24px' }}>
            <div className="glowing-card">
              <h3 className="section-title">
                <Landmark size={18} style={{ color: 'var(--saffron)' }} />
                Administrative Crisis Directives
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '-12px', marginBottom: '24px' }}>
                Deploy policy actions to bypass departmental delays and allocate emergency city resources.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {commissionerDecisions.map((d) => (
                  <div className="directive-node" key={d.id}>
                    <div className="directive-meta">
                      <span className="directive-label">{d.id}: Emergency Mandate</span>
                      <span className="directive-boost">Health Index Boost: +10%</span>
                    </div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 'bold', color: 'white' }}>{d.title}</h4>
                    <p style={{ fontSize: '0.8rem', lineHeight: '1.4' }}>
                      <strong>Crisis Trigger:</strong> {d.problem}
                    </p>
                    <p style={{ fontSize: '0.8rem', lineHeight: '1.4' }}>
                      <strong>Directive:</strong> {d.decision}
                    </p>
                    <div className="directive-grid">
                      <span>Fund Commitment: <strong>INR {d.cost} Lakhs</strong></span>
                      <span>Execution Speed: <strong>{d.timeline}</strong></span>
                    </div>
                    <div style={{ alignSelf: 'flex-end', marginTop: '10px' }}>
                      {approvedDecisions[d.id] === 'Authorized' ? (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--green)', fontWeight: 'bold', fontSize: '0.85rem' }}>
                          <CheckCircle2 size={16} /> Authorized & Dispatched
                        </span>
                      ) : approvedDecisions[d.id] === 'Signing...' ? (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--yellow)', fontWeight: 'bold', fontSize: '0.85rem' }}>
                          <PenTool size={16} className="animate-pulse" /> Digitally Authorizing...
                        </span>
                      ) : (
                        <button className="cyber-btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '6px' }} onClick={() => approveDecision(d.id, d.cost)}>
                          <PenTool size={14} /> Authorize Mandate
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Reserve Ledger (Feature Addition) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div className="glowing-card">
                <h3 className="section-title">
                  <Landmark size={18} style={{ color: 'var(--saffron)' }} />
                  Emergency Budget Ledger
                </h3>
                <div style={{ textAlign: 'center', padding: '20px 0', borderBottom: '1px solid var(--card-border)', marginBottom: '20px' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Remaining Reserves Balance</span>
                  <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--saffron)', fontFamily: 'var(--font-display)', marginTop: '8px' }}>
                    INR {reserveFunds} Lakhs
                  </div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Initial allocation: INR 50.0 Lakhs</span>
                </div>

                <h4 style={{ fontSize: '0.8rem', color: 'white', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>Transaction History</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {commissionerDecisions.map(d => {
                    const isSigned = approvedDecisions[d.id] === 'Authorized';
                    return (
                      <div key={d.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', padding: '8px 12px', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--card-border)', borderRadius: '6px', opacity: isSigned ? 1 : 0.4 }}>
                        <div>
                          <span>Mandate {d.id}</span>
                          <span style={{ display: 'block', fontSize: '0.65rem', color: 'var(--text-muted)' }}>{d.title}</span>
                        </div>
                        <span style={{ fontWeight: 'bold', color: isSigned ? 'var(--crimson)' : 'var(--text-secondary)' }}>
                          {isSigned ? `-INR ${d.cost} L` : `INR ${d.cost} L`}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'predictive' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1.4fr', gap: '24px' }}>
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

              {/* Subsurface GPR Scanner Widget (Feature Addition) */}
              <div className="glowing-card">
                <h3 className="section-title">
                  <Activity size={18} style={{ color: 'var(--saffron)' }} />
                  Subsurface GPR Structural Cavity Scanner
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '-12px', marginBottom: '20px' }}>
                  Click to launch a Ground-Penetrating Radar scan along GT Avenue metro pillars to identify underground cavities.
                </p>

                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '8px', border: '1px solid var(--card-border)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>Radar Scanner Module: Pillar 128</span>
                    <button className="cyber-btn-primary" onClick={runSubsurfaceScan} disabled={scanActive}>
                      {scanActive ? 'Scanning...' : 'Scan Subsurface'}
                    </button>
                  </div>

                  {scanActive && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        <span>Sweeping RF frequencies...</span>
                        <span>{scanProgress}%</span>
                      </div>
                      <div style={{ height: '6px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--card-border)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ width: `${scanProgress}%`, height: '100%', background: 'var(--saffron)' }}></div>
                      </div>
                    </div>
                  )}

                  {scanResult && (
                    <div style={{ borderTop: '1px dashed var(--card-border)', paddingTop: '16px', fontSize: '0.8rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>Depth Scanned: <strong>{scanResult.maxDepth}</strong></div>
                      <div>Cavities Found: <strong style={{ color: 'var(--crimson)' }}>{scanResult.anomaliesFound} voids</strong></div>
                      <div style={{ gridColumn: 'span 2' }}>Void Risk: <strong style={{ color: 'var(--crimson)' }}>{scanResult.voidProbability} collapse probability</strong></div>
                      <div style={{ gridColumn: 'span 2', background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239,68,68,0.1)', padding: '10px', borderRadius: '6px', color: 'var(--text-secondary)' }}>
                        {scanResult.status}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Outbreak Risk Projections Chart (Feature Addition) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div className="glowing-card">
                <h3 className="section-title">
                  <ShieldCheck size={18} style={{ color: 'var(--saffron)' }} />
                  Pathogen Outbreak Risk Simulator
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', justifyContent: 'center', padding: '20px 0' }}>
                  <div style={{ position: 'relative', width: '120px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="120" height="120" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" fill="transparent" stroke="rgba(255,255,255,0.02)" strokeWidth="8" />
                      <circle cx="50" cy="50" r="40" fill="transparent" stroke={diseaseRiskVal > 50 ? 'var(--crimson)' : 'var(--green)'} strokeWidth="8" strokeDasharray="251.2" strokeDashoffset={251.2 - (diseaseRiskVal/100)*251.2} transform="rotate(-90 50 50)" style={{ transition: 'stroke-dashoffset 0.8s ease-in-out' }} />
                    </svg>
                    <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{diseaseRiskVal}%</span>
                      <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Risk Level</span>
                    </div>
                  </div>
                  <div style={{ fontSize: '0.8rem', textAlign: 'center', color: 'var(--text-secondary)', padding: '0 10px' }}>
                    Risk of waterborne outbreak in Ward 144 based on Jal Board staffing level. Current water flush workers: <strong>{waterWorkers}</strong>.
                  </div>
                  <div style={{ background: diseaseRiskVal > 50 ? 'rgba(239, 68, 68, 0.05)' : 'rgba(16, 185, 129, 0.05)', border: `1px solid ${diseaseRiskVal > 50 ? 'rgba(239,68,68,0.1)' : 'rgba(16,185,129,0.1)'}`, padding: '10px 14px', borderRadius: '6px', fontSize: '0.75rem', textAlign: 'center' }}>
                    {diseaseRiskVal > 50 ? '⚠️ High pathogen build up. Outbreak warning active.' : '✅ Safe chlorine limits. Pathogens minimized.'}
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
          </div>
        )}

        {activeTab === 'recommendations' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1.7fr', gap: '24px' }}>
            {/* Strategy Objective selector & Prompt Box (Feature Addition) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div className="glowing-card">
                <h3 className="section-title">
                  <ShieldCheck size={18} style={{ color: 'var(--saffron)' }} />
                  AI Recommender Strategy
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '-12px', marginBottom: '20px' }}>
                  Configure AI Copilot parameters to prioritize municipal KPIs.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <button 
                    className="cyber-btn-secondary" 
                    onClick={() => handleStrategyChange('safety')}
                    style={{ background: copilotObjective === 'safety' ? 'rgba(249, 115, 22, 0.08)' : '', border: copilotObjective === 'safety' ? '1px solid var(--saffron)' : '', color: copilotObjective === 'safety' ? 'white' : '' }}
                  >
                    Shield Priority (Maximize Public Safety)
                  </button>
                  <button 
                    className="cyber-btn-secondary" 
                    onClick={() => handleStrategyChange('budget')}
                    style={{ background: copilotObjective === 'budget' ? 'rgba(249, 115, 22, 0.08)' : '', border: copilotObjective === 'budget' ? '1px solid var(--saffron)' : '', color: copilotObjective === 'budget' ? 'white' : '' }}
                  >
                    Ledger Economy (Minimize Capital Expenses)
                  </button>
                  <button 
                    className="cyber-btn-secondary" 
                    onClick={() => handleStrategyChange('speed')}
                    style={{ background: copilotObjective === 'speed' ? 'rgba(249, 115, 22, 0.08)' : '', border: copilotObjective === 'speed' ? '1px solid var(--saffron)' : '', color: copilotObjective === 'speed' ? 'white' : '' }}
                  >
                    Chronos SLA (Minimize Work Hours to Reopen roads)
                  </button>
                </div>
              </div>

              {/* Interactive Prompt Box */}
              <div className="glowing-card">
                <h3 className="section-title" style={{ color: 'var(--saffron)' }}>
                  <Send size={18} />
                  Ask AI Command Copilot
                </h3>
                <form onSubmit={handleCopilotQuery} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <input 
                    type="text" 
                    placeholder="Ask about pipeline burst, contaminated water, etc..."
                    value={copilotPrompt}
                    onChange={(e) => setCopilotPrompt(e.target.value)}
                    style={{ background: '#090d16', border: '1px solid var(--card-border)', borderRadius: '6px', padding: '10px', color: 'white', outline: 'none', fontSize: '0.85rem' }}
                  />
                  <button type="submit" className="cyber-btn-primary" disabled={copilotLoading}>
                    {copilotLoading ? 'Compiling advice...' : 'Query Copilot'}
                  </button>
                </form>

                {copilotReply && (
                  <div style={{ marginTop: '16px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--card-border)', padding: '14px', borderRadius: '6px', fontSize: '0.8rem', lineHeight: '1.5', fontFamily: 'monospace', color: '#10b981', whiteSpace: 'pre-wrap' }}>
                    {copilotReply}
                  </div>
                )}
              </div>
            </div>

            {/* Existing Ranked Advice Table */}
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
                      <tr key={r.priority} style={{ opacity: copilotObjective === 'safety' && r.priority > 6 ? 0.4 : 1 }}>
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
          </div>
        )}

        {/* Real-time Telemetry Terminal Console */}
        <section className="glowing-card" style={{ padding: '16px', background: '#020617', border: '1px solid var(--card-border)' }}>
          <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-display)', marginBottom: '10px', borderBottom: '1px solid var(--card-border)', paddingBottom: '6px' }}>
            <Database size={12} style={{ color: 'var(--saffron)' }} />
            Ward 144 Real-time Ingestion Terminal
          </h4>
          <div style={{ height: '70px', overflowY: 'auto', fontFamily: 'monospace', fontSize: '0.75rem', color: '#10b981', display: 'flex', flexDirection: 'column', gap: '3px', lineHeight: '1.4' }}>
            {consoleLogs.map((log, index) => (
              <div key={index}>{log}</div>
            ))}
            <div ref={consoleEndRef} />
          </div>
        </section>

        <footer style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '10px', borderTop: '1px solid var(--card-border)', paddingTop: '12px' }}>
          <strong>UrbanPulse AI Dashboard (National Smart Cities Mission Support)</strong>
          <p style={{ marginTop: '2px' }}>Supported by Ministry of Housing and Urban Affairs, Government of India.</p>
        </footer>
      </main>
    </div>
  );
}
