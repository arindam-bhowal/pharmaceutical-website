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
                        <input type="text" id="name" name="user_name" placeholder="Atchyut (only first names)" required pattern="[a-zA-Z0-9]+" />

                        <label htmlFor="mail">Email*:</label>
                        <input type="email" id="mail" name="user_email" placeholder="abc@xyz.com" required />

                        <label htmlFor="tel">Contact Num:</label>
                        <input type="tel" id="tel" placeholder="Include country code" name="user_num" />

                        <label htmlFor="skype_name">Skype username:</label>
                        <input type="text" id="skype_name" name="skype_name" placeholder="@atchyutn" pattern="[a-zA-Z0-9]+" />


                    </fieldset>

                    <fieldset>
                        <legend><span className="number">2</span>Appointment Details</legend>
                        <label htmlFor="appointment_for">Appointment for*:</label>
                        <select id="appointment_for" name="appointment_for" required>
                            <option value="coffee">Coffee</option>
                            <option value="meeting">Meeting</option>
                            <option value="Business">Business</option>
                            <option value="lunch">Lunch</option>
                            <option value="skype">Skype</option>
                            <option value="movie">Movie</option>
                            <option value="couple_date">Date</option>
                        </select>
                        <label htmlFor="appointment_description">Appointment Description:</label>
                        <textarea id="appointment_description" name="appointment_description" placeholder="I wish to get an appointment to skype for resolving a software problem."></textarea>
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
                    <button type="submit">Request For Appointment</button>
                </form>
            </div>
        </>
    )
}

export default Appointment