import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProduct from '../components/RelatedProduct';

const Product = () => {

  const { productId } = useParams();
  const { products, currency,addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
      

        return null;

      }
    });
  }
  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  const sizes = productData && productData.sizes
  ? (Array.isArray(productData.sizes[0]) ? productData.sizes[0] : productData.sizes)
  : [];


  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* Product data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row '>
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full '>
            {
              productData.image.map((item, index) => {
                return (
                  <img onClick={() => setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer ' alt="" />
                )
              })
            }
          </div>

          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={image} alt="" />
          </div>
        </div>


        {/*  -----------      Product info ----------------- */}

        <div className='flex-1 '>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2 '>
            <img src={assets.star_icon} className='w-3 5' alt="" />
            <img src={assets.star_icon} className='w-3 5' alt="" />
            <img src={assets.star_icon} className='w-3 5' alt="" />
            <img src={assets.star_icon} className='w-3 5' alt="" />
            <img src={assets.star_dull_icon} className='w-3 5' alt="" />
            <p className='pl-2'>{1.8}K</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency} {productData.price}</p>
          <p className='mt-5 text-gray-500 w-4/5'>{productData.description}</p>

          <div className='flex flex-col gap-4 my-8 '>
            <p>Select Size </p>
            <div className='flex gap-2'>
              {productData.sizes.map((item, index) => (
                <button onClick={() => {
                  setSize(item)
                 console.log(item)
                  
                }} className={`border py-2 cursor-pointer px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ''} `} key={index}> {item
                
                } </button>

              ))}
            </div>

          </div>
          <button onClick={() => addToCart(productData._id,size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700' >ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5' />

          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Origial Poduct</p>
            <p>Cash on delivery is available on this product</p>
            <p>Easy Return and Exchange Policy available within 7 days </p>

          </div>
        </div>

      </div>

      {/* Description and review section */}

      <div className='mt-20'> 
       <div className='flex '>
         <b className='border px-5 py-3 text-sm  '>Description</b>
         <p className='border px-5 py-3 text-sm  '> Reviews(1.3k)</p>
       </div>
       <div className='felx flex-col gap-4 py-6  px-6 text-sm border text-gray-500'> 
       <p>E-commerce, or electronic commerce, is the act of buying and selling goods or services using the internet and electronic platforms like websites or mobile apps. It encompasses all online activities related to a commercial transaction, from initial browsing and purchasing to payment and order fulfillment, often occurring through virtual storefronts instead of physical ones</p> <br/>
       <p> Businesses can connect with a global audience and operate 24/7, while customers enjoy convenience and 24/7 access from anywhere.  </p>
       </div>
      </div>

      {/* --------------display related products  */}
      <RelatedProduct category={productData.category} subcategory={productData.subcategory}/>

    </div>
  ) : <div className='opacity-0'></div>
}

export default Product
