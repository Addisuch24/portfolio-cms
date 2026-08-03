import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import professionalSkillService from "../../services/professionalSkillService";
import SearchBar from "../../../components/common/SearchBar";
import DataTable from "../../../components/common/DataTable";
import Loader from "../../../components/common/Loader";
import Toast from "../../../components/common/Toast";
import ConfirmDialog from "../../../components/common/ConfirmDialog";
import EmptyState from "../../../components/common/EmptyState";
import Badge from "../../../components/common/Badge";

function ProfessionalSkillList() {
  const navigate = useNavigate();
  const [skills, setSkills] = useState([]);
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const [confirmDialog, setConfirmDialog] = useState({ show: false, id: null });

  const columns = [
    {
      label: "Icon",
      field: "icon",
      render: (row) => (
        <div className="fs-4 text-primary">
          <i className={`bi ${row.icon || "bi-lightbulb"}`}></i>
        </div>
      )
    },
    {
      label: "Skill Name",
      field: "name",
    },
    {
      label: "Description",
      field: "description",
      render: (row) => (
        <span className="text-truncate d-inline-block" style={{ maxWidth: "250px" }}>
          {row.description}
        </span>
      )
    },
    {
      label: "Confidence (%)",
      field: "percentage",
      render: (row) => (
        <div className="d-flex align-items-center">
          <div className="progress flex-grow-1 me-2" style={{ height: "20px" }}>
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: `${row.percentage}%` }}
              aria-valuenow={row.percentage}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {row.percentage}%
            </div>
          </div>
        </div>
      ),
    },
    {
      label: "Status",
      field: "status",
      render: (row) => (
        <Badge variant={row.status === "Active" ? "success" : "secondary"}>
          {row.status}
        </Badge>
      ),
    },
  ];

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    try {
      setLoading(true);
      const response = await professionalSkillService.getAll();
      setSkills(response.data.data || []);
      setFilteredSkills(response.data.data || []);
    } catch (error) {
      console.error(error);
      setToast({ show: true, message: "Failed to load professional skills", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    setSearch(value);
    setFilteredSkills(
      skills.filter((skill) =>
        skill.name.toLowerCase().includes(value.toLowerCase()) ||
        skill.description.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleDelete = async () => {
    try {
      await professionalSkillService.remove(confirmDialog.id);
      setToast({ show: true, message: "Professional skill deleted successfully", type: "success" });
      loadSkills();
    } catch (error) {
      console.error(error);
      setToast({ show: true, message: "Failed to delete professional skill", type: "error" });
    } finally {
      setConfirmDialog({ show: false, id: null });
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3">Professional Skills</h1>
        <Link to="/admin/professional-skills/create" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Add Professional Skill
        </Link>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <SearchBar
            value={search}
            onChange={handleSearch}
            placeholder="Search professional skills..."
          />

          {loading ? (
            <Loader />
          ) : filteredSkills.length === 0 ? (
            <EmptyState
              message={search ? "No professional skills found" : "No professional skills yet"}
              icon="award"
              action={
                !search && (
                  <Link to="/admin/professional-skills/create" className="btn btn-primary">
                    Add Your First Professional Skill
                  </Link>
                )
              }
            />
          ) : (
            <DataTable
              columns={columns}
              data={filteredSkills}
              onEdit={(skill) => navigate(`/admin/professional-skills/edit/${skill.id}`)}
              onDelete={(skill) => setConfirmDialog({ show: true, id: skill.id })}
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
        title="Delete Professional Skill"
        message="Are you sure you want to delete this professional skill?"
      />
    </div>
  );
}

export default ProfessionalSkillList;
