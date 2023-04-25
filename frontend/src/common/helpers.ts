import { RoutePaths } from '../routes/routePaths'
import { Ingredient, QueryParams } from './types'

export const generateQuery = (params: QueryParams) => {
  const queryParams = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => queryParams.append(key, value.toString()))
  return `?${queryParams.toString()}`
}

export const routeWithParams = (route: RoutePaths | string, params: { [key: string]: string | number }): string =>
  Object.keys(params).reduce((path, paramName) => path.replace(`:${paramName}`, params[paramName] as string), route)

export const recalculateIngredients = (ingredients: Ingredient[]): Ingredient[] => {
  return ingredients
    .filter((ingredient) => ingredient.productId)
    .map((ingredient) => ({
      ...ingredient,
      carbs: Math.ceil((ingredient.carbs * ingredient.amount) / 100),
      proteins: Math.ceil((ingredient.proteins * ingredient.amount) / 100),
      fats: Math.ceil((ingredient.fats * ingredient.amount) / 100),
      calories: Math.ceil((ingredient.calories * ingredient.amount) / 100),
    }))
}

export const calculateTotalAmount = (ingredients: Ingredient[]): number => {
  return ingredients.reduce((sum: number, ingredient: Ingredient) => sum + Math.round(ingredient.amount), 0)
}

export const calculateTotalNutrient = (ingredients: Ingredient[], field: string, amount: number): number => {
  return Math.ceil(
    (ingredients.reduce((sum: number, ingredient: { [key: string]: any }) => sum + ingredient[field], 0) * 100) / amount
  )
}

export const convertRecipeName = (name: string): string[] => {
  const nameArr = name.split(' ')
  const newName = [nameArr[1] || '', nameArr[2] || '', nameArr[3] ? '...' : '']
  return [nameArr[0], newName.join(' ')]
}
