import { createContext, useEffect, useState } from "react";

import { toast } from "react-toastify";
import Product from "../pages/Product";
import { useNavigate } from "react-router-dom";
import axios from 'axios';


export const ShopContext = createContext();

const ShopContextProvider = (props) => {

  const currency = '$';
  const delivery_fees = 10.00;
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false)
  const [cartItems, setCartItems] = useState({});
  const [products,setProducts] = useState([]);
  const navigate = useNavigate();



  const addToCart =  (itemId, size) => {
    if (!size) {
      toast.error('Select product size')
    }else {
      toast.success('added to cart ')
    }

    let cardData = structuredClone(cartItems);

    if (cardData[itemId]) {
      if (cardData[itemId][size]) {
        cardData[itemId][size] += 1;
      } else {
        cardData[itemId][size] = 1;
      }
    }
    else {
      cardData[itemId] = {};
      cardData[itemId][size] = 1;
    }
    setCartItems(cardData);
  }

 const getCartCount =   () => {
  let totalCount  = 0 ;
  for (const items in cartItems ){
    for ( const item in cartItems[items]){
      try{
        if(cartItems[items] [item] > 0){
          totalCount += cartItems[items][item];
        }
      }catch (error){

      }
    }
  }
  return totalCount;  
 }


 const updateQuantity  = async (itemId,size,quantity) => {
    
    let cardData = structuredClone(cartItems);

    cardData[itemId][size] = quantity;

    setCartItems(cardData);
 }

 const getCartAmount =  () => {
  let totalAmount = 0;
  for (const items in cartItems ){
    let itemInfo = products.find ((Product) =>  Product._id === items);
    for (const item in cartItems[items]){
      try {
        if (cartItems[items][item]){
           totalAmount += itemInfo.price * cartItems[items][item]
        }
      } catch (error) {
        
      }
    }
  } 
  return totalAmount;
 }

const getProductsdata = async () => {
  try {
  
  const response =  await axios.get(backendUrl + '/api/product/list')
   


  
  if(response.data.success){
    setProducts(response.data.products)
  }else{
    toast.error(response.data.message)
  }
    
  } catch (error) {
    console.log(error);

    toast.error(error.message);
    
  }
}

useEffect(() => {
getProductsdata()
},[])


  const value = {
    products, currency, delivery_fees,
    search, setSearch, showSearch, setShowSearch,
    cartItems,addToCart,getCartCount,updateQuantity,getCartAmount,navigate,backendUrl
  }

  return (
    <ShopContext.Provider value={value}>
      {props.children}

    </ShopContext.Provider>
  )
}
export default ShopContextProvider;