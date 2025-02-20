import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ isInvestor }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navigation-bar">
      <div className="nav-left">
        <div className="brand-logo">FarmIT</div>
      </div>
      <div className="nav-center">
        {isInvestor && (
          <>
            <Link to="/investorFeed" className="nav-item">
              Feed
            </Link>
            <Link to="/investorDashboard" className="nav-item">
              Dashboard
            </Link>
          </>
        )}
        {!isInvestor && (
          <>
            <Link to="/farmerDashboard" className="nav-item">
              Dashboard
            </Link>
          </>
        )}
      </div>
     
      <div className="nav-right">
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
