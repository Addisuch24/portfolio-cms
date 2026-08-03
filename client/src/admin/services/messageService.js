import api from "../../api/axios";

const getAll = () => api.get("/contacts");

const getById = (id) => api.get(`/contacts/${id}`);

const markAsRead = (id) => api.patch(`/contacts/${id}/read`);

const remove = (id) => api.delete(`/contacts/${id}`);

export default {
  getAll,
  getById,
  markAsRead,
  remove,
};