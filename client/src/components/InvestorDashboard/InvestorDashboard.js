import React, { useState, useEffect } from "react";
import "./InvestorDashboard.css"; 
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import API from "../../API";

const InvestorPanel = () => {
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchInvestments = async () => {
    setLoading(true);
    try {
      const response = await API.get("/loans/my-investments");
      setInvestments(response.data);
    } catch (error) {
      console.error("Error fetching investments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvestments();
  }, []);

  return (
    <>
      <Navbar isInvestor={true} />
      <div className="investor-dashboard-container">
        <div className="dashboard-inner-content">
          <div className="dashboard-heading">
            <h1>Investors Dashboard</h1>
          </div>

          {loading ? (
            <p className="loading-message-text">
              <b>Loading your Investments...</b>
            </p>
          ) : investments.length > 0 ? (
            <div className="investment-cards-container">
              {investments.map((investment) => (
                <div key={investment._id} className="investment-card-item">
                  <img
                    src={`http://localhost:3600/${investment.farm.images[0]}`}
                    alt="Farm Land"
                    className="investment-card-image"
                  />
                  <h2 className="investment-farm-title">{investment.farm.name}</h2>
                  <p className="investment-farm-description">{investment.farm.description}</p>
                  <p>
                    <b>Location:</b> {investment.farm.location}
                  </p>
                  <p>
                    <b>Investment Amount:</b> Rs:{investment.amount}
                  </p>
                  <p>
                    <b>Farmer:</b> {investment.farm.farmer}
                  </p>
                  <p>
                    <b>Status:</b> {investment.status}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-investments-found">No investments found.</p>
          )}
        </div>
        <Link to={`/issue/investor`}>
          <button className="report-issue-btn">Report an Issue</button>
        </Link>
      </div>
    </>
  );
};

export default InvestorPanel;
