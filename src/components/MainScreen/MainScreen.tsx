import { useAppSelector } from '../../app/hooks'
import { Slider } from '../../components/Slider/Slider'
import { useEffect, useState } from 'react'
import { Player } from '../Player/Player'
import { Preloader } from '../common/Preloader/Preloader'
import { useNavigate } from 'react-router-dom'

export const MainScreen = () => {
  const [isPopUp, setIsPopUp] = useState(false)
  const { user: {userName} } = useAppSelector(state => state.auth)
  const navigate = useNavigate()

  useEffect(() => {
   !userName && navigate('/')
  }, [])

  const { mediaList, status, mediaUrl } = useAppSelector(
    (store) => store.mainScreen
  )

  if (mediaList === null || status === 'loading') {
    return <Preloader/>
  }

  if (mediaUrl && isPopUp) {
    return (
      <Player setIsPopUp={setIsPopUp} mediaUrl={mediaUrl}/>
    )
  }

  return (
    <>
      <Slider title={'Entertainment'} mediaList={mediaList.Entertainment} setIsPopUp={setIsPopUp} />
      <Slider title={'Suggestion'} mediaList={mediaList.Suggestion} setIsPopUp={setIsPopUp} />
    </>
  )
}



