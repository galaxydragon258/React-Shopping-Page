import './Homepage.css'
import { Header } from '../components/Header'
import { useEffect,useState } from 'react'
import axios from'axios'
import { formatMoney } from './utils/money'
import { Product } from './Product'
export function Homepage({cart,getCartItems}) {
    const [products,setProduct] = useState([]);        
    useEffect(()=>{
        axios.get('/api/products').
        then((response)=>{
            setProduct(response.data)  
           
        })
      
    },[])

    return (

        <>

            <link rel="icon" type="image/svg+xml" href="home-favicon.png" />

            <Header cart={cart}/>
            <div  className="home-page">
                <div className="products-grid">
                <Product getCartItems={getCartItems} products={products} />
                </div>
            </div>
        </>


    )
}