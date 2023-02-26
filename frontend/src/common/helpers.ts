import { QueryParams } from './types'

export const generateQuery = (params: QueryParams) => {
  const queryParams = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => queryParams.append(key, value.toString()))
  return `?${queryParams.toString()}`
}
