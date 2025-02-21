// MyLoans.js
import React, { useEffect, useState } from "react";
import API from "../../API";
import { toast } from "react-toastify";
import Navbar from "../Navbar/Navbar";
import "./MyLoan.css";

const MyLoan = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await API.get("/loans/my-loans", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setLoans(response.data);
        setLoading(false);
      } catch (error) {
        toast.error(error.response?.data?.message || "Error fetching loans");
        setLoading(false);
      }
    };

    fetchLoans();
  }, [userId]);

  if (loading) {
    return <div>Loading loans...</div>;
  }

  return (
    <>
      <Navbar UserType={"farmer"} />
      <div style={{ marginTop: "100px" }} className="loans-container">
        <h2 className="loans-title">My Loans</h2>
        {loans.length > 0 ? (
          <div className="loans-list">
            {loans.map((loan) => (
              <div className="loan-item" key={loan._id}>
                <p><strong>Farm:</strong> {loan.farm.name}</p>
                <p><strong>Loan Amount:</strong> ${loan.amount}</p>
                <p><strong>Interest Rate:</strong> {loan.interestRate}%</p>
                <p><strong>Investors:</strong> 
                  {loan.investors.map((investor) => (
                    <span key={investor.investor._id}>
                      {investor.investor.firstName} {investor.investor.lastName}
                    </span>
                  ))}
                </p>
                <p><strong>Status:</strong> {loan.status}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No loans found.</p>
        )}
      </div>
    </>
  );
};

export default MyLoan;
