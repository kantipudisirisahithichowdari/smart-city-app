import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./CitizenDashboard.css";

// Categories
const CATEGORIES = ["Road", "Water", "Electricity", "Sanitation", "Other"];

// Main Component
const CitizenDashboard = () => {
  // --- Complaints State ---
  const [complaints, setComplaints] = useState(() => {
    try {
      const raw = localStorage.getItem("citizenComplaints");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);

  useEffect(() => {
    localStorage.setItem("citizenComplaints", JSON.stringify(complaints));
  }, [complaints]);

  const openCount = useMemo(
    () => complaints.filter((c) => c.status === "Open").length,
    [complaints]
  );

  const addComplaint = (e) => {
    e.preventDefault();
    if (!title.trim() || !desc.trim()) return;
    const newItem = {
      id: Date.now(),
      title: title.trim(),
      description: desc.trim(),
      category,
      status: "Open",
      createdAt: new Date().toISOString(),
    };
    setComplaints([newItem, ...complaints]);
    setTitle("");
    setDesc("");
    setCategory(CATEGORIES[0]);
  };

  const toggleStatus = (id) => {
    setComplaints((list) =>
      list.map((c) =>
        c.id === id
          ? { ...c, status: c.status === "Open" ? "Resolved" : "Open" }
          : c
      )
    );
  };

  // --- City Information with Images ---
  const city = {
    hospitals: [
      {
        name: "City Hospital",
        address: "Main Road, Sector 12",
        phone: "011-2345678",
        img: "./doc.jpg",
      },
      {
        name: "Sunrise Clinic",
        address: "Park Avenue, Block B",
        phone: "011-2233445",
        img: "./doc2.jpg",
      },
    ],
    touristPlaces: [
      {
        name: "Central Park",
        desc: "Green oasis with jogging tracks and lake.",
        img: "./park.jpg",
      },
      {
        name: "City Museum",
        desc: "Artifacts and history exhibits.",
        img: "./meuseum.webp",
      },
    ],
    salons: [
      {
        name: "Great Salon",
        area: "Downtown",
        img: "./salon.jpg",
      },
      {
        name: "Style Studio",
        area: "East Market",
        img: "./style.avif",
      },
    ],
    offices: [
      {
        name: "Municipal Corporation",
        dept: "Civic Services",
        img: "./muni.jpg",
      },
      {
        name: "RTO Office",
        dept: "Transport",
        img: "./rto.webp",
      },
    ],
    schemes: [
      {
        title: "Clean City Initiative",
        brief: "Subsidies for waste segregation units.",
        img: "./clean.jpg",
      },
      {
        title: "Green Homes",
        brief: "Rebates on solar rooftop installations.",
        img: "./grren.png",
      },
    ],
  };

  return (
    <div className="cd-page">
      {/* Header */}
      <div className="cd-header">
        <h1>Citizen Dashboard</h1>
        <div className="cd-actions">
          <Link to="/profile" className="cd-link">
            Profile
          </Link>
          <Link to="/cityservices" className="cd-link">
            City Services
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="cd-kpis">
        <div className="cd-kpi gradient-blue">
          <div className="cd-kpi-title">Open Complaints</div>
          <div className="cd-kpi-value">{openCount}</div>
        </div>
        <div className="cd-kpi gradient-red">
          <div className="cd-kpi-title">Total Complaints</div>
          <div className="cd-kpi-value">{complaints.length}</div>
        </div>
      </div>

      {/* Complaints Section */}
      <section className="cd-section">
        <div className="cd-section-head">
          <h2>Complaints</h2>
        </div>
        <div className="cd-grid-2">
          {/* Create Complaint */}
          <div className="cd-card cd-visual-card">
            <h3 className="cd-card-title">Create a Complaint</h3>
            <form onSubmit={addComplaint} className="cd-form">
              <label>
                Title
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Short title"
                />
              </label>
              <label>
                Description
                <textarea
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Describe the issue"
                  rows={4}
                />
              </label>
              <label>
                Category
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </label>
              <button className="cd-btn-primary" type="submit">
                Submit Complaint
              </button>
            </form>
          </div>

          {/* Recent Complaints */}
          <div className="cd-card cd-visual-card">
            <h3 className="cd-card-title">Recent Complaints</h3>
            {complaints.length === 0 ? (
              <p className="cd-muted">No complaints yet.</p>
            ) : (
              <ul className="cd-list">
                {complaints.slice(0, 6).map((c) => (
                  <li key={c.id} className="cd-list-item">
                    <div className="cd-list-main">
                      <div className="cd-list-title">{c.title}</div>
                      <div className="cd-list-sub">
                        {c.category} • {new Date(c.createdAt).toLocaleString()}
                      </div>
                      <div className="cd-list-desc">{c.description}</div>
                    </div>
                    <div className="cd-list-actions">
                      <span
                        className={`cd-status ${
                          c.status === "Open" ? "open" : "resolved"
                        }`}
                      >
                        {c.status}
                      </span>
                      <button
                        className="cd-btn-secondary"
                        onClick={() => toggleStatus(c.id)}
                      >
                        Mark {c.status === "Open" ? "Resolved" : "Open"}
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      {/* City Info Section */}
      <section className="cd-section">
        <div className="cd-section-head">
          <h2>City Information</h2>
        </div>

        <div className="cd-grid-3">
          {/* Hospitals */}
          {city.hospitals.map((h, i) => (
            <div key={i} className="cd-card cd-visual-card">
              <img src={h.img} alt={h.name} className="cd-card-img" />
              <h3 className="cd-card-title">{h.name}</h3>
              <p className="cd-muted">{h.address}</p>
              <p className="cd-muted">Phone: {h.phone}</p>
            </div>
          ))}

          {/* Tourist Places */}
          {city.touristPlaces.map((p, i) => (
            <div key={i} className="cd-card cd-visual-card">
              <img src={p.img} alt={p.name} className="cd-card-img" />
              <h3 className="cd-card-title">{p.name}</h3>
              <p className="cd-muted">{p.desc}</p>
            </div>
          ))}

          {/* Salons */}
          {city.salons.map((s, i) => (
            <div key={i} className="cd-card cd-visual-card">
              <img src={s.img} alt={s.name} className="cd-card-img" />
              <h3 className="cd-card-title">{s.name}</h3>
              <p className="cd-muted">Area: {s.area}</p>
            </div>
          ))}

          {/* Offices */}
          {city.offices.map((o, i) => (
            <div key={i} className="cd-card cd-visual-card">
              <img src={o.img} alt={o.name} className="cd-card-img" />
              <h3 className="cd-card-title">{o.name}</h3>
              <p className="cd-muted">Dept: {o.dept}</p>
            </div>
          ))}

          {/* Government Schemes */}
          {city.schemes.map((g, i) => (
            <div key={i} className="cd-card cd-visual-card">
              <img src={g.img} alt={g.title} className="cd-card-img" />
              <h3 className="cd-card-title">{g.title}</h3>
              <p className="cd-muted">{g.brief}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CitizenDashboard;
