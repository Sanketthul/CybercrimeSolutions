import React from 'react'
import'./dis/FAQ.css'
import facebook from '../Assets/facebook-app-symbol.png'
import instagram from'../Assets/instagram.png'
import Twitter from '../Assets/twitter.png'
import youtube from '../Assets/youtube.png'
import { Link } from 'react-router-dom'
export const FAQ = () => {
  return (
    <div className="my_div">
      <div className="Mydiv">
        <h1>FAQ</h1>
        <p1>Frequently Asked Questions</p1>
        <h2> 1.What is Cyber Crime Solutions?</h2>
        <p>Cyber Crime Solutions is a leading cybersecurity firm dedicated to protecting individuals, businesses, and governments from cyber threats through innovative solutions and expert guidance.</p>
        <h2> 2.What services does Cyber Crime Solutions offer?</h2>
        <p>We offer a range of cybersecurity services including risk assessments, penetration testing, incident response, digital forensics, security awareness training, and ongoing security monitoring.</p>
        <h2> 3. How can Cyber Crime Solutions help my business?</h2>
        <p>Our tailored cybersecurity solutions can help mitigate risks, safeguard sensitive data, ensure compliance with regulations, and enhance overall security posture to protect your business from cyber threats.</p>
        <h2> 4. What industries does Cyber Crime Solutions serve?</h2>
        <p>We serve clients across various industries including finance, healthcare, government, education, manufacturing, and technology, among others.</p>
        <h2> 5. How experienced is the Cyber Crime Solutions team?</h2>
        <p>Our team consists of seasoned cybersecurity professionals with extensive experience in the field, including backgrounds in cybersecurity consulting, law enforcement, digital forensics, and incident response.</p>
        <h2> 6.What sets Cyber Crime Solutions apart from other cybersecurity firms?</h2>
        <p>We differentiate ourselves through our proactive approach, cutting-edge technology, strategic partnerships, and commitment to delivering personalized solutions tailored to each client's unique needs.</p>
        <h2> 7. How can I get started with Cyber Crime Solutions?</h2>
        <p>Simply contact us through our website to schedule a consultation. Our team will work closely with you to assess your cybersecurity needs and develop a customized plan to address them effectively.</p>
        <h2> 8. Is Cyber Crime Solutions available for emergency response?</h2>
        <p>Yes, we offer 24/7 emergency response services to assist clients in mitigating and responding to cybersecurity incidents swiftly and effectively.</p>
        <h2> 9. Does Cyber Crime Solutions provide training and education on cybersecurity?</h2>
        <p>Absolutely! We offer comprehensive security awareness training programs to educate employees and stakeholders on cybersecurity best practices, threat awareness, and incident response protocols.</p>
        <h2> 10. How can I stay updated on the latest cybersecurity trends and news?</h2>
        <p>Follow our blog and social media channels for regular updates, insights, and tips on cybersecurity trends, threats, and best practices.</p>
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
