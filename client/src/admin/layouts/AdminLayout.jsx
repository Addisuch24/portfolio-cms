import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

function AdminLayout() {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <Header />
        <main className="p-4" style={{ minHeight: 'calc(100vh - 60px)', backgroundColor: '#f8f9fa' }}>
          <div className="container-fluid">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
