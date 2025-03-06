import React, { useState, useEffect } from "react";
import "./UserTransactions.css";
import Navbar from "../Navbar/Navbar";
import { NavLink } from "react-router-dom";
import API from "../../API";

const UserTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState("");

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const { data } = await API.get("/transactions/my-transactions");
      setTransactions(data);
      setUserType(data.role);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <>
      <Navbar UserType={"farmer"} />
      <div style={{marginTop:"80px" }} className="user-transactions">
        <div className="dashboard-content">
          <h1 style={{fontStyle:"bold",fontSize:"3rem", color:"crimson"}} className="transactions-title">My Transactions</h1>
          {loading ? (
            <p className="loading-message">Loading transactions...</p>
          ) : (
            <div className="transactions-grid">
              {transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <div key={transaction._id} className="transaction-card">
                    <h3 className="transaction-type">{transaction.type}</h3>
                    <p className="transaction-detail">
                      <b>Amount:</b> Rs {transaction.amount.toFixed(2)}
                    </p>
                    <p className="transaction-detail">
                      <b>From:</b> {transaction.from.firstName} {transaction.from.lastName}
                    </p>
                    <p className="transaction-detail">
                      <b>To:</b> {transaction.to.firstName} {transaction.to.lastName}
                    </p>
                    <p className={`transaction-status ${transaction.status}`}>
                      <b>Status:</b> {transaction.status}
                    </p>
                    <p className="transaction-date">
                      <b>Date:</b> {new Date(transaction.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))
              ) : (
                <p className="no-transactions">No transactions found.</p>
              )}
            </div>
          )}
        </div>
      </div>
      
    
      <NavLink to={`/issue/${userType}`}>
        <button className="report-issue-btn">Report an Issue</button>
      </NavLink>
    </>
  );
};

export default UserTransactions;