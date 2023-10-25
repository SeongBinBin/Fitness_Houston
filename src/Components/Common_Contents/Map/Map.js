/* eslint-disable */
/*global kakao */
import React, { useEffect, useState } from "react";
import './Map.css'
import NavSimple from '../NavSimple/NavSimple'
import {markerdata} from './markerData'

function Map() {
    const [latitude, setLatitude] = useState(36.34926856920201)     // 위도 정보
    const [longitude, setLongitude] = useState(127.37767101949346)  // 경도 정보
    const [title, setTitle] = useState('본점 대전점')   // 지점 정보
    const [locationIndex, setLocationIndex] = useState(null)

    useEffect(() => {
        let container = document.getElementById("map")      // 지도를 담을 영역의 DOM 레퍼런스
        let options = {
          center: new kakao.maps.LatLng(latitude, longitude),      // 지도의 중심좌표
          draggable: false,
          level: 3,     // 지도의 확대 레벨
        } 

        const map = new kakao.maps.Map(container, options)      // 지도 생성 및 객체 리턴 
        // map.setDraggable(false);
        // map.setZoomable(false);

        markerdata.forEach((data) => {
            const marker = new kakao.maps.Marker({     // 마커 생성
                map: map,
                position: new kakao.maps.LatLng(data.lat, data.lng),
                title: data.title,
            })

            kakao.maps.event.addListener(marker, 'click', function() {              
                if (customOverlay.getMap() === null) {      // 마커 클릭시 커스텀오버레이 토글
                    customOverlay.setMap(map);
                } else {
                    customOverlay.setMap(null);
                }
            })

            const customOverlay = new kakao.maps.CustomOverlay({        // 커스텀오버레이
                map: map,
                position: new kakao.maps.LatLng(data.lat, data.lng),
                content: `<div class="custom_overlay">${data.title}</div>`,
                yAnchor: 1,
            })
            customOverlay.setMap(null)
        })
    }, [latitude, longitude])
    
    return(
    <>
        <NavSimple />
        <div className="map">
            <div className="map_container">
                <div className="map_area">
                    <div id="map"></div>
                </div>
                <div className="location_info">
                    <ul className="location_info_ul">
                        {markerdata.map((data, index) => (
                            <li 
                            key={index}
                            className={`location_info_li ${locationIndex === index? 'selected': ''}`}
                            onClick={() => {    // 지점 클릭시 해당 위도, 경도로 중심값 이동
                                setTitle(data.title)
                                setLatitude(data.lat)
                                setLongitude(data.lng)
                                setLocationIndex(index)     // 클릭된 위치를 선택
                            }}
                            >
                            {data.title}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    </>
    )
}
export default Map