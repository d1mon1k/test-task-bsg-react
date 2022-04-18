import cl from './preloader.module.scss'
import ico from '../../../assets/svg/preloader.svg'

export const Preloader: React.FC = () => {
  return (
    <img className={cl.preloader} alt={'preloader'} src={ico}></img>
  )
}