/* eslint-disable */
/*global kakao */
import React, { useEffect, useState, useRef } from "react";
import './NativeMap.css'

function NativeMap() {
    const [latitude, setLatitude] = useState('')     // 위도 정보
    const [longitude, setLongitude] = useState('')  // 경도 정보

    useEffect(() => {
        let container = document.getElementById("map")      // 지도를 담을 영역의 DOM 레퍼런스
        let options = {
            center: new kakao.maps.LatLng(latitude, longitude),      // 지도의 중심좌표
            level: 5,     // 지도의 확대 레벨
        } 
        const map = new kakao.maps.Map(container, options)      // 지도 생성 및 객체 리턴 

        const zoomControl = new kakao.maps.ZoomControl()
        map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT)   // 지도 확대 축소 기능

        var marker = new kakao.maps.Marker({
            // position: map.getCenter()
            // clickable: true
        })

        const iwContent = 
        `
        <div>
            <div class="customOverlay">
                <span class="travelRecord">여행 기록</span>
                <span class="visitLater">가볼 곳</span>
                <span class="closeMarker">X</span>
            </div>
        </div>
        `
        var customOverlay = null
        let clickLatLngInfo
        const contorlClick = (mouseEvent) =>{
            clickLatLngInfo = mouseEvent.latLng
            var latlng = mouseEvent.latLng
            marker.setPosition(latlng)

            if (customOverlay) {
                customOverlay.setMap(null)
            }

            customOverlay = new kakao.maps.CustomOverlay({
                position: latlng,
                content: iwContent,
            })

            marker.setMap(map)
            customOverlay.setMap(map)

            kakao.maps.event.removeListener(map, 'click', contorlClick)
        }
        kakao.maps.event.addListener(map, 'click', contorlClick)

        function handleClick(event) {
            if (event.target.classList.contains('travelRecord')) {
                window.ReactNativeWebView.postMessage(JSON.stringify(clickLatLngInfo))  // 리액트에서 RN으로 값 전송
            } else if (event.target.classList.contains('closeMarker')) {
                if (marker) {
                    marker.setMap(null)
                }
                if (customOverlay) {
                    customOverlay.setMap(null)
                }
                kakao.maps.event.addListener(map, 'click', contorlClick)
            }
        }
        document.addEventListener('click', handleClick)

        document.addEventListener('message', (e) => {   // RN코드에서 위도, 경도 값을 가져오는 부분
            const data = JSON.parse(e.data)
            setLatitude(data.latitude)
            setLongitude(data.longitude)
        });

        return () => {  // 컴포넌트 언마운트 시 이벤트 핸들러 제거
            document.removeEventListener('click', handleClick)
        }
    }, [latitude, longitude])

    return(
        <>
            <div className="map">
                <div className="native_map_container">
                    <div className="native_map_area">
                        <div id="map">
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default NativeMap
