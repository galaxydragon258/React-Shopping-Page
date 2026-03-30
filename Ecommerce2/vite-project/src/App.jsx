import { useState,useEffect } from 'react'
import axios from 'axios'
import { Routes,Route } from 'react-router'
import { Homepage } from './Pages/Homepage'
import { CheckoutPage } from './Pages/Checkout/CheckoutPages'
import { OrderPages } from './Pages/Orders/OrderPages'
import { Tracking } from './Pages/Tracking'
import { NotFound } from './Pages/NotFound'
import './App.css'


function App() {
    const [cart,setCart] = useState([]);
    const [order, setOrder] = useState([])

      const getCartItems = async()=>{
        const response = await axios.get('/api/cart-items?expand=product')
        setCart(response.data)
    }

    useEffect(()=>{ 
 
      const fetchOrder = async()=>{
            const response  = await axios.get('/api/orders?expand=products')
            setOrder(response.data)
        }
    fetchOrder()
    getCartItems()
    },[])


  return (
  <Routes>
    <Route path="/"  element={<Homepage cart={cart} getCartItems={getCartItems}/>}/>
    <Route path='checkout'  element={<CheckoutPage cart={cart}/>}/>
    <Route path='orders' element={<OrderPages order={order} setOrder={setOrder }cart={cart}/>}/>
    <Route path='tracking/:orderId/:productId' element={<Tracking order={order}/>}/>
    <Route path='notfound' element={<NotFound/>}/>
  </Routes>

   
  )
}

export default App
