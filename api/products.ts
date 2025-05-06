// api/products.ts
import api from "@/lib/axiosInterceptor"


export const getAllProducts = () => api.get(`/products`)
export const getPaginatedProducts = (page = 1, limit = 10) => api.get(`/products?page=${page}&limit=${limit}`)
export const getProductById = (id: string) => api.get(`/products/${id}`)
export const createProduct = (productData: any) => api.post('/products', productData, { headers: { 'Content-Type': 'multipart/form-data' } })
export const updateProduct = (id: string, data: any) => api.put(`/products/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } })
export const deleteProduct = (id: string) => api.delete(`/products/${id}`)
export const deleteProductImage = (productId: string, imageName: string) =>
  api.delete(`/products/delete-image/${productId}/${imageName}`)

