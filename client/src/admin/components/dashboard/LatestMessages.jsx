import { Link } from "react-router-dom";
import Badge from "../../../components/common/Badge";
import EmptyState from "../../../components/common/EmptyState";

function LatestMessages({ messages }) {
  if (!messages || messages.length === 0) {
    return (
      <div className="card shadow-sm">
        <div className="card-header">
          <h5>Latest Messages</h5>
        </div>
        <div className="card-body">
          <EmptyState message="No messages yet" icon="envelope" />
        </div>
      </div>
    );
  }

  return (
    <div className="card shadow-sm">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Latest Messages</h5>
        <Link to="/admin/messages" className="btn btn-sm btn-primary">
          View All
        </Link>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Subject</th>
                <th>Status</th>
                <th>Date</th>
                <th className="text-end">Action</th>
              </tr>
            </thead>
            <tbody>
              {messages.map(message => (
                <tr key={message.id}>
                  <td>
                    {!message.is_read && <i className="bi bi-circle-fill text-primary me-2" style={{fontSize: '8px'}}></i>}
                    {message.name}
                  </td>
                  <td>{message.subject}</td>
                  <td>
                    <Badge variant={message.is_read ? 'secondary' : 'primary'}>
                      {message.is_read ? 'Read' : 'Unread'}
                    </Badge>
                  </td>
                  <td>{new Date(message.created_at).toLocaleDateString()}</td>
                  <td className="text-end">
                    <Link to="/admin/messages" className="btn btn-sm btn-outline-primary">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default LatestMessages;