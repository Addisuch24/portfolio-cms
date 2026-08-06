import { useEffect, useState } from "react";
import messageService from "../../services/messageService";
import DataTable from "../../../components/common/DataTable";
import SearchBar from "../../../components/common/SearchBar";
import Toast from "../../../components/common/Toast";
import ConfirmDialog from "../../../components/common/ConfirmDialog";
import Loader from "../../../components/common/Loader";
import EmptyState from "../../../components/common/EmptyState";
import Badge from "../../../components/common/Badge";
import Modal from "../../../components/common/Modal";

function MessageList() {
  const [messages, setMessages] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const [confirmDialog, setConfirmDialog] = useState({ show: false, id: null });
  const [viewModal, setViewModal] = useState({ show: false, message: null });

  const columns = [
    {
      header: "Name",
      accessor: "name",
    },
    {
      header: "Email",
      accessor: "email",
    },
    {
      header: "Subject",
      accessor: "subject",
    },
    {
      header: "Status",
      accessor: (row) => (
        <Badge variant={row.is_read ? "success" : "warning"}>
          {row.is_read ? "Read" : "Unread"}
        </Badge>
      ),
    },
    {
      header: "Date",
      accessor: (row) => new Date(row.created_at).toLocaleDateString(),
    },
  ];

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      setLoading(true);
      const response = await messageService.getAll();
      setMessages(response.data.data);
      setFiltered(response.data.data);
    } catch (err) {
      console.log("Messages API error:", err);
      const message =
        err.response?.data?.message ||
        err.response?.statusText ||
        err.message ||
        "Failed to load messages";
      setToast({ show: true, message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    setSearch(value);
    setFiltered(
      messages.filter(
        (m) =>
          m.name.toLowerCase().includes(value.toLowerCase()) ||
          m.email.toLowerCase().includes(value.toLowerCase()) ||
          m.subject.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleView = (message) => {
    setViewModal({ show: true, message });
    if (!message.is_read) {
      handleMarkAsRead(message.id);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await messageService.markAsRead(id);
      loadMessages();
    } catch (err) {
      console.log(err);
      setToast({ show: true, message: "Failed to mark as read", type: "error" });
    }
  };

  const handleDelete = async () => {
    try {
      await messageService.remove(confirmDialog.id);
      setToast({ show: true, message: "Message deleted successfully!", type: "success" });
      loadMessages();
    } catch (err) {
      console.log(err);
      setToast({ show: true, message: "Failed to delete message", type: "error" });
    } finally {
      setConfirmDialog({ show: false, id: null });
    }
  };

  if (loading) {
    return <Loader fullScreen />;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3">Messages</h1>
      </div>

      <SearchBar
        value={search}
        onChange={handleSearch}
        placeholder="Search messages..."
      />

      <div className="mt-4">
        {filtered.length === 0 ? (
          <EmptyState message="No messages found" />
        ) : (
          <DataTable
            columns={columns}
            data={filtered}
            renderActions={(message) => (
              <div className="btn-group">
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => handleView(message)}
                  title="View message"
                >
                  <i className="bi bi-eye"></i>
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => setConfirmDialog({ show: true, id: message.id })}
                  title="Delete message"
                >
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            )}
          />
        )}
      </div>

      <Modal
        show={viewModal.show}
        title="Message Details"
        onHide={() => setViewModal({ show: false, message: null })}
      >
        {viewModal.message && (
          <div>
            <div className="mb-3">
              <strong>From:</strong> {viewModal.message.name}
            </div>
            <div className="mb-3">
              <strong>Email:</strong>{" "}
              <a href={`mailto:${viewModal.message.email}`}>{viewModal.message.email}</a>
            </div>
            <div className="mb-3">
              <strong>Subject:</strong> {viewModal.message.subject}
            </div>
            <div className="mb-3">
              <strong>Date:</strong> {new Date(viewModal.message.created_at).toLocaleString()}
            </div>
            <div className="mb-3">
              <strong>Status:</strong>{" "}
              <Badge variant={viewModal.message.is_read ? "success" : "warning"}>
                {viewModal.message.is_read ? "Read" : "Unread"}
              </Badge>
            </div>
            <hr />
            <div>
              <strong>Message:</strong>
              <p className="mt-2">{viewModal.message.message}</p>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmDialog
        show={confirmDialog.show}
        title="Delete Message"
        message="Are you sure you want to delete this message? This action cannot be undone."
        onConfirm={handleDelete}
        onHide={() => setConfirmDialog({ show: false, id: null })}
      />

      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </div>
  );
}

export default MessageList;