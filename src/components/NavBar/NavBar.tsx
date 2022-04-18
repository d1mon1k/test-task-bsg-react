import { Link, NavLink } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import cl from './navBar.module.scss'

export const NavBar = () => {
  const { user } = useAppSelector((state) => state.auth)

  const isActive = ({ isActive }: any) => {
    return isActive ? `${cl.link} ${cl.active}` : ''
  }

  return (
    <>
      <nav className={cl.nav}>
        <Link to="home">
          <span className={cl.ico}>LOGO</span>
        </Link>
        <ul className={cl.list}>
          <li className={cl.item}>
            <NavLink className={isActive} to="tv-shows">
              TV shows
            </NavLink>
          </li>
          <li className={cl.item + ' ' + cl.active}>
            <NavLink className={isActive} to="movies">
              Movies
            </NavLink>
          </li>
          <li className={cl.item}>
            <NavLink className={isActive} to="home">
              Home
            </NavLink>
          </li>
          <li className={cl.item}>
            <NavLink className={isActive} to="recently-added">
              Recently Added
            </NavLink>
          </li>
          <li className={cl.item}>
            <NavLink className={isActive} to="my-list">
              My List
            </NavLink>
          </li>
        </ul>
        <Link to={!user.userName || user.userName ? '/' : ''}>
          <span className={cl.login}>
            {!user.userName || user.userName === 'Anonymous user'
              ? 'Login'
              : user.userName}
          </span>
        </Link>
      </nav>
    </>
  )
}
