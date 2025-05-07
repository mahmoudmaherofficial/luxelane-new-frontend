import api from "@/lib/axiosInterceptor";

export const getAllOrders = () => api.get("/orders");
export const getOrderById = (id: string) => api.get(`/orders/${id}`);