import React from 'react'
import'./dis/Disclaimer.css'
import facebook from '../Assets/facebook-app-symbol.png'
import instagram from'../Assets/instagram.png'
import Twitter from '../Assets/twitter.png'
import youtube from '../Assets/youtube.png'
import { Link } from 'react-router-dom'
export const Disclaimer = () => {
  return (
    <div className="div_head">
      <p>note:- our website purpose is to help those people who attacked by cyberthreats and our work is to give solutions we don't record any type of personal information from user You can generally visit the site without revealing Personal Information, unless you choose to provide such information. and also we don't file a complaint if u want to file complaint report then go to national cyber crime website by below link</p>
      <div className="div">
        <h1>Disclaimer</h1>
        <p>The information provided on the Cyber Crime Solutions website is for general informational purposes only. </p> 
        <p>While we strive to keep the information accurate and up to date, we make no representations or warranties of any </p>
        <p>kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect </p> 
        <p>to the website or the information, products, services, or related graphics contained on the website for any purpose.</p>
        <p>our website its for information & solutions base which help u to be aware about cyber threats and the solutions we share with u that are not 100 percent correct so choose wisely this website is for educational purpose and awareness about cyber crime </p>
      </div>
      <div className="footer">
      <ul className="footer-links">
      <Link style={{textDecoration:'none'}}to='/Disclaimer'><li>Disclaimer</li></Link>
      <Link style={{textDecoration:'none'}}to='/FAQ'><li>FAQ</li></Link>
        <Link style={{textDecoration:'none'}}to='/Website Policies'><li>Website Policies</li></Link>
      </ul>
      <div className="footer-social-icon">
        <div className="footer-icons-container">
        <a href='https://www.facebook.com/profile.php?id=61557782943831'><img src={facebook} alt="" /></a>
          </div>
          <div className="footer-icons-container">
          <a href='https://www.instagram.com/cyber_crime_solutions/?hl=en'><img src={instagram} alt="" /></a>
          </div>
          <div className="footer-icons-container">
          <a href='https://twitter.com/Cyberdost215403'><img src={Twitter} alt="" /></a>
          </div>
          <div className="footer-icons-container">
          <a href='https://www.youtube.com/channel/UCJu2wA_pKFOJ6j10YW7q7oA'><img src={youtube} alt="" /></a>
        </div>
      </div>
      <div className="footer-copyright">
        <hr/>
        <p>Copyright @ 2023 - All Right Reserved Designed By Cyber Crime Solutions.</p>
      </div>
      </div>
    </div>
  )
}
