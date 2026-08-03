import api from "../../api/axios";

const getAll = () => api.get("/projects");

const getById = (id) => api.get(`/projects/${id}`);

const create = (data) => api.post("/projects", data);

const update = (id, data) => api.put(`/projects/${id}`, data);

const remove = (id) => api.delete(`/projects/${id}`);

export default {
  getAll,
  getById,
  create,
  update,
  remove,
};