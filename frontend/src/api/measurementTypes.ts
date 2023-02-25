import { AxiosError, AxiosRequestConfig } from 'axios'
import { NameSimpleResponse } from '../common/types'
import { API } from './axios'

export const getMeasurementTypes = async (config?: AxiosRequestConfig): Promise<Array<NameSimpleResponse>> => {
  try {
    const response = await API.get<Array<NameSimpleResponse>>('/measurement_types', config)
    return response.data
  } catch (error) {
    const axiosError = error as AxiosError
    throw new Error(axiosError?.message)
  }
}
