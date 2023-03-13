import React from 'react'

export type InputProps<T> = {
  value: T
  error?: string
}

export type QueryParams = {
  [key: string]: string | number | boolean
}

export type RecipePageProps = {
  recipes: RecipeList
  handleFavouriteChange: (e: React.MouseEvent<SVGElement, MouseEvent>, recipeId: string) => void
  [key: string]: any
}

export type LoginBody = {
  email: string
  password: string
}

export type LoginResponse = {
  token: string
  user: UserResponse
}

export type UserSimpleResponse = {
  _id: string
  first_name: string
  last_name: string
  favourite_recipes?: Array<string>
}

export type UserSimple = {
  id: string
  firstName: string
  lastName: string
  favouriteRecipes: Array<string>
}

export type NameSimpleResponse = {
  _id: string
  name: string
}

export type NameSimple = {
  id: string
  name: string
}

export type UserResponse = {
  _id: string
  first_name: string
  last_name: string
  password: string
  email: string
  allergies?: Array<NameSimpleResponse>
  diets?: Array<NameSimpleResponse>
  favourite_recipes?: Array<string>
  product_allergies?: Array<NameSimpleResponse>
}

export type User = {
  id: string
  firstName: string
  lastName: string
  password: string
  email: string
  allergies: Array<NameSimple> | null
  diets: Array<NameSimple> | null
  favouriteRecipes: Array<string>
  productAllergies: Array<NameSimple> | null
}

export type CreateProductResponse = {
  name: string
  carbs: number
  proteins: number
  fats: number
  calories: number
  recipe_id: string | null
}

export type ProductResponse = CreateProductResponse & { _id: string }

export type CreateProductBody = {
  name: string
  carbs: number
  proteins: number
  fats: number
  calories: number
  recipeId: string | null
}

export type Product = CreateProductBody & { id: string }

export type ListResponse = {
  current_page: number
  limit: number
  total_count: number
}

export type List = {
  currentPage: number
  limit: number
  totalCount: number
}

export type ProductListResponse = ListResponse & {
  products: Array<ProductResponse>
}

export type ProductList = List & {
  products: Array<Product>
}

export type IngredientResponse = {
  product_id: string
  name: string
  carbs: number
  proteins: number
  fats: number
  calories: number
  recipe_id: string | null
  amount: number
  measurement_type: string
  recipe: Recipe | null
}

export type Ingredient = {
  productId: string
  name: string
  carbs: number
  proteins: number
  fats: number
  calories: number
  recipeId: string | null
  amount: number
  measurementType: string
  recipe: Recipe | null
}

export type Ingredients = Array<{
  name: string
  carbs: number
  proteins: number
  fats: number
  calories: number
  amount: number
  ingredients: Array<Ingredient>
}>

export type CreateRecipeResponse = {
  name: string
  author_id: string
  ingredients: Array<IngredientResponse>
  steps?: Array<string>
  posible_allergies?: Array<NameSimpleResponse>
  recipe_types?: Array<NameSimpleResponse>
  picture_path?: string
  cooking_time: number
  total_carbs: number
  total_proteins: number
  total_fats: number
  total_calories: number
  is_ingredient: boolean
}

export type RecipeResponse = CreateRecipeResponse & { _id: string }

export type Recipe = {
  id: string
  name: string
  authorId: string | null
  ingredients: Array<Ingredient>
  steps: Array<string> | null
  posibleAllergies: Array<NameSimple> | null
  recipeTypes: Array<NameSimple> | null
  picturePath: string | null
  cookingTime: number
  totalCarbs: number
  totalProteins: number
  totalFats: number
  totalCalories: number
  isIngredient: boolean
}

export type CreateRecipeBody = {
  name: string
  authorId: string
  ingredients: Array<Ingredient> | []
  steps: Array<string> | []
  posibleAllergies: Array<NameSimple> | []
  recipeTypes: Array<NameSimple> | []
  picturePath: string | null
  cookingTime: number
  totalCarbs: number
  totalProteins: number
  totalFats: number
  totalCalories: number
  isIngredient: boolean
}

export type RecipeSimpleResponse = {
  _id: string
  name: string
  author_id: string
  recipe_types?: Array<NameSimpleResponse>
  picture_path?: string
  cooking_time: number
  total_carbs: number
  total_proteins: number
  total_fats: number
  total_calories: number
}

export type RecipeSimple = {
  id: string
  name: string
  authorId: string | null
  recipeTypes: Array<NameSimple> | null
  picturePath: string | null
  cookingTime: number
  totalCarbs: number
  totalProteins: number
  totalFats: number
  totalCalories: number
}

export type RecipeListResponse = {
  recipes: Array<RecipeSimpleResponse>
  current_page: number
  limit: number
  total_count: number
}

export type RecipeList = {
  recipes: Array<RecipeSimple>
  currentPage: number
  limit: number
  totalCount: number
}
