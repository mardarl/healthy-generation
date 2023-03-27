import { AxiosRequestConfig, isAxiosError } from 'axios'
import { QueryParams } from '../types'
import { useAPIError } from './useAPIError'
import { useMutation, UseMutateFunction } from 'react-query'

export const useMutate = <T>(
  request: (params?: QueryParams, config?: AxiosRequestConfig<any>) => Promise<T>
): {
  mutate: UseMutateFunction<T, unknown, QueryParams | undefined>
  isLoading: boolean
  isSuccess: boolean
} => {
  const { mutate, isLoading, isError, isSuccess, error } = useMutation(request)
  const { addError } = useAPIError()

  if (isError && isAxiosError(error)) {
    addError(error?.message)
  }

  return { mutate, isLoading, isSuccess }
}
