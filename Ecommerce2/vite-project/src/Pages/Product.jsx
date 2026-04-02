import { formatMoney } from "./utils/money"
import axios from "axios"
import { useState } from "react"

export function Product({ getCartItems, products }) {
        const [quantity, setQuantity] = useState(1);
        const [check,setCheck] = useState(false);
    return (
        <>
            {
                products.map((product) => {
                

                    const test =  ()=>{
                        setCheck(true)
                        setTimeout(()=>{
                            setCheck(false)
                           
                        },2000)
                    }

                    return (

                        <div key={product.id} className="product-container">
                            <div className="product-image-container">
                                <img className="product-image"
                                    src={`${[product.image]}`} />
                            </div>

                            <div className="product-name limit-text-to-2-lines">
                                {product.name}
                            </div>

                            <div className="product-rating-container">
                                <img className="product-rating-stars"
                                    src={`/images/ratings/rating-${product.rating.stars * 10}.png`} />
                                <div className="product-rating-count link-primary">
                                    {product.rating.count}
                                </div>
                            </div>

                            <div className="product-price">
                                ${formatMoney(product.priceCents)}
                            </div>

                            <div className="product-quantity-container">
                                <select

                                    value={quantity} onChange={(event) => {
                                        const quantitySelectedt = Number(event.target.value)
                                        setQuantity(quantitySelectedt)
                                    }}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                </select>
                            </div>

                            <div className="product-spacer"></div>

                            <div className="added-to-cart"
                            style={{opacity: check ? 1 : 0}}
                            >
                                <img src="images/icons/checkmark.png" />
                                    {check &&   <span>Added to Cart</span>}
                            
                            </div>

                            <button className="add-to-cart-button button-primary"
                                onClick={async () => {
                                    await axios.post('/api/cart-items', {
                                        productId: product.id,
                                        quantity
                                    });
                                     test();
                                    await getCartItems()
                                    
                                }}
                            >
                                Add to Cart
                            </button>
                        </div>
                    )
                })
            }
        </>


    )
}