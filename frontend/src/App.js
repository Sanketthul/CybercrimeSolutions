

import './App.css';
import { Navbar } from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Cybercrime } from './pages/Cybercrime';
import { LearnAbout } from './pages/LearnAbout';
import { Cybera } from './pages/Cybera';
import { Cyber } from './pages/Cyber';
import { Secure } from './pages/Secure';
import { Aboutus } from './pages/Aboutus';
import { Feedback } from './pages/Feedback';
import { Contantus } from './pages/Contantus';
import { Disclaimer } from './Components/footerpoint/Disclaimer';
import { FAQ } from './Components/footerpoint/FAQ';
import { WebsitePolicies } from './Components/footerpoint/WebsitePolicies';
import UserDetails from './pages/userDetails';
import Login from './pages/login_components';
import Signup from "./pages/signup_components";
import { Othercrime } from './pages/Othercrime';





function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Aboutus" element={<Aboutus />} />
          <Route path="/Othercrime" element={<Othercrime />} />
          <Route path="/Feedback" element={<Feedback />} />
          <Route path="/Contactus" element={<Contantus />} />
          <Route path="Cybercrime" element={<Cybercrime />}>
            <Route path=':CybercrimeId' element={<Cybercrime />} />
          </Route>
          <Route path='/Learn About Cyber Crime' element={<LearnAbout />} />
          <Route path='/Secure Online Transactions' element={<Cyber />} />
          <Route path='/Cyber Awareness' element={<Secure />} />
          <Route path='/Cyber Safety Tips' element={<Cybera />} />
          <Route path='/Disclaimer' element={<Disclaimer />} />
          <Route exact path="/login" element={isLoggedIn === "true" ? <UserDetails /> : <Login />} />
          <Route exact path="/sign-in" element={<Login />} />
          <Route exact path="/sign-up" element={<Signup />} />
          <Route exact path="/userDetails" element={<UserDetails />} />

          <Route path='/Website Policies' element={<WebsitePolicies />} />
          <Route path='/FAQ' element={<FAQ />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
