import React from "react";
import './ConBanner.css'
import FitImg from '../../Image/배너이미지.jpg'

function ConBanner(){
  return(
    <>
      <div className="banner">
        <div className="banner_box">
          <div className="banner_box_text">
            <div className="banner_box_text01">
              <p>피트니스 휴스턴의 모든 피트니스 기구들</p>
              <h2>몸매가 패션이고 <br/>몸이 곧 스타일이다</h2>
            </div>
            <div className="banner_box_text02">
              <h3>들어올땐 두발 나갈땐 네발</h3>
              <p>피트니스 휴스턴이 제공하는<br/>
                다양한 운동기구로 더욱 멋지게 이쁘게!<br/>
                지금 바로 저희 피트니스 휴스턴를 만나보세요!
              </p>
            </div>
          </div>
          <div className="banner_box_img">
            <img src={FitImg} alt="전경사진"/>
          </div>
        </div>
        <div className="menu_title">
          <div className="menu_title_box">
            <h3>피트니스 휴스턴의 피트니스 기구</h3>
            <h2>FITNESS EQUIPMENT</h2>
          </div>
        </div>
      </div>      
    </>
  )
}

export default ConBanner 