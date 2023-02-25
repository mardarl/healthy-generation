import axios from 'axios'

export const BASE_API_URL = process.env.REACT_APP_BASE_URL

export const AUTH_API = axios.create({
  baseURL: BASE_API_URL,
})

export const API = axios.create({
  baseURL: BASE_API_URL,
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
})
