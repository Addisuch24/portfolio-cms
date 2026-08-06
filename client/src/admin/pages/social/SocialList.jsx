import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import socialService from "../../services/socialService";
import DataTable from "../../../components/common/DataTable";
import Loader from "../../../components/common/Loader";
import Toast from "../../../components/common/Toast";
import ConfirmDialog from "../../../components/common/ConfirmDialog";
import EmptyState from "../../../components/common/EmptyState";

function SocialList() {
  const [socials, setSocials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const [confirmDialog, setConfirmDialog] = useState({ show: false, id: null });

  const columns = [
    {
      label: "Platform",
      field: "platform",
    },
    {
      label: "URL",
      field: "url",
    },
    {
      label: "Icon",
      field: "icon",
      render: (row) => (
        <i className={`bi bi-${row.icon} fs-4`}></i>
      ),
    },
  ];

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      setLoading(true);
      const response = await socialService.getAll();
      setSocials(response.data.data);
    } catch (error) {
      console.log("Social links API error:", error);
      const message =
        error.response?.data?.message ||
        error.response?.statusText ||
        error.message ||
        "Failed to load social links";
      setToast({ show: true, message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const remove = async () => {
    try {
      await socialService.remove(confirmDialog.id);
      setToast({ show: true, message: "Social link deleted successfully", type: "success" });
      load();
    } catch (error) {
      console.log(error);
      setToast({ show: true, message: "Failed to delete social link", type: "error" });
    } finally {
      setConfirmDialog({ show: false, id: null });
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3">Social Links</h1>
        <Link to="/admin/social/create" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Add Social Link
        </Link>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          {loading ? (
            <Loader />
          ) : socials.length === 0 ? (
            <EmptyState
              message="No social links yet"
              icon="share"
              action={
                <Link to="/admin/social/create" className="btn btn-primary">
                  Add Your First Social Link
                </Link>
              }
            />
          ) : (
            <DataTable
              columns={columns}
              data={socials}
              onEdit={(item) => window.location.href = `/admin/social/edit/${item.id}`}
              onDelete={(item) => setConfirmDialog({ show: true, id: item.id })}
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
        onConfirm={remove}
        title="Delete Social Link"
        message="Are you sure you want to delete this social link?"
      />
    </div>
  );
}

export default SocialList;