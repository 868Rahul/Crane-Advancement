import React from 'react';
import './CraneMaintenance.css';

const CraneMaintenance = () => {
  return (
    <div className="crane-maintenance">
      <section className="services">
        <h2>Our Services</h2>
        <div className="service-list">
          <div className="service-item">
            <h3>Routine Inspections</h3>
            <ul>
              <li>Visual inspection of structural components</li>
              <li>Checking for wear and tear, cracks, or deformities</li>
              <li>Inspection of hooks, wire ropes, brakes, gears, and chains</li>
            </ul>
          </div>

          <div className="service-item">
            <h3>Lubrication Services</h3>
            <ul>
              <li>Regular greasing of moving parts (e.g., hoist gears, wire ropes, bearings)</li>
              <li>Ensuring smooth and efficient operation</li>
            </ul>
          </div>

          <div className="service-item">
            <h3>Electrical System Check</h3>
            <ul>
              <li>Inspection of electrical wiring, switches, and control panels</li>
              <li>Testing and replacing worn-out electrical components</li>
            </ul>
          </div>

          <div className="service-item">
            <h3>Hydraulic System Maintenance</h3>
            <ul>
              <li>Checking hydraulic fluid levels and quality</li>
              <li>Replacing filters, inspecting cylinders, pumps, and hoses</li>
            </ul>
          </div>

          <div className="service-item">
            <h3>Load Testing</h3>
            <ul>
              <li>Periodic load testing to ensure the crane can lift maximum capacity safely</li>
              <li>Certification as per safety regulations</li>
            </ul>
          </div>

          <div className="service-item">
            <h3>Brake System Inspection</h3>
            <ul>
              <li>Testing and adjusting the brake system</li>
              <li>Replacing worn-out brake pads and linings</li>
            </ul>
          </div>

          <div className="service-item">
            <h3>Calibration of Control Systems</h3>
            <ul>
              <li>Ensuring accurate operation of limit switches and overload protection</li>
              <li>Calibration of sensors and controllers</li>
            </ul>
          </div>

          <div className="service-item">
            <h3>Replacement of Worn Parts</h3>
            <ul>
              <li>Proactive replacement of worn-out components like wire ropes, chains, hooks, etc.</li>
            </ul>
          </div>

          <div className="service-item">
            <h3>Emergency Repair Services</h3>
            <ul>
              <li>On-call services for breakdowns or sudden failures</li>
              <li>Quick response and repair</li>
            </ul>
          </div>

          <div className="service-item">
            <h3>Documentation & Compliance</h3>
            <ul>
              <li>Maintaining maintenance records</li>
              <li>Ensuring compliance with local and international safety standards (like OSHA, ISO)</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CraneMaintenance;