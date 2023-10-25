import React, { useState } from 'react'
import './Goods.css'
import data from './goods.json'
import Modal from './Modal'

function Goods({ selectedCategory }){
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [pageNumber, setPageNumber] = useState(1)
  const productsPerPage = 16 // 페이지당 상품갯수

  // 모달창 열기
  const openModal = (product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  // 모달창 닫기
  const closeModal = () => {
    setIsModalOpen(false)
  }

  // 현재페이지 시작 및 끝 계산
  const startIndex = (pageNumber - 1) * productsPerPage
  const endIndex = pageNumber * productsPerPage

  // 카테고리별 필터링
  const filteredProducts = selectedCategory
  ? data.data.filter((product) => product.division === selectedCategory)
  : data.data

  // 현재페이지 가져오기
  const productsOnPage = filteredProducts.slice(startIndex, endIndex)

  const ImgData = productsOnPage.map((detail, index) => {
    return (
      <div className="goods_card" key={index} onClick={() => openModal(detail)}>
        <img src={detail.url} alt={detail.name} />
      </div>
    )
  })

  return (
    <>
      <div className='menu_goods_box'>
        {ImgData}
        <Modal isOpen={isModalOpen} onClose={closeModal} product={selectedProduct} />
      </div>      
      <div className="pagination">
        <button
          onClick={() => setPageNumber(pageNumber - 1)}
          disabled={pageNumber === 1}
        >
          {'<<'}
        </button>
        <span>Page({pageNumber})</span>
        <button
          onClick={() => setPageNumber(pageNumber + 1)}
          disabled={endIndex >= filteredProducts.length}
        >
          {'>>'}
        </button>
      </div>
    </>
  )
}

export default Goods