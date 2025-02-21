import React, { useState, useEffect } from "react";
import "./FarmerDashboard.css";
import Navbar from "../../Navbar/Navbar";
import { Link } from "react-router-dom";
import API from "../../../API";

const FarmerDashboard = () => {
  const [farms, setFarms] = useState([]);
  const [loading, setLoading] = useState(true);

  const getFarms = async () => {
    setLoading(true);
    try {
      const response = await API.get("/farms/my-farms");
      setFarms(response.data);
    } catch (error) {
      console.error("Error fetching farms:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFarms();
  }, []);

  return (
    <>
      <Navbar UserType="farmer" />
      <div className="farmer-dashboard-container">
        <div className="dashboard-inner-content">
          <div className="dashboard-header-section">
            <h1 style={{color:"white", marginTop:"90px"}}>Farmer Dashboard</h1>
            <Link to="/addFarm">
              <button style={{color:"white", marginTop:"90px"}} className="add-farm-button">Add Farm Land</button>
            </Link>
          </div>
          {loading ? (
            <p className="loading-status">
              <b>Loading Farms...</b>
            </p>
          ) : farms.length > 0 ? (
            <div className="farms-display-list">
              {farms.map((farm) => (
                <div key={farm._id} className="farm-item-card">
                  <img
                    src={`http://localhost:3600/${farm.images[0]}`}
                    alt="Farm Land"
                    className="farm-thumbnail"
                  />
                  <h2 className="farm-title"><b>Name: </b> {farm.name}</h2>
                  <p className="farm-details"><b>Description: </b>{farm.description}</p>
                  <p>
                    
                  </p>
                  <p>
                    <b>Type: </b> {farm.farmType}
                  </p>
                  <p>
                    <b>Size: </b> {farm.size} acres
                  </p>
                  <p>
                    <b>Production Capacity: </b>{" "}
                    {farm.productionCapacity} tons
                  </p>
                  <p>
                    <b>Status: </b> {farm.status}
                  </p>
                  <Link to={`/loanRequest/${farm._id}`}>
                    <button className="request-loan-button">Request Loan</button>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-farms-message">No farms found.</p>
          )}
        </div>
        <Link to={`/issue/farmer`}>
          <button className="report-issue-button">Issue?</button>
        </Link>
      </div>
    </>
  );
};

export default FarmerDashboard;
