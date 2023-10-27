import React, {useState, useRef, useEffect} from "react";
import axios from "axios";
import Paging from "../../Components/Common_Contents/Paging/Paging";
import './Announcement.css'

function Announcement(){
    const [author, setAuthor] = useState("")        // 작성자
    const [title, setTitle] = useState("")          // 제목
    const [contents, setContents] = useState("")    // 내용
    const [listitems, setListItems] = useState([])  // 작성 리스트 관리
    const [modal, setModal] = useState(false)       // 작성 모달
    const [update, setUpdate] = useState(-1)        // 수정 모달, -1은 현재 수정중이 아님을 나타냄
    const [viewContents, setViewContents] = useState([])    // 제목 클릭 시 내용 부분 보이기 / 숨기기
    const [announcementData, setAnnouncementData] = useState([])
    const [currentAuthor, setCurrentAuthor] = useState("")      // 현재 선택된 공지사항의 작성자
    const [currentTitle, setCurrentTitle] = useState("")        // 현재 선택된 공지사항의 제목
    const [currentContent, setCurrentContent] = useState("")    // 현재 선택된 공지사항의 내용
    const [page, setPage] = useState(1)
    const [isAdmin, setIsAdmin] = useState('')
    const itemsPerPage = 10 // 한 페이지당 아이템 수
    const authorFocus = useRef(null)
    const titleFocus = useRef(null)
    const contentsFocus = useRef(null)

    const toggleModal = (isOpen) => {
        setModal(isOpen)
        setAuthor('')
        setTitle('')
        setContents('')
        document.body.style.overflow = isOpen? 'hidden': 'auto'
    }

    const create_announcement = () => {
        const newItem = {
            author: author,
            title: title,
            contents: contents,
        }
        
        if(!author){
            alert('입력되지 않은 곳이 있습니다.')
            authorFocus.current.focus()
        }else if(!title){
            alert('입력되지 않은 곳이 있습니다.')
            titleFocus.current.focus()
        }else if(!contents){
            alert('입력되지 않은 곳이 있습니다.')
            contentsFocus.current.focus()
        }else{
            axios.post("https://port-0-fitness-houston-test-euegqv2llo5f0e8f.sel5.cloudtype.app/api/announcement", newItem)
            .then((response) => {
                const {author, title, contents} = response.data
                setListItems([
                    {
                        id: listitems.length + 1,
                        author: author,
                        title: title,
                        contents: contents,
                    },
                    ...listitems,
                ])
                toggleModal(false)
                document.body.style = 'overflow: auto'
            })
            .catch((error) => {
                console.log(error)
            })
        }
    }

    const toggleContents = async(id) => {
        setViewContents((prevState) => ({   // tbody_contents 토글
            ...prevState,
            [id]: !prevState[id],
        }))

        if(!viewContents[id]){  // tbody_contents가 false에서 true 될때만 조회수 증가
            try{
                const response = await axios.put(`https://port-0-fitness-houston-test-euegqv2llo5f0e8f.sel5.cloudtype.app/api/announcement/${id}`)
                const announcementViewCount = response.data
                const updatedAnnouncementData = announcementData.map((announcement) => {
                    if(announcement._id === announcementViewCount._id){
                        announcement.viewCount = announcementViewCount.viewCount
                    }
                    return announcement
                })
                setAnnouncementData(updatedAnnouncementData)
            }catch(error){
                console.log(error)
            }
        }
    }

    const openUpdateModal = (id) => {  // 수정 모달을 나타내주는 부분
        setUpdate(id)
        const selectedAnnouncement = announcementData.find((announcement) => announcement._id === id)
        setCurrentAuthor(selectedAnnouncement.author)
        setCurrentTitle(selectedAnnouncement.title)
        setCurrentContent(selectedAnnouncement.contents)
        document.body.style = 'overflow: hidden'   // 글쓰기 버튼을 누르면 스크롤을 막는 부분
    }
    const closeUpdateModal = () => {  // 취소 클릭시 수정 모달을 사라지게 하는 부분
        setUpdate(-1)   // -1로 되돌림으로써 수정중이 아님을 나타냄
        setAuthor('')
        setTitle('')
        setContents('')
        document.body.style = 'overflow: auto'  // 스크롤을 다시 사용할 수 있게 하는 부분
    }

    const updateAnnouncemnt = () => {
        if(update === -1) return

        if(!currentAuthor || !currentTitle || !currentContent){
            alert("입력되지 않은 곳이 있습니다.")
        }else{
            const updatedAnnouncement = {
                author: currentAuthor,
                title: currentTitle,
                contents: currentContent,
            }

            axios.put(`https://port-0-fitness-houston-test-euegqv2llo5f0e8f.sel5.cloudtype.app/api/announcement/${update}/update`, updatedAnnouncement)
            .then((response) => {
                const updatedAnnouncementData = response.data
                const updatedAnnouncementList = listitems.map((item) => {
                    if(item.id === update){
                        return{
                            ...item,
                            author: updatedAnnouncementData.author,
                            title: updatedAnnouncementData.title,
                            contents: updatedAnnouncementData.contents,
                        }
                    }
                    return item
                })
                setListItems(updatedAnnouncementList)
                setUpdate(-1)
                setCurrentAuthor('')
                setCurrentTitle('')
                setCurrentContent('')
                document.body.style = 'overflow: auto' // 스크롤을 다시 사용할 수 있게 하는 부분
                window.location.reload()
            })
            .catch((error) => {
                console.log(error)
            })
        }
    }

    const deleteAnnouncement = async(id) => {
        if(window.confirm('정말 삭제하시겠습니까?')){
            try{
                await axios.delete(`https://port-0-fitness-houston-test-euegqv2llo5f0e8f.sel5.cloudtype.app/api/announcement/${id}`)
    
                const newListItems = listitems.filter(item => item.id !== id)
                setListItems(newListItems)
                window.location.reload()
            }catch(error){
                console.error(`공지사항 삭제 중 오류 발생 : ${error}`)
            }
        }
    }

    useEffect(() => {
        axios.get("https://port-0-fitness-houston-test-euegqv2llo5f0e8f.sel5.cloudtype.app/api/announcement")
        .then((response) => {
            const reversedData = response.data.reverse()    // 데이터를 역순으로 정렬
            setAnnouncementData(reversedData)
        })
        .catch((error) => {
            console.log(error)
        })


        const isAdminValue = localStorage.getItem('isAdmin')    // login.js 에서 isAdmin 값 가져오기
        // setIsAdmin(isAdminValue)
        if (isAdminValue === 'true') {
            setIsAdmin(true)
        } else {
            setIsAdmin(false)
        }

        const nameValue = localStorage.getItem('name')    // login.js 에서 isAdmin 값 가져오기
        setAuthor(nameValue)

        // 글쓰기 모달을 띄우면서 자동으로 포커스 넣는 부분
        // if(modal) {
        //     authorFocus.current.focus()
        // }
    }, [modal])
    
    return(
        <div className="announcement">
            <h1 className="announcement_h1">피트니스 휴스턴 공지사항</h1>
            <p className="announcement_p">피트니스 휴스턴의 공지사항을 알려드립니다.</p>
            <div className="table_area">
                <button className={`create_btn ${isAdmin? 'show': 'hide'}`} onClick={() => toggleModal(true)}>글쓰기</button>
                <table className="announcement_list">
                    <thead>
                        <tr>
                            <th className="thead_num">번호</th>
                            <th className="thead_title">제목</th>
                            <th className="thead_author">작성자</th>
                            <th className="thead_date">날짜</th>
                            <th className="thead_view">조회</th>
                        </tr>
                    </thead>
                    {announcementData.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((announcement, index) => (
                        <tbody key={announcement._id}>
                            <tr className="contents_list">
                                <td>{announcementData.length - index - (page - 1) * itemsPerPage}</td>
                                <td className="tbody_title">
                                    <span className="tbody_title_name" onClick={() => toggleContents(announcement._id)}>{announcement.title}</span>
                                </td>
                                <td>{announcement.author}</td>
                                <td>{announcement.date}</td>
                                <td>{announcement.viewCount}</td>
                            </tr>
                            <tr>
                                <td colSpan="5" className={`tbody_contents ${viewContents[announcement._id]? 'table_show': 'hide'}`}>
                                    <pre className="contents_pre">{announcement.contents}</pre>
                                    <div className="contents_btns">
                                        <button className={`contents_btn ${isAdmin? 'show': 'hide'}`} onClick={() => openUpdateModal(announcement._id)}>수정</button>
                                        <button className={`contents_btn ${isAdmin? 'show': 'hide'}`} onClick={() => deleteAnnouncement(announcement._id)}>삭제</button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    ))}
                </table>
            </div>
            <Paging page={page} count={announcementData.length} setPage={setPage} itemsPerPage={itemsPerPage} />

            {/* 모달 팝업 부분 */}
            <div className={`create_modal ${modal? 'show': 'hide'}`}>
                <h1>공지사항 작성</h1>
                <div className="create_modal_contents">
                    <div className="create_author">
                        <span>작성자</span>
                        <input type="text" placeholder="작성자를 입력해주세요."
                        value={author} onChange={(e) => setAuthor(e.target.value)} ref={authorFocus} />
                    </div>
                    <div className="create_title">
                        <span>제목</span>
                        <input type="text" placeholder="제목을 입력해주세요."
                        value={title} onChange={(e) => setTitle(e.target.value)} ref={titleFocus} />
                    </div>
                    <div className="create_contents">
                        <span>내용</span>
                        <textarea type="text" placeholder="내용을 작성해주세요."
                        value={contents} onChange={(e) => setContents(e.target.value)} ref={contentsFocus} />
                    </div>
                    <div className="create_btns">
                        <button className="contents_btn" onClick={create_announcement}>완료</button>
                        <button className="contents_btn" onClick={() => toggleModal(false)}>취소</button>
                    </div>
                </div>
            </div>

            {/* 수정 모달 팝업 부분 */}
            <div className={`update_modal ${update !== -1? 'show': 'hide'}`}>
                <h1>공지사항 수정</h1>
                <div className="create_modal_contents">
                    <div className="update_author">
                        <span>작성자</span>
                        <input type="text" placeholder="작성자를 입력해주세요."
                        value={currentAuthor} onChange={(e) => setCurrentAuthor(e.target.value)} />
                    </div>
                    <div className="update_title">
                        <span>제목</span>
                        <input type="text" placeholder="제목을 입력해주세요."
                        value={currentTitle} onChange={(e) => setCurrentTitle(e.target.value)} />
                    </div>
                    <div className="update_contents">
                        <span>내용</span>
                        <textarea type="text" placeholder="내용을 작성해주세요."
                        value={currentContent} onChange={(e) => setCurrentContent(e.target.value)} />
                    </div>
                    <div className="create_btns">
                        <button className="contents_btn" onClick={updateAnnouncemnt}>완료</button>
                        <button className="contents_btn" onClick={closeUpdateModal}>취소</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Announcement