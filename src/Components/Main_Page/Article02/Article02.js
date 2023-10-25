/* eslint-disable */

import './Article02.css'
import Data_Article02 from './Data_Article02/Data_Article02'
import React, { useRef, useState, useEffect} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";


function Article02() {
    
    const bannerRef = useRef(null)
    const [bannerCurent, setBannerCurent] = useState(0)
    const img_Width = 100
    const bannerRange = bannerCurent * img_Width

    useEffect(() => {
        bannerRef.current.style.transition = "all 0.5s ease-in-out"
        bannerRef.current.style.transform = `translateX(-${bannerRange}%)`

        const timer = setInterval(() => {
            Banner_R()
        }, 3000)

        return () => {
            clearInterval(timer)
        }

    }, [bannerCurent, bannerRange])

    const Banner_L = () => {
        if(bannerCurent === 0) {
            setBannerCurent(Data_Article02.length -1)
        } else {
            setBannerCurent(bannerCurent - 1)
        }
    }

    const Banner_R = () => {
        if (bannerCurent === Data_Article02.length -1) {
            setBannerCurent(0)
        } else {
            setBannerCurent(bannerCurent + 1)
        }
    }

    return (
        <div className='Article02'>
            <div className='header'>
                <h1>신상품</h1>
            </div>
            <div className='Article02_Slider' >
                <ul className='Aricle02_container' ref={bannerRef}>
                    {Data_Article02.map( (item, id) => {
                        return <li key = {item.id}
                            className = "Article02_Slider_li"
                        >
                            <a href="#">
                                <div className="Article02_banner">
                                    <img src = {item.img[`banner0${id+1}`]} alt="배너이미지01"/>
                                </div>
                            </a>
                        </li>
                    })}
                </ul>

                <span className='Banner_L' onClick={Banner_L}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </span>
                <span className='Banner_R' onClick={Banner_R}>
                <FontAwesomeIcon icon={faChevronRight} />
                </span>
            </div>
        </div>
    )
}

export default Article02