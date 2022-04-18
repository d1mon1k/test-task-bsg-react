import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { authAsync } from "../../features/authSlice"
import { Preloader } from "../common/Preloader/Preloader"
import cl from './login.module.scss'

export const Login: React.FC = () => {
  const [data, setData] = useState<{login: string, pass: string}>({login: '', pass: ''})
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { status } = useAppSelector((state) => state.auth)

  const changeLoginHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({...data, login: e.target.value})
  }

  const changePassHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({...data, pass: e.target.value})
  }

  const keyDownHandler = (e: React.KeyboardEvent) => {
    if(e.key === 'Enter') {
      dispatch(authAsync({password: data.pass, userName: data.login}))
      setData({login: '', pass: ''})
      navigate('/home')
    }
  }

  const clickHandler = (e:React.MouseEvent) => {
    e.preventDefault()
    dispatch(authAsync({ userName: '', password: '' }))
    navigate('/home')
  }

  if(status === 'loading') {
    return <Preloader/>
  }

  return (
    <div className={cl.poster}>
      <form className={cl.form}>
        <input className={cl.input} placeholder="login" onKeyDown={keyDownHandler} onChange={changeLoginHandler} type="text" value={data.login}/>
        <input className={cl.input} placeholder="password" onKeyDown={keyDownHandler} onChange={changePassHandler} type="password" value={data.pass}/>
        <button className={cl.button} onClick={clickHandler}>I don't have an account</button>
      </form>
    </div>
  )
}
