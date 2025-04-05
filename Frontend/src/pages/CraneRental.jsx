import React from 'react';
import './CraneRental.css'; // Import the CSS file

// Import images from the assets folder
import Craner from '../assets/craner.png';
import MobileCrane from '../assets/mobile.png';
import towerCrane from '../assets/Towercrane.png';
import RoughTerrainCrane from '../assets/vehicle.png';

const CraneRental = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="heros">
        <h1>Flexible Crane Rental Services</h1>
        <p>Available for short-term and long-term projects at competitive rates.</p>
      </section>

      {/* Available Cranes Section */}
      <section className="available-cranes">
        <h2>Our Available Cranes</h2>
        <div className="crane-grid">
          {[
            {
              name: 'Mobile Crane',
              image: MobileCrane,
              capacity: '50 Tons',
              features: ['Compact design', 'Easy to transport'],
              price: '₹500/day', // Updated to rupee symbol
            },
            {
              name: 'Tower Crane',
              image: towerCrane,
              capacity: '200 Tons',
              features: ['High lifting capacity', 'Ideal for tall structures'],
              price: '₹1000/day', // Updated to rupee symbol
            },
            {
              name: 'Crawler Crane',
              image: Craner,
              capacity: '300 Tons',
              features: ['Stable on rough terrain', 'Heavy lifting'],
              price: '₹1200/day', // Updated to rupee symbol
            },
            {
              name: 'Rough Terrain Crane',
              image: RoughTerrainCrane,
              capacity: '100 Tons',
              features: ['Maneuverable on uneven ground', 'Versatile'],
              price: '₹800/day', // Updated to rupee symbol
            },
          ].map((crane, index) => (
            <div key={index} className="crane-card">
              <img src={crane.image} alt={crane.name} />
              <h3>{crane.name}</h3>
              <p>Capacity: {crane.capacity}</p>
              <ul>
                {crane.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
              <p className="price">{crane.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Rental Process Section */}
      <section className="process">
        <h2>How It Works</h2>
        <div className="process-steps">
          {[
            { icon: '📋', step: 'Choose Crane Type' },
            { icon: '💬', step: 'Get Custom Quote' },
            { icon: '📝', step: 'Sign Agreement' },
            { icon: '🚚', step: 'Delivery & Operation Support' },
          ].map((item, index) => (
            <div key={index} className="step">
              <span>{item.icon}</span>
              <p>{item.step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-us">
        <h2>Why Choose Us?</h2>
        <div className="benefits-grid">
          {[
            'Wide Range of Cranes',
            'Affordable Rates',
            'Expert Operators Available',
            'Fast Delivery & Pickup',
            'Maintenance Support Included',
          ].map((point, index) => (
            <div key={index} className="benefit">
              <p>{point}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2>What Our Clients Say</h2>
        <div className="testimonials-grid">
          {[
            {
              name: 'John Doe',
              feedback: 'Great service and reliable cranes. Highly recommended!',
            },
            {
              name: 'Jane Smith',
              feedback: 'Affordable rates and excellent customer support.',
            },
            {
              name: 'Mike Johnson',
              feedback: 'The cranes were delivered on time and performed flawlessly.',
            },
          ].map((testimonial, index) => (
            <div key={index} className="testimonial">
              <p className="feedback">"{testimonial.feedback}"</p>
              <p className="client-name">- {testimonial.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="contact-form">
        <h2>Get Your Custom Quote</h2>
        <form>
          <input type="text" placeholder="Your Name" />
          <input type="email" placeholder="Your Email" />
          <input type="text" placeholder="Phone Number" />
          <select>
            <option>Select Crane Type</option>
            <option>Mobile Crane</option>
            <option>Tower Crane</option>
            <option>Crawler Crane</option>
            <option>Rough Terrain Crane</option>
          </select>
          <input type="text" placeholder="Rental Date Range" />
          <textarea placeholder="Project Details" rows="4"></textarea>
          <button type="submit">Submit</button>
        </form>
      </section>
    </div>
  );
};

export default CraneRental;