import "./Contact.css";

const Contact = () => {
    return (
        <section id="contact" className="contact-section">
            <div className="container_c">
                <h2>Contact Us</h2>
                <p>Get in touch with us for your crane requirements.</p>
                <div className="contact-info">
                    <p><i className="fa-solid fa-envelope"></i> contact@cranecompany.com</p>
                    <p><i className="fa-solid fa-phone"></i> +123 456 7890</p>
                </div>
            </div>
        </section>
    );
};

export default Contact;
