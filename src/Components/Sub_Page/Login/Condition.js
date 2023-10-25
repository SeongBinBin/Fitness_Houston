import React, { useState } from "react"
import './Condition.css'
import Information from "./Information"
import axios from "axios"
import {useNavigate} from 'react-router-dom'
import NavSimple from "../../Common_Contents/NavSimple/NavSimple"

function Condition() {
  const [conditionModalOpen, setConditionModalOpen] = useState(true)
  const [informationModalOpen, setInformationModalOpen] = useState(false)

  const navigate = useNavigate()

  const openInformationModal = () => {
    setConditionModalOpen(false)
    setInformationModalOpen(true)
  }

  const closeInformationModal = () => {
    setConditionModalOpen(true)
    setInformationModalOpen(false)
  }

  const closeConditionModal = () => {
    setConditionModalOpen(false)
    navigate(-1)  // 뒤로 가기
  }

  const handleLogout = async () => {
    try {
      const response = await axios.post('https://port-0-fitness-houston-login-euegqv2llo5f0e8f.sel5.cloudtype.app/api/users/logout')
      if (response.status === 200) {
        // window.location.href = '/'
        navigate(-1)
        
        localStorage.removeItem('isLoggedIn')
        localStorage.removeItem('name')
        localStorage.removeItem('userId')          
        localStorage.removeItem('email')
        localStorage.removeItem('isAdmin')
      }
    } catch (error) {
      console.error('로그아웃 에러:', error)
    }
  }

  return(
    <>
      <NavSimple />
      {conditionModalOpen && (
        <div className="condition_container">
          <div className="condition_modal">
            <div className="condition_close">
              <button onClick={closeConditionModal}>X</button>
            </div>
            <div className="condition_box">
              <div className="condition_info">
                <button className="info_change_btn" onClick={openInformationModal}>
                  <span className="material-symbols-outlined">
                    person
                  </span>
                  <p>회원정보 수정</p>
                </button>
              </div>
              <div className="condition_logout">
                <button className="logout_btn" onClick={handleLogout}>
                  <span className="material-symbols-outlined">
                    logout
                  </span>
                  <p>로그아웃</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {informationModalOpen && (
        <Information onClose={closeInformationModal} />
      )}
    </>
  )
}

export default Condition





