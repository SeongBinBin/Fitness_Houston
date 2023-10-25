import axios from "axios"
import React, {useState} from "react"
import './SearchPW.css'

function SearchPW({ onClose }){
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [id, setId] = useState("")
  const [result, setResult] = useState("") // 아이디 찾기 결과 상태 변수
  const [error, setError] = useState("") // 유효성 검사 오류 메시지 상태 변수

  // 아이디 찾기 버튼 클릭 이벤트 핸들러
  const handleSearchPW = async(e) => {
    e.preventDefault()

    // 초기화
    setResult("")
    setError("")

    try{
      // 유효성 검사 수행
      if(name === "" || id === "" || email === ""){
        setError("이름, 아이디, 이메일 중 다시 확인하세요.")
      }else{
        const response = await axios.post('http://localhost:5000/api/users/findPw', {
          name,
          userId: id,
          email,
        })
        console.log(response.data)
        if(response.data.code === 200){
          setResult(`사용자 비밀번호: ${response.data.password}`)
          setError('')
        }else if(response.data.code === 400){
          setError('비밀번호를 찾을 수 없습니다.')
          setResult('')
        }      
      }
    }catch(error){
      console.error(error)
      setError('서버 통신 중 에러 발생')
      setResult('')
    }
  }

  return(
    <div className="pw_search_box">      
      <h2>비밀번호 찾기</h2>
      <div className="pw_search_form">
        <label htmlFor="name">* 이름<br/>
          <input
            className="search"
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>      
        <label htmlFor="id">* 아이디<br/>
          <input
            className="search"
            type="text"
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </label>    
        <label htmlFor="email">* 이메일 <br/>
          <input
            className="search"
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>        
        <div>
          <button className='search_pw_btn' onClick={handleSearchPW}>비밀번호 찾기</button>
        </div><br/>
        {error && <div className="error">{error}</div>}
        {result && <div className="result">{result}</div>}
      </div>
      <div className="close_search_pw">
        <button onClick={onClose}>닫기</button>
      </div>            
    </div>
  )
}

export default SearchPW