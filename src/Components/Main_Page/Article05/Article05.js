/* eslint-disable */

import './Article05.css'
import Data_Article05 from './Data_Article05/Data_Article05'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft , faChevronRight} from "@fortawesome/free-solid-svg-icons"

function Article05() {
    return (
        <div className='Article05'>
            <a href="#">
              <div className='header'>
                <h1>
                    피트니스 휴스턴 매장 찾기
                    <span><FontAwesomeIcon icon={faChevronRight}/></span>
                </h1>
                
              </div>
            </a>    
            <div className='Article05_box'>
                <div className='Article05_Container'>
                    <ul className='Article05_Ul'>
                        {Data_Article05.map((item,id) => {
                            return <li key={item.id}
                                className='Data_Article05_li'
                            >
                                <a href="#">
                                    <div className='Data_Article05_ContentBox'>
                                        <img src={item.img[`img0${id + 1}`]} alt='박스' />
                                        <div className='Data_Article05_Title'>
                                            <span>{item.Title}</span>
                                        </div>
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

export default Article05