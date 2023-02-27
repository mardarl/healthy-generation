import React, { FunctionComponent, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik'
import * as yup from 'yup'
import { Ingredient, NameSimple, Product, Recipe } from '../../common/types'
import { LabelSelect } from '../../ui-components/LableSelector'
import { Select } from '../../ui-components/Select'

type PecipeFormProps = {
  isNew: Boolean
  initialRecipeValues?: Recipe
  onFormSubmit: (values: Recipe) => void
  recipeTypes: NameSimple[]
  products: Product[]
}

const recipeSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  ingredients: yup.array().of(
    yup.object().shape({
      productId: yup.string(),
      name: yup.string(),
      carbs: yup.number(),
      proteins: yup.number(),
      fats: yup.number(),
      calories: yup.number(),
      amount: yup.number(),
      measurementType: yup.string(),
    })
  ),
  steps: yup.array().of(yup.string()),
  recipeTypes: yup.array().of(
    yup.object().shape({
      id: yup.string(),
      name: yup.string(),
    })
  ),
  picturePath: yup.string(),
  cookingTime: yup.number().required('Cooking time is required'),
})

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

export const RecipeForm: FunctionComponent<PecipeFormProps> = (props) => {
  const { isNew = true, recipeTypes, onFormSubmit, products, initialRecipeValues = initialValues } = props
  const [selecteRecipeTypes, setSelectedRecipeTypes] = useState<Array<NameSimple> | null>(
    initialRecipeValues.recipeTypes
  )

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': [] },
    maxFiles: 1,
    maxSize: 2097152,
  })

  const files = acceptedFiles.map((file) => (
    <li key={file.name}>
      {file.name} - {file.size} bytes
    </li>
  ))

  const onSubmit = async (values: Recipe) => {
    const allValues = {
      ...values,
      picturePath: acceptedFiles[0]?.name || values.picturePath,
      recipeTypes: selecteRecipeTypes,
    }
    onFormSubmit(allValues)
  }

  const handleProductSelect = (id: string, index: number, values: Recipe, handleChange: any) => {
    const product = products.find((item) => item.id === id)
    if (values.ingredients && product) {
      const updatedIngredient = {
        ...values.ingredients[index],
        productId: product?.id,
        name: product?.name,
        carbs: product?.carbs,
        proteins: product?.proteins,
        fats: product?.fats,
        calories: product?.calories,
        recipeId: null,
        measurementType: 'g',
      }
      const updatedIngredients = values.ingredients
      updatedIngredients[index] = updatedIngredient

      handleChange({ ...values, ingredients: updatedIngredients })
    }
  }

  const handleAmountChange = (amount: number, index: number, values: Recipe, handleChange: any) => {
    const product = products.find((item) => item.id === values.ingredients[index].productId)
    if (values.ingredients && amount && product) {
      const updatedIngredient = {
        ...values.ingredients[index],
        carbs: (product?.carbs * amount) / 100,
        proteins: (product.proteins * amount) / 100,
        fats: (product.fats * amount) / 100,
        calories: (product.calories * amount) / 100,
        amount: amount,
      }
      const updatedIngredients = values.ingredients
      updatedIngredients[index] = updatedIngredient

      handleChange({ ...values, ingredients: updatedIngredients })
    }
  }

  return (
    <Formik
      initialValues={isNew ? initialValues : initialRecipeValues}
      onSubmit={onSubmit}
      validationSchema={recipeSchema}
    >
      {({ isSubmitting, values, handleChange }: any) => (
        <Form>
          <p>recipe name</p>
          <Field type='text' name='name' placeholder='Name' />
          <ErrorMessage name='name' />

          <p>ingredients</p>
          <FieldArray name='ingredients'>
            {(arrayHelpers: any) => (
              <div>
                {values.ingredients.length ? (
                  values.ingredients.map((ingredient: Ingredient, index: number) => (
                    <div key={index}>
                      <Select
                        options={products}
                        onSelect={(id) => handleProductSelect(id, index, values, handleChange)}
                        selected={ingredient.name}
                      />
                      <Field
                        type='number'
                        name={`ingredients.${index}.amount`}
                        placeholder='Amount'
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleAmountChange(e.target.valueAsNumber, index, values, handleChange)
                        }
                        value={values.ingredients[index].amount || ''}
                      />

                      <button type='button' onClick={() => arrayHelpers.remove(index)}>
                        -
                      </button>
                      {index === values.ingredients.length - 1 && (
                        <button type='button' onClick={() => arrayHelpers.insert(index + 1, '')}>
                          +
                        </button>
                      )}
                    </div>
                  ))
                ) : (
                  <button type='button' onClick={() => arrayHelpers.insert(0, '')}>
                    +
                  </button>
                )}
              </div>
            )}
          </FieldArray>

          <p>steps</p>
          <FieldArray name='steps'>
            {(arrayHelpers: any) => (
              <div>
                {values.steps.length ? (
                  values.steps.map((_step: any, index: number) => (
                    <div key={index}>
                      <Field type='text' name={`steps.${index}`} placeholder='Step' />
                      <ErrorMessage name={`steps.${index}`} />

                      <button type='button' onClick={() => arrayHelpers.remove(index)}>
                        -
                      </button>
                      {index === values.steps.length - 1 && (
                        <button type='button' onClick={() => arrayHelpers.insert(index + 1, '')}>
                          +
                        </button>
                      )}
                    </div>
                  ))
                ) : (
                  <button type='button' onClick={() => arrayHelpers.insert(0, '')}>
                    +
                  </button>
                )}
              </div>
            )}
          </FieldArray>

          <p>recipe types</p>
          <LabelSelect
            options={recipeTypes || []}
            onSelect={setSelectedRecipeTypes}
            selected={selecteRecipeTypes}
            isEdit
          />

          <p>picture</p>
          <section className='container'>
            <div {...getRootProps({ className: 'dropzone disabled' })}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            <aside>
              <h4>Files</h4>
              <ul>{files}</ul>
            </aside>
          </section>

          <p>cooking time</p>
          <Field type='number' name='cookingTime' placeholder='Cooking Time' value={values.cookingTime || ''} />
          <ErrorMessage name='cookingTime' />

          <button type='submit' disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  )
}
