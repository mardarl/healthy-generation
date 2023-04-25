import React, { FunctionComponent, useEffect, useState } from 'react'
import { InputProps, Product, Recipe } from '../../common/types'
import Input from '../../ui-components/Input'
import { ButtonsContainer } from '../../styles/RecipePage.styled'
import Button from '../../ui-components/Button'
import { StyledProductForm, ProductTitle, Header } from '../../styles/ProductForm.styled'
import { createProduct, updateProduct } from '../../api/products'
import LoadingScreen from '../LoadingScreen'
import { getRecipe } from '../../api/recipes'
import { useMutation, useQuery } from 'react-query'
import { useAPIError } from '../../common/hooks/useAPIError'

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
  const { addError } = useAPIError()

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
  const {
    data: recipe,
    isLoading: isRecipeLoading,
    refetch,
  } = useQuery<Recipe | null>([['recipe']], async () =>
    initialProductValues.recipeId ? await getRecipe(initialProductValues.recipeId) : null
  )

  const { mutateAsync: create, isLoading: isCreateLoading } = useMutation({
    mutationFn: createProduct,
    onError: (err: Error) => addError(err?.message),
  })
  const { mutateAsync: update, isLoading: isUpdateLoading } = useMutation({
    mutationFn: updateProduct,
    onError: (err: Error) => addError(err?.message),
  })

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
      const body = {
        ...initialProductValues,
        name: name.value,
        carbs: parseInt(carbs.value),
        proteins: parseInt(proteins.value),
        fats: parseInt(fats.value),
        calories: parseInt(calories.value),
      }
      if (isNew) {
        await create(body)
      } else {
        await update(body)
      }

      resetForm()
      onClose()
    }
  }

  const handleInputChange = (value: any, handleChange: any) => {
    const convertedValue = value.toString().replace(/^0+/, '')

    handleChange({ value: convertedValue, error: value ? '' : 'this field is required' })
  }

  useEffect(() => {
    if (initialProductValues.recipeId) {
      refetch()
    }
  }, [initialProductValues])

  useEffect(() => {
    setLoading(isRecipeLoading || isCreateLoading || isUpdateLoading)
  }, [isRecipeLoading, isCreateLoading, isUpdateLoading])

  return (
    <StyledProductForm>
      <Header>
        <span>{isNew ? 'new product' : 'edit product'}</span>
        <ButtonsContainer>
          <Button onClick={onSubmit}>save</Button>
        </ButtonsContainer>
      </Header>

      <>
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <>
            <ProductTitle>product name</ProductTitle>
            <Input
              type='text'
              value={name.value}
              onChange={(e) => handleInputChange(e.target.value, setName)}
              placeholder='name'
              errors={name.error}
            />

            <ProductTitle>carbs</ProductTitle>
            <Input
              type='number'
              placeholder='carbs'
              onChange={(e) => handleInputChange(e.target.valueAsNumber, setCarbs)}
              value={carbs.value}
              errors={carbs.error}
            />

            <ProductTitle>proteins</ProductTitle>
            <Input
              type='number'
              placeholder='proteins'
              onChange={(e) => handleInputChange(e.target.valueAsNumber, setProteins)}
              value={proteins.value}
              errors={proteins.error}
            />

            <ProductTitle>fats</ProductTitle>
            <Input
              type='number'
              placeholder='fats'
              onChange={(e) => handleInputChange(e.target.valueAsNumber, setFats)}
              value={fats.value}
              errors={fats.error}
            />

            <ProductTitle>calories</ProductTitle>
            <Input
              type='number'
              placeholder='calories'
              onChange={(e) => handleInputChange(e.target.valueAsNumber, setCalories)}
              value={calories.value}
              errors={calories.error}
            />

            {recipe && !isNew && (
              <>
                <ProductTitle>recipe</ProductTitle>
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
