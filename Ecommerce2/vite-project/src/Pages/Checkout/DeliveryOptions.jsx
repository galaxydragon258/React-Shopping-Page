import { formatMoney } from "../utils/money"
import dayjs from "dayjs"
export function DeliveryOptions({cartItems,deliveryOptions}){
    return(
        <>
              {deliveryOptions.map((DeliveryOptions) => {
                                    let priceString = 'FREE Shipping'

                                    if (DeliveryOptions.priceCents > 0) {
                                        priceString = `${formatMoney(DeliveryOptions.priceCents)} -Shipping`
                                    }

                                    return (
                                        <div
                                            key={DeliveryOptions.id}
                                            className="delivery-option">
                                            <input type="radio"
                                                checked={cartItems.deliveryOptionId === DeliveryOptions.id}
                                                className="delivery-option-input"
                                                name={`delivery-option-${cartItems.productId}`} />
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