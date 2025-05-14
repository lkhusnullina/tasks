import axios from 'axios';
import type { ITask } from '../models/iTask';

const API_URL = 'http://localhost:3001';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getTasks = async(): Promise<ITask[]> => {
  const response = await api.get('/tasks');
  return response.data;
};

export const getTaskById = async(id: number): Promise<ITask> => {
  const response = await api.get(`/tasks/${id}`);
  return response.data;
};
