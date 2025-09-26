import React, { useEffect, useState } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import facebook from '../Components/Assets/facebook-app-symbol.png'
import instagram from '../Components/Assets/instagram.png'
import Twitter from '../Components/Assets/twitter.png'
import youtube from '../Components/Assets/youtube.png'
import { Link } from 'react-router-dom'
import './CSS/admin.css'
export default function AdminHome({ userData }) {
    const [data, setData] = useState([]);
    useEffect(() => {
        getAllUser();
    }, []);

    const getAllUser = () => {
        fetch("http://localhost:4000/getAllUser", {
            method: "GET",
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data, "userData");
                setData(data.data);
            });
    };
    const logOut = () => {
        window.localStorage.clear();
        window.location.href = "./sign-in";
    };
    const deleteUser = (id, name) => {
        if (window.confirm(`Are you sure you want to delete ${name}`)) {
            fetch("http://localhost:4000/deleteUser", {
                method: "POST",
                crossDomain: true,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({
                    userid: id,
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    alert(data.data);
                    getAllUser();
                });
        } else {
        }
    };
    return (
        <div className="div11">
            <div className="div22">
                <h1>Welcome Admin</h1>
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>User Type</th>
                        <th>Delete</th>
                    </tr>
                    {data.map(i => {
                        return (
                            <tr>
                                <td>{i.fname}</td>
                                <td>{i.email}</td>
                                <td>{i.userType}</td>
                                <td>
                                    <FontAwesomeIcon
                                        icon={faTrash}
                                        onClick={() => deleteUser(i._id, i.fname)}
                                    />
                                </td>
                            </tr>
                        )
                    })}
                </table>
                <button onClick={logOut} className="button3">
                    Log Out
                </button>
            </div>
            <div className="footer">
                <ul className="footer-links">
                    <Link style={{ textDecoration: 'none' }} to='/Disclaimer'><li>Disclaimer</li></Link>
                    <Link style={{ textDecoration: 'none' }} to='/FAQ'><li>FAQ</li></Link>
                    <Link style={{ textDecoration: 'none' }} to='/Website Policies'><li>Website Policies</li></Link>
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
                    <hr />
                    <p>Copyright @ 2023 - All Right Reserved Designed By Cyber Crime Solutions.</p>
                </div>
            </div>
        </div>
    );
}