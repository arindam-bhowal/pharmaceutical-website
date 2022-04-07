import { Facebook, Instagram, Twitter } from '@mui/icons-material'
import Navbar from '../../components/navbar/Navbar'
import './about.scss'

const About = () => {
    return (
        <>
        <div className='navbar'>
            <Navbar />
        </div>
        <div className="bdy">
            <div className="about">
                <div className="container">
                    <div className="content-section">
                        <div className="title">
                            <h1>About Us</h1>
                        </div>
                        <div className="content">
                            <h3>Keeping you healthy is our upmost priority</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                consequat.</p>
                            <div className="button">
                                <a href="">Read More</a>
                            </div>
                        </div>
                        <div className="social">
                            <a href=""><Facebook className='aboutIcons' /></a>
                            <a href=""><Twitter className='aboutIcons' /></a>
                            <a href=""><Instagram className='aboutIcons' /></a>
                        </div>
                    </div>
                    <div className="image-section">
                        <img src="/assets/doctor.png" />
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}

export default About