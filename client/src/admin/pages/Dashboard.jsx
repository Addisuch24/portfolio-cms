import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import StatCard from "../components/dashboard/StatCard";
import LatestProjects from "../components/dashboard/LatestProjects";
import LatestMessages from "../components/dashboard/LatestMessages";
import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";
import Reveal from "../../components/common/Reveal";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get("/dashboard");
      setDashboard(response.data.data);
    } catch (error) {
      console.error("Dashboard API error:", error);
      const message =
        error.response?.data?.message ||
        error.response?.statusText ||
        error.message ||
        "Failed to load dashboard data";
      setError(message);
      if (error.response?.status === 401) {
        navigate("/admin/login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) return <Loader fullScreen />;
  
  if (error) return <ErrorMessage message={error} onRetry={fetchDashboard} />;

  if (!dashboard) return null;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Reveal transition="up"><h1 className="h3">Dashboard</h1></Reveal>
        <Reveal transition="left" delay={40}><Link to="/admin/profile" className="btn btn-primary"><i className="bi bi-person me-2"></i>My Profile</Link></Reveal>
      </div>

      <div className="row mb-4">
        <Reveal transition="up" delay={40}><StatCard title="Projects" value={dashboard.statistics?.totalProjects || 0} color="primary" icon="folder" /></Reveal>
        <Reveal transition="up" delay={80}><StatCard title="Skills" value={dashboard.statistics?.totalSkills || 0} color="success" icon="star" /></Reveal>
        <Reveal transition="up" delay={120}><StatCard title="Experiences" value={dashboard.statistics?.totalExperiences || 0} color="info" icon="briefcase" /></Reveal>
        <Reveal transition="up" delay={160}><StatCard title="Messages" value={dashboard.statistics?.totalMessages || 0} color="warning" icon="envelope" /></Reveal>
      </div>

      <div className="row g-4">
        <div className="col-lg-6">
          <Reveal transition="up" delay={200}><LatestProjects projects={dashboard.latestProjects || []} /></Reveal>
        </div>
        <div className="col-lg-6">
          <Reveal transition="up" delay={240}><LatestMessages messages={dashboard.latestContacts || []} /></Reveal>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;