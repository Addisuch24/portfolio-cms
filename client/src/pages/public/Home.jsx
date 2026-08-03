import { useEffect, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import Hero from "../../components/Home/Hero";
import About from "../../components/Home/About";
import Skills from "../../components/Home/Skills";
import ProfessionalSkills from "../../components/Home/ProfessionalSkills";
import Projects from "../../components/Home/Projects";
import Experience from "../../components/Home/Experience";
import Contact from "../../components/Home/Contact";
import Footer from "../../components/layout/Footer";
import publicService from "../../services/publicService";
import Reveal from "../../components/common/Reveal";

function Home() {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [professionalSkills, setProfessionalSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, projectsRes, skillsRes, professionalSkillsRes, experiencesRes] = await Promise.all([
          publicService.getProfile(),
          publicService.getProjects(),
          publicService.getSkills(),
          publicService.getProfessionalSkills(),
          publicService.getExperiences()
        ]);

        console.log("Profile Response:", profileRes.data);
        console.log("Projects Response:", projectsRes.data);
        console.log("Skills Response:", skillsRes.data);
        console.log("Professional Skills Response:", professionalSkillsRes.data);
        console.log("Experiences Response:", experiencesRes.data);

        setProfile(profileRes.data.data);
        setProjects(projectsRes.data.data);
        setSkills(skillsRes.data.data);
        setProfessionalSkills(professionalSkillsRes.data.data);
        setExperiences(experiencesRes.data.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        console.error("Error response:", error.response?.data);
        setError(error.message + " - Check console for details");
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const handleScroll = () => setShowBackToTop(window.scrollY > 480);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (loading) {
    return <div style={{ padding: "20px", textAlign: "center" }}>Loading...</div>;
  }

  if (error) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>Error Loading Data</h2>
        <p>{error}</p>
        <p>Make sure:</p>
        <ul style={{ textAlign: "left", maxWidth: "600px", margin: "0 auto" }}>
          <li>Backend server is running on http://localhost:5000</li>
          <li>Database is set up and has data (run schema.sql and seed.sql)</li>
          <li>Check browser console for detailed error</li>
        </ul>
      </div>
    );
  }

  if (!profile) {
    return <div style={{ padding: "20px", textAlign: "center" }}>No profile data found. Please add data to your database.</div>;
  }

  return (
    <>
      <Navbar />

      <main>
        <Reveal transition="up"><Hero profile={profile} /></Reveal>
        <Reveal transition="up" delay={60}><About profile={profile} /></Reveal>
        <Skills skills={skills} />
        <ProfessionalSkills professionalSkills={professionalSkills} />
        <Reveal transition="up" delay={100}><Projects projects={projects} /></Reveal>
        <Reveal transition="up" delay={120}><Experience experiences={experiences} /></Reveal>
        <Reveal transition="up" delay={140}><Contact /></Reveal>
      </main>

      <Reveal transition="up" delay={160}><Footer /></Reveal>

      <button
        className={`btn btn-primary back-to-top ${showBackToTop ? "show" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
      >
        <i className="bi bi-arrow-up"></i>
      </button>
    </>
  );
}

export default Home;