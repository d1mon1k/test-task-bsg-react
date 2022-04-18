import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { Slider } from '../../components/Slider/Slider'
import { useEffect, useState } from 'react'
import { Player } from '../Player/Player'
import { Preloader } from '../common/Preloader/Preloader'
import { getMediaListAsync } from '../../features/mainScreenSlice'
import { useNavigate } from 'react-router-dom'

export const MainScreen = () => {
  const [isPopUp, setIsPopUp] = useState(false)
  const dispatch = useAppDispatch()
  const { user: {userName} } = useAppSelector(state => state.auth)
  const navigate = useNavigate()

  useEffect(() => {
    if(!userName) {
      navigate('/')
    }else {
      dispatch(getMediaListAsync())
    }
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
      <Slider mediaList={mediaList} setIsPopUp={setIsPopUp} />
      <Slider mediaList={mediaList} setIsPopUp={setIsPopUp} />
    </>
  )
}



