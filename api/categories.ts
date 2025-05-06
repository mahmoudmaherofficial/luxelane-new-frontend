import api from "@/lib/axiosInterceptor"
import { Category } from "@/types"

export const getAllCategories = () => api.get(`/categories`)
export const getPaginatedCategories = (page = 1, limit = 10) => api.get(`/categories?page=${page}&limit=${limit}`)
export const getCategoryById = (categoryId: string) => api.get(`/categories/${categoryId}`)
export const createCategory = (data: Category) => api.post("/categories", data)
export const updateCategory = (categoryId: string, data: Category) => api.put(`/categories/${categoryId}`, data)
export const deleteCategory = (categoryId:string) => api.delete(`/categories/${categoryId}`)