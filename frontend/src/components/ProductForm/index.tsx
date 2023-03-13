import React, { FunctionComponent, useEffect, useState } from 'react'
import { InputProps, Product, Recipe } from '../../common/types'
import Input from '../../ui-components/Input'
import { StyledButtonsContainer } from '../../styles/RecipePage.styled'
import Button from '../../ui-components/Button'
import { StyledProductForm, StyledProductTitle, StyledHeader } from '../../styles/ProductForm.styled'
import { createProduct, updateProduct } from '../../api/products'
import LoadingScreen from '../LoadingScreen'
import { getRecipe } from '../../api/recipes'

type PecipeFormProps = {
  isNew: Boolean
  initialProductValues?: Product
  onClose: () => void
}

const initialValues: Product = {
  id: '',
  name: '',
  carbs: 0,
  proteins: 0,
  fats: 0,
  calories: 0,
  recipeId: null,
}

export const ProductForm: FunctionComponent<PecipeFormProps> = (props) => {
  const { isNew = true, onClose, initialProductValues = initialValues } = props
  const [isLoading, setLoading] = useState<boolean>(false)

  const [name, setName] = useState<InputProps<string>>({ value: '', error: '' })
  const [carbs, setCarbs] = useState<InputProps<string>>({
    value: '',
    error: '',
  })
  const [proteins, setProteins] = useState<InputProps<string>>({
    value: '',
    error: '',
  })
  const [fats, setFats] = useState<InputProps<string>>({
    value: '',
    error: '',
  })
  const [calories, setCalories] = useState<InputProps<string>>({
    value: '',
    error: '',
  })
  const [recipe, setRecipe] = useState<Recipe | null>(null)

  useEffect(() => {
    if (!isNew) {
      setName({ value: initialProductValues.name, error: '' })
      setCarbs({ value: initialProductValues.carbs.toString(), error: '' })
      setProteins({ value: initialProductValues.proteins.toString(), error: '' })
      setFats({ value: initialProductValues.fats.toString(), error: '' })
      setCalories({ value: initialProductValues.calories.toString(), error: '' })
    }
  }, [initialProductValues])

  const resetForm = () => {
    setName({ value: '', error: '' })
    setCarbs({ value: '', error: '' })
    setProteins({ value: '', error: '' })
    setFats({ value: '', error: '' })
    setCalories({ value: '', error: '' })
  }

  const validate = () => {
    !name.value && setName({ ...name, error: 'this field is required' })
    !carbs.value && setCarbs({ ...carbs, error: 'this field is required' })
    !proteins.value && setProteins({ ...proteins, error: 'this field is required' })
    !fats.value && setFats({ ...fats, error: 'this field is required' })
    !calories.value && setCalories({ ...calories, error: 'this field is required' })

    return !!name.value && !!carbs.value && !!proteins.value && !!fats.value && !!calories.value
  }

  const onSubmit = async () => {
    const isValid = validate()

    if (!isValid) {
      return
    } else {
      setLoading(true)
      const body = {
        ...initialProductValues,
        name: name.value,
        carbs: parseInt(carbs.value),
        proteins: parseInt(proteins.value),
        fats: parseInt(fats.value),
        calories: parseInt(calories.value),
      }
      if (isNew) {
        await createProduct(body)
      } else {
        await updateProduct(body)
      }
      setLoading(false)

      resetForm()
      onClose()
    }
  }

  const handleInputChange = (value: any, handleChange: any) => {
    const convertedValue = value.toString().replace(/^0+/, '')

    handleChange({ value: convertedValue, error: value ? '' : 'this field is required' })
  }

  const fetchRecipe = async (id: string) => {
    setLoading(true)
    setRecipe(await getRecipe(id))
    setLoading(false)
  }

  useEffect(() => {
    if (initialProductValues.recipeId) {
      fetchRecipe(initialProductValues.recipeId)
    }
  }, [initialProductValues.recipeId])

  return (
    <StyledProductForm>
      <StyledHeader>
        <span>{isNew ? 'new product' : 'edit product'}</span>
        <StyledButtonsContainer>
          <Button onClick={onSubmit}>save</Button>
        </StyledButtonsContainer>
      </StyledHeader>

      <>
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <>
            <StyledProductTitle>product name</StyledProductTitle>
            <Input
              type='text'
              value={name.value}
              onChange={(e) => handleInputChange(e.target.value, setName)}
              placeholder='name'
              errors={name.error}
            />

            <StyledProductTitle>carbs</StyledProductTitle>
            <Input
              type='number'
              placeholder='carbs'
              onChange={(e) => handleInputChange(e.target.valueAsNumber, setCarbs)}
              value={carbs.value}
              errors={carbs.error}
            />

            <StyledProductTitle>proteins</StyledProductTitle>
            <Input
              type='number'
              placeholder='proteins'
              onChange={(e) => handleInputChange(e.target.valueAsNumber, setProteins)}
              value={proteins.value}
              errors={proteins.error}
            />

            <StyledProductTitle>fats</StyledProductTitle>
            <Input
              type='number'
              placeholder='fats'
              onChange={(e) => handleInputChange(e.target.valueAsNumber, setFats)}
              value={fats.value}
              errors={fats.error}
            />

            <StyledProductTitle>calories</StyledProductTitle>
            <Input
              type='number'
              placeholder='calories'
              onChange={(e) => handleInputChange(e.target.valueAsNumber, setCalories)}
              value={calories.value}
              errors={calories.error}
            />

            {recipe && (
              <>
                <StyledProductTitle>recipe</StyledProductTitle>
                <a href={`/recipe/${recipe.id}`} target='_blank' rel='noreferrer'>
                  {recipe.name}
                </a>
              </>
            )}
          </>
        )}
      </>
    </StyledProductForm>
  )
}
