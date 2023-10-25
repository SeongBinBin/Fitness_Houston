/* eslint-disable */

import './Main.css'
import '../../../asset/css/reset.css'
import React, { useState, useEffect, useRef } from 'react'
import DataSlider from './DataSlider/DataSlider'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft , faChevronRight} from "@fortawesome/free-solid-svg-icons"


function Main( ) {
        const slideRef = useRef(null)
        const [current, setcurrnet] = useState(0)  
        const img_Width = 100
        const slideRange = current * img_Width

    useEffect(() => {
        slideRef.current.style.transition = "all 0.5s ease-in-out"
        slideRef.current.style.transform = `translateX(-${slideRange}%)`
    }, [current])

    const prev = () => {
        if(current === 0) return 
        setcurrnet(current - 1)
    }

    const next = () => {
        if(current === 4) return 
        setcurrnet(current + 1) 
    }

    return (
        <div className='Main'>
            <div className='Main_container'>
                <ul className='Slider' ref={slideRef}>
                    <div className='dsdsds'>
                        <div className='Slider_Container' >
                            {DataSlider.map( (box, id) => {
                                return <ul key={box.id} 
                                className='Slider_Box' 
                                >
                                        <a href='#'>
                                            <img src= {box.img[`img0${id+1}`]} alt = "이미지 슬라이드" />
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
                                })}
                        </div>
                    </div>
                </ul>

                <span className='prev_L' onClick={prev}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </span>
                <span className='prev_R' onClick={next}><FontAwesomeIcon icon={faChevronRight} /></span>
            </div>
        </div>
    )
}

export default Main