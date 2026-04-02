import './Order.css'
import dayjs from 'dayjs'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Header } from '../../components/Header'
import { Link } from 'react-router'

export function OrderPages({ cart,order,getCartItems}) {
    console.log(order)
   
    return (
        <>
            <Header cart={cart} />
            <link rel="icon" type="image/svg+xml" href="orders-favicon.png" />
            <div className="orders-page">
                <div className="page-title">Your Orders</div>

                <div className="orders-grid">

                    {order && order.map((Orders) => {
                        const data = Orders.products.map((Product) => {
                            return Product
                        })

        
                        return (


                            <div
                                key={Orders.id}
                                className="order-container">

                                <div className="order-header">
                                    <div className="order-header-left-section">
                                        <div className="order-date">
                                            <div className="order-header-label">Order Placed:</div>
                                            <div>{dayjs(data.orderTimeMs).format('dddd.MMMM D')}</div>
                                        </div>
                                        <div className="order-total">
                                            <div className="order-header-label">Total:</div>
                                            <div>$41.90</div>
                                        </div>
                                    </div>

                                    <div className="order-header-right-section">
                                        <div className="order-header-label">Order ID:</div>
                                        <div>{Orders.id}</div>
                                    </div>
                                </div>

                                {data.map((ProductData) => {
                                    
                                    const addToCard = async()=>{
                                        await axios.post('/api/cart-items',{
                                            productId : ProductData.productId,
                                            quantity: 1

                                        })
                                        await getCartItems();

                                    }

                                    return (
                                        <div 
                                        key={ProductData.productId}
                                        className="order-details-grid">
                                            <div className="product-image-container">
                                                <img src={`${ProductData.product.image}`} />
                                            </div>

                                            <div className="product-details">
                                                <div className="product-name">
                                                    {ProductData.product.name}
                                                </div>
                                                <div className="product-delivery-date">
                                                    {dayjs(ProductData.estimatedDeliveryTimeMs).format('dddd,MMMM D')}
                                                </div>
                                                <div className="product-quantity">
                                                    {ProductData.quantity}
                                                </div>
                                                <button className="buy-again-button button-primary">
                                                    <img className="buy-again-icon" src="images/icons/buy-again.png" />
                                                    <span className="buy-again-message"
                                                    onClick={addToCard}
                                                    >Add to Cart</span>
                                                </button>
                                            </div>

                                            <div className="product-actions">
                                                <Link to={`/tracking/${Orders.id}/${ProductData.productId}`}>
                                                    <button className="track-package-button button-secondary">
                                                        Track package
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    )

                                })}

                            </div>
                        )
                    })}



                </div>
            </div>

        </>

    )
}