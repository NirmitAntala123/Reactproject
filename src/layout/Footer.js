import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import React from "react";
import {
  faTwitter,
  faFacebookF,
  faGoogle,
  faInstagram,
  faLinkedinIn,
  faGithub,
} from "@fortawesome/fontawesome-free-brands";

// const element = <FontAwesomeIcon icon={faCoffee} />
const Footer = () => {
  return (
    <footer className="bg-dark text-center text-white fixed-bottom">
      {/* Grid container */}
      <div className="container p-4 pb-0">
        {/* Section: Social media */}
        <section className="mb-4">
          {/* Facebook */}
          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
          >
            {/* <i className="fa fa-facebook" />  */}
            <FontAwesomeIcon icon={faFacebookF} />

            {/* <FontAwesomeIcon icon='coffee'/>
         <FontAwesomeIcon icon='cart-arrow-down' /> */}
            {/* <FontAwesomeIcon icon={['fab', 'apple']} />
      <FontAwesomeIcon icon={['fab', 'microsoft']} />
      <FontAwesomeIcon icon={['fab', 'google']} /> */}
          </a>
          {/* Twitter */}
          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
          >
            {/* <i className="fa fa-twitter" /> */}
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          {/* Google */}
          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
          >
            {/* <i className="fa fa-google" /> */}
            <FontAwesomeIcon icon={faGoogle} />
          </a>
          {/* Instagram */}
          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
          >
            {/* <i className="fa fa-instagram" /> */}
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          {/* Linkedin */}
          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
          >
            {/* <i className="fa fa-linkedin" /> */}
            <FontAwesomeIcon icon={faLinkedinIn} />
          </a>
          {/* Github */}
          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
          >
            {/* <i className="fa fa-github" /> */}
            <FontAwesomeIcon icon={faGithub} />
          </a>
        </section>
        {/* Section: Social media */}
      </div>
      {/* Grid container */}
      {/* Copyright */}
      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        © 2020 Copyright:
        <a className="text-white" href="https://mdbootstrap.com/">
          Bootstrap.com
        </a>
      </div>
      {/* Copyright */}
    </footer>
  );
};

export default Footer;
