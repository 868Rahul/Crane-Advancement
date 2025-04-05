import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import './Services.css';

const Services = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  // Function to handle the click event for the Maintenance card
  const handleMaintenanceClick = () => {
    navigate('/CraneMaintenance'); // Redirect to the Maintenance page
  };

  const handleRentalClick = () => {
    navigate('/CraneRental'); // Redirect to the Rental page
  };
  const handleCustomSolution = () => {
    navigate('/CustomSolution'); // Redirect to the Rental page
  };

  return (
    <section id="services" className="services-section">
      <div className="container_s">
        <h2>Our Services</h2>
        <div className="services-grid">
          <div className="service-card" onClick={handleRentalClick} style={{ cursor: 'pointer' }}>
            <i className="fa-solid fa-truck-loading"></i>
            <h3>Crane Rental</h3>
            <p>Flexible rental options for short and long-term projects.</p>
          </div>

          {/* Maintenance Card with Click Handler */}
          <div className="service-card" onClick={handleMaintenanceClick} style={{ cursor: 'pointer' }}>
            <i className="fa-solid fa-tools"></i>
            <h3>Maintenance</h3>
            <p>Expert maintenance services to keep your cranes in top condition.</p>
          </div>

          <div className="service-card" onClick={handleCustomSolution} style={{ cursor: 'pointer' }}>
            <i className="fa-solid fa-industry"></i>
            <h3>Custom Solutions</h3>
            <p>Tailored crane solutions for your specific business needs.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;