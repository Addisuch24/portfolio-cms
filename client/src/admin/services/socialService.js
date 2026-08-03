import api from "../../api/axios";


const getAll = () =>
    api.get("/social-links");


const getById = (id) =>
    api.get(`/social-links/${id}`);


const create = (data) =>
    api.post("/social-links", data);


const update = (id,data) =>
    api.put(`/social-links/${id}`,data);


const remove = (id)=>
    api.delete(`/social-links/${id}`);


export default {

    getAll,

    getById,

    create,

    update,

    remove

};