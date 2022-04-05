import { ArrowBack } from '@mui/icons-material'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import medicineContext from '../../../context/medicine/medicineContext'
import './medProfile.scss'

const MedProfile = () => {

  const { newMedicine } = useContext(medicineContext)

  const [drugName, setDrugName] = useState('')
  const [manufacturer, setManufacturer] = useState('')
  const [expireDate, setExpireDate] = useState()
  const [costPrice, setCostPrice] = useState()
  const [sellingPrice, setSellingPrice] = useState()
  const [quantity, setQuantity] = useState()
  const [location, setLocation] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await newMedicine(
      drugName,
      manufacturer,
      expireDate,
      costPrice,
      sellingPrice,
      quantity,
      location
    )
    navigate('/medicines')
  } 

  return (
    <div className="medProfile">
    <div className="container">  
  <form id="contact" action="" method="post" onSubmit={handleSubmit}>
    <div className="header">
      <ArrowBack style={{cursor: 'pointer'}} onClick={()=>navigate(-1)} />
    </div>
    <h3>Add Medicine Details</h3>
    <fieldset>
      <input placeholder="Drug Name" type="text" tabIndex="1" onChange={(e)=> setDrugName(e.target.value)} required autoFocus />
    </fieldset>
    <fieldset>
      <input placeholder="Manufacturer" type="text" onChange={(e)=> setManufacturer(e.target.value)} tabIndex="2"  />
    </fieldset>
    <fieldset>
      <label>Expire Date</label>
        <input type="date" tabIndex="2" onChange={(e)=> setExpireDate(e.target.value)} required />
    </fieldset>
    <fieldset>
      <input placeholder="Cost Price" type="number" onChange={(e)=> setCostPrice(e.target.value)} tabIndex="2" />
    </fieldset>
    <fieldset>
      <input placeholder="Selling Price" type="number" onChange={(e)=> setSellingPrice(e.target.value)} tabIndex="2" required />
    </fieldset>
    <fieldset>
      <input placeholder="Quantity" type="number" onChange={(e)=> setQuantity(e.target.value)} tabIndex="2" required />
    </fieldset>
    <fieldset>
      <input placeholder="Location" type="text" onChange={(e)=> setLocation(e.target.value)} tabIndex="2" required />
    </fieldset>
    <fieldset>
      <button name="submit" type="submit" id="contact-submit" data-submit="...Sending">Submit</button>
    </fieldset>
  </form>
</div>
</div>
  )
}

export default MedProfile