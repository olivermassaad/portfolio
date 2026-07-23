import Link from "next/link";
import DetailModal from "../components/detail-modal";
import { ExpandableBlock, HomeDetailProvider } from "../components/home-detail-context";
import StaggeredWordRotate from "../components/staggered-word-rotate";

const skills = [
  "Java",
  "Python",
  "JavaScript",
  "React",
  "HTML5",
  "CSS3",
  "Backend Development",
  "Frontend Development",
  "Unreal Engine",
  "Twinmotion",
  "Unity 3D",
  "Algorithms",
  "Data Structures",
  "Applied Mathematics",
  "GitHub Copilot",
  "Google AI Studio",
  "Prompt Engineering",
  "Matterport",
  "VR Prototyping",
  "3D Environment Design",
  "Roblox Studio",
  "Data Analysis",
  "Modern AI Models",
  "Git",
];

const taglineWords = [
  "Full-stack web app developer",
  "Intern @ Morgan Stanley",
  "5x Hackathon Winner",
];

export default function HomePage() {
  return (
    <>
      <header className="hero-flat">
        <h1 className="hero-name intro-item intro-name" data-reveal="scale">
          <span>Oliver</span>
          <br></br>
          <span>Massaad</span>
        </h1>
        <p className="hero-kicker intro-item" data-reveal="top">
          Computer Science Student · Dawson College
        </p>
        <p className="tagline intro-item" data-reveal="right">
          <StaggeredWordRotate words={taglineWords} />
        </p>
        <div className="cta intro-item" data-reveal="bottom">
          <Link href="/projects" className="btn btn-primary btn-pill">
            View Projects
          </Link>
          <Link href="/contact" className="btn btn-secondary btn-pill">
            Get in Touch
          </Link>
        </div>
        <div className="meta-pills intro-item" data-reveal="left">
          <span className="pill">AI & full-stack apps</span>
          <span className="pill">React frontends · Python backends</span>
          <span className="pill">Musician · Radio speaker</span>
        </div>
      </header>

      <HomeDetailProvider>
        <div className="home-grid">
          <section className="section span-2 about-section" data-reveal="bottom">
            <h2>About Me</h2>
            <p className="long-animate">
              I am a computer science and mathematics student focused on building high-impact software
              with practical AI integration. I enjoy solving real problems end to end: planning,
              prototyping, shipping, and refining with user feedback. My background in development and
              coordination helps me move quickly while staying organized, especially in team settings where
              communication and ownership matter.
            </p>
          </section>

          <section className="section highlights-panel about-section" data-reveal="left">
            <h2>Profile</h2>
            <div className="fact-grid">
              <ExpandableBlock detailId="profile-student" className="fact-card">
                <span className="fact-number">Student</span>
                <span className="fact-label">SCSM Student @ Dawson College</span>
              </ExpandableBlock>
              <ExpandableBlock detailId="profile-developer" className="fact-card">
                <span className="fact-number">Developer</span>
                <span className="fact-label">Full-Stack Developer & Software Engineer</span>
              </ExpandableBlock>
              <ExpandableBlock detailId="profile-founder" className="fact-card">
                <span className="fact-number">Founder</span>
                <span className="fact-label">Creator & Maintainer of Multiple Projects</span>
              </ExpandableBlock>
              <ExpandableBlock detailId="profile-vr-intern" className="fact-card">
                <span className="fact-number">Modeler</span>
                <span className="fact-label">Technology and Innovation Intern for 2 years @ SAJO</span>
              </ExpandableBlock>
              <ExpandableBlock detailId="profile-technologist-intern" className="fact-card">
                <span className="fact-number">Technologist</span>
                <span className="fact-label">IST Technology Intern @ Morgan Stanley</span>
              </ExpandableBlock>
              <ExpandableBlock detailId="profile-musician" className="fact-card">
                <span className="fact-number">Musician</span>
                <span className="fact-label">Pianist & Guitarist · Keyboardist of the band RE:ZONE</span>
              </ExpandableBlock>
            </div>
          </section>

          <section className="section education-panel about-section" data-reveal="right">
            <h2>Education</h2>
            <div className="mini-stack">
              <ExpandableBlock detailId="education-dawson" className="mini-card">
                <span className="mini-year">2024-2026</span>
                <h3>DEC Computer Science & Mathematics</h3>
                <p>Dawson College</p>
              </ExpandableBlock>
              <ExpandableBlock detailId="education-stanislas" className="mini-card">
                <span className="mini-year">2013-2024</span>
                <h3>High School Diploma - Highest Honors</h3>
                <p>Stanislas College, Outremont</p>
              </ExpandableBlock>
            </div>
          </section>

          <section className="section span-2 experience-panel about-section" data-reveal="bottom">
            <h2>Experience</h2>
            <div className="experience-grid">
              <ExpandableBlock detailId="experience-sajo" className="experience-card">
                <div className="experience-head">
                  <h3>Innovation & Technology Intern</h3>
                  <span>2023-2025</span>
                </div>
                <p className="where">SAJO (International General Contractor)</p>
                <ul>
                  <li>Built VR-ready office simulations in Twinmotion for Miami and Montreal spaces.</li>
                  <li>Performed LiDAR and Matterport scanning workflows for site capture projects.</li>
                  <li>Contributed to AstraIPT website layout, logic, and backend architecture.</li>
                </ul>
              </ExpandableBlock>
              <ExpandableBlock detailId="experience-morgan-stanley" className="experience-card">
                <div className="experience-head">
                  <h3>Technologist IST Intern</h3>
                  <span>2026</span>
                </div>
                <p className="where">Morgan Stanley</p>
                <ul>
                  <li>
                    Supporting technology and innovation work within Morgan Stanley&apos;s IST organization.
                  </li>
                  <li>Applying full-stack development skills in a financial technology environment.</li>
                </ul>
              </ExpandableBlock>
            </div>
          </section>

          <section className="section volunteer-panel about-section" data-reveal="left">
            <h2>Volunteer & extracurricular</h2>
            <div className="award-mini-grid">
              <ExpandableBlock detailId="volunteer-shine-the-light" className="award-mini">
                <span className="award-mini-title">Shine the Light on Woman Abuse · </span>
                <span className="award-mini-meta">Awareness campaign for violence</span>
              </ExpandableBlock>
              <ExpandableBlock detailId="volunteer-radiostan" className="award-mini">
                <span className="award-mini-title">Mission Bon Accueil · </span>
                <span className="award-mini-meta">Providing food for dog shelters</span>
              </ExpandableBlock>
              <ExpandableBlock detailId="volunteer-podcast" className="award-mini">
                <span className="award-mini-title">RadioStan Host & Presenter · </span>
                <span className="award-mini-meta">Student radio broadcast</span>
              </ExpandableBlock>
              <ExpandableBlock detailId="volunteer-sports" className="award-mini">
                <span className="award-mini-title">Soccer & Karate · </span>
                <span className="award-mini-meta">Former soccer player and karate competitor</span>
              </ExpandableBlock>
              <ExpandableBlock detailId="volunteer-rezone" className="award-mini">
                <span className="award-mini-title">RE:ZONE · </span>
                <span className="award-mini-meta">Keyboardist for a J-Rock band</span>
              </ExpandableBlock>
            </div>
          </section>

          <section className="section achievements-panel about-section" data-reveal="right">
            <h2>Awards & Certificates</h2>
            <div className="award-mini-grid">
              <ExpandableBlock detailId="award-aerohacks" className="award-mini">
                <span className="award-mini-title">McGill AeroHacks · </span>
                <span className="award-mini-meta">1st Place · 150+ participants</span>
              </ExpandableBlock>
              <ExpandableBlock detailId="award-conuhacks-x" className="award-mini">
                <span className="award-mini-title">ConUHacks X · </span>
                <span className="award-mini-meta">2nd Place · 1000+ participants</span>
              </ExpandableBlock>
              <ExpandableBlock detailId="award-athacks" className="award-mini">
                <span className="award-mini-title">AtHacks · </span>
                <span className="award-mini-meta">3rd Place · 400+ participants</span>
              </ExpandableBlock>
              <ExpandableBlock detailId="award-hackdecouverte" className="award-mini">
                <span className="award-mini-title">HackDécouverte · </span>
                <span className="award-mini-meta">Gemini API · 150+ participants</span>
              </ExpandableBlock>
              <ExpandableBlock detailId="award-dialogue" className="award-mini">
                <span className="award-mini-title">Dialogue 2026 · </span>
                <span className="award-mini-meta">Award · 200+ participants</span>
              </ExpandableBlock>
            </div>
          </section>

          <section className="section span-2 skill-cloud-panel about-section" data-reveal="bottom">
            <h2>Technical Skills</h2>
            <div className="skill-cloud">
              {skills.map((skill) => (
                <span key={skill} className="skill-cloud-tag">
                  {skill}
                </span>
              ))}
            </div>
          </section>
        </div>

        <DetailModal />
      </HomeDetailProvider>
    </>
  );
}
