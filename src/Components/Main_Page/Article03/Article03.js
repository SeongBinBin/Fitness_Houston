/* eslint-disable */

import Data_Article03 from './Data_Article03/Data_Article03'
import './Article03.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft , faChevronRight} from "@fortawesome/free-solid-svg-icons"
import React, { useRef, useState, useEffect } from 'react'

function Article03() {
    const bannerRef = useRef(null)
    const [bannerCurent, setBannerCurent] = useState(0)
    const img_Width = 100
    const bannerRange = bannerCurent * img_Width

    useEffect(() => {
        bannerRef.current.style.transition = "all 0.5s ease-in-out"
        bannerRef.current.style.transform = `translateX(-${bannerRange}%)`

    }, [bannerCurent, bannerRange])

    const prev = () => {
        if(bannerCurent === 0) {
            setBannerCurent(Data_Article03.length - 5)
        } else {
            setBannerCurent(bannerCurent - 5)
        }
    }

    const next = () => {
        if (bannerCurent === Data_Article03.length - 5) {
            setBannerCurent(0)
        } else {
            setBannerCurent(bannerCurent + 1)
        }
    }
    return (
        <div className='Article03'>
            <h1>피트니스 휴스턴 시리즈</h1>
            <div className='Article03_Slider'>
                <div className='Article03_Slider_Container' >
                    <ul className='Article03_Slide' ref={bannerRef}>
                        <div className='Article03_Slide_Container'>
                            {Data_Article03.map((item, id) => {
                                    return <li key={item.id}
                                        className='Article03_Slider_li'
                                    >
                                        <a href='#'>
                                            <div className='Article03_box'>
                                                <div className='Article03_img'>
                                                    <img src={item.img[`img0${id + 1}`]} alt="이미지박스" />
                                                </div>
                                                <div className='Article03_Textbox'>
                                                    <p>{item.Title}</p>
                                                    <span className='Article03_text1'>{item.text1}</span>
                                                    <span className='Article03_text2'>{item.text2}</span>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                            })}
                        </div>
                    </ul>
                <span ><FontAwesomeIcon icon={faChevronLeft} className='Left'
                    onClick={prev}
                /></span>
                <span ><FontAwesomeIcon icon={faChevronRight} className='Right'
                    onClick={next}
                /></span>
                </div>

            </div>
        </div>
    )
}

export default Article03