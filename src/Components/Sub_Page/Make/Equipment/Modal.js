import React,{useEffect, useState} from 'react'
import './Modal.css'
import VideoModal from './VideoModal'

function Modal({ isOpen, onClose, product }){
  //모달창 외 영역 클릭시 닫기 방지
  const closeModal = () => {
    if(!isOpen){
      onClose()
    }
  }

  //모달창 영역 클릭시 닫기 방지
  const stopPropagation = (e) => {
    e.stopPropagation()
  }

  const [VideoModalOpen, setVideoModalOpen] = useState(false)

  //모달창 실행시 스크롤 lock
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('body-scroll-lock')
    } else {
      document.body.classList.remove('body-scroll-lock')
    }

    return () => {
      document.body.classList.remove('body-scroll-lock')
    }
  }, [isOpen])

  if(!isOpen) return null
  
  const openVideoModal = () => {
    setVideoModalOpen(true)
  }

  const closeVideoModal = () => {
    setVideoModalOpen(false)
  }

  return(
    <div className="modal_bg" onClick={closeModal}>      
      {VideoModalOpen ? (
        <VideoModal
          videoUrl={product.youtubeUrl}
          onClose={closeVideoModal}
        />
      ) : (
        <div className="modal_box" onClick={stopPropagation}>
          <button onClick={onClose}>X</button>
          <img src={product.url} alt={product.name} />
          <div className='modal_box_text'>
            <h2>이름 : {product.name}</h2>
            <p>운동 부위 : <br/>{product.part}</p>
            <p>운동 종류 : <br/>{product.type}</p> 
          </div>
          <div className='modal_box_more'>          
            <button onClick={openVideoModal}>자세히보기</button>        
          </div>
        </div>
      )}
    </div>
  )
}

export default Modal