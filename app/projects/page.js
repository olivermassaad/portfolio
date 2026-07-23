import ProjectsBoard from "../../components/projects-board";

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

      <ProjectsBoard />
    </>
  );
}
