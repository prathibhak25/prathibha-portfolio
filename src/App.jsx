import { useEffect, useState } from 'react'
import './App.css'

const experience = [
  { company: 'Western Union', location: 'Austin, TX', period: 'Aug 2024 — Present', eyebrow: 'Financial Services', description: 'Contributing to a global transaction platform that supports secure money-transfer and payment workflows. Building responsive React experiences and scalable Spring Boot services with a focus on transaction reliability, security, and clear status visibility.', highlights: ['Transfer initiation & tracking', 'Event-driven transaction updates', 'Secure API integrations'], stack: ['Java 11', 'Spring Boot', 'React', 'Kafka', 'Oracle', 'AWS'] },
  { company: 'The Home Depot', location: 'Atlanta, GA', period: 'Mar 2022 — Jul 2024', eyebrow: 'Retail & E-commerce', description: 'Developed customer-facing commerce and order-management features spanning product availability, checkout, fulfillment, and order-status workflows. Integrated digital experiences with inventory, payment, and fulfillment services.', highlights: ['Product & inventory visibility', 'Idempotent order processing', 'Checkout and fulfillment flows'], stack: ['Java', 'Spring Boot', 'React', 'GraphQL', 'SQL', 'Docker'] },
  { company: 'TREK Bicycle Corporation', location: 'Waterloo, WI', period: 'Jan 2020 — Feb 2022', eyebrow: 'Digital Commerce', description: 'Built digital-commerce features for bicycle discovery, configuration, dealer search, and inventory availability. Improved product-rich pages through reusable components, optimized queries, and performance-focused delivery.', highlights: ['Bicycle configuration journeys', 'Dealer and inventory search', 'Media-heavy page performance'], stack: ['Java', 'Spring Boot', 'React', 'Next.js', 'SQL Server', 'AWS'] },
  { company: 'iPrism Technologies', location: 'Hyderabad, India', period: 'Jul 2018 — Dec 2019', eyebrow: 'Healthcare Technology', description: 'Contributed to a telemedicine platform supporting patient registration, appointment requests, profile management, and service workflows. Developed role-aware interfaces and secure APIs for patient and provider information.', highlights: ['Patient onboarding', 'Appointment workflows', 'Validation and audit-friendly responses'], stack: ['Java', 'Spring Boot', 'React', 'REST APIs', 'Hibernate', 'SQL'] },
]

const skillGroups = [
  { title: 'Frontend', items: ['React', 'TypeScript', 'JavaScript', 'Redux', 'React Hooks', 'HTML5 & CSS3'] },
  { title: 'Backend', items: ['Java 8/11/17', 'Spring Boot', 'Spring Security', 'REST & SOAP APIs', 'Hibernate / JPA', 'Microservices'] },
  { title: 'Data & Messaging', items: ['Oracle', 'PostgreSQL', 'SQL Server', 'MongoDB', 'Cassandra', 'Apache Kafka'] },
  { title: 'Cloud & Delivery', items: ['AWS', 'Docker', 'Kubernetes', 'Jenkins', 'GitHub Actions', 'CloudWatch'] },
]

const projects = [
  { number: '01', slug: 'the-cube', name: 'The Cube', category: '3D', description: 'A minimal 3D motion experiment blending geometry, light, and precision in code.', stack: '3D · Motion · Creative Code', detail: 'An interactive study in spatial composition, lighting, rotation, and smooth browser-based motion.', externalLink: 'https://codepen.io/prathibha_chinni/pen/ogxNwYY', visual: 'cube' },
  { number: '02', slug: 'cyberpunk-tunnel', name: 'Cyberpunk Tunnel', category: '3D', description: 'A reactive tunnel experience exploring depth, movement, lighting, and atmosphere in real time.', stack: 'Three.js · WebGL · JavaScript', detail: 'Designed to create a strong sense of speed and depth through repeated geometry, responsive movement, and neon lighting.', visual: 'tunnel' },
  { number: '03', slug: 'liquid-glass-apple', name: 'Liquid Glass Apple', category: 'Motion', description: 'A product-inspired visual experiment that recreates transparency, refraction, and liquid-glass distortion.', stack: 'Creative CSS · Visual Effects', detail: 'A polished product-style study focused on material depth, subtle distortion, and responsive glass effects.', visual: 'glass' },
  { number: '04', slug: 'react-dashboard', name: 'React Dashboard', category: 'UI', description: 'A responsive dashboard interface designed around clear information hierarchy, reusable components, and fluid layouts.', stack: 'React · Tailwind CSS · UI Design', detail: 'Built as a practical admin experience with reusable cards, data hierarchy, responsive grids, and clear interaction states.', visual: 'dashboard' },
  { number: '05', slug: 'e-commerce-landing', name: 'E-Commerce Landing', category: 'UI', description: 'A conversion-focused landing experience balancing typography, motion, product storytelling, and responsive behavior.', stack: 'React · Responsive Design · Motion', detail: 'A storefront concept combining strong product hierarchy, calls to action, mobile responsiveness, and visual rhythm.', visual: 'commerce' },
  { number: '06', slug: 'monkey-island', name: 'Monkey Island Animation', category: 'Motion', description: 'A playful motion sequence created entirely with CSS, using timing and layered animation without JavaScript.', stack: 'CSS Animation · Illustration', detail: 'A lightweight animation experiment demonstrating coordinated timing, layered movement, and CSS-only storytelling.', visual: 'island' },
]

function App() {
  const [filter, setFilter] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)
  const [activeSection, setActiveSection] = useState('about')
  const [progress, setProgress] = useState(0)
  const [lightMode, setLightMode] = useState(false)
  const filteredProjects = filter === 'All' ? projects : projects.filter((project) => project.category === filter)

  useEffect(() => {
    const revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('is-visible')
    }), { threshold: 0.12 })
    document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element))

    const sectionObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) setActiveSection(entry.target.id)
    }), { rootMargin: '-35% 0px -55%' })
    document.querySelectorAll('section[id]').forEach((section) => sectionObserver.observe(section))

    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => { revealObserver.disconnect(); sectionObserver.disconnect(); window.removeEventListener('scroll', onScroll) }
  }, [filter])

  const moveGlow = (event) => {
    event.currentTarget.style.setProperty('--pointer-x', `${event.clientX}px`)
    event.currentTarget.style.setProperty('--pointer-y', `${event.clientY}px`)
  }

  return (
    <div className={`site-shell ${lightMode ? 'light-mode' : ''}`} onPointerMove={moveGlow}>
      <div className="scroll-progress" style={{ width: `${progress}%` }} />
      <div className="cursor-glow" aria-hidden="true" />
      <nav className="navbar" aria-label="Primary navigation">
        <a className="logo" href="#top" aria-label="Prathibha Kalagani home">PK<span>.</span></a>
        <div className="nav-links">{['about', 'experience', 'skills', 'projects'].map((item) => <a className={activeSection === item ? 'active' : ''} key={item} href={`#${item}`}>{item.charAt(0).toUpperCase() + item.slice(1)}</a>)}</div>
        <div className="nav-actions"><button className="theme-toggle" onClick={() => setLightMode((value) => !value)} aria-label="Toggle portfolio color theme">{lightMode ? '●' : '○'}</button><a className="nav-cta" href="#contact">Let’s talk <span>↗</span></a></div>
      </nav>

      <main>
        <section id="top" className="hero">
          <div className="hero-copy">
            <div className="availability"><span /> Based in Austin, Texas · Open to opportunities</div>
            <p className="kicker">Java Full Stack Developer</p>
            <h1>I build reliable products from <em>interface</em> to infrastructure.</h1>
            <p className="hero-text">I’m Prathibha Kalagani, a full-stack developer with 8+ years of experience creating secure, scalable applications across financial services, retail, e-commerce, and healthcare.</p>
            <div className="hero-actions"><a href="#experience" className="primary-btn">Explore my work <span>↓</span></a><a href="mailto:prathibhakalagani25@gmail.com" className="text-link">Email me <span>↗</span></a></div>
          </div>
          <aside className="hero-panel" aria-label="Professional profile summary">
            <div className="panel-top"><span>PROFILE / 2026</span><span>FULL STACK</span></div>
            <div className="profile-photo"><img src="./prathibha-profile.jpeg" alt="Prathibha Kalagani with the New York City skyline" /><span>Prathibha Kalagani</span></div>
            <div className="panel-grid"><div><strong>8+</strong><span>Years in software</span></div><div><strong>04</strong><span>Industry domains</span></div><div><strong>FE + BE</strong><span>End-to-end delivery</span></div><div><strong>AWS</strong><span>Cloud experience</span></div></div>
          </aside>
        </section>

        <section id="about" className="section about-section reveal">
          <div className="section-label">01 / About</div>
          <div className="section-content about-grid"><h2>Engineering useful, dependable experiences—not just features.</h2><div className="about-copy"><p>I work across React interfaces, Java and Spring Boot services, API integrations, data layers, and cloud delivery. My strength is connecting these pieces into applications that feel clear to users and remain maintainable for engineering teams.</p><p>My day-to-day work includes Agile planning, feature development, testing, code reviews, deployment support, and close collaboration with product, QA, and DevOps teams.</p></div></div>
        </section>

        <section id="experience" className="section experience-section reveal">
          <div className="section-heading"><div className="section-label">02 / Experience</div><h2>Selected client work</h2></div>
          <div className="experience-list">{experience.map((role) => <article className="experience-item" key={role.company}><div className="experience-meta"><span className="eyebrow">{role.eyebrow}</span><span>{role.period}</span><span>{role.location}</span></div><div className="experience-main"><h3>{role.company}</h3><p>{role.description}</p><ul>{role.highlights.map((item) => <li key={item}>{item}</li>)}</ul><div className="tech-list">{role.stack.map((item) => <span key={item}>{item}</span>)}</div></div></article>)}</div>
        </section>

        <section id="skills" className="section skills-section reveal">
          <div className="section-heading"><div className="section-label">03 / Capabilities</div><h2>A practical full-stack toolkit</h2></div>
          <div className="skill-grid">{skillGroups.map((group, index) => <article className="skill-card" key={group.title}><span className="skill-number">0{index + 1}</span><h3>{group.title}</h3><ul>{group.items.map((skill) => <li key={skill}>{skill}</li>)}</ul></article>)}</div>
        </section>

        <section id="projects" className="section projects-section reveal">
          <div className="section-heading"><div className="section-label">04 / Projects</div><h2>Ideas built beyond client work</h2></div>
          <div className="project-filters" aria-label="Filter projects">{['All', 'UI', '3D', 'Motion'].map((item) => <button className={filter === item ? 'active' : ''} key={item} onClick={() => { setFilter(item); setSelectedProject(null) }}>{item}</button>)}</div>
          <div className="project-grid">{filteredProjects.map((project) => <article className="project-card" key={project.name}><button className="project-preview" onClick={() => setSelectedProject(project)} aria-label={`Read more about ${project.name}`}><span className="preview-label">{project.category} / {project.number}</span><span className={`preview-art ${project.visual}`} aria-hidden="true"><i /><i /><i /></span><span className="preview-open">View details ↗</span></button><div className="project-info"><span>{project.stack}</span><h3>{project.name}</h3><p>{project.description}</p><a className="demo-link" href={`./project-demo.html?project=${project.slug}`} target="_blank" rel="noreferrer">Launch interactive demo <b>↗</b></a></div></article>)}</div>
          {selectedProject && <div className="project-detail" role="region" aria-live="polite"><div><span className="section-label">Selected project / {selectedProject.number}</span><h3>{selectedProject.name}</h3><p>{selectedProject.detail}</p><span className="project-stack">{selectedProject.stack}</span></div><div className="detail-actions"><a href={`./project-demo.html?project=${selectedProject.slug}`} target="_blank" rel="noreferrer">Open interactive demo ↗</a>{selectedProject.externalLink && <a href={selectedProject.externalLink} target="_blank" rel="noreferrer">View original CodePen ↗</a>}<button onClick={() => setSelectedProject(null)}>Close ×</button></div></div>}
        </section>

        <section id="contact" className="contact-section"><div className="contact-copy"><div className="section-label">05 / Contact</div><h2>Have a role or project in mind?</h2><p>I’m open to full-stack, Java, and software engineering opportunities where I can build useful products and contribute across the stack.</p></div><a className="contact-button" href="mailto:prathibhakalagani25@gmail.com"><span>Start a conversation</span><strong>↗</strong></a></section>
      </main>

      <footer><span>© 2026 Prathibha Kalagani</span><div><a href="https://www.linkedin.com/in/prathibha-k-250384390/" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="https://github.com/prathibhak25" target="_blank" rel="noreferrer">GitHub ↗</a><a href="mailto:prathibhakalagani25@gmail.com">Email ↗</a></div></footer>
    </div>
  )
}

export default App
