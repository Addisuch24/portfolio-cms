import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <nav className="navbar bg-white shadow-sm px-4" style={{ height: '72px', borderBottom: '1px solid #e5e7eb' }}>
      <div className="d-flex justify-content-between align-items-center w-100">
        <div>
          <h5 className="mb-0 fw-bold text-dark">Admin Dashboard</h5>
          <small className="text-muted">Manage your portfolio content with ease</small>
        </div>
        <div className="d-flex align-items-center gap-3">
          <div className="d-flex align-items-center gap-2 px-3 py-2 rounded-pill bg-light">
            <i className="bi bi-person-circle text-primary"></i>
            <span className="text-muted small">{user?.email || 'Admin'}</span>
          </div>
          <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
            <i className="bi bi-box-arrow-right me-2"></i>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Header;