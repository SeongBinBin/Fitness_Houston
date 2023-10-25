import React from 'react'
import './VideoModal.css'

function VideoModal({ videoUrl, onClose }) {
  return(
    <div className="video_modal">
      <div className="video_modal_content">
        <div>
          <button onClick={onClose}>X</button>
        </div>
        <iframe
          width="700"
          height="500"
          src={videoUrl}
          title="YouTube Video"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  )
}

export default VideoModal