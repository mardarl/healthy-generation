import { AxiosError, AxiosRequestConfig } from 'axios'
import { convertProductResponse } from '../common/convertResponse'
import { Product, ProductListResponse } from '../common/types'
import { API } from './axios'

export const getProducts = async (config?: AxiosRequestConfig): Promise<Array<Product>> => {
  try {
    const response = await API.get<ProductListResponse>('/products', config)
    const products = response.data.products.map((product) => convertProductResponse(product))
    return products
  } catch (error) {
    const axiosError = error as AxiosError
    throw new Error(axiosError?.message)
  }
}
