import { MainScreen } from './components/MainScreen/MainScreen'
import { NavBar } from './components/NavBar/NavBar'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import cl from './app.module.scss'
import { Route, Routes } from 'react-router-dom'
import { Login } from './components/Login/Login'
import { useEffect } from 'react';
import { useAppDispatch } from './app/hooks';
import { authAsync } from './features/authSlice';
import { getMediaListAsync } from './features/mainScreenSlice';

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    (async () => {
      await dispatch(authAsync({ userName: '', password: '' }))
      dispatch(getMediaListAsync())
    })()
  }, [])

  return (
    <div className={cl.app}>
      <NavBar />
      <Routes>
        <Route path='home' element={<MainScreen />} />
        <Route path='/' element={<Login/>}/>
      </Routes>
    </div>
  )
}

export default App
