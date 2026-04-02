
import { NavLink,useNavigate} from 'react-router'
import { useState } from 'react';
import './header.css'

export function Header({ cart }) {
    const  [search,setSearch] = useState('');
    const navigate  = useNavigate();
    let totalCart = 0;



    cart.forEach((cartItem) => {
        totalCart += cartItem.quantity
    });

    const searchBarEeventHandler = ()=>{
        navigate(`/?search=${search}`)
        
    }

    const controlledInput = (event)=>{
        const seacrhValue = event.target.value;
        setSearch(seacrhValue)
    }

    return (
        <div className="header">
            <div className="left-section">
                <NavLink to="/" className="header-link">
                    <img className="logo"
                        src="images/logo-white.png" />
                    <img className="mobile-logo"
                        src="images/mobile-logo-white.png" />
                </NavLink>
            </div>

            <div className="middle-section">
                <input className="search-bar" type="text" placeholder="Search" 
                onChange={controlledInput}
                />

                <button className="search-button"
                    onClick={searchBarEeventHandler}
                >
                    <img className="search-icon" src="images/icons/search-icon.png" />
                </button>
            </div>

            <div className="right-section">
                <NavLink className="orders-link header-link" to="/orders">

                    <span className="orders-text">Orders</span>
                </NavLink>

                <NavLink className="cart-link header-link" to="/checkout">
                    <img className="cart-icon" src="images/icons/cart-icon.png" />
                    <div className="cart-quantity">{totalCart}</div>
                    <div className="cart-text">Cart</div>
                </NavLink>
            </div>
        </div>
    )
}