import React from "react";
import "./Links.css";
import Marquee from "react-fast-marquee";
import img1 from "../Assets/cytrain.jpg";
import img2 from "../Assets/imagenielitcyberforensics.jpg";
import img3 from "../Assets/indiagov.png";
import img4 from "../Assets/cert-in.jpg";
import img5 from "../Assets/twitter.png";
import img6 from "../Assets/isea.jpg";
import img7 from "../Assets/wcd.jpg";
export const Links = () => {
  return (
    <section id="Link">
      <h2 className="LinkTitle">Usefull Links</h2>
      <div className="Linkimg">
        <Marquee>
          <a href="https://cytrain.ncrb.gov.in/">
            <img src={img1} alt="" className="Linksimg" />
          </a>
          <a href="https://nielitcyberforensics.in/">
            <img src={img2} alt="" className="Linksimg" />
          </a>
          <a href="https://www.india.gov.in/">
            <img src={img3} alt="" className="Linksimg" />
          </a>
          <a href="https://www.cert-in.org.in/">
            <img src={img4} alt="" className="Linksimg" />
          </a>
          <a href="https://twitter.com/CyberDost">
            <img src={img5} alt="" className="Linksimg" />
          </a>
          <a href="https://isea.gov.in/">
            <img src={img6} alt="" className="Linksimg" />
          </a>
          <a href="https://wcd.nic.in/">
            <img src={img7} alt="" className="Linksimg" />
          </a>
        </Marquee>
      </div>
    </section>
  );
};
