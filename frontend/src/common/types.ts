export type LoginBody = {
  email: string
  password: string
}

export type LoginResponse = {
  token: string
  user: UserSimpleResponse
}

export type UserSimpleResponse = {
  _id: string
  first_name: string
  last_name: string
}

export type UserSimple = {
  id: string
  firstName: string
  lastMame: string
}

export type NameSimpleResponse = {
  _id: string
  name: string
}

export type NameSimple = {
  id: string
  name: string
}

export type AllergiesListResponse = {
  allergies: Array<NameSimpleResponse>
}

export type UserResponse = {
  _id: string
  first_name: string
  last_name: string
  password: string
  email: string
  allergies?: Array<NameSimpleResponse>
  diets?: Array<NameSimpleResponse>
  favourite_recipies?: Array<NameSimpleResponse>
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
  favouriteRecipies: Array<NameSimple> | null
  productAllergies: Array<NameSimple> | null
}

export type ProductResponse = {
  _id: string
  name: string
  carbs: number
  proteins: number
  fats: number
  calories: number
  recipe_id?: string
}

export type Product = {
  id: string
  name: string
  carbs: number
  proteins: number
  fats: number
  calories: number
  recipeId: string | null
}

export type ProductListResponse = {
  products: Array<ProductResponse>
  current_page: number
  limit: number
  total_count: number
}

export type IngredientResponse = {
  product_id: string
  name: string
  carbs: number
  proteins: number
  fats: number
  calories: number
  recipeId?: string
  amount: number
  measurement_type: string
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
}

export type RecipeResponse = {
  _id: string
  name: string
  author_id: string
  ingredients?: Array<IngredientResponse>
  steps?: Array<string>
  posible_allergies?: Array<NameSimpleResponse>
  recipe_types?: Array<NameSimpleResponse>
  picture_path?: string
  cooking_time: number
  total_carbs: number
  total_proteins: number
  total_fats: number
  total_calories: number
}

export type Recipe = {
  id: string
  name: string
  authorId: string | null
  ingredients?: Array<Ingredient> | null
  steps: Array<string> | null
  posibleAllergies: Array<NameSimple> | null
  recipeTypes: Array<NameSimple> | null
  picturePath: string | null
  cookingTime: number
  totalCarbs: number
  totalProteins: number
  totalFats: number
  totalCalories: number
}

export type RecipeListResponse = {
  recipes: Array<RecipeResponse>
  current_page: number
  limit: number
  total_count: number
}
