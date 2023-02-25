import { AxiosError, AxiosRequestConfig } from 'axios'
import { UserResponse } from '../common/types'
import { API } from './axios'

export const getUsers = async (config?: AxiosRequestConfig): Promise<Array<UserResponse>> => {
  try {
    const response = await API.get<Array<UserResponse>>('/users', config)
    return response.data
  } catch (error) {
    const axiosError = error as AxiosError
    throw new Error(axiosError?.message)
  }
}
