import { AxiosError, AxiosRequestConfig } from 'axios'
import { ProductListResponse } from '../common/types'
import { API } from './axios'

export const getProducts = async (config?: AxiosRequestConfig): Promise<ProductListResponse> => {
  try {
    const response = await API.get<ProductListResponse>('/products', config)
    return response.data
  } catch (error) {
    const axiosError = error as AxiosError
    throw new Error(axiosError?.message)
  }
}
