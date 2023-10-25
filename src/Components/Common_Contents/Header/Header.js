import React, {useEffect, useState} from "react";
import './Header.css'
import Nav from "../Nav/Nav";
import ScrollTop from "../ScrollTop/ScrollTop";
// import { SlLogin } from "react-icons/sl";
import { BiSolidUser, BiUserCircle } from "react-icons/bi";

function Header() {
    const [hoverHeader, setHoverHeader] = useState(false)   // 기능 없는 헤더와 Nav와 연결된 기능이 있는 헤더를 구분하게 해주는 곳
    const [scrollTop, setScrollTop] = useState(true)
    const [loggedIn, setLoggedIn] = useState(false) // 로그인 상태

    const headerContentsHover = () => {
        setHoverHeader(true)
    }
    const headerContentsHoverOut = () => {
        setHoverHeader(false)
    }

    const scrollTopStyle = () => {
        if(window.scrollY !== 0){
            setScrollTop(false)
        }else{
            setScrollTop(true)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', scrollTopStyle)

        // 로컬 저장소에서 로그인했는지 확인
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
        setLoggedIn(isLoggedIn)
    }, [])
    
    return(
        <div className={`header_container ${scrollTop? 'scroll_zero': 'scroll_not_zero'}`}
        onMouseOver={headerContentsHover}
        onMouseOut={headerContentsHoverOut}
        >
            <div className="header_showarea">
                <p className="header_logo">Fitness<br/>Houston</p>
                <ul className="header_contents">
                    <li>브랜드</li>
                    <li>머신</li>
                    <li>매장</li>
                    <li>소식</li>
                    <li>PT</li>
                </ul>
                <div className='header_login'>
                    <BiSolidUser className={`header_login_logo ${loggedIn? 'hide': 'show'}`} />
                    <p className={`${loggedIn? 'hide': 'show'}`}>로그인</p>
                    <BiUserCircle className={`header_login_logo ${loggedIn? 'show': 'hide'}`} />
                    <p className={`${loggedIn? 'show': 'hide'}`}>MyPage</p>
                </div>
            </div>
            <Nav hoverHeader={hoverHeader}></Nav>
            <ScrollTop />
        </div>
    )
}
export default Header