import { useState } from 'react'
import HeroGeometric from '../components/GeometricHero'
import '../styles/App.css'

function App() {

  return ( 
  <div className='hero-section'>
    {/* <HeroGeometric
      title1="Robert's"
      title2="Coffee Shop"
      description="Enjoy the finest coffee from Kenya's leading coffee shop!"
      color1="#3B82F6"
      color2="#F0F9FF"
      speed={1.6}
    /> */}
    <h1 className='title-1'>Robert's</h1>
    <h1 className='title-2'>Coffee Shop</h1>
    <p className='description'>Enjoy the finest coffee from Kenya's leading coffee shop!</p>
  </div>
  )
}

export default App
