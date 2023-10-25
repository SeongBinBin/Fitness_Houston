const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
const server = require('http').createServer(app);
const router = require('./server/routes/Announcements')

// CORS 사용
app.use(cors())
app.use(express.json())

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

app.use('/api/announcement', router)