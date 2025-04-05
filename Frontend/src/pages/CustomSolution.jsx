import React from 'react';
import './CustomSolution.css'; // Import the CSS file

const CustomSolution = () => {
  return (
    <div className="project-specific-cranes">
      {/* Hero Section */}
      <section className="hero_s">
        <h1>Project-Specific Crane Modifications</h1>
        <p>Tailored solutions to meet your unique project requirements.</p>
      </section>

      {/* Custom Modifications Section */}
      <section className="custom-modifications">
        <h2>Custom Modifications</h2>
        <div className="modifications-grid">
          <div className="modification-card">
            <h3>Custom Boom Length Adjustments</h3>
            <p>Adjust boom lengths to suit your project's reach requirements.</p>
          </div>
          <div className="modification-card">
            <h3>Load Capacity Enhancements</h3>
            <p>Enhance load capacity for heavy-duty lifting tasks.</p>
          </div>
          <div className="modification-card">
            <h3>Specialized Attachments</h3>
            <p>Attachments like clamps, hooks, and buckets for specialized tasks.</p>
          </div>
        </div>
      </section>

      {/* On-Site Setup & Dismantling Section */}
      <section className="on-site-setup">
        <h2>On-Site Crane Setup & Dismantling</h2>
        <p>
          Providing engineers and technicians for crane assembly/disassembly based on site conditions.
        </p>
      </section>

      {/* Custom Crane Fabrication Section */}
      <section className="custom-fabrication">
        <h2>Custom Crane Fabrication</h2>
        <p>
          Manufacturing cranes based on client's unique requirements (size, load, reach, terrain type).
        </p>
      </section>

      {/* Remote-Controlled & Automated Cranes Section */}
      <section className="remote-cranes">
        <h2>Remote-Controlled or Automated Cranes</h2>
        <p>
          Integration of remote operation features or semi-automation for safety and precision.
        </p>
      </section>

      {/* IoT & Monitoring Systems Section */}
      <section className="iot-monitoring">
        <h2>Integration with IoT & Monitoring Systems</h2>
        <div className="iot-features">
          <p>Real-time load monitoring</p>
          <p>GPS tracking</p>
          <p>Predictive maintenance solutions using sensors</p>
        </div>
      </section>

      {/* Specialized Lifting Solutions Section */}
      <section className="specialized-lifting">
        <h2>Specialized Lifting Solutions</h2>
        <div className="lifting-features">
          <p>Custom rigging services for oversized or irregular loads.</p>
          <p>Designing lift plans for challenging environments (urban spaces, tight spaces, etc.).</p>
        </div>
      </section>

      {/* Industry-Specific Solutions Section */}
      <section className="industry-solutions">
        <h2>Industry-Specific Solutions</h2>
        <div className="industry-grid">
          <div className="industry-card">
            <h3>Oil & Gas</h3>
            <p>Cranes designed for offshore rigs and heavy lifting.</p>
          </div>
          <div className="industry-card">
            <h3>Wind Energy</h3>
            <p>Tall, heavy lifts for wind turbine installations.</p>
          </div>
          <div className="industry-card">
            <h3>Shipbuilding</h3>
            <p>Specialized cranes for shipyard operations.</p>
          </div>
          <div className="industry-card">
            <h3>High-Rise Construction</h3>
            <p>Cranes for construction in urban and high-rise environments.</p>
          </div>
        </div>
      </section>

      {/* Safety & Compliance Section */}
      <section className="safety-compliance">
        <h2>Safety & Compliance Customization</h2>
        <p>
          Meeting international/local safety regulations tailored to client’s location. Custom safety
          features like anti-sway systems, load indicators, etc.
        </p>
      </section>

      {/* Flexible Payment & Rental Plans Section */}
      <section className="payment-plans">
        <h2>Flexible Payment & Rental Plans</h2>
        <p>
          Custom rental agreements (short/long-term, operator included, maintenance-included
          packages).
        </p>
      </section>

      {/* Operator Training Programs Section */}
      <section className="operator-training">
        <h2>Operator Training Programs</h2>
        <p>Custom training for client's staff to operate specific cranes safely.</p>
      </section>
    </div>
  );
};

export default CustomSolution;