import { AxiosError, AxiosRequestConfig } from 'axios'
import { convertNameSimpleListResponse } from '../common/convert'
import { NameSimple, NameSimpleResponse } from '../common/types'
import { API } from './axios'

export const getAllergies = async (config?: AxiosRequestConfig): Promise<Array<NameSimple>> => {
  try {
    const response = await API.get<Array<NameSimpleResponse>>('/allergies', config)
    return convertNameSimpleListResponse(response.data)
  } catch (error) {
    const axiosError = error as AxiosError
    throw new Error(axiosError?.message)
  }
}
