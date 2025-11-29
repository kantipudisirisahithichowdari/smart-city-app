import React from "react";
import "./CityServices.css"; // Make sure this imports your CSS
import { useNavigate } from "react-router-dom";

const CityServices = () => {
  const navigate = useNavigate();

  const services = [
    {
      title: "Water Supply",
      description:
        "Check water availability, report leaks, and access municipal water services.",
      details:
        "Water supply service allows citizens to check water availability, request new connections, and report any leakages.",
      img: "https://source.unsplash.com/400x200/?water", // random image
    },
    {
      title: "Electricity",
      description:
        "Report power outages, pay bills, and access electricity services online.",
      details:
        "Electricity services let users report outages, pay bills online, and track energy consumption.",
      img: "https://source.unsplash.com/400x200/?electricity",
    },
    {
      title: "Waste Management",
      description:
        "Track waste collection schedules and report issues in your area.",
      details:
        "Waste management helps citizens schedule pickups, report missed collections, and learn recycling tips.",
      img: "https://source.unsplash.com/400x200/?waste",
    },
    {
      title: "Transportation",
      description:
        "Get real-time public transport updates and plan your journey efficiently.",
      details:
        "Transportation services provide bus/train schedules, ticket booking, and real-time transit alerts.",
      img: "https://source.unsplash.com/400x200/?transportation",
    },
  ];

  return (
    <div className="cd-page">
      <div className="cd-section">
        <div className="cd-section-head">
          <h2>City Services</h2>
        </div>
        <div className="cd-grid-2">
          {services.map((service, index) => (
            <div
              key={index}
              className="cd-card cd-visual-card"
              onClick={() => navigate("/citizen", { state: service })}
              style={{ cursor: "pointer" }}
            >
              <img src={service.img} alt={service.title} className="cd-card-img" />
              <h3 className="cd-card-title">{service.title}</h3>
              <p className="cd-muted">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CityServices;
