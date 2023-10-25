import React, {useState} from "react"
import './Login.css'
import Register from "./Info/Register"
import SearchID from './Info/SearchID'
import SearchPW from './Info/SearchPW'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import NavSimple from "../../Common_Contents/NavSimple/NavSimple"

function Login(){
  const [RegisterOpen, setRegisterOpen] = useState(false)
  const [IdSearchOpen, setIdSearchOpen] = useState(false)
  const [PwSearchOpen, setPwSearchOpen] = useState(false)
  // eslint-disable-next-line
  const [loggedIn, setLoggedIn] = useState(false)

  const [userId, setUserId] = useState('') //아이디 입력상태
  const [password, setPassword] = useState('') //비밀번호 입력상태
  const [loginError, setLoginError] = useState('') //로그인 오류메세지상태

  const navigate = useNavigate()

  // 회원가입 모달 열기
  const openRegister = () => {
    setRegisterOpen(true)
  }

  // 아이디 찾기 모달 열기
  const openIdSearch = () => {
    setIdSearchOpen(true)
  }
  
  // 비밀번호 찾기 모달 열기
  const openPwSearch = () => {
    setPwSearchOpen(true)
  }

  // 모달 닫기
  const closeModal = () => {
    setRegisterOpen(false)
    setIdSearchOpen(false)
    setPwSearchOpen(false)
  }
  
  //로그인 버튼 클릭시 로그인
  const handleLogin = async () => {
    try{
      if(userId === '' || password === ''){
        setLoginError('아이디나 비밀번호를 입력하세요.')
      }else{
        const response = await axios.post('/api/users/login', {
          userId, password
        })
        console.log(response.data)
        if(response.data.code === 200){
          console.log('로그인 성공')
          alert('로그인성공')
          // setUserId('')
          // setPassword('')
          setLoginError('')
          setLoggedIn(true)
          navigate(-1)        // 로그인 완료한 뒤, 로그인 버튼 누르기 전 화면으로 뒤로 가기

          localStorage.setItem('isLoggedIn', 'true')
          localStorage.setItem('userId', userId)
          localStorage.setItem('password', password)
          localStorage.setItem('isAdmin', response.data.user.isAdmin)
          
          // window.location.href = 'http://localhost:3000/'
          // window.history.pushState({}, document.title, 'http://localhost:3000/')             
        }else if(response.data.code === 400){
          console.log('로그인 실패')
          setLoginError('아이디나 비밀번호를 다시확인 하세요.')
        }
      }      
    }catch(error){
      console.error(error)
      setLoginError('서버와 통신 중 에러')
    }
  }

  // 엔터 눌렀을 때 로그인
  const keyPress = (e) => {
    if(e.key === 'Enter'){
      handleLogin()
    }
  }

  return(
    <>
    <NavSimple />
    <div className="login">
      <div className="login_container">
        <div className="login_title">
          <Link to="/"><h1>Fitness Houston</h1></Link>
        </div>
        <div className="login_form">
          <div className="login_form_box">
            <div className="login_form_id">
              <input type='text' 
              className='user_id' 
              placeholder="ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}/>
            </div>
            <div className="login_form_pw">
              <input type='password' 
              className='user_pw' 
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={keyPress}/>
            </div>
            
            <div className="login_btn">
            {loginError && <p className="error_message">{loginError}</p>}
              <button onClick={handleLogin}>Login</button>
            </div> 
          </div>          
        </div>
        <div className="login_info">
          <div className="login_info_box">
            <button className="search_id" onClick={openIdSearch}>아이디 찾기</button>
            <button className="search_pw" onClick={openPwSearch}>비밀번호 찾기</button>
            <button className="register" onClick={openRegister}>회원가입</button>
          </div>
        </div>
      </div>

      {IdSearchOpen && (
        <div className="search_id_modal">
          <div className="search_id_modal_content">
            <SearchID onClose={closeModal} />
          </div>
        </div>
      )}

      {PwSearchOpen && (
        <div className="search_pw_modal">
          <div className="search_pw_modal_content">
            <SearchPW onClose={closeModal} />
          </div>
        </div>
      )}

      {RegisterOpen && (
        <div className="register_modal">
          <div className="register_modal_content">            
            <Register onClose={closeModal} />
          </div>
        </div>
      )}      
    </div>
    </>
  )
}

export default Login