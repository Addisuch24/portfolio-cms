import { useState } from "react";
import profileService from "../../services/profileService";
import Input from "../../../components/common/Input";
import Button from "../../../components/common/Button";
import Card from "../../../components/common/Card";
import Toast from "../../../components/common/Toast";

function ChangePassword() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const change = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      setToast({ show: true, message: "Passwords do not match", type: "error" });
      return;
    }

    if (form.newPassword.length < 6) {
      setToast({ show: true, message: "Password must be at least 6 characters", type: "error" });
      return;
    }

    try {
      setLoading(true);
      await profileService.changePassword({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });
      setToast({ show: true, message: "Password changed successfully!", type: "success" });
      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.log(error);
      setToast({
        show: true,
        message: error.response?.data?.message || "Failed to change password",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="h3 mb-4">Change Password</h1>

      <Card>
        <form onSubmit={submit}>
          <div className="mb-3">
            <Input
              label="Current Password"
              type="password"
              name="currentPassword"
              placeholder="Enter current password"
              value={form.currentPassword}
              onChange={change}
              required
            />
          </div>

          <div className="mb-3">
            <Input
              label="New Password"
              type="password"
              name="newPassword"
              placeholder="Enter new password"
              value={form.newPassword}
              onChange={change}
              required
            />
          </div>

          <div className="mb-3">
            <Input
              label="Confirm New Password"
              type="password"
              name="confirmPassword"
              placeholder="Confirm new password"
              value={form.confirmPassword}
              onChange={change}
              required
            />
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? "Changing..." : "Change Password"}
          </Button>
        </form>
      </Card>

      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </div>
  );
}

export default ChangePassword;