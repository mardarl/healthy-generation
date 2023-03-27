import { useContext } from 'react'
import { APIErrorContext } from '../providers/APIErrorProvider'

export const useAPIError = () => useContext(APIErrorContext)
