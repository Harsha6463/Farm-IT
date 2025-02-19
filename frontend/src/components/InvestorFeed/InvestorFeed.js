import React, { useState, useEffect } from "react";
import "./InvestorFeed.css";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import API from "../../API";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const InvestorFeed = () => {
  const [loans, setLoans] = useState([]);
  const [investorId, setInvestorId] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getLoans = async () => {
    setLoading(true);
    try {
      const response = await API.get("/loans/available");
      setLoans(response.data.loans);
      setInvestorId(response.data.investorId);
    } catch (error) {
      console.error("Error fetching loans:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLoans();
  }, []);

  const acceptLoanRequest = async (loanAmount, loanId, farmerId) => {
    try {
      await API.post(`/loans/${loanId}/invest`, {
        amount: loanAmount,
        toUserId: farmerId,
        fromUserId: investorId,
      });

      toast.success("Loan amount sent successfully!");
      navigate("/investorDashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error submitting loan request"
      );
    }
  };

  return (
    <>
      <Navbar isInvestor={true} />
      <div className="investor-container">
        <div className="header-section">
          <h1>Investor Feed</h1>
        </div>

        {loading ? (
          <p className="loading-text">
            <b>Loading loan requests...</b>
          </p>
        ) : (
          <div className="loan-cards-container">
            {loans.length > 0 ? (
              loans.map((loan) => (
                <div key={loan._id} className="loan-card">
                  <img
                    src={`http://localhost:3600/${loan.farm.images}`}
                    alt="Farm Land Images"
                    className="loan-image"
                  />
                  <h2  className="loan-status"><b>Status:</b> {loan.status}</h2>
                  <p>
                    <b>Amount:</b> {loan.amount}
                  </p>
                  <p>
                    <b>Requested Interest Rate:</b>{" "}
                    {loan.interestRate}
                  </p>
                  <Link to="">
                    <button
                      className="invest-btn"
                      onClick={() =>
                        acceptLoanRequest(
                          loan.amount,
                          loan._id,
                          loan.farm.farmer
                        )
                      }
                    >
                      Interested
                    </button>
                  </Link>
                </div>
              ))
            ) : (
              <p className="no-loans-message">No loans available to fund.</p>
            )}
          </div>
        )}
        <Link to={`/issue/investor`}>
          <button className="issue-btn">Issue?</button>
        </Link>
      </div>
    </>
  );
};

export default InvestorFeed;
