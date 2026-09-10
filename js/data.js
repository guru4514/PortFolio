/* ═══════════════════════════════════════════════════════════════
   DATA — All portfolio content in one place for easy updates
   ═══════════════════════════════════════════════════════════════ */

export const SKILLS = [
  { num: '01', sym: 'Py', name: 'Python',     cat: 'Language', type: 'lang', tags: ['ML', 'Scripts', 'APIs'] },
  { num: '02', sym: 'Jv', name: 'Java',       cat: 'Language', type: 'lang', tags: ['OOP', 'Infosys'] },
  { num: '03', sym: 'Sq', name: 'SQL',        cat: 'Language', type: 'lang', tags: ['MySQL', 'Oracle'] },
  { num: '04', sym: 'C',  name: 'C',          cat: 'Language', type: 'lang', tags: ['Systems', 'Algos'] },
  { num: '05', sym: 'Tf', name: 'TensorFlow', cat: 'AI / ML',  type: 'ml',  tags: ['CNN', 'Training'] },
  { num: '06', sym: 'Pt', name: 'PyTorch',    cat: 'AI / ML',  type: 'ml',  tags: ['DL', 'Research'] },
  { num: '07', sym: 'Sk', name: 'Scikit',     cat: 'AI / ML',  type: 'ml',  tags: ['Pipelines', 'ML'] },
  { num: '08', sym: 'Cv', name: 'OpenCV',     cat: 'AI / ML',  type: 'ml',  tags: ['Vision', 'RT'] },
  { num: '09', sym: 'Yn', name: 'YOLO/CNN',   cat: 'AI / ML',  type: 'ml',  tags: ['Detection', 'Speed'] },
  { num: '10', sym: 'Nl', name: 'NLP',        cat: 'AI / ML',  type: 'ml',  tags: ['Text', 'Models'] },
  { num: '11', sym: 'My', name: 'MySQL',      cat: 'Database',  type: 'db', tags: ['RDBMS', 'Queries'] },
  { num: '12', sym: 'Mg', name: 'MongoDB',    cat: 'Database',  type: 'db', tags: ['NoSQL', 'Flex'] },
  { num: '13', sym: 'Or', name: 'Oracle',     cat: 'Database',  type: 'db', tags: ['Enterprise'] },
];

export const TOOLS = [
  { name: 'Git',            cat: 'dev',   dot: 'tool-cat-dev' },
  { name: 'GitHub',         cat: 'infra', dot: 'tool-cat-infra' },
  { name: 'Docker',         cat: 'infra', dot: 'tool-cat-infra' },
  { name: 'FastAPI',        cat: 'dev',   dot: 'tool-cat-dev' },
  { name: 'Node.js',        cat: 'dev',   dot: 'tool-cat-dev' },
  { name: 'Express.js',     cat: 'dev',   dot: 'tool-cat-dev' },
  { name: 'Capacitor',      cat: 'dev',   dot: 'tool-cat-dev' },
  { name: 'Firebase',       cat: 'infra', dot: 'tool-cat-infra' },
  { name: 'IndexedDB',      cat: 'infra', dot: 'tool-cat-infra' },
  { name: 'Jupyter',        cat: 'data',  dot: 'tool-cat-data' },
  { name: 'Google Colab',   cat: 'data',  dot: 'tool-cat-data' },
  { name: 'Pandas',         cat: 'data',  dot: 'tool-cat-data' },
  { name: 'NumPy',          cat: 'data',  dot: 'tool-cat-data' },
  { name: 'Matplotlib',     cat: 'data',  dot: 'tool-cat-data' },
  { name: 'Linux',          cat: 'infra', dot: 'tool-cat-infra' },
  { name: 'VS Code',        cat: 'dev',   dot: 'tool-cat-dev' },
  { name: 'Android Studio', cat: 'dev',   dot: 'tool-cat-dev' },
];

export const PROJECTS = [
  {
    num: '01',
    title: 'AI Driver Drowsiness Detection',
    flagship: true,
    github: 'https://github.com/guru4514/DrowseGuard-DDDS-',
    problem: 'Real-time fatigue detection under variable lighting — existing solutions fail at night and in low-contrast environments.',
    approach: 'CNN architecture with TensorFlow + OpenCV pipeline optimized for low-latency, continuous inference across all conditions.',
    impact: '95.6% detection accuracy across lighting conditions. Real-time alert triggered within 200ms of drowsiness detection.',
    tags: ['TensorFlow', 'OpenCV', 'CNN', 'Real-time', 'Python'],
    details: [
      'Developed CNN-based real-time drowsiness detection using TensorFlow and OpenCV',
      'Achieved 95.6% accuracy across varying environmental and lighting conditions',
      'Integrated alert mechanism triggered when drowsiness thresholds are exceeded',
      'Optimized the inference pipeline for low-latency, continuous performance',
    ],
  },
  {
    num: '02',
    title: 'AI Resume Screening & Candidate Ranking',
    flagship: false,
    github: 'https://github.com/guru4514/AI-Resume-Screening',
    problem: 'Manual resume screening is slow and inconsistent — recruiters miss qualified candidates buried in large applicant pools.',
    approach: 'NLP-powered pipeline with semantic skill matching, automatic extraction from PDF/DOCX/TXT, and explainable scoring system.',
    impact: '99.12% classification accuracy. Batch-processes and ranks multiple candidates against a job description in seconds.',
    tags: ['NLP', 'Python', 'Scikit-learn', 'FastAPI', 'REST API', 'PDF Parsing'],
    details: [
      'Built end-to-end resume screening system with semantic skill matching and explainable candidate ranking',
      'Developed REST APIs and recruiter dashboards for resume upload, candidate comparison, and shortlist generation',
      'Enabled automatic extraction of skills, experience, and profile info from PDF, DOCX, and TXT formats',
      'Supports batch processing — ranks and scores multiple candidates against a job description in seconds',
    ],
  },
  {
    num: '03',
    title: 'Smart Agriculture Marketplace',
    flagship: false,
    github: 'https://github.com/guru4514/Smart-Agriculture-Marketplace',
    problem: 'Farmers lack direct access to buyers, relying on middlemen who take heavy margins. Tech solutions keep ignoring the supply-chain gap.',
    approach: 'Full-stack web platform with Node.js, Express.js, MongoDB — normalized schemas for products, users, and transactions.',
    impact: 'Real-time product listings, direct farmer-buyer interaction, and RESTful APIs for all marketplace operations.',
    tags: ['Node.js', 'Express.js', 'MongoDB', 'REST API', 'Full-Stack'],
    details: [
      'Built full-stack application using Node.js, Express.js, MongoDB, HTML/CSS/JS',
      'Implemented buyer-farmer interaction features including real-time product listings',
      'Designed normalized database schemas for products, users, and transactions',
      'Developed RESTful backend APIs for all marketplace operations',
    ],
  },
  {
    num: '04',
    title: 'Pigmie — Finance Record Management System',
    flagship: true,
    github: 'https://github.com/guru4514/Finance-Tracker-KhataFlow',
    problem: 'Financial collection agents need a tool that works offline in the field and syncs when online — existing apps require constant connectivity.',
    approach: 'Dual-mode architecture: offline-first (IndexedDB) + live org sync (Firestore). RBAC with approval workflows. Shipped as native Android APK via Capacitor.',
    impact: 'Zero-framework frontend. 5 RBAC roles. Approval workflow for data integrity. Real-time dashboard with collection analytics.',
    tags: ['Vanilla JS', 'Firebase', 'IndexedDB', 'Capacitor', 'Android', 'RBAC'],
    details: [
      'Two operating modes: offline-first Personal Mode (IndexedDB) and live Organisation Mode (Firestore real-time sync)',
      'Role-based access control — Owner, Admin, Manager, Agent/Collector, and Viewer/Auditor roles with granular permissions',
      'Approval workflow: Agents submit change requests that Admins/Managers approve before merging to live DB',
      'Dashboard tracks total capital, collections, pending amounts, and top defaulters from payment history',
      'Packaged as a native Android APK using Capacitor by Ionic — zero framework dependencies on the frontend',
      'Tech stack: Pure HTML5, CSS3, Vanilla JS, Firebase Auth, Firestore, IndexedDB, Android Studio',
    ],
  },
];

export const TIMELINE = [
  {
    date: '2019–\n2021',
    role: 'Higher Secondary Education',
    org: 'Christ The King School',
    desc: '87.68% — Strong academic foundation across core subjects.',
    badge: null,
  },
  {
    date: '2021–\n2023',
    role: 'Pre-University (PUC)',
    org: 'Sri Vidyaniketan PU College',
    desc: '87.33% — Science stream. Mathematics and physics foundations that inform engineering decisions to this day.',
    badge: null,
  },
  {
    date: '2024',
    role: 'Infosys Springboard — 3 Certifications',
    org: 'Infosys · Python · Java · Web Dev',
    desc: 'Completed Python, Java, and Web Development certification tracks — practical foundations feeding directly into full-stack and ML project output.',
    badge: 'Certification',
  },
  {
    date: '2023–\n2027',
    role: 'B.E. Computer Science Engineering',
    org: 'Cambridge Institute of Technology, Bengaluru',
    desc: 'CGPA 7.0 (till 5th sem) · Expected 2027 · Focus: AI/ML, Data Structures, DBMS, Operating Systems, Software Engineering.',
    badge: null,
  },
  {
    date: '2025',
    role: 'Event Operations Lead',
    org: 'CSI Student Chapter',
    desc: 'Led logistics and coordination for multiple CSI chapter events. Managed volunteers, participant engagement, and faculty coordination.',
    badge: 'Leadership',
  },
  {
    date: '2025',
    role: 'Oracle Generative AI Certified',
    org: 'Oracle',
    desc: "Certified in Generative AI foundations and applied LLM usage through Oracle's professional certification track.",
    badge: 'Certification',
  },
  {
    date: '2026',
    role: 'Machine Learning & Deep Learning Certified',
    org: 'Continuing Education',
    desc: 'Completed structured certification tracks in core ML and deep learning frameworks. Applied learnings directly to project work.',
    badge: 'Certification',
  },
  {
    date: '2027',
    role: "What's Next?",
    org: 'Open to Full-Time SWE / ML Roles',
    desc: 'Graduating in 2027. Looking for full-time Software Engineering or Machine Learning roles where I can build systems that matter.',
    badge: null,
    isNext: true,
  },
];

export const TERM_CMDS = {
  help: `<div class="t-out"><br>Commands:<br>&nbsp;<span style="color:#A3E635">about</span>     — Who is Gururaj<br>&nbsp;<span style="color:#A3E635">projects</span>  — All projects<br>&nbsp;<span style="color:#A3E635">skills</span>    — Tech stack<br>&nbsp;<span style="color:#A3E635">contact</span>   — Get in touch<br>&nbsp;<span style="color:#A3E635">resume</span>    — Download resume<br>&nbsp;<span style="color:#A3E635">goto</span> &lt;sec&gt; — Jump to section<br>&nbsp;<span style="color:#A3E635">theme</span>     — Toggle dark/light<br>&nbsp;<span style="color:#A3E635">clear</span>     — Clear screen<br>&nbsp;<span style="color:#A3E635">exit</span>      — Close terminal<br><br></div>`,

  about: `<div class="t-out"><br><span style="color:#A3E635">GURURAJ B KANDAGAL</span><br>CSE @ Cambridge Institute of Technology (2027)<br>CGPA: 7.0 · Bengaluru, India<br>Focus: AI/ML · Full-Stack · Systems that ship<br><br>Currently: CSI Event Operations Lead<br>Certs: Oracle GenAI · Infosys (Python, Java, Web Dev) · ML/DL<br><br></div>`,

  projects: `<div class="t-out"><br><span style="color:#f59e0b">★</span> [01] AI Driver Drowsiness Detection — 95.6% accuracy, CNN + OpenCV<br><span style="color:#71717a">   └→</span> github.com/guru4514/DrowseGuard-DDDS-<br><br>[02] AI Resume Screening & Ranking — NLP, semantic matching, REST API<br><span style="color:#71717a">   └→</span> github.com/guru4514/AI-Resume-Screening<br><br>[03] Smart Agriculture Marketplace — Node.js + MongoDB full-stack<br><span style="color:#71717a">   └→</span> github.com/guru4514/Smart-Agriculture-Marketplace<br><br><span style="color:#f59e0b">★</span> [04] Pigmie Finance App — Firebase + IndexedDB + Android APK<br><span style="color:#71717a">   └→</span> github.com/guru4514/Finance-Tracker-KhataFlow<br><br></div>`,

  skills: `<div class="t-out"><br>Languages : Python, Java, SQL, C<br>AI / ML   : TensorFlow, PyTorch, Scikit-learn, OpenCV, CNN, YOLO, NLP<br>Databases : MySQL, MongoDB, Oracle SQL<br>Tools     : Git, Docker, FastAPI, Node.js, Jupyter, Colab<br>Platforms : Linux, Firebase, Android Studio, VS Code<br><br></div>`,

  contact: `<div class="t-out"><br>Email    : <a href="mailto:gurubk321@gmail.com" style="color:#A3E635">gurubk321@gmail.com</a><br>Phone    : +91 86607 63251<br>GitHub   : <a href="https://github.com/guru4514" target="_blank" style="color:#A3E635">github.com/guru4514</a><br>LinkedIn : <a href="https://www.linkedin.com/in/gururaj-b-kandagal" target="_blank" style="color:#A3E635">linkedin.com/in/gururaj-b-kandagal</a><br>City     : Bengaluru, Karnataka, India<br><br></div>`,
};

export const ASCII_BANNER = `<div class="t-ascii">
   ____                            _
  / ___|_   _ _ __ _   _ _ __ __ _(_)
 | |  _| | | | '__| | | | '__/ _\` | |
 | |_| | |_| | |  | |_| | | | (_| | |
  \\____|\\__,_|_|   \\__,_|_|  \\__,_|_|
</div><div class="t-out"><br>Welcome to Gururaj's terminal. Type <span style="color:#A3E635">help</span> to begin.<br><br></div>`;

export const CMD_PALETTE_ITEMS = [
  { icon: '↑', label: 'Go to Top',       action: 'goto',     target: 'hero' },
  { icon: '◐', label: 'About',           action: 'goto',     target: 'about' },
  { icon: '⬡', label: 'Skills',          action: 'goto',     target: 'skills' },
  { icon: '◈', label: 'Projects',        action: 'goto',     target: 'projects' },
  { icon: '◷', label: 'Journey',         action: 'goto',     target: 'journey' },
  { icon: '✉', label: 'Contact',         action: 'goto',     target: 'contact' },
  { icon: '↓', label: 'Download Resume', action: 'download', target: 'assets/resume.pdf' },
  { icon: '✎', label: 'Copy Email',      action: 'copy',     target: 'gurubk321@gmail.com' },
  { icon: '◐', label: 'Toggle Theme',    action: 'theme' },
  { icon: '▸', label: 'Open Terminal',   action: 'terminal' },
];
