import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import './NavSimple.css'
// import { SlLogin } from "react-icons/sl";
import { BiSolidUser, BiUserCircle } from "react-icons/bi";

function NavSimple(){
    const [loggedIn, setLoggedIn] = useState(false) // 로그인 상태
    // eslint-disable-next-line
    const [hoverName, setHoverName] = useState("")  // 헤더의 요소중 하나를 선택했을때 Nav가 나오게 하는 부분
    const [choices, setChoices] = useState({
        brand: false,
        machine: false,
        shop: false,
        notice: false,
        pt: false
    })
    const [navControl, setNavControl] = useState(false) // Nav 표시 유무를 관리함
    
    const choiceDiv = (e) => {
        const choice = e.target.getAttribute("choice")  // 해당 div의 choice 속성 값을 가져옴
        setHoverName(choice)
        setNavControl(true)

        setChoices(prevChoices => ({
            ...Object.keys(prevChoices).reduce((acc, key) => ({
                ...acc,
                [key]: key === choice
            }), {})
        }))
    }
    const hideNav = () => {
        setNavControl(false)
    }
    const continueNav = () => {
        setNavControl(true)
    }

    const changePage = () => {  // 라우터로 페이지가 변경되면 화면 최상단으로 이동
        window.scrollTo({
            top: 0,
            left: 0,
        })
    }

    useEffect(() => {
        // 로컬 저장소에서 로그인했는지 확인
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
        setLoggedIn(isLoggedIn)
    }, [])
    
    return(
        <div className={`no_hover_container opacity_show`}>
            <div onClick={changePage} className="header_showarea">
                <p className="header_logo">
                    <Link to="/">Fitness<br/>Houston</Link>
                </p>
                <ul className="hover_contents"
                onMouseOver={choiceDiv}>
                    <li choice="brand">브랜드</li>
                    <li choice="machine">머신</li>
                    <li choice="shop">매장</li>
                    <li choice="notice">소식</li>
                    <li choice="pt">PT</li>
                </ul>
                
                <div className="header_login">
                    <Link to="/login">
                        <BiSolidUser className={`header_login_logo ${loggedIn? 'hide': 'show'}`} />
                        <p className={`${loggedIn? 'hide': 'show'}`}>로그인</p>
                    </Link>
                    <Link to="/condition">
                        <BiUserCircle className={`header_login_logo ${loggedIn? 'show': 'hide'}`} />
                        <p className={`${loggedIn? 'show': 'hide'}`}>MyPage</p>
                    </Link>
                </div>
            </div>
            
            <div className={`header_hide ${navControl? 'display_show': 'display_hide'}`}
            onMouseOver={continueNav}
            onMouseOut={hideNav}
            >
                <ul className={`hide_section ${choices.brand? 'choice_show': 'display_hide'}`}>
                    <li>브랜드</li>
                    <li>BI</li>
                </ul>
                <ul className={`hide_section ${choices.machine? 'choice_show': 'display_hide'}`}>
                    <li>
                        <Link to="/sub">상체</Link>
                    </li>
                    <li>
                        <Link to="/sub">하체</Link>
                    </li>
                </ul>
                <ul className={`hide_section ${choices.shop? 'choice_show': 'display_hide'}`}>
                    <li>
                        <Link to="/map">매장찾기</Link>
                    </li>
                    <li>
                        <Link to="/map">매장위치</Link>
                    </li>
                </ul>
                <ul className={`hide_section ${choices.notice? 'choice_show': 'display_hide'}`}>
                    <li onClick={changePage}>
                        <Link to="/announcement">공지사항</Link>
                    </li>
                    <li onClick={changePage}>
                        <Link to="/announcement">이벤트</Link>
                    </li>
                    <li onClick={changePage}>
                        <Link to="/announcement">FAQ</Link>
                    </li>
                    <li onClick={changePage}>
                        <Link to="/announcement">고객의 소리</Link>
                    </li>
                </ul>
                <ul className={`hide_section ${choices.pt? 'choice_show': 'display_hide'}`}>
                    <li>상담안내</li>
                </ul>
            </div>
        </div>
    )
}
export default NavSimple