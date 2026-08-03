import api from "../../api/axios";

const getAll = () => api.get("/skills");

const getById = (id) => api.get(`/skills/${id}`);

const create = (data) => api.post("/skills", data);

const update = (id, data) => api.put(`/skills/${id}`, data);

const remove = (id) => api.delete(`/skills/${id}`);

export default {
  getAll,
  getById,
  create,
  update,
  remove,
};