/* eslint-disable */
import './Article01.css'
import '../../../asset/css/reset.css'
import Data_Article01 from './Data_Article01/Data_Article01'

function Article01() {
    console.log( Data_Article01)
    return (
        <div className='Article01'>
            <div className='Article01_Container'>
                <ul className = 'Article01_Icon'>
                {Data_Article01.map( (item, id) => {
                    return <li key={item.id}
                        className = 'Icon_li'
                    >
                            <a href ="#">
                                <div className="Icon_Box">
                                    <div className="Icon_Img">
                                        <img src = {item.img[`icon0${id+1}`]} />
                                    </div>
                                    <span>{item.title } </span>
                                </div>
                            </a>
                    </li>
                } )}
                </ul>
            </div>
        </div>
    )
}

export default Article01

