import './sassStyles/_global.scss'
import { createRoot } from 'react-dom/client'
import App from './App'
import { store } from './app/store'
import { Provider } from 'react-redux'
import { HashRouter as Router } from 'react-router-dom'

//note pass: Test12!@ login: test@bsgroup.eu | trial or main

const container = document.getElementById('app')
const root = createRoot(container!)
root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
)
