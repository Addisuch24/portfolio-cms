import api from "../../api/axios";

const getAll = () => api.get("/professional-skills");

const getById = (id) => api.get(`/professional-skills/${id}`);

const create = (data) => api.post("/professional-skills", data);

const update = (id, data) => api.put(`/professional-skills/${id}`, data);

const remove = (id) => api.delete(`/professional-skills/${id}`);

export default {
  getAll,
  getById,
  create,
  update,
  remove,
};
