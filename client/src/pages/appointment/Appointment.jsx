import Navbar from '../../components/navbar/Navbar'
import './appointment.scss'

const Appointment = () => {
    return (
        <>
            <div className='navbar'>
                <Navbar />
            </div>


            <div className="appointment">
                <div id="body_header">
                    <h1>Appointment Request Form</h1>
                    <p>Make your appointments more easier</p>

                </div>
                <form action="index.html" method="post">
                    <fieldset>
                        <legend><span className="number">1</span>Your basic details</legend>
                        <label htmlFor="name">Name*:</label>
                        <input type="text" id="name" name="user_name" placeholder='Enter your name here' required pattern="[a-zA-Z0-9]+" />

                        <label htmlFor="mail">Email*:</label>
                        <input type="email" id="mail" name="user_email" placeholder="abc@xyz.com" required />

                        <label htmlFor="tel">Contact Number</label>
                        <input type="tel" id="tel" placeholder="Enter your phone Number" name="user_num" />


                    </fieldset>

                    <fieldset>
                        <legend><span className="number">2</span>Appointment Details</legend>
                        {/* <label htmlFor="appointment_for">Appointment for*:</label>
                        <select id="appointment_for" name="appointment_for" required>
                            <option value="coffee">Coffee</option>
                            <option value="meeting">Meeting</option>
                            <option value="Business">Business</option>
                            <option value="lunch">Lunch</option>
                            <option value="skype">Skype</option>
                            <option value="movie">Movie</option>
                            <option value="couple_date">Date</option>
                        </select> */}
                        <label htmlFor="appointment_description">Appointment Description:</label>
                        <textarea id="appointment_description" name="appointment_description" placeholder="I wish to get an appointment with the Doctor for regular check-up."></textarea>
                        <label htmlFor="date">Date*:</label>
                        <input type="date" name="date" value="" required></input>
                        <br />
                        <label htmlFor="time">Time*:</label>
                        <input type="time" name="time" value="" required ></input>
                        <br />
                        <label htmlFor="duration">How Long??(Minutes)</label>
                        <input type="radio" name="duration" value="30" checked /> 30
                        <input type="radio" name="duration" value="60" /> 60
                        <input type="radio" name="duration" value="90" /> 90
                        <input type="radio" name="duration" value="more" /> more
                    </fieldset>
                    <h4>**We will send you a confrmation mail soon</h4>
                    <button type="submit">Request For Appointment</button>
                </form>
            </div>
        </>
    )
}

export default Appointment