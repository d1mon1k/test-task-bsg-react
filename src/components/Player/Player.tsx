import { useState } from "react"
import ReactPlayer from "react-player"
import { ErrorPopUp } from "../common/ErrorPopUp/ErrorPopUp"
import cl from './player.module.scss'

interface PlayerProps {
  mediaUrl: string,
  setIsPopUp: (arg0: boolean) => void
}

export const Player: React.FC<PlayerProps> = ({ mediaUrl, setIsPopUp }) => {
  const [error, setError] = useState(false)

  return (
    <>
    {error && <ErrorPopUp title={'The resource you are looking for might have been removed'}/>}
    <div className={cl.popUp} onClick={() => setIsPopUp(false)} >
      <div className={cl.playerWrapper}>
        <ReactPlayer
          onError={() => setError(true)}
          playing={true}
          controls={true}
          width={'80%'}
          height={'70%'}
          className={cl.reactPlayer}
          url={mediaUrl}
        />
      </div>
    </div>
    </>
  )
}
