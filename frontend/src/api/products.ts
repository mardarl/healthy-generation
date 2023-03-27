import { AxiosError, AxiosRequestConfig } from 'axios'
import {
  convertCreateProductRequest,
  convertProductListResponse,
  convertProductRequest,
  convertProductResponse,
} from '../common/convert'
import { generateQuery } from '../common/helpers'
import {
  CreateProductBody,
  Product,
  ProductList,
  ProductListResponse,
  ProductResponse,
  QueryParams,
} from '../common/types'
import { API } from './axios'

export const getProducts = async (params?: QueryParams, config?: AxiosRequestConfig): Promise<ProductList> => {
  try {
    const response = await API.get<ProductListResponse>(`/products${params ? generateQuery(params) : ''}`, config)
    return convertProductListResponse(response.data)
  } catch (error) {
    const axiosError = error as AxiosError
    throw axiosError
  }
}

export const createProduct = async (body: CreateProductBody, config?: AxiosRequestConfig): Promise<Product> => {
  try {
    const response = await API.post<ProductResponse>('/products', convertCreateProductRequest(body), config)
    return convertProductResponse(response.data)
  } catch (error) {
    const axiosError = error as AxiosError
    throw new Error(axiosError?.message)
  }
}

export const updateProduct = async (body: Product, config?: AxiosRequestConfig): Promise<Product> => {
  try {
    const response = await API.patch<ProductResponse>(`/products/${body.id}`, convertProductRequest(body), config)
    return convertProductResponse(response.data)
  } catch (error) {
    const axiosError = error as AxiosError
    throw new Error(axiosError?.message)
  }
}

export const deleteProduct = async (id: string, config?: AxiosRequestConfig): Promise<string> => {
  try {
    const response = await API.delete<string>(`/products/${id}`, config)
    return response.data
  } catch (error) {
    const axiosError = error as AxiosError
    throw new Error(axiosError?.message)
  }
}
