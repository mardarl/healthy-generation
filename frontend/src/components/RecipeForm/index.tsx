import React, { FunctionComponent, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Ingredient, NameSimple, Product, Recipe } from '../../common/types'
import { Select } from '../../ui-components/Select'
import { LabelSelector } from '../../ui-components/LabelSelector'
import {
  StyledPictureSection,
  StyledRecipeForm,
  StyledRecipeTitle,
  StyledSelectorRow,
} from '../../styles/RecipeForm.styled'
import Input from '../../ui-components/Input'
import { StyledTextarea } from '../../styles/TextArea.styled'
import { recalculateIngredients } from '../../common/helpers'
import { StyledButtonsContainer, StyledHeader } from '../../styles/RecipePage.styled'
import Button from '../../ui-components/Button'

type PecipeFormProps = {
  isNew: Boolean
  initialRecipeValues?: Recipe
  onFormSubmit: (values: Recipe) => void
  recipeTypes: NameSimple[]
  products: Product[]
  onCancel: () => void
}

type InputProps<T> = {
  value: T
  error?: string
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
  id: '',
  authorId: null,
  posibleAllergies: null,
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
}

export const RecipeForm: FunctionComponent<PecipeFormProps> = (props) => {
  const { isNew = true, recipeTypes, onFormSubmit, products, initialRecipeValues = initialValues, onCancel } = props

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
      })
    }
  }

  const handleProductSelect = (id: string, index: number) => {
    const product = products.find((item) => item.id === id)
    if (ingredients.value && product) {
      const updatedIngredient = {
        ...ingredients.value[index],
        productId: product?.id,
        name: product?.name,
        carbs: product?.carbs,
        proteins: product?.proteins,
        fats: product?.fats,
        calories: product?.calories,
        recipeId: null,
        measurementType: 'g',
      }
      const updatedIngredients = ingredients.value
      updatedIngredients[index] = updatedIngredient

      setIngredients({ value: updatedIngredients, error: '' })
    }
  }

  const handleAmountChange = (amount: number, index: number) => {
    const product = products.find((item) => item.id === ingredients.value[index].productId)
    if (ingredients.value && amount && product) {
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

  return (
    <>
      <StyledHeader>
        <span>{isNew ? 'new recipe' : 'edit recipe'}</span>
        <StyledButtonsContainer>
          <Button onClick={onCancel}>cancel</Button>
          <Button onClick={onSubmit}>save</Button>
        </StyledButtonsContainer>
      </StyledHeader>
      <StyledRecipeForm>
        <StyledRecipeTitle>recipe name</StyledRecipeTitle>
        <Input
          type='text'
          value={name.value}
          onChange={(e) => handleInputChange(e.target.value, setName)}
          placeholder='name'
          errors={name.error}
        />

        <StyledRecipeTitle>ingredients</StyledRecipeTitle>
        <>
          {ingredients && ingredients.value.length > 0 ? (
            ingredients.value.map((ingredient: Ingredient, index: number) => (
              <StyledSelectorRow key={index}>
                <Select
                  options={products}
                  onSelect={(id) => handleProductSelect(id, index)}
                  selected={ingredient.productId}
                />
                <Input
                  type='number'
                  placeholder='amount'
                  onChange={(e) => handleAmountChange(e.target.valueAsNumber, index)}
                  value={ingredients.value[index].amount || ''}
                />

                <Button onClick={() => handleRemove(ingredients.value, index, setIngredients)}>-</Button>
                {index === ingredients.value.length - 1 && (
                  <Button onClick={() => handleInsert(initialIngredient, ingredients.value, index + 1, setIngredients)}>
                    +
                  </Button>
                )}
              </StyledSelectorRow>
            ))
          ) : (
            <Button onClick={() => handleInsert(initialIngredient, ingredients.value, 0, setIngredients)}>+</Button>
          )}
        </>

        <StyledRecipeTitle>steps</StyledRecipeTitle>
        <>
          {steps && steps.value.length > 0 ? (
            steps.value.map((step: string, index: number) => (
              <StyledSelectorRow key={index}>
                <StyledTextarea
                  placeholder='step'
                  onChange={(e) => handleStepChange(e.target.value, index, e.target.scrollHeight)}
                  value={step || ''}
                  height={stepHeights[index]}
                />

                <Button onClick={() => handleRemove(steps.value, index, setSteps)}>-</Button>
                {index === steps.value.length - 1 && (
                  <Button onClick={() => handleInsert('', steps.value, index + 1, setSteps)}>+</Button>
                )}
              </StyledSelectorRow>
            ))
          ) : (
            <Button onClick={() => handleInsert('', steps.value, 0, setSteps)}>+</Button>
          )}
        </>

        <StyledRecipeTitle>recipe types</StyledRecipeTitle>
        <LabelSelector
          options={recipeTypes || []}
          onSelect={setSelectedRecipeTypes}
          selected={selectedRecipeTypes}
          isEdit
        />

        <StyledRecipeTitle>cooking time</StyledRecipeTitle>
        <Input
          type='number'
          placeholder='cooking time'
          onChange={(e) => handleInputChange(e.target.valueAsNumber, setCookingTime)}
          value={cookingTime.value}
          errors={cookingTime.error}
        />

        <StyledRecipeTitle>picture</StyledRecipeTitle>
        <StyledPictureSection>
          <div {...getRootProps({ className: 'dropzone disabled' })}>
            <input {...getInputProps()} />
            <span>drag 'n' drop some files here, or click to select files</span>
          </div>
          {picturePath && <span>{`file: ${picturePath}`}</span>}
        </StyledPictureSection>
      </StyledRecipeForm>
    </>
  )
}
