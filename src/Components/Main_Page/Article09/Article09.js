/* eslint-disable */

import './Article09.css'
import youtube_Video from '../../../asset/video/Article09.mp4'
import youtube from '../../../asset/img/Article09/youtube.png'

function Article09() {
    return (
        <div className='Article09'>
            <a href='#' className='header'>
                <img src={youtube} alt='유튜브' />
                <h1>피트니스 휴스턴 유튜브 바로가기</h1>
            </a>
            <div className='Article09_Video'>
                <div className='Article09_Container'>
                    <video src={youtube_Video} controls></video>
                </div>
            </div>
        </div>
    )
    
}

export default Article09