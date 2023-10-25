import Announcement from '../../Pages/Announcement/Announcement'
import './Common_Contents.css'
import Footer from './Footer/Footer'
import NavSimple from './NavSimple/NavSimple'

function Common_Contents() {
    return (
        <div className='common'>
            <NavSimple />
            <Announcement />
            <Footer />
        </div>
    )
}

export default Common_Contents