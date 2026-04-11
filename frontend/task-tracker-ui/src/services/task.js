import axios from 'axios';
import auth from './auth';

const API_URL = import.meta.env.VITE_TASK_API_URL;

const getAllTasks = () => {
    return axios.get(API_URL, { headers: auth.authHeader() });
};

const getTaskById = (id) => {
    return axios.get(`${API_URL}/${id}`, { headers: auth.authHeader() });
};

const createTask = (task) => {
    return axios.post(API_URL, task, { headers: auth.authHeader() });
};

const updateTask = (id, task) => {
    return axios.put(`${API_URL}/${id}`, task, { headers: auth.authHeader() });
};

const deleteTask = (id) => {
    return axios.delete(`${API_URL}/${id}`, { headers: auth.authHeader() });
};

export default {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
};