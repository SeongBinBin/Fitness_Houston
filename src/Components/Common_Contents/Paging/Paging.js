import React from "react";
import Pagination from "react-js-pagination";
import {AiOutlineLeft, AiOutlineRight, AiOutlineDoubleLeft, AiOutlineDoubleRight} from 'react-icons/ai'
import './Paging.css'

const Paging = ({page, count, setPage, itemsPerPage}) => {
    const scroll_zero = () => {
        window.scrollTo({
            top: 0,
            left: 0,
        })
    }
    const handlePageChange = (pageNumber) => {
        setPage(pageNumber)     // 페이지 변경을 처리하는 함수 호출
        scroll_zero()           // 페이지 변경 후에 scroll_zero 함수 호출
    }

    return(
        <div>
            <Pagination
                activePage = {page}                     // activePage : 현재 페이지
                itemsCountPerPage = {itemsPerPage}      // itemsCountPerPage : 한 페이지 당 보여줄 아이템 수
                totalItemsCount = {count}               // totalItemsCount : 총 아이템 수
                pageRangeDisplayed = {5}                // pageRangeDisplayed : paginator에서 보여줄 페이지 범위
                prevPageText = {<AiOutlineLeft className="paging_icon"/>}           // <
                nextPageText = {<AiOutlineRight className="paging_icon"/>}          // >
                firstPageText = {<AiOutlineDoubleLeft className="paging_icon"/>}    // <<
                lastPageText = {<AiOutlineDoubleRight className="paging_icon"/>}    // >>
                onChange={handlePageChange} // 페이지 변경 시 핸들링하는 함수
            >
            </Pagination>
        </div>
    )
}
export default Paging