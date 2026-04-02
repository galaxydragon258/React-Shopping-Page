import { formatMoney } from "../utils/money"
import dayjs from "dayjs"
import axios from "axios"
import { PaymentSummary } from "./PaymentSummary"
export function DeliveryOptions({cartItems,deliveryOptions,getCartItems}){
    return(
        <>
              {deliveryOptions.map((DeliveryOptions) => {
                                    let priceString = 'FREE Shipping'

                                    if (DeliveryOptions.priceCents > 0) {
                                        priceString = `${formatMoney(DeliveryOptions.priceCents)} -Shipping`
                                    }

                                    const updateDeliveryOptions = async()=>{
                                       await axios.put(`/api/cart-items/${cartItems.productId}`,
                                            {
                                                deliveryOptionId: DeliveryOptions.id
                                            }
                                            
                                        )   
                                           await getCartItems();
                                        
                                           console.log("testing")

                                    }   
                                    


                                    return (
                                        <div
                                            key={DeliveryOptions.id}
                                            className="delivery-option">
                                            <input type="radio"
                                                checked={cartItems.deliveryOptionId === DeliveryOptions.id}
                                                className="delivery-option-input"
                                                name={`delivery-option-${cartItems.productId}`}
                                                onClick={updateDeliveryOptions}
                                                onChange={()=>{}}
                                                />
                                            <div>
                                                <div className="delivery-option-date">
                                                    {dayjs(DeliveryOptions.estimatedDeliveryTimeMs).format('dddd,MMMM D')}
                                                </div>
                                                <div className="delivery-option-price">
                                                    {priceString}

                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
        </>
    )
}