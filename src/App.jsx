import { useState, useRef } from 'react'
import './App.css'
import previousIcon from './assets/previous-normal.png'
import playIcon from './assets/play-normal.png'
import nextIcon from './assets/next-normal.png'
import previousIconA from './assets/previous-pressed.png'
import playIconA from './assets/play-pressed.png'
import nextIconA from './assets/next-pressed.png'
import PandaPeek from './panda/PandaPeek'

const cards = [
    { id: 1, format: "portrait", type: "video", src: new URL("./assets/videos/you-got-this.mp4", import.meta.url).href, screenColor: "#000" },
    { id: 2, format: "landscape", type: "image", src: new URL("./assets/images/break-the-wall.webp", import.meta.url).href, screenColor: "#fff" },
    { id: 3, decoration: "panda", format: "portrait", type: "video", src: new URL("./assets/videos/red-panda.mp4", import.meta.url).href, screenColor: "#000" },
    { id: 4, format: "square", type: "image", src: new URL("./assets/images/do-the-impossible.webp", import.meta.url).href, screenColor: "#fff" },
    { id: 5, format: "landscape", type: "video", src: new URL("./assets/videos/cats.mp4", import.meta.url).href, screenColor: "#000" },
    { id: 6, format: "landscape", type: "video", src: new URL("./assets/videos/lake.mp4", import.meta.url).href, screenColor: "#000000" },
    { id: 7, format: "square", type: "image", src: new URL("./assets/images/never-give-up.webp", import.meta.url).href, screenColor: "#fff" },
    { id: 8, format: "landscape", type: "video", src: new URL("./assets/videos/evening.mp4", import.meta.url).href, screenColor: "#000" },
    { id: 9, format: "portrait", type: "text", text: "удачи" },
]

function App() {
  const [current, setCurrent] = useState(0)
  const [play, setPlay] = useState(playIcon)
  const [startedVideos, setStartedVideos] = useState(() => new Set())
  const [redP, setRedP] = useState(false)

 const currentCard = cards[current]
 const showArrow = currentCard.type === "video" && !startedVideos.has(currentCard.id)

 const videoRef = useRef(null)

 function toggleVideo() {
      const video = videoRef.current
      if (!video) return null

      if (video.paused) {
          video.play()
      } else {
          video.pause()
      }
 }

 function goToCard(index) {
      setCurrent(index)

     if (cards[index].decoration === "panda") {
         setRedP(true)
     }
 }

  return (
    <div className="player">
        { redP && <PandaPeek /> }
      <div
          className="display"
          style={{ backgroundColor: currentCard.screenColor }}
      >
          {currentCard.type === "video" ? (
              <video
                  ref={videoRef}
                  key={currentCard.id}
                  src={currentCard.src}
                  playsInline
                  loop
                  onPlaying={() => {
                      setStartedVideos(ids => {
                          if (ids.has(currentCard.id)) return ids
                          return new Set(ids).add(currentCard.id)
                      })
                  }}
                  className={`display__video display__video--${currentCard.format}`}
              />
          ) : currentCard.type === "image" ? (
              <img className={`display__img display__img--${currentCard.format}`} src={currentCard.src} alt="" />
          ) : (
              <p className="display__text">{currentCard.text}</p>
          )}
      </div>
      <div className="player__controls">
          <button
              className="button"
              onClick={() => goToCard(current - 1)}
              disabled={current === 0}
          >
              <img className="icon-normal" src={previousIcon} alt="" />
              <img className="icon-pressed" src={previousIconA} alt="" />
          </button>
          <button
              className={`button button-play${showArrow ? " show-arrow" : ""}`}
              onClick={() => {
                  toggleVideo()
                  setPlay(playIconA)
                  setTimeout(() => {
                      setPlay(playIcon)
                  }, 180)
              }}
          >
              <img src={play} alt=""/>
          </button>
          <button
              className="button"
              aria-label="Следующее"
              disabled={current === cards.length - 1}
              onClick={() => goToCard(current + 1)}
          >
              <img className="icon-normal" src={nextIcon} alt="" />
              <img className="icon-pressed" src={nextIconA} alt="" />
          </button>
      </div>
    </div>
  )
}

export default App
