import React, { useState, useEffect } from "react"
import './Information.css'
import axios from 'axios'

function Information({ onClose }) {
  const [name, setName] = useState("")
  const [id, setId] = useState("")
  const [password1, setPassword1] = useState("") 
  const [password2, setPassword2] = useState("") 
  const [email, setEmail] = useState("")
  const [IdDuplicated, setIdDuplicated] = useState(false)
  const [userData, setUserData] = useState(null)

  const [nameError, setNameError] = useState("")
  const [idError, setIdError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [idTestMessage, setIdTestMessage] = useState("")
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const [deleteSuccess, setDeleteSuccess] = useState(false)

  const [loginId, setLoginId] = useState("")  

  useEffect(() => {
    const loginId = localStorage.getItem('userId')
    setLoginId(loginId)
    // 데이터 가져옴
    fetchUserData(loginId) 
  }, [loginId])

  // 사용자 정보 조회
  const fetchUserData = async(userId) => {
    try{
      const response = await axios.get(`http://localhost:5000/api/users/${userId}`)      
      if(response.status === 200){
        const user = response.data        
        setName(user.name)
        setId(user.userId)
        setPassword1(user.password)
        setEmail(user.email)
        setUserData(user)
        
      }else if(response.data.code === 400){
        console.error('조회 에러:', response.data.message)
      }
    }catch(error){
      console.error('에러 발생:', error)
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

  const validateForm = () => {  
    let isValid = true
    const nameRegex = /^[가-힣a-zA-Z]+$/
    const infoRegex = /^[a-zA-Z0-9]+$/
    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
    const minLength = 6

    if(name === ""){
      setNameError("이름을 입력하세요.")
      isValid = false
    }else if(!name.match(nameRegex)){
      setNameError("이름은 한글이나 영어만 입력해주세요.")
      isValid = false
    }else{
      setNameError("")
    }

    if(id === ""){
      setIdError("아이디를 입력하세요.")
      isValid = false
    }else if(!id.match(infoRegex)){
      setIdError("아이디는 영어와 숫자로만 입력하세요.")
      isValid = false
    }else{
      setIdError("")
    }

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

    if(email === ""){
      setEmailError("이메일을 입력하세요.")
      isValid = false
    }else if(!email.match(emailRegex)){
      setEmailError("올바른 이메일 형식이 아닙니다.")
      isValid = false
    }else{
      setEmailError("")
    }

    return isValid
  }

  const handleUpdate = async () => {
    if(validateForm()){
      try{
        const updatedUserData = {
          name,
          userId: id,
          password: password1,
          email,
        }        

        const response = await axios.put(`http://localhost:5000/api/users/${userData._id}`, updatedUserData)
        if(response.status === 200){
          console.log('정보가 성공적으로 업데이트되었습니다.')
          setUpdateSuccess(true) 
          
          setTimeout(() => {
            setUpdateSuccess(false)
          }, 3000)
        }else{
          console.error('정보 업데이트 실패:', response.data.message)
        }
      }catch (error){
        console.error('에러 발생:', error)
      }
    }
  }

  const handleDelete = async () => {
    try{
      const response = await axios.delete(`http://localhost:5000/api/users/${userData._id}`)

      if(response.status === 200){
        console.log('계정이 성공적으로 삭제되었습니다.')
        setDeleteSuccess(true)        

        setTimeout(() => {
          setDeleteSuccess(false)
        }, 3000)
      }else{
        console.error('계정 삭제 실패:', response.data.message)
      }
    }catch(error){
      console.error('에러 발생:', error)
    }
  }  

  return(    
      <div className="info_container">
      <div className="info_modal">
        <div className="info_form">
          <div className="info_close">
            <button onClick={onClose}>X</button>
          </div>
          <div className="info_title">
            <h2>회원정보 수정</h2>
          </div>          
          <div className="info_change">
            <label htmlFor='name'>* 이름 
              <input
                type='text'
                id='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <span className="error">{nameError}</span><br />
            </label>
            <div className="info_id_check">
              <label htmlFor='id'>* 아이디 
                <input
                  type='text'
                  id='id'
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                />
                <span className="error">{idTestMessage}</span>
                <span className="error">{idError}</span><br />
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
              />
            </label><br />
            <label htmlFor='email'>* 이메일 
              <input
                type='text'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="error">{emailError}</span><br />
            </label>
          </div>
          <div className="info_btn">
            {IdDuplicated && (
              <span className="error">이미 사용 중인 아이디입니다.</span>
            )}<br />
            {updateSuccess && (
              <span className="success">회원정보 수정 완료</span>
            )}<br/>
            {deleteSuccess && (
              <span className="success">회원정보 삭제 완료</span>
            )}<br/>
            <button onClick={handleUpdate}>수정</button>
            <button onClick={handleDelete}>계정 삭제</button>
          </div>
        </div>  
      </div>
    </div>       
  )
}

export default Information