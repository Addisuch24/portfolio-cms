import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { path: "/admin/dashboard", icon: "speedometer2", label: "Dashboard" },
    { path: "/admin/projects", icon: "folder", label: "Projects" },
    { path: "/admin/skills", icon: "star", label: "Skills" },
    { path: "/admin/experiences", icon: "briefcase", label: "Experiences" },
    { path: "/admin/social", icon: "share", label: "Social Links" },
    { path: "/admin/messages", icon: "envelope", label: "Messages" },
    { path: "/admin/profile", icon: "person", label: "Profile" },
    { path: "/admin/change-password", icon: "key", label: "Change Password" },
  ];

  return (
    <div className="sidebar text-white">
      <div className="text-center py-4 px-3">
        <div className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3" style={{ width: '48px', height: '48px', background: 'linear-gradient(135deg, #2563eb, #7c3aed)' }}>
          <i className="bi bi-columns-gap fs-4"></i>
        </div>
        <h4 className="brand text-white mb-0">Portfolio CMS</h4>
        <p className="small mb-0 text-white-50">Admin Console</p>
      </div>
      <nav className="mt-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path || location.pathname.startsWith(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`d-flex align-items-center text-white text-decoration-none ${isActive ? 'active' : ''}`}
            >
              <i className={`bi bi-${item.icon} me-2`}></i>
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export default Sidebar;