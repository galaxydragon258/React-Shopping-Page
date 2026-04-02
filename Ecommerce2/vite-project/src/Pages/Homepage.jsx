import './Homepage.css'
import { Header } from '../components/Header'
import { useEffect,useState } from 'react'
import axios from'axios'
import { useSearchParams } from 'react-router'
import { formatMoney } from './utils/money'
import { Product } from './Product'
export function Homepage({cart,getCartItems}) {
    const [products,setProduct] = useState([]);    
    const [searchParams] = useSearchParams();  
    const search = searchParams.get('search')

    useEffect(()=>{
        if(search){
            axios.get(`/api/products?search=${search}`).
            then((response)=>{
                setProduct(response.data)
            })
            return;

        }
        axios.get('/api/products').
        then((response)=>{
            setProduct(response.data)  
           
        })
      
    },[search])

    console.log(products)
    console.log(search)

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