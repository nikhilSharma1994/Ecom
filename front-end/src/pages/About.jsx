import React from 'react'
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsLetterBox from '../components/NewsLetterBox';

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t '>
        <Title text1={'ABOUT'} text2={"US"}/>

      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
      <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
      <div className='flex flex-col justify-center gap-6 md:w2/4 text-gray-600'>
         <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam voluptate repellendus fuga, at accusamus ratione rerum incidunt nam dolorum. Nam reiciendis voluptates ex asperiores facilis nulla, libero voluptatibus sed ad.</p>
         <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus architecto nisi tempora rem cumque voluptatem? Facilis itaque ipsa corrupti eligendi, quibusdam omnis voluptatibus non voluptatum, repellendus sunt voluptates dolore veniam.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro dolorem modi, tempore, laudantium et impedit distinctio eaque aspernatur, perspiciatis enim doloremque quasi error sequi sint officiis molestiae. Quos, dolores ipsa!</p>
      
      </div>
      </div>
      <div className='text-xl py-4 '>
        <Title text1={'WHY'} text2={'CHOOSE US'}/>

      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600  '>Lorem ipsum dolor sit amet consectetur adipisicing elit. In, ratione molestias minus possimus sunt hic praesentium dolor, eum nesciunt laborum numquam nemo, voluptatibus at veritatis obcaecati necessitatibus fugit suscipit dolorum!</p>

        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. In, ratione molestias minus possimus sunt hic praesentium dolor, eum nesciunt laborum numquam nemo, voluptatibus at veritatis obcaecati necessitatibus fugit suscipit dolorum!</p>

        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. In, ratione molestias minus possimus sunt hic praesentium dolor, eum nesciunt laborum numquam nemo, voluptatibus at veritatis obcaecati necessitatibus fugit suscipit dolorum!</p>

        </div>

      </div>


      <NewsLetterBox/>
      
    </div>
  )
}

export default About;
