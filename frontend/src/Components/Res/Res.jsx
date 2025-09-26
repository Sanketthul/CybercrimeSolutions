import React from 'react'
import './Res.css'
import { Link } from 'react-router-dom'
import img from '../Assets/wa.jpg'
import img2 from '../Assets/w.jpg'
import img3 from '../Assets/r.jpg'
export const Res = () => {
  return (
    <section id="Res">
      <span className="RES1">Awareness</span>
      <span className="RP">Cyber crime solutions involve robust cybersecurity measures and proactive threat detection to safeguard digital assets and data integrity. Effective collaboration among stakeholders and continuous education on cyber hygiene are critical elements for prevention and mitigation.</span>
      <div className="RPBars">
      <div className="RRBar">
        <img src={img} alt="" className="RPBarImg" />
        <div className="BarText">
          <Link style={{ textDecoration: 'none'}} to='/Cyber Safety Tips'><h2>Cyber Safety Tips</h2>
          <p>To stay safe in the online world, it is important to follow important cyber safety practices which may help in protecting ourselves and our families from imminent threats that may harm our data and devices. Read More</p></Link>
        </div>
        </div>
        <div className="RRBar">
        <img src={img2} alt="" className="RPBarImg" />
        <div className="BarText">
        <Link style={{ textDecoration: 'none'}} to='/Cyber Awareness'><h2>Cyber Awareness</h2>
          <p>Cybercrime awareness is crucial in today's digital age as more aspects of our lives become intertwined with technology. Read More</p></Link>
        </div>
        </div>
        <div className="RRBar">
        <img src={img3} alt="" className="RPBarImg" />
        <div className="BarText">
        <Link style={{ textDecoration: 'none'}} to='/Secure Online Transactions'><h2>Secure Online Transactions</h2>
          <p>An image portraying secure online transactions, such as a padlock symbolizing encryption or a shield protecting a financial transaction. Read More</p></Link>
        </div>
        </div>
        </div>
    </section>
  )
}
