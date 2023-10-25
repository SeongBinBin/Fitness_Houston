import React, { useRef, useState } from "react"
import './Equipment.css'
import Goods from './Goods'

function Equipment(){  
  const containerRef = useRef(null)
  const [selectedCategory, setSelectedCategory] = useState(null)
  
  // 가로스크롤 초기화
  const resetScroll = () => {
    const container = containerRef.current
    
    if (container){
      if (container.scrollLeft === 0){
        container.scrollTo({ left: container.scrollWidth, behavior: 'smooth' })
      }else if(container.scrollLeft >= container.scrollWidth - container.clientWidth){
        container.scrollTo({ left: 0, behavior: 'smooth' })
      }
    }
  }

  //카테고리 선택
  const handleCategoryClick = (category) => {
    setSelectedCategory(category)
  }

  return(
    <div className="goods">
      <div className="goods_category">
        <button className="slide-button left" onClick={() => resetScroll()}><h2>{"<<"}</h2></button>
        <div className="slider-container" ref={containerRef}>
          <div className="good_category_img" onClick={() => handleCategoryClick('')}>
            <div className="view_all">전체보기</div>
          </div>
          <div className="good_category_img" onClick={() => handleCategoryClick('A')}>
            <img src={require('../../../../asset/imgs/category/카테고리이미지(스미스짐).jpg')} alt="스미스짐" />
            <div className="img_text"><h1>스미스짐</h1></div>
          </div>          
          <div className="good_category_img" onClick={() => handleCategoryClick('B')}>
            <img src={require('../../../../asset/imgs/category/카테고리이미지(멀티짐).jpg')} alt="멀티짐" />
            <div className="img_text"><h1>멀티짐</h1></div>
          </div>          
          <div className="good_category_img" onClick={() => handleCategoryClick('C')}>
            <img src={require('../../../../asset/imgs/category/카테고리이미지(멀티랙).jpg')} alt="멀티랙" />
            <div className="img_text"><h1>멀티랙</h1></div>
          </div>          
          <div className="good_category_img" onClick={() => handleCategoryClick('D')}>
            <img src={require('../../../../asset/imgs/category/카테고리이미지(벤치).jpg')} alt="벤치" />
            <div className="img_text"><h1>벤치</h1></div>
          </div>          
          <div className="good_category_img" onClick={() => handleCategoryClick('E')}>
            <img src={require('../../../../asset/imgs/category/카테고리이미지(벤치프레스).jpg')} alt="벤치프레스" />
            <div className="img_text"><h1>벤치프레스</h1></div>
          </div>          
          <div className="good_category_img" onClick={() => handleCategoryClick('F')}>
            <img src={require('../../../../asset/imgs/category/카테고리이미지(런닝머신).jpg')} alt="런닝머신" />
            <div className="img_text"><h1>런닝머신</h1></div>
          </div>          
          <div className="good_category_img" onClick={() => handleCategoryClick('G')}>
            <img src={require('../../../../asset/imgs/category/카테고리이미지(사이클).jpg')} alt="사이클" />
            <div className="img_text"><h1>사이클</h1></div>
          </div>          
          <div className="good_category_img" onClick={() => handleCategoryClick('H')}>
            <img src={require('../../../../asset/imgs/category/카테고리이미지(로잉머신).jpg')} alt="로잉머신" />
            <div className="img_text"><h1>로잉머신</h1></div>
          </div>          
          <div className="good_category_img" onClick={() => handleCategoryClick('I')}>
            <img src={require('../../../../asset/imgs/category/카테고리이미지(일립티컬).jpg')} alt="일립티컬" />
            <div className="img_text"><h1>일립티컬</h1></div>
          </div>          
          <div className="good_category_img" onClick={() => handleCategoryClick('J')}>
            <img src={require('../../../../asset/imgs/category/카테고리이미지(복싱).jpg')} alt="복싱" />
            <div className="img_text"><h1>복싱</h1></div>
          </div>                         
        </div>        
        <button className="slide-button right" onClick={() => resetScroll()}><h2>{">>"}</h2></button>
      </div>
      <div className="goods_area">
        <div className="menu_goods">
          <Goods selectedCategory={selectedCategory} />
        </div>
      </div>
    </div>
  )
}

export default Equipment