import React, { FunctionComponent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllergies } from '../../api/allergies'
import { getDiets } from '../../api/diets'
import { changeUserPassword, updateUser } from '../../api/users'
import { NameSimple, User } from '../../common/types'
import LoadingScreen from '../../components/LoadingScreen'
import { RoutePaths } from '../../routes/routePaths'
import { StyledLabel } from '../../styles/Input.styled'
import {
  StyledButtonsContainer,
  StyledHeader,
  StyledProfilePage,
  StyledProfilePageContent,
} from '../../styles/ProfilePage.styled'
import Button from '../../ui-components/Button'
import Input from '../../ui-components/Input'
import { LabelSelector } from '../../ui-components/LabelSelector'
import { useUser } from '../../common/hooks/useUser'
import { useMutation, useQuery } from 'react-query'
import { useAPIError } from '../../common/hooks/useAPIError'

type PasswordFields = {
  newPassword: string
  repeatPassword: string
  error: string
}

const ProfilePage: FunctionComponent = () => {
  const navigate = useNavigate()
  const { user, setUser } = useUser()
  const { addError } = useAPIError()

  const [isLoading, setLoading] = useState<boolean>(false)
  const [selectedAllergies, setSelectedAllergies] = useState<Array<NameSimple> | null>(null)
  const [selectedDiets, setSelectedDiets] = useState<Array<NameSimple> | null>(null)
  const [newUserData, setNewUserData] = useState<User | null>(null)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [isChangePassword, setIsChangePassword] = useState<boolean>(false)
  const [password, setPassword] = useState<PasswordFields>({ newPassword: '', repeatPassword: '', error: '' })

  const { data: allergies, isLoading: isAllergiesLoading } = useQuery<Array<NameSimple> | null>(
    ['allergies'],
    async () => await getAllergies()
  )
  const { data: diets, isLoading: isDietsLoading } = useQuery<Array<NameSimple> | null>(
    ['diets'],
    async () => await getDiets()
  )

  const { mutateAsync: changePassword, isLoading: isChangeLoading } = useMutation({
    mutationFn: changeUserPassword,
    onError: (err: Error) => addError(err?.message),
  })
  const { mutateAsync: update, isLoading: isUpdateLoading } = useMutation({
    mutationFn: updateUser,
    onError: (err: Error) => addError(err?.message),
  })

  const setUserData = (data: User) => {
    setUser(data)
    setNewUserData(data)
    setSelectedAllergies(data.allergies)
    setSelectedDiets(data.diets)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    navigate(RoutePaths.LOGIN)
  }

  const handleEditChange = () => {
    if (user && isEdit) {
      setUserData(user)
    }
    setIsEdit(!isEdit)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const value = e.target.value
    newUserData && setNewUserData({ ...newUserData, [field]: value })
  }

  const handleSave = async () => {
    if (newUserData) {
      setUserData(
        await update({
          ...newUserData,
          allergies: selectedAllergies,
          diets: selectedDiets,
        })
      )
      setIsEdit(false)
    }
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const value = e.target.value
    setPassword({ ...password, [field]: value })
  }

  const handlePasswordChangeTrigger = () => {
    setPassword({ newPassword: '', repeatPassword: '', error: '' })
    setIsChangePassword(!isChangePassword)
  }

  const handlePasswordSave = async () => {
    if (user) {
      setUserData(
        await changePassword({
          id: user?.id,
          password: password.newPassword,
        })
      )
      handlePasswordChangeTrigger()
    }
  }

  useEffect(() => {
    if (user) {
      setUserData(user)
    }
  }, [user])

  useEffect(() => {
    if (password.newPassword && password.repeatPassword) {
      setPassword({
        ...password,
        error: password.newPassword === password.repeatPassword ? '' : 'passwords should match',
      })
    }
  }, [password, password.newPassword, password.repeatPassword])

  useEffect(() => {
    setLoading(isAllergiesLoading || isDietsLoading || isChangeLoading || isUpdateLoading)
  }, [isAllergiesLoading, isDietsLoading, isChangeLoading, isUpdateLoading])

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <StyledProfilePage>
          <StyledProfilePageContent>
            <StyledHeader>
              <span>profile</span>
              <StyledButtonsContainer>
                {isEdit ? (
                  <>
                    <Button onClick={handleEditChange}>cancel</Button>
                    <Button onClick={handleSave}>save</Button>
                  </>
                ) : (
                  <Button onClick={handleEditChange}>edit</Button>
                )}
                {user?.id && <Button onClick={handleLogout}>log out</Button>}
              </StyledButtonsContainer>
            </StyledHeader>

            {newUserData && (
              <>
                <Input
                  label='first name'
                  value={newUserData?.firstName}
                  onChange={(e) => handleChange(e, 'firstName')}
                  disabled={!isEdit}
                />
                <Input
                  label='last name'
                  value={newUserData?.lastName}
                  onChange={(e) => handleChange(e, 'lastName')}
                  disabled={!isEdit}
                />
                <Input
                  label='email'
                  value={newUserData?.email}
                  onChange={(e) => handleChange(e, 'email')}
                  disabled={!isEdit}
                />
              </>
            )}
            <StyledLabel marginBottom={1.813}>allergies</StyledLabel>
            <LabelSelector
              options={allergies || []}
              onSelect={setSelectedAllergies}
              selected={selectedAllergies}
              isEdit={isEdit}
            />
            <StyledLabel marginBottom={1.813}>diets</StyledLabel>
            <LabelSelector options={diets || []} onSelect={setSelectedDiets} selected={selectedDiets} isEdit={isEdit} />

            <StyledButtonsContainer>
              {isChangePassword ? (
                <>
                  <Button onClick={handlePasswordChangeTrigger}>cancel</Button>
                  <Button onClick={handlePasswordSave}>save</Button>
                </>
              ) : (
                <Button onClick={() => setIsChangePassword(!isChangePassword)}>change password</Button>
              )}
            </StyledButtonsContainer>

            {isChangePassword && (
              <>
                <Input
                  label='new password'
                  value={password.newPassword}
                  onChange={(e) => handlePasswordChange(e, 'newPassword')}
                  type='password'
                  autoComplete='new-password'
                />
                <Input
                  label='repeat password'
                  value={password.repeatPassword}
                  onChange={(e) => handlePasswordChange(e, 'repeatPassword')}
                  type='password'
                  autoComplete='new-password'
                  errors={password.repeatPassword && password.error && password.error}
                />
              </>
            )}
          </StyledProfilePageContent>
          <img src={'assets/Lesik.jpg'} alt='' />
        </StyledProfilePage>
      )}
    </>
  )
}

export default ProfilePage
