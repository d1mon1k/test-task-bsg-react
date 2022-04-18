import ReactPlayer from "react-player"
import cl from './player.module.scss'

interface PlayerProps {
  mediaUrl: string,
  setIsPopUp: (arg0: boolean) => void
}

export const Player: React.FC<PlayerProps> = ({ mediaUrl, setIsPopUp }) => {
  return (
    <div className={cl.popUp} onClick={() => setIsPopUp(false)} >
      <div className={cl.playerWrapper}>
        <ReactPlayer
          onStart={() => console.log('video start')}
          onError={() => console.log('error')}
          playing={true}
          controls={true}
          width={'80%'}
          height={'70%'}
          className={cl.reactPlayer}
          url={mediaUrl}
        />
      </div>
    </div>
  )
}
