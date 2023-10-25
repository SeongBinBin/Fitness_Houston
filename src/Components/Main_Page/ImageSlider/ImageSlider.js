import { useState } from "react"

const ImageSlider = ({slides}) => {
    const [currentInex, setCurrentUser] = useState(0)

    const sliderStyles = {
        height: '100%',
        position: "relative"
    }

    const slideStyles = {
        width: '100%',
        height: '100%',
        backgroundImage: `url(${slides[currentInex].url})`
    }

    return (
     <div style={sliderStyles}>
        <div style={{slideStyles}}></div>
     </div>
    )
}

export default ImageSlider