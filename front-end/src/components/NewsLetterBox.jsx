import React from 'react'

const NewsLetterBox = () => {

    const onSubmitHandler = (event) => {
     event.preventdefault();
    }
  return (
    <div className='text-center'>
      <p className='text-2xl font-medium text-gray-800'>Subscribe Now & get 20% Off</p>
       <p className='text-gray-400  mt-3'>To "subscribe now and get 20% off some lines," you typically need to click a button, link, or sign up for an email list on a website to activate a limited-time offer, a specific discount code, or a subscription benefit where a 20% discount applies to certain items or services. </p>
    
       <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3 ' >
        <input className=' w-full sm:flex-1 outline-none' type="emial" placeholder='Enter Your Email' required />
       <button className='bg-black text-white text-xs px-10 py-4' type='submit'>Subscribe</button>
       </form>
    </div>
  )
}

export default NewsLetterBox
