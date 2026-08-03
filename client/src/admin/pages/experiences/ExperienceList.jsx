import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import experienceService from "../../services/experienceService";
import DataTable from "../../../components/common/DataTable";
import SearchBar from "../../../components/common/SearchBar";
import Loader from "../../../components/common/Loader";
import Toast from "../../../components/common/Toast";
import ConfirmDialog from "../../../components/common/ConfirmDialog";
import EmptyState from "../../../components/common/EmptyState";

function ExperienceList() {
  const [experiences, setExperiences] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const [confirmDialog, setConfirmDialog] = useState({ show: false, id: null });

  const columns = [
    {
      label: "Company",
      field: "company",
    },
    {
      label: "Position",
      field: "position",
    },
    {
      label: "Start Date",
      field: "start_date",
    },
    {
      label: "End Date",
      field: "end_date",
      render: (row) => row.end_date || "Present",
    },
  ];

  useEffect(() => {
    loadExperiences();
  }, []);

  const loadExperiences = async () => {
    try {
      setLoading(true);
      const response = await experienceService.getAll();
      setExperiences(response.data.data);
      setFiltered(response.data.data);
    } catch (error) {
      console.log(error);
      setToast({ show: true, message: "Failed to load experiences", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    setSearch(value);
    setFiltered(
      experiences.filter((exp) =>
        exp.company.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleDelete = async () => {
    try {
      await experienceService.remove(confirmDialog.id);
      setToast({ show: true, message: "Experience deleted successfully", type: "success" });
      loadExperiences();
    } catch (error) {
      console.log(error);
      setToast({ show: true, message: "Failed to delete experience", type: "error" });
    } finally {
      setConfirmDialog({ show: false, id: null });
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3">Experiences</h1>
        <Link to="/admin/experiences/create" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Add Experience
        </Link>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <SearchBar
            value={search}
            onChange={handleSearch}
            placeholder="Search experiences..."
          />

          {loading ? (
            <Loader />
          ) : filtered.length === 0 ? (
            <EmptyState
              message={search ? "No experiences found" : "No experiences yet"}
              icon="briefcase"
              action={
                !search && (
                  <Link to="/admin/experiences/create" className="btn btn-primary">
                    Add Your First Experience
                  </Link>
                )
              }
            />
          ) : (
            <DataTable
              columns={columns}
              data={filtered}
              onEdit={(experience) => window.location.href = `/admin/experiences/edit/${experience.id}`}
              onDelete={(experience) => setConfirmDialog({ show: true, id: experience.id })}
            />
          )}
        </div>
      </div>

      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, show: false })}
      />

      <ConfirmDialog
        show={confirmDialog.show}
        onHide={() => setConfirmDialog({ show: false, id: null })}
        onConfirm={handleDelete}
        title="Delete Experience"
        message="Are you sure you want to delete this experience?"
      />
    </div>
  );
}

export default ExperienceList;