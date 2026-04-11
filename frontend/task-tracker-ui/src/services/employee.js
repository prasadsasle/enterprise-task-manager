import axios from 'axios';
import auth from './auth';

const API_URL = import.meta.env.VITE_EMPLOYEE_API_URL;

const employeeService = {
    getAll: () => axios.get(API_URL, { headers: auth.authHeader() }),

    getById: (id) => axios.get(`${API_URL}/${id}`, { headers: auth.authHeader() }),

    create: (employeeData) =>
        axios.post(API_URL, employeeData, { headers: auth.authHeader() }),

    update: (id, employeeData) =>
        axios.put(`${API_URL}/${id}`, employeeData, { headers: auth.authHeader() }),

    remove: (id) => axios.delete(`${API_URL}/${id}`, { headers: auth.authHeader() }),
};

export default employeeService;
