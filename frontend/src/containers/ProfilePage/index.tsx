import React, { FunctionComponent, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllergies } from '../../api/allergies'
import { getDiets } from '../../api/diets'
import { changeUserPassword, getUser, updateUser } from '../../api/users'
import { NameSimple, User } from '../../common/types'
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
import { UserContext, useUser } from '../../UserContext'

type PasswordFields = {
  newPassword: string
  repeatPassword: string
  error: string
}

const ProfilePage: FunctionComponent = () => {
  const { user } = useUser()
  const navigate = useNavigate()
  const { setUser } = useContext(UserContext)
  const [userData, setUserData] = useState<User | null>(null)
  const [allergies, setAllergies] = useState<Array<NameSimple> | null>(null)
  const [selectedAllergies, setSelectedAllergies] = useState<Array<NameSimple> | null>(null)
  const [diets, setDiets] = useState<Array<NameSimple> | null>(null)
  const [selectedDiets, setSelectedDiets] = useState<Array<NameSimple> | null>(null)
  const [newUserData, setNewUserData] = useState<User | null>(null)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [isChangePassword, setIsChangePassword] = useState<boolean>(false)
  const [password, setPassword] = useState<PasswordFields>({ newPassword: '', repeatPassword: '', error: '' })

  const fetchUserData = async (id: string) => {
    setRespUserData(await getUser(id))
  }

  const setRespUserData = (data: User) => {
    setUser(data)
    setUserData(data)
    setNewUserData(data)
    setSelectedAllergies(data.allergies)
    setSelectedDiets(data.diets)
  }

  const fetchAllData = async () => {
    setAllergies(await getAllergies())
    setDiets(await getDiets())
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    navigate(RoutePaths.LOGIN)
  }

  const handleEditChange = () => {
    setNewUserData(isEdit ? userData : newUserData)
    setIsEdit(!isEdit)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const value = e.target.value
    newUserData && setNewUserData({ ...newUserData, [field]: value })
  }

  const handleSave = async () => {
    if (newUserData) {
      setRespUserData(
        await updateUser({
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
      setRespUserData(
        await changeUserPassword({
          id: user?.id,
          password: password.newPassword,
        })
      )
      handlePasswordChangeTrigger()
    }
  }

  useEffect(() => {
    if (user) {
      fetchUserData(user.id)
      fetchAllData()
    }
  }, [user?.id])

  useEffect(() => {
    if (password.newPassword && password.repeatPassword) {
      setPassword({
        ...password,
        error: password.newPassword === password.repeatPassword ? '' : 'passwords should match',
      })
    }
  }, [password.newPassword, password.repeatPassword])

  return (
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
        <StyledLabel marginBottom={20}>allergies</StyledLabel>
        <LabelSelector
          options={allergies || []}
          onSelect={setSelectedAllergies}
          selected={selectedAllergies}
          isEdit={isEdit}
        />
        <StyledLabel marginBottom={20}>diets</StyledLabel>
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
  )
}

export default ProfilePage
