import api from "@/lib/axiosInterceptor";

export const getAllUsers = () => api.get(`/users`);
export const getPaginatedUsers = (page = 1, limit = 10) => api.get(`/users?page=${page}&limit=${limit}`);
export const getUserById = (id: string) => api.get(`/users/${id}`);
export const createUser = (data: any) => api.post('/users', data);
export const updateUser = (id: string, data: any) => api.put(`/users/${id}`, data);
export const deleteUser = (id: string) => api.delete(`/users/${id}`);