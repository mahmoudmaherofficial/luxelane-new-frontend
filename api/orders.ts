import api from "@/lib/axiosInterceptor";

export const getAllOrders = () => api.get(`/orders`);
export const getPaginatedOrders = (page: number, limit: number) => api.get(`/orders?page=${page}&limit=${limit}`);
export const getOrderById = (id: string) => api.get(`/orders/${id}`);
export const getOrdersByUserId = (id: string) => api.get(`/orders/user/${id}`);
export const createOrder = (data: any) => api.post('/orders', data);
export const updateOrder = (id: string, data: any) => api.put(`/orders/${id}`, data);
export const deleteOrder = (id: string) => api.delete(`/orders/${id}`);