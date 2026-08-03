import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import skillService from "../../services/skillService";
import SearchBar from "../../../components/common/SearchBar";
import DataTable from "../../../components/common/DataTable";
import Loader from "../../../components/common/Loader";
import Toast from "../../../components/common/Toast";
import ConfirmDialog from "../../../components/common/ConfirmDialog";
import EmptyState from "../../../components/common/EmptyState";
import Badge from "../../../components/common/Badge";
import { resolveIcon, isImageIcon } from "../../../utils/iconHelpers";
import { resolveAssetUrl } from "../../../utils/assetUrls";

function SkillList() {
  const [skills, setSkills] = useState([]);
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [search, setSearch] = useState("");
  const [group, setGroup] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const [confirmDialog, setConfirmDialog] = useState({ show: false, id: null });

  const columns = [
    {
      label: "Icon",
      field: "icon",
      render: (row) => (
        <div className="d-flex align-items-center">
          {isImageIcon(row.icon) ? (
            <img src={resolveAssetUrl(row.icon)} alt={row.name} style={{ width: 24, height: 24, objectFit: 'cover', borderRadius: 4, marginRight: 8 }} />
          ) : (
            <i className={`bi ${resolveIcon(row.name, row.icon)} me-2`}></i>
          )}
        </div>
      ),
    },
    {
      label: "Skill Name",
      field: "name",
      render: (row) => <span className="fw-semibold">{row.name}</span>,
    },
    {
      label: "Category",
      field: "category",
      render: (row) => <Badge variant="primary">{row.category}</Badge>,
    },
    {
      label: "Description",
      field: "description",
      render: (row) => <span className="text-muted small">{row.description || "—"}</span>,
    },
  ];

  const loadSkills = async () => {
    try {
      setLoading(true);
      const response = await skillService.getAll();
      setSkills(response.data.data);
      setFilteredSkills(response.data.data);
    } catch (error) {
      console.log(error);
      setToast({ show: true, message: "Failed to load skills", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await loadSkills();
    })();
  }, []);

  const getGroupFilter = (skill, selectedGroup = group) => {
    const softSkillCategories = ["Soft Skill", "Soft Skills"];
    const isSoftSkill = softSkillCategories.includes(skill.category);

    if (selectedGroup === "soft") {
      return isSoftSkill;
    }

    if (selectedGroup === "technical") {
      return !isSoftSkill;
    }

    return true;
  };

  const applyFilters = (value, selectedGroup, selectedCat) => {
    const filterText = value.toLowerCase();

    setFilteredSkills(
      skills.filter((skill) => {
        const matchesSearch =
          skill.name.toLowerCase().includes(filterText) ||
          (skill.description || "").toLowerCase().includes(filterText);

        const groupMatches = getGroupFilter(skill, selectedGroup);
        const categoryMatches =
          selectedCat === "all" || skill.category === selectedCat;

        return matchesSearch && groupMatches && categoryMatches;
      })
    );
  };

  const handleSearch = (value) => {
    setSearch(value);
    applyFilters(value, group, selectedCategory);
  };

  const handleGroupChange = (selectedGroup) => {
    setGroup(selectedGroup);
    applyFilters(search, selectedGroup, selectedCategory);
  };

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    setSelectedCategory(value);
    applyFilters(search, group, value);
  };

  const handleDelete = async () => {
    try {
      await skillService.remove(confirmDialog.id);
      setToast({ show: true, message: "Skill deleted successfully", type: "success" });
      loadSkills();
    } catch (error) {
      console.log(error);
      setToast({ show: true, message: "Failed to delete skill", type: "error" });
    } finally {
      setConfirmDialog({ show: false, id: null });
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3">Skills</h1>
          <p className="text-muted mb-0">Create and manage both technical and soft skills from a single admin tab.</p>
        </div>
        <Link to="/admin/skills/create" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Add Skill
        </Link>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-3 mb-3">
            <div className="d-flex gap-2 flex-wrap">
              <div className="btn-group" role="group" aria-label="Skill group filter">
                <button
                  type="button"
                  className={`btn btn-sm ${group === "all" ? "btn-primary" : "btn-outline-primary"}`}
                  onClick={() => handleGroupChange("all")}
                >
                  All
                </button>
                <button
                  type="button"
                  className={`btn btn-sm ${group === "technical" ? "btn-primary" : "btn-outline-primary"}`}
                  onClick={() => handleGroupChange("technical")}
                >
                  Technical
                </button>
                <button
                  type="button"
                  className={`btn btn-sm ${group === "soft" ? "btn-primary" : "btn-outline-primary"}`}
                  onClick={() => handleGroupChange("soft")}
                >
                  Soft
                </button>
              </div>

              <div className="d-flex align-items-center">
                <label htmlFor="categoryFilter" className="me-2 mb-0 small text-muted">
                  Category:
                </label>
                <select
                  id="categoryFilter"
                  className="form-select form-select-sm"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  <option value="all">All Categories</option>
                  <option value="Professional Skill">Professional Skill</option>
                  <option value="Soft Skill">Soft Skill</option>
                  <option value="Programming Languages">Programming Languages</option>
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Frameworks & Libraries">Frameworks & Libraries</option>
                  <option value="Databases">Databases</option>
                  <option value="Tools & Platforms">Tools & Platforms</option>
                  <option value="Version Control">Version Control</option>
                  <option value="Software Engineering">Software Engineering</option>
                  <option value="Other Technologies">Other Technologies</option>
                </select>
              </div>
            </div>

            <SearchBar
              value={search}
              onChange={handleSearch}
              placeholder="Search skills or descriptions..."
            />
          </div>

          {loading ? (
            <Loader />
          ) : filteredSkills.length === 0 ? (
            <EmptyState
              message={search ? "No skills found" : "No skills yet"}
              icon="star"
              action={
                !search && (
                  <Link to="/admin/skills/create" className="btn btn-primary">
                    Add Your First Skill
                  </Link>
                )
              }
            />
          ) : (
            <DataTable
              columns={columns}
              data={filteredSkills}
              onEdit={(skill) => window.location.href = `/admin/skills/edit/${skill.id}`}
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
        title="Delete Skill"
        message="Are you sure you want to delete this skill?"
      />
    </div>
  );
}

export default SkillList;