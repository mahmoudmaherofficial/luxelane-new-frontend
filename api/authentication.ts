import api from "@/lib/axiosInterceptor";

export const login = (data:any) => api.post("/auth/login", data);
export const register = (data: any) => api.post("/auth/register", data);
export const logoutFn = () => api.post("/auth/logout");