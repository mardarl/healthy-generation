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
      carbs: (ingredient.carbs * ingredient.amount) / 100,
      proteins: (ingredient.proteins * ingredient.amount) / 100,
      fats: (ingredient.fats * ingredient.amount) / 100,
      calories: (ingredient.calories * ingredient.amount) / 100,
    }))
}

export const calculateTotalNutrient = (ingredients: Ingredient[], field: string): number => {
  const amount = ingredients.reduce((sum: number, ingredient: Ingredient) => sum + Math.round(ingredient.amount), 0)

  return Math.round(
    (ingredients.reduce((sum: number, ingredient: { [key: string]: any }) => sum + ingredient[field], 0) * 100) / amount
  )
}

export const getRandomInt = (max: number): number => {
  return Math.floor(Math.random() * max)
}

export const convertRecipeName = (name: string): string[] => {
  const nameArr = name.split(' ')
  const newName = [nameArr[1] || '', nameArr[2] || '', nameArr[3] ? '...' : '']
  return [nameArr[0], newName.join(' ')]
}
