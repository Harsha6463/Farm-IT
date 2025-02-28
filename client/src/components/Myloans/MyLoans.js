import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import API from "../../API";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import './MyLoans.css';

const MyLoans = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLoans = async () => {
    setLoading(true);
    try {
      const response = await API.get("/loans/my-loans");
      setLoans(response.data);
    } catch (error) {
      console.error("Error fetching loans:", error);
      toast.error("Failed to load loans");
    } finally {
      setLoading(false);
    }
  };

  const handleRepayment = async (loanId, amount, investorId) => {
    try {
      const farmerId = localStorage.getItem("farmerId");
      console.log("Repayment Data:", {
        loanId,
        amount,
        fromUserId: farmerId,
        toUserId: investorId
      });
      const confirmed = window.confirm(`Do you want to repay Rs. ${amount}?`);
      if (confirmed) {
        const response = await API.post(`/loans/${loanId}/repay`, {
          amount: amount,
          fromUserId: farmerId,
          toUserId: investorId,
        });

        if (response.data && response.data.message) {
          toast.success(response.data.message);
          fetchLoans();
        } else {
          toast.error("Unexpected response format.");
        }
      }
    } catch (error) {
      console.error("Error making repayment:", error.response ? error.response.data : error.message);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to make repayment.");
      }
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  return (
    <>
      <Navbar UserType={"farmer"} />
      <div style={{ marginTop: "100px" }} className="farmer-loans">
        <div className="dashboard-content">
          <h1>My Loans</h1>
          {loading ? (
            <p className="loading-message">Loading loans...</p>
          ) : loans.length > 0 ? (
            <div className="loan-list">
              {loans.map((loan) => (
                <div key={loan._id} className="loan-card">
                  <h2>Farm: {loan.farm.name}</h2>
                  <p>
                    <b>Amount:</b> Rs {loan.amount}
                  </p>
                  <p>
                    <b>Status:</b> {loan.status}
                  </p>
                  <p>
                    <b>Repayment Schedule:</b>
                  </p>
                  <ul>
                    {loan.repaymentSchedule.map((payment, index) => (
                      <li key={index}>
                        <h3>
                          {new Date(payment.dueDate).toLocaleDateString()} - (
                          {payment.status})
                        </h3>
                        <b>
                          Rs: <span className="payment-amount">{payment.amount}</span>
                        </b>

                        {payment.status === "pending" && (
                          <button
                            className="repay-btn"
                            onClick={() =>
                              handleRepayment(
                                loan._id,
                                payment.amount,
                                loan.investors[0]?.investor._id 
                              )
                            }
                          >
                            Repay
                          </button>
                        )}

                        {payment.status === "paid" && payment.paidDate && (
                          <p>
                            <b>Paid on:</b> {new Date(payment.paidDate).toLocaleDateString()}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-loans">No loans found.</p>
          )}
        </div>
      </div>
      <Link to={`/issue/farmer`}>
        <button className="issue-btn">Issue?</button>
      </Link>
    </>
  );
};

export default MyLoans;
