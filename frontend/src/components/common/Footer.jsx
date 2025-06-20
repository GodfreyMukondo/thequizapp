import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/footer.css';

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-links">
        <Link to="/about" className="footer-link">About</Link>
        <Link to="/contact" className="footer-link">Contact</Link>
        <Link to="/terms" className="footer-link">Terms</Link>
        <Link to="/privacy" className="footer-link">Privacy</Link>
      </div>
      <div className="footer-text">
        © {new Date().getFullYear()} G.Mukondo Quiz App. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
