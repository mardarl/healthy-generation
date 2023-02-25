import { AxiosError, AxiosRequestConfig } from 'axios'
import { LoginBody, LoginResponse } from '../common/types'
import { AUTH_API } from './axios'

export const login = async (body: LoginBody, config?: AxiosRequestConfig): Promise<LoginResponse> => {
  try {
    const response = await AUTH_API.post<LoginResponse>('/auth/login', body, config)
    return response.data
  } catch (error) {
    const axiosError = error as AxiosError
    throw new Error(axiosError?.message)
  }
}
