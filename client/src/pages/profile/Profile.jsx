import './profile.scss'
import { Edit } from '@mui/icons-material'
import Navbar from '../../components/navbar/Navbar'
import { useEffect, useState } from 'react'

const Profile = () => {

    // --------useStates and useEffects -----------

    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()

    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const handleFileUpload = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }
        setSelectedFile(e.target.files[0])
    }


    return (

        <>
            <div class="navbar">
                <Navbar />
            </div>

            <div className='profile'>
                <div class="wrapper">

                    <h1>Profile</h1>

                    <div class="container">
                        <div class="left">

                            <div class="profilePic">
                                {selectedFile ?  <img src={preview} /> : <img src="/assets/defaultProfilePic.png" alt="" />}
                                <div class="inputContainer">
                                    <label htmlFor="profilePic">
                                        <Edit className='editIcon' />
                                        Edit Profile Picture
                                    </label>
                                    <input type="file" id="profilePic"  accept=".png, .jpg, .jpeg" onChange={handleFileUpload} />
                                </div>
                            </div>

                            <div class="signature">
                                <img src="/assets/defaultSignature.png" alt="" />
                                <div class="inputContainer">
                                    <label htmlFor="signature">
                                        <Edit className='editIcon' />
                                        Edit your signature
                                    </label>
                                    <input type="file" id="signature"   accept=".png, .jpg, .jpeg" onChange={handleFileUpload}  />
                                </div>
                            </div>

                        </div>
                        <div class="right">
                            <div class="inputContainer">
                                <input type="text" placeholder="name" disabled />
                                <Edit className='editIcon' />
                            </div>

                            <div class="inputContainer">
                                <input type="email" placeholder="email" disabled />
                                <Edit className='editIcon' />
                            </div>

                            <div class="inputContainer">
                                <input type="number" placeholder="number" disabled />
                                <Edit className='editIcon' />
                            </div>

                            <div class="inputContainer">
                                <input type="number" placeholder="age" disabled />
                                <Edit className='editIcon' />
                            </div>

                            <div class="inputContainer" id='passwordInput'>
                                <span>Edit your password</span>
                                <Edit className='editIcon' id='passwordEditIcon' />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile