import { Navigate, RouteProps } from 'react-router-dom'
import { RoutePaths } from './routePaths'

export const PrivateRoute = ({ children }: RouteProps) => {
  const token = localStorage.getItem('token')

  return token && children ? <>{children}</> : <Navigate to={RoutePaths.HOME} />
}
