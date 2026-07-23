import AchievementsBoard from "../../components/achievements-board";

export const metadata = {
  title: "Achievements - Oliver Massaad",
};

export default function AchievementsPage() {
  return (
    <>
      <header className="page-header hero-flat">
        <h1>Achievements</h1>
        <p>Hackathons, competitions, certificates, and milestone recognitions.</p>
      </header>

      <AchievementsBoard />
    </>
  );
}
