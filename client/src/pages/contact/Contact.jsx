import './contact.scss'
import Navbar from '../../components/navbar/Navbar'



const Contact = () => {


    return (
        <>
            <div className='navbar'>
                <Navbar />
            </div>

            <div className="contact">
                   <h2 className="heading">All Our Pharmacies</h2>

               <div className="location">

                   <div className="locationCard">
                       <div className="map">
                       <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3568.179489806158!2d90.90854461503785!3d26.57861498327266!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x47a53b30d262964e!2zMjbCsDM0JzQzLjAiTiA5MMKwNTQnMzguNiJF!5e0!3m2!1sen!2sin!4v1655552710997!5m2!1sen!2sin" width={1200} height={300} style={{border: 0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                       </div>
                       <div className="details">
                           <h3 className="address info">
                                Jalukbari, Assam Engineering College, Hostel No 7, Guwahati, Assam 
                           </h3>
                           <h4 className="time info">
                                Open 24*7
                           </h4>
                           <h5 className="contactNo info">
                                For more details contact - +91 7002066675
                           </h5>
                       </div>
                   </div>

               </div>
            </div>

        </>
    )
}

export default Contact