import cl from './slider.module.scss'
import SlickSlider from 'react-slick'
import { useAppDispatch } from '../../app/hooks'
import { MediaItem } from '../../API/api'
import { getMediaPlayInfoAsync } from '../../features/mainScreenSlice'

interface SliderProps {
  title: string,
  mediaList: MediaItem[],
  setIsPopUp: (arg0: boolean) => void
}

export const Slider: React.FC<SliderProps> = ({ mediaList, setIsPopUp, title}) => {
  const dispatch = useAppDispatch()

  const sliderConfig = {
    slidesToShow: 3,
    slidesToScroll: 3,
    draggable: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  return (
    <section>
      <h2>{title}</h2>
      <SlickSlider {...sliderConfig}>
        {mediaList!.map((elem) => {
          return (
            <div className={cl.item} key={elem.Id} onClick={() => {
              dispatch(getMediaPlayInfoAsync(elem.Id))
              setIsPopUp(true)
            }}>
              <div className={cl.imgContainer}>
                <img
                  alt={elem.Title}
                  className={cl.img}
                  src={
                    elem.Images.length > 0
                      ? elem.Images[0].Url
                      : `https://via.placeholder.com/321x181/3b3b3b?text=${elem.Title}`
                  }
                ></img>
              </div>
              <div className={cl.statusBar}>
                <span>{elem.Title}</span>
              </div>
            </div>
          )
        })}
      </SlickSlider>
    </section>
  )
}
