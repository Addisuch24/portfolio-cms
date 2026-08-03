import api from "../../api/axios";

const login = async (credentials) => {

    const response = await api.post("/auth/login", credentials);

    return response.data;

};

const logout = () => {

    localStorage.removeItem("token");

};

export default {

    login,

    logout

};