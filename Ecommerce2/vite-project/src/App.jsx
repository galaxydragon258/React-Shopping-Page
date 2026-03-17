import { Routes,Route } from 'react-router'
import { Homepage } from './Pages/Homepage'
import { CheckoutPage } from './Pages/CheckoutPages'

import './App.css'

function App() {

  return (
  <Routes>
    <Route path="/" element={<Homepage/>}/>
    <Route path='checkout' element={<CheckoutPage/>}/>

    
  </Routes>

   
  )
}

export default App
