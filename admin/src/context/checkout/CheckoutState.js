import { useState } from 'react'
import checkoutContext from './checkoutContext'

const CheckoutState = (props) => {


    const [reqPatient, setReqPatient] = useState()
    const [reqStocks, setReqStocks] = useState([])

    return (
        <checkoutContext.Provider value = {{ reqPatient, setReqPatient, reqStocks, setReqStocks }} >
            {props.children}
        </checkoutContext.Provider>
    )
}

export default CheckoutState