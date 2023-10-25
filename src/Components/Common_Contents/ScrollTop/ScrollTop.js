import React, {useEffect, useState} from "react";
import './ScrollTop.css';
import { BsArrowUpCircle } from "react-icons/bs";

function ScrollTop(){
    const [scrollLocation, setScrollLocation] = useState(false)

    const scrollControl = () => {
        if(window.scrollY >= 400){
            setScrollLocation(true)
        }else{
            setScrollLocation(false)
        }
    }

    const goToTop = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        })
    }

    useEffect(() => {
        window.addEventListener('scorll', scrollControl)
        return() => {
            window.addEventListener('scroll', scrollControl)
        }
    }, [])

    return(
        <div className={`ScrollTop ${scrollLocation? 'show': 'hide'}`}>
            <div>
              <BsArrowUpCircle onClick={goToTop} className="goTopIcon"/>  
            </div>
        </div>
    )
}
export default ScrollTop