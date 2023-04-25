import React, { FunctionComponent, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Ingredient, InputProps, NameSimple, Product, Recipe } from '../../common/types'
import { Select } from '../../ui-components/Select'
import { LabelSelector } from '../../ui-components/LabelSelector'
import {
  StyledRecipeForm,
  PictureSection,
  RecipeTitle,
  SelectorRow,
  SelectorRowGroup,
  TextareaRow,
  TextareaRowButtons,
} from '../../styles/RecipeForm.styled'
import Input from '../../ui-components/Input'
import { StyledTextarea } from '../../styles/TextArea.styled'
import { recalculateIngredients } from '../../common/helpers'
import { ButtonsContainer, Header } from '../../styles/RecipePage.styled'
import Button from '../../ui-components/Button'
import Checkbox from '../../ui-components/Checkbox'
import Modal from '../../ui-components/Modal'
import { ProductForm } from '../ProductForm'
import { deleteProduct, getProducts } from '../../api/products'
import DeleteModal from '../DeleteModal'

type PecipeFormProps = {
  isNew: Boolean
  initialRecipeValues?: Recipe
  onFormSubmit: (values: Recipe) => void
  recipeTypes?: NameSimple[] | null
  products?: Product[] | null
  onCancel: () => void
}

const initialValues: Recipe = {
  name: '',
  ingredients: [],
  steps: [],
  recipeTypes: [],
  picturePath: '',
  cookingTime: 0,
  totalCarbs: 0,
  totalProteins: 0,
  totalFats: 0,
  totalCalories: 0,
  totalAmount: 0,
  id: '',
  authorId: null,
  posibleAllergies: null,
  isIngredient: false,
}

const initialIngredient: Ingredient = {
  productId: '',
  name: '',
  carbs: 0,
  proteins: 0,
  fats: 0,
  calories: 0,
  recipeId: null,
  amount: 0,
  measurementType: 'g',
  recipe: null,
}

export const RecipeForm: FunctionComponent<PecipeFormProps> = (props) => {
  const {
    isNew = true,
    recipeTypes = [],
    onFormSubmit,
    products = [],
    initialRecipeValues = initialValues,
    onCancel,
  } = props

  const [name, setName] = useState<InputProps<string>>({ value: initialRecipeValues.name || '', error: '' })
  const [ingredients, setIngredients] = useState<InputProps<Array<Ingredient>>>({
    value: initialRecipeValues.ingredients || [],
    error: '',
  })
  const [steps, setSteps] = useState<InputProps<Array<string>>>({
    value: initialRecipeValues.steps || [],
    error: '',
  })
  const [stepHeights, setStepHeights] = useState<Array<number>>([])
  const [selectedRecipeTypes, setSelectedRecipeTypes] = useState<Array<NameSimple> | null>(
    initialRecipeValues.recipeTypes
  )
  const [cookingTime, setCookingTime] = useState<InputProps<number>>({
    value: initialRecipeValues.cookingTime || 0,
    error: '',
  })
  const [picturePath, setPicturePath] = useState<string | null>(initialRecipeValues.picturePath)
  const [isIngredient, setIsIngredient] = useState<boolean>(initialRecipeValues.isIngredient)

  const [open, setOpen] = useState<boolean>(false)
  const [editProduct, setEditProduct] = useState<Product | undefined>(undefined)
  const [deleteProductId, setDeleteProductId] = useState<string | null>(null)

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': [] },
    maxFiles: 1,
    maxSize: 2097152,
  })

  useEffect(() => {
    setPicturePath(acceptedFiles[0]?.name)
  }, [acceptedFiles])

  const validate = () => {
    !name.value && setName({ ...name, error: 'this field is required' })
    !cookingTime.value && setCookingTime({ ...cookingTime, error: 'this field is required' })

    return !!name.value && !!cookingTime.value
  }

  const onSubmit = async () => {
    const isValid = validate()

    if (!isValid) {
      return
    } else {
      onFormSubmit({
        ...initialRecipeValues,
        name: name.value,
        ingredients: recalculateIngredients(ingredients.value),
        steps: steps.value.filter((step) => step.length > 0),
        recipeTypes: selectedRecipeTypes,
        picturePath: picturePath || initialRecipeValues.picturePath,
        cookingTime: cookingTime.value,
        isIngredient,
      })
    }
  }

  const handleProductSelect = (product: Product, index: number) => {
    if (ingredients.value && product) {
      const updatedIngredient = {
        ...ingredients.value[index],
        productId: product?.id,
        name: product?.name,
        carbs: product?.carbs,
        proteins: product?.proteins,
        fats: product?.fats,
        calories: product?.calories,
        recipeId: product?.recipeId,
        measurementType: 'g',
      }
      const updatedIngredients = ingredients.value
      updatedIngredients[index] = updatedIngredient

      setIngredients({ value: updatedIngredients, error: '' })
    }
  }

  const handleAmountChange = (amount: number, index: number) => {
    if (ingredients.value[index].productId) {
      const updatedIngredient = {
        ...ingredients.value[index],
        amount: amount,
      }
      const updatedIngredients = ingredients.value
      updatedIngredients[index] = updatedIngredient

      setIngredients({ value: updatedIngredients, error: '' })
    }
  }

  const handleStepChange = (step: string, index: number, height: number) => {
    if (steps.value) {
      const updatedSteps = steps.value
      updatedSteps[index] = step

      const updatedStepHeights = stepHeights
      updatedStepHeights[index] = height

      setSteps({ value: updatedSteps, error: '' })
      setStepHeights(updatedStepHeights)
    }
  }

  const handleInputChange = (value: any, handleChange: any) => {
    handleChange({ value, error: value ? '' : 'this field is required' })
  }

  const handleInsert = (value: any, array: any, index: number, handleChange: any) => {
    array.length++
    array.copyWithin(index + 1, index)
    array[index] = value

    handleChange({ value: array, error: '' })
  }

  const handleRemove = (array: any, index: number, handleChange: any) => {
    handleChange({ value: array.filter((item: any, i: number) => i !== index && item), error: '' })
  }

  const handleDelete = async () => {
    if (deleteProductId) {
      await deleteProduct(deleteProductId)
      setDeleteProductId(null)
    }
  }

  return (
    <>
      <Header>
        <span>{isNew ? 'new recipe' : 'edit recipe'}</span>
        <ButtonsContainer>
          <Button onClick={onCancel}>cancel</Button>
          <Button onClick={onSubmit}>save</Button>
        </ButtonsContainer>
      </Header>
      <StyledRecipeForm>
        <RecipeTitle>recipe name</RecipeTitle>
        <Input
          type='text'
          value={name.value}
          onChange={(e) => handleInputChange(e.target.value, setName)}
          placeholder='name'
          errors={name.error}
        />

        <RecipeTitle>ingredients</RecipeTitle>
        <>
          {ingredients && ingredients.value.length > 0 ? (
            ingredients.value.map((ingredient: Ingredient, index: number) => (
              <SelectorRow key={index}>
                <Select<Product>
                  options={products || []}
                  onSelect={(product) => handleProductSelect(product, index)}
                  selected={ingredient.name}
                  withSearch
                  withAddButton
                  onAdd={() => setOpen(true)}
                  withButtons
                  onEdit={(product) => setEditProduct(product)}
                  onDelete={(id) => setDeleteProductId(id)}
                  getOptions={getProducts}
                  arrayName={'products'}
                />
                <SelectorRowGroup>
                  <Input
                    type='number'
                    placeholder='amount'
                    onChange={(e) => handleAmountChange(e.target.valueAsNumber, index)}
                    value={ingredients.value[index].amount || ''}
                    disabled={!ingredients.value[index].productId}
                  />

                  <Button onClick={() => handleRemove(ingredients.value, index, setIngredients)}>-</Button>
                  {index === ingredients.value.length - 1 && (
                    <Button
                      onClick={() => handleInsert(initialIngredient, ingredients.value, index + 1, setIngredients)}
                    >
                      +
                    </Button>
                  )}
                </SelectorRowGroup>
              </SelectorRow>
            ))
          ) : (
            <Button onClick={() => handleInsert(initialIngredient, ingredients.value, 0, setIngredients)}>+</Button>
          )}
        </>

        <RecipeTitle>steps</RecipeTitle>
        <>
          {steps && steps.value.length > 0 ? (
            steps.value.map((step: string, index: number) => (
              <TextareaRow key={index}>
                <StyledTextarea
                  placeholder='step'
                  onChange={(e) => handleStepChange(e.target.value, index, e.target.scrollHeight)}
                  value={step || ''}
                  height={stepHeights[index] * 0.063}
                />

                <TextareaRowButtons>
                  <Button onClick={() => handleRemove(steps.value, index, setSteps)}>-</Button>
                  {index === steps.value.length - 1 && (
                    <Button onClick={() => handleInsert('', steps.value, index + 1, setSteps)}>+</Button>
                  )}
                </TextareaRowButtons>
              </TextareaRow>
            ))
          ) : (
            <Button onClick={() => handleInsert('', steps.value, 0, setSteps)}>+</Button>
          )}
        </>

        <RecipeTitle>recipe types</RecipeTitle>
        <LabelSelector
          options={recipeTypes || []}
          onSelect={setSelectedRecipeTypes}
          selected={selectedRecipeTypes}
          isEdit
        />

        <RecipeTitle>cooking time</RecipeTitle>
        <Input
          type='number'
          placeholder='cooking time'
          onChange={(e) => handleInputChange(e.target.valueAsNumber, setCookingTime)}
          value={cookingTime.value}
          errors={cookingTime.error}
        />

        <RecipeTitle>picture</RecipeTitle>
        <PictureSection>
          <div {...getRootProps({ className: 'dropzone disabled' })}>
            <input {...getInputProps()} />
            <span>drag 'n' drop some files here, or click to select files</span>
          </div>
          {picturePath && <span>{`file: ${picturePath}`}</span>}
        </PictureSection>

        <Checkbox
          label={'it could be an ingredient'}
          checked={isIngredient}
          onChange={() => setIsIngredient(!isIngredient)}
        />
      </StyledRecipeForm>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ProductForm isNew onClose={() => setOpen(false)} />
      </Modal>
      <Modal open={!!editProduct} onClose={() => setEditProduct(undefined)}>
        <ProductForm isNew={false} onClose={() => setEditProduct(undefined)} initialProductValues={editProduct} />
      </Modal>
      <DeleteModal open={!!deleteProductId} onClose={() => setDeleteProductId(null)} onDelete={handleDelete} />
    </>
  )
}
