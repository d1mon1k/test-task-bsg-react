import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { store } from './app/store'
import { Provider } from 'react-redux'

//todo replace token to state and implement refreshing via interceptors
//todo improve axios instance, reduce logic in api services

//note pass: 'Test12!@'; login: 'test@bsgroup.eu'

const container = document.getElementById('app')
const root = createRoot(container!)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode> 
)
