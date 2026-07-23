import { getAchievementBySlug } from "./data";

/**
 * Expanded modal content format:
 * - title, meta, summary, badge (optional)
 * - items: [{ label, href?, linkLabel? }]
 * - gallery: [{ type: "image" | "video", src, alt?, poster? }]
 * Legacy `details: [".."]` still works and is auto-converted to items.
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
    summary: "2nd-year DEC student in Computer Science & Mathematics",
    details: [
      "Pursuing a DEC in Computer Science & Mathematics at Dawson College",
      "Coursework spans algorithms, data structures, applied mathematics, and software engineering",
      "Balances academics with internships, hackathons, and independent technical projects",
    ],
    gallery: [
      { type: "image", src: "/gallery/dawson-college.jpg", alt: "Dawson College" },
      { type: "image", src: "/gallery/college-stanislas.jpg", alt: "Stanislas College" },
      { type: "image", src: "/gallery/concordia-university.jpg", alt: "Concordia University" },
    ],
  },
  "profile-developer": {
    title: "Developer",
    meta: "Full-stack · Python & JavaScript",
    summary: "Full-stack developer and software engineer across web, AI, and interactive 3D projects",
    details: [
      "Builds end-to-end applications with React frontends and Python backends",
      "Ships AI-integrated products from concept through deployment and iteration",
      "Recent work includes productivity tools, hackathon platforms, and internal tooling for enterprise teams",
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
    summary: "Creator and maintainer of multiple independent software projects",
    details: [
      "Founded and maintains several personal and team-driven software products",
      "Co-founded the Dawson Coding Club, a student-led technical organization",
      "Scaled club interest to 70+ members through outreach, events, and project-led sessions",
    ],
    gallery: [
      { type: "image", src: "/gallery/nebula-ai-1.png", alt: "Nebula AI title screen" },
      { type: "image", src: "/gallery/nebula-life-1.png", alt: "Nebula Life title screen" },
      { type: "image", src: "/gallery/nook-5.png", alt: "Nebula Nook title screen" },
      { type: "image", src: "/gallery/lazy-dawg-4.png", alt: "Lazy Dawg title screen" },
      { type: "image", src: "/gallery/cooked-1.png", alt: "Cooked title screen" },
      { type: "image", src: "/gallery/dcc-2.jpg", alt: "Dawson Coding Club logo" },
    ],
  },
  "profile-vr-intern": {
    title: "VR Modeling Intern",
    meta: "SAJO · Technology & Innovation · 2023–2025",
    summary: "Technology and Innovation intern for two years at SAJO",
    details: [
      "Built VR-ready office simulations in Twinmotion for Miami and Montreal spaces",
      "Performed LiDAR and Matterport scanning workflows for on-site capture projects",
      "Contributed to AstraIPT website layout, logic, and backend architecture",
      "Delivered high-realism environments for Oculus Quest 2 walkthroughs and stakeholder reviews",
    ],
    gallery: [
      { type: "image", src: "/gallery/SAJO-1.jpg", alt: "SAJO 1" },
      { type: "image", src: "/gallery/miami-office-old-2.png", alt: "SAJO Miami office VR simulation 2" },
      { type: "image", src: "/gallery/miami-office-old-1.png", alt: "SAJO Miami office VR simulation 1" },
      { type: "image", src: "/gallery/miami-office-old-3.png", alt: "SAJO Miami office VR simulation 3" },
    ],
  },
  "profile-technologist-intern": {
    title: "Technologist Intern",
    meta: "Morgan Stanley · IST · 2026",
    summary: "IST Technology intern at Morgan Stanley",
    details: [
      "Supporting technology and innovation work within Morgan Stanley's IST organization",
      "Applying full-stack development skills in a large-scale financial technology environment",
      "Collaborating with engineering teams on practical tooling, workflows, and delivery",
    ],
    gallery: [
      { type: "image", src: "/gallery/morgan-stanley-1.jpg", alt: "Morgan Stanley 1" },
      { type: "image", src: "/gallery/spring-boot.png", alt: "Spring Boot" },
      { type: "image", src: "/gallery/JUnit5.png", alt: "JUnit5" },
      { type: "image", src: "/gallery/WireMock.png", alt: "WireMock" },
    ],
  },
  "profile-musician": {
    title: "Musician",
    meta: "Piano · Guitar · RE:ZONE",
    summary: "Guitarist, Pianist since the age of 5, keyboardist of the band RE:ZONE",
    details: [
      "Pianist and composer for 13 years",
      "Keyboardist for the band RE:ZONE",
      "Former keyboardist of PinkEye; background in performance, arrangement, and composition",
      "Hosts and presents on student radio through RadioStan and related media projects",
    ],
    gallery: [
      { type: "image", src: "/gallery/rezone-1.jpg", alt: "RE:ZONE 1" },
      { type: "image", src: "/gallery/rezone-2.png", alt: "RE:ZONE 2" },
      { type: "image", src: "/gallery/rezone-3.jpg", alt: "RE:ZONE 3" },
    ],
  },
  "education-dawson": {
    title: "DEC Computer Science & Mathematics",
    meta: "Dawson College · 2024–2026",
    summary: "Undergraduate college program combining computer science and mathematics",
    details: [
      "Focused on software development, discrete mathematics, and applied problem solving",
      "Active in hackathons, clubs, and internship work alongside coursework",
      "Building a foundation for full-stack engineering and AI-integrated product development",
    ],
    gallery: [
      { type: "image", src: "/gallery/DEC-1.jpg", alt: "Dawson College 1" },
    ],
  },
  "education-stanislas": {
    title: "High School Diploma — Highest Honors",
    meta: "Stanislas College, Outremont · 2013–2024",
    summary: "Completed secondary studies with highest honors",
    details: [
      "Graduated with highest honors from Stanislas College in Outremont",
      "Developed early interests in mathematics, science, and creative technology",
      "Participated in radio, media, and extracurricular leadership activities",
    ],
    gallery: [
      { type: "image", src: "/gallery/stanislas-1.jpg", alt: "Stanislas College 1" },
    ],
  },
  "experience-sajo": {
    title: "Innovation & Technology Intern",
    meta: "SAJO (International General Contractor) · 2023–2025",
    summary: "Two-year internship in SAJO's Technology and Innovation department",
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
      { type: "image", src: "/gallery/SAJO-1.jpg", alt: "SAJO 1" },
      { type: "image", src: "/gallery/miami-office-old-2.png", alt: "SAJO Miami office VR simulation 2" },
      { type: "image", src: "/gallery/miami-office-old-1.png", alt: "SAJO Miami office VR simulation 1" },
      { type: "image", src: "/gallery/miami-office-old-3.png", alt: "SAJO Miami office VR simulation 3" },
    ],
  },
  "experience-morgan-stanley": {
    title: "Technologist IST Intern",
    meta: "Morgan Stanley · 2026",
    summary: "IST technology internship at Morgan Stanley",
    details: [
      "Working within Morgan Stanley's IST organization on technology-driven initiatives",
      "Applying software engineering skills in enterprise-scale environments",
      "Contributing to delivery, tooling, and cross-team technical collaboration",
    ],
    gallery: [
      { type: "image", src: "/gallery/morgan-stanley-1.jpg", alt: "Morgan Stanley 1" },
      { type: "image", src: "/gallery/spring-boot.png", alt: "Spring Boot" },
      { type: "image", src: "/gallery/JUnit5.png", alt: "JUnit5" },
      { type: "image", src: "/gallery/WireMock.png", alt: "WireMock" },
    ],
  },
  "volunteer-shine-the-light": {
    ...withTeam(fromAchievement("shine-the-light-volunteer")),
    gallery: [
      { type: "image", src: "/gallery/shine-the-light.jpg", alt: "Shine the Light" },
    ],
  },
  "volunteer-radiostan": {
    title: "Mission Bon Accueil",
    meta: "Volunteer · Providing food for dog shelters",
    summary:
      "Volunteered with Mission Bon Accueil to help prepare and provide food support for dog shelters",
    details: [
      "Assisted with food-related volunteer work supporting local dog shelters",
      "Helped with packing, organizing, and preparing donations for distribution",
      "Contributed time to community animal-welfare efforts alongside other volunteer activities",
      "Gained experience collaborating in a service-focused team environment",
    ],
    gallery: [
      { type: "image", src: "/gallery/mission-bon-accueil-1.png", alt: "Mission Bon Accueil 1" },
      { type: "image", src: "/gallery/mission-bon-accueil-2.jpg", alt: "Mission Bon Accueil 2" },
      { type: "image", src: "/gallery/mission-bon-accueil-3.jpg", alt: "Mission Bon Accueil 3" },
    ],
  },
  "volunteer-podcast": {
    title: "RadioStan Host & Presenter",
    meta: "Student radio broadcast",
    summary: "Host and presenter for student radio programming at RadioStan",
    details: [
      "Hosts and presents segments for student radio broadcasts",
      "Prepares research, scripts, and on-air delivery for educational and interview content",
      "Collaborates on episodes covering science, community, and current topics",
      "Co-hosted exclusive interviews with diplomatic and scientific guests on Radio Web Stanislas",
    ],
    href: "https://www.plusieurscordesasavoix.com/",
    gallery: [
      { type: "image", src: "/gallery/radio-stan-1.jpg", alt: "RadioStan 1" },
      { type: "image", src: "/gallery/radio-stan-2.jpg", alt: "RadioStan 2" },
      { type: "image", src: "/gallery/radio-stan-3.jpg", alt: "RadioStan 3" },
    ],
  },
  "volunteer-sports": {
    title: "Soccer & Karate",
    meta: "Former soccer player and karate competitor",
    summary:
      "Spent years in soccer and karate — one built for teamwork and match pressure, the other for focus, form, and competitive discipline",
    details: [
      "Played soccer through school and extracurricular teams, training technical skills, positioning, and match readiness",
      "Competed in team sessions that demanded quick decisions, clear communication, and accountability to a shared goal",
      "Practiced and competed in karate with emphasis on technique, kata, and controlled sparring",
      "Built resilience and consistency through regular athletic practice across both sports",
      "Carried those habits into academics and creative work: staying calm under pressure, improving one detail at a time, and showing up prepared",
      "Balanced athletics alongside music, academics, and other extracurricular commitments",
    ],
    gallery: [
      { type: "image", src: "/gallery/soccer-1.jpg", alt: "Soccer 1" },
      { type: "image", src: "/gallery/karate-1.jpg", alt: "Karate 1" },
    ],
  },
  "volunteer-rezone": {
    title: "RE:ZONE",
    meta: "Keyboardist for a J-Rock band",
    summary:
      "Keyboardist for RE:ZONE, a J-Rock band — contributing live performance, arrangement, and collaborative music-making",
    details: [
      "Played keys for RE:ZONE in rehearsals and live settings, supporting arrangements and stage performance",
      "Shaped parts around a J-Rock sound using years of piano and composition experience (pianist since age 5)",
      "Collaborated with bandmates on timing, dynamics, and song structure across practice and performance",
      "Brought prior band experience as former keyboardist of PinkEye into a tighter ensemble role",
      "Balanced music alongside academics, development work, and other creative projects",
    ],
    gallery: [
      { type: "image", src: "/gallery/rezone-1.jpg", alt: "RE:ZONE 1" },
      { type: "image", src: "/gallery/rezone-2.png", alt: "RE:ZONE 2" },
      { type: "image", src: "/gallery/rezone-3.jpg", alt: "RE:ZONE 3" },
    ],
  },
  "award-conuhacks-x": {
    ...fromAchievement("conuhacks-x-2026"),
    gallery: [
      { type: "image", src: "/gallery/conuhacks-1.jpg", alt: "ConUHacks X 1" },
      { type: "image", src: "/gallery/conuhacks-2.jpg", alt: "ConUHacks X 2" },
      { type: "image", src: "/gallery/conuhacks-3.jpg", alt: "ConUHacks X 3" },
    ],
  },
  "award-aerohacks": {
    ...fromAchievement("aerohacks-2026"),
    gallery: [
      { type: "image", src: "/gallery/aerohacks-1.jpg", alt: "AeroHacks 1" },
      { type: "image", src: "/gallery/aerohacks-2.jpg", alt: "AeroHacks 2" },
      { type: "image", src: "/gallery/aerohacks-3.jpg", alt: "AeroHacks 3" },
    ],
  },
  "award-athacks": {
    ...fromAchievement("athacks-2026"),
    gallery: [
      { type: "image", src: "/gallery/athacks-3.jpg", alt: "AtHacks 3" },
      { type: "image", src: "/gallery/athacks-1.jpg", alt: "AtHacks 1" },
      { type: "image", src: "/gallery/athacks-2.jpg", alt: "AtHacks 2" },
    ],
  },
  "award-hackdecouverte": {
    ...fromAchievement("hackdecouverte-2025"),
    gallery: [
      { type: "image", src: "/gallery/hackdecouverte-1.jpg", alt: "HackDécouverte 1" },
      { type: "image", src: "/gallery/hackdecouverte-2.jpg", alt: "HackDécouverte 2" },
      { type: "image", src: "/gallery/hackdecouverte-3.jpg", alt: "HackDécouverte 3" },
    ],
  },
  "award-dialogue": {
    ...fromAchievement("dialogue-2026"),
    gallery: [
      { type: "image", src: "/gallery/dialogue-1.jpg", alt: "Dialogue 1" },
      { type: "image", src: "/gallery/dialogue-2.jpg", alt: "Dialogue 2" },
      { type: "image", src: "/gallery/dialogue-3.jpg", alt: "Dialogue 3" },
    ],
  },
  "achievement-mpc-hacks-2026": {
    ...fromAchievement("mpc-hacks-2026"),
    gallery: [
      { type: "image", src: "/gallery/mpc-hacks-4.jpg", alt: "MPC Hacks 4" },
      { type: "image", src: "/gallery/mpc-hacks-1.jpg", alt: "MPC Hacks 1" },
      { type: "image", src: "/gallery/mpc-hacks-3.jpg", alt: "MPC Hacks 3" },
      { type: "image", src: "/gallery/mpc-hacks-2.jpg", alt: "MPC Hacks 2" },
    ],
  },
  "achievement-vanierhacks-2026": {
    ...fromAchievement("vanierhacks-2026"),
    gallery: [
      { type: "image", src: "/gallery/vanier-hacks-1.png", alt: "VanierHacks placeholder 1" },
      { type: "image", src: "/gallery/vanier-hacks-2.jpg", alt: "VanierHacks placeholder 2" },
      { type: "image", src: "/gallery/vanier-hacks-3.png", alt: "VanierHacks placeholder 3" },
      { type: "image", src: "/gallery/vanier-hacks-4.png", alt: "VanierHacks placeholder 4" },
    ],
  },
  "achievement-science-on-tourne-2025": {
    ...fromAchievement("science-on-tourne-2025"),
    gallery: [
      { type: "image", src: "/gallery/sot-1.png", alt: "Science On Tourne project 1" },
      { type: "image", src: "/gallery/sot-2.png", alt: "Science On Tourne project 2" },
      { type: "image", src: "/gallery/sot-3.png", alt: "Science On Tourne project 3" },
      { type: "image", src: "/gallery/sot-4.png", alt: "Science On Tourne project 4" },
      { type: "image", src: "/gallery/sot-5.jpg", alt: "Science On Tourne project 5" },
    ],
  },
  "achievement-lab-01-dev-team-2024": {
    ...fromAchievement("lab-01-dev-team-2024"),
    gallery: [
      { type: "image", src: "/gallery/lab01-2.jpg" },
      { type: "video", src: "/gallery/lab01-1.mp4" },
    ],
  },
  "achievement-ai-accelerator-certificate": {
    ...fromAchievement("ai-accelerator-certificate"),
    gallery: [
      { type: "image", src: "/gallery/aia-1.png", alt: "AI Accelerator Program" },
    ],
  },
  "achievement-pinkeye-band-member-2025": {
    ...fromAchievement("pinkeye-band-member-2025"),
    gallery: [
      { type: "image", src: "/gallery/fillers/filler-01.svg", alt: "PinkEye placeholder 1" },
      { type: "image", src: "/gallery/fillers/filler-02.svg", alt: "PinkEye placeholder 2" },
      { type: "image", src: "/gallery/fillers/filler-03.svg", alt: "PinkEye placeholder 3" },
    ],
  },
  "achievement-dawson-music-club": {
    ...fromAchievement("dawson-music-club"),
    gallery: [
      { type: "image", src: "/gallery/dawson-music-club-1.png", alt: "Dawson Music Club 1" },
      { type: "video", src: "/gallery/dawson-music-club-2.mov" },
    ],
  },
  "achievement-dawson-coding-club-founder": {
    ...fromAchievement("dawson-coding-club-founder"),
    gallery: [
      { type: "image", src: "/gallery/dcc-1.jpg", alt: "Dawson Coding Club 1" },
      { type: "image", src: "/gallery/dcc-2.jpg", alt: "Dawson Coding Club 2" },
      { type: "image", src: "/gallery/dcc-3.png", alt: "Dawson Coding Club 3" },
      { type: "image", src: "/gallery/dcc-4.png", alt: "Dawson Coding Club 4" },
    ],
  },
  "achievement-dawson-blue-ring-society": {
    ...fromAchievement("dawson-blue-ring-society"),
    gallery: [
      { type: "image", src: "/gallery/dawson-college.jpg", alt: "Dawson Blue Ring Society" },
    ],
  },
  "achievement-interview-sfeir-imbeau-2024": {
    ...fromAchievement("interview-sfeir-imbeau-2024"),
    gallery: [
      { type: "image", src: "/gallery/radio-stan-1.jpg", alt: "RadioStan interview recording" },
      { type: "image", src: "/gallery/radio-stan-2.jpg", alt: "Radio Web Stanislas studio" },
    ],
  },
  "achievement-interview-graphene-2023": {
    ...fromAchievement("interview-graphene-2023"),
    gallery: [
      { type: "image", src: "/gallery/radio-stan-3.jpg", alt: "RadioStan science interview" },
    ],
  },
  "achievement-episode-fusion-nucleaire-2023": {
    ...fromAchievement("episode-fusion-nucleaire-2023"),
    gallery: [
      { type: "image", src: "/gallery/radio-stan-2.jpg", alt: "RadioStan fusion episode" },
    ],
  },
  "achievement-concours-castor-2022": {
    ...fromAchievement("concours-castor-2022"),
    gallery: [
      { type: "image", src: "/gallery/fillers/filler-01.svg", alt: "Concours Castor placeholder 1" },
      { type: "image", src: "/gallery/fillers/filler-02.svg", alt: "Concours Castor placeholder 2" },
      { type: "image", src: "/gallery/fillers/filler-03.svg", alt: "Concours Castor placeholder 3" },
    ],
  },
  "project-nebula-ai": {
    title: "Nebula AI",
    meta: "AI application · Full-stack",
    summary:
      "Designed and developed an AI-powered application, working across backend logic and frontend interfaces to bring intelligent features to everyday use",
    details: [
      "Built end-to-end with a React frontend and Python backend",
      "Integrated modern AI models to power the app's core features",
      "Owned both backend logic and frontend interface work from concept through iteration",
    ],
    gallery: [
      { type: "image", src: "/gallery/nebula-ai-1.png", alt: "Nebula AI 1" },
      { type: "image", src: "/gallery/nebula-ai-2.png", alt: "Nebula AI 2" },
      { type: "image", src: "/gallery/nebula-ai-3.png", alt: "Nebula AI 3" },
      { type: "image", src: "/gallery/nebula-ai-4.png", alt: "Nebula AI 4" },
      { type: "image", src: "/gallery/nebula-ai-5.png", alt: "Nebula AI 5" },
      { type: "image", src: "/gallery/nebula-ai-6.png", alt: "Nebula AI 6" },
      { type: "image", src: "/gallery/nebula-ai-7.png", alt: "Nebula AI 7" },
    ],
  },
  "project-nebula-life": {
    title: "Nebula Life",
    meta: "Daily-life productivity app · Full-stack",
    summary:
      "Built a daily-life productivity application focused on a clean user experience, spanning backend logic and frontend interfaces",
    details: [
      "Designed a clean, focused user experience for everyday productivity",
      "Developed across the stack, from backend logic to frontend interfaces",
      "Iterated on features to keep the app simple and practical for daily use",
    ],
    gallery: [
      { type: "image", src: "/gallery/nebula-life-1.png", alt: "Nebula Life 1" },
      { type: "image", src: "/gallery/nebula-life-2.png", alt: "Nebula Life 2" },
      { type: "image", src: "/gallery/nebula-life-3.png", alt: "Nebula Life 3" },
      { type: "image", src: "/gallery/nebula-life-4.png", alt: "Nebula Life 4" },
      { type: "image", src: "/gallery/nebula-life-5.png", alt: "Nebula Life 5" },
      { type: "image", src: "/gallery/nebula-life-6.png", alt: "Nebula Life 6" },
      { type: "image", src: "/gallery/nebula-life-7.png", alt: "Nebula Life 7" },

    ],
  },
  "project-nook": {
    title: "Nebula Nook",
    meta: "Desktop companion · Tauri 2.0 · React & Rust",
    summary:
      "A lightweight floating desktop companion designed to run quietly in the background while gaming or working",
    details: [
      "Transparent, frameless overlay with dragging, always-on-top controls, and a system tray",
      "Animated companion states including idle, sleeping, wandering, and interacting",
      "Designed for future private, on-device face and gaze tracking with MediaPipe",
    ],
    gallery: [
      { type: "image", src: "/gallery/nook-5.png", alt: "Nook 5" },
      { type: "image", src: "/gallery/nook-1.png", alt: "Nook 1" },
      { type: "image", src: "/gallery/nook-2.png", alt: "Nook 2" },
      { type: "image", src: "/gallery/nook-3.png", alt: "Nook 3" },
      { type: "image", src: "/gallery/nook-4.png", alt: "Nook 4" },
      { type: "image", src: "/gallery/nook-6.png", alt: "Nook 6" },      
    ],
  },
  "project-lazy-dawg": {
    title: "Lazy Dawg",
    meta: "24/7 YouTube radio · 2023",
    summary:
      "Built a 24/7 YouTube radio station in 2023 with an animated pixel-art visual style, inspired by the always-on lofi format",
    details: [
      "Ran a continuous 24/7 stream inspired by the always-on lofi radio format",
      "Created an animated pixel-art visual style for the broadcast",
      "Set up the streaming pipeline to keep the station live around the clock",
    ],
    gallery: [
      { type: "image", src: "/gallery/lazy-dawg-5.png", alt: "Lazy Dawg 5" },
      { type: "video", src: "/gallery/lazy-dawg-3.mp4" },
      { type: "video", src: "/gallery/lazy-dawg-2.mp4" },
      { type: "image", src: "/gallery/lazy-dawg-1.png", alt: "Lazy Dawg 1" },
      { type: "image", src: "/gallery/lazy-dawg-4.png", alt: "Lazy Dawg 4" },
    ],
  },
  "project-sajo-miami-vr": {
    title: "SAJO Miami Office VR Simulation",
    meta: "SAJO · Twinmotion · Oculus Quest 2",
    summary:
      "Recreated SAJO's Miami office as a high-realism Twinmotion environment for VR walkthroughs, including custom textures, maps, and exterior reconstruction",
    details: [
      "Built a high-realism Twinmotion environment of the Miami office for VR walkthroughs",
      "Created custom textures and maps to raise visual fidelity",
      "Reconstructed the exterior using Google Maps references and custom 3D models",
      "Delivered the experience for Oculus Quest 2 stakeholder walkthroughs",
    ],
    gallery: [
      { type: "image", src: "/gallery/miami-office-old-2.png", alt: "SAJO Miami office VR simulation 2" },
      { type: "image", src: "/gallery/miami-office-old-1.png", alt: "SAJO Miami office VR simulation 1" },
      { type: "image", src: "/gallery/miami-office-old-3.png", alt: "SAJO Miami office VR simulation 3" },
    ],
  },
  "project-sajo-miami-prototype": {
    title: "SAJO Miami Office Prototype",
    meta: "SAJO · Unity 3D",
    summary:
      "Delivered a first-pass Miami office simulation in Unity 3D before migrating the final experience to Twinmotion",
    details: [
      "Built an early Unity 3D prototype of the Miami office simulation",
      "Validated layout and interaction ideas before the final build",
      "Informed the migration of the final experience to Twinmotion",
    ],
    gallery: [
      { type: "image", src: "/gallery/miami-office-unity-1.png", alt: "SAJO Miami office prototype 1" },
      { type: "image", src: "/gallery/miami-office-unity-2.png", alt: "SAJO Miami office prototype 2" },
      { type: "image", src: "/gallery/miami-office-unity-3.png", alt: "SAJO Miami office prototype 3" },    ],
  },
  "project-sajo-montreal-vr": {
    title: "SAJO Montreal Office VR Simulation",
    meta: "SAJO · Twinmotion",
    summary:
      "Developed a full Twinmotion-based virtual office simulation for SAJO's Montreal office to support immersive stakeholder walkthroughs",
    details: [
      "Built a full Twinmotion virtual simulation of the Montreal office",
      "Supported immersive stakeholder walkthroughs of the space",
      "Focused on realistic environments to aid planning and review",
    ],
    gallery: [
      { type: "image", src: "/gallery/montreal-office-1.png", alt: "SAJO Montreal office 1" },      
      { type: "image", src: "/gallery/montreal-office-2.png", alt: "SAJO Montreal office 2" },      
      { type: "image", src: "/gallery/montreal-office-3.png", alt: "SAJO Montreal office 3" },          ],
  },
  "project-harden-laval": {
    title: "Harden Laval Rooftop LiDAR + Matterport Scan",
    meta: "SAJO · LiDAR · Matterport",
    summary:
      "Performed on-site rooftop capture work for Harden Laval using LiDAR and Matterport scanning workflows to support planning and modeling",
    details: [
      "Carried out on-site rooftop capture at the Harden Laval location",
      "Used LiDAR and Matterport scanning workflows for accurate site data",
      "Supported downstream planning and modeling with the captured scans",
    ],
    gallery: [
      { type: "image", src: "/gallery/harden-1.png", alt: "Harden Laval scan 1" },
      { type: "image", src: "/gallery/harden-2.png", alt: "Harden Laval scan 2" },
    ],
  },
  "project-astraipt": {
    title: "AstraIPT",
    meta: "SAJO · Technology & Innovation · Web",
    summary:
      "Contributed to layout, logic, and backend architecture for AstraIPT, a website for SAJO's Technology and Innovation department",
    details: [
      "Contributed to the site layout and frontend structure",
      "Worked on application logic and backend architecture",
      "Built for SAJO's Technology and Innovation department",
      "Details and information are classified"
    ],
    gallery: [
      { type: "image", src: "/gallery/astra-ipt.png", alt: "AstraIPT" },
    ],
  },
  "project-maeve-cherry-blossom": {
    title: "Maeve Catalog · Cherry Blossom",
    meta: "Roblox · 3D & animation",
    summary:
      "Built a cherry blossom themed Roblox scene with custom 3D models, environment, and animation for ad-style content featuring Maeve Catalog outfits",
    details: [
      "Modeled a cherry blossom themed environment for ad-style Roblox content",
      "Animated the scene featuring characters wearing Maeve Catalog outfits",
      "Produced campaign assets tailored to the Roblox platform",
    ],
    gallery: [
      { type: "video", src: "/gallery/cherry-blossom-2.mp4" },
      { type: "image", src: "/gallery/cherry-blossom-3.png", alt: "Maeve Catalog Cherry Blossom 3" },
    ],
  },
  "project-maeve-amethyst": {
    title: "Maeve Catalog · Amethyst Cave",
    meta: "Roblox · 3D & animation",
    summary:
      "Built an amethyst cave themed Roblox scene with custom 3D models, environment, and animation for ad-style content featuring Maeve Catalog outfits",
    details: [
      "Modeled an amethyst cave themed environment for ad-style Roblox content",
      "Animated the scene featuring characters wearing Maeve Catalog outfits",
      "Produced campaign assets tailored to the Roblox platform",
    ],
    gallery: [
      { type: "video", src: "/gallery/amethyst-2.mp4" },
      { type: "image", src: "/gallery/amethyst-3.png", alt: "Maeve Catalog Amethyst Cave 3" },
    ],
  },
  "project-maeve-beach": {
    title: "Maeve Catalog · Beach",
    meta: "Roblox · 3D & animation",
    summary:
      "Built a beach themed Roblox scene with custom 3D models, environment, and animation for ad-style content featuring Maeve Catalog outfits",
    details: [
      "Modeled a beach themed environment for ad-style Roblox content",
      "Animated the scene featuring characters wearing Maeve Catalog outfits",
      "Produced campaign assets tailored to the Roblox platform",
    ],
    gallery: [
      { type: "video", src: "/gallery/beach-2.mp4" },
      { type: "image", src: "/gallery/beach-3.png", alt: "Maeve Catalog Beach 3" },
    ],
  },
  "project-cooked": {
    title: "Cooked",
    meta: "Brutal accountability · Next.js · Gemini · Firebase",
    summary:
      "A dark, brutally honest accountability app for people tired of soft productivity tools. Cooked exposes self-sabotage by turning habits, failures, and wasted time into unavoidable evidence of where the user's current trajectory leads.",
    details: [
      "A seven-day trajectory meter makes repeated failures visibly degrade the interface",
      "Bad-habit logging requires a written explanation instead of a frictionless checkbox",
      "Gemini delivers short, clinical reality checks based on the user's actual behavior",
      "A compound-failure calculator reveals the long-term cost of wasted time",
    ],
    gallery: [
      { type: "image", src: "/gallery/cooked-1.png", alt: "Cooked 1" },
      { type: "image", src: "/gallery/cooked-2.png", alt: "Cooked 2" },
      { type: "image", src: "/gallery/cooked-3.png", alt: "Cooked 3" },
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

/** Prefer shared homepage detail IDs when an achievement matches one. */
const achievementDetailAliases = {
  "conuhacks-x-2026": "award-conuhacks-x",
  "athacks-2026": "award-athacks",
  "dialogue-2026": "award-dialogue",
  "aerohacks-2026": "award-aerohacks",
  "hackdecouverte-2025": "award-hackdecouverte",
  "shine-the-light-volunteer": "volunteer-shine-the-light",
};

export function detailIdForAchievement(slug) {
  return achievementDetailAliases[slug] ?? `achievement-${slug}`;
}

export function getHomeDetail(id) {
  if (!id) return null;

  if (homeDetails[id]) {
    return normalizeHomeDetail(homeDetails[id]);
  }

  const mappedId = achievementDetailAliases[id];
  if (mappedId && homeDetails[mappedId]) {
    return normalizeHomeDetail(homeDetails[mappedId]);
  }

  if (id.startsWith("achievement-")) {
    const slug = id.slice("achievement-".length);
    return normalizeHomeDetail(fromAchievement(slug));
  }

  return null;
}

export function skillDetailId(label) {
  return `skill-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;
}
