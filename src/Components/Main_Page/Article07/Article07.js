/* eslint-disable */

import './Article07.css'
import Data_Article07 from './Data_Article07/Data_Article07'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons"
import React, { useRef, useEffect, useState } from 'react'

function Article07() {

    const bannerRef = useRef(null)
    const [bannercurrent, setbannercurrent] = useState(0)
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

    })

    const prev = () => {
        if(bannercurrent === 0) {
            setbannercurrent(Data_Article07.length - 1)
        } else {
            setbannercurrent(bannercurrent - 1)
        }
    }

    const next = () => {
        if(bannercurrent === Data_Article07.length - 1) {
            setbannercurrent(0)
        } else {
            setbannercurrent(bannercurrent + 1)
        }
    }

    return (
        <div className='Article07'>
            <div className='header'>
                <h1>뉴스룸</h1>
            </div>
            <div className='Article07_Slider'>
                <ul className='Aricle07_container' ref={bannerRef}>
                    {Data_Article07.map( (item, id) => {
                        return <li key = {item.id}
                            className = "Article07_Slider_li"
                        >
                            <a href="#">
                                <div className="Article07_banner">
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

export default Article07