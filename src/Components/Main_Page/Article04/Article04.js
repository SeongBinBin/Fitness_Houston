/* eslint-disable */

import './Article04.css'
import React, { useState, useEffect, useRef } from 'react'
import Data_Article04 from './Data_Article04/Data_Article04'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons"


function Article04() {

    const bannerRef = useRef(null)
    const [bannercurrent, setcurrent] = useState(0)
    const Banner_Width = 100
    const Total = bannercurrent * Banner_Width

    useEffect(() => {
        bannerRef.current.style.transition = "all 0.5s ease-in-out"
        bannerRef.current.style.transform = `translateX(-${Total}%)`

        const timer = setInterval(() => {
            next()
        }, 3000)

        return () => {
            clearInterval(timer)
        }

    }, [bannercurrent, Total])

    const prev = () => {
        if(bannercurrent === 0) {
            setcurrent(Data_Article04.length - 1)
        } else {
            setcurrent(bannercurrent - 1)
        }
    }

    const next = () => {
        if (bannercurrent === Data_Article04.length - 1) {
            setcurrent(0)
        } else {
            setcurrent ( bannercurrent + 1)
        }
    }

    return (
        <div className='Article04'>
            <div className='header'>
                <h1>설치사례</h1>
            </div>
            <div className='Article04_Slider'>
                <ul className='Aricle04_Container' ref={bannerRef}>
                    {Data_Article04.map( (item, id) => {
                        return <li key = {item.id}
                            className = "Article04_Slider_li"
                        >
                            <a href="#">
                                <div className="Article04_banner">
                                    <img src = {item.img[`img0${id+1}`]} alt="배너이미지"/>
                                </div>
                            </a>
                        </li>
                    })}
                </ul>

                <span className='prev' onClick={prev}>
                   <FontAwesomeIcon icon={faChevronLeft} />
                </span>
                <span className='next' onClick={next}>
                   <FontAwesomeIcon icon={faChevronRight} />
                </span>
            </div>
        </div>
    )
}

export default Article04