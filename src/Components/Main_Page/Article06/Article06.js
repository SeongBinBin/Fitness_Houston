/* eslint-disable */

import './Article06.css'
import Data_Article06 from './Data_Article06/Data_Article06'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft , faChevronRight} from "@fortawesome/free-solid-svg-icons"
import React, {useRef, useEffect, useState} from 'react'


function Article06() {
    console.log(Data_Article06.length - 5)
    const slider = useRef(null)
    const [current, setcurrent] = useState(0)
    const slide_Width = 100
    const Total = current * slide_Width

    useEffect(() => {
        slider.current.style.transition = "all 0.5s ease-in-out"
        slider.current.style.transform = `translateX(-${Total}%)`
    })

    const prev = () => {
        if(current === 0) {
            setcurrent(Data_Article06.length -5)
        } else {
            setcurrent(current - 5)
        }
    }

    const next = () => {
        if(current === Data_Article06.length - 5) {
            setcurrent(0)
        } else (
            setcurrent(current + 1)
        )
    }

    return (
        <div className="Article06">
            <h1>
                헬스기구 추천
                <span><FontAwesomeIcon icon={faChevronRight}/></span>
            </h1>
            <div className='Article06_Content'>
                <div className='Article06_Container'>
                    <ul className='Article06_Ul' ref={slider}>
                        <div className='Article06_Slider_Container'>
                        {Data_Article06.map((item, id) => {
                            return <li key={item.id}>
                                <a href='#'>
                                    <div className='Article06_box'>
                                        <div className='Article06_img'>
                                            <img src={item.img[`img0${id + 1}`]} alt='이미지'/>
                                        </div>
                                        <p>{item.Title}</p>
                                    </div>
                                </a>
                            </li>
                        })}
                        </div>
                    </ul>
                    <span ><FontAwesomeIcon icon={faChevronLeft} className='A6_Left' onClick={prev}/></span>
                    <span ><FontAwesomeIcon icon={faChevronRight} className='A6_Right' onClick={next}/></span>
                </div>
            </div>
        </div>
    )
}

export default Article06