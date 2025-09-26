import React, { Component } from "react"
import facebook from '../Components/Assets/facebook-app-symbol.png'
import instagram from'../Components/Assets/instagram.png'
import Twitter from '../Components/Assets/twitter.png'
import youtube from '../Components/Assets/youtube.png'
import { Link } from 'react-router-dom'
import './CSS/login.css'
export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        const { email, password } = this.state;
        console.log(email, password);
        fetch("http://localhost:4000/login-user", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        }).then((res) => res.json())
            .then((data) => {
                console.log(data, "userRegister");
                if (data.status === "ok") {
                    alert("login successfull");
                    window.localStorage.setItem("token", data.data);
                    window.localStorage.setItem("loggedIn", true);

                    window.location.href = "./userDetails";
                }
            });
    }
    render() {
        return (
            <div className="my12">
            <form onSubmit={this.handleSubmit}>
                <h3>Sign In</h3>

                <div className="mb-3">
                    <label>Email Address</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                        onChange={(e) => this.setState({ email: e.target.value })}
                    />
                </div>

                <div className="mb-3">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                        onChange={(e) => this.setState({ password: e.target.value })}
                    />
                </div>

                <div className="mb-3">
                    <div className="custom">
                        <input
                            type="checkbox"
                            id="customCheck"
                        />
                        <label  htmlFor="customCheck1" className="check">
                            Remember me
                        </label>
                    </div>
                </div>

                <div className="d-grid">
                    <button type="submit">
                        Submit
                    </button>
                </div>
                <p className="forgot-password">
                    Create an Account? <a href="/sign-up">Sign Up</a>
                </p>
            </form>
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
}