import { AxiosError, AxiosRequestConfig } from 'axios'
import { RecipeListResponse } from '../common/types'
import { API } from './axios'

export const getRecipes = async (config?: AxiosRequestConfig): Promise<RecipeListResponse> => {
  try {
    const response = await API.get<RecipeListResponse>('/recipes', config)
    return response.data
  } catch (error) {
    const axiosError = error as AxiosError
    throw new Error(axiosError?.message)
  }
}
