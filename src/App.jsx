import React from 'react'
import AppRoutes from './routes/AppRoutes'
import './styles/theme.css'
import axios from 'axios'

const App = () => {

  axios.defaults.withCredentials = true;
  return (
    <div>
      <AppRoutes />
    </div>
  )
}

export default App