import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page-container">
      <div className="page-content-container">
        <h1>FarmIT - Home page</h1>
        <h3>Hello and welcome!</h3>
        <div className="button-container">
          <button className="action-button" onClick={() => navigate("/login")}>
            Login
          </button>
          <button className="action-button" onClick={() => navigate("/register")}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
