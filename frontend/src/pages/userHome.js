import React from "react";
import facebook from '../Components/Assets/facebook-app-symbol.png'
import instagram from'../Components/Assets/instagram.png'
import Twitter from '../Components/Assets/twitter.png'
import youtube from '../Components/Assets/youtube.png'
import { Link } from 'react-router-dom'

import './CSS/user.css'
export default function UserHome({ userData })  {
    const logOut = () => {
        window.localStorage.clear();
        window.location.href = "./sign-in";
    };
    return (
        <div className="div11">
            <div className="div2">
            Name<h1>{userData.fname}</h1>
            Email<h1>{userData.email}</h1>
            <br />
            <button onClick={logOut}>
                Log Out
            </button>
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
    );
}