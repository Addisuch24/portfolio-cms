import api from "../../api/axios";

const getAll = () => api.get("/experiences");

const getById = (id) => api.get(`/experiences/${id}`);

const create = (data) => api.post("/experiences", data);

const update = (id, data) => api.put(`/experiences/${id}`, data);

const remove = (id) => api.delete(`/experiences/${id}`);

export default {
  getAll,
  getById,
  create,
  update,
  remove,
};