/* eslint-disable */

import './Article08.css'
import Data_Article08 from './Data_Article08/Data_Article08'
import instagram from '../../../asset/img/Article08/instagram.png'

function Article08() {
    return (
        <div className='Article08'>
            <a href='#' className='header'>
                    <img src={instagram} alt="인스타그램"/>
                    <h1>#피트니스 휴스턴 Instagram</h1>
            </a>
            <div className='Article08_box'>
                <div className='Article08_Container'>
                    <ul className='Article08_Ul'>
                        {Data_Article08.map((item, id) => {
                            return <li key={item.id}
                                className = 'Article08_li'
                            >
                                <a href='#'>
                                    <div className='Article08_img'>
                                        <img src={item.img[`img0${id + 1}`]} alt='이미지' />
                                    </div>
                                    <div className='Article08_titlebox'>
                                        <h4>{item.title}</h4>
                                        <span>{item.subTitle}</span>
                                    </div>
                                </a>
                            </li>
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Article08