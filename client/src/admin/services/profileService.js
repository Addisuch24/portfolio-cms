import api from "../../api/axios";

const getProfile = () => api.get("/profile");

const updateProfile = (data) => api.put("/profile", data);

const uploadImage = (data) => api.post("/profile/image", data);

const uploadResume = (data) => api.post("/profile/resume", data);

const changePassword = (data) =>
  api.put("/auth/change-password", data);

export default {
  getProfile,
  updateProfile,
  uploadImage,
  uploadResume,
  changePassword,
};