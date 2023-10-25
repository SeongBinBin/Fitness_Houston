import React from "react";
import Pagination from "react-js-pagination";
import {AiOutlineLeft, AiOutlineRight, AiOutlineDoubleLeft, AiOutlineDoubleRight} from 'react-icons/ai'
import './Paging.css'

const Paging = ({page, count, setPage, itemsPerPage}) => {
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
                onChange = {setPage}                    // 페이지가 바뀔 때 핸들링 하는 함수
            >
            </Pagination>
        </div>
    )
}
export default Paging