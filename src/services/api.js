import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; // Update with your backend URL if necessary

// Users
export const getUsers = async () => axios.get(`${API_BASE_URL}/users`);
export const createUser = async (userData) => axios.post(`${API_BASE_URL}/users`, userData);

// Clinics
export const getClinics = async () => axios.get(`${API_BASE_URL}/clinics`);
export const createClinic = async (clinicData) => axios.post(`${API_BASE_URL}/clinics`, clinicData);

// Schedules
export const getSchedules = async () => axios.get(`${API_BASE_URL}/schedules`);
export const createSchedule = async (scheduleData) => axios.post(`${API_BASE_URL}/schedules`, scheduleData);

// Add other API services as needed
