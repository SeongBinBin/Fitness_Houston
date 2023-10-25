import React from "react";
import './ConHead.css'

function ConHead(){
  return(
  <>
    <div className="con_head">
      <div className="con_box">
        <div className="con_title_info">
          <h2>Equipment Type</h2>
        </div>
        <div className="con_title_text">
          <ul>
            <li>홈</li>            
            <li>메뉴</li>            
            <li>피트니스 기구</li>
          </ul>
        </div>
      </div>
      <div className="con_simple">
        <div className="con_simple_text">
          <p>운동 효율 UP!</p><br/>
          <p>피트니스 웨이트</p><br/>
          <p>피트니스 기구의 모든 것!</p>
        </div>
      </div>
    </div>    
  </>    
  )
}

export default ConHead