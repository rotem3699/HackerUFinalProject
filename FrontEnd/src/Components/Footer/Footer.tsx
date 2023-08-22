import SocialMedia from "../SocialMedia/SocialMedia";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer-comp">
      <div className="footer-content">
        <div className="footer-section hide-on-mobile move-right">
          <h3 className="footer-headline ">About Us</h3>
          <p>
            We Are The Official Cocktail Website. <br></br> Come Look At Our
            Recipes, And Make Your Own Cocktail!
          </p>
        </div>
        <div className="footer-section  move-right footer-quick-links">
          <h3 className="footer-headline">Quick Links</h3>
          <a href="/" className="footer-links">
            Home
          </a>

          <a href="/about-us" className="footer-links">
            About Us
          </a>
          <a href="/contact-us" className="footer-links">
            Contact Us
          </a>
        </div>
        <div className="footer-section  move-right">
          <h3 className="footer-headline">Contact Us</h3>
          <p>Email: cocktail@cocktail4u.com</p>
          <p>Phone: 050-123-4567</p>
        </div>
        <div className="footer-section">
          <h3 className="footer-headline " id="social-media-headline">
            Social Media
          </h3>
          <SocialMedia></SocialMedia>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="footer-credit">
          &copy; 2023 Rotem Moyal's Cocktail Website. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Footer;
