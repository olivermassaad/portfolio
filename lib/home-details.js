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
      { type: "image", src: "/gallery/nebula-ai-1.png", alt: "Nebula Ai 1" },
      { type: "image", src: "/gallery/nebula-ai-2.png", alt: "Nebula Ai 2" },      
      { type: "image", src: "/gallery/nebula-life-1.png", alt: "Nebula Life 1" },
      { type: "image", src: "/gallery/nebula-life-2.png", alt: "Nebula Life 2" },
      { type: "image", src: "/gallery/dcc-1.jpg", alt: "DCC 1" },
      { type: "image", src: "/gallery/dcc-2.jpg", alt: "DCC 2" },
      { type: "image", src: "/gallery/dcc-3.png", alt: "DCC 3" },      
      { type: "image", src: "/gallery/dcc-4.png", alt: "DCC 4" },
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
      { type: "image", src: "/gallery/rezone-4.jpg", alt: "RE:ZONE 4" },
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
      { type: "image", src: "/gallery/rezone-4.jpg", alt: "RE:ZONE 4" },
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
