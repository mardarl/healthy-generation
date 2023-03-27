import { AxiosRequestConfig, isAxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { QueryParams } from '../types'
import { useAPIError } from './useAPIError'

export const useAxiosRequest = <T>(
  request: (params?: QueryParams, config?: AxiosRequestConfig<any>) => Promise<T>,
  requestParms?: any
): {
  data: T | null
  loading: boolean
} => {
  const { addError, error } = useAPIError()

  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)

  const sendRequest = async (): Promise<void> => {
    try {
      setData(await request(requestParms))
    } catch (err) {
      if (isAxiosError(err)) {
        addError(err?.message)
      }
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    sendRequest()
  }, [])

  return { data: data && !error ? data : null, loading }
}
