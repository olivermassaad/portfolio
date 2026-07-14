import Link from "next/link";
import { notFound } from "next/navigation";
import { achievements, getAchievementBySlug } from "../../../lib/data";

export function generateStaticParams() {
  return achievements.map((item) => ({ slug: item.slug }));
}

export function generateMetadata({ params }) {
  const achievement = getAchievementBySlug(params.slug);
  return {
    title: `${achievement?.title ?? "Achievement"} - Achievement`,
  };
}

export default function AchievementDetailPage({ params }) {
  const achievement = getAchievementBySlug(params.slug);

  if (!achievement) {
    notFound();
  }

  return (
    <>
      <header className="page-header hero-flat">
        <h1>{achievement.title}</h1>
        <p>
          {achievement.date} · {achievement.location}
        </p>
      </header>

      <section className="section span-2 achievement-detail-panel" data-reveal="bottom">
        <div className="achievement-detail-top">
          {achievement.victory === true ? (
            <span className="badge badge-winner">Winner</span>
          ) : achievement.victory === false ? (
            <span className="badge">Participant</span>
          ) : achievement.status === "Certificate" ? (
            <span className="badge badge-cert">Certificate</span>
          ) : (
            <span className="badge">{achievement.status}</span>
          )}
        </div>

        <p className="achievement-detail-summary">{achievement.description}</p>

        {achievement.team ? (
          <p className="achievement-detail-meta">
            <strong>Team:</strong> {achievement.team}
          </p>
        ) : null}

        {achievement.details?.length ? (
          <ul className="achievement-detail-list">
            {achievement.details.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : null}

        <Link href="/achievements" className="btn btn-secondary btn-pill">
          Back to Awards & Certificates
        </Link>
      </section>
    </>
  );
}
