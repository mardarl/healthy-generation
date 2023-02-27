import { AxiosError, AxiosRequestConfig } from 'axios'
import { convertNameSimpleListResponse } from '../common/convertResponse'
import { NameSimple, NameSimpleResponse } from '../common/types'
import { API } from './axios'

export const getRecipeTypes = async (config?: AxiosRequestConfig): Promise<Array<NameSimple>> => {
  try {
    const response = await API.get<Array<NameSimpleResponse>>('/recipe_types', config)
    return convertNameSimpleListResponse(response.data)
  } catch (error) {
    const axiosError = error as AxiosError
    throw new Error(axiosError?.message)
  }
}
