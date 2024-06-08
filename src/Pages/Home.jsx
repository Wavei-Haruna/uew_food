import React from 'react';
import backgroundImage from '../assets/Images/hero-bg.jpg'; 

export default function Home() {
  return (
    <section className="h-screen bg-cover bg-center bg-no-repeat bg-opacity-50" style={{backgroundImage: `url(${backgroundImage})`}}>

      <div className="flex flex-col justify-center items-center h-full text-center text-white">

        <div className='bg-black opacity- h-full bg-opacity-50   absolute w-screen top-12'></div>
        <h1 className="text-4xl z-10 font-bold mb-4 font-primary text-s1 text-center">
          Welcome to <span className='text-blue-600'>UEW</span><span className='text-primary'>OnlineFood</span> Your Ultimate Food Ordering Companion!
        </h1>
        <p className="text-lg mb-8 z-10 text-center text-primary">Discover, Order, and Enjoy Delicious Meals with Ease</p>
        <button className="px-8 z-10 py-3 bg-blue-500 text-white rounded-md text-center hover:bg-blue-600">
          Order Now
        </button>
      </div>
    </section>
  );
}
