import React from 'react'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import HowItWorks from './Sections/HowItWorks'
import Menu from './Sections/Menu'


export default function App() {
  return (
    <div className='text-center font-menu bg-gray-100'>


      <Navbar/>
      <Home/>
      <HowItWorks/>
      <Menu/>
    </div>
  )
}
