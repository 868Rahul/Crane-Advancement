import React from "react";
import { useNavigate } from "react-router-dom";
import "./Toolkit.css";

const Toolkit = () => {
  const navigate = useNavigate();

  return (
    <section id="toolkit" className="toolkit-section">
      <div className="toolkit-container">
        <button className="toolkit-button" onClick={() => navigate("/ToolkitPage")}>
        <i class="fa-solid fa-toolbox"></i> Toolkit
        </button>
      </div>
    </section>
  );
};

export default Toolkit;