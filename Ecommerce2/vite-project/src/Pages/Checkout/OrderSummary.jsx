import dayjs from "dayjs"
import { DeliveryOptions } from "./DeliveryOptions"
import { formatMoney } from "../utils/money"
export function OrderSummary({ cart, deliveryOptions,getCartItems,getPaymentSummary }) {
    return (

        <div className="order-summary">
            {deliveryOptions && cart.map((cartItems) => {
                const selectedDeliveryDate = deliveryOptions.find((deliveryOption) => {
                    return deliveryOption.id === cartItems.deliveryOptionId
                }                
            )
            
                const formattedDelivery = selectedDeliveryDate ?.estimatedDeliveryTimeMs?dayjs(selectedDeliveryDate.estimatedDeliveryTimeMs).format('dddd, MMMM D'): "No Delivery Date";

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
                                    <span>
                                        Quantity: <span className="quantity-label">{cartItems.quantity}</span>
                                    </span>
                                    <span className="update-quantity-link link-primary">
                                        Update
                                    </span>
                                    <span className="delete-quantity-link link-primary">
                                        Delete
                                    </span>
                                </div>
                            </div>

                            <div

                                className="delivery-options">
                                <div className="delivery-options-title">
                                    Choose a delivery option:
                                </div>
                                <DeliveryOptions cartItems={cartItems} deliveryOptions={deliveryOptions} getCartItems={getCartItems} getPaymentSummary={getPaymentSummary}/>
                            </div>
                        </div>
                    </div>

                )

            })}



        </div>
    )

} 