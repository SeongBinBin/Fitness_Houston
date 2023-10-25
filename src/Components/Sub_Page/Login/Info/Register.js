import React, { useState } from "react"
import './Register.css'
import axios from 'axios'

function Register({ onClose }){
  // 입력 필드에 대한 상태 변수 설정
  const [name, setName] = useState("")
  const [id, setId] = useState("")
  const [password1, setPassword1] = useState("")
  const [password2, setPassword2] = useState("")
  const [email, setEmail] = useState("")
  const [agree, setAgree] = useState(false) // 동의 체크 상태
  const [IdDuplicated, setIdDuplicated] = useState(false) //아이디 중복상태
  
  // 에러 메시지 상태 변수 설정
  const [nameError, setNameError] = useState("")
  const [idError, setIdError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [agreeError, setAgreeError] = useState("")
  const [idTestMessage, setIdTestMessage] = useState("")

  // 유효성 검사 함수
  const validateForm = () => {
    let isValid = true
    const nameRegex = /^[가-힣a-zA-Z]+$/
    const infoRegex = /^[a-zA-Z0-9]+$/
    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
    const minLength = 6

    // 이름 검사
    if(name === ""){
      setNameError("이름을 입력하세요.")
      isValid = false
    }else if(!name.match(nameRegex)){
      setNameError("이름은 한글이나 영어만 입력해주세요.")
      isValid = false
    }else{
      setNameError("")
    }

    // 아이디 검사
    if(id === ""){
      setIdError("아이디를 입력하세요.")
      isValid = false
    }else if(!id.match(infoRegex)) {
      setIdError("아이디는 영어와 숫자로만 입력하세요.")
      isValid = false
    }else if(id.length < minLength) {
      setIdError(`아이디는 최소 ${minLength}자 이상이어야 합니다.`)
      isValid = false
    }else{
      setIdError("")
    }

    // 비밀번호 검사
    if(password1 === ""){
      setPasswordError("비밀번호를 입력하세요.")
      isValid = false
    }else if(password1 !== password2){
      setPasswordError("비밀번호가 일치하지 않습니다.")
      isValid = false
    }else if(!password1.match(infoRegex)){
      setPasswordError("비밀번호는 영어와 숫자로만 입력하세요")
      isValid = false
    }else if(password1.length < minLength){
      setPasswordError(`비밀번호는 최소 ${minLength}자 이상이어야 합니다.`)
      isValid = false
    }else{
      setPasswordError("")
    }

    // 이메일 검사
    if(email === ""){
      setEmailError("이메일을 입력하세요.")
      isValid = false
    }else if(!email.match(emailRegex)){
      setEmailError("올바른 이메일형식이 아닙니다.")
      isValid = false
    }else{
      setEmailError("")
    }

    // 이용약관 동의 검사
    if (!agree) {
      setAgreeError("이용약관에 동의해야 합니다.")
      isValid = false
    }else{
      setAgreeError("")
    }

    return isValid
  }

  // 가입하기 버튼 클릭 이벤트 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault()

    if(validateForm()){
      try{        
        const userData = {
          name,
          userId: id,
          password: password1,
          email,
          agree,
        }
        
        const response = await axios.post('http://localhost:5000/api/users/register', userData)        
        if(response.data.code === 400){
          console.log(response.data.message)
          setEmailError('이미 사용 중인 이메일입니다.')        
        }else if(response.status === 200){
          console.log('가입 성공:', response.data.message)
          onClose()
          // window.location.href = '../Login.js' 
        }
      }catch(error){        
        console.error('에러 발생:', error)        
      }
    }  
  }

  //아이디 중복 확인 이벤트 핸들러
  const checkId = async () => {
    if(id === ""){
      setIdError("아이디를 입력하세요.")
      setIdTestMessage("")
      return
    }
    try{
      const response = await axios.post('http://localhost:5000/api/users/checkId', { userId: id })
      if(response.status === 200){
        // 아이디 사용여부
        if(response.data.isAvailable){
          setIdError("") // 기존오류 메세지 모두 삭제          
          setIdTestMessage("사용 가능한 아이디입니다.")
          setIdDuplicated(false)
        }else{
          setIdError("이미 사용 중인 아이디입니다.")
          setIdTestMessage("") //가용성 메세지 삭제
          setIdDuplicated(true)
        }
      }else{
        console.error('중복 확인 실패:', response.data.message)
      }
    }catch(error){
      console.error('에러 발생:', error)
    }
  }

  return(
    <div className="register_form">
      <div className="register_close">
        <button onClick={onClose}>X</button>
      </div>
      <h2>회원가입을 위해<br/>정보를 입력해주세요.</h2>
      <div className="register_info">
        <label htmlFor='name'>* 이름 
          <input
            type='text'
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <span className="error">{nameError}</span><br/>
        </label>
        <div className="register_id_check">
          <label htmlFor='id'>* 아이디 
            <input
              type='text'
              id='id'
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <span className="error">{idTestMessage}</span>
            <span className="error">{idError}</span><br/>         
          </label>
          <button onClick={checkId}>중복확인</button>       
        </div>
        <label htmlFor='password1'>* 비밀번호 
          <input
            type='password'
            id='password1'
            className="register_info_pw"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
          />
          <span className="error">{passwordError}</span><br/>
        </label>
        <label htmlFor='password2'>* 비밀번호 확인 
          <input
            type='password'
            id='password2'
            className="register_info_pw"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          /><br/>
        </label>
        <label htmlFor='email'>* 이메일 
          <input
            type='text'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span className="error">{emailError}</span><br/>
        </label>
      </div>
      <form>
        <label>
          <input
            type='checkbox'
            className="agree"
            checked={agree}
            onChange={() => setAgree(!agree)}
          /> <p>이용약관 개인정보 수집 및 정보이용에 동의합니다.</p>
        </label>
        <span className="error">{agreeError}</span><br/>
      </form>
      <div className="register_btn">
        {IdDuplicated && (
          <span className="error">이미 사용 중인 아이디입니다.</span>
        )}<br/>       
        <button type="submit" onClick={handleSubmit}>가입하기</button>      
      </div>
    </div>
  )
}

export default Register