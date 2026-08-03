import api from "../api/axios";

const getProfile = () => api.get("/public/profile");

const getProjects = () => api.get("/public/projects");

const getSkills = () => api.get("/public/skills");

const getProfessionalSkills = () => api.get("/public/professional-skills");

const getExperiences = () => api.get("/public/experiences");

const getSocialLinks = () => api.get("/public/social-links");

const sendMessage = (data) =>
    api.post("/public/contact", data);

export default {

    getProfile,

    getProjects,

    getSkills,

    getProfessionalSkills,

    getExperiences,

    getSocialLinks,

    sendMessage

};