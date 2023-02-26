import { AxiosError, AxiosRequestConfig } from 'axios'
import { convertUserRequest, convertUserResponse, convertUserSimpleResponse } from '../common/convertResponse'
import { User, UserResponse } from '../common/types'
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

export const getUser = async (id: string, config?: AxiosRequestConfig): Promise<User> => {
  try {
    const response = await API.get<UserResponse>(`/users/${id}`, config)
    return convertUserResponse(response.data)
  } catch (error) {
    const axiosError = error as AxiosError
    throw new Error(axiosError?.message)
  }
}

export const updateUser = async (body: User, config?: AxiosRequestConfig): Promise<User> => {
  try {
    const response = await API.patch<UserResponse>(`/users/${body.id}`, convertUserRequest(body), config)
    localStorage.setItem('user', JSON.stringify(convertUserSimpleResponse(response.data)))
    return convertUserResponse(response.data)
  } catch (error) {
    const axiosError = error as AxiosError
    throw new Error(axiosError?.message)
  }
}

type ChangePasswordBody = {
  id: string
  password: string
}

export const changeUserPassword = async (body: ChangePasswordBody, config?: AxiosRequestConfig): Promise<User> => {
  try {
    const response = await API.patch<UserResponse>(`/users/${body.id}/password`, body, config)
    localStorage.setItem('user', JSON.stringify(convertUserSimpleResponse(response.data)))
    return convertUserResponse(response.data)
  } catch (error) {
    const axiosError = error as AxiosError
    throw new Error(axiosError?.message)
  }
}
