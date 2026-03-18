import { Routes,Route } from 'react-router'
import { Homepage } from './Pages/Homepage'
import { CheckoutPage } from './Pages/Checkout/CheckoutPages'
import { OrderPages } from './Pages/OrderPages'
import { Tracking } from './Pages/Tracking'
import './App.css'


function App() {

  return (
  <Routes>
    <Route path="/" element={<Homepage/>}/>
    <Route path='checkout' element={<CheckoutPage/>}/>
    <Route path='orders' element={<OrderPages/>}/>
    <Route path='tracking' element={<Tracking/>}/>


    
  </Routes>

   
  )
}

export default App
