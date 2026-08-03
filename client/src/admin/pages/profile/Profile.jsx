import { useEffect, useState } from "react";
import ProfileForm from "./ProfileForm";
import profileService from "../../services/profileService";
import UploadImage from "../../components/UploadImage";
import UploadResume from "./UploadResume";
import Card from "../../../components/common/Card";
import Loader from "../../../components/common/Loader";
import Toast from "../../../components/common/Toast";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setFetching(true);
      const response = await profileService.getProfile();
      setProfile(response.data.data);
    } catch (error) {
      console.log(error);
      setToast({ show: true, message: "Failed to load profile", type: "error" });
    } finally {
      setFetching(false);
    }
  };

  const updateProfile = async (data) => {
    try {
      setLoading(true);
      await profileService.updateProfile(data);
      await loadProfile();
      setToast({ show: true, message: "Profile updated successfully!", type: "success" });
    } catch (error) {
      console.log(error);
      setToast({ show: true, message: "Failed to update profile", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <Loader fullScreen />;
  }

  if (!profile) {
    return (
      <div className="alert alert-danger">Profile not found</div>
    );
  }

  return (
    <div>
      <h1 className="h3 mb-4">Profile Settings</h1>

      <Card>
        <h5 className="mb-3">Personal Information</h5>
        <ProfileForm
          initialValues={profile}
          loading={loading}
          onSubmit={updateProfile}
        />
      </Card>

      <Card className="mt-4">
        <h5 className="mb-3">Profile Image</h5>
        <UploadImage onUploadSuccess={loadProfile} />
      </Card>

      <Card className="mt-4">
        <h5 className="mb-3">Resume</h5>
        <UploadResume onUploadSuccess={loadProfile} />
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

export default Profile;