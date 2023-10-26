const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
const server = require('http').createServer(app);
// const announcementRouter = require('./server/routes/Announcements')
const loginRouter = require('../src/Components/Sub_Page/Server/Route/Users')
const bodyParser = require('body-parser')

// CORS 사용
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())

const port = 5500

// MongoDB 연결
mongoose.connect('mongodb+srv://fitness:houston@cluster0.mbn4mzj.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB Connected ... ')
  server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })
})
.catch(err => console.log('MongoDB Connection Error: ',err))

// app.use('/api/announcement', announcementRouter)
app.use('/api/users', loginRouter)