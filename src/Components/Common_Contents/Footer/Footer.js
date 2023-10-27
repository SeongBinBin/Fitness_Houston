import React from "react";
import './Footer.css'
import {AiOutlineDown, AiOutlineUp, AiOutlineRight, AiOutlineLine} from 'react-icons/ai'
import {BsHeadset, BsTelephone} from 'react-icons/bs'

function Footer(){
    return(
        <div className="footer">
            <div className="footer_container">
                <div className="footer_top">
                    <div className="footer_header">
                        <div className="footer_header_text">
                            <div>회사소개</div>
                            <div>이용약관</div>
                            <div>위치정보이용약관</div>
                            <div>개인정보처리방침</div>
                            <div>이메일무단수집거부</div>
                            <div>사이버감사실</div>
                        </div>
                        <div className="footer_select">
                            <div className="footer_select_box">
                                <p className="footer_hover_main">REFERENCE SITE <AiOutlineDown className="down_icon"/></p>
                                <div className="footer_select_hover">
                                    <p className="footer_hover">
                                        <a href="https://mall.hanssem.com/main.html" target="_blank" rel="noopener noreferrer">(주) 한샘</a>
                                        <AiOutlineUp className="up_icon"/>
                                    </p>
                                    <p className="footer_hover">
                                        <a href="https://gymboxx.co.kr/" target="_blank" rel="noopener noreferrer">짐박스</a>
                                    </p>
                                    <p className="footer_hover">
                                        <a href="https://www.bodyx.co.kr/" target="_blank" rel="noopener noreferrer">바디엑스</a>
                                    </p>
                                    <p className="footer_hover">
                                        <a href="https://www.mega-mgccoffee.com/" target="_blank" rel="noopener noreferrer">메가커피</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer_bottom">
                    <div className="footer_notice">
                        <div className="footer_info">
                            <p className="footer_info_big">고객센터 이용안내</p>
                            <p className="footer_info_small">평일 09:00 - 18:00<br/>토요일 09:00 - 13:00</p>
                            <p className="footer_info_small">(일요일, 공휴일 휴무)</p>
                        </div>
                        <div className="footer_info">
                            <p className="footer_info_middle">피트니스 휴스턴 문의 <AiOutlineRight className="right_icon"/></p>
                            <p className="footer_info_small">이용시간, 이용안내 및 기타문의</p>
                            <p className="footer_info_call"><BsTelephone className="call_icon"/>1234-1234</p>
                        </div>
                        <div className="footer_info">
                            <p className="footer_info_middle">채용 문의 <AiOutlineRight className="right_icon"/></p>
                            <p className="footer_info_small">트레이너 및 인포 채용 문의</p>
                            <p className="footer_info_call"><BsTelephone className="call_icon"/>1234-1234</p>
                        </div>
                        <div className="footer_info">
                            <button className="footer_info_btn"><BsHeadset />트레이닝 빠른상담</button>
                        </div>
                        <div className="footer_info empty"></div>
                    </div>
                    <div className="footer_text">
                        <div className="footer_text_content">
                            <div className="footer_text_info">
                                <p>(주)피트니스 휴스턴 대표자 : AAA</p>
                                <AiOutlineLine className="column_icon"/>
                                <p>대전광역시 서구 대덕대로 XXX</p>
                                <AiOutlineLine className="column_icon"/>
                                <p>사업자등록번호 : 123-XX-6789</p>
                                <AiOutlineLine className="column_icon"/>
                                <p>통신판매업신고 : 1234-XXXX-5678</p>
                            </div>
                            <p>XXX은행 구매안전 서비스 (채무지급 미보증)</p>
                            <p>고객님은 안전거래를 위해 현금결제 시 저희 피트니스에서 가입한 XXX은행으로 구매안전 서비스를 이용하실 수도 있고 없을 수도 있습니다.</p>
                        </div>
                        <p>Copyright © 2023 FITNESS HOUSTON Co. Ltd. All rights reserved</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Footer