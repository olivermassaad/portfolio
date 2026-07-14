import { getAchievementBySlug } from "./data";

/**
 * Expanded modal content format:
 * - title, meta, summary, badge (optional)
 * - items: [{ label, href?, linkLabel? }]
 * - gallery: [{ type: "image" | "video", src, alt?, poster? }]
 * Legacy `details: ["..."]` still works and is auto-converted to items.
 *
 * Gallery tips:
 * - Each entry owns its own gallery array (no shared auto-fill).
 * - Temporary placeholders use /gallery/fillers/filler-0{1,2,3}.svg
 * - Replace each `src` with your own files, e.g. /gallery/profile-student/01.png
 */

function fromAchievement(slug) {
  const item = getAchievementBySlug(slug);
  if (!item) return null;

  let badge = item.status;
  if (item.victory === true) badge = "Winner";
  else if (item.status === "Certificate") badge = "Certificate";

  return {
    title: item.title,
    meta: [item.date, item.location].filter(Boolean).join(" · "),
    badge,
    summary: item.description,
    details: item.details ?? [],
    items: buildAchievementItems(item),
    gallery: item.gallery ?? [],
    href: item.external_url || null,
    team: item.team || null,
  };
}

function buildAchievementItems(item) {
  const items = (item.details ?? []).map((label) => ({ label }));

  if (item.external_url) {
    items.push({
      label: item.description || "View the full submission",
      href: item.external_url,
      linkLabel: "View project",
    });
  }

  return items;
}

function withTeam(detail) {
  if (!detail?.team) return detail;
  return {
    ...detail,
    details: [`Team: ${detail.team}`, ...(detail.details ?? [])],
    items: [{ label: `Team: ${detail.team}` }, ...(detail.items ?? (detail.details ?? []).map((label) => ({ label })))],
  };
}

export const homeDetails = {
  "profile-student": {
    title: "Student",
    meta: "Dawson College 2024–2026",
    summary: "2nd-year DEC student in Computer Science & Mathematics.",
    details: [
      "Pursuing a DEC in Computer Science & Mathematics at Dawson College.",
      "Coursework spans algorithms, data structures, applied mathematics, and software engineering.",
      "Balances academics with internships, hackathons, and independent technical projects.",
    ],
    gallery: [
      { type: "image", src: "/gallery/dawson-college.jpg", alt: "Dawson College" },
      { type: "image", src: "/gallery/college-stanislas.jpg", alt: "Stanislas College" },
      { type: "image", src: "/gallery/concordia-university.jpg", alt: "Student placeholder 3" },
    ],
  },
  "profile-developer": {
    title: "Developer",
    meta: "Full-stack · Python & JavaScript",
    summary: "Full-stack developer and software engineer across web, AI, and interactive 3D projects.",
    details: [
      "Builds end-to-end applications with React frontends and Python backends.",
      "Ships AI-integrated products from concept through deployment and iteration.",
      "Recent work includes productivity tools, hackathon platforms, and internal tooling for enterprise teams.",
    ],
    gallery: [
      { type: "image", src: "/gallery/python.jpg", alt: "Python" },
      { type: "image", src: "/gallery/html-css-js.png", alt: "HTML CSS JS" },
      { type: "image", src: "/gallery/java.png", alt: "Java" },
    ],
  },
  "profile-founder": {
    title: "Founder",
    meta: "Projects & community",
    summary: "Creator and maintainer of multiple independent software projects.",
    details: [
      "Founded and maintains several personal and team-driven software products.",
      "Co-founded the Dawson Coding Club, a student-led technical organization.",
      "Scaled club interest to 70+ members through outreach, events, and project-led sessions.",
    ],
    gallery: [
      { type: "image", src: "/gallery/nebula-ai.png", alt: "Nebula Ai" },
      { type: "image", src: "/gallery/nebula-life.png", alt: "Nebula Life" },
    ],
  },
  "profile-vr-intern": {
    title: "VR Modeling Intern",
    meta: "SAJO · Technology & Innovation · 2023–2025",
    summary: "Technology and Innovation intern for two years at SAJO.",
    details: [
      "Built VR-ready office simulations in Twinmotion for Miami and Montreal spaces.",
      "Performed LiDAR and Matterport scanning workflows for on-site capture projects.",
      "Contributed to AstraIPT website layout, logic, and backend architecture.",
      "Delivered high-realism environments for Oculus Quest 2 walkthroughs and stakeholder reviews.",
    ],
    gallery: [
      { type: "image", src: "/gallery/miami-office-old-2.png", alt: "SAJO Miami office VR simulation" },
      { type: "image", src: "/gallery/miami-office-old-1.png", alt: "SAJO Miami office VR simulation" },
      { type: "image", src: "/gallery/miami-office-old-3.png", alt: "SAJO Miami office VR simulation" },
    ],
  },
  "profile-technologist-intern": {
    title: "Technologist Intern",
    meta: "Morgan Stanley · IST · 2026",
    summary: "IST Technology intern at Morgan Stanley.",
    details: [
      "Supporting technology and innovation work within Morgan Stanley's IST organization.",
      "Applying full-stack development skills in a large-scale financial technology environment.",
      "Collaborating with engineering teams on practical tooling, workflows, and delivery.",
    ],
    gallery: [
      { type: "image", src: "/gallery/spring-boot.png", alt: "Spring Boot" },
      { type: "image", src: "/gallery/JUnit5.png", alt: "JUnit5" },
      { type: "image", src: "/gallery/WireMock.png", alt: "WireMock" },
    ],
  },
  "profile-musician": {
    title: "Musician",
    meta: "Piano · Guitar · RE:ZONE",
    summary: "Guitarist, Pianist since the age of 5, keyboardist of the band RE:ZONE.",
    details: [
      "Pianist and composer for 13 years.",
      "Keyboardist for the band RE:ZONE.",
      "Former keyboardist of PinkEye; background in performance, arrangement, and composition.",
      "Hosts and presents on student radio through RadioStan and related media projects.",
    ],
    gallery: [
      { type: "image", src: "/gallery/fillers/filler-01.svg", alt: "Musician placeholder 1" },
      { type: "image", src: "/gallery/fillers/filler-02.svg", alt: "Musician placeholder 2" },
      { type: "image", src: "/gallery/fillers/filler-03.svg", alt: "Musician placeholder 3" },
    ],
  },
  "education-dawson": {
    title: "DEC Computer Science & Mathematics",
    meta: "Dawson College · 2024–2026",
    summary: "Undergraduate college program combining computer science and mathematics.",
    details: [
      "Focused on software development, discrete mathematics, and applied problem solving.",
      "Active in hackathons, clubs, and internship work alongside coursework.",
      "Building a foundation for full-stack engineering and AI-integrated product development.",
    ],
    gallery: [
      { type: "image", src: "/gallery/fillers/filler-01.svg", alt: "Dawson College placeholder 1" },
      { type: "image", src: "/gallery/fillers/filler-02.svg", alt: "Dawson College placeholder 2" },
      { type: "image", src: "/gallery/fillers/filler-03.svg", alt: "Dawson College placeholder 3" },
    ],
  },
  "education-stanislas": {
    title: "High School Diploma — Highest Honors",
    meta: "Stanislas College, Outremont · 2013–2024",
    summary: "Completed secondary studies with highest honors.",
    details: [
      "Graduated with highest honors from Stanislas College in Outremont.",
      "Developed early interests in mathematics, science, and creative technology.",
      "Participated in radio, media, and extracurricular leadership activities.",
    ],
    gallery: [
      { type: "image", src: "/gallery/fillers/filler-01.svg", alt: "Stanislas College placeholder 1" },
      { type: "image", src: "/gallery/fillers/filler-02.svg", alt: "Stanislas College placeholder 2" },
      { type: "image", src: "/gallery/fillers/filler-03.svg", alt: "Stanislas College placeholder 3" },
    ],
  },
  "experience-sajo": {
    title: "Innovation & Technology Intern",
    meta: "SAJO (International General Contractor) · 2023–2025",
    summary: "Two-year internship in SAJO's Technology and Innovation department.",
    items: [
      {
        label: "Twinmotion VR office simulations for Miami and Montreal",
        href: "https://www.sajo.com",
        linkLabel: "SAJO",
      },
      {
        label: "LiDAR and Matterport scanning workflows for site capture",
      },
      {
        label: "AstraIPT website layout, logic, and backend architecture",
      },
      {
        label: "Oculus Quest 2 walkthroughs with custom textures and 3D assets",
      },
    ],
    gallery: [
      { type: "image", src: "/gallery/miami-office-old-2.png", alt: "SAJO Miami office VR simulation" },
      { type: "image", src: "/gallery/miami-office-old-1.png", alt: "SAJO Miami office VR simulation" },
      { type: "image", src: "/gallery/miami-office-old-3.png", alt: "SAJO Miami office VR simulation" },
    ],
  },
  "experience-morgan-stanley": {
    title: "Technologist IST Intern",
    meta: "Morgan Stanley · 2026",
    summary: "IST technology internship at Morgan Stanley.",
    details: [
      "Working within Morgan Stanley's IST organization on technology-driven initiatives.",
      "Applying software engineering skills in enterprise-scale environments.",
      "Contributing to delivery, tooling, and cross-team technical collaboration.",
    ],
    gallery: [
      { type: "image", src: "/gallery/spring-boot.png", alt: "Spring Boot" },
      { type: "image", src: "/gallery/JUnit5.png", alt: "JUnit5" },
      { type: "image", src: "/gallery/WireMock.png", alt: "WireMock" },
    ],
  },
  "volunteer-shine-the-light": {
    ...withTeam(fromAchievement("shine-the-light-volunteer")),
    gallery: [
      { type: "image", src: "/gallery/fillers/filler-01.svg", alt: "Shine the Light placeholder 1" },
      { type: "image", src: "/gallery/fillers/filler-02.svg", alt: "Shine the Light placeholder 2" },
      { type: "image", src: "/gallery/fillers/filler-03.svg", alt: "Shine the Light placeholder 3" },
    ],
  },
  "volunteer-radiostan": {
    title: "RadioStan Host & Presenter",
    meta: "Student radio broadcast",
    summary: "Host and presenter for student radio programming at RadioStan.",
    details: [
      "Hosts and presents segments for student radio broadcasts.",
      "Prepares research, scripts, and on-air delivery for educational and interview content.",
      "Collaborates on episodes covering science, community, and current topics.",
    ],
    gallery: [
      { type: "image", src: "/gallery/fillers/filler-01.svg", alt: "RadioStan placeholder 1" },
      { type: "image", src: "/gallery/fillers/filler-02.svg", alt: "RadioStan placeholder 2" },
      { type: "image", src: "/gallery/fillers/filler-03.svg", alt: "RadioStan placeholder 3" },
    ],
  },
  "volunteer-podcast": {
    title: "Guest Podcast Sessions",
    meta: "Speaker & collaborator",
    summary: "Guest appearances and collaborative podcast sessions.",
    details: [
      "Participates as a speaker and collaborator on guest podcast sessions.",
      "Contributes to interview preparation, discussion, and recording.",
      "Co-hosted exclusive interviews with diplomatic and scientific guests on Radio Web Stanislas.",
    ],
    href: "https://www.plusieurscordesasavoix.com/",
    gallery: [
      { type: "image", src: "/gallery/fillers/filler-01.svg", alt: "Podcast placeholder 1" },
      { type: "image", src: "/gallery/fillers/filler-02.svg", alt: "Podcast placeholder 2" },
      { type: "image", src: "/gallery/fillers/filler-03.svg", alt: "Podcast placeholder 3" },
    ],
  },
  "award-conuhacks-x": {
    ...fromAchievement("conuhacks-x-2026"),
    gallery: [
      { type: "image", src: "/gallery/fillers/filler-01.svg", alt: "ConUHacks X placeholder 1" },
      { type: "image", src: "/gallery/fillers/filler-02.svg", alt: "ConUHacks X placeholder 2" },
      { type: "image", src: "/gallery/fillers/filler-03.svg", alt: "ConUHacks X placeholder 3" },
    ],
  },
  "award-athacks": {
    ...fromAchievement("athacks-2026"),
    gallery: [
      { type: "image", src: "/gallery/fillers/filler-01.svg", alt: "AtHacks placeholder 1" },
      { type: "image", src: "/gallery/fillers/filler-02.svg", alt: "AtHacks placeholder 2" },
      { type: "image", src: "/gallery/fillers/filler-03.svg", alt: "AtHacks placeholder 3" },
    ],
  },
  "award-hackdecouverte": {
    ...fromAchievement("hackdecouverte-2025"),
    gallery: [
      { type: "image", src: "/gallery/fillers/filler-01.svg", alt: "HackDécouverte placeholder 1" },
      { type: "image", src: "/gallery/fillers/filler-02.svg", alt: "HackDécouverte placeholder 2" },
      { type: "image", src: "/gallery/fillers/filler-03.svg", alt: "HackDécouverte placeholder 3" },
    ],
  },
  "skill-java": {
    title: "Java",
    meta: "Languages",
    summary: "Object-oriented programming for coursework and application development.",
    details: [
      "Used in academic projects covering OOP, data structures, and algorithmic problem solving.",
    ],
    gallery: [
      { type: "image", src: "/gallery/fillers/filler-01.svg", alt: "Java placeholder 1" },
      { type: "image", src: "/gallery/fillers/filler-02.svg", alt: "Java placeholder 2" },
      { type: "image", src: "/gallery/fillers/filler-03.svg", alt: "Java placeholder 3" },
    ],
  },
  "skill-python": {
    title: "Python",
    meta: "Languages · Backend · AI",
    summary: "Primary backend language for APIs, automation, and AI workflows.",
    details: [
      "Builds backends, scripts, and AI-integrated services across personal and hackathon projects.",
    ],
    gallery: [
      { type: "image", src: "/gallery/fillers/filler-01.svg", alt: "Python placeholder 1" },
      { type: "image", src: "/gallery/fillers/filler-02.svg", alt: "Python placeholder 2" },
      { type: "image", src: "/gallery/fillers/filler-03.svg", alt: "Python placeholder 3" },
    ],
  },
  "skill-javascript": {
    title: "JavaScript",
    meta: "Languages · Frontend",
    summary: "Core language for interactive web applications and full-stack development.",
    details: [
      "Used across frontend interfaces, tooling, and full-stack project delivery.",
    ],
    gallery: [
      { type: "image", src: "/gallery/fillers/filler-01.svg", alt: "JavaScript placeholder 1" },
      { type: "image", src: "/gallery/fillers/filler-02.svg", alt: "JavaScript placeholder 2" },
      { type: "image", src: "/gallery/fillers/filler-03.svg", alt: "JavaScript placeholder 3" },
    ],
  },
  "skill-react": {
    title: "React",
    meta: "Frontend",
    summary: "Component-driven UI development for modern web applications.",
    details: [
      "Builds responsive interfaces with React, including this portfolio and multiple product frontends.",
    ],
    gallery: [
      { type: "image", src: "/gallery/fillers/filler-01.svg", alt: "React placeholder 1" },
      { type: "image", src: "/gallery/fillers/filler-02.svg", alt: "React placeholder 2" },
      { type: "image", src: "/gallery/fillers/filler-03.svg", alt: "React placeholder 3" },
    ],
  },
  "skill-html5": {
    title: "HTML5",
    meta: "Frontend",
    summary: "Semantic markup for accessible, structured web content.",
    details: ["Foundation for layout, forms, and content structure across web projects."],
    gallery: [
      { type: "image", src: "/gallery/fillers/filler-01.svg", alt: "HTML5 placeholder 1" },
      { type: "image", src: "/gallery/fillers/filler-02.svg", alt: "HTML5 placeholder 2" },
      { type: "image", src: "/gallery/fillers/filler-03.svg", alt: "HTML5 placeholder 3" },
    ],
  },
  "skill-css3": {
    title: "CSS3",
    meta: "Frontend",
    summary: "Styling, layout, and motion for polished user interfaces.",
    details: ["Used for responsive design, animations, and visual systems including this site."],
    gallery: [
      { type: "image", src: "/gallery/fillers/filler-01.svg", alt: "CSS3 placeholder 1" },
      { type: "image", src: "/gallery/fillers/filler-02.svg", alt: "CSS3 placeholder 2" },
      { type: "image", src: "/gallery/fillers/filler-03.svg", alt: "CSS3 placeholder 3" },
    ],
  },
  "skill-backend-development": {
    title: "Backend Development",
    meta: "Engineering",
    summary: "Server-side logic, APIs, and data handling.",
    details: [
      "Designs and implements APIs, business logic, and integrations with Python and related tooling.",
    ],
    gallery: [
      { type: "image", src: "/gallery/fillers/filler-01.svg", alt: "Backend Development placeholder 1" },
      { type: "image", src: "/gallery/fillers/filler-02.svg", alt: "Backend Development placeholder 2" },
      { type: "image", src: "/gallery/fillers/filler-03.svg", alt: "Backend Development placeholder 3" },
    ],
  },
  "skill-frontend-development": {
    title: "Frontend Development",
    meta: "Engineering",
    summary: "User-facing interfaces and client-side application logic.",
    details: [
      "Delivers responsive, interactive experiences with React, JavaScript, HTML, and CSS.",
    ],
    gallery: [
      { type: "image", src: "/gallery/fillers/filler-01.svg", alt: "Frontend Development placeholder 1" },
      { type: "image", src: "/gallery/fillers/filler-02.svg", alt: "Frontend Development placeholder 2" },
      { type: "image", src: "/gallery/fillers/filler-03.svg", alt: "Frontend Development placeholder 3" },
    ],
  },
  "skill-unreal-engine": {
    title: "Unreal Engine",
    meta: "3D & Interactive",
    summary: "Real-time 3D development and interactive experiences.",
    details: ["Applied in game-adjacent and visualization-oriented projects."],
    gallery: [
      { type: "image", src: "/gallery/fillers/filler-01.svg", alt: "Unreal Engine placeholder 1" },
      { type: "image", src: "/gallery/fillers/filler-02.svg", alt: "Unreal Engine placeholder 2" },
      { type: "image", src: "/gallery/fillers/filler-03.svg", alt: "Unreal Engine placeholder 3" },
    ],
  },
  "skill-twinmotion": {
    title: "Twinmotion",
    meta: "3D & VR",
    summary: "High-realism architectural visualization and VR walkthroughs.",
    details: [
      "Built SAJO office VR simulations and environment design work for immersive stakeholder reviews.",
    ],
    gallery: [
      { type: "image", src: "/gallery/fillers/filler-01.svg", alt: "Twinmotion placeholder 1" },
      { type: "image", src: "/gallery/fillers/filler-02.svg", alt: "Twinmotion placeholder 2" },
      { type: "image", src: "/gallery/fillers/filler-03.svg", alt: "Twinmotion placeholder 3" },
    ],
  },
  "skill-unity-3d": {
    title: "Unity 3D",
    meta: "3D & Interactive",
    summary: "3D prototyping and interactive scene development.",
    details: [
      "Delivered first-pass Miami office simulations before migrating final work to Twinmotion.",
    ],
    gallery: [
      { type: "image", src: "/gallery/fillers/filler-01.svg", alt: "Unity 3D placeholder 1" },
      { type: "image", src: "/gallery/fillers/filler-02.svg", alt: "Unity 3D placeholder 2" },
      { type: "image", src: "/gallery/fillers/filler-03.svg", alt: "Unity 3D placeholder 3" },
    ],
  },
  "skill-algorithms": {
    title: "Algorithms",
    meta: "Computer Science",
    summary: "Problem solving with efficient computational approaches.",
    details: ["Core coursework and competition experience including hackathons and math contests."],
    gallery: [
      { type: "image", src: "/gallery/fillers/filler-01.svg", alt: "Algorithms placeholder 1" },
      { type: "image", src: "/gallery/fillers/filler-02.svg", alt: "Algorithms placeholder 2" },
      { type: "image", src: "/gallery/fillers/filler-03.svg", alt: "Algorithms placeholder 3" },
    ],
  },
  "skill-data-structures": {
    title: "Data Structures",
    meta: "Computer Science",
    summary: "Organizing and manipulating data for performant software.",
    details: ["Applied in academic work and technical interview-style project implementation."],
    gallery: [
      { type: "image", src: "/gallery/fillers/filler-01.svg", alt: "Data Structures placeholder 1" },
      { type: "image", src: "/gallery/fillers/filler-02.svg", alt: "Data Structures placeholder 2" },
      { type: "image", src: "/gallery/fillers/filler-03.svg", alt: "Data Structures placeholder 3" },
    ],
  },
  "skill-applied-mathematics": {
    title: "Applied Mathematics",
    meta: "Mathematics",
    summary: "Mathematical modeling and quantitative reasoning for CS applications.",
    details: ["Studied as part of the DEC Computer Science & Mathematics program at Dawson."],
    gallery: [
      { type: "image", src: "/gallery/fillers/filler-01.svg", alt: "Applied Mathematics placeholder 1" },
      { type: "image", src: "/gallery/fillers/filler-02.svg", alt: "Applied Mathematics placeholder 2" },
      { type: "image", src: "/gallery/fillers/filler-03.svg", alt: "Applied Mathematics placeholder 3" },
    ],
  },
  "skill-github-copilot": {
    title: "GitHub Copilot",
    meta: "AI Tools",
    summary: "AI-assisted development for faster prototyping and iteration.",
    details: ["Used to accelerate implementation while maintaining code quality and review discipline."],
    gallery: [
      { type: "image", src: "/gallery/fillers/filler-01.svg", alt: "GitHub Copilot placeholder 1" },
      { type: "image", src: "/gallery/fillers/filler-02.svg", alt: "GitHub Copilot placeholder 2" },
      { type: "image", src: "/gallery/fillers/filler-03.svg", alt: "GitHub Copilot placeholder 3" },
    ],
  },
  "skill-google-ai-studio": {
    title: "Google AI Studio",
    meta: "AI Tools",
    summary: "Prototyping and integrating Gemini-powered application features.",
    details: ["Applied in hackathon projects including Gemini API category work at HackDecouverte."],
    gallery: [
      { type: "image", src: "/gallery/fillers/filler-01.svg", alt: "Google AI Studio placeholder 1" },
      { type: "image", src: "/gallery/fillers/filler-02.svg", alt: "Google AI Studio placeholder 2" },
      { type: "image", src: "/gallery/fillers/filler-03.svg", alt: "Google AI Studio placeholder 3" },
    ],
  },
  "skill-prompt-engineering": {
    title: "Prompt Engineering",
    meta: "AI",
    summary: "Designing effective prompts for reliable model outputs.",
    details: [
      "Used across AI-powered apps to improve response quality, structure, and task completion.",
    ],
    gallery: [
      { type: "image", src: "/gallery/fillers/filler-01.svg", alt: "Prompt Engineering placeholder 1" },
      { type: "image", src: "/gallery/fillers/filler-02.svg", alt: "Prompt Engineering placeholder 2" },
      { type: "image", src: "/gallery/fillers/filler-03.svg", alt: "Prompt Engineering placeholder 3" },
    ],
  },
  "skill-matterport": {
    title: "Matterport",
    meta: "3D Capture",
    summary: "Spatial capture workflows for digital twin and VR pipelines.",
    details: [
      "Performed Matterport scanning on-site for SAJO and related construction capture projects.",
    ],
    gallery: [
      { type: "image", src: "/gallery/fillers/filler-01.svg", alt: "Matterport placeholder 1" },
      { type: "image", src: "/gallery/fillers/filler-02.svg", alt: "Matterport placeholder 2" },
      { type: "image", src: "/gallery/fillers/filler-03.svg", alt: "Matterport placeholder 3" },
    ],
  },
  "skill-vr-prototyping": {
    title: "VR Prototyping",
    meta: "3D & VR",
    summary: "Rapid VR environment builds for review and demonstration.",
    details: [
      "Prototyped walkthrough-ready spaces for Oculus Quest 2 using Twinmotion and captured site data.",
    ],
    gallery: [
      { type: "image", src: "/gallery/fillers/filler-01.svg", alt: "VR Prototyping placeholder 1" },
      { type: "image", src: "/gallery/fillers/filler-02.svg", alt: "VR Prototyping placeholder 2" },
      { type: "image", src: "/gallery/fillers/filler-03.svg", alt: "VR Prototyping placeholder 3" },
    ],
  },
  "skill-3d-environment-design": {
    title: "3D Environment Design",
    meta: "3D & Creative",
    summary: "Environment art and scene composition for games and simulations.",
    details: [
      "Designed eerie Half-Life-inspired environments for LAB_01 and realistic office spaces for SAJO.",
    ],
    gallery: [
      { type: "image", src: "/gallery/fillers/filler-01.svg", alt: "3D Environment Design placeholder 1" },
      { type: "image", src: "/gallery/fillers/filler-02.svg", alt: "3D Environment Design placeholder 2" },
      { type: "image", src: "/gallery/fillers/filler-03.svg", alt: "3D Environment Design placeholder 3" },
    ],
  },
  "skill-roblox-studio": {
    title: "Roblox Studio",
    meta: "3D & Creative",
    summary: "3D modeling and animation for Roblox-based campaign content.",
    details: [
      "Created models, environments, and animations for Maeve Catalog Roblox campaign assets.",
    ],
    gallery: [
      { type: "image", src: "/gallery/fillers/filler-01.svg", alt: "Roblox Studio placeholder 1" },
      { type: "image", src: "/gallery/fillers/filler-02.svg", alt: "Roblox Studio placeholder 2" },
      { type: "image", src: "/gallery/fillers/filler-03.svg", alt: "Roblox Studio placeholder 3" },
    ],
  },
  "skill-data-analysis": {
    title: "Data Analysis",
    meta: "Data",
    summary: "Exploring and interpreting data to support decisions and models.",
    details: [
      "Applied in AI accelerator work including corporate bankruptcy risk prediction.",
    ],
    gallery: [
      { type: "image", src: "/gallery/fillers/filler-01.svg", alt: "Data Analysis placeholder 1" },
      { type: "image", src: "/gallery/fillers/filler-02.svg", alt: "Data Analysis placeholder 2" },
      { type: "image", src: "/gallery/fillers/filler-03.svg", alt: "Data Analysis placeholder 3" },
    ],
  },
  "skill-modern-ai-models": {
    title: "Modern AI Models",
    meta: "AI",
    summary: "Working with contemporary LLM and multimodal AI systems.",
    details: [
      "Integrates modern AI models into user-facing applications and hackathon prototypes.",
    ],
    gallery: [
      { type: "image", src: "/gallery/fillers/filler-01.svg", alt: "Modern AI Models placeholder 1" },
      { type: "image", src: "/gallery/fillers/filler-02.svg", alt: "Modern AI Models placeholder 2" },
      { type: "image", src: "/gallery/fillers/filler-03.svg", alt: "Modern AI Models placeholder 3" },
    ],
  },
  "skill-git": {
    title: "Git",
    meta: "Tooling",
    summary: "Version control for collaborative and solo software development.",
    details: ["Used across all major projects for branching, review, and deployment workflows."],
    gallery: [
      { type: "image", src: "/gallery/fillers/filler-01.svg", alt: "Git placeholder 1" },
      { type: "image", src: "/gallery/fillers/filler-02.svg", alt: "Git placeholder 2" },
      { type: "image", src: "/gallery/fillers/filler-03.svg", alt: "Git placeholder 3" },
    ],
  },
};

export function normalizeHomeDetail(detail) {
  if (!detail) return null;

  let items = detail.items;
  if (!items?.length) {
    items = (detail.details ?? []).map((label) => ({ label }));
  }

  if (detail.team && !items.some((item) => item.label?.startsWith("Team:"))) {
    items = [{ label: `Team: ${detail.team}` }, ...items];
  }

  if (detail.href && !items.some((item) => item.href === detail.href)) {
    items = [
      ...items,
      {
        label: "Related link",
        href: detail.href,
        linkLabel: "Open link",
      },
    ];
  }

  return {
    ...detail,
    items,
    gallery: detail.gallery ?? [],
  };
}

export function getHomeDetail(id) {
  return normalizeHomeDetail(homeDetails[id] ?? null);
}

export function skillDetailId(label) {
  return `skill-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;
}
