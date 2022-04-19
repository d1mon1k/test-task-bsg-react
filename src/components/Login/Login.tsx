import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { authAsync } from "../../features/authSlice"
import { ErrorPopUp } from "../common/ErrorPopUp/ErrorPopUp"
import { Preloader } from "../common/Preloader/Preloader"
import cl from './login.module.scss'

export const Login: React.FC = () => {
  const [data, setData] = useState<{login: string, pass: string}>({login: '', pass: ''})
  const { status, user: {userName} } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {    
    if(userName !== 'Anonymous user' && userName !== null) {
      navigate('/home')
    }   
  },[userName])

  const changeLoginHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({...data, login: e.target.value})
  }

  const changePassHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({...data, pass: e.target.value})
  }

  const keyDownHandler = async (e: React.KeyboardEvent) => {
    if(e.key === 'Enter') {
      await dispatch(authAsync({password: data.pass, userName: data.login}))
      setData({login: '', pass: ''})
      navigate('/home')
    }
  }

  const signInHandler = async (e: React.MouseEvent) => {
    e.preventDefault()
    await dispatch(authAsync({ password: data.pass, userName: data.login }))
    setData({ login: '', pass: '' })
  }

  const clickHandler = async (e: React.MouseEvent) => {
    e.preventDefault()
    await dispatch(authAsync({ password: data.pass, userName: data.login }))
    setData({ login: '', pass: '' })
    navigate('/home')
  }

  if(status === 'loading') {
    return <Preloader/>
  }  

  return (
    <>
    {status === 'failed' && <ErrorPopUp title={'User or password is incorrect'} />}
    <div className={cl.poster}>
      <form className={cl.form}>
        <input className={cl.input} placeholder="Login (test@bsgroup.eu)" onKeyDown={keyDownHandler} onChange={changeLoginHandler} type="text" value={data.login}/>
        <input className={cl.input} placeholder="Password (Test12!@)" onKeyDown={keyDownHandler} onChange={changePassHandler} type="password" value={data.pass}/>
        <div className={cl.btnsRow}>
          <button className={cl.button} onClick={signInHandler}>Enter</button>
          <button className={cl.button} onClick={clickHandler}>I don't have an account</button>
        </div>
      </form>
    </div>
    </>
  )
}
