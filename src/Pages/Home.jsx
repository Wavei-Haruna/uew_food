import React from 'react';
import { motion } from 'framer-motion';
import { FaAllergies, FaFastForward, FaGoodreads } from 'react-icons/fa';
import backgroundImage from '../assets/Images/hero-bg.jpg';
import Navbar from '../Components/Navbar';
import { Link } from 'react-router-dom';
import Sadat from '../assets/Images/sadat.jpg'
import Richard from '../assets/Images/richard.jpg'
import Haruna from '../assets/Images/haruna.jpg'
export default function Home() {
  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <section className="h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="flex flex-col justify-center items-center h-full text-center text-white relative">
          <div className="bg-black opacity-60 h-full w-screen absolute top-0"></div>
          <motion.h1 
            className="lg:text-5xl text-2xl z-10 font-bold mb-6 font-primary text-white"
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Welcome to <span className="text-blue-500">AAMUSTED</span><span className="text-yellow-500">OnlineFood</span>
          </motion.h1>
          <motion.p 
            className="text-lg z-10 mb-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Discover, Order, and Enjoy Delicious Meals with Ease
          </motion.p>
          <Link to={'/signup'}
            className="px-8 z-10 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose Us?</h2>
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, staggerChildren: 0.3 }}
          >
            <motion.div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <FaFastForward className='text-4xl text-pink-700 mb-4'/>
              <h3 className="text-2xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Get your food delivered hot and fresh in record time.</p>
            </motion.div>
            <motion.div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <FaAllergies className='text-4xl text-pink-700 mb-4'/>
              <h3 className="text-2xl font-semibold mb-2">Wide Variety</h3>
              <p className="text-gray-600">Explore a wide range of cuisines and dishes.</p>
            </motion.div>
            <motion.div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <FaGoodreads className='text-4xl text-pink-700 mb-4'/>
              <h3 className="text-2xl font-semibold mb-2">Top Quality</h3>
              <p className="text-gray-600">Enjoy meals prepared with the freshest ingredients.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>
      {/* Team Section */}
      <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Our Team</h2>
        <motion.div
          className="grid md:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, staggerChildren: 0.3 }}
        >
          <motion.div
            className="bg-gradient-to-br from-white via-gray-100 to-gray-200 rounded-xl shadow-lg p-8 text-center transform transition duration-300 hover:scale-105 hover:shadow-2xl"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={Haruna}
              alt="Sadat Sulemani Aboagye"
              className="w-24 h-24 mx-auto rounded-full mb-6 border-4 border-pink-600"
            />
            <h3 className="text-2xl font-semibold mb-2 text-gray-800">Haruna Wavei</h3>
            <p className="text-gray-600">Level 400, Index Number 5201040200</p>
          </motion.div>

          <motion.div
            className="bg-gradient-to-br from-white via-gray-100 to-gray-200 rounded-xl shadow-lg p-8 text-center transform transition duration-300 hover:scale-105 hover:shadow-2xl"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={Richard}
              alt="Richard"
              className="w-24 h-24 mx-auto rounded-full mb-6 border-4 border-pink-600"
            />
            <h3 className="text-2xl font-semibold mb-2 text-gray-800">Richard Agyekum</h3>
            <p className="text-gray-600">Level 400, Index Number 5201040194</p>
          </motion.div>

          <motion.div
            className="bg-gradient-to-br from-white via-gray-100 to-gray-200 rounded-xl shadow-lg p-8 text-center transform transition duration-300 hover:scale-105 hover:shadow-2xl"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={Sadat}
              alt="Sadat Sulemani Aboagye"
              className="w-24 h-24 mx-auto rounded-full mb-6 border-4 border-pink-600"
            />
            <h3 className="text-2xl font-semibold mb-2 text-gray-800">Sadat Sulemani Aboagye</h3>
            <p className="text-gray-600">Level 400, Index Number 5201040146</p>
          </motion.div>
        </motion.div>
      </div>
    </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-12">Our Impact</h2>
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, staggerChildren: 0.3 }}
          >
            <motion.div className="bg-blue-600 text-white rounded-lg shadow-lg p-8">
              <h3 className="text-4xl font-bold mb-2">500+</h3>
              <p className="text-lg">Meals Delivered Daily</p>
            </motion.div>
            <motion.div className="bg-yellow-500 text-white rounded-lg shadow-lg p-8">
              <h3 className="text-4xl font-bold mb-2">300+</h3>
              <p className="text-lg">Happy Customers</p>
            </motion.div>
            <motion.div className="bg-pink-700 text-white rounded-lg shadow-lg p-8">
              <h3 className="text-4xl font-bold mb-2">50+</h3>
              <p className="text-lg">Partner Restaurants</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-blue-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-12">What Our Customers Say</h2>
          <motion.div 
            className="grid md:grid-cols-2 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, staggerChildren: 0.3 }}
          >
            <motion.div className="bg-blue-600 rounded-lg p-8 shadow-lg">
              <p className="italic mb-4">"The best food delivery service I've ever used! The meals are always delicious and delivered on time."</p>
              <h4 className="text-2xl font-semibold">- Dr Tatra</h4>
            </motion.div>
            <motion.div className="bg-blue-600 rounded-lg p-8 shadow-lg">
              <p className="italic mb-4">"Amazing variety of dishes and top-notch quality. Highly recommended!"</p>
              <h4 className="text-2xl font-semibold">- Haruna Wavei</h4>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-yellow-400 text-center">
        <h2 className="text-4xl font-bold mb-4">Ready to Order?</h2>
        <p className="text-xl mb-8">Join thousands of satisfied customers and experience the best food delivery service today!</p>
        <motion.button 
          className="px-10 py-4 bg-blue-600 text-white rounded-full text-lg hover:bg-blue-700 transition duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Sign Up Now
        </motion.button>
      </section>

      {/* About Us Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-8">
            About Us
          </h2>
          <motion.p 
            className="text-lg text-gray-700 mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            At AAMUSTED OnlineFood, we are dedicated to bringing you the best food ordering experience. Whether you're a student, staff, or visitor, our platform allows you to explore a wide variety of meals from local vendors. We prioritize quality, convenience, and customer satisfaction, making food delivery a breeze.
          </motion.p>
          <motion.p 
            className="text-lg text-gray-700"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Join us in our mission to create a seamless food ordering experience that connects you with your favorite meals at the touch of a button.
          </motion.p>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
            Contact Us
          </h2>
          <motion.div 
            className="md:flex justify-center items-center space-x-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div className="text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Email</h3>
              <p className="text-gray-600">support@onlinefood.aamusted.edu.gh</p>
            </motion.div>
            <motion.div className="text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Phone</h3>
              <p className="text-gray-600">+233 551 837 449</p>
            </motion.div>
            <motion.div className="text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Address</h3>
              <p className="text-gray-600">AAMUSTED Campus, Kumasi, Ghana</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <motion.div 
            className="flex justify-center space-x-6 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, staggerChildren: 0.3 }}
          >
            <motion.a 
              href="#" 
              className="text-gray-400 hover:text-white transition duration-300"
              whileHover={{ scale: 1.1 }}
            >
              Facebook
            </motion.a>
            <motion.a 
              href="#" 
              className="text-gray-400 hover:text-white transition duration-300"
              whileHover={{ scale: 1.1 }}
            >
              Twitter
            </motion.a>
            <motion.a 
              href="#" 
              className="text-gray-400 hover:text-white transition duration-300"
              whileHover={{ scale: 1.1 }}
            >
              Instagram
            </motion.a>
            <motion.a 
              href="#" 
              className="text-gray-400 hover:text-white transition duration-300"
              whileHover={{ scale: 1.1 }}
            >
              LinkedIn
            </motion.a>
          </motion.div>
          <p className="text-gray-400 mb-4">
            &copy; {new Date().getFullYear()} AAMUSTED OnlineFood. All rights reserved.
          </p>
          <p className="text-gray-400">
            Designed with ♥ by AAMUSTED Tech Team
          </p>
        </div>
      </footer>
    </div>
  );
}
