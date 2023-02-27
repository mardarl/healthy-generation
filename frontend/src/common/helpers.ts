import { RoutePaths } from '../routes/routePaths'
import { QueryParams } from './types'

export const generateQuery = (params: QueryParams) => {
  const queryParams = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => queryParams.append(key, value.toString()))
  return `?${queryParams.toString()}`
}

export const routeWithParams = (route: RoutePaths | string, params: { [key: string]: string | number }): string =>
  Object.keys(params).reduce((path, paramName) => path.replace(`:${paramName}`, params[paramName] as string), route)
