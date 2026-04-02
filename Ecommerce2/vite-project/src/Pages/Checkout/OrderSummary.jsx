import dayjs from "dayjs"
import {useState} from 'react'
import { DeliveryOptions } from "./DeliveryOptions"
import { formatMoney } from "../utils/money"
import axios from 'axios'
export function OrderSummary({ cart, deliveryOptions,getCartItems }) {
   
    return (

        <div className="order-summary">
            {deliveryOptions && cart.map((cartItems) => {
                const selectedDeliveryDate = deliveryOptions.find((deliveryOption) => {
                    return deliveryOption.id === cartItems.deliveryOptionId
                }                
            )
            
                const formattedDelivery = selectedDeliveryDate ?.estimatedDeliveryTimeMs?dayjs(selectedDeliveryDate.estimatedDeliveryTimeMs).format('dddd, MMMM D'): "No Delivery Date";

                const deleteCartItem = async()=>{
                    await axios.delete(`/api/cart-items/${cartItems.productId}`);
                    await getCartItems();
                }
                console.log(cartItems.quantity)
                 const [quantityButton, setQuantityButton] = useState(false);
                 const [quantity,setQuantity] = useState(cartItems.quantity); 


                 const updating = async()=>{
                    if(quantityButton){
                       await axios.put(`/api/cart-items/${cartItems.productId}`,{
                            quantity:quantity
                        })
                       
                        getCartItems();
                    }
                 }

                 const quantityButtons = ()=>{
                    setQuantityButton(prev => !prev)
                    updating();
                   
                 }

                 const updateQauntity = (event) =>{
                    const productQuantity = Number(event.target.value);
                    if(event.key ==="Enter"){
                            setQuantity(productQuantity)
                            updating()  
                    }else if(event.key ==='Escape'){
                        setQuantityButton(false)
                    }
                    setQuantity(productQuantity)
                
                 }
                 
                return (
                    <div
                        key={cartItems.productId}
                        className="cart-item-container">
                        <div className="delivery-date">
                            Delivery date:{formattedDelivery}
                        </div>

                        <div className="cart-item-details-grid">
                            <img className="product-image"
                                src={cartItems.product.image} />

                            <div className="cart-item-details">
                                <div className="product-name">
                                    {cartItems.product.name}
                                </div>
                                <div className="product-price">
                                    {formatMoney(cartItems.product.priceCents)}
                                </div>
                                <div className="product-quantity">
                                    <span
                                    >
                                        Quantity:
                                        <input 
                                        value={quantity}
                                        onChange={updateQauntity}
                                        className="quantity-input"
                                        type="textbox"
                                        onKeyDown={updateQauntity}
                                        style={{opacity: quantityButton ? 1: 0}}
                                        ></input>
                                        <span className="quantity-label">{cartItems.quantity} 
                                        
                                        </span>
                                    </span>
                                    <span className="update-quantity-link link-primary"
                                    onClick={quantityButtons}
                                    >
                                        Update
                                    </span>
                                    <span className="delete-quantity-link link-primary"
                                        onClick={deleteCartItem}
                                    >
                                        Delete
                                    </span>
                                </div>
                            </div>

                            <div

                                className="delivery-options">
                                <div className="delivery-options-title">
                                    Choose a delivery option:
                                </div>
                                <DeliveryOptions cartItems={cartItems} deliveryOptions={deliveryOptions} getCartItems={getCartItems} />
                            </div>
                        </div>
                    </div>

                )

            })}



        </div>
    )

} 