import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import API from "../../API";
import { toast } from "react-toastify";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [farmers, setFarmers] = useState([]);
  const [investors, setInvestors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchFarmersAndInvestors = async () => {
    setLoading(true);
    try {
      const farmerResponse = await API.get("/farms/my-farms");
      const investorResponse = await API.get("/loans/my-investments");

      setFarmers(farmerResponse.data);
      setInvestors(investorResponse.data);

      toast.success("Farmers and investors loaded successfully!");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error fetching farmers and investors"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFarmersAndInvestors();
  }, []);

  useEffect(() => {
    const admin = localStorage.getItem("admin");
    if (!admin) {
      navigate("/login"); 
    }
  }, [navigate]);

  return (
    <>
      <Navbar isAdmin={true} />
      <div className="admin-dashboard-container">
        <div className="dashboard-inner-content">
          <div className="dashboard-header-section">
            <h1>Admin Dashboard</h1>
          </div>

          {loading ? (
            <p className="loading-status">
              <b>Loading farmers and investors...</b>
            </p>
          ) : (
            <>
              <div className="farmers-section">
                <h2>Farmers</h2>
                {farmers.length > 0 ? (
                  <div className="farmers-list">
                    {farmers.map((farmer) => (
                      <div key={farmer._id} className="farmer-card">
                        <h3>{farmer.name}</h3>
                        <p><b>Email:</b> {farmer.email}</p>
                        <p><b>Location:</b> {farmer.location}</p>
                        <p><b>Farm Count:</b> {farmer.farms.length}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No farmers found.</p>
                )}
              </div>

              <div className="investors-section">
                <h2>Investors</h2>
                {investors.length > 0 ? (
                  <div className="investors-list">
                    {investors.map((investor) => (
                      <div key={investor._id} className="investor-card">
                        <h3>{investor.name}</h3>
                        <p><b>Email:</b> {investor.email}</p>
                        <p><b>Investment Count:</b> {investor.investments.length}</p>
                        <p><b>Total Investment Amount:</b> Rs: {investor.totalInvestment}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No investors found.</p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
