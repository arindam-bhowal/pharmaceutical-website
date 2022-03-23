import './home.scss'
import Navbar from '../../components/navbar/Navbar'

const Home = () => {
return (
<>
    <div class="navbar">
        <Navbar />
    </div>

    <div class="home">
        <section className="left-sec">
            <h2> We Are Here For Your Care</h2>
            <h1> We The Best Doctors</h1>
            <p>We are here for your care 24/7. Any help just call us.</p>
            <button>
                Make an appointment
            </button>
        </section>
        <section className="right-sec">
            <figure>
                <img src="assets/home-bg.png" alt='' />
            </figure>
        </section>
    </div>
</>
)
}

export default Home