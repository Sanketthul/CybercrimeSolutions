import React from 'react'
import { Hero } from '../Components/Hero/Hero'
import { Res } from '../Components/Res/Res'
import { Cbot } from '../Components/Cbot/Cbot'
import { Links } from '../Components/Useful/Links'
import { Footer } from '../Components/Footer/Footer'
export const Home = () => {
  return (
    <div> 
      <Hero/>
      <Res/>
      <Cbot/>
      <Links/>
      <Footer/>
    </div>
  )
}
