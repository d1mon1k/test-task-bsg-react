import React from 'react'
import { ServiceAPI } from './API/serviceAPI'
import './App.css'

function App() {
  ServiceAPI.authLogin({userName: null, password: null})

  return <div className="App">
  </div>
}

export default App
