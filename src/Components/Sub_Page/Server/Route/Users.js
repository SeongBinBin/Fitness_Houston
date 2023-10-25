const express = require('express')
const User = require('../Model/User')

const router = express.Router()

// CORS 설정 (다른 도메인에서 실행 중인 경우 필요)
const cors = require('cors')
const app = express()
app.use(cors())

const SUCCESS = { code: 200, message: '성공' }
const CLIENT_ERROR = { code: 400, message: '클라이언트 에러' }
const SERVER_ERROR = { code: 500, message: '서버 오류' }

// 회원가입 API 엔드포인트
router.post('/register', async (req, res, next) => {
  console.log("바디: ", req.body)
  try{
    // 클라이언트에서 전송한 회원 정보 추출
    const { name, userId, password, email, agree } = req.body
  
    // 아이디 존재여부 확인
    const existingId = await User.findOne({ userId })
    if(existingId){
      return res.status(400).json({...CLIENT_ERROR, message: '아이디가 이미 사용 중입니다.'})
    }
    
    // 이메일 존재여부 확인
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ ...CLIENT_ERROR, message: '이미 사용 중인 이메일입니다.' });
    }
  
    const nameRegex = /^[가-힣a-zA-Z]+$/ // 이름 유효성검사
    const infoRegex = /^[a-zA-Z0-9]+$/ // 아이디, 비밀번호 유효성검사
    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/ // 이메일 유효성검사
    const minLength = 6 //아이디, 비밀번호 최소글자 제한

    if(!name.match(nameRegex)){    
      return res.status(400).json({...CLIENT_ERROR, message: '이름은 한글 또는 영어만 포함해야 합니다.' })
    }
    if(!userId.match(infoRegex)){
      return res.status(400).json({...CLIENT_ERROR, message: '아이디는 영어나 숫자로만 포함해야 합니다.'})
    }
    if(!password.match(infoRegex)){
      return res.status(400).json({...CLIENT_ERROR, message: '비밀번호는 영어나 숫자로만 포함해야 합니다.'})
    }
    if(!email.match(emailRegex)){
      return res.status(400).json({...CLIENT_ERROR, message: '이메일 형식이 잘못 되었습니다.'})
    }
    if(userId.length < minLength){
      return res.status(400).json({...CLIENT_ERROR, message: '아이디는 최소 6자 이상이어야 합니다.'})
    }
    if(password.length < minLength){
      return res.status(400).json({...CLIENT_ERROR, message: '비밀번호는 최소 6자 이상이어야 합니다.'})
    }

    // 회원 정보를 데이터베이스에 저장
    const user = new User({ name, userId, password, email, agree })
    await user.save()

    // 회원가입 성공 응답
    res.status(200).json({ message: SUCCESS })
  }catch(error){
    // 오류 발생 시 오류 응답
    console.error('회원가입 오류:', error)
    res.status(500).json({ message: SERVER_ERROR })
  }
})

// 아이디 중복확인 API 엔드포인트
router.post('/checkId', async(req, res, next) => {
  try{
    const {userId} = req.body    
    const user = await User.findOne({userId})
    if(user){
      return res.status(200).json({isAvailable: false, message: '이미 사용중인 아이디입니다.'})
    }
    res.status(200).json({isAvailable: true, message: '사용 가능한 아이디 입니다.'})
  }catch(error){
    console.log('중복 확인 오류:', error)
    res.status(500).json({message: '중복 확인 중 오류가 발생'})
  }
})

// 로그인 API 엔드포인트
router.post('/login', async(req, res, next) => {
  try{
    console.log(req.body)
    const { userId, password } = req.body
    const loginUser = await User.findOne({
      userId,
      password,
    })

    if(!loginUser){
      res.json({...CLIENT_ERROR, message: '아이디나 비밀번호가 일치하지 않습니다.'})
    }else{
      const { name, email, userId, isAdmin, agree } = loginUser
      res.json({ ...SUCCESS, user: { name, email, userId, isAdmin, agree }})
    }
  }catch(error){
    console.error('로그인 오류:', error)
    res.status(500).json({...SERVER_ERROR, message: '로그인 중 오류 발생'})
  }
})

// 아이디 찾기
router.post('/findId', async(req, res, next) => {
  try{
    const { name, email } = req.body
    const user = await User.findOne({ name, email })
    if(!user){
      res.json({...CLIENT_ERROR, message: '해당 정보로 등록된 아이디가 없습니다.'})
    }else{
      res.json({...SUCCESS, userId: user.userId })
    }
  }catch(error){
    console.error(error)
    res.status(500).json(SERVER_ERROR)
  }
})

//비밀번호 찾기
router.post('/findPw', async(req, res, next) => {
  try{
    const { name, userId, email } = req.body       
    const user = await User.findOne({ name, userId, email })
    if(!user){
      res.json({...CLIENT_ERROR, message: '해당 정보로 등록된 비빌번호가 없습니다.'})
    }else{            
      res.json({...SUCCESS, password: user.password})
    }
  }catch(error){
    console.error(error)
    res.status(500).json(SERVER_ERROR)
  }
})

// 사용자 정보 조회
router.get('/:userId', async(req, res, next) => {
  try{
    const userId = req.params.userId
    const user = await User.findOne({userId: userId})
    if(!user){
      return res.status(400).json({ ...CLIENT_ERROR, message: '사용자 정보 찾지 못함' })
    }
    res.json(user)
  }catch(error){
    console.error(error)
    res.status(500).json({SERVER_ERROR})
  }
})

// 로그아웃
router.post('/logout', (req, res, next) => {
  res.json("로그아웃")
})

// 사용자 정보 변경
router.put('/:userId', async(req, res, next) => {
  try{
    const user = await User.findById(req.params.userId)
    if(!user){
      res.status(400).json({ ...CLIENT_ERROR, message: '유저 찾지 못함' })
    }else{
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      user.password = req.body.password || user.password      
      user.lastModifiedAt = new Date()

      const updatedUser = await user.save()
      const { name, email, userID, isAdmin, createdAt } = updatedUser
            
      res.json({ ...SUCCESS, user: { name, email, userID, isAdmin, createdAt }})
    }
  }catch(error){
    res.status(500).json(SERVER_ERROR)
  }
})

// 사용자 정보 삭제
router.delete('/:userId', async(req, res, next) => {
  try{
    const user = await User.findByIdAndDelete(req.params.userId)
    if(!user){
      res.status(400).json({ ...CLIENT_ERROR, message: '유저 찾지 못함' })
    }else{
      res.status(200).json(SUCCESS)
    }
  }catch(error){
    res.status(500).json(SERVER_ERROR)
  }
})

router.get('/:userId', async(req, res) => {  // 로그인 상태를 보내는 부분
  const UserData = req.params.id
  const UserID = await User.findById(UserData)
  res.json(UserID)
})
router.get('/login', async(req, res) => {  // 로그인 상태를 보내는 부분
  const UserData = req.params.id
  const UserID = await User.findOne(UserData)
  res.json(UserID)
})
router.get('/', async(req, res) => {  // 로그인 상태를 보내는 부분
  const UserID = await User.findOne()
  res.json(UserID)
})

router.get('/current', (req, res) => {
  if (req.isAuthenticated()) { // 예: Passport.js를 사용한 인증
    const currentUser = req.user; // 현재 로그인한 사용자 정보
    res.json(currentUser);
  } else {
    res.status(401).json({ message: '로그인이 필요합니다' });
  }
});


module.exports = router