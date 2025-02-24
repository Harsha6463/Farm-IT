import React, { useState, useEffect } from "react";
import "./InvestorTracking.css";
import Navbar from "../Navbar/Navbar";
import {  NavLink } from "react-router-dom";
import API from "../../API";

const InvestorTracking = () => {
  const [investments, setInvestments] = useState([]);
  const [stats, setStats] = useState({
    totalInvested: 0,
    totalReturns: 0,
    activeInvestments: 0,
  });
  const [loading, setLoading] = useState(false);

  const fetchInvestments = async () => {
    setLoading(true);
    try {
      const response = await API.get("/investments/tracking");
      setInvestments(response.data.investments);
      setStats(response.data.stats);
    } catch (error) {
      console.error("Error fetching investment tracking data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvestments();
  }, []);

  return (
    <>
      <Navbar UserType={"investor"} />
      <div className="investor-tracking">
        <div style={{marginTop:"100px"}} className="tracking-title">
          <h1>Investment Tracking</h1>
        </div>
        {loading ? (
          <p className="loading-message">Loading investments ...</p>
        ) : (
          <>
            <div className="stats-card">
              <p>
                <b>Total Invested:</b> Rs {stats.totalInvested}
              </p>
              <p>
                <b>Total Returns:</b> Rs {stats.totalReturns}
              </p>
              <p>
                <b>Active Investments:</b> {stats.activeInvestments}
              </p>
            </div>
            <div className="investment-tracking-list">
              {investments.length > 0 ? (
                investments.map((investment) => (
                  <div key={investment._id} className="investment-card">
                    <h2>Farm: {investment.farm.name}</h2>
                    <p>
                      <b>Amount Invested:</b> Rs {investment.amount}
                    </p>
                    <p>
                      <b>Interest Rate:</b> {investment.interestRate}%
                    </p>
                    <p>
                      <b>Start Date:</b>{" "}
                      {new Date(investment.startDate).toLocaleDateString()}
                    </p>
                    <p>
                      <b>Status:</b> {investment.status}
                    </p>
                    <p>
                      <b>Returns:</b> Rs {investment.returns}
                    </p>
                  </div>
                ))
              ) : (
                <p className="no-investments">No investments found.</p>
              )}
            </div>
          </>
        )}
      </div>
      <NavLink to={`/issue/investor`}>
        <button className="report-issue-btn">Issue?</button>
      </NavLink>
    </>
  );
};

export default InvestorTracking;