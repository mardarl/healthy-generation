import React, { FunctionComponent, useEffect } from 'react'
import { useNavigate } from 'react-router'

import { RoutePaths } from '../../routes/routePaths'

import Button from '../../ui-components/Button/Button'
import axios from 'axios'

const HomePage: FunctionComponent = () => {
  const navigate = useNavigate()

  const options = {
    method: 'GET',
    url: 'https://edamam-food-and-grocery-database.p.rapidapi.com/parser',
    headers: {
      'X-RapidAPI-Key': 'd94af8a306mshc10964884b9b76dp181944jsnc7f05a4a107c',
      'X-RapidAPI-Host': 'edamam-food-and-grocery-database.p.rapidapi.com'
    }
  }

  useEffect(() => {
    axios.request(options).then(function (response) {
      console.log(response.data)
    }).catch(function (error) {
      console.error(error)
    })
  }, [])

  return (
    <div className="HomePage">
      <p>
        home page
      </p>
      <Button 
        onClick={() => navigate(RoutePaths.LOGIN)}
      >
        login
      </Button>
    </div>
  )
}

export default HomePage
