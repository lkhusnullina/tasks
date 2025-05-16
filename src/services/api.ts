import axios from 'axios';
import type { ITask } from '../models/ITask';
export interface ILoginResponse {
  accessToken: string;
}

const API_URL = 'http://localhost:3001';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (
  email: string,
  password: string,
): Promise<ILoginResponse> => {
  try {
    const response = await api.post('/login', { email, password });
    if (response.status !== 200) {
      throw new Error('Ошибка входа');
    }
    const data = response.data;
    localStorage.setItem('token', data.accessToken);
    return data;

  } catch (error) {
    console.error('Ошибка входа:', error);
    throw error;
  }
};

export const getTasks = async (): Promise<ITask[]> => {
  const response = await api.get('/tasks');
  return response.data;
};

export const getTaskById = async (id: number): Promise<ITask> => {
  const response = await api.get(`/tasks/${id}`);
  return response.data;
};

export const createTask = async (taskData: Omit<ITask, 'id'>): Promise<ITask> => {
  const response = await api.post('/tasks', taskData);
  return response.data;
};

export const editTask = async (id: number, taskData: Partial<ITask>): Promise<ITask> => {
  const response = await api.put(`/tasks/${id}`, taskData);
  return response.data;
};