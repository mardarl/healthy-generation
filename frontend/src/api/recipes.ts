import { AxiosError, AxiosRequestConfig } from 'axios'
import { convertRecipeListResponse } from '../common/convertResponse'
import { generateQuery } from '../common/helpers'
import { QueryParams, RecipeList, RecipeListResponse } from '../common/types'
import { API } from './axios'

export const getRecipes = async (params?: QueryParams, config?: AxiosRequestConfig): Promise<RecipeList> => {
  try {
    const response = await API.get<RecipeListResponse>(`/recipes${params ? generateQuery(params) : ''}`, config)
    return convertRecipeListResponse(response.data)
  } catch (error) {
    const axiosError = error as AxiosError
    throw new Error(axiosError?.message)
  }
}
