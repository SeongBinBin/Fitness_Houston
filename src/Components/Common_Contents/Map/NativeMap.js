/* eslint-disable */
/*global kakao */
import React, { useEffect, useState } from "react";
import './NativeMap.css'

function NativeMap() {
    const [latitude, setLatitude] = useState(36.34926856920201)     // 위도 정보
    const [longitude, setLongitude] = useState(127.37767101949346)  // 경도 정보

    useEffect(() => {
        let container = document.getElementById("map")      // 지도를 담을 영역의 DOM 레퍼런스
        let options = {
          center: new kakao.maps.LatLng(latitude, longitude),      // 지도의 중심좌표
        //   draggable: false,
          level: 5,     // 지도의 확대 레벨
        } 

        const map = new kakao.maps.Map(container, options)      // 지도 생성 및 객체 리턴 
        // map.setDraggable(false);
        // map.setZoomable(false);

    }, [latitude, longitude])
    
    return(
    <>
        <div className="map">
            <div className="native_map_container">
                <div className="native_map_area">
                    <div id="map"></div>
                </div>
            </div>
        </div>
    </>
    )
}
export default NativeMap