import React from 'react'
import './Hero.css'
import bg from '../Assets/homepage .jpg'
import { Link } from 'react-router-dom'
export const Hero = () => {

  return (
        <section id="hero">
            <div className="heroContent">
                <span className="hello">Hello,</span>
                <div>
                <img src={bg} alt="" className='bg'/>
                </div>
                <span className="heroText">This is <span className="helloName">Cyber Crime Solutions</span> <br/> Website</span>
                <p className="heropara">Here you can Empowering individuals and organizations worldwide with comprehensive <br/> solutions to combat cybercrime</p>
                <div className="btn">
                <Link to='/Learn About Cyber Crime'><button>Learn About Cyber Crime</button></Link>
                </div>
            </div>
        </section>
    
  )
}
