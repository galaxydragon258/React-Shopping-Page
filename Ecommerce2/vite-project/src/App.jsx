import { Routes,Route } from 'react-router'
import { Homepage } from './Pages/Homepage'

import './App.css'

function App() {

  return (
  <Routes>
    <Route path="/" element={<Homepage/>}/>
    <Route path='checkout' element={<div>Test checkout pages</div>}/>

    
  </Routes>

   
  )
}

export default App
