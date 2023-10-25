/* eslint-disable */

import './Main.css'
import React, { useRef, useState, useEffect } from 'react'
import DataSlider from './DataSlider/DataSlider'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons"

function Main() {
  const slideRef = useRef(null)
  const [current, setCurrent] = useState(0)
  const imgWidth = 100
  const slideRange = current * imgWidth

  useEffect(() => {
    slideRef.current.style.transition = "transform 0.5s ease-in-out"
    slideRef.current.style.transform = `translateX(-${slideRange}%)`

    const timer = setInterval(() => {
      next()
    }, 10000)

    return () => {
      clearInterval(timer)
    }

  }, [current, slideRange])

  const prev = () => {
    if (current === 0) {
      setCurrent(DataSlider.length - 1)
    } else {
      setCurrent(current - 1)
    }
  };

  const next = () => {
    if (current === DataSlider.length - 1) {
      setCurrent(0)
    } else {
      setCurrent(current + 1)
    }
  }

  return (
    <div className='Main'>
      <div className='Main_container'>
        <ul className='Slider' ref={slideRef}>
          <div className='dsdsds'>
            <div className='Slider_Container' >
              {DataSlider.map((box, id) => {
                return (
                  <ul key={box.id} className='Slider_Box'>
                    <a href='#'>
                      <img src={box.img[`img0${id + 1}`]} alt="이미지 슬라이드" />
                      <div className='Textbox'>
                        <div className='Textbox_Container'>
                          <div className='Textbox_Point'>{box.point}</div>
                          <div className='Textbox_Title'>{box.title}</div>
                          <div className='Textbox_Text'>{box.text}</div>
                          <div className='Textbox_Sub'>{box.subtext}</div>
                        </div>
                      </div>
                    </a>
                  </ul>
                );
              })}
            </div>
          </div>
        </ul>

        <span className='prev_L' onClick={prev}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </span>
        <span className='prev_R' onClick={next}>
          <FontAwesomeIcon icon={faChevronRight} />
        </span>
      </div>
    </div>
  );
}

export default Main;
