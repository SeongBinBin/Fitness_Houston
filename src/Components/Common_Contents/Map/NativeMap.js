/* eslint-disable */
/*global kakao */
import React, { useEffect, useState, useRef } from "react";
import { Map } from "react-kakao-maps-sdk"
import './NativeMap.css'

function NativeMap() {
    const [latitude, setLatitude] = useState(''); // 위도 정보
    const [longitude, setLongitude] = useState(''); // 경도 정보

    useEffect(() => {
        let container = document.getElementById("map"); // 지도를 담을 영역의 DOM 레퍼런스
        let options = {
            center: new kakao.maps.LatLng(latitude, longitude), // 지도의 중심좌표
            level: 5, // 지도의 확대 레벨
        };
        const map = new kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴

        const zoomControl = new kakao.maps.ZoomControl();
        map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT); // 지도 확대 축소 기능

        var geocoder = new kakao.maps.services.Geocoder();
        var marker = new kakao.maps.Marker();

        const iwContent =
            `
        <div>
            <div class="customOverlay">
                <span class="travelRecord">여행 기록</span>
                <span class="visitLater">가볼 곳</span>
                <span class="closeMarker">X</span>
            </div>
        </div>
        `;

        var customOverlay = null
        var receiveData = null

        searchAddrFromCoords(map.getCenter(), displayCenterInfo);

        const clickHandler = function (mouseEvent) {
                searchDetailAddrFromCoords(mouseEvent.latLng, function (result, status) {
                    if (status === kakao.maps.services.Status.OK) {
                        var detailAddr = result[0].address.address_name

                        var parts = detailAddr.split(' ');
                        var city = parts[0]
                        var region = parts[1]

                        if(city === '서울'){
                            city = '서울특별시'
                        }else if(city === '대전'){
                            city = '대전광역시'
                        }else if(city === '인천'){
                            city = '인천광역시'
                        }else if(city === '광주'){
                            city = '광주광역시'
                        }else if(city === '대구'){
                            city = '대구광역시'
                        }else if(city === '울산'){
                            city = '울산광역시'
                        }else if(city === '부산'){
                            city = '부산광역시'
                        }else if(city === '경기'){
                            city = '경기도'
                        }else if(city === '충북'){
                            city = '충청북도'
                        }else if(city === '충남'){
                            city = '충청남도'
                        }else if(city === '전북'){
                            city = '전라북도'
                        }else if(city === '전남'){
                            city = '전라남도'
                        }else if(city === '경북'){
                            city = '경상북도'
                        }else if(city === '경남'){
                            city = '경상남도'
                        }

                        if (customOverlay) {
                            customOverlay.setMap(null)
                        }
                        customOverlay = new kakao.maps.CustomOverlay({
                            position: mouseEvent.latLng,
                            content: iwContent,
                        });

                        customOverlay.setMap(map);
                        marker.setPosition(mouseEvent.latLng);
                        marker.setMap(map);

                        kakao.maps.event.removeListener(map, 'click', clickHandler);

                        const data = {
                            clickLatLng: mouseEvent.latLng,
                            cityValue: city,
                            regionValue: region
                        };
                        receiveData = data
                    }
                });
        };
        kakao.maps.event.addListener(map, 'click', clickHandler)
        
        
        function handleClick(event){
            if (event.target.classList.contains('travelRecord')) {
                window.ReactNativeWebView.postMessage(JSON.stringify(receiveData))  // 리액트에서 RN으로 값 전송
            } else if(event.target.classList.contains('closeMarker')){
                if (marker) {
                    marker.setMap(null)
                }
                if (customOverlay) {
                    customOverlay.setMap(null)
                }
                kakao.maps.event.addListener(map, 'click', clickHandler)
            }
        }
        document.addEventListener('click', handleClick)

        kakao.maps.event.addListener(map, 'click', clickHandler);

        kakao.maps.event.addListener(map, 'idle', function () {
            searchAddrFromCoords(map.getCenter(), displayCenterInfo);
        });

        function searchAddrFromCoords(coords, callback) {
            // 좌표로 행정동 주소 정보를 요청합니다
            geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
        }

        function searchDetailAddrFromCoords(coords, callback) {
            // 좌표로 법정동 상세 주소 정보를 요청합니다
            geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
        }

        function displayCenterInfo(result, status) {
            if (status === kakao.maps.services.Status.OK) {
                var infoDiv = document.getElementById('centerAddr');

                for (var i = 0; i < result.length; i++) {
                    // 행정동의 region_type 값은 'H' 이므로
                    if (result[i].region_type === 'H') {
                        infoDiv.innerHTML = result[i].address_name;
                        break;
                    }
                }
            }
        }

        document.addEventListener('message', (e) => {   // RN에서 값을 전송받는 부분
            const data = JSON.parse(e.data);
            setLatitude(data.latitude);
            setLongitude(data.longitude);
        });

        return () => {  // 컴포넌트 언마운트 시 이벤트 핸들러 제거
            document.removeEventListener('click', handleClick)
        }
    }, [latitude, longitude]);

    return (
        <>
            <div className="map">
                <div className="native_map_container">
                    <div className="native_map_area">
                        <div id="map"></div>
                        <div className="hAddr">
                            <span className="regionTitle">지도중심기준 주소정보</span>
                            <span id="centerAddr"></span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NativeMap;
