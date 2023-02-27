import { AxiosError, AxiosRequestConfig } from 'axios'
import {
  convertCreateRecipeRequest,
  convertRecipeListResponse,
  convertRecipeRequest,
  convertRecipeResponse,
} from '../common/convertResponse'
import { generateQuery } from '../common/helpers'
import { CreateRecipeBody, QueryParams, Recipe, RecipeList, RecipeListResponse, RecipeResponse } from '../common/types'
import { API } from './axios'

export const getRecipes = async (params?: QueryParams, config?: AxiosRequestConfig): Promise<RecipeList> => {
  try {
    const response = await API.get<RecipeListResponse>(`/recipes${params ? generateQuery(params) : ''}`, config)
    return convertRecipeListResponse(response.data)
  } catch (error) {
    const axiosError = error as AxiosError
    throw new Error(axiosError?.message)
  }
}

export const getRecipe = async (id: string, config?: AxiosRequestConfig): Promise<Recipe> => {
  try {
    const response = await API.get<RecipeResponse>(`/recipes/${id}`, config)
    return convertRecipeResponse(response.data)
  } catch (error) {
    const axiosError = error as AxiosError
    throw new Error(axiosError?.message)
  }
}

export const updateRecipe = async (body: Recipe, config?: AxiosRequestConfig): Promise<Recipe> => {
  try {
    const response = await API.patch<RecipeResponse>(`/recipes/${body.id}`, convertRecipeRequest(body), config)
    return convertRecipeResponse(response.data)
  } catch (error) {
    const axiosError = error as AxiosError
    throw new Error(axiosError?.message)
  }
}

export const createRecipe = async (body: CreateRecipeBody, config?: AxiosRequestConfig): Promise<Recipe> => {
  try {
    const response = await API.post<RecipeResponse>('/recipes', convertCreateRecipeRequest(body), config)
    return convertRecipeResponse(response.data)
  } catch (error) {
    const axiosError = error as AxiosError
    throw new Error(axiosError?.message)
  }
}

export const deleteRecipe = async (id: string, config?: AxiosRequestConfig): Promise<string> => {
  try {
    const response = await API.delete<string>(`/recipes/${id}`, config)
    return response.data
  } catch (error) {
    const axiosError = error as AxiosError
    throw new Error(axiosError?.message)
  }
}
