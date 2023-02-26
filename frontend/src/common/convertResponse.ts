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
  id: resp._id,
  firstName: resp.first_name,
  lastMame: resp.last_name,
})

export const convertUserResponse = (resp: UserResponse): User => ({
  id: resp._id,
  firstName: resp.first_name,
  lastName: resp.last_name,
  password: resp.password,
  email: resp.email,
  allergies: resp?.allergies?.map((allergy) => convertNameSimpleResponse(allergy)) || [],
  diets: resp?.diets?.map((diet) => convertNameSimpleResponse(diet)) || [],
  favouriteRecipies: resp?.favourite_recipies?.map((recipe) => convertNameSimpleResponse(recipe)) || [],
  productAllergies: resp?.product_allergies?.map((allergy) => convertNameSimpleResponse(allergy)) || [],
})

export const convertUserRequest = (req: User): UserResponse => ({
  _id: req.id,
  first_name: req.firstName,
  last_name: req.lastName,
  password: req.password,
  email: req.email,
  allergies: req?.allergies?.map((allergy) => convertNameSimpleRequest(allergy)) || [],
  diets: req?.diets?.map((diet) => convertNameSimpleRequest(diet)) || [],
  favourite_recipies: req?.favouriteRecipies?.map((recipe) => convertNameSimpleRequest(recipe)) || [],
  product_allergies: req?.productAllergies?.map((allergy) => convertNameSimpleRequest(allergy)) || [],
})

export const convertNameSimpleResponse = (resp: NameSimpleResponse): NameSimple => ({
  id: resp._id,
  name: resp.name,
})

export const convertNameSimpleRequest = (resp: NameSimple): NameSimpleResponse => ({
  _id: resp.id,
  name: resp.name,
})

export const convertNameSimpleListResponse = (resp: Array<NameSimpleResponse>): Array<NameSimple> =>
  resp.map((item) => convertNameSimpleResponse(item))

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
