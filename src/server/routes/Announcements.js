const express = require('express');
const Announcement = require('../models/Announcement');
const expressAsyncHandler = require('express-async-handler');

const router = express.Router();

router.get("/", async(req, res) => {
    const announcementData = await Announcement.find()  // MongoDB에서 모든 announcement 가져오기
    res.json(announcementData)
})
  
router.post("/", async (req, res) => {
    const create = new Announcement({
        author: req.body.author,
        title: req.body.title,
        contents: req.body.contents,
        date: req.body.date,
        viewCount: req.body.viewCount
    })

    try{
        const newAnnouncement = await create.save()
        res.status(201).json(newAnnouncement)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

router.put("/:id", expressAsyncHandler(async (req, res) => {  // 공지사항 제목 클릭 할때 mongoDB까지 조회수 증가해주는 부분
    const announcementId = req.params.id
    try{
        const announcement = await Announcement.findById(announcementId)

        announcement.viewCount += 1 // 조회수 1씩 증가

        const updatedAnnouncement = await announcement.save()
        res.json(updatedAnnouncement)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}))

router.put("/:id/update", expressAsyncHandler(async (req, res) => {   // 수정된 공지사항 업데이트
    const announcementId = req.params.id
    const { author, title, contents } = req.body
    try {
      const announcement = await Announcement.findByIdAndUpdate(
        announcementId,
        { author, title, contents },
        { new: true } // 업데이트 이후의 문서를 반환하도록 설정
      );
  
      if (!announcement) {
        res.status(404).json({ message: '공지사항을 찾을 수 없습니다.' })
      } else {
        res.json(announcement)
      }
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
}))
  
  
router.delete("/:id", async(req, res) => {  // 삭제 부분
    await Announcement.findOneAndDelete({_id: req.params.id})
    .then((result) => {
        console.log(result)
        res.json(result)
    })
})

module.exports = router