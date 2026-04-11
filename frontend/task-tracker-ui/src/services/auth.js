import axios from 'axios';

const API_URL = import.meta.env.VITE_AUTH_API_URL;

const login = async (username, password) => {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

const register = async (username, password) => {
    const response = await axios.post(`${API_URL}/register`, { username, password });
    return response.data;
};

const logout = () => {
    localStorage.removeItem('user');
    window.dispatchEvent(new Event('logout'));
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

const authHeader = () => {
    const user = getCurrentUser();
    if (user && user.token) {
        return { Authorization: `Bearer ${user.token}` };
    } else {
        return {};
    }
};

export default {
    login,
    register,
    logout,
    getCurrentUser,
    authHeader,
};