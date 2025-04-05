import "./Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-section">
                    <h3>CRANE Company</h3>
                    <p>Reliable lifting solutions for your business.</p>
                </div>

                <div className="footer-section">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#about">About</a></li>
                        <li><a href="#services">Services</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3>Contact Us</h3>
                    <p>Email: contact@cranecompany.com</p>
                    <p>Phone: +123 456 7890</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
