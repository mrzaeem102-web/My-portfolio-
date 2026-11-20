import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowRight,
  ArrowUp,
  Check,
  Copy,
  ExternalLink,
  Mail,
  Menu,
  Phone,
  Send,
  X,
} from "lucide-react";
import {
  contactDetails,
  interests,
  navigation,
  projectFilters,
  projects,
  skillGroups,
  socialProfiles,
  type PortfolioProject,
  type ProfileIconName,
  type ProjectArt,
  type ProjectFilter,
} from "./data/portfolio";

// Set this path only when the file exists in public/. A missing file
// would 404 on every page load; the designed monogram is used instead.
const profilePhotoSrc: string | null = "/images/zaeem-profile-new.jpg";

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: reduceMotion ? 0 : 0.55,
        delay: reduceMotion ? 0 : delay,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}

function SocialGlyph({
  platform,
  size = 20,
}: {
  platform: ProfileIconName;
  size?: number;
}) {
  if (platform === "github") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 .8a11.2 11.2 0 0 0-3.54 21.83c.56.1.77-.24.77-.54v-2.1c-3.14.68-3.8-1.33-3.8-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.73 1.16 1.73 1.16 1 1.72 2.62 1.22 3.26.93.1-.73.39-1.22.71-1.5-2.5-.28-5.13-1.25-5.13-5.57 0-1.23.44-2.24 1.16-3.03-.12-.28-.5-1.43.11-2.98 0 0 .95-.3 3.08 1.16a10.7 10.7 0 0 1 5.6 0c2.14-1.46 3.08-1.16 3.08-1.16.62 1.55.23 2.7.12 2.98.72.79 1.15 1.8 1.15 3.03 0 4.33-2.63 5.29-5.15 5.57.4.34.76 1 .76 2.03v3.01c0 .3.2.65.77.54A11.2 11.2 0 0 0 12 .8Z" />
      </svg>
    );
  }

  if (platform === "linkedin") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.44-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13Zm1.78 13.02H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
      </svg>
    );
  }

  if (platform === "huggingface") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9.5" />
        <path d="M8.5 9.5a1.2 1.2 0 1 0 0 .01" fill="currentColor" strokeWidth="2" />
        <path d="M15.5 9.5a1.2 1.2 0 1 0 0 .01" fill="currentColor" strokeWidth="2" />
        <path d="M8.2 14c1.1 1.8 2.4 2.4 3.8 2.4s2.7-.6 3.8-2.4" strokeWidth="1.8" />
        <path d="M4.5 12c.9-.7 2.2-.6 3 .3M19.5 12c-.9-.7-2.2-.6-3 .3" strokeWidth="1.7" />
      </svg>
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9.5" />
      <path d="M8 10.2h.01M16 10.2h.01M8.4 14.1c.85 1.15 2.08 1.75 3.6 1.75s2.75-.6 3.6-1.75" />
      <path d="M5.1 7.6 3.8 6.1M18.9 7.6l1.3-1.5" />
    </svg>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {description && <p className="section-description">{description}</p>}
    </div>
  );
}

function Navbar({
  menuOpen,
  onMenuToggle,
  onNavigate,
}: {
  menuOpen: boolean;
  onMenuToggle: () => void;
  onNavigate: () => void;
}) {
  return (
    <header className="site-header">
      <div className="container nav-inner">
        <a
          className="brand"
          href="#home"
          aria-label="Zaeem.dev, home"
          onClick={onNavigate}
        >
          <span className="brand-mark">MZF</span>
          <span className="brand-name">
            Zaeem<span>.dev</span>
          </span>
        </a>

        <button
          className="menu-toggle"
          type="button"
          onClick={onMenuToggle}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>

        <nav
          id="primary-navigation"
          className={`site-nav${menuOpen ? " is-open" : ""}`}
          aria-label="Primary navigation"
        >
          {navigation.map((item) => (
            <a key={item.href} href={item.href} onClick={onNavigate}>
              {item.label}
            </a>
          ))}
          <a
            className="mobile-nav-contact"
            href="#contact"
            onClick={onNavigate}
          >
            Let&apos;s talk <ArrowRight size={14} aria-hidden="true" />
          </a>
        </nav>

        <a className="nav-contact" href="#contact">
          Let&apos;s talk <ArrowRight size={15} aria-hidden="true" />
        </a>
      </div>

      {menuOpen && (
        <div
          className="nav-backdrop"
          onClick={onNavigate}
          aria-hidden="true"
        />
      )}
    </header>
  );
}

function Hero() {
  const reduceMotion = useReducedMotion();
  const [photoFailed, setPhotoFailed] = useState(false);
  const showPhoto = Boolean(profilePhotoSrc) && !photoFailed;

  return (
    <section id="home" className="hero-section section-anchor">
      <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
      <div className="hero-orbit hero-orbit-two" aria-hidden="true" />
      <div className="container hero-layout">
        <motion.div
          className="hero-copy"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.65, ease: "easeOut" }}
        >
          <p className="hero-label">
            <span className="olive-dot" aria-hidden="true" />
            AI Enthusiast <span className="label-divider">|</span> Python Developer
          </p>
          <h1>
            Hi, I&apos;m
            <span className="hero-name">Muhammad Zaeem Fayyaz</span>
          </h1>
          <p className="hero-role">AI Application Developer</p>
          <p className="hero-intro">
            I build intelligent applications using Artificial Intelligence,
            Machine Learning, Python, and Natural Language Processing. I enjoy
            transforming innovative ideas into practical AI-powered solutions.
          </p>

          <div className="hero-actions">
            <a className="button button-primary" href="#projects">
              Explore My Projects <ArrowRight size={17} aria-hidden="true" />
            </a>
            <a className="button button-secondary" href="#contact">
              Contact Me
            </a>
          </div>

          <div className="hero-socials" aria-label="Developer profiles">
            <span className="socials-label">Find me on</span>
            {socialProfiles.map((profile) => (
              <a
                key={profile.name}
                className="social-icon-link"
                href={profile.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={profile.name}
                title={profile.name}
              >
                <SocialGlyph platform={profile.icon} size={18} />
              </a>
            ))}
          </div>
        </motion.div>

        <Reveal className="hero-portrait-column portrait-option-b" delay={0.15}>
          <div className="portrait-b-frame">
            <span className="portrait-b-ring portrait-b-ring-outer" aria-hidden="true" />
            <span className="portrait-b-ring portrait-b-ring-dashed" aria-hidden="true" />
            {showPhoto && profilePhotoSrc ? (
              <img
                src={profilePhotoSrc}
                alt="Muhammad Zaeem Fayyaz — AI Application Developer"
                className="portrait-b-img"
                width={310}
                height={310}
                fetchPriority="high"
                onError={() => setPhotoFailed(true)}
              />
            ) : (
              <div
                className="portrait-b-fallback"
                role="img"
                aria-label="Portrait placeholder for Muhammad Zaeem Fayyaz"
              >
                <span className="portrait-b-initials">MZF</span>
                <span className="portrait-b-fallback-caption">Profile portrait</span>
              </div>
            )}
            <span className="portrait-b-dot portrait-b-dot-one" aria-hidden="true" />
            <span className="portrait-b-dot portrait-b-dot-two" aria-hidden="true" />
          </div>
          <div className="portrait-b-caption">
            <strong>Muhammad Zaeem Fayyaz</strong>
            <small>AI Application Developer</small>
          </div>
        </Reveal>
      </div>
      <a className="scroll-cue" href="#about" aria-label="Scroll to About Me">
        <span /> Scroll to explore
      </a>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section about-section section-anchor">
      <div className="container about-layout">
        <Reveal className="about-lead">
          <p className="eyebrow">About me</p>
          <h2>
            Curious by nature.
            <span>Building with purpose.</span>
          </h2>
          <p className="about-lead-copy">
            I enjoy making emerging AI technologies practical, approachable,
            and useful in everyday applications.
          </p>
          <div className="about-rule" aria-hidden="true">
            <span />
          </div>
        </Reveal>

        <Reveal className="about-copy" delay={0.12}>
          <p>
            I am Muhammad Zaeem Fayyaz, an aspiring AI Application Developer
            and Python developer with a strong interest in Artificial
            Intelligence, Machine Learning, Deep Learning, Natural Language
            Processing, and Data Science.
          </p>
          <p>
            I enjoy exploring emerging AI technologies and building practical,
            intelligent applications that solve real-world problems.
          </p>
          <p>
            My work focuses on developing AI-powered chatbots, machine learning
            models, predictive systems, data classification applications,
            language translation tools, and intelligent automation solutions.
          </p>
          <p>
            I have hands-on project experience with Python, Machine Learning,
            NLP, Gradio, Hugging Face, Scikit-learn, HTML, CSS, and JavaScript.
          </p>
          <p>
            I am continuously learning, experimenting with new technologies,
            and improving my development skills to create innovative and
            user-friendly AI solutions.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function ProjectMotif({ kind }: { kind: ProjectArt }) {
  if (kind === "market" || kind === "finance") {
    return (
      <svg className="motif-chart" viewBox="0 0 120 72" fill="none">
        <path d="M6 58 31 43l20 7 28-29 16 10 19-20" />
        <path className="motif-chart-fill" d="M6 58 31 43l20 7 28-29 16 10 19-20v55H6z" />
        <circle cx="95" cy="31" r="3.5" />
      </svg>
    );
  }

  if (kind === "medical") {
    return (
      <svg className="motif-pulse" viewBox="0 0 120 72" fill="none">
        <path d="M5 38h24l11-20 17 39 13-28 9 12h36" />
        <circle cx="40" cy="18" r="3" />
      </svg>
    );
  }

  if (kind === "flower") {
    return (
      <div className="motif-flower">
        <span />
        <span />
        <span />
        <span />
        <i />
      </div>
    );
  }

  if (kind === "chat" || kind === "assistant") {
    return (
      <div className="motif-chat">
        <span className="motif-bubble motif-bubble-one" />
        <span className="motif-bubble motif-bubble-two" />
        <span className="motif-chat-line" />
      </div>
    );
  }

  if (kind === "legal") {
    return (
      <div className="motif-document">
        <span className="motif-document-title" />
        <span />
        <span />
        <span className="motif-document-short" />
      </div>
    );
  }

  if (kind === "code") {
    return (
      <div className="motif-code">
        <strong>&lt;/&gt;</strong>
        <span />
        <span />
        <span className="motif-code-short" />
      </div>
    );
  }

  if (kind === "language") {
    return (
      <div className="motif-language">
        <span>EN</span>
        <ArrowRight size={15} />
        <span>FR</span>
      </div>
    );
  }

  if (kind === "vision") {
    return (
      <div className="motif-vision">
        <span className="focus-corner corner-a" />
        <span className="focus-corner corner-b" />
        <span className="focus-corner corner-c" />
        <span className="focus-corner corner-d" />
        <span className="focus-target" />
      </div>
    );
  }

  return (
    <div className="motif-table">
      {Array.from({ length: 9 }, (_, index) => (
        <span key={index} />
      ))}
    </div>
  );
}

function ProjectArtwork({
  project,
  index,
}: {
  project: PortfolioProject;
  index: number;
}) {
  const Icon = project.icon;

  return (
    <div className={`project-art art-${project.art}`} aria-hidden="true">
      <div className="art-window-bar">
        <span className="art-window-dots">
          <i />
          <i />
          <i />
        </span>
        <span className="art-window-title">ZAEEM / PROJECT VIEW</span>
        <span className="art-window-index">#{String(index + 1).padStart(2, "0")}</span>
      </div>
      <div className="art-stage">
        <div className="art-icon-tile">
          <Icon size={31} strokeWidth={1.55} />
        </div>
        <div className="art-mini-window">
          <div className="art-mini-topline">
            <span />
            <span />
          </div>
          <ProjectMotif kind={project.art} />
        </div>
      </div>
      <div className="art-footer-line">
        <span>{project.categories[0]}</span>
        <span className="art-footer-mark">
          <i />
          PROJECT STUDY
        </span>
      </div>
    </div>
  );
}

function ProjectAction({
  href,
  label,
  unavailableLabel,
  kind,
}: {
  href?: string;
  label: string;
  unavailableLabel: string;
  kind: "repository" | "demo";
}) {
  if (!href) {
    return (
      <span className="project-action project-action-unavailable" aria-disabled="true">
        <ExternalLink size={14} aria-hidden="true" />
        {unavailableLabel}
      </span>
    );
  }

  return (
    <a
      className={`project-action${kind === "demo" ? " project-action-demo" : ""}`}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} in a new tab`}
    >
      {kind === "repository" ? (
        <SocialGlyph platform="github" size={15} />
      ) : (
        <ExternalLink size={14} aria-hidden="true" />
      )}
      {label}
    </a>
  );
}

function Projects() {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("All Projects");
  const reduceMotion = useReducedMotion();
  const visibleProjects =
    activeFilter === "All Projects"
      ? projects
      : projects.filter((project) => project.categories.includes(activeFilter));

  return (
    <section id="projects" className="section projects-section section-anchor">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Selected work"
            title="Projects built to put ideas to work."
            description="A growing collection of AI applications, machine-learning experiments, conversational tools, and language projects."
          />
        </Reveal>

        <div className="project-filter-row">
          <div className="project-filters" role="group" aria-label="Filter projects">
            {projectFilters.map((filter) => (
              <button
                key={filter}
                className={`filter-button${activeFilter === filter ? " is-active" : ""}`}
                type="button"
                aria-pressed={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
          <p className="project-result-count" aria-live="polite">
            {visibleProjects.length} projects
          </p>
        </div>

        <motion.div layout className="project-grid">
          <AnimatePresence mode="popLayout" initial={false}>
            {visibleProjects.map((project, index) => (
              <motion.article
                layout
                key={project.id}
                className="project-card"
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: 8 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.28,
                  delay: reduceMotion ? 0 : Math.min(index * 0.025, 0.16),
                  layout: { duration: reduceMotion ? 0 : 0.32 },
                }}
              >
                <ProjectArtwork project={project} index={projects.indexOf(project)} />
                <div className="project-card-body">
                  <div className="project-card-meta">
                    <span>{project.categories[0]}</span>
                    <span>{String(projects.indexOf(project) + 1).padStart(2, "0")}</span>
                  </div>
                  <h3>{project.title}</h3>
                  <p className="project-description">{project.description}</p>

                  {project.technologies.length > 0 ? (
                    <ul className="technology-list" aria-label="Technologies">
                      {project.technologies.map((technology) => (
                        <li key={technology}>{technology}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="technology-placeholder">
                      Technology details not provided
                    </p>
                  )}

                  <div className="project-actions">
                    <ProjectAction
                      kind="repository"
                      href={project.repository}
                      label="Repository"
                      unavailableLabel="Repository link not provided"
                    />
                    {project.additionalRepositories?.map((repository) => (
                      <ProjectAction
                        key={repository.href}
                        kind="repository"
                        href={repository.href}
                        label={repository.label}
                        unavailableLabel="Repository link not provided"
                      />
                    ))}
                    <ProjectAction
                      kind="demo"
                      href={project.demo}
                      label={project.demoLabel ?? "Live demo"}
                      unavailableLabel="Demo link not provided"
                    />
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="section skills-section section-anchor">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Technical toolkit"
            title="Skills for thoughtful AI products."
            description="A practical set of tools and concepts I work with while building and learning."
          />
        </Reveal>
        <div className="skills-grid">
          {skillGroups.map((group, index) => {
            const Icon = group.icon;
            return (
              <Reveal key={group.title} delay={index * 0.035}>
                <article className="skill-card">
                  <div className="skill-card-heading">
                    <span className="skill-icon">
                      <Icon size={20} strokeWidth={1.7} aria-hidden="true" />
                    </span>
                    <h3>{group.title}</h3>
                  </div>
                  <ul className="skill-list">
                    {group.skills.map((skill) => (
                      <li key={skill}>{skill}</li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Interests() {
  return (
    <section id="interests" className="section interests-section section-anchor">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="What keeps me curious"
            title="AI & technology interests."
            description="Areas I enjoy exploring, experimenting with, and learning more about."
          />
        </Reveal>
        <div className="interests-grid">
          {interests.map((interest, index) => {
            const Icon = interest.icon;
            return (
              <Reveal key={interest.name} delay={index * 0.025}>
                <div className="interest-item">
                  <span className="interest-icon">
                    <Icon size={21} strokeWidth={1.65} aria-hidden="true" />
                  </span>
                  <span>{interest.name}</span>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Profiles() {
  return (
    <section id="profiles" className="section profiles-section">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Around the web"
            title="Developer profiles."
            description="Follow my work and find me on these platforms."
          />
        </Reveal>
        <div className="profiles-grid">
          {socialProfiles.map((profile, index) => (
            <Reveal key={profile.name} delay={index * 0.07}>
              <a
                className="profile-card"
                href={profile.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${profile.name} profile, opens in a new tab`}
              >
                <span className={`profile-icon profile-icon-${profile.icon}`}>
                  <SocialGlyph platform={profile.icon} size={22} />
                </span>
                <span className="profile-copy">
                  <strong>{profile.name}</strong>
                  <small>{profile.description}</small>
                </span>
                <ArrowRight className="profile-arrow" size={18} aria-hidden="true" />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [copied, setCopied] = useState(false);
  const [formSent, setFormSent] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactDetails.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  };

  const openEmailDraft = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const senderEmail = String(formData.get("email") ?? "").trim();
    const subject = String(formData.get("subject") ?? "Portfolio inquiry").trim();
    const message = String(formData.get("message") ?? "").trim();
    const body = [`Name: ${name}`, `Email: ${senderEmail}`, "", message].join("\n");
    const emailUrl = `mailto:${contactDetails.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setFormSent(true);
    window.location.assign(emailUrl);
  };

  return (
    <section id="contact" className="section contact-section section-anchor">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Contact"
            title="Let's Build Something Amazing Together"
            description="Have an idea, project, or opportunity? Let's connect and explore how we can build something meaningful with technology."
          />
        </Reveal>

        <div className="contact-layout">
          <Reveal className="contact-aside">
            <p className="contact-aside-title">Start a conversation.</p>
            <p className="contact-aside-copy">
              I&apos;m interested in learning about thoughtful projects,
              collaborations, and opportunities in AI and software development.
            </p>

            <div className="contact-details">
              <a
                className="contact-detail contact-detail-link"
                href={`mailto:${contactDetails.email}`}
                aria-label={`Email ${contactDetails.email}`}
              >
                <span className="contact-detail-icon">
                  <Mail size={18} aria-hidden="true" />
                </span>
                <span>
                  <small>Email</small>
                  <strong>{contactDetails.email}</strong>
                </span>
              </a>
              <a
                className="contact-detail contact-detail-link"
                href={`tel:${contactDetails.phone}`}
                aria-label={`Call ${contactDetails.displayPhone ?? contactDetails.phone}`}
              >
                <span className="contact-detail-icon">
                  <Phone size={18} aria-hidden="true" />
                </span>
                <span>
                  <small>Phone</small>
                  <strong>{contactDetails.displayPhone ?? contactDetails.phone}</strong>
                </span>
              </a>
            </div>

            <div className="contact-socials">
              {socialProfiles.map((profile) => (
                <a
                  key={profile.name}
                  href={profile.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={profile.name}
                >
                  <SocialGlyph platform={profile.icon} size={18} />
                  <span>{profile.name}</span>
                  <ExternalLink size={13} aria-hidden="true" />
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal className="contact-form-wrap" delay={0.12}>
            <form className="contact-form" onSubmit={openEmailDraft}>
              <div className="form-grid">
                <div className="form-field">
                  <label htmlFor="contact-name">Name</label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    placeholder="Your name"
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="contact-email">Email</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="you@example.com"
                  />
                </div>
                <div className="form-field form-field-full">
                  <label htmlFor="contact-subject">Subject</label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    required
                    placeholder="What would you like to discuss?"
                  />
                </div>
                <div className="form-field form-field-full">
                  <label htmlFor="contact-message">Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    required
                    placeholder="Tell me a little about your idea..."
                  />
                </div>
              </div>
              <div className="form-submit-row">
                <button
                  className="button button-primary form-submit"
                  type="submit"
                  aria-describedby="contact-form-note"
                >
                  <Send size={16} aria-hidden="true" /> Send Message
                </button>
                <button
                  type="button"
                  className="button button-secondary copy-email-btn"
                  onClick={handleCopyEmail}
                  title="Copy email address to clipboard"
                >
                  {copied ? (
                    <>
                      <Check size={15} aria-hidden="true" /> Copied Email!
                    </>
                  ) : (
                    <>
                      <Copy size={15} aria-hidden="true" /> Copy Email
                    </>
                  )}
                </button>
              </div>

              {formSent && (
                <div className="form-status-banner" role="status">
                  <Check size={16} aria-hidden="true" />
                  <span>
                    Email draft triggered! If your mail client did not open, use <strong>Copy Email</strong> above to email directly.
                  </span>
                </div>
              )}

              <p className="form-note" id="contact-form-note">
                Send opens your email app with a prepared draft. Review and send
                the message there; this site does not store submissions.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand-block">
          <a className="brand" href="#home" aria-label="Zaeem.dev, home">
            <span className="brand-mark">MZF</span>
            <span className="brand-name">
              Zaeem<span>.dev</span>
            </span>
          </a>
          <p>Muhammad Zaeem Fayyaz</p>
          <small>
            AI Application Developer | Machine Learning Enthusiast | Python
            Developer
          </small>
        </div>

        <nav className="footer-nav" aria-label="Footer navigation">
          <span>Quick links</span>
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="footer-socials" aria-label="Social profiles">
          {socialProfiles.map((profile) => (
            <a
              key={profile.name}
              href={profile.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={profile.name}
              title={profile.name}
            >
              <SocialGlyph platform={profile.icon} size={18} />
            </a>
          ))}
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© 2026 Muhammad Zaeem Fayyaz. All Rights Reserved.</p>
        <a href="#home">Back to top <ArrowUp size={14} aria-hidden="true" /></a>
      </div>
    </footer>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 560);
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const handleResize = () => {
      if (window.innerWidth > 800) setMenuOpen(false);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = menuOpen ? "hidden" : previous;
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Navbar
        menuOpen={menuOpen}
        onMenuToggle={() => setMenuOpen((open) => !open)}
        onNavigate={() => setMenuOpen(false)}
      />
      <main id="main-content">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Interests />
        <Profiles />
        <Contact />
      </main>
      <Footer />
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            className="scroll-top"
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Scroll to top"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowUp size={19} aria-hidden="true" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}