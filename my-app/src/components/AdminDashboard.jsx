import React, { useState, useEffect } from "react";
import "./AdminDashboard.css";

const STATUS_OPTIONS = ["Pending", "In Progress", "Resolved"];

const AdminDashboard = () => {
  // --- Complaints ---
  const [complaints, setComplaints] = useState(() => {
    try {
      const stored = localStorage.getItem("citizenComplaints");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("citizenComplaints", JSON.stringify(complaints));
  }, [complaints]);

  const updateStatus = (id, status) => {
    setComplaints((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status, updatedAt: new Date().toISOString() } : c
      )
    );
  };

  // --- City Info ---
  const [cityInfo, setCityInfo] = useState(() => {
    try {
      const stored = localStorage.getItem("cityInfo");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [newItem, setNewItem] = useState({ name: "", address: "", phone: "" });

  const addCityInfo = () => {
    if (!newItem.name || !newItem.address || !newItem.phone) {
      alert("Please fill all fields");
      return;
    }
    const updated = [...cityInfo, { ...newItem, id: Date.now() }];
    setCityInfo(updated);
    localStorage.setItem("cityInfo", JSON.stringify(updated));
    setNewItem({ name: "", address: "", phone: "" });
  };

  const deleteCityInfo = (id) => {
    const updated = cityInfo.filter((item) => item.id !== id);
    setCityInfo(updated);
    localStorage.setItem("cityInfo", JSON.stringify(updated));
  };

  // --- Analytics ---
  const total = complaints.length;
  const resolved = complaints.filter((c) => c.status === "Resolved").length;
  const pending = complaints.filter((c) => c.status === "Pending").length;
  const inProgress = complaints.filter((c) => c.status === "In Progress").length;

  return (
    <div className="ad-page">
      <header className="ad-header">
        <h1>Admin Dashboard</h1>
      </header>

      {/* --- Analytics Cards --- */}
      <div className="stats">
        <div className="card blue">Total Complaints: {total}</div>
        <div className="card green">Resolved: {resolved}</div>
        <div className="card yellow">In Progress: {inProgress}</div>
        <div className="card red">Pending: {pending}</div>
      </div>

      {/* --- Complaint List --- */}
      <section className="ad-section">
        <h2>All Citizen Complaints</h2>
        {complaints.length === 0 ? (
          <p className="ad-muted">No complaints submitted yet.</p>
        ) : (
          <ul className="ad-list">
            {complaints.map((c) => (
              <li key={c.id} className="ad-list-item">
                <div className="ad-list-main">
                  <div className="ad-list-title">{c.title}</div>
                  <div className="ad-list-sub">
                    {c.category} • Created: {new Date(c.createdAt).toLocaleString()}
                  </div>
                  <div className="ad-list-desc">{c.description}</div>

                  <div className="ad-response-section">
                    <label>Status:</label>
                    <select
                      value={c.status}
                      onChange={(e) => updateStatus(c.id, e.target.value)}
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* --- City Info CRUD --- */}
      <section className="ad-section">
        <h2>Manage City Information</h2>
        <div className="input-section">
          <input
            placeholder="Name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          />
          <input
            placeholder="Address"
            value={newItem.address}
            onChange={(e) => setNewItem({ ...newItem, address: e.target.value })}
          />
          <input
            placeholder="Phone"
            value={newItem.phone}
            onChange={(e) => setNewItem({ ...newItem, phone: e.target.value })}
          />
          <button onClick={addCityInfo}>Add</button>
        </div>

        {cityInfo.length === 0 ? (
          <p className="ad-muted">No city information added yet.</p>
        ) : (
          <ul className="info-list">
            {cityInfo.map((item) => (
              <li key={item.id}>
                {item.name} - {item.address} ({item.phone})
                <button className="delete-btn" onClick={() => deleteCityInfo(item.id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default AdminDashboard;
