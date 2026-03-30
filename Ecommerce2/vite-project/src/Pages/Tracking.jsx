import { useEffect, useState } from 'react'
import './Tracking.css'
import axios from 'axios'
import { Link } from 'react-router'
import { useParams } from 'react-router'
import dayjs from 'dayjs'


export function Tracking({order}) {
    const [trackingOrder, setrackingOrder] = useState(null)

    const { orderId, productId } = useParams();


    useEffect(() => {

        const fetchOrders = async () => {
            const response = await axios.get(`api/orders/${orderId}?expand=products`)
            setrackingOrder(response.data)
        }
        fetchOrders();

    }, [orderId])

    if (!trackingOrder) {
        return null
    }

    const productDetails = trackingOrder.products.find((data)=>{
        return data.productId === productId
    })
    console.log(order)
   const orderDetails = order.find((data)=>{
        return data.id === orderId
   })
   const now = dayjs().valueOf();


const totalMs = productDetails.estimatedDeliveryTimeMs - orderDetails.orderTimeMs;
const timePassedMs = now - orderDetails.orderTimeMs;

const percent = (timePassedMs / totalMs) * 100;
console.log(percent)

let isPreparing = percent < 33;
let isShipping = percent >=33 && percent < 100;
let isDelivered = percent > 100 ;   
    return (
        <>
            <div className="header">
                <div className="left-section">
                    <Link to="/" className="header-link">
                        <img className="logo"
                            src="images/logo-white.png" />
                        <img className="mobile-logo"
                            src="images/mobile-logo-white.png" />
                    </Link>
                </div>

                <div className="middle-section">
                    <input className="search-bar" type="text" placeholder="Search" />

                    <button className="search-button">
                        <img className="search-icon" src="images/icons/search-icon.png" />
                    </button>
                </div>

                <div className="right-section">
                    <Link className="orders-link header-link" to="/orders">

                        <span className="orders-text">Orders</span>
                    </Link>

                    <a className="cart-link header-link" href="/checkout">
                        <img className="cart-icon" src="images/icons/cart-icon.png" />
                        <div className="cart-quantity">3</div>
                        <div className="cart-text">Cart</div>
                    </a>
                </div>
            </div>
     
                    <div
                    key={productDetails.id}
                    className="tracking-page">
                        <div className="order-tracking">
                            <a className="back-to-orders-link link-primary" href="/orders">
                                View all orders
                            </a>

                            <div className="delivery-date">
                                Arriving on {dayjs(productDetails.estimatedDeliveryTimeMs).format('dddd MMMM D')}
                            </div>

                            <div className="product-info">
                                {productDetails.product.name}
                            </div>

                            <div className="product-info">
                                Quantity: {productDetails.quantity}
                            </div>

                            <img className="product-image" 
                            src={`${productDetails.product.image}`} />

                            <div className="progress-labels-container">
                                <div className={`progress-label  ${isPreparing ? 'current-status':''}`}>
                                    Preparing
                                </div>
                                <div className={`progress-label ${isShipping ? 'current-status':''}`}>
                                    Shipped
                                </div>
                                <div className={`progress-label ${isDelivered ? 'current-status':''}`}>
                                    Delivered
                                </div>
                            </div>

                            <div className="progress-bar-container">
                                <div className="progress-bar" 
                                style={{width:`${percent}%`}}
                                
                                ></div>
                            </div>
                        </div>
                    </div>

                
        


        </>

    )
}