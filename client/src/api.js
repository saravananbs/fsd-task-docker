import axios from 'axios';

const API_URL = 'http://localhost:5000/api/employees';

export const fetchEmployees = () => axios.get(API_URL);
export const addEmployee = (employee) => axios.post(`${API_URL}/add`, employee);
export const updateEmployee = (id, employee) => axios.put(`${API_URL}/update/${id}`, employee);
export const deleteEmployee = (id) => axios.delete(`${API_URL}/delete/${id}`);
