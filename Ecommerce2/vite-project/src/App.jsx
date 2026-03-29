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

    useEffect(()=>{
      axios.get('/api/cart-items?expand=product').
      then((response)=>{
        setCart(response.data)
      })
    },[])

  return (
  <Routes>
    <Route path="/"  element={<Homepage cart={cart}/>}/>
    <Route path='checkout'  element={<CheckoutPage cart={cart}/>}/>
    <Route path='orders' element={<OrderPages cart={cart}/>}/>
    <Route path='tracking' element={<Tracking/>}/>
    <Route path='notfound' element={<NotFound/>}/>
  </Routes>

   
  )
}

export default App
