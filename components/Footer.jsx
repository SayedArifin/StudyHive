import React from "react";
import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import "./footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer social-icons">
        <Link href="https://www.facebook.com">
          <FaFacebook />
        </Link>
        <Link href="https://www.twitter.com">
          <FaTwitter />
        </Link>
        <Link href="https://www.instagram.com">
          <FaInstagram />
        </Link>
      </div>
      <div className="footer-text">
        <p className="footer-text">
          © {new Date().getFullYear()} StudyHive. All rights reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
