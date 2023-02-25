import {
  NameSimple,
  NameSimpleResponse,
  Product,
  ProductResponse,
  Recipe,
  RecipeResponse,
  User,
  UserResponse,
  UserSimple,
  UserSimpleResponse,
  Ingredient,
  IngredientResponse,
} from './types'

export const convertUserSimpleResponse = (resp: UserSimpleResponse): UserSimple => ({
  userId: resp._id,
  firstName: resp.first_name,
  lastMame: resp.last_name,
})

export const convertUserResponse = (resp: UserResponse): User => ({
  id: resp._id,
  firstName: resp.first_name,
  lastName: resp.last_name,
  password: resp.email,
  email: resp.email,
  allergies: resp?.allergies?.map((allergy) => convertNameSimpleResponse(allergy)) || [],
  diets: resp?.diets?.map((diet) => convertNameSimpleResponse(diet)) || [],
  favouriteRecipies: resp?.favourite_recipies?.map((recipe) => convertNameSimpleResponse(recipe)) || [],
  productAllergies: resp?.product_allergies?.map((allergy) => convertNameSimpleResponse(allergy)) || [],
})

export const convertNameSimpleResponse = (resp: NameSimpleResponse): NameSimple => ({
  id: resp._id,
  name: resp.name,
})

export const convertProductResponse = (resp: ProductResponse): Product => ({
  id: resp._id,
  name: resp.name,
  carbs: resp.carbs,
  proteins: resp.proteins,
  fats: resp.fats,
  calories: resp.calories,
  recipeId: resp.recipe_id || null,
})

export const convertIngredientResponse = (resp: IngredientResponse): Ingredient => ({
  productId: resp.product_id,
  name: resp.name,
  carbs: resp.carbs,
  proteins: resp.proteins,
  fats: resp.fats,
  calories: resp.calories,
  recipeId: resp.product_id || null,
  amount: resp.amount || 0,
  measurementType: resp.measurement_type || 'g',
})

export const convertRecipeResponse = (resp: RecipeResponse): Recipe => ({
  id: resp._id,
  name: resp.name,
  authorId: resp.author_id || 'default',
  ingredients: resp?.ingredients?.map((ingredient) => convertIngredientResponse(ingredient)) || [],
  steps: resp?.steps || [],
  posibleAllergies: resp?.posible_allergies?.map((allergy) => convertNameSimpleResponse(allergy)) || [],
  recipeTypes: resp?.recipe_types?.map((type) => convertNameSimpleResponse(type)) || [],
  picturePath: resp.picture_path || '',
  cookingTime: resp.cooking_time,
  totalCarbs: resp.total_carbs,
  totalProteins: resp.total_proteins,
  totalFats: resp.total_fats,
  totalCalories: resp.total_calories,
})
