import React, { useState, useEffect } from "react";
import {
  ArrowUpRight, Mail, Menu, X, Code2, Database,
  BrainCircuit, Globe2, Smartphone, ExternalLink, Download, ChevronDown,
  Copy, Check, Lock
} from "lucide-react";
import AdminPanel from "./AdminPanel.jsx";

// Brand icons (independent of lucide-react brand icon deprecation)
function Github({ size = 24, className, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function Linkedin({ size = 24, className, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

// ==========================================
// 🔗 YOUR PROFILE & SOCIAL LINKS
// ==========================================
export const PROFILE_LINKS = {
  name: "Kgotso Dlamini",
  avatar: "/profile.jpg",
  linkedin: "https://www.linkedin.com/in/kgotso-dlamini-5b62503b6",
  github: "https://github.com/Kgotso03",
  email: "kgotsodlamini36@gmail.com",
  graduation: "Final-year student · Class of 2026",
};

const projects = [
  {
    number: "01",
    name: "WesTec Ticketing",
    type: "EVENT MANAGEMENT · WEB APPLICATION",
    description: "Event management and ticketing platform concept featuring event administration, ticket verification, QR codes and role-based access.",
    tags: ["PHP", "MySQL", "JavaScript", "QR Codes"],
    status: "Development work",
    accent: "violet"
  },
  {
    number: "02",
    name: "Vota",
    type: "BLOCKCHAIN · E-VOTING",
    description: "A blockchain-based voting system designed around voter management, election administration and transparent vote storage.",
    tags: ["PHP", "MySQL", "Solidity", "Ganache"],
    status: "Development project",
    accent: "cyan"
  },
  {
    number: "03",
    name: "Digital Mental Health Support",
    type: "STUDENT WELLBEING · WEB APPLICATION",
    description: "A platform concept to help tertiary students access professional counselling, live chat, video consultations and self-assessment tools.",
    tags: ["HTML", "CSS", "JavaScript", "WebRTC"],
    status: "Academic project",
    accent: "pink"
  },
  {
    number: "04",
    name: "Predictive Maintenance System",
    type: "DATA · PREDICTIVE MODELLING",
    description: "A simulation concept for monitoring sugar-processing equipment with synthetic sensor readings, equipment health indicators and failure alerts.",
    tags: ["Python", "Data Visualisation", "Machine Learning"],
    status: "Academic project",
    accent: "orange"
  },
  {
    number: "05",
    name: "Vibe Zone",
    type: "DISCOVERY · PRODUCT CONCEPT",
    description: "A leisure discovery concept that helps groups find places and activities in Eswatini using location, budget and interests.",
    tags: ["Web Development", "UX", "Databases"],
    status: "Concept",
    accent: "green"
  },
  {
    number: "06",
    name: "Goat Hub",
    type: "E-COMMERCE · PRODUCT CONCEPT",
    description: "An e-commerce concept for browsing products and supporting online purchasing and inventory management.",
    tags: ["PHP / Laravel", "MySQL", "E-commerce"],
    status: "Concept",
    accent: "blue"
  }
];

const skills = [
  { title: "Frontend", icon: Globe2, items: ["HTML", "CSS", "JavaScript", "Responsive UI"] },
  { title: "Backend & databases", icon: Database, items: ["PHP", "MySQL", "SQL", "REST concepts"] },
  { title: "Programming", icon: Code2, items: ["Python", "Java", "Solidity basics"] },
  { title: "Emerging technology", icon: BrainCircuit, items: ["AI / ML concepts", "Blockchain", "WebRTC", "Cloud fundamentals"] },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  // Load customizable profile & projects from localStorage or defaults
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem("portfolio_profile");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (!parsed.avatar || parsed.avatar.includes("github.com/Kgotso03.png")) {
          parsed.avatar = "/profile.jpg";
        }
        return { ...PROFILE_LINKS, ...parsed };
      }
      return PROFILE_LINKS;
    } catch {
      return PROFILE_LINKS;
    }
  });

  const [projectList, setProjectList] = useState(() => {
    try {
      const saved = localStorage.getItem("portfolio_projects");
      return saved ? JSON.parse(saved) : projects;
    } catch {
      return projects;
    }
  });

  const handleUpdateProfile = (newProfile) => {
    setProfile(newProfile);
    localStorage.setItem("portfolio_profile", JSON.stringify(newProfile));
  };

  const handleUpdateProjects = (newProjects) => {
    setProjectList(newProjects);
    localStorage.setItem("portfolio_projects", JSON.stringify(newProjects));
  };

  // Keyboard shortcut Ctrl + Shift + A to open Admin Panel
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && (e.key === "A" || e.key === "a")) {
        e.preventDefault();
        setAdminOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email || PROFILE_LINKS.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="site-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <header className="topbar">
        <a className="brand" href="#home" onClick={closeMenu} aria-label="Kgotso Dlamini home">
          <span className="brand-mark">K<span>.</span></span>
          <span className="brand-name">KGOTSO<span>DLAMINI</span></span>
        </a>
        <button className="menu-toggle" aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        <nav className={menuOpen ? "nav-links nav-open" : "nav-links"}>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#skills" onClick={closeMenu}>Skills</a>
          <a href="#projects" onClick={closeMenu}>Projects</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
          {profile.linkedin && (
            <a href={profile.linkedin} target="_blank" rel="noreferrer" title="LinkedIn" aria-label="LinkedIn Profile">
              <Linkedin size={16} />
            </a>
          )}
          {profile.github && (
            <a href={profile.github} target="_blank" rel="noreferrer" title="GitHub" aria-label="GitHub Profile">
              <Github size={16} />
            </a>
          )}
          <a className="nav-cta" href="#contact" onClick={closeMenu}>Let's talk <ArrowUpRight size={15} /></a>
        </nav>
      </header>

      <main>
        <section className="hero section-wrap" id="home">
          <div className="hero-copy">
            <div className="eyebrow"><span className="status-dot" /> AVAILABLE FOR INTERNSHIP OPPORTUNITIES</div>
            <h1>Turning ideas into<br /><span className="gradient-text">useful software.</span></h1>
            <p className="hero-intro">
              I'm <strong>{profile.name || "Kgotso Dlamini"}</strong>, a Computer Science student and aspiring software developer
              interested in building practical digital solutions to real-world problems.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">Explore my work <ArrowUpRight size={17} /></a>
              <a className="button button-quiet" href="#contact">Get in touch <Mail size={16} /></a>
              {profile.github && (
                <a className="button button-quiet" href={profile.github} target="_blank" rel="noreferrer">
                  <Github size={15} /> GitHub
                </a>
              )}
              {profile.linkedin && (
                <a className="button button-quiet" href={profile.linkedin} target="_blank" rel="noreferrer">
                  <Linkedin size={15} /> LinkedIn
                </a>
              )}
            </div>
            <div className="hero-meta">
              <span><span className="meta-line" /> Based in Eswatini</span>
              <span>Computer Science · EMCU</span>
            </div>
          </div>

          <div className="hero-portrait-wrap" aria-label="Kgotso Dlamini portrait">
            <div className="orbit orbit-a" />
            <div className="orbit orbit-b" />
            <div className="hero-portrait-card">
              <div className="hero-portrait-img-box">
                <img
                  src={profile.avatar || "/profile.jpg"}
                  alt={profile.name || "Kgotso Dlamini"}
                  className="hero-portrait-img"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/profile.jpg";
                  }}
                />
              </div>
              <div className="hero-portrait-badge">
                <div className="portrait-badge-status">
                  <span className="tiny-green" />
                  <span>Available for work</span>
                </div>
                <span className="portrait-badge-location">Based in Eswatini</span>
              </div>
            </div>
            <div className="float-chip chip-top"><Code2 size={16} /><span>Developer</span></div>
            <div className="float-chip chip-bottom"><BrainCircuit size={17} /><span>Problem Solver</span></div>
          </div>

          <a className="scroll-cue" href="#about"><span>SCROLL TO EXPLORE</span><ChevronDown size={15} /></a>
        </section>

        <section className="intro-strip">
          <div className="section-wrap strip-inner">
            <span>INTERESTED IN</span>
            <div className="strip-item"><Code2 size={17} /> Software Development</div>
            <div className="strip-item"><Database size={17} /> Web & Databases</div>
            <div className="strip-item"><BrainCircuit size={17} /> Emerging Technology</div>
          </div>
        </section>

        <section className="section-wrap section-block" id="about">
          <div className="section-heading">
            <span className="section-kicker">01 / ABOUT ME</span>
            <h2>Developer in progress.<br /><span className="muted-heading">Problem solver by mindset.</span></h2>
          </div>
          <div className="about-grid">
            <div className="about-main">
              <p className="large-copy">I believe technology is most powerful when it makes everyday tasks easier, clearer and more accessible.</p>
              <p>I'm pursuing a Bachelor of Computer Science at Eswatini Medical Christian University (EMCU). Through academic and personal projects, I've explored web applications, databases, blockchain concepts and predictive maintenance simulations.</p>
              <p>I'm continuing to grow as a developer, strengthen my problem-solving skills and gain experience building software that serves people and organisations.</p>
              <div className="about-note"><span className="note-icon">✳</span><span><strong>My approach</strong><br />Learn continuously. Build practically. Improve every iteration.</span></div>
            </div>
            <div className="about-stats">
              <div className="stat-card"><span className="stat-number">01</span><span className="stat-label">Curiosity first</span><p>Explore how things work and how they can work better.</p></div>
              <div className="stat-card"><span className="stat-number">02</span><span className="stat-label">Hands-on learning</span><p>Turn concepts into working projects and useful skills.</p></div>
              <div className="stat-card"><span className="stat-number">03</span><span className="stat-label">Purposeful solutions</span><p>Keep users and real-world needs in focus.</p></div>
            </div>
          </div>
        </section>

        <section className="skills-section" id="skills">
          <div className="section-wrap section-block">
            <div className="section-heading heading-row">
              <div><span className="section-kicker">02 / TOOLKIT</span><h2>Skills I'm building<br /><span className="muted-heading">and putting to use.</span></h2></div>
              <p className="heading-description">A growing toolkit across the development process. The exact stack varies by project.</p>
            </div>
            <div className="skills-grid">
              {skills.map(({ title, icon: Icon, items }, index) => (
                <article className="skill-card" key={title}>
                  <div className="skill-card-top"><span className={`skill-icon skill-${index}`}><Icon size={21} /></span><span className="skill-index">0{index + 1}</span></div>
                  <h3>{title}</h3>
                  <div className="skill-tags">{items.map(item => <span key={item}>{item}</span>)}</div>
                </article>
              ))}
            </div>
            <p className="skills-footnote">This list is a starting point. Keep only technologies you can comfortably discuss or demonstrate.</p>
          </div>
        </section>

        <section className="section-wrap section-block" id="projects">
          <div className="section-heading heading-row">
            <div><span className="section-kicker">03 / SELECTED WORK</span><h2>Ideas, experiments<br /><span className="muted-heading">and practical projects.</span></h2></div>
            <p className="heading-description">A selection of academic work, development projects and product concepts. Project status is shown transparently.</p>
          </div>
          <div className="projects-grid">
            {projectList.map(project => (
              <article className={`project-card accent-${project.accent}`} key={project.number}>
                <div className="project-top"><span className="project-number">{project.number}</span><span className="project-arrow"><ArrowUpRight size={19} /></span></div>
                <div className="project-visual">
                  <div className="visual-grid" />
                  <div className="visual-window">
                    <div className="visual-window-bar"><i /><i /><i /></div>
                    <div className="visual-lines"><b /><b /><b /><b /></div>
                    <div className="visual-orb" />
                  </div>
                  <span className="visual-label">{project.number} / PROJECT</span>
                </div>
                <div className="project-content">
                  <span className="project-type">{project.type}</span>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <div className="project-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
                  <div className="project-footer"><span className="project-status"><i />{project.status}</span><span className="project-details">Details on request</span></div>
                </div>
              </article>
            ))}
          </div>
          <div className="projects-note"><span>↳</span> More projects and live demos can be added as they are ready to share.</div>
        </section>

        <section className="education-section">
          <div className="section-wrap education-inner">
            <div><span className="section-kicker">04 / EDUCATION</span><h2>Learning the foundations<br /><span className="muted-heading">to build what comes next.</span></h2></div>
            <div className="education-card">
              <div className="education-icon"><Smartphone size={22} /></div>
              <div><span className="education-period">BACHELOR'S DEGREE</span><h3>Bachelor of Computer Science</h3><p>Eswatini Medical Christian University (EMCU)</p><span className="education-status">{profile.graduation || PROFILE_LINKS.graduation}</span></div>
            </div>
          </div>
        </section>

        <section className="contact-section section-wrap section-block" id="contact">
          <div className="contact-panel">
            <div className="contact-glow" />
            <span className="section-kicker">05 / CONTACT</span>
            <h2>Have a project or<br />opportunity in mind?</h2>
            <p>I'm interested in connecting with teams, developers and organisations working on meaningful digital solutions.</p>
            <div className="contact-actions" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '24px' }}>
              <a
                className="button button-primary"
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email || PROFILE_LINKS.email)}&su=${encodeURIComponent("Opportunity / Inquiry for Kgotso Dlamini")}`}
                target="_blank"
                rel="noreferrer"
              >
                Write in Gmail <ArrowUpRight size={17} />
              </a>
              <a
                className="button button-quiet"
                href={`mailto:${profile.email || PROFILE_LINKS.email}?subject=${encodeURIComponent("Opportunity / Inquiry for Kgotso Dlamini")}`}
              >
                Default Mail App <Mail size={16} />
              </a>
              <button
                type="button"
                className="button button-quiet"
                onClick={handleCopyEmail}
                style={{ cursor: 'pointer', background: copied ? 'rgba(94, 230, 176, 0.15)' : undefined, borderColor: copied ? 'rgba(94, 230, 176, 0.5)' : undefined }}
              >
                {copied ? (
                  <>
                    <Check size={16} color="#5ee6b0" />
                    <span style={{ color: '#5ee6b0' }}>Copied {profile.email || PROFILE_LINKS.email}!</span>
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    <span>Copy email</span>
                  </>
                )}
              </button>
            </div>
            <div className="contact-links">
              {profile.linkedin && (
                <a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={17} /> LinkedIn <ExternalLink size={13} /></a>
              )}
              {profile.github && (
                <a href={profile.github} target="_blank" rel="noreferrer"><Github size={17} /> GitHub <ExternalLink size={13} /></a>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer section-wrap">
        <a className="brand footer-brand" href="#home"><span className="brand-mark">K<span>.</span></span><span className="brand-name">KGOTSO<span>DLAMINI</span></span></a>
        <span>Designed to grow with the journey.</span>
        <button
          className="admin-trigger-btn"
          onClick={() => setAdminOpen(true)}
          title="Open Admin Controls"
        >
          <Lock size={12} /> Admin Mode
        </button>
        <a className="back-top" href="#home">Back to top ↑</a>
        <span className="copyright">© {new Date().getFullYear()} {profile.name || "Kgotso Dlamini"}</span>
      </footer>

      {/* Admin Panel Modal */}
      <AdminPanel
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        profile={profile}
        onUpdateProfile={handleUpdateProfile}
        projects={projectList}
        onUpdateProjects={handleUpdateProjects}
      />
    </div>
  );
}

export default App;