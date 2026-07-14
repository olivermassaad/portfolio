import { projects } from "../../lib/data";

export const metadata = {
  title: "Projects - Oliver Massaad",
};

export default function ProjectsPage() {
  return (
    <>
      <header className="page-header hero-flat">
        <h1>Projects</h1>
        <p>AI-powered and full-stack applications from concept to deployment.</p>
      </header>

      <section className="gallery-grid projects-gallery">
        {projects.map((project, index) => (
          <article key={project.name} className="card gallery-item project-item ach-fade" data-reveal="bottom">
            <div className="gallery-head">
              <span className="badge">Project {index + 1}</span>
            </div>
            <h2>{project.name}</h2>
            <p>{project.description}</p>
          </article>
        ))}
      </section>
    </>
  );
}
