import Link from "next/link";
import { achievements } from "../../lib/data";

export const metadata = {
  title: "Achievements - Oliver Massaad",
};

function isExperience(item) {
  return item.victory === false || (item.victory !== true && item.status !== "Certificate");
}

export default function AchievementsPage() {
  const winners = achievements.filter((achievement) => achievement.victory === true);
  const experiences = achievements.filter((achievement) => isExperience(achievement));
  const certificates = achievements.filter((achievement) => achievement.status === "Certificate");

  return (
    <>
      <header className="page-header hero-flat">
        <h1>Achievements</h1>
        <p>Hackathons, competitions, certificates, and milestone recognitions.</p>
      </header>

      <section className="achievement-tracks">
        <section className="achievement-track track-winners">
          <h2>Winner</h2>
          <div className="track-list">
            {winners.map((achievement) => (
              <article key={achievement.slug} className="card achievement-card winner-card ach-fade" data-reveal="bottom">
                <div className="top">
                  <span className="badge badge-winner">Winner</span>
                </div>
                {achievement.date ? (
                  <p className="meta achievement-meta-line">
                    {achievement.date} · {achievement.location}
                  </p>
                ) : null}
                <h2>{achievement.title}</h2>
                <p>{achievement.description}</p>
                {achievement.team ? <p className="meta">Team: {achievement.team}</p> : null}
                <div className="achievement-actions">
                  <Link className="btn btn-secondary btn-pill achievement-btn" href={`/achievements/${achievement.slug}`}>
                    View Details
                  </Link>
                  {achievement.external_url ? (
                    <a className="btn btn-secondary btn-pill achievement-btn" href={achievement.external_url} target="_blank" rel="noopener">
                      Open Link
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="achievement-track track-participants">
          <h2>Experiences</h2>
          <div className="track-list">
            {experiences.map((achievement) => (
              <article key={achievement.slug} className="card achievement-card participant-card ach-fade" data-reveal="bottom">
                <div className="top">
                  <span className="badge">{achievement.status || "Participant"}</span>
                </div>
                {achievement.date ? (
                  <p className="meta achievement-meta-line">
                    {achievement.date} · {achievement.location}
                  </p>
                ) : null}
                <h2>{achievement.title}</h2>
                <p>{achievement.description}</p>
                {achievement.team ? <p className="meta">Team: {achievement.team}</p> : null}
                <div className="achievement-actions">
                  <Link className="btn btn-secondary btn-pill achievement-btn" href={`/achievements/${achievement.slug}`}>
                    View Details
                  </Link>
                  {achievement.external_url ? (
                    <a className="btn btn-secondary btn-pill achievement-btn" href={achievement.external_url} target="_blank" rel="noopener">
                      Open Link
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="achievement-track track-certificates">
          <h2>Certificates</h2>
          <div className="track-list">
            {certificates.map((achievement) => (
              <article key={achievement.slug} className="card achievement-card certificate-card ach-fade" data-reveal="bottom">
                <div className="top">
                  <span className="badge badge-cert">Certificate</span>
                </div>
                {achievement.date ? (
                  <p className="meta achievement-meta-line">
                    {achievement.date} · {achievement.location}
                  </p>
                ) : null}
                <h2>{achievement.title}</h2>
                <p>{achievement.description}</p>
                {achievement.team ? <p className="meta">Team: {achievement.team}</p> : null}
                <div className="achievement-actions">
                  <Link className="btn btn-secondary btn-pill achievement-btn" href={`/achievements/${achievement.slug}`}>
                    View Details
                  </Link>
                  {achievement.external_url ? (
                    <a className="btn btn-secondary btn-pill achievement-btn" href={achievement.external_url} target="_blank" rel="noopener">
                      Open Link
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>
    </>
  );
}
