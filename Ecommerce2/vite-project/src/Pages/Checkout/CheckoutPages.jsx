import './CheckoutPage.css';
import axios from 'axios'
import { useState, useEffect } from 'react';
import { CheckoutHeader } from './CheckoutHeader'
import { OrderSummary } from './OrderSummary';
import { PaymentSummary } from './PaymentSummary';
export function CheckoutPage({ cart , updateDeliveryOptions,getCartItems}) {

    const [deliveryOptions, setDeliveryOptions] = useState([])
    const [paymentSummary, setPaymentSummary] = useState(null)

   
    useEffect(() => {
        const fetchDeliveryOption = async()=>{
            let response = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
            setDeliveryOptions(response.data)
        }

        const fetchPayment  = async()=>{
            const response  = await  axios.get('/api/payment-summary')
            setPaymentSummary(response.data)
        }    

        fetchDeliveryOption()
        fetchPayment()

            
    }, [cart])
    console.log(cart)
    return (
        <>
            <title>CheckoutPage</title>
            <link rel="icon" type="image/svg+xml" href="cart-favicon.png" />


            <CheckoutHeader />
            <div className="checkout-page">
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">
                    <OrderSummary deliveryOptions={deliveryOptions}  getCartItems={getCartItems} cart={cart}/>
                    <PaymentSummary paymentSummary={paymentSummary}/>
              
                </div>
            </div>

        </>


    )
}