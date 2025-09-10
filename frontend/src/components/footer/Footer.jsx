import './Footer.css';

// import instagram_icon from '../assets/instagram_icon.png';
// import logo from '../assets/logo.png';
// import pintester_icon from '../assets/pintester_icon.png';
// import whatsapp_icon from '../assets/whatsapp_icon.png';

const Footer = () => {
  return (
    <div className="footer">
        {/* <div className="footer-container">
            <div className="footer-left">
                <div className="footer-logo">
                    <img src={logo} alt="logo" />
                    <p>Tshee</p>
                </div>
                <div className="footer-social-icon">
                        <div className="footer-icon-container">
                            <img src={instagram_icon} alt="instagram" />
                        </div>
                        <div className="footer-icon-container">
                            <img src={pintester_icon} alt="instagram" />
                        </div>
                        <div className="footer-icon-container">
                            <img src={whatsapp_icon} alt="instagram" />
                        </div>
                </div>
            </div>
            <div className="footer-right">
                <ul className="footer-links">
                    <li>Company</li>
                    <li>Products</li>
                    <li>Offices</li>
                    <li>About</li>
                    <li>Contact</li>
                </ul>
            </div>
        </div> */}
        
        <div className="footer-copyright">
            <hr />
            <p>Copyright © 2025 Tshee. All rights reserved.</p>
        </div>
    
    </div>
  )
}

export default Footer