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
  RecipeSimple,
  RecipeSimpleResponse,
  RecipeListResponse,
  RecipeList,
  CreateRecipeBody,
  CreateRecipeResponse,
  CreateProductBody,
  CreateProductResponse,
  ProductListResponse,
  ProductList,
} from './types'

export const convertUserSimpleResponse = (resp: UserSimpleResponse | UserResponse): UserSimple => ({
  id: resp._id,
  firstName: resp.first_name,
  lastName: resp.last_name,
  favouriteRecipes: resp.favourite_recipes || [],
})

export const convertUserToUserSimple = (resp: User): UserSimple => ({
  id: resp.id,
  firstName: resp.firstName,
  lastName: resp.lastName,
  favouriteRecipes: resp.favouriteRecipes || [],
})

export const convertUserResponse = (resp: UserResponse): User => ({
  id: resp._id,
  firstName: resp.first_name,
  lastName: resp.last_name,
  password: resp.password,
  email: resp.email,
  allergies: resp?.allergies?.map((allergy) => convertNameSimpleResponse(allergy)) || [],
  diets: resp?.diets?.map((diet) => convertNameSimpleResponse(diet)) || [],
  favouriteRecipes: resp.favourite_recipes || [],
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
  favourite_recipes: req.favouriteRecipes || [],
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

export const convertCreateProductRequest = (req: CreateProductBody): CreateProductResponse => ({
  name: req.name,
  carbs: req.carbs,
  proteins: req.proteins,
  fats: req.fats,
  calories: req.calories,
  recipe_id: req.recipeId || null,
})

export const convertProductRequest = (req: Product): ProductResponse => ({
  _id: req.id,
  name: req.name,
  carbs: req.carbs,
  proteins: req.proteins,
  fats: req.fats,
  calories: req.calories,
  recipe_id: req.recipeId || null,
})

export const convertProductListResponse = (resp: ProductListResponse): ProductList => ({
  products: resp.products.map((product) => convertProductResponse(product)) || [],
  currentPage: resp.current_page,
  limit: resp.limit,
  totalCount: resp.total_count,
})

export const convertIngredientResponse = (resp: IngredientResponse): Ingredient => ({
  productId: resp.product_id,
  name: resp.name,
  carbs: resp.carbs,
  proteins: resp.proteins,
  fats: resp.fats,
  calories: resp.calories,
  recipeId: resp.recipe_id || null,
  amount: resp.amount || 0,
  measurementType: resp.measurement_type || 'g',
  recipe: resp.recipe || null,
})

export const convertIngredientRequest = (req: Ingredient): IngredientResponse => ({
  product_id: req.productId,
  name: req.name,
  carbs: req.carbs,
  proteins: req.proteins,
  fats: req.fats,
  calories: req.calories,
  recipe_id: req.recipeId,
  amount: req.amount || 0,
  measurement_type: req.measurementType || 'g',
  recipe: null,
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
  isIngredient: resp.is_ingredient,
})

export const convertRecipeRequest = (req: Recipe): RecipeResponse => ({
  _id: req.id,
  name: req.name,
  author_id: req.authorId || 'default',
  ingredients: req?.ingredients?.map((ingredient) => convertIngredientRequest(ingredient)) || [],
  steps: req?.steps || [],
  posible_allergies: req?.posibleAllergies?.map((allergy) => convertNameSimpleRequest(allergy)) || [],
  recipe_types: req?.recipeTypes?.map((type) => convertNameSimpleRequest(type)) || [],
  picture_path: req.picturePath || '',
  cooking_time: req.cookingTime,
  total_carbs: req.totalCarbs,
  total_proteins: req.totalProteins,
  total_fats: req.totalFats,
  total_calories: req.totalCalories,
  is_ingredient: req.isIngredient,
})

export const convertCreateRecipeRequest = (req: CreateRecipeBody): CreateRecipeResponse => ({
  name: req.name,
  author_id: req.authorId || 'default',
  ingredients: req?.ingredients?.map((ingredient) => convertIngredientRequest(ingredient)) || [],
  steps: req?.steps || [],
  posible_allergies: req?.posibleAllergies?.map((allergy) => convertNameSimpleRequest(allergy)) || [],
  recipe_types: req?.recipeTypes?.map((type) => convertNameSimpleRequest(type)) || [],
  picture_path: req.picturePath || '',
  cooking_time: req.cookingTime,
  total_carbs: req.totalCarbs || 0,
  total_proteins: req.totalProteins || 0,
  total_fats: req.totalFats || 0,
  total_calories: req.totalCalories || 0,
  is_ingredient: req.isIngredient,
})

export const convertRecipeSimpleResponse = (resp: RecipeSimpleResponse): RecipeSimple => ({
  id: resp._id,
  name: resp.name,
  authorId: resp.author_id || 'default',
  recipeTypes: resp?.recipe_types?.map((type) => convertNameSimpleResponse(type)) || [],
  picturePath: resp.picture_path || '',
  cookingTime: resp.cooking_time,
  totalCarbs: resp.total_carbs,
  totalProteins: resp.total_proteins,
  totalFats: resp.total_fats,
  totalCalories: resp.total_calories,
})

export const convertRecipeListResponse = (resp: RecipeListResponse): RecipeList => ({
  recipes: resp.recipes.map((recipe) => convertRecipeSimpleResponse(recipe)),
  currentPage: resp.current_page,
  limit: resp.limit,
  totalCount: resp.total_count,
})
